/* ===================================================
 *  jquery-sortable.js v0.9.12
 *  http://johnny.github.com/jquery-sortable/
 * ===================================================
 *  Copyright (c) 2012 Jonas von Andrian
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *  * The name of the author may not be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 *  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 *  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * ========================================================== */


!function ( $, window, pluginName, undefined){
  var eventNames,
  containerDefaults = {
    // If true, items can be dragged from this container
    drag: true,
    // If true, items can be droped onto this container
    drop: true,
    // Exclude items from being draggable, if the
    // selector matches the item
    exclude: "",
    // If true, search for nested containers within an item
    nested: true,
    // If true, the items are assumed to be arranged vertically
    vertical: true
  }, // end container defaults
  groupDefaults = {
    // This is executed after the placeholder has been moved.
    // $closestItemOrContainer contains the closest item, the placeholder
    // has been put at or the closest empty Container, the placeholder has
    // been appended to.
    afterMove: function ($placeholder, container, $closestItemOrContainer) {
    },
    // The exact css path between the container and its items, e.g. "> tbody"
    containerPath: "",
    // The css selector of the containers
    containerSelector: "ol, ul",
    // Distance the mouse has to travel to start dragging
    distance: 0,
    // Time in milliseconds after mousedown until dragging should start.
    // This option can be used to prevent unwanted drags when clicking on an element.
    delay: 0,
    // The css selector of the drag handle
    handle: "",
    // The exact css path between the item and its subcontainers
    itemPath: "",
    // The css selector of the items
    itemSelector: "li",
    // Check if the dragged item may be inside the container.
    // Use with care, since the search for a valid container entails a depth first search
    // and may be quite expensive.
    isValidTarget: function ($item, container) {
      return true
    },
    // Executed before onDrop if placeholder is detached.
    // This happens if pullPlaceholder is set to false and the drop occurs outside a container.
    onCancel: function ($item, container, _super, event) {
    },
    // Executed at the beginning of a mouse move event.
    // The Placeholder has not been moved yet.
    onDrag: function ($item, position, _super, event) {
      $item.css(position)
    },
    // Called after the drag has been started,
    // that is the mouse button is beeing held down and
    // the mouse is moving.
    // The container is the closest initialized container.
    // Therefore it might not be the container, that actually contains the item.
    onDragStart: function ($item, container, _super, event) {
      $item.css({
        height: $item.height(),
        width: $item.width()
      })
      $item.addClass("dragged")
      $("body").addClass("dragging")
    },
    // Called when the mouse button is beeing released
    onDrop: function ($item, container, _super, event) {
      $item.removeClass("dragged").removeAttr("style")
      $("body").removeClass("dragging")
    },
    // Called on mousedown. If falsy value is returned, the dragging will not start.
    // If clicked on input element, ignore
    onMousedown: function ($item, _super, event) {
      if (!event.target.nodeName.match(/^(input|select)$/i)) {
        event.preventDefault()
        return true
      }
    },
    // Template for the placeholder. Can be any valid jQuery input
    // e.g. a string, a DOM element.
    // The placeholder must have the class "placeholder"
    placeholder: '<li class="placeholder"/>',
    // If true, the position of the placeholder is calculated on every mousemove.
    // If false, it is only calculated when the mouse is above a container.
    pullPlaceholder: true,
    // Specifies serialization of the container group.
    // The pair $parent/$children is either container/items or item/subcontainers.
    serialize: function ($parent, $children, parentIsContainer) {
      var result = $.extend({}, $parent.data())

      if(parentIsContainer)
        return [$children]
      else if ($children[0]){
        result.children = $children
      }

      delete result.subContainers
      delete result.sortable

      return result
    },
    // Set tolerance while dragging. Positive values decrease sensitivity,
    // negative values increase it.
    tolerance: 0
  }, // end group defaults
  containerGroups = {},
  groupCounter = 0,
  emptyBox = {
    left: 0,
    top: 0,
    bottom: 0,
    right:0
  },
  eventNames = {
    start: "touchstart.sortable mousedown.sortable",
    drop: "touchend.sortable touchcancel.sortable mouseup.sortable",
    drag: "touchmove.sortable mousemove.sortable",
    scroll: "scroll.sortable"
  },
  subContainerKey = "subContainers"

  /*
   * a is Array [left, right, top, bottom]
   * b is array [left, top]
   */
  function d(a,b) {
    var x = Math.max(0, a[0] - b[0], b[0] - a[1]),
    y = Math.max(0, a[2] - b[1], b[1] - a[3])
    return x+y;
  }

  function setDimensions(array, dimensions, tolerance, useOffset) {
    var i = array.length,
    offsetMethod = useOffset ? "offset" : "position"
    tolerance = tolerance || 0

    while(i--){
      var el = array[i].el ? array[i].el : $(array[i]),
      // use fitting method
      pos = el[offsetMethod]()
      pos.left += parseInt(el.css('margin-left'), 10)
      pos.top += parseInt(el.css('margin-top'),10)
      dimensions[i] = [
        pos.left - tolerance,
        pos.left + el.outerWidth() + tolerance,
        pos.top - tolerance,
        pos.top + el.outerHeight() + tolerance
      ]
    }
  }

  function getRelativePosition(pointer, element) {
    var offset = element.offset()
    return {
      left: pointer.left - offset.left,
      top: pointer.top - offset.top
    }
  }

  function sortByDistanceDesc(dimensions, pointer, lastPointer) {
    pointer = [pointer.left, pointer.top]
    lastPointer = lastPointer && [lastPointer.left, lastPointer.top]

    var dim,
    i = dimensions.length,
    distances = []

    while(i--){
      dim = dimensions[i]
      distances[i] = [i,d(dim,pointer), lastPointer && d(dim, lastPointer)]
    }
    distances = distances.sort(function  (a,b) {
      return b[1] - a[1] || b[2] - a[2] || b[0] - a[0]
    })

    // last entry is the closest
    return distances
  }

  function ContainerGroup(options) {
    this.options = $.extend({}, groupDefaults, options)
    this.containers = []

    if(!this.options.rootGroup){
      this.scrollProxy = $.proxy(this.scroll, this)
      this.dragProxy = $.proxy(this.drag, this)
      this.dropProxy = $.proxy(this.drop, this)
      this.placeholder = $(this.options.placeholder)

      if(!options.isValidTarget)
        this.options.isValidTarget = undefined
    }
  }

  ContainerGroup.get = function  (options) {
    if(!containerGroups[options.group]) {
      if(options.group === undefined)
        options.group = groupCounter ++

      containerGroups[options.group] = new ContainerGroup(options)
    }

    return containerGroups[options.group]
  }

  ContainerGroup.prototype = {
    dragInit: function  (e, itemContainer) {
      this.$document = $(itemContainer.el[0].ownerDocument)

      // get item to drag
      this.item = $(e.target).closest(this.options.itemSelector)
      this.itemContainer = itemContainer

      if(this.item.is(this.options.exclude) ||
         !this.options.onMousedown(this.item, groupDefaults.onMousedown, e)){
        return
      }

      this.setPointer(e)
      this.toggleListeners('on')

      this.setupDelayTimer()
      this.dragInitDone = true
    },
    drag: function  (e) {
      if(!this.dragging){
        if(!this.distanceMet(e) || !this.delayMet)
          return

        this.options.onDragStart(this.item, this.itemContainer, groupDefaults.onDragStart, e)
        this.item.before(this.placeholder)
        this.dragging = true
      }

      this.setPointer(e)
      // place item under the cursor
      this.options.onDrag(this.item,
                          getRelativePosition(this.pointer, this.item.offsetParent()),
                          groupDefaults.onDrag,
                          e)

      var x = e.pageX || e.originalEvent.pageX,
      y = e.pageY || e.originalEvent.pageY,
      box = this.sameResultBox,
      t = this.options.tolerance

      if(!box || box.top - t > y || box.bottom + t < y || box.left - t > x || box.right + t < x)
        if(!this.searchValidTarget())
          this.placeholder.detach()
    },
    drop: function  (e) {
      this.toggleListeners('off')

      this.dragInitDone = false

      if(this.dragging){
        // processing Drop, check if placeholder is detached
        if(this.placeholder.closest("html")[0])
          this.placeholder.before(this.item).detach()
        else
          this.options.onCancel(this.item, this.itemContainer, groupDefaults.onCancel, e)

        this.options.onDrop(this.item, this.getContainer(this.item), groupDefaults.onDrop, e)

        // cleanup
        this.clearDimensions()
        this.clearOffsetParent()
        this.lastAppendedItem = this.sameResultBox = undefined
        this.dragging = false
      }
    },
    searchValidTarget: function  (pointer, lastPointer) {
      if(!pointer){
        pointer = this.relativePointer || this.pointer
        lastPointer = this.lastRelativePointer || this.lastPointer
      }

      var distances = sortByDistanceDesc(this.getContainerDimensions(),
                                         pointer,
                                         lastPointer),
      i = distances.length

      while(i--){
        var index = distances[i][0],
        distance = distances[i][1]

        if(!distance || this.options.pullPlaceholder){
          var container = this.containers[index]
          if(!container.disabled){
            if(!this.$getOffsetParent()){
              var offsetParent = container.getItemOffsetParent()
              pointer = getRelativePosition(pointer, offsetParent)
              lastPointer = getRelativePosition(lastPointer, offsetParent)
            }
            if(container.searchValidTarget(pointer, lastPointer))
              return true
          }
        }
      }
      if(this.sameResultBox)
        this.sameResultBox = undefined
    },
    movePlaceholder: function  (container, item, method, sameResultBox) {
      var lastAppendedItem = this.lastAppendedItem
      if(!sameResultBox && lastAppendedItem && lastAppendedItem[0] === item[0])
        return;

      item[method](this.placeholder)
      this.lastAppendedItem = item
      this.sameResultBox = sameResultBox
      this.options.afterMove(this.placeholder, container, item)
    },
    getContainerDimensions: function  () {
      if(!this.containerDimensions)
        setDimensions(this.containers, this.containerDimensions = [], this.options.tolerance, !this.$getOffsetParent())
      return this.containerDimensions
    },
    getContainer: function  (element) {
      return element.closest(this.options.containerSelector).data(pluginName)
    },
    $getOffsetParent: function  () {
      if(this.offsetParent === undefined){
        var i = this.containers.length - 1,
        offsetParent = this.containers[i].getItemOffsetParent()

        if(!this.options.rootGroup){
          while(i--){
            if(offsetParent[0] != this.containers[i].getItemOffsetParent()[0]){
              // If every container has the same offset parent,
              // use position() which is relative to this parent,
              // otherwise use offset()
              // compare #setDimensions
              offsetParent = false
              break;
            }
          }
        }

        this.offsetParent = offsetParent
      }
      return this.offsetParent
    },
    setPointer: function (e) {
      var pointer = this.getPointer(e)

      if(this.$getOffsetParent()){
        var relativePointer = getRelativePosition(pointer, this.$getOffsetParent())
        this.lastRelativePointer = this.relativePointer
        this.relativePointer = relativePointer
      }

      this.lastPointer = this.pointer
      this.pointer = pointer
    },
    distanceMet: function (e) {
      var currentPointer = this.getPointer(e)
      return (Math.max(
        Math.abs(this.pointer.left - currentPointer.left),
        Math.abs(this.pointer.top - currentPointer.top)
      ) >= this.options.distance)
    },
    getPointer: function(e) {
      return {
        left: e.pageX || e.originalEvent.pageX,
        top: e.pageY || e.originalEvent.pageY
      }
    },
    setupDelayTimer: function () {
      var that = this
      this.delayMet = !this.options.delay

      // init delay timer if needed
      if (!this.delayMet) {
        clearTimeout(this._mouseDelayTimer);
        this._mouseDelayTimer = setTimeout(function() {
          that.delayMet = true
        }, this.options.delay)
      }
    },
    scroll: function  (e) {
      this.clearDimensions()
      this.clearOffsetParent() // TODO is this needed?
    },
    toggleListeners: function (method) {
      var that = this,
      events = ['drag','drop','scroll']

      $.each(events,function  (i,event) {
        that.$document[method](eventNames[event], that[event + 'Proxy'])
      })
    },
    clearOffsetParent: function () {
      this.offsetParent = undefined
    },
    // Recursively clear container and item dimensions
    clearDimensions: function  () {
      this.traverse(function(object){
        object._clearDimensions()
      })
    },
    traverse: function(callback) {
      callback(this)
      var i = this.containers.length
      while(i--){
        this.containers[i].traverse(callback)
      }
    },
    _clearDimensions: function(){
      this.containerDimensions = undefined
    },
    _destroy: function () {
      containerGroups[this.options.group] = undefined
    }
  }

  function Container(element, options) {
    this.el = element
    this.options = $.extend( {}, containerDefaults, options)

    this.group = ContainerGroup.get(this.options)
    this.rootGroup = this.options.rootGroup || this.group
    this.handle = this.rootGroup.options.handle || this.rootGroup.options.itemSelector

    var itemPath = this.rootGroup.options.itemPath
    this.target = itemPath ? this.el.find(itemPath) : this.el

    this.target.on(eventNames.start, this.handle, $.proxy(this.dragInit, this))

    if(this.options.drop)
      this.group.containers.push(this)
  }

  Container.prototype = {
    dragInit: function  (e) {
      var rootGroup = this.rootGroup

      if( !this.disabled &&
          !rootGroup.dragInitDone &&
          this.options.drag &&
          this.isValidDrag(e)) {
        rootGroup.dragInit(e, this)
      }
    },
    isValidDrag: function(e) {
      return e.which == 1 ||
        e.type == "touchstart" && e.originalEvent.touches.length == 1
    },
    searchValidTarget: function  (pointer, lastPointer) {
      var distances = sortByDistanceDesc(this.getItemDimensions(),
                                         pointer,
                                         lastPointer),
      i = distances.length,
      rootGroup = this.rootGroup,
      validTarget = !rootGroup.options.isValidTarget ||
        rootGroup.options.isValidTarget(rootGroup.item, this)

      if(!i && validTarget){
        rootGroup.movePlaceholder(this, this.target, "append")
        return true
      } else
        while(i--){
          var index = distances[i][0],
          distance = distances[i][1]
          if(!distance && this.hasChildGroup(index)){
            var found = this.getContainerGroup(index).searchValidTarget(pointer, lastPointer)
            if(found)
              return true
          }
          else if(validTarget){
            this.movePlaceholder(index, pointer)
            return true
          }
        }
    },
    movePlaceholder: function  (index, pointer) {
      var item = $(this.items[index]),
      dim = this.itemDimensions[index],
      method = "after",
      width = item.outerWidth(),
      height = item.outerHeight(),
      offset = item.offset(),
      sameResultBox = {
        left: offset.left,
        right: offset.left + width,
        top: offset.top,
        bottom: offset.top + height
      }
      if(this.options.vertical){
        var yCenter = (dim[2] + dim[3]) / 2,
        inUpperHalf = pointer.top <= yCenter
        if(inUpperHalf){
          method = "before"
          sameResultBox.bottom -= height / 2
        } else
          sameResultBox.top += height / 2
      } else {
        var xCenter = (dim[0] + dim[1]) / 2,
        inLeftHalf = pointer.left <= xCenter
        if(inLeftHalf){
          method = "before"
          sameResultBox.right -= width / 2
        } else
          sameResultBox.left += width / 2
      }
      if(this.hasChildGroup(index))
        sameResultBox = emptyBox
      this.rootGroup.movePlaceholder(this, item, method, sameResultBox)
    },
    getItemDimensions: function  () {
      if(!this.itemDimensions){
        this.items = this.$getChildren(this.el, "item").filter(":not(.placeholder, .dragged)").get()
        setDimensions(this.items, this.itemDimensions = [], this.options.tolerance)
      }
      return this.itemDimensions
    },
    getItemOffsetParent: function  () {
      var offsetParent,
      el = this.el
      // Since el might be empty we have to check el itself and
      // can not do something like el.children().first().offsetParent()
      if(el.css("position") === "relative" || el.css("position") === "absolute"  || el.css("position") === "fixed")
        offsetParent = el
      else
        offsetParent = el.offsetParent()
      return offsetParent
    },
    hasChildGroup: function (index) {
      return this.options.nested && this.getContainerGroup(index)
    },
    getContainerGroup: function  (index) {
      var childGroup = $.data(this.items[index], subContainerKey)
      if( childGroup === undefined){
        var childContainers = this.$getChildren(this.items[index], "container")
        childGroup = false

        if(childContainers[0]){
          var options = $.extend({}, this.options, {
            rootGroup: this.rootGroup,
            group: groupCounter ++
          })
          childGroup = childContainers[pluginName](options).data(pluginName).group
        }
        $.data(this.items[index], subContainerKey, childGroup)
      }
      return childGroup
    },
    $getChildren: function (parent, type) {
      var options = this.rootGroup.options,
      path = options[type + "Path"],
      selector = options[type + "Selector"]

      parent = $(parent)
      if(path)
        parent = parent.find(path)

      return parent.children(selector)
    },
    _serialize: function (parent, isContainer) {
      var that = this,
      childType = isContainer ? "item" : "container",

      children = this.$getChildren(parent, childType).not(this.options.exclude).map(function () {
        return that._serialize($(this), !isContainer)
      }).get()

      return this.rootGroup.options.serialize(parent, children, isContainer)
    },
    traverse: function(callback) {
      $.each(this.items || [], function(item){
        var group = $.data(this, subContainerKey)
        if(group)
          group.traverse(callback)
      });

      callback(this)
    },
    _clearDimensions: function  () {
      this.itemDimensions = undefined
    },
    _destroy: function() {
      var that = this;

      this.target.off(eventNames.start, this.handle);
      this.el.removeData(pluginName)

      if(this.options.drop)
        this.group.containers = $.grep(this.group.containers, function(val){
          return val != that
        })

      $.each(this.items || [], function(){
        $.removeData(this, subContainerKey)
      })
    }
  }

  var API = {
    enable: function() {
      this.traverse(function(object){
        object.disabled = false
      })
    },
    disable: function (){
      this.traverse(function(object){
        object.disabled = true
      })
    },
    serialize: function () {
      return this._serialize(this.el, true)
    },
    refresh: function() {
      this.traverse(function(object){
        object._clearDimensions()
      })
    },
    destroy: function () {
      this.traverse(function(object){
        object._destroy();
      })
    }
  }

  $.extend(Container.prototype, API)

  /**
   * jQuery API
   *
   * Parameters are
   *   either options on init
   *   or a method name followed by arguments to pass to the method
   */
  $.fn[pluginName] = function(methodOrOptions) {
    var args = Array.prototype.slice.call(arguments, 1)

    return this.map(function(){
      var $t = $(this),
      object = $t.data(pluginName)

      if(object && API[methodOrOptions])
        return API[methodOrOptions].apply(object, args) || this
      else if(!object && (methodOrOptions === undefined ||
                          typeof methodOrOptions === "object"))
        $t.data(pluginName, new Container($t, methodOrOptions))

      return this
    });
  };

}(jQuery, window, 'sortable');
//blackbox
var rpnblackboxmodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;
    var boxes;
    var shuffle;
    var toggleViewButton;
    
    var addComment=function(inputId, classDiv, buttonId, position, t1, t2, t3, t4, t5, t6, t7, t8, t9){
    	
    	var chooseTest=function(arg, idInput,divClass, idButton){
    		switch(arg){
    		case 'isNumberN':
    			isNumberN(idInput, divClass, idButton);
    		break;
    		case 'isNumberZ':
    			isNumberZ(idInput, divClass, idButton);
    		break;
    		case 'isNumberD':
    			isNumberD(idInput, divClass, idButton);
    		break;
    		case 'isNumberQ':
    			isNumberQ(idInput, divClass, idButton);
    		break;
    		case 'isNumber':
    			isNumber(idInput, divClass, idButton);
    		break;
    		case 'withComma':
    			withComma(idInput);
    		break;
    		case 'firstPoint':
    			firstPoint(idInput);
    		break;
    		case 'firstComma':
    			firstComma(idInput);
    		break;
    		case 'firstPointComma':
    			firstPointComma(idInput);
    		break;
    		default:
    		break;
    		}
    	}
    	$(inputId).bind('input propertychange', function(){
    		chooseTest(t1, inputId,classDiv, buttonId);
    		chooseTest(t2, inputId,classDiv, buttonId);
    		chooseTest(t3, inputId,classDiv, buttonId);
    		chooseTest(t4, inputId,classDiv, buttonId);
    		chooseTest(t5, inputId,classDiv, buttonId);
    		chooseTest(t6, inputId,classDiv, buttonId);
    		chooseTest(t7, inputId,classDiv, buttonId);
    		chooseTest(t8, inputId,classDiv, buttonId);
    		chooseTest(t9, inputId,classDiv, buttonId);
    	});
    }
    var isNumberN=function(str, myClass, myButton){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1),
    		monTexte="Il faut entrer un nombre entier positif";
    	if(/[0-9]/.test(lastOfRep)){
    		if(/0/.test(prevOfRep)&&prevOfRep.length==1){
    			$(str).val(lastOfRep);
    		}
    		$(myClass).css("display", "none");
    	}else if(/,/.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));
    		$(myButton).text(monTexte);
    		$(myClass).css("display", "block");
    	}
    	else if(/\./.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));
    		$(myButton).text(monTexte);
    		$(myClass).css("display", "block");		
    	}
    	else if(/-/.test(lastOfRep)){
    		$(myButton).text(monTexte);
    		$(myClass).css("display", "block");	
    		$(str).val(rep.substring(0,rep.length-1));	
    	}else{
    		$(str).val(prevOfRep);
    		$(myButton).text("Il faut entrer un chiffre");
    		$(myClass).css("display", "block");
    	}
    }
    var isNumberZ=function(str, myClass, myButton){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1),
    		monTexte="Il faut entrer un nombre entier";;
    	if(/[0-9]/.test(lastOfRep)){//On test si le chiffre d'avant est un 0
    		if(/0/.test(prevOfRep)&&prevOfRep.length==1){
    			$(str).val(lastOfRep);
    		}
    		if(/-0/.test(prevOfRep)&&prevOfRep.length==2){
    			$(str).val('-'+lastOfRep);
    		}
    		$(myClass).css("display", "none");
    	}else if(/,/.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));
    		$(myButton).text(monTexte);
    		$(myClass).css("display", "block");
    	}
    	else if(/\./.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));
    		$(myButton).text(monTexte);
    		$(myClass).css("display", "block");		
    	}
    	else if(/-/.test(lastOfRep)){//On teste s'il y a un - seulement au début
    		if(rep.length>1){
    			$(str).val(rep.substring(0,rep.length-1));
    		}else{
    			$(myClass).css("display", "none");
    		}		
    	}else if(rep.length===0){
    		$(myButton).text("Il faut entrer un nombre");
    		$(myClass).css("display", "block");
    	}
    	else{
    		$(str).val(prevOfRep);
    		$(myButton).text("Il faut entrer un chiffre");
    		$(myClass).css("display", "block");
    	}
    }
    var isNumberQ=function(str, myClass, myButton){//à Faire
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1),
    		monTexte="Il faut entrer un nombre entier";;
    	if(/[0-9]/.test(lastOfRep)){//On test si le chiffre d'avant est un 0
    		if(/0/.test(prevOfRep)&&prevOfRep.length==1){
    			$(str).val(lastOfRep);
    		}
    		if(/-0/.test(prevOfRep)&&prevOfRep.length==2){
    			$(str).val('-'+lastOfRep);
    		}
    		$(myClass).css("display", "none");
    	}else if(/,/.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));
    		$(myButton).text(monTexte);
    		$(myClass).css("display", "block");
    	}
    	else if(/\./.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));
    		$(myButton).text(monTexte);
    		$(myClass).css("display", "block");		
    	}
    	else if(/-/.test(lastOfRep)){//On teste s'il y a un - seulement au début
    		if(rep.length>1){
    			$(str).val(rep.substring(0,rep.length-1));
    		}else{
    			$(myClass).css("display", "none");
    		}		
    	}else if(rep.length==0){
    		$(myButton).text("Il faut entrer un nombre");
    		$(myClass).css("display", "block");
    	}
    	else{
    		$(str).val(prevOfRep);
    		$(myButton).text("Il faut entrer un chiffre");
    		$(myClass).css("display", "block");
    	}
    }
    var isNumberD=function(str, myClass, myButton){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    	if(/[0-9]/.test(lastOfRep)){//On test si le chiffre d'avant est un 0
    		if(/0/.test(prevOfRep)&&prevOfRep.length==1){
    			$(str).val(lastOfRep);
    		}
    		if(/-0/.test(prevOfRep)&&prevOfRep.length==2){
    			$(str).val('-'+lastOfRep);
    		}
    		$(myClass).css("display", "none");
    	}else if(/,/.test(lastOfRep)){//On teste s'il y a plusieurs virgules
    		if(/,/.test(prevOfRep.substring(0,rep.length-1))){
    			$(str).val(rep.substring(0,rep.length-1));
    		}
    	}
    	else if(/\./.test(lastOfRep)){//On teste s'il y a plusieurs points
    		if(/,/.test(prevOfRep.substring(0,rep.length-1))){
    			$(str).val(rep.substring(0,rep.length-1));
    		}	
    	}
    	else if(/-/.test(lastOfRep)){//On teste s'il y a un - seulement au début
    		if(rep.length>1){
    			$(str).val(rep.substring(0,rep.length-1));
    		}else{
    			$(myClass).css("display", "none");
    		}		
    	}else if(rep.length==0){
    		$(myButton).text("Il faut entrer un nombre");
    		$(myClass).css("display", "block");
    	}
    	else{
    		$(str).val(prevOfRep);
    		$(myButton).text("Il faut entrer un chiffre");
    		$(myClass).css("display", "block");
    	}
    }
    var isNumber=function(str, myClass, myButton){//Il faut encore faire si on met une puisance de 10
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    	if(/[0-9]/.test(lastOfRep)){//On test si le chiffre d'avant est un 0
    		if(/0/.test(prevOfRep)&&prevOfRep.length==1){
    			$(str).val(lastOfRep);
    		}
    		if(/-0/.test(prevOfRep)&&prevOfRep.length==2){
    			$(str).val('-'+lastOfRep);
    		}
    		$(myClass).css("display", "none");
    	}else if(/,/.test(lastOfRep)){//On teste s'il y a plusieurs virgules
    		if(/,/.test(prevOfRep.substring(0,rep.length-1))){
    			$(str).val(rep.substring(0,rep.length-1));
    		}
    	}
    	else if(/\./.test(lastOfRep)){//On teste s'il y a plusieurs points
    		if(/,/.test(prevOfRep.substring(0,rep.length-1))){
    			$(str).val(rep.substring(0,rep.length-1));
    		}	
    	}
    	else if(/-/.test(lastOfRep)){//On teste s'il y a un - seulement au début
    		if(rep.length>1){
    			$(str).val(rep.substring(0,rep.length-1));
    		}else{
    			$(myClass).css("display", "none");
    		}		
    	}else if(rep.length==0){
    		$(myButton).text("Il faut entrer un nombre");
    		$(myClass).css("display", "block");
    	}
    	else{
    		$(str).val(prevOfRep);
    		$(myButton).text("Il faut entrer un chiffre");
    		$(myClass).css("display", "block");
    	}
    }
    var withComma=function(str){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    		if(/,/.test(lastOfRep)){
    			if(/,/.test(prevOfRep.substring(0,rep.length-1))){
    				$(str).val(rep.substring(0,rep.length-1));
    			}
    		}
    		if(/\./.test(lastOfRep)){//On remplace le . par une , s'il n'y en pas déjà une
    			if(/,/.test(prevOfRep)){
    				$(str).val(prevOfRep.substring(0,prevOfRep.length-1));
    			}else{//Sinon on l'efface
    				$(str).val(rep.substring(0,rep.length-1).concat(','));
    			}	
    		}
    }
    var firstPoint=function(str){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    	if(/-/.test(prevOfRep)&&/^\./.test(lastOfRep)){
    		$(str).val("-0.");
    	}
    	if(/^\./.test(rep)){//On remplace le . 0.
    		$(str).val("0.");
    	}
    }
    var firstComma=function(str){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    	if(/-/.test(prevOfRep)&&/^,/.test(lastOfRep)){
    		$(str).val("-0,");
    	}
    	if(/^,/.test(rep)){//On remplace le , 0,
    		$(str).val("0,");
    	}		
    }
    var firstPointComma=function(str){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    	if(/-/.test(prevOfRep)&&/^\./.test(lastOfRep)){
    		$(str).val("-0,");
    	}
    	if(/^\./.test(rep)){//On remplace le . 0.
    		$(str).val("0,");
    	}
    }
    
    

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            validation: {
                type:"integer",
                mode:"lock"
            },
            operation: "x1",
            left: [1],
            right: [1],
            shuffle: false
        });
        datas = _datas;
        domelem = _domelem;
        shuffle = _datas.shuffle;
        boxes = [];
        responses = {
            left: [],
            right: []
        };

        _.each(datas.right, function(val, idx) {
            boxes.push({
                position: "right",
                originalposition: idx,
                value: val
            })
        });
        _.each(datas.left, function(val, idx) {
            boxes.push({
                position: "left",
                originalposition: idx,
                value: val
            })
        });
        if (shuffle)
            boxes = _.shuffle(boxes);
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('blackbox');

        domelem.append($('<div class="row header"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><p class="text-center">x</p></div><div class="col-xs-2 operation"></div><div class="col-xs-2"><p class="text-center">y</p></div></div>'));
        $('.header', domelem).hide();

        _.each(boxes, function(box, idx) {
            if (box.position == 'left') {
                domelem.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><p class="text-center">' + box.value + '</p></div><div class="col-xs-2 operation"><p class="text-center"><i class="glyphicon glyphicon-minus"></i>' + datas.operation + '<i class="glyphicon glyphicon-arrow-right"></i></p></div><div class="col-xs-2"><input type="text" class="rpnm_input form-control" style="text-align: center;"></div></div>'));
            }
            else {
                domelem.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><input type="text" class="rpnm_input form-control" style="text-align: center;"></div><div class="col-xs-2 operation"><p class="text-center"><i class="glyphicon glyphicon-minus"></i>' + datas.operation + '<i class="glyphicon glyphicon-arrow-right"></i></p></div><div class="col-xs-2"><p class="text-center">' + box.value + '</p></div></div>'));
            }
        });
        toggleViewButton = $('<button>', {
            'data-toggle': 'button',
            'class': 'btn btn-link btn-xs',
            text: ' ' + rpnsequence.getLabels().BlackboxTableView
        }).prepend($('<i class="glyphicon glyphicon-resize-small"></i>'));
        domelem.append($('<p class="text-center"></p>').append(toggleViewButton));

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);
        bindUiEvents();
    };

    var toggleView = function() {
        $('.operation', domelem).slideToggle();
        $('.header', domelem).slideToggle();
    };

    var bindUiEvents = function() {
        //Change view mode
        toggleViewButton.click(function() {
            var $el = $(this),
                textNode = this.lastChild;
            $el.find('i').toggleClass('glyphicon-resize-small glyphicon-resize-full');
            textNode.nodeValue = ' ';
            textNode.nodeValue = ' ' + ($el.hasClass('showArchieved') ? rpnsequence.getLabels().BlackboxTableView : rpnsequence.getLabels().BlackboxView)
            $el.toggleClass('showArchieved');
            toggleView();
        });
        
        //Input validation
        //rpnsequence.addvalidation($('.rpnm_input',domelem),datas.validation);
        
        //Validation
        validationButton.click(function() {
            $.each($('.rpnm_input', domelem), function(idx, gap) {
                var t = boxes[idx];
                responses[t.position][t.originalposition] = $(gap).val();
            });

            rpnsequence.handleEndOfModule(responses, function(res, sol) {
                var score = 0;
                _.each(sol.right, function(val, idx) {
                    score += res.right[idx] == val ? 1 : 0;
                });
                _.each(sol.left, function(val, idx) {
                    score += res.left[idx] == val ? 1 : 0;
                });
                return score;
            });
        });
    };

    return {
        init: init
    };

};
//cardmaze
var rpncardmazemodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;
    var currentHead;
    var height;
    var width;
    var snake;
    var startid;
    var endid;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            mazewidth: 6,
            mazeheight: 4,
            cards: [{
                label: "label",
                clue: "clue"
            }]
        });
        datas = _datas;
        height = datas.mazeheight;
        width = datas.mazewidth;
        domelem = _domelem;
        responses = [];
        buildUi();
        snake = [];
    };

    var buildUi = function() {
        //build card maze
        domelem.addClass('cardmaze');
        domelem.append($('<div class="row"><div class="container maze"></div></div>'));
        _.each(datas.cards, function(card, idx) {
            $('.maze',domelem).append($('<div class="col-xs-2 nopadding"></div>').append($('<div class="card' + (card.start ? ' start selectable' : '') + (card.end ? ' end' : '') + '"><p>' + card.label + '</p><p>' + card.clue + '</p></div>').data('cardId',idx)));
            if (card.start) {
                currentHead = idx;
                startid = idx;
            }
            if (card.end) {
                endid = idx;
            }

        });
        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);
        bindUiEvents();

    };


    var bindUiEvents = function() {
        _.each($('.card'), function(card, idx) {
            $(card).click(function() {
                if ($(card).hasClass('start') || $(card).hasClass('selectable') || $(card).hasClass('selected')) {
                    if (((idx == currentHead && $(card).hasClass('start') ) ||idx == currentHead + width || idx == currentHead - width || idx == currentHead - 1 || idx == currentHead + 1) && !$(card).hasClass('selected')) {
                        snake.push(card);

                    }else if($(card).hasClass('selected')){
                        snake=snake.slice(0,_.indexOf(snake,card)+1);
                    }
                    currentHead = idx;
                    $('.selected').removeClass('selected');
                    $('.selectable').removeClass('selectable');
                    $('.card').removeClass('fromtop frombottom fromleft fromright totop tobottom toleft toright');
                    _.each(snake,function(icard,ii){
                        if(ii>0){
                            var dif=$(icard).data('cardId')-$(snake[ii-1]).data('cardId');
                            if(dif==width){
                                $(icard).addClass('fromtop');
                            }else if(dif==-width){
                                $(icard).addClass('frombottom');
                            }else if(dif==1){
                                $(icard).addClass('fromleft');
                            }else if(dif==-1){
                                $(icard).addClass('fromright');
                            }
                        }
                        if(ii<snake.length-1){
                            var dif=$(icard).data('cardId')-$(snake[ii+1]).data('cardId');
                            if(dif==-width){
                                $(icard).addClass('tobottom');
                            }else if(dif==width){
                                $(icard).addClass('totop');
                            }else if(dif==-1){
                                $(icard).addClass('toright');
                            }else if(dif==1){
                                $(icard).addClass('toleft');
                            }
                        }
                        $(icard).addClass('selected');
                    });
                    if (idx != endid) {
                        if (!((idx + width) > (width * height))) {
                            $($('.card')[idx + width]).addClass('selectable');
                        }
                        if (!((idx - width) < 0)) {
                            $($('.card')[idx - width]).addClass('selectable');
                        }
                        if (idx % width != 0) {
                            $($('.card')[idx - 1]).addClass('selectable');
                        }
                        if ((idx + 1) % width != 0) {
                            $($('.card')[idx + 1]).addClass('selectable');
                        }
                    }
                }
            });
        });
        validationButton.click(function() {
            if (!$(snake[snake.length - 1]).hasClass('end')) {
                rpnsequence.displayAlert(rpnsequence.getLabels().CardMazeNotEnded);
            } else {
                _.each(snake,function(card,idx){
                    responses[idx]=$(card).data("cardId");
                });
                rpnsequence.handleEndOfModule(responses, function(res, sol) {
                    var score = 0;
                    _.each(sol, function(cardIdx, idx) {
                        score += (res[idx] == cardIdx ? 1 : 0);
                    })
                    return score;
                });
            }
        });
    };

    return {
        init: init
    };
};
//clock
var rpnclockmodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var clock;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            random: true,
            hour:'10:10'
        });
        datas = _datas;
        if(datas.random){
            datas.hour=Math.floor((Math.random() * 24) + 1)+':'+Math.floor(Math.random() * 59);
        }
        
        domelem = _domelem;
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('clock');

        //build panel with sentences
        domelem.append($('<div id="rpnclock"></div>'));
        clock=EduClock();
        clock.init({},$('#rpnclock'));

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            var time=clock.getCurrentTime()
            rpnsequence.handleEndOfModule(time.hour+':'+time.minute, function(res, sol) {
                return res == sol ? 1 : 0;
            });
        });
    };

    return {
        init: init
    };
};

