//src: http://shabkyle.com/js/ClockSelector.js
//doc: http://1.618034.com/current.php
function ClockSelector(e, params) {
    var defaults = {
        auto_dt: 1000,
        automate: true,
        background: 'black',
        callback: function() {},
        color_border: '#fff',
        color_hour: '#fff',
        color_minute: '#aaa',
        draw_hour: null,
        draw_minute: null,
        draw_second: null,
        highlight: '#f93',
        manual: true,
        stroke_border: 3,
        stroke_hour: 2,
        stroke_minute: 0.75,
        scale_hour: 0.50,
        scale_border: 0.80,
        scale_minute: 0.65
    };

    for (var k in defaults) {
        this[k] = params && k in params ? params[k] : defaults[k];
    }

    e = document.getElementById(e);
    this.size = Math.min(e.width, e.height);
    if (!this.size) {
        var style = window.getComputedStyle(e);
        this.size = Math.min(parseInt(style.width), parseInt(style.height));
    }

    if (e.tagName != 'CANVAS') {
        e.appendChild(document.createElement('canvas'));
        e = e.childNodes[e.childNodes.length - 1];
        e.width = this.size;
        e.height = this.size;
    }

    this.canvas = e;
    this.context = e.getContext('2d');
    this.dragging = false;
    this.time = null;
    this.color_mindef = this.color_minute;

    e.style.backgroundColor = this.background;



    ClockSelector.prototype.clockTime = function() {
        return this.time;
    }



    ClockSelector.prototype.drawHand = function(c, w, s) {
        var x = this.context;

        x.strokeStyle = c;
        x.fillStyle = c;
        x.lineWidth = w;
        x.beginPath();
        x.moveTo(0, 0);
        x.lineTo(0, 100 * s);
        x.closePath();
        x.stroke();
        x.arc(0, 0, w / 2, 0, 2 * Math.PI);
        x.fill();
    };



    ClockSelector.prototype.getCanvasOffset = function() {
        var o = [0, 0];
        var e = this.canvas;

        while (e.offsetParent) {
            o[0] += e.offsetLeft;
            o[1] += e.offsetTop;
            e = e.offsetParent;
        }

        return o;
    };



    ClockSelector.prototype.reset = function() {
        this.setTime(new Date());
        if (this.automate) {
            this.timeout = setInterval(this.setTimeRecurring(), this.auto_dt);
        }
    };



    ClockSelector.prototype.setParam = function(k, v) {
        if (k in this) {
            this[k] = v;
        }
    }



    ClockSelector.prototype.setTime = function(t) {
        this.canvas.width = this.canvas.width;
        this.time = t;
        t = t.getTime() / 1000 - t.getTimezoneOffset() * 60;

        var x = this.context;
        var s = this.size / 200;
        var Ts = t % 60 / 30 * Math.PI;
        var Tm = t % 3600 / 1800 * Math.PI;
        var Th = t / (6 * 3600) * Math.PI;
        this.setTransform(x, Ts, s);
        if (this.draw_second) {
            var f = this.draw_second;
            f(x);
        }
        this.setTransform(x, Tm, s);
        if (this.draw_minute) {
            var f = this.draw_minute;
            f(x);
        }
        else {
            this.drawHand(this.color_minute, this.stroke_minute * 2, this.scale_minute);
        }
        this.setTransform(x, Th, s);
        if (this.draw_hour) {
            var f = this.drawHour;
            f(x);
        }
        else {
            this.drawHand(this.color_hour, this.stroke_hour * 2, this.scale_hour);
        }

        x.setTransform(s, 0, 0, s, 100 * s, 100 * s);
        x.strokeStyle = this.color_border;
        x.lineWidth = this.stroke_border * 2;
        x.beginPath();
        x.arc(0, 0, 100 * this.scale_border, 0, 2 * Math.PI);
        x.stroke();
        x.closePath();

        if (this.callback) {
            this.callback(this);
        }
    };



    ClockSelector.prototype.setTimeFromEvent = function(e) {
        var o = this.getCanvasOffset();
        var x = e.pageX - o[0] - this.size / 2;
        var y = this.size / 2 - (e.pageY - o[1]);

        if (x == 0 && y == 0) {
            return;
        }

        var T = Math.atan2(y, x);
        var h, m;
        if (this.drag_minute) {
            var m1 = (75 - T * 30 / Math.PI) % 60;
            var m0 = this.time.getMinutes() + this.time.getSeconds() / 60;
            h = this.time.getHours();
            m = m1;

            if (m1 < m0 && m0 - m1 <= 30) { /**/ }
            else if (m1 < m0 && m0 - m1 > 30) {
                h += 1;
            }
            else if (m1 > m0 && m1 - m0 <= 30) { /**/ }
            else if (m1 > m0 && m1 - m0 > 30) {
                h -= 1;
            }
            h = (h + 24) % 24;
        }
        else {
            var h1 = 3 - T * 6 / Math.PI;
            var h0 = this.time.getHours() + this.time.getMinutes() / 60 + this.time.getSeconds() / 3600;
            h1 += h1 < h0 ? 24 : 0;

            if (h1 < h0 + 6) {
                h = h1;
            }
            else if (h1 < h0 + 12) {
                h = h1 - 12;
            }
            else if (h1 < h0 + 18) {
                h = h1 + 12;
            }
            else {
                h = h1;
            }
            h = (h + 24) % 24;
            m = (((3 - T * 6 / Math.PI) * 60) % 60 + 60) % 60;
        }

        var t = new Date();
        t.setHours(h);
        t.setMinutes(m);
        t.setSeconds((((3 - T * 6 / Math.PI) * 3600) % 60 + 60) % 60);

        this.setTime(t);
    };



    ClockSelector.prototype.setTimeRecurring = function() {
        var _ = this;
        return function() {
            _.setTime(new Date());
        };
    };



    ClockSelector.prototype.setTransform = function(x, T, s) {
        x.setTransform(-s * Math.cos(T), -s * Math.sin(T), s * Math.sin(T), -s * Math.cos(T), 100 * s, 100 * s);
    };



    ClockSelector.prototype.makeEndDrag = function() {
        var _ = this;
        return function() {
            _.color_minute = _.color_mindef;
            _.dragging = false;
            _.setTime(_.clockTime());
        };
    };



    ClockSelector.prototype.makeSetTime = function(d) {
        if (!this.manual) {
            return;
        }

        var _ = this;
        return function() {
            var e = window.event;
            var o = _.getCanvasOffset();
            var x = e.pageX - o[0] - _.size / 2;
            var y = _.size / 2 - (e.pageY - o[1]);

            if (_.manual) {
                _.canvas.style.cursor = Math.sqrt(x * x + y * y) <= (_.size * _.scale_border + _.stroke_border) / 2 ? 'pointer' : 'default';
            }

            if (_.dragging != d) {
                if (d && !_.dragging) {
                    var T = Math.atan2(x, y);
                    var m = (T + 2 * Math.PI) * 30 / Math.PI;
                    var mb = [(m + 57.5) % 60, (m + 2.5) % 60];

                    m = _.clockTime().getMinutes() + _.clockTime().getSeconds() / 60;
                    if (Math.sqrt(x * x + y * y) < _.size / 2 * _.scale_border && (
                            (mb[0] < m && m < mb[1]) || (m < mb[0] && mb[1] < mb[0] && m < mb[1]) || (mb[0] < m && mb[1] < m && mb[1] < mb[0])
                        )) {
                        if (_.color_minute != _.highlight) {
                            _.color_minute = _.highlight;
                            _.drag_minute = true;
                            _.setTime(_.clockTime());
                        }
                    }
                    else {
                        if (_.color_minute != _.color_mindef) {
                            _.color_minute = _.color_mindef;
                            _.drag_minute = false;
                            _.setTime(_.clockTime());
                        }
                    }
                }

                return;
            }

            if (!_.dragging && !d) {
                if (_.timeout) {
                    clearTimeout(_.timeout);
                    _.timeout = null;
                }

                _.dragging = true;
            }

            _.setTimeFromEvent(window.event);
        };
    };



    if (this.manual) {
        this.canvas.onmousedown = this.makeSetTime(false);
        this.canvas.onmouseup = this.makeEndDrag();
        this.canvas.onmouseout = this.makeEndDrag();
        this.canvas.onmousemove = this.makeSetTime(true);

        //this.canvas.style.cursor = 'pointer';
    }



    this.reset();
}