var EduClock = function() {

    var domelem;
    var opts;
    var sunCanvas;
    var dialCanvas;
    var handCanvas;
    var changeState=false;
    var size;
    var ctxSun;
    var ctxDial;
    var ctxHands;
    var radius;
    var handradius;
    var currentHours;
    var currentMinutes;
    var actuallyMoving;
    var angleHour;
    var angleMinutes;
    var PM;
    
    var init = function(_opts,_domelem){
        _.defaults(_opts,{
            margin: 10,
            marginnumbers:-30,
            fontheight:15,
            hour:10,
            minute:10
        });
        opts=_opts;
        PM=opts.hour>12;
        domelem=_domelem;
        actuallyMoving='nothing';
        buildUi();
    };

    var buildUi = function (){
        //build dialCanvas
        sunCanvas=$('<canvas>',{style:"position: absolute; left: 0; top: 0; z-index: 0;"})
        dialCanvas=$('<canvas>',{style:"position: absolute; left: 0; top: 0; z-index: 1;"});
        handCanvas=$('<canvas>',{style:"position: absolute; left: 0; top: 0; z-index: 2;"})
        domelem.append([sunCanvas, dialCanvas,handCanvas]);
        sunCanvas=sunCanvas[0];
        dialCanvas=dialCanvas[0];
        handCanvas=handCanvas[0];
        size=Math.min(domelem.width(),domelem.height());
        
        
        sunCanvas.width=size;
        sunCanvas.height=size;
        dialCanvas.width=size;
        dialCanvas.height=size;
        handCanvas.width=size;
        handCanvas.height=size;
        
        radius=size/2 - opts.margin;
        handradius=radius + opts.marginnumbers;
        
        ctxSun=sunCanvas.getContext( '2d' );
        ctxDial=dialCanvas.getContext( '2d' );
        ctxHands=handCanvas.getContext( '2d' );
        ctxHands.translate(size/2,size/2);
        
        currentHours=opts.hour;
        currentMinutes=opts.minute;
        drawDial();
        drawHands();
        
        bindUiEvents();
    };
    
    var drawDial = function(){
        ctxDial.save();
        ctxDial.font = '15px Arial';
        ctxDial.lineWidth=3;
        ctxDial.beginPath();
   		ctxDial.arc(size/2, size/2, size/2-opts.margin, 0, Math.PI*2, true);
   		ctxDial.stroke();
   		
   		//center
   		ctxDial.beginPath();
		ctxDial.arc(size/2, size/2, 10, 0, Math.PI*2, true);
		ctxDial.fill();
		
		//moon
		ctxDial.fillStyle='#fff';
		ctxDial.beginPath();
		ctxDial.arc(size/2, size/2 + radius/2,radius/4,0,Math.PI*2,true);
		ctxDial.fill();
		
		ctxDial.fillStyle='#000';
		//numbers 1 to 12
		var numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
		var angle = 0;
		var numeralWidth = 0;
		ctxDial.font= opts.fontheight + 'px Arial';
		$.each(numerals,function(idx,numeral) {
			angle = Math.PI/6 * (numeral-3);
			numeralWidth = ctxDial.measureText(numeral).width;
			ctxDial.fillText(
			    numeral,
                dialCanvas.width/2 + Math.cos(angle)*(handradius) -
                numeralWidth/2,
                dialCanvas.height/2 + Math.sin(angle)*(handradius) +
                opts.fontheight/3);
		});
		
		//tiles
		ctxDial.translate(size/2,size/2);
		angle=Math.PI/30;
		for(var til=1;til<=60;til++){
		    var isbig=(til%5==0);
		    ctxDial.rotate(angle);
		    var rectWidth=isbig?8:2;
		    var rectHeight=isbig?15:8;
            ctxDial.fillRect(radius-rectHeight, -rectWidth/2, rectHeight,rectWidth);
		}
		ctxDial.translate(-size/2,-size/2);
		ctxDial.restore();
    };
	
	var drawHands = function () {
	    ctxHands.save();
	    ctxHands.clearRect(-size/2, -size/2, size, size);
	    
	    angleHour=(((currentHours*60)+currentMinutes) * 0.5)%360 * Math.PI/180 - (Math.PI/2);
	    if(angleHour<0){
	        angleHour+=(2*Math.PI);
	    }
	    angleMinutes=(currentMinutes * 6)%360 * Math.PI/180 - (Math.PI/2);
	    if(angleMinutes<0){
	        angleMinutes+=(2*Math.PI);
	    }
	    
	    //Hours
	    ctxHands.rotate(angleHour);
	    ctxHands.fillStyle="#000";
	    ctxHands.fillRect(5, -4, radius*0.6,8);
	    ctxHands.rotate(-angleHour);
	    
	    //Minutes
	    ctxHands.fillStyle="#f00";
	    ctxHands.rotate(angleMinutes);
	    ctxHands.fillRect(5, -2, radius*0.85,4);
	    ctxHands.rotate(-angleMinutes);
	    ctxHands.restore();
	    
	    drawMoon();
	};
	
	var drawMoon = function(){
	    //background
	    //from #ffffff to #428bca in percent
	    var time=getCurrentTime();
	    //console.log(time.hour+':'+time.minute + (PM?'PM':'AM'));
	    var minutes=time.hour*60 + time.minute;
	    var weight=0;
	    if(minutes>960 && minutes<1200){
	        weight=(1200-minutes)/2.4;
	    }
	    if(minutes>240 && minutes<480){
	        weight=Math.abs((minutes - 480)/2.4);
	        weight=100-weight;
	    }
	    if(minutes>=480 && minutes<=960){
	        weight=100;
	    }
	    var col=mixColors(new Color('ffffff'),new Color('428bca'),weight);
        ctxSun.fillStyle =  col.toRGB();
        ctxSun.fillRect(0,0,size,size);
        
	};
	
	var mixColors = function (color1, color2, weight) {
        var p = weight / 100.0;
        var w = p * 2 - 1;
        var a = color1.toHSL().a - color2.toHSL().a;

        var w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        var w2 = 1 - w1;

        var rgb = [color1.rgb[0] * w1 + color2.rgb[0] * w2,
            color1.rgb[1] * w1 + color2.rgb[1] * w2,
            color1.rgb[2] * w1 + color2.rgb[2] * w2];

        var alpha = color1.alpha * p + color2.alpha * (1 - p);

        return new Color(rgb, alpha);
    };
    
    var getAngleFromCoordinates=function(x,y){
        var a= Math.atan2(y-(size/2),x-(size/2));
        if(a<0){
            a= a+(2*Math.PI);
        }
        return a
    };
    
    var findWhatToChange = function(x,y){
        //Based on coordinates, try to find if we move minutes or hours or nothing
        actuallyMoving='nothing';
        var angle=getAngleFromCoordinates(x,y);
        var radiusAsked=Math.sqrt(Math.pow(y-(size/2),2)+Math.pow(x-(size/2),2));
        if(radiusAsked<=(size/2-opts.margin)){
            if(angle>(angleMinutes-(Math.PI/12)) && angle<(angleMinutes+(Math.PI/12))){
                actuallyMoving = 'minutes';
            }else if(angle>(angleHour-(Math.PI/6)) && angle<(angleHour+(Math.PI/6))){
                actuallyMoving ='hours';
            }else{
                actuallyMoving ='nothing';
            }
        }
    };
    
	var changeTime = function(x,y) {
	    var radiusAsked=Math.sqrt(Math.pow(y-(size/2),2)+Math.pow(x-(size/2),2));
	    if(radiusAsked<=(size/2-opts.margin)){
    	    var angle=getAngleFromCoordinates(x,y);
    	    angle=angle+(Math.PI/2)
    	    if(angle>(2*Math.PI)){
    	        angle=angle-(2*Math.PI);
    	    }
    	    if(actuallyMoving=='minutes'){
    	        var storedCM=currentMinutes;
    	        currentMinutes  =  Math.round(30/Math.PI * angle);
    	        if(currentMinutes>=60){
    	            currentMinutes=0;
    	        }
    	        if(currentMinutes<=15 && storedCM>=45){
    	            currentHours++;
    	        }else if(currentMinutes>=45 && storedCM<=15){
    	            currentHours--;
    	        }
    	        if(currentHours>11){
    	            console.log('currentHours:'+currentHours+', PM:'+PM);
                    PM=!PM;
                    currentHours=0;
        	    }else if(currentHours<0){
        	        console.log('currentHours:'+currentHours+', PM:'+PM);
        	        PM=!PM;
        	        currentHours=11;
        	    }
    	    }else if(actuallyMoving=='hours'){
    	        var storedCH=currentHours;
    	        var step=Math.round(360/Math.PI * angle);
    	        currentMinutes=step%60;
    	        var newHour=Math.floor((step-currentMinutes)/60);
    	        if(newHour==12){
    	            newHour=0;
    	        }
    	        //PM if storedCH<=11 and newHour==0
    	        if((storedCH<=11 && storedCH>=9 && newHour>=0 && newHour<=3) || (storedCH>=0 && storedCH<=3 && newHour>=9 && newHour<=11)){
    	            PM=!PM;
    	        }
    	        //console.log(newHour);
    	        currentHours=newHour;
    	    }
    	    
    		drawHands();
	    }
	};
	

    var bindUiEvents = function(){
        $(handCanvas).on('mousedown',function(e){
            findWhatToChange(e.offsetX,e.offsetY);
            if(actuallyMoving!='nothing'){
                changeState=true;
            }
        });
        $(handCanvas).on('mouseup',function(){changeState=false;});
        $(handCanvas).on('mouseout',function(){changeState=false;});
        $(handCanvas).on('mousemove',function(e){
            if(changeState && actuallyMoving!='nothing'){
                changeTime(e.offsetX,e.offsetY);
            }
        });
    };
    
    var getCurrentTime = function(){
        return {hour:currentHours + (PM?12:0),minute:currentMinutes};
    };
    
    return {
        init:init,
        getCurrentTime:getCurrentTime
    };

};

//
// RGB Colors - #ff0014, #eee
//
var Color = function (rgb, a) {
    //
    // The end goal here, is to parse the arguments
    // into an integer triplet, such as `128, 255, 0`
    //
    // This facilitates operations and conversions.
    //
    if (Array.isArray(rgb)) {
        this.rgb = rgb;
    } else if (rgb.length == 6) {
        this.rgb = rgb.match(/.{2}/g).map(function (c) {
            return parseInt(c, 16);
        });
    } else {
        this.rgb = rgb.split('').map(function (c) {
            return parseInt(c + c, 16);
        });
    }
    this.alpha = typeof(a) === 'number' ? a : 1;
};
Color.prototype.type = "Color";
function toHex(v) {
    return '#' + v.map(function (c) {
        c = Math.min(Math.max(Math.round(c), 0), 255);
        return (c < 16 ? '0' : '') + c.toString(16);
    }).join('');
}
Color.prototype.luma = function () {
    var r = this.rgb[0] / 255,
        g = this.rgb[1] / 255,
        b = this.rgb[2] / 255;

    r = (r <= 0.03928) ? r / 12.92 : Math.pow(((r + 0.055) / 1.055), 2.4);
    g = (g <= 0.03928) ? g / 12.92 : Math.pow(((g + 0.055) / 1.055), 2.4);
    b = (b <= 0.03928) ? b / 12.92 : Math.pow(((b + 0.055) / 1.055), 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
Color.prototype.toRGB = function () {
    return toHex(this.rgb);
};
Color.prototype.toHSL = function () {
    var r = this.rgb[0] / 255,
        g = this.rgb[1] / 255,
        b = this.rgb[2] / 255,
        a = this.alpha;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2, d = max - min;

    if (max === min) {
        h = s = 0;
    } else {
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2;               break;
            case b: h = (r - g) / d + 4;               break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s, l: l, a: a };
};
Color.prototype.toHSV = function () {
    var r = this.rgb[0] / 255,
        g = this.rgb[1] / 255,
        b = this.rgb[2] / 255,
        a = this.alpha;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    if (max === 0) {
        s = 0;
    } else {
        s = d / max;
    }

    if (max === min) {
        h = 0;
    } else {
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s, v: v, a: a };
};
Color.prototype.toARGB = function () {
    return toHex([this.alpha * 255].concat(this.rgb));
};
Color.prototype.compare = function (x) {
    return (x.rgb &&
        x.rgb[0] === this.rgb[0] &&
        x.rgb[1] === this.rgb[1] &&
        x.rgb[2] === this.rgb[2] &&
        x.alpha  === this.alpha) ? 0 : undefined;
};
//dragdropsorting
var rpndragdropsortingmodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            todrag: ["empty"],
            todrop: ["empty too :'("]
        });
        datas = _datas;
        domelem = _domelem;
        responses = [];
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('dragdropsorting');
        domelem.append($('<div class="row"><div class="container"><div class="col-md-2"><ul class="dragthis list-unstyled"></ul></div></div><div class="row"><div class="container" id="dropzonecontainer"></div></div>'));

        $.each(datas.todrop, function(idx, drop) {
            $('#dropzonecontainer').append($('<div class="col-md-2"><div class="droppable"><span class="lead">' + drop + '</span><ul class="list-unstyled"></ul></div></div>'))
        });
        $(".droppable ul").sortable({
            group: 'drop',
            onDrop:function  (item, targetContainer, _super) {
                nextDraggable();
                _super(item);
            }
        });

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
        nextDraggable();
    };

    var nextDraggable = function() {
        if ($('.dragthis li').length == 0 && datas.todrag.length > 0) {
            var itemToDrag = datas.todrag.pop();
            $('.dragthis').append($('<li class="draggable">' + itemToDrag + '</li>'))
            $(".dragthis").sortable({
                group: 'drop',
                drop: false
            });
        }
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            if (datas.todrag.length > 0) {
                rpnsequence.displayAlert(rpnsequence.getLabels().DragDropNotEmpty);
            }
            else {
                _.each($('.droppable'), function(elem, idx) {
                    var txts = [];
                    $.each($(elem).find('li'), function(idx, txt) {
                        txts.push($(txt).text());
                    });
                    responses[$(elem).find('lh').text()] = txts;
                })
                rpnsequence.handleEndOfModule(responses, function(res, sols) {
                    var score = 0;
                    _.map(sols, function(sol, drop) {
                        score += _.intersection(res[drop], sol).length;
                    });
                    return score;
                });
            }
        });
    };

    return {
        init: init
    };
};
//gapfull
var rpngapfullmodule = function() {

    var datas;
    var domelem;
    var validationButton;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            sentence: "sentence not set!"
        });
        datas = _datas;
        domelem = _domelem;
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('gapfull');

        //build panel with sentence
        domelem.append($('<p>' + datas.sentence + '</p><input type="text" id="gapfullresponse" class="rpnm_input form-control">'));
        $('input',domelem).val(datas.sentence);

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            rpnsequence.handleEndOfModule($('input',domelem).val(), function(res, sol) {
                //Try to trim and do automatic corrections here.
                return res == sol ? 1 : 0;
            });
        });
    };

    return {
        init: init
    };

};
//gapsimple
var rpngapsimplemodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;
    var ddmode;
    var maxfillength;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            tofill: "tofill not set!<b>Read</b> documentation please!"
        });

        datas = _datas;
        ddmode= !_.isUndefined(_datas.fillers);
        domelem = _domelem;
        responses = [];
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('gapsimple');
        var availableColors = _.shuffle(['primary', 'success', 'info', 'warning', 'danger']);

        if(ddmode){
            var toolbar = $('<div class="gapsimpleddtoolbar">');
            $.each(datas.fillers, function(idx, filler) {
                toolbar.append($('<span class="draggable">'+filler+'</span> '));
            });
            maxfillength=_.max(datas.fillers, function(filler){ return filler.length; }).length;
            domelem.append(toolbar.sortable({
                    group: 'drop',
                    drop: false,
                    itemSelector:'span',
                    containerSelector:'div',
                    placeholder:'<span class="placeholder"/>',
                    onDragStart: function (item, container, _super) {
                        if(!container.options.drop){
                            // Clone item
                            item.clone().insertAfter(item);
                        }else{
                            // Remove item and restore white space
                            $('<span>'+Array(maxfillength).join("_")+'</span>').insertAfter(item);
                        }
                        _super(item);
                    },
                    onDrop:function($item, container, _super, event){
                        $item.parent().empty().append($item);
                        _super($item);
                    }
                })
            );
        }
        
        //build panel with sentences
        domelem.append($('<div id="sentences" class="form-inline">' + datas.tofill + '</div>'));
        $.each($('#sentences b', domelem), function(idx, tofill) {
            responses[idx] = -1; //initialize all responses to unmark
            var t = $(tofill);
            if(ddmode){
                //add a white space for drag and drop
                t.replaceWith($('<b class="gapsimpleddresponse">').append('<span>'+Array(maxfillength).join("_")+'</span>').sortable({
                    group: 'drop',
                    itemSelector:'span',
                    containerSelector:'b',
                    vertical:false
                }));
            }else{
                t.replaceWith($('<input type="text" id="' + idx + '" class="rpnm_input gapsimple form-control"> <strong>(' + t.text() + ')</strong>'));    
            }
            
        });
        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            if(ddmode){
                _.each($('.gapsimpleddresponse',$('#sentences',domelem)),function(elem,idx){
                    responses[idx] = $('.draggable',$(elem)).text();
                });
                
            }else{
                $.each($('.gapsimple',domelem), function(idx, gap) {
                    responses[idx] = $(gap).val();
                });
            }
            rpnsequence.handleEndOfModule(responses, function(res, sol) {
                var score = 0;
                _.each(sol, function(val, idx) {
                    score += res[idx] == val ? 1 : 0;
                });
                return score;
            });
        });
    };

    return {
        init: init
    };

};
//marker
var rpnmarkermodule = function() {

    var datas;
    var domelem;
    var selectedMarker;
    var validationButton;
    var responses;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            markers: [],
            tomark: ["fill tomark to feel good please!"]
        });
        datas = _datas;
        domelem = _domelem;
        selectedMarker = -1;
        responses = [];
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('marker');
        var toolbar = $('<div>', {
            'class': 'btn-group',
            'data-toggle': 'buttons'
        });
        var availableColors = _.shuffle(['primary', 'success', 'info', 'warning', 'danger']);

        toolbar.append($('<label class="btn btn-default active"><input type="radio" name="options" id="option1" autocomplete="off" checked><i class="glyphicon glyphicon-pencil"></i> ' + rpnsequence.getLabels().Eraser + '</label>').click(function() {
            selectedMarker = -1;

        }));
        $.each(datas.markers, function(idx, marker) {
            toolbar.append($('<label class="btn btn-' + (availableColors[idx] || 'default') + '"><input type="radio" name="options" id="option3" autocomplete="off"><i class="glyphicon glyphicon-pencil"></i> ' + marker + '</label>').click(function() {
                selectedMarker = marker;
            }));
        });
        domelem.append(toolbar);

        //build panel with sentences
        domelem.append($('<div id="sentences">' + datas.tomark + '</div>'));
        $.each($('#sentences b', domelem), function(idx, tomark) {
            responses[idx] = -1; //initialize all responses to unmark
            var t = $(tomark);
            t.css('cursor', 'pointer').click(function() {
                t.removeClass();
                if (selectedMarker != -1) {
                    t.addClass('marker-' + availableColors[_.indexOf(datas.markers,selectedMarker)]);
                }
                responses[idx] = selectedMarker;
            });
        });
        //build validation button
        validationButton = $('<button>', {
            'class': 'btn btn-primary',
            text: ' ' + rpnsequence.getLabels().Validate
        }).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            rpnsequence.handleEndOfModule(responses, function(res, sol) {
                var score = 0;
                _.each(sol, function(val, idx) {
                    score += res[idx] == val ? 1 : 0;
                });
                return score;
            });
        });
    };

    return {
        init: init

    };
};
//mqc
var rpnmqcmodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            questions: ["No questions!"],
            answers: ["As no answers"]
        });

        datas = _datas;
        domelem = _domelem;
        responses = [];
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('mqc');

        //build panel with sentences
        var uilist = $('<ul>', {
            'class': 'list-unstyled'
        });
        $.each(datas.questions, function(idq, question) {
            responses[idq] = -1; //initialize all responses to uncheck
            var li = $('<li>');
            li.append($('<p>' + question + '</p>'));
            var answerGroup = $('<div class="btn-group" data-toggle="buttons">');
            $.each(datas.answers, function(ida, answer) {
                answerGroup.append($('<label class="btn btn-default"><input type="radio" name="question_' + idq + '" id="answer_' + idq + '_' + ida + '" autocomplete="off">' + answer + '</label>').click(function() {
                    responses[idq] = answer;
                }));
                li.append(answerGroup);
            });
            uilist.append(li);
        });
        domelem.append(uilist);

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            rpnsequence.handleEndOfModule(responses, function(res, sol) {
                var score = 0;
                _.each(sol, function(val, idx) {
                    score += res[idx] == val ? 1 : 0;
                });
                return score;
            });
        });
    };

    return {
        init: init
    };

};
/*!
 * rpnmodule v0.0.1 (https://github.com/golayp/rpnmodule)
 * 
 * Dependencies: jquery 2.1.1, bootstrap 3.3.1, underscore 1.7.0
 * 
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
var rpnsequence = (function() {

    var sequencedatas;
    var currentmod;
    var mainContent;
    var source;
    var solurl;
    var backurl;
    var responses;
    var warnexit;
    var sequenceendHandler;
    var moduleendHandler;
    var mediapathHandler;
    var alertModal;
    var domelem;
    var navigationEnabled;
    var debug;
    var labels = {
        en: {
            Recall: "Recall",
            Order: "Order",
            Warning: "Warning",
            BeforeUnloadMsg: "Module running!",
            Wait: "Wait please...",
            Validate: "Validate",
            Eraser: "Eraser",
            DragDropNotEmpty: "There are still some items to sort!",
            CardMazeNotEnded: "You have not finished the maze!",
            Sources: "Sources",
            BlackboxTableView: "Values table",
            BlackboxView: "Blackbox"
        },
        fr: {
            Recall: "Rappel",
            Order: "Consignes",
            Warning: "Attention",
            BeforeUnloadMsg: "Exercice en cours!",
            Wait: "Veuillez patienter...",
            Validate: "Valider",
            Eraser: "Effaceur",
            DragDropNotEmpty: "Il y a encore des éléments à trier!",
            CardMazeNotEnded: "Vous n'avez pas terminé le labyrinthe!",
            Sources: "Sources",
            BlackboxTableView: "Tableau de valeurs",
            BlackboxView: "Boîte noire"
        }
    };
    var selectedLabels;


    var init = function(opts) {
        if (_.isUndefined(opts)) {
            opts = {};
        }
        _.defaults(opts, {
            sequrl: "seq.json",
            solurl: "sol.json",
            returnurl: "../",
            warnonexit: false,
            domelem: $('body'),
            onsequenceend: function() {},
            onmoduleend: function() {},
            mediapathformatter: function(val) {
                return 'medias/' + val;
            },
            language: "en",
            debug: false,
            navigationEnabled: false
        });
        selectedLabels = labels[opts.language];
        responses = [];
        warnexit = opts.warnonexit;
        backurl = opts.returnurl;
        solurl = opts.solurl;
        debug = opts.debug;
        domelem = opts.domelem;
        sequenceendHandler = opts.onsequenceend;
        moduleendHandler = opts.onmoduleend;
        mediapathHandler = opts.mediapathformatter;
        $.getJSON(opts.sequrl, function(datas) {
            _.defaults(datas, {
                title: "sequencetitle",
                modules: []
            });
            sequencedatas = datas;
            //add dynamically status of module to each modules to handle the status (init->started->ended)
            _.each(sequencedatas.modules, function(elem, idx) {
                elem["status"] = "init";
            });
            currentmod = 0;
            navigationEnabled = opts.navigationEnabled && sequencedatas.modules.length > 1;
            buildUi();
        });
    };

    var buildUi = function() {
        domelem.append($('<div class="container" id="rpnm"><div class="row page-header"><div class="col-md-8"><h1 id="rpnm_seq_title"></h1></div><div class="col-md-4"><nav id="rpnm_modulenav"><ul class="pagination pagination-sm"></ul></nav></div></div><div class="row"><div class="col-md-12"><h2 id="rpnm_title"></h2><h3 id="rpnm_context"></h3><h4 id="rpnm_directive"></h4></div></div><div class="row"><div id="rpnm_module_content" class="col-md-12"></div></div></div><div class="container"><div class="row"><div class="col-md-12"><em id="rpnm_source" class="pull-right"></em></div></div>'));
        domelem.append($('<div id="rpnm_recall_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_order_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_alert_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-warning-sign"></i> ' + selectedLabels.Warning + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_wait_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">' + selectedLabels.Wait + '</h4></div><div class="modal-body"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% completed</span></div></div></div></div></div></div>'));
        $('#rpnm_seq_title').html(sequencedatas.title);
        source = $('#rpnm_source');
        mainContent = $('#rpnm_module_content');
        alertModal = $('#rpnm_alert_modal');
        if (!navigationEnabled) {
            $('#rpnm_modulenav').remove();
        }

        _.each(sequencedatas.modules, function(elem, idx) {
            var div = $('<div class="rpnm_instance" id="rpnm_inst_' + idx + '">');
            mainContent.append(div);
            if (elem.type == 'marker') {
                rpnmarkermodule().init(elem, div);
            }
            else if (elem.type == 'mqc') {
                rpnmqcmodule().init(elem, div);
            }
            else if (elem.type == 'gapsimple') {
                rpngapsimplemodule().init(elem, div);
            }
            else if (elem.type == 'gapfull') {
                rpngapfullmodule().init(elem, div);
            }
            else if (elem.type == 'clock') {
                rpnclockmodule().init(elem, div);
            }
            else if (elem.type == 'blackbox') {
                rpnblackboxmodule().init(elem, div);
            }
            else if (elem.type == 'dragdropsorting') {
                rpndragdropsortingmodule().init(elem, div);
            }
            else if (elem.type == 'cardmaze') {
                rpncardmazemodule().init(elem, div);
            }
            div.hide();

            //navigation
            if (navigationEnabled && sequencedatas.modules.length > 1) {
                $('#rpnm_modulenav ul').append($('<li><a href="#">' + (idx + 1) + '</a></li>').click(function() {
                    currentmod = idx;
                    displayCurrentModule();
                }));
            }
        });

        if (warnexit) {
            $(window).bind('beforeunload', function(e) {
                return selectedLabels.BeforeUnloadMsg;
            });
        }
        displayCurrentModule();
    };

    var displayCurrentModule = function() {
        $('#rpnm_wait_modal').modal('show');
        var moduleDatas = sequencedatas.modules[currentmod];
        _.defaults(moduleDatas, {
            title: "title"
        });
        $('.rpnm_instance').hide();

        var moduleDiv = $('#rpnm_inst_' + currentmod);
        bindModuleSharedDatas(moduleDatas);
        handleMediaPath();
        //navigation
        if (navigationEnabled) {
            $('#rpnm_modulenav ul li').removeClass('active');
            $($('#rpnm_modulenav ul li')[currentmod]).addClass('active');
        }
        if (moduleDatas.status != 'ended') {
            moduleDiv.show();
        }
        else {
            //module already ended... try another one or finish the sequence
            currentmod = nextNotEndedModuleIdx();
            if (currentmod >= 0) {
                displayCurrentModule();
            }
            else {
                handleEndOfSequence();
            }
        }

        $('#rpnm_wait_modal').modal('hide');
    };

    var nextNotEndedModuleIdx = function() {
        var nextNotEnded = _.find(sequencedatas.modules, function(mod, idx) {
            return mod.status != 'ended' && idx >= currentmod;
        });
        var previousNotEnded = _.find(sequencedatas.modules, function(mod, idx) {
            return mod.status != 'ended' && idx < currentmod;;
        });
        if (!_.isUndefined(nextNotEnded)) {
            return _.indexOf(sequencedatas.modules, nextNotEnded);
        }
        else if (!_.isUndefined(previousNotEnded)) {
            return _.indexOf(sequencedatas.modules, previousNotEnded);
        }
        else {
            return -1;
        }
    };

    var bindModuleSharedDatas = function(datas) {
        $('#rpnm_title').show().html(datas.title +' <button class="btn btn-default btn-sm  pull-right" href="#" id="rpnm_order_link" data-toggle="modal" data-target="#rpnm_order_modal"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</button><button class="btn btn-default btn-sm pull-right" id="rpnm_recall_link" data-toggle="modal" data-target="#rpnm_recall_modal"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</button>');
        _.isUndefined(datas.context) ? $('#rpnm_context').hide() : $('#rpnm_context').show().text(datas.context);
        _.isUndefined(datas.directive) ? $('#rpnm_directive').hide() : $('#rpnm_directive').show().text(datas.directive);

        if (_.isUndefined(datas.recall)) {
            $('#rpnm_recall_link').hide();
        }
        else {
            $('#rpnm_recall_link').show();
            $('#rpnm_recall_modal .modal-body').html(datas.recall);
        }
        if (_.isUndefined(datas.order)) {
            $('#rpnm_order_link').hide();
        }
        else {
            $('#rpnm_order_link').show();
            $('#rpnm_order_modal .modal-body').html(datas.order);
        }
        source.html(_.isUndefined(datas.sources) ? "" : (selectedLabels.Sources + ": " + datas.sources));
    };

    var handleEndOfModule = function(res, correctionFct) {
        log('End of module');
        //store result locally
        responses[currentmod] = {
            responses: res,
            correctionFct: correctionFct
        };
        //Save status of module
        sequencedatas.modules[currentmod].status = 'ended';
        //disable navigation
        if (navigationEnabled) {
            $($('#rpnm_modulenav ul li')[currentmod]).unbind("click").addClass('disabled')
        };


        $('#rpnm_wait_modal').modal('show');
        currentmod = nextNotEndedModuleIdx();
        moduleendHandler(res);
        if (_.isUndefined(sequencedatas.modules[currentmod])) {
            handleEndOfSequence();
        }
        else {
            displayCurrentModule();
        }
    };

    var handleEndOfSequence = function() {
        log('End of sequence');
        sequenceendHandler(responses);
        //retrieve solutions and use correction function to make score
        $.getJSON(solurl, function(ssol) {
            var score = 0;
            _.each(ssol.solutions, function(sol, idx) {
                score += _.isUndefined(responses[idx]) ? 0 : responses[idx].correctionFct(responses[idx].responses, sol);
            });
            log('Calculated total score for sequence ' + score);
            if (warnexit) {
                $(window).unbind('beforeunload');
            }
            window.location = backurl;
        });
    };

    var genericValidateButton = function(label) {
        label = _.isUndefined(label) ? selectedLabels.Validate : label;
        return $('<button>', {
            'class': 'btn btn-primary',
            text: ' ' + selectedLabels.Validate
        }).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
    };

    var displayAlert = function(text, onclose) {
        $('#rpnm_alert_modal .modal-body').text(text);
        alertModal.modal();
        alertModal.on('hidden.bs.modal', function() {
            if (!_.isUndefined(onclose)) {
                onclose();
            }
        });
    };

    var log = function(msg) {
        if (debug) {
            console.log(msg);
        }
    };

    var handleMediaPath = function() {
        //Images paths
        _.each($('img:not(.rpnm-img, .rpnm-mediapath)'), function(elem, idx) {
            var img = $(elem);
            img.attr('src', mediapathHandler($(elem).attr('src'))).addClass('rpnm-mediapath');
            if (img.is('.modal-body img')) {
                img.addClass('img-responsive img-rounded');
            }
        });
    };

    var getLabels = function() {
        return selectedLabels;
    };
    var addvalidation = function(inputs,validationoptions){
        _.defaults(validationoptions,{
            mode:"lock",
            type:"integer"
        });
        _.each(inputs,function(input,idx){
            $(input).on('keyup change paste',function(){
                 // store current positions in variables
                var inp=$(input);
                inp.val(inp.val().trim());
                if(validationoptions.mode=='lock'){
                    var start = inp[0].selectionStart,
                    end = inp[0].selectionEnd;
                    if(validationoptions.type='integer'){
                        var val=/(\d+)/.exec(inp.val());
                        if(val=='' || val==null){
                            inp.val('');
                        }else{
                            inp.val(parseInt(val));
                        }
                    }
                    inp[0].setSelectionRange(start, end);
                }else if(validationoptions.mode=='display'){
                    if(validationoptions.type='integer'){
                        if(!$.isNumeric(inp.val())){
                            inp.tooltip({title:'integer needed'});
                            inp.tooltip('show');
                        }else{
                            inp.tooltip('destroy');
                        }
                    }
                }
                
            });
        });
    };
    return {
        init: init,
        buildUi: buildUi,
        handleEndOfModule: handleEndOfModule,
        genericValidateButton: genericValidateButton,
        displayAlert: displayAlert,
        log: log,
        getLabels: getLabels,
        addvalidation:addvalidation
    };
})();