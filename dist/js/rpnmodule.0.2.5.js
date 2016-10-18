(function($){
    $.fn.disableSelection = function() {
    return this
        .attr('unselectable', 'on')
        .css('user-select', 'none')
        .on('selectstart', false);
    };
})(jQuery);
/*! jQuery UI - v1.11.2 - 2015-01-28
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, draggable.js, droppable.js, sortable.js
* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
/*!
 * jQuery UI Core 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */


// $.ui might exist from components with no dependencies, e.g., $.ui.position
$.ui = $.ui || {};

$.extend( $.ui, {
	version: "1.11.2",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	scrollParent: function( includeHidden ) {
		var position = this.css( "position" ),
			excludeStaticParent = position === "absolute",
			overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
			scrollParent = this.parents().filter( function() {
				var parent = $( this );
				if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
					return false;
				}
				return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) + parent.css( "overflow-x" ) );
			}).eq( 0 );

		return position === "fixed" || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
	},

	uniqueId: (function() {
		var uuid = 0;

		return function() {
			return this.each(function() {
				if ( !this.id ) {
					this.id = "ui-id-" + ( ++uuid );
				}
			});
		};
	})(),

	removeUniqueId: function() {
		return this.each(function() {
			if ( /^ui-id-\d+$/.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	}
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap='#" + mapName + "']" )[ 0 ];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return $.expr.filters.visible( element ) &&
		!$( element ).parents().addBack().filter(function() {
			return $.css( this, "visibility" ) === "hidden";
		}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// support: jQuery <1.8
if ( !$.fn.addBack ) {
	$.fn.addBack = function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	};
}

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
	$.fn.removeData = (function( removeData ) {
		return function( key ) {
			if ( arguments.length ) {
				return removeData.call( this, $.camelCase( key ) );
			} else {
				return removeData.call( this );
			}
		};
	})( $.fn.removeData );
}

// deprecated
$.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );

$.fn.extend({
	focus: (function( orig ) {
		return function( delay, fn ) {
			return typeof delay === "number" ?
				this.each(function() {
					var elem = this;
					setTimeout(function() {
						$( elem ).focus();
						if ( fn ) {
							fn.call( elem );
						}
					}, delay );
				}) :
				orig.apply( this, arguments );
		};
	})( $.fn.focus ),

	disableSelection: (function() {
		/*var eventType = "onselectstart" in document.createElement( "div" ) ?
			"selectstart" :
			"mousedown";

		return function() {
			return this.bind( eventType + ".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
		};*/
	})(),

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	}
});

// $.ui.plugin is deprecated. Use $.widget() extensions instead.
$.ui.plugin = {
	add: function( module, option, set ) {
		var i,
			proto = $.ui[ module ].prototype;
		for ( i in set ) {
			proto.plugins[ i ] = proto.plugins[ i ] || [];
			proto.plugins[ i ].push( [ option, set[ i ] ] );
		}
	},
	call: function( instance, name, args, allowDisconnected ) {
		var i,
			set = instance.plugins[ name ];

		if ( !set ) {
			return;
		}

		if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
			return;
		}

		for ( i = 0; i < set.length; i++ ) {
			if ( instance.options[ set[ i ][ 0 ] ] ) {
				set[ i ][ 1 ].apply( instance.element, args );
			}
		}
	}
};


/*!
 * jQuery UI Widget 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */


var widget_uuid = 0,
	widget_slice = Array.prototype.slice;

$.cleanData = (function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// http://bugs.jquery.com/ticket/8235
			} catch ( e ) {}
		}
		orig( elems );
	};
})( $.cleanData );

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widget_slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = widget_slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( options === "instance" ) {
					returnValue = instance;
					return false;
				}
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widget_uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled", !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
		}

		return this;
	},

	enable: function() {
		return this._setOptions({ disabled: false });
	},
	disable: function() {
		return this._setOptions({ disabled: true });
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) +
			this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );

		// Clear the stack to avoid memory leaks (#10056)
		this.bindings = $( this.bindings.not( element ).get() );
		this.focusable = $( this.focusable.not( element ).get() );
		this.hoverable = $( this.hoverable.not( element ).get() );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

var widget = $.widget;


/*!
 * jQuery UI Mouse 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */


var mouseHandled = false;
$( document ).mouseup( function() {
	mouseHandled = false;
});

var mouse = $.widget("ui.mouse", {
	version: "1.11.2",
	options: {
		cancel: "input,textarea,button,select,option",
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.bind("mousedown." + this.widgetName, function(event) {
				return that._mouseDown(event);
			})
			.bind("click." + this.widgetName, function(event) {
				if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
					$.removeData(event.target, that.widgetName + ".preventClickEvent");
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind("." + this.widgetName);
		if ( this._mouseMoveDelegate ) {
			this.document
				.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
				.unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
		}
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		if ( mouseHandled ) {
			return;
		}

		this._mouseMoved = false;

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
			$.removeData(event.target, this.widgetName + ".preventClickEvent");
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return that._mouseUp(event);
		};

		this.document
			.bind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.bind( "mouseup." + this.widgetName, this._mouseUpDelegate );

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// Only check for mouseups outside the document if you've moved inside the document
		// at least once. This prevents the firing of mouseup in the case of IE<9, which will
		// fire a mousemove event if content is placed under the cursor. See #7778
		// Support: IE <9
		if ( this._mouseMoved ) {
			// IE mouseup check - mouseup happened when mouse was out of window
			if ($.ui.ie && ( !document.documentMode || document.documentMode < 9 ) && !event.button) {
				return this._mouseUp(event);

			// Iframe mouseup check - mouseup occurred in another document
			} else if ( !event.which ) {
				return this._mouseUp( event );
			}
		}

		if ( event.which || event.button ) {
			this._mouseMoved = true;
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		this.document
			.unbind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.unbind( "mouseup." + this.widgetName, this._mouseUpDelegate );

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + ".preventClickEvent", true);
			}

			this._mouseStop(event);
		}

		mouseHandled = false;
		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(/* event */) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(/* event */) {},
	_mouseDrag: function(/* event */) {},
	_mouseStop: function(/* event */) {},
	_mouseCapture: function(/* event */) { return true; }
});


/*!
 * jQuery UI Draggable 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 */


$.widget("ui.draggable", $.ui.mouse, {
	version: "1.11.2",
	widgetEventPrefix: "drag",
	options: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false,

		// callbacks
		drag: null,
		start: null,
		stop: null
	},
	_create: function() {

		if ( this.options.helper === "original" ) {
			this._setPositionRelative();
		}
		if (this.options.addClasses){
			this.element.addClass("ui-draggable");
		}
		if (this.options.disabled){
			this.element.addClass("ui-draggable-disabled");
		}
		this._setHandleClassName();

		this._mouseInit();
	},

	_setOption: function( key, value ) {
		this._super( key, value );
		if ( key === "handle" ) {
			this._removeHandleClassName();
			this._setHandleClassName();
		}
	},

	_destroy: function() {
		if ( ( this.helper || this.element ).is( ".ui-draggable-dragging" ) ) {
			this.destroyOnClear = true;
			return;
		}
		this.element.removeClass( "ui-draggable ui-draggable-dragging ui-draggable-disabled" );
		this._removeHandleClassName();
		this._mouseDestroy();
	},

	_mouseCapture: function(event) {
		var o = this.options;

		this._blurActiveElement( event );

		// among others, prevent a drag on a resizable-handle
		if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
			return false;
		}

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle) {
			return false;
		}

		this._blockFrames( o.iframeFix === true ? "iframe" : o.iframeFix );

		return true;

	},

	_blockFrames: function( selector ) {
		this.iframeBlocks = this.document.find( selector ).map(function() {
			var iframe = $( this );

			return $( "<div>" )
				.css( "position", "absolute" )
				.appendTo( iframe.parent() )
				.outerWidth( iframe.outerWidth() )
				.outerHeight( iframe.outerHeight() )
				.offset( iframe.offset() )[ 0 ];
		});
	},

	_unblockFrames: function() {
		if ( this.iframeBlocks ) {
			this.iframeBlocks.remove();
			delete this.iframeBlocks;
		}
	},

	_blurActiveElement: function( event ) {
		var document = this.document[ 0 ];

		// Only need to blur if the event occurred on the draggable itself, see #10527
		if ( !this.handleElement.is( event.target ) ) {
			return;
		}

		// support: IE9
		// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
		try {

			// Support: IE9, IE10
			// If the <body> is blurred, IE will switch windows, see #9520
			if ( document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body" ) {

				// Blur any element that currently has focus, see #4261
				$( document.activeElement ).blur();
			}
		} catch ( error ) {}
	},

	_mouseStart: function(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		this.helper.addClass("ui-draggable-dragging");

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if ($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css( "position" );
		this.scrollParent = this.helper.scrollParent( true );
		this.offsetParent = this.helper.offsetParent();
		this.hasFixedAncestor = this.helper.parents().filter(function() {
				return $( this ).css( "position" ) === "fixed";
			}).length > 0;

		//The element's absolute position on the page minus margins
		this.positionAbs = this.element.offset();
		this._refreshOffsets( event );

		//Generate the original position
		this.originalPosition = this.position = this._generatePosition( event, false );
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Set a containment if given in the options
		this._setContainment();

		//Trigger event + callbacks
		if (this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		// Reset helper's right/bottom css if they're set and set explicit width/height instead
		// as this prevents resizing of elements with right/bottom set (see #7772)
		this._normalizeRightBottom();

		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position

		//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
		if ( $.ui.ddmanager ) {
			$.ui.ddmanager.dragStart(this, event);
		}

		return true;
	},

	_refreshOffsets: function( event ) {
		this.offset = {
			top: this.positionAbs.top - this.margins.top,
			left: this.positionAbs.left - this.margins.left,
			scroll: false,
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset()
		};

		this.offset.click = {
			left: event.pageX - this.offset.left,
			top: event.pageY - this.offset.top
		};
	},

	_mouseDrag: function(event, noPropagation) {
		// reset any necessary cached properties (see #5009)
		if ( this.hasFixedAncestor ) {
			this.offset.parent = this._getParentOffset();
		}

		//Compute the helpers position
		this.position = this._generatePosition( event, true );
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui = this._uiHash();
			if (this._trigger("drag", event, ui) === false) {
				this._mouseUp({});
				return false;
			}
			this.position = ui.position;
		}

		this.helper[ 0 ].style.left = this.position.left + "px";
		this.helper[ 0 ].style.top = this.position.top + "px";

		if ($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		return false;
	},

	_mouseStop: function(event) {

		//If we are using droppables, inform the manager about the drop
		var that = this,
			dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			dropped = $.ui.ddmanager.drop(this, event);
		}

		//if a drop comes from outside (a sortable)
		if (this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}

		if ((this.options.revert === "invalid" && !dropped) || (this.options.revert === "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				if (that._trigger("stop", event) !== false) {
					that._clear();
				}
			});
		} else {
			if (this._trigger("stop", event) !== false) {
				this._clear();
			}
		}

		return false;
	},

	_mouseUp: function( event ) {
		this._unblockFrames();

		//If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
		if ( $.ui.ddmanager ) {
			$.ui.ddmanager.dragStop(this, event);
		}

		// Only need to focus if the event occurred on the draggable itself, see #10527
		if ( this.handleElement.is( event.target ) ) {
			// The interaction is over; whether or not the click resulted in a drag, focus the element
			this.element.focus();
		}

		return $.ui.mouse.prototype._mouseUp.call(this, event);
	},

	cancel: function() {

		if (this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp({});
		} else {
			this._clear();
		}

		return this;

	},

	_getHandle: function(event) {
		return this.options.handle ?
			!!$( event.target ).closest( this.element.find( this.options.handle ) ).length :
			true;
	},

	_setHandleClassName: function() {
		this.handleElement = this.options.handle ?
			this.element.find( this.options.handle ) : this.element;
		this.handleElement.addClass( "ui-draggable-handle" );
	},

	_removeHandleClassName: function() {
		this.handleElement.removeClass( "ui-draggable-handle" );
	},

	_createHelper: function(event) {

		var o = this.options,
			helperIsFunction = $.isFunction( o.helper ),
			helper = helperIsFunction ?
				$( o.helper.apply( this.element[ 0 ], [ event ] ) ) :
				( o.helper === "clone" ?
					this.element.clone().removeAttr( "id" ) :
					this.element );

		if (!helper.parents("body").length) {
			helper.appendTo((o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo));
		}

		// http://bugs.jqueryui.com/ticket/9446
		// a helper function can return the original element
		// which wouldn't have been set to relative in _create
		if ( helperIsFunction && helper[ 0 ] === this.element[ 0 ] ) {
			this._setPositionRelative();
		}

		if (helper[0] !== this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {
			helper.css("position", "absolute");
		}

		return helper;

	},

	_setPositionRelative: function() {
		if ( !( /^(?:r|a|f)/ ).test( this.element.css( "position" ) ) ) {
			this.element[ 0 ].style.position = "relative";
		}
	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj === "string") {
			obj = obj.split(" ");
		}
		if ($.isArray(obj)) {
			obj = { left: +obj[0], top: +obj[1] || 0 };
		}
		if ("left" in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ("right" in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ("top" in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ("bottom" in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_isRootNode: function( element ) {
		return ( /(html|body)/i ).test( element.tagName ) || element === this.document[ 0 ];
	},

	_getParentOffset: function() {

		//Get the offsetParent and cache its position
		var po = this.offsetParent.offset(),
			document = this.document[ 0 ];

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if ( this._isRootNode( this.offsetParent[ 0 ] ) ) {
			po = { top: 0, left: 0 };
		}

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
		};

	},

	_getRelativeOffset: function() {
		if ( this.cssPosition !== "relative" ) {
			return { top: 0, left: 0 };
		}

		var p = this.element.position(),
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

		return {
			top: p.top - ( parseInt(this.helper.css( "top" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollTop() : 0 ),
			left: p.left - ( parseInt(this.helper.css( "left" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollLeft() : 0 )
		};

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"), 10) || 0),
			top: (parseInt(this.element.css("marginTop"), 10) || 0),
			right: (parseInt(this.element.css("marginRight"), 10) || 0),
			bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var isUserScrollable, c, ce,
			o = this.options,
			document = this.document[ 0 ];

		this.relativeContainer = null;

		if ( !o.containment ) {
			this.containment = null;
			return;
		}

		if ( o.containment === "window" ) {
			this.containment = [
				$( window ).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
				$( window ).scrollTop() - this.offset.relative.top - this.offset.parent.top,
				$( window ).scrollLeft() + $( window ).width() - this.helperProportions.width - this.margins.left,
				$( window ).scrollTop() + ( $( window ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
			];
			return;
		}

		if ( o.containment === "document") {
			this.containment = [
				0,
				0,
				$( document ).width() - this.helperProportions.width - this.margins.left,
				( $( document ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
			];
			return;
		}

		if ( o.containment.constructor === Array ) {
			this.containment = o.containment;
			return;
		}

		if ( o.containment === "parent" ) {
			o.containment = this.helper[ 0 ].parentNode;
		}

		c = $( o.containment );
		ce = c[ 0 ];

		if ( !ce ) {
			return;
		}

		isUserScrollable = /(scroll|auto)/.test( c.css( "overflow" ) );

		this.containment = [
			( parseInt( c.css( "borderLeftWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingLeft" ), 10 ) || 0 ),
			( parseInt( c.css( "borderTopWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingTop" ), 10 ) || 0 ),
			( isUserScrollable ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) -
				( parseInt( c.css( "borderRightWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingRight" ), 10 ) || 0 ) -
				this.helperProportions.width -
				this.margins.left -
				this.margins.right,
			( isUserScrollable ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) -
				( parseInt( c.css( "borderBottomWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingBottom" ), 10 ) || 0 ) -
				this.helperProportions.height -
				this.margins.top -
				this.margins.bottom
		];
		this.relativeContainer = c;
	},

	_convertPositionTo: function(d, pos) {

		if (!pos) {
			pos = this.position;
		}

		var mod = d === "absolute" ? 1 : -1,
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

		return {
			top: (
				pos.top	+																// The absolute mouse position
				this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top * mod -										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) ) * mod)
			),
			left: (
				pos.left +																// The absolute mouse position
				this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) ) * mod)
			)
		};

	},

	_generatePosition: function( event, constrainPosition ) {

		var containment, co, top, left,
			o = this.options,
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] ),
			pageX = event.pageX,
			pageY = event.pageY;

		// Cache the scroll
		if ( !scrollIsRootNode || !this.offset.scroll ) {
			this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			};
		}

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		// If we are not dragging yet, we won't check for options
		if ( constrainPosition ) {
			if ( this.containment ) {
				if ( this.relativeContainer ){
					co = this.relativeContainer.offset();
					containment = [
						this.containment[ 0 ] + co.left,
						this.containment[ 1 ] + co.top,
						this.containment[ 2 ] + co.left,
						this.containment[ 3 ] + co.top
					];
				} else {
					containment = this.containment;
				}

				if (event.pageX - this.offset.click.left < containment[0]) {
					pageX = containment[0] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top < containment[1]) {
					pageY = containment[1] + this.offset.click.top;
				}
				if (event.pageX - this.offset.click.left > containment[2]) {
					pageX = containment[2] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top > containment[3]) {
					pageY = containment[3] + this.offset.click.top;
				}
			}

			if (o.grid) {
				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
				top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? ((top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]) ? top : ((top - this.offset.click.top >= containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? ((left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]) ? left : ((left - this.offset.click.left >= containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

			if ( o.axis === "y" ) {
				pageX = this.originalPageX;
			}

			if ( o.axis === "x" ) {
				pageY = this.originalPageY;
			}
		}

		return {
			top: (
				pageY -																	// The absolute mouse position
				this.offset.click.top	-												// Click offset (relative to the element)
				this.offset.relative.top -												// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
				( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) )
			),
			left: (
				pageX -																	// The absolute mouse position
				this.offset.click.left -												// Click offset (relative to the element)
				this.offset.relative.left -												// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
				( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) )
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
			this.helper.remove();
		}
		this.helper = null;
		this.cancelHelperRemoval = false;
		if ( this.destroyOnClear ) {
			this.destroy();
		}
	},

	_normalizeRightBottom: function() {
		if ( this.options.axis !== "y" && this.helper.css( "right" ) !== "auto" ) {
			this.helper.width( this.helper.width() );
			this.helper.css( "right", "auto" );
		}
		if ( this.options.axis !== "x" && this.helper.css( "bottom" ) !== "auto" ) {
			this.helper.height( this.helper.height() );
			this.helper.css( "bottom", "auto" );
		}
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function( type, event, ui ) {
		ui = ui || this._uiHash();
		$.ui.plugin.call( this, type, [ event, ui, this ], true );

		// Absolute position and offset (see #6884 ) have to be recalculated after plugins
		if ( /^(drag|start|stop)/.test( type ) ) {
			this.positionAbs = this._convertPositionTo( "absolute" );
			ui.offset = this.positionAbs;
		}
		return $.Widget.prototype._trigger.call( this, type, event, ui );
	},

	plugins: {},

	_uiHash: function() {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

$.ui.plugin.add( "draggable", "connectToSortable", {
	start: function( event, ui, draggable ) {
		var uiSortable = $.extend( {}, ui, {
			item: draggable.element
		});

		draggable.sortables = [];
		$( draggable.options.connectToSortable ).each(function() {
			var sortable = $( this ).sortable( "instance" );

			if ( sortable && !sortable.options.disabled ) {
				draggable.sortables.push( sortable );

				// refreshPositions is called at drag start to refresh the containerCache
				// which is used in drag. This ensures it's initialized and synchronized
				// with any changes that might have happened on the page since initialization.
				sortable.refreshPositions();
				sortable._trigger("activate", event, uiSortable);
			}
		});
	},
	stop: function( event, ui, draggable ) {
		var uiSortable = $.extend( {}, ui, {
			item: draggable.element
		});

		draggable.cancelHelperRemoval = false;

		$.each( draggable.sortables, function() {
			var sortable = this;

			if ( sortable.isOver ) {
				sortable.isOver = 0;

				// Allow this sortable to handle removing the helper
				draggable.cancelHelperRemoval = true;
				sortable.cancelHelperRemoval = false;

				// Use _storedCSS To restore properties in the sortable,
				// as this also handles revert (#9675) since the draggable
				// may have modified them in unexpected ways (#8809)
				sortable._storedCSS = {
					position: sortable.placeholder.css( "position" ),
					top: sortable.placeholder.css( "top" ),
					left: sortable.placeholder.css( "left" )
				};

				sortable._mouseStop(event);

				// Once drag has ended, the sortable should return to using
				// its original helper, not the shared helper from draggable
				sortable.options.helper = sortable.options._helper;
			} else {
				// Prevent this Sortable from removing the helper.
				// However, don't set the draggable to remove the helper
				// either as another connected Sortable may yet handle the removal.
				sortable.cancelHelperRemoval = true;

				sortable._trigger( "deactivate", event, uiSortable );
			}
		});
	},
	drag: function( event, ui, draggable ) {
		$.each( draggable.sortables, function() {
			var innermostIntersecting = false,
				sortable = this;

			// Copy over variables that sortable's _intersectsWith uses
			sortable.positionAbs = draggable.positionAbs;
			sortable.helperProportions = draggable.helperProportions;
			sortable.offset.click = draggable.offset.click;

			if ( sortable._intersectsWith( sortable.containerCache ) ) {
				innermostIntersecting = true;

				$.each( draggable.sortables, function() {
					// Copy over variables that sortable's _intersectsWith uses
					this.positionAbs = draggable.positionAbs;
					this.helperProportions = draggable.helperProportions;
					this.offset.click = draggable.offset.click;

					if ( this !== sortable &&
							this._intersectsWith( this.containerCache ) &&
							$.contains( sortable.element[ 0 ], this.element[ 0 ] ) ) {
						innermostIntersecting = false;
					}

					return innermostIntersecting;
				});
			}

			if ( innermostIntersecting ) {
				// If it intersects, we use a little isOver variable and set it once,
				// so that the move-in stuff gets fired only once.
				if ( !sortable.isOver ) {
					sortable.isOver = 1;

					sortable.currentItem = ui.helper
						.appendTo( sortable.element )
						.data( "ui-sortable-item", true );

					// Store helper option to later restore it
					sortable.options._helper = sortable.options.helper;

					sortable.options.helper = function() {
						return ui.helper[ 0 ];
					};

					// Fire the start events of the sortable with our passed browser event,
					// and our own helper (so it doesn't create a new one)
					event.target = sortable.currentItem[ 0 ];
					sortable._mouseCapture( event, true );
					sortable._mouseStart( event, true, true );

					// Because the browser event is way off the new appended portlet,
					// modify necessary variables to reflect the changes
					sortable.offset.click.top = draggable.offset.click.top;
					sortable.offset.click.left = draggable.offset.click.left;
					sortable.offset.parent.left -= draggable.offset.parent.left -
						sortable.offset.parent.left;
					sortable.offset.parent.top -= draggable.offset.parent.top -
						sortable.offset.parent.top;

					draggable._trigger( "toSortable", event );

					// Inform draggable that the helper is in a valid drop zone,
					// used solely in the revert option to handle "valid/invalid".
					draggable.dropped = sortable.element;

					// Need to refreshPositions of all sortables in the case that
					// adding to one sortable changes the location of the other sortables (#9675)
					$.each( draggable.sortables, function() {
						this.refreshPositions();
					});

					// hack so receive/update callbacks work (mostly)
					draggable.currentItem = draggable.element;
					sortable.fromOutside = draggable;
				}

				if ( sortable.currentItem ) {
					sortable._mouseDrag( event );
					// Copy the sortable's position because the draggable's can potentially reflect
					// a relative position, while sortable is always absolute, which the dragged
					// element has now become. (#8809)
					ui.position = sortable.position;
				}
			} else {
				// If it doesn't intersect with the sortable, and it intersected before,
				// we fake the drag stop of the sortable, but make sure it doesn't remove
				// the helper by using cancelHelperRemoval.
				if ( sortable.isOver ) {

					sortable.isOver = 0;
					sortable.cancelHelperRemoval = true;

					// Calling sortable's mouseStop would trigger a revert,
					// so revert must be temporarily false until after mouseStop is called.
					sortable.options._revert = sortable.options.revert;
					sortable.options.revert = false;

					sortable._trigger( "out", event, sortable._uiHash( sortable ) );
					sortable._mouseStop( event, true );

					// restore sortable behaviors that were modfied
					// when the draggable entered the sortable area (#9481)
					sortable.options.revert = sortable.options._revert;
					sortable.options.helper = sortable.options._helper;

					if ( sortable.placeholder ) {
						sortable.placeholder.remove();
					}

					// Recalculate the draggable's offset considering the sortable
					// may have modified them in unexpected ways (#8809)
					draggable._refreshOffsets( event );
					ui.position = draggable._generatePosition( event, true );

					draggable._trigger( "fromSortable", event );

					// Inform draggable that the helper is no longer in a valid drop zone
					draggable.dropped = false;

					// Need to refreshPositions of all sortables just in case removing
					// from one sortable changes the location of other sortables (#9675)
					$.each( draggable.sortables, function() {
						this.refreshPositions();
					});
				}
			}
		});
	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function( event, ui, instance ) {
		var t = $( "body" ),
			o = instance.options;

		if (t.css("cursor")) {
			o._cursor = t.css("cursor");
		}
		t.css("cursor", o.cursor);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;
		if (o._cursor) {
			$("body").css("cursor", o._cursor);
		}
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function( event, ui, instance ) {
		var t = $( ui.helper ),
			o = instance.options;
		if (t.css("opacity")) {
			o._opacity = t.css("opacity");
		}
		t.css("opacity", o.opacity);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;
		if (o._opacity) {
			$(ui.helper).css("opacity", o._opacity);
		}
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function( event, ui, i ) {
		if ( !i.scrollParentNotHidden ) {
			i.scrollParentNotHidden = i.helper.scrollParent( false );
		}

		if ( i.scrollParentNotHidden[ 0 ] !== i.document[ 0 ] && i.scrollParentNotHidden[ 0 ].tagName !== "HTML" ) {
			i.overflowOffset = i.scrollParentNotHidden.offset();
		}
	},
	drag: function( event, ui, i  ) {

		var o = i.options,
			scrolled = false,
			scrollParent = i.scrollParentNotHidden[ 0 ],
			document = i.document[ 0 ];

		if ( scrollParent !== document && scrollParent.tagName !== "HTML" ) {
			if ( !o.axis || o.axis !== "x" ) {
				if ( ( i.overflowOffset.top + scrollParent.offsetHeight ) - event.pageY < o.scrollSensitivity ) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
				} else if ( event.pageY - i.overflowOffset.top < o.scrollSensitivity ) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
				}
			}

			if ( !o.axis || o.axis !== "y" ) {
				if ( ( i.overflowOffset.left + scrollParent.offsetWidth ) - event.pageX < o.scrollSensitivity ) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
				} else if ( event.pageX - i.overflowOffset.left < o.scrollSensitivity ) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
				}
			}

		} else {

			if (!o.axis || o.axis !== "x") {
				if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				} else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
				}
			}

			if (!o.axis || o.axis !== "y") {
				if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				} else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
				}
			}

		}

		if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(i, event);
		}

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function( event, ui, i ) {

		var o = i.options;

		i.snapElements = [];

		$(o.snap.constructor !== String ? ( o.snap.items || ":data(ui-draggable)" ) : o.snap).each(function() {
			var $t = $(this),
				$o = $t.offset();
			if (this !== i.element[0]) {
				i.snapElements.push({
					item: this,
					width: $t.outerWidth(), height: $t.outerHeight(),
					top: $o.top, left: $o.left
				});
			}
		});

	},
	drag: function( event, ui, inst ) {

		var ts, bs, ls, rs, l, r, t, b, i, first,
			o = inst.options,
			d = o.snapTolerance,
			x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (i = inst.snapElements.length - 1; i >= 0; i--){

			l = inst.snapElements[i].left - inst.margins.left;
			r = l + inst.snapElements[i].width;
			t = inst.snapElements[i].top - inst.margins.top;
			b = t + inst.snapElements[i].height;

			if ( x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains( inst.snapElements[ i ].item.ownerDocument, inst.snapElements[ i ].item ) ) {
				if (inst.snapElements[i].snapping) {
					(inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				}
				inst.snapElements[i].snapping = false;
				continue;
			}

			if (o.snapMode !== "inner") {
				ts = Math.abs(t - y2) <= d;
				bs = Math.abs(b - y1) <= d;
				ls = Math.abs(l - x2) <= d;
				rs = Math.abs(r - x1) <= d;
				if (ts) {
					ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top;
				}
				if (bs) {
					ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top;
				}
				if (ls) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left;
				}
				if (rs) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left;
				}
			}

			first = (ts || bs || ls || rs);

			if (o.snapMode !== "outer") {
				ts = Math.abs(t - y1) <= d;
				bs = Math.abs(b - y2) <= d;
				ls = Math.abs(l - x1) <= d;
				rs = Math.abs(r - x2) <= d;
				if (ts) {
					ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top;
				}
				if (bs) {
					ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top;
				}
				if (ls) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left;
				}
				if (rs) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left;
				}
			}

			if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			}
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		}

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function( event, ui, instance ) {
		var min,
			o = instance.options,
			group = $.makeArray($(o.stack)).sort(function(a, b) {
				return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
			});

		if (!group.length) { return; }

		min = parseInt($(group[0]).css("zIndex"), 10) || 0;
		$(group).each(function(i) {
			$(this).css("zIndex", min + i);
		});
		this.css("zIndex", (min + group.length));
	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function( event, ui, instance ) {
		var t = $( ui.helper ),
			o = instance.options;

		if (t.css("zIndex")) {
			o._zIndex = t.css("zIndex");
		}
		t.css("zIndex", o.zIndex);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;

		if (o._zIndex) {
			$(ui.helper).css("zIndex", o._zIndex);
		}
	}
});

var draggable = $.ui.draggable;


/*!
 * jQuery UI Droppable 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 */


$.widget( "ui.droppable", {
	version: "1.11.2",
	widgetEventPrefix: "drop",
	options: {
		accept: "*",
		activeClass: false,
		addClasses: true,
		greedy: false,
		hoverClass: false,
		scope: "default",
		tolerance: "intersect",

		// callbacks
		activate: null,
		deactivate: null,
		drop: null,
		out: null,
		over: null
	},
	_create: function() {

		var proportions,
			o = this.options,
			accept = o.accept;

		this.isover = false;
		this.isout = true;

		this.accept = $.isFunction( accept ) ? accept : function( d ) {
			return d.is( accept );
		};

		this.proportions = function( /* valueToWrite */ ) {
			if ( arguments.length ) {
				// Store the droppable's proportions
				proportions = arguments[ 0 ];
			} else {
				// Retrieve or derive the droppable's proportions
				return proportions ?
					proportions :
					proportions = {
						width: this.element[ 0 ].offsetWidth,
						height: this.element[ 0 ].offsetHeight
					};
			}
		};

		this._addToManager( o.scope );

		o.addClasses && this.element.addClass( "ui-droppable" );

	},

	_addToManager: function( scope ) {
		// Add the reference and positions to the manager
		$.ui.ddmanager.droppables[ scope ] = $.ui.ddmanager.droppables[ scope ] || [];
		$.ui.ddmanager.droppables[ scope ].push( this );
	},

	_splice: function( drop ) {
		var i = 0;
		for ( ; i < drop.length; i++ ) {
			if ( drop[ i ] === this ) {
				drop.splice( i, 1 );
			}
		}
	},

	_destroy: function() {
		var drop = $.ui.ddmanager.droppables[ this.options.scope ];

		this._splice( drop );

		this.element.removeClass( "ui-droppable ui-droppable-disabled" );
	},

	_setOption: function( key, value ) {

		if ( key === "accept" ) {
			this.accept = $.isFunction( value ) ? value : function( d ) {
				return d.is( value );
			};
		} else if ( key === "scope" ) {
			var drop = $.ui.ddmanager.droppables[ this.options.scope ];

			this._splice( drop );
			this._addToManager( value );
		}

		this._super( key, value );
	},

	_activate: function( event ) {
		var draggable = $.ui.ddmanager.current;
		if ( this.options.activeClass ) {
			this.element.addClass( this.options.activeClass );
		}
		if ( draggable ){
			this._trigger( "activate", event, this.ui( draggable ) );
		}
	},

	_deactivate: function( event ) {
		var draggable = $.ui.ddmanager.current;
		if ( this.options.activeClass ) {
			this.element.removeClass( this.options.activeClass );
		}
		if ( draggable ){
			this._trigger( "deactivate", event, this.ui( draggable ) );
		}
	},

	_over: function( event ) {

		var draggable = $.ui.ddmanager.current;

		// Bail if draggable and droppable are same element
		if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
			return;
		}

		if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
			if ( this.options.hoverClass ) {
				this.element.addClass( this.options.hoverClass );
			}
			this._trigger( "over", event, this.ui( draggable ) );
		}

	},

	_out: function( event ) {

		var draggable = $.ui.ddmanager.current;

		// Bail if draggable and droppable are same element
		if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
			return;
		}

		if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
			if ( this.options.hoverClass ) {
				this.element.removeClass( this.options.hoverClass );
			}
			this._trigger( "out", event, this.ui( draggable ) );
		}

	},

	_drop: function( event, custom ) {

		var draggable = custom || $.ui.ddmanager.current,
			childrenIntersection = false;

		// Bail if draggable and droppable are same element
		if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
			return false;
		}

		this.element.find( ":data(ui-droppable)" ).not( ".ui-draggable-dragging" ).each(function() {
			var inst = $( this ).droppable( "instance" );
			if (
				inst.options.greedy &&
				!inst.options.disabled &&
				inst.options.scope === draggable.options.scope &&
				inst.accept.call( inst.element[ 0 ], ( draggable.currentItem || draggable.element ) ) &&
				$.ui.intersect( draggable, $.extend( inst, { offset: inst.element.offset() } ), inst.options.tolerance, event )
			) { childrenIntersection = true; return false; }
		});
		if ( childrenIntersection ) {
			return false;
		}

		if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
			if ( this.options.activeClass ) {
				this.element.removeClass( this.options.activeClass );
			}
			if ( this.options.hoverClass ) {
				this.element.removeClass( this.options.hoverClass );
			}
			this._trigger( "drop", event, this.ui( draggable ) );
			return this.element;
		}

		return false;

	},

	ui: function( c ) {
		return {
			draggable: ( c.currentItem || c.element ),
			helper: c.helper,
			position: c.position,
			offset: c.positionAbs
		};
	}

});

$.ui.intersect = (function() {
	function isOverAxis( x, reference, size ) {
		return ( x >= reference ) && ( x < ( reference + size ) );
	}

	return function( draggable, droppable, toleranceMode, event ) {

		if ( !droppable.offset ) {
			return false;
		}

		var x1 = ( draggable.positionAbs || draggable.position.absolute ).left + draggable.margins.left,
			y1 = ( draggable.positionAbs || draggable.position.absolute ).top + draggable.margins.top,
			x2 = x1 + draggable.helperProportions.width,
			y2 = y1 + draggable.helperProportions.height,
			l = droppable.offset.left,
			t = droppable.offset.top,
			r = l + droppable.proportions().width,
			b = t + droppable.proportions().height;

		switch ( toleranceMode ) {
		case "fit":
			return ( l <= x1 && x2 <= r && t <= y1 && y2 <= b );
		case "intersect":
			return ( l < x1 + ( draggable.helperProportions.width / 2 ) && // Right Half
				x2 - ( draggable.helperProportions.width / 2 ) < r && // Left Half
				t < y1 + ( draggable.helperProportions.height / 2 ) && // Bottom Half
				y2 - ( draggable.helperProportions.height / 2 ) < b ); // Top Half
		case "pointer":
			return isOverAxis( event.pageY, t, droppable.proportions().height ) && isOverAxis( event.pageX, l, droppable.proportions().width );
		case "touch":
			return (
				( y1 >= t && y1 <= b ) || // Top edge touching
				( y2 >= t && y2 <= b ) || // Bottom edge touching
				( y1 < t && y2 > b ) // Surrounded vertically
			) && (
				( x1 >= l && x1 <= r ) || // Left edge touching
				( x2 >= l && x2 <= r ) || // Right edge touching
				( x1 < l && x2 > r ) // Surrounded horizontally
			);
		default:
			return false;
		}
	};
})();

/*
	This manager tracks offsets of draggables and droppables
*/
$.ui.ddmanager = {
	current: null,
	droppables: { "default": [] },
	prepareOffsets: function( t, event ) {

		var i, j,
			m = $.ui.ddmanager.droppables[ t.options.scope ] || [],
			type = event ? event.type : null, // workaround for #2317
			list = ( t.currentItem || t.element ).find( ":data(ui-droppable)" ).addBack();

		droppablesLoop: for ( i = 0; i < m.length; i++ ) {

			// No disabled and non-accepted
			if ( m[ i ].options.disabled || ( t && !m[ i ].accept.call( m[ i ].element[ 0 ], ( t.currentItem || t.element ) ) ) ) {
				continue;
			}

			// Filter out elements in the current dragged item
			for ( j = 0; j < list.length; j++ ) {
				if ( list[ j ] === m[ i ].element[ 0 ] ) {
					m[ i ].proportions().height = 0;
					continue droppablesLoop;
				}
			}

			m[ i ].visible = m[ i ].element.css( "display" ) !== "none";
			if ( !m[ i ].visible ) {
				continue;
			}

			// Activate the droppable if used directly from draggables
			if ( type === "mousedown" ) {
				m[ i ]._activate.call( m[ i ], event );
			}

			m[ i ].offset = m[ i ].element.offset();
			m[ i ].proportions({ width: m[ i ].element[ 0 ].offsetWidth, height: m[ i ].element[ 0 ].offsetHeight });

		}

	},
	drop: function( draggable, event ) {

		var dropped = false;
		// Create a copy of the droppables in case the list changes during the drop (#9116)
		$.each( ( $.ui.ddmanager.droppables[ draggable.options.scope ] || [] ).slice(), function() {

			if ( !this.options ) {
				return;
			}
			if ( !this.options.disabled && this.visible && $.ui.intersect( draggable, this, this.options.tolerance, event ) ) {
				dropped = this._drop.call( this, event ) || dropped;
			}

			if ( !this.options.disabled && this.visible && this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
				this.isout = true;
				this.isover = false;
				this._deactivate.call( this, event );
			}

		});
		return dropped;

	},
	dragStart: function( draggable, event ) {
		// Listen for scrolling so that if the dragging causes scrolling the position of the droppables can be recalculated (see #5003)
		draggable.element.parentsUntil( "body" ).bind( "scroll.droppable", function() {
			if ( !draggable.options.refreshPositions ) {
				$.ui.ddmanager.prepareOffsets( draggable, event );
			}
		});
	},
	drag: function( draggable, event ) {

		// If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
		if ( draggable.options.refreshPositions ) {
			$.ui.ddmanager.prepareOffsets( draggable, event );
		}

		// Run through all droppables and check their positions based on specific tolerance options
		$.each( $.ui.ddmanager.droppables[ draggable.options.scope ] || [], function() {

			if ( this.options.disabled || this.greedyChild || !this.visible ) {
				return;
			}

			var parentInstance, scope, parent,
				intersects = $.ui.intersect( draggable, this, this.options.tolerance, event ),
				c = !intersects && this.isover ? "isout" : ( intersects && !this.isover ? "isover" : null );
			if ( !c ) {
				return;
			}

			if ( this.options.greedy ) {
				// find droppable parents with same scope
				scope = this.options.scope;
				parent = this.element.parents( ":data(ui-droppable)" ).filter(function() {
					return $( this ).droppable( "instance" ).options.scope === scope;
				});

				if ( parent.length ) {
					parentInstance = $( parent[ 0 ] ).droppable( "instance" );
					parentInstance.greedyChild = ( c === "isover" );
				}
			}

			// we just moved into a greedy child
			if ( parentInstance && c === "isover" ) {
				parentInstance.isover = false;
				parentInstance.isout = true;
				parentInstance._out.call( parentInstance, event );
			}

			this[ c ] = true;
			this[c === "isout" ? "isover" : "isout"] = false;
			this[c === "isover" ? "_over" : "_out"].call( this, event );

			// we just moved out of a greedy child
			if ( parentInstance && c === "isout" ) {
				parentInstance.isout = false;
				parentInstance.isover = true;
				parentInstance._over.call( parentInstance, event );
			}
		});

	},
	dragStop: function( draggable, event ) {
		draggable.element.parentsUntil( "body" ).unbind( "scroll.droppable" );
		// Call prepareOffsets one final time since IE does not fire return scroll events when overflow was caused by drag (see #5003)
		if ( !draggable.options.refreshPositions ) {
			$.ui.ddmanager.prepareOffsets( draggable, event );
		}
	}
};

var droppable = $.ui.droppable;


/*!
 * jQuery UI Sortable 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 */


var sortable = $.widget("ui.sortable", $.ui.mouse, {
	version: "1.11.2",
	widgetEventPrefix: "sort",
	ready: false,
	options: {
		appendTo: "parent",
		axis: false,
		connectWith: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		dropOnEmpty: true,
		forcePlaceholderSize: false,
		forceHelperSize: false,
		grid: false,
		handle: false,
		helper: "original",
		items: "> *",
		opacity: false,
		placeholder: false,
		revert: false,
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		scope: "default",
		tolerance: "intersect",
		zIndex: 1000,

		// callbacks
		activate: null,
		beforeStop: null,
		change: null,
		deactivate: null,
		out: null,
		over: null,
		receive: null,
		remove: null,
		sort: null,
		start: null,
		stop: null,
		update: null
	},

	_isOverAxis: function( x, reference, size ) {
		return ( x >= reference ) && ( x < ( reference + size ) );
	},

	_isFloating: function( item ) {
		return (/left|right/).test(item.css("float")) || (/inline|table-cell/).test(item.css("display"));
	},

	_create: function() {

		var o = this.options;
		this.containerCache = {};
		this.element.addClass("ui-sortable");

		//Get the items
		this.refresh();

		//Let's determine if the items are being displayed horizontally
		this.floating = this.items.length ? o.axis === "x" || this._isFloating(this.items[0].item) : false;

		//Let's determine the parent's offset
		this.offset = this.element.offset();

		//Initialize mouse events for interaction
		this._mouseInit();

		this._setHandleClassName();

		//We're ready to go
		this.ready = true;

	},

	_setOption: function( key, value ) {
		this._super( key, value );

		if ( key === "handle" ) {
			this._setHandleClassName();
		}
	},

	_setHandleClassName: function() {
		this.element.find( ".ui-sortable-handle" ).removeClass( "ui-sortable-handle" );
		$.each( this.items, function() {
			( this.instance.options.handle ?
				this.item.find( this.instance.options.handle ) : this.item )
				.addClass( "ui-sortable-handle" );
		});
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-sortable ui-sortable-disabled" )
			.find( ".ui-sortable-handle" )
				.removeClass( "ui-sortable-handle" );
		this._mouseDestroy();

		for ( var i = this.items.length - 1; i >= 0; i-- ) {
			this.items[i].item.removeData(this.widgetName + "-item");
		}

		return this;
	},

	_mouseCapture: function(event, overrideHandle) {
		var currentItem = null,
			validHandle = false,
			that = this;

		if (this.reverting) {
			return false;
		}

		if(this.options.disabled || this.options.type === "static") {
			return false;
		}

		//We have to refresh the items data once first
		this._refreshItems(event);

		//Find out if the clicked node (or one of its parents) is a actual item in this.items
		$(event.target).parents().each(function() {
			if($.data(this, that.widgetName + "-item") === that) {
				currentItem = $(this);
				return false;
			}
		});
		if($.data(event.target, that.widgetName + "-item") === that) {
			currentItem = $(event.target);
		}

		if(!currentItem) {
			return false;
		}
		if(this.options.handle && !overrideHandle) {
			$(this.options.handle, currentItem).find("*").addBack().each(function() {
				if(this === event.target) {
					validHandle = true;
				}
			});
			if(!validHandle) {
				return false;
			}
		}

		this.currentItem = currentItem;
		this._removeCurrentsFromItems();
		return true;

	},

	_mouseStart: function(event, overrideHandle, noActivation) {

		var i, body,
			o = this.options;

		this.currentContainer = this;

		//We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
		this.refreshPositions();

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Get the next scrolling parent
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.currentItem.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		// Only after we got the offset, we can change the helper's position to absolute
		// TODO: Still need to figure out a way to make relative sorting possible
		this.helper.css("position", "absolute");
		this.cssPosition = this.helper.css("position");

		//Generate the original position
		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Cache the former DOM position
		this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };

		//If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this way
		if(this.helper[0] !== this.currentItem[0]) {
			this.currentItem.hide();
		}

		//Create the placeholder
		this._createPlaceholder();

		//Set a containment if given in the options
		if(o.containment) {
			this._setContainment();
		}

		if( o.cursor && o.cursor !== "auto" ) { // cursor option
			body = this.document.find( "body" );

			// support: IE
			this.storedCursor = body.css( "cursor" );
			body.css( "cursor", o.cursor );

			this.storedStylesheet = $( "<style>*{ cursor: "+o.cursor+" !important; }</style>" ).appendTo( body );
		}

		if(o.opacity) { // opacity option
			if (this.helper.css("opacity")) {
				this._storedOpacity = this.helper.css("opacity");
			}
			this.helper.css("opacity", o.opacity);
		}

		if(o.zIndex) { // zIndex option
			if (this.helper.css("zIndex")) {
				this._storedZIndex = this.helper.css("zIndex");
			}
			this.helper.css("zIndex", o.zIndex);
		}

		//Prepare scrolling
		if(this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
			this.overflowOffset = this.scrollParent.offset();
		}

		//Call callbacks
		this._trigger("start", event, this._uiHash());

		//Recache the helper size
		if(!this._preserveHelperProportions) {
			this._cacheHelperProportions();
		}


		//Post "activate" events to possible containers
		if( !noActivation ) {
			for ( i = this.containers.length - 1; i >= 0; i-- ) {
				this.containers[ i ]._trigger( "activate", event, this._uiHash( this ) );
			}
		}

		//Prepare possible droppables
		if($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		this.dragging = true;

		this.helper.addClass("ui-sortable-helper");
		this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;

	},

	_mouseDrag: function(event) {
		var i, item, itemElement, intersection,
			o = this.options,
			scrolled = false;

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		if (!this.lastPositionAbs) {
			this.lastPositionAbs = this.positionAbs;
		}

		//Do scrolling
		if(this.options.scroll) {
			if(this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {

				if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
				} else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
				}

				if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
				} else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
				}

			} else {

				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				} else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
				}

				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				} else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
				}

			}

			if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
				$.ui.ddmanager.prepareOffsets(this, event);
			}
		}

		//Regenerate the absolute position used for position checks
		this.positionAbs = this._convertPositionTo("absolute");

		//Set the helper position
		if(!this.options.axis || this.options.axis !== "y") {
			this.helper[0].style.left = this.position.left+"px";
		}
		if(!this.options.axis || this.options.axis !== "x") {
			this.helper[0].style.top = this.position.top+"px";
		}

		//Rearrange
		for (i = this.items.length - 1; i >= 0; i--) {

			//Cache variables and intersection, continue if no intersection
			item = this.items[i];
			itemElement = item.item[0];
			intersection = this._intersectsWithPointer(item);
			if (!intersection) {
				continue;
			}

			// Only put the placeholder inside the current Container, skip all
			// items from other containers. This works because when moving
			// an item from one container to another the
			// currentContainer is switched before the placeholder is moved.
			//
			// Without this, moving items in "sub-sortables" can cause
			// the placeholder to jitter between the outer and inner container.
			if (item.instance !== this.currentContainer) {
				continue;
			}

			// cannot intersect with itself
			// no useless actions that have been done before
			// no action if the item moved is the parent of the item checked
			if (itemElement !== this.currentItem[0] &&
				this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement &&
				!$.contains(this.placeholder[0], itemElement) &&
				(this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)
			) {

				this.direction = intersection === 1 ? "down" : "up";

				if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
					this._rearrange(event, item);
				} else {
					break;
				}

				this._trigger("change", event, this._uiHash());
				break;
			}
		}

		//Post events to containers
		this._contactContainers(event);

		//Interconnect with droppables
		if($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		//Call callbacks
		this._trigger("sort", event, this._uiHash());

		this.lastPositionAbs = this.positionAbs;
		return false;

	},

	_mouseStop: function(event, noPropagation) {

		if(!event) {
			return;
		}

		//If we are using droppables, inform the manager about the drop
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			$.ui.ddmanager.drop(this, event);
		}

		if(this.options.revert) {
			var that = this,
				cur = this.placeholder.offset(),
				axis = this.options.axis,
				animation = {};

			if ( !axis || axis === "x" ) {
				animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft);
			}
			if ( !axis || axis === "y" ) {
				animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop);
			}
			this.reverting = true;
			$(this.helper).animate( animation, parseInt(this.options.revert, 10) || 500, function() {
				that._clear(event);
			});
		} else {
			this._clear(event, noPropagation);
		}

		return false;

	},

	cancel: function() {

		if(this.dragging) {

			this._mouseUp({ target: null });

			if(this.options.helper === "original") {
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			} else {
				this.currentItem.show();
			}

			//Post deactivating events to containers
			for (var i = this.containers.length - 1; i >= 0; i--){
				this.containers[i]._trigger("deactivate", null, this._uiHash(this));
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", null, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		if (this.placeholder) {
			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
			if(this.placeholder[0].parentNode) {
				this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			}
			if(this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
				this.helper.remove();
			}

			$.extend(this, {
				helper: null,
				dragging: false,
				reverting: false,
				_noFinalSort: null
			});

			if(this.domPosition.prev) {
				$(this.domPosition.prev).after(this.currentItem);
			} else {
				$(this.domPosition.parent).prepend(this.currentItem);
			}
		}

		return this;

	},

	serialize: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
			str = [];
		o = o || {};

		$(items).each(function() {
			var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || (/(.+)[\-=_](.+)/));
			if (res) {
				str.push((o.key || res[1]+"[]")+"="+(o.key && o.expression ? res[1] : res[2]));
			}
		});

		if(!str.length && o.key) {
			str.push(o.key + "=");
		}

		return str.join("&");

	},

	toArray: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
			ret = [];

		o = o || {};

		items.each(function() { ret.push($(o.item || this).attr(o.attribute || "id") || ""); });
		return ret;

	},

	/* Be careful with the following core functions */
	_intersectsWith: function(item) {

		var x1 = this.positionAbs.left,
			x2 = x1 + this.helperProportions.width,
			y1 = this.positionAbs.top,
			y2 = y1 + this.helperProportions.height,
			l = item.left,
			r = l + item.width,
			t = item.top,
			b = t + item.height,
			dyClick = this.offset.click.top,
			dxClick = this.offset.click.left,
			isOverElementHeight = ( this.options.axis === "x" ) || ( ( y1 + dyClick ) > t && ( y1 + dyClick ) < b ),
			isOverElementWidth = ( this.options.axis === "y" ) || ( ( x1 + dxClick ) > l && ( x1 + dxClick ) < r ),
			isOverElement = isOverElementHeight && isOverElementWidth;

		if ( this.options.tolerance === "pointer" ||
			this.options.forcePointerForContainers ||
			(this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"])
		) {
			return isOverElement;
		} else {

			return (l < x1 + (this.helperProportions.width / 2) && // Right Half
				x2 - (this.helperProportions.width / 2) < r && // Left Half
				t < y1 + (this.helperProportions.height / 2) && // Bottom Half
				y2 - (this.helperProportions.height / 2) < b ); // Top Half

		}
	},

	_intersectsWithPointer: function(item) {

		var isOverElementHeight = (this.options.axis === "x") || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
			isOverElementWidth = (this.options.axis === "y") || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
			isOverElement = isOverElementHeight && isOverElementWidth,
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (!isOverElement) {
			return false;
		}

		return this.floating ?
			( ((horizontalDirection && horizontalDirection === "right") || verticalDirection === "down") ? 2 : 1 )
			: ( verticalDirection && (verticalDirection === "down" ? 2 : 1) );

	},

	_intersectsWithSides: function(item) {

		var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height/2), item.height),
			isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (this.floating && horizontalDirection) {
			return ((horizontalDirection === "right" && isOverRightHalf) || (horizontalDirection === "left" && !isOverRightHalf));
		} else {
			return verticalDirection && ((verticalDirection === "down" && isOverBottomHalf) || (verticalDirection === "up" && !isOverBottomHalf));
		}

	},

	_getDragVerticalDirection: function() {
		var delta = this.positionAbs.top - this.lastPositionAbs.top;
		return delta !== 0 && (delta > 0 ? "down" : "up");
	},

	_getDragHorizontalDirection: function() {
		var delta = this.positionAbs.left - this.lastPositionAbs.left;
		return delta !== 0 && (delta > 0 ? "right" : "left");
	},

	refresh: function(event) {
		this._refreshItems(event);
		this._setHandleClassName();
		this.refreshPositions();
		return this;
	},

	_connectWith: function() {
		var options = this.options;
		return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
	},

	_getItemsAsjQuery: function(connected) {

		var i, j, cur, inst,
			items = [],
			queries = [],
			connectWith = this._connectWith();

		if(connectWith && connected) {
			for (i = connectWith.length - 1; i >= 0; i--){
				cur = $(connectWith[i]);
				for ( j = cur.length - 1; j >= 0; j--){
					inst = $.data(cur[j], this.widgetFullName);
					if(inst && inst !== this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
					}
				}
			}
		}

		queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);

		function addItems() {
			items.push( this );
		}
		for (i = queries.length - 1; i >= 0; i--){
			queries[i][0].each( addItems );
		}

		return $(items);

	},

	_removeCurrentsFromItems: function() {

		var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

		this.items = $.grep(this.items, function (item) {
			for (var j=0; j < list.length; j++) {
				if(list[j] === item.item[0]) {
					return false;
				}
			}
			return true;
		});

	},

	_refreshItems: function(event) {

		this.items = [];
		this.containers = [this];

		var i, j, cur, inst, targetData, _queries, item, queriesLength,
			items = this.items,
			queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]],
			connectWith = this._connectWith();

		if(connectWith && this.ready) { //Shouldn't be run the first time through due to massive slow-down
			for (i = connectWith.length - 1; i >= 0; i--){
				cur = $(connectWith[i]);
				for (j = cur.length - 1; j >= 0; j--){
					inst = $.data(cur[j], this.widgetFullName);
					if(inst && inst !== this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
						this.containers.push(inst);
					}
				}
			}
		}

		for (i = queries.length - 1; i >= 0; i--) {
			targetData = queries[i][1];
			_queries = queries[i][0];

			for (j=0, queriesLength = _queries.length; j < queriesLength; j++) {
				item = $(_queries[j]);

				item.data(this.widgetName + "-item", targetData); // Data for target checking (mouse manager)

				items.push({
					item: item,
					instance: targetData,
					width: 0, height: 0,
					left: 0, top: 0
				});
			}
		}

	},

	refreshPositions: function(fast) {

		//This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
		if(this.offsetParent && this.helper) {
			this.offset.parent = this._getParentOffset();
		}

		var i, item, t, p;

		for (i = this.items.length - 1; i >= 0; i--){
			item = this.items[i];

			//We ignore calculating positions of all connected containers when we're not over them
			if(item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
				continue;
			}

			t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

			if (!fast) {
				item.width = t.outerWidth();
				item.height = t.outerHeight();
			}

			p = t.offset();
			item.left = p.left;
			item.top = p.top;
		}

		if(this.options.custom && this.options.custom.refreshContainers) {
			this.options.custom.refreshContainers.call(this);
		} else {
			for (i = this.containers.length - 1; i >= 0; i--){
				p = this.containers[i].element.offset();
				this.containers[i].containerCache.left = p.left;
				this.containers[i].containerCache.top = p.top;
				this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
				this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			}
		}

		return this;
	},

	_createPlaceholder: function(that) {
		that = that || this;
		var className,
			o = that.options;

		if(!o.placeholder || o.placeholder.constructor === String) {
			className = o.placeholder;
			o.placeholder = {
				element: function() {

					var nodeName = that.currentItem[0].nodeName.toLowerCase(),
						element = $( "<" + nodeName + ">", that.document[0] )
							.addClass(className || that.currentItem[0].className+" ui-sortable-placeholder")
							.removeClass("ui-sortable-helper");

					if ( nodeName === "tr" ) {
						that.currentItem.children().each(function() {
							$( "<td>&#160;</td>", that.document[0] )
								.attr( "colspan", $( this ).attr( "colspan" ) || 1 )
								.appendTo( element );
						});
					} else if ( nodeName === "img" ) {
						element.attr( "src", that.currentItem.attr( "src" ) );
					}

					if ( !className ) {
						element.css( "visibility", "hidden" );
					}

					return element;
				},
				update: function(container, p) {

					// 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
					// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
					if(className && !o.forcePlaceholderSize) {
						return;
					}

					//If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
					if(!p.height()) { p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop")||0, 10) - parseInt(that.currentItem.css("paddingBottom")||0, 10)); }
					if(!p.width()) { p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft")||0, 10) - parseInt(that.currentItem.css("paddingRight")||0, 10)); }
				}
			};
		}

		//Create the placeholder
		that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));

		//Append it after the actual current item
		that.currentItem.after(that.placeholder);

		//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
		o.placeholder.update(that, that.placeholder);

	},

	_contactContainers: function(event) {
		var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, cur, nearBottom, floating, axis,
			innermostContainer = null,
			innermostIndex = null;

		// get innermost container that intersects with item
		for (i = this.containers.length - 1; i >= 0; i--) {

			// never consider a container that's located within the item itself
			if($.contains(this.currentItem[0], this.containers[i].element[0])) {
				continue;
			}

			if(this._intersectsWith(this.containers[i].containerCache)) {

				// if we've already found a container and it's more "inner" than this, then continue
				if(innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
					continue;
				}

				innermostContainer = this.containers[i];
				innermostIndex = i;

			} else {
				// container doesn't intersect. trigger "out" event if necessary
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", event, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		// if no intersecting containers found, return
		if(!innermostContainer) {
			return;
		}

		// move the item into the container if it's not there already
		if(this.containers.length === 1) {
			if (!this.containers[innermostIndex].containerCache.over) {
				this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
				this.containers[innermostIndex].containerCache.over = 1;
			}
		} else {

			//When entering a new container, we will find the item with the least distance and append our item near it
			dist = 10000;
			itemWithLeastDistance = null;
			floating = innermostContainer.floating || this._isFloating(this.currentItem);
			posProperty = floating ? "left" : "top";
			sizeProperty = floating ? "width" : "height";
			axis = floating ? "clientX" : "clientY";

			for (j = this.items.length - 1; j >= 0; j--) {
				if(!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
					continue;
				}
				if(this.items[j].item[0] === this.currentItem[0]) {
					continue;
				}

				cur = this.items[j].item.offset()[posProperty];
				nearBottom = false;
				if ( event[ axis ] - cur > this.items[ j ][ sizeProperty ] / 2 ) {
					nearBottom = true;
				}

				if ( Math.abs( event[ axis ] - cur ) < dist ) {
					dist = Math.abs( event[ axis ] - cur );
					itemWithLeastDistance = this.items[ j ];
					this.direction = nearBottom ? "up": "down";
				}
			}

			//Check if dropOnEmpty is enabled
			if(!itemWithLeastDistance && !this.options.dropOnEmpty) {
				return;
			}

			if(this.currentContainer === this.containers[innermostIndex]) {
				if ( !this.currentContainer.containerCache.over ) {
					this.containers[ innermostIndex ]._trigger( "over", event, this._uiHash() );
					this.currentContainer.containerCache.over = 1;
				}
				return;
			}

			itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
			this._trigger("change", event, this._uiHash());
			this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
			this.currentContainer = this.containers[innermostIndex];

			//Update the placeholder
			this.options.placeholder.update(this.currentContainer, this.placeholder);

			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
			this.containers[innermostIndex].containerCache.over = 1;
		}


	},

	_createHelper: function(event) {

		var o = this.options,
			helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper === "clone" ? this.currentItem.clone() : this.currentItem);

		//Add the helper to the DOM if that didn't happen already
		if(!helper.parents("body").length) {
			$(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
		}

		if(helper[0] === this.currentItem[0]) {
			this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };
		}

		if(!helper[0].style.width || o.forceHelperSize) {
			helper.width(this.currentItem.width());
		}
		if(!helper[0].style.height || o.forceHelperSize) {
			helper.height(this.currentItem.height());
		}

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj === "string") {
			obj = obj.split(" ");
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ("left" in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ("right" in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ("top" in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ("bottom" in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {


		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		// This needs to be actually done for all browsers, since pageX/pageY includes this information
		// with an ugly IE fix
		if( this.offsetParent[0] === document.body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {
			po = { top: 0, left: 0 };
		}

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition === "relative") {
			var p = this.currentItem.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),
			top: (parseInt(this.currentItem.css("marginTop"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var ce, co, over,
			o = this.options;
		if(o.containment === "parent") {
			o.containment = this.helper[0].parentNode;
		}
		if(o.containment === "document" || o.containment === "window") {
			this.containment = [
				0 - this.offset.relative.left - this.offset.parent.left,
				0 - this.offset.relative.top - this.offset.parent.top,
				$(o.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left,
				($(o.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
			];
		}

		if(!(/^(document|window|parent)$/).test(o.containment)) {
			ce = $(o.containment)[0];
			co = $(o.containment).offset();
			over = ($(ce).css("overflow") !== "hidden");

			this.containment = [
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
			];
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) {
			pos = this.position;
		}
		var mod = d === "absolute" ? 1 : -1,
			scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
			scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top	+																// The absolute mouse position
				this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top * mod -											// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left +																// The absolute mouse position
				this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var top, left,
			o = this.options,
			pageX = event.pageX,
			pageY = event.pageY,
			scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		// This is another very weird special case that only happens for relative elements:
		// 1. If the css position is relative
		// 2. and the scroll parent is the document or similar to the offset parent
		// we have to refresh the relative offset during the scroll so there are no jumps
		if(this.cssPosition === "relative" && !(this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options

			if(this.containment) {
				if(event.pageX - this.offset.click.left < this.containment[0]) {
					pageX = this.containment[0] + this.offset.click.left;
				}
				if(event.pageY - this.offset.click.top < this.containment[1]) {
					pageY = this.containment[1] + this.offset.click.top;
				}
				if(event.pageX - this.offset.click.left > this.containment[2]) {
					pageX = this.containment[2] + this.offset.click.left;
				}
				if(event.pageY - this.offset.click.top > this.containment[3]) {
					pageY = this.containment[3] + this.offset.click.top;
				}
			}

			if(o.grid) {
				top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? ( (top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3]) ? top : ((top - this.offset.click.top >= this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? ( (left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2]) ? left : ((left - this.offset.click.left >= this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY -																// The absolute mouse position
				this.offset.click.top -													// Click offset (relative to the element)
				this.offset.relative.top	-											// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX -																// The absolute mouse position
				this.offset.click.left -												// Click offset (relative to the element)
				this.offset.relative.left	-											// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_rearrange: function(event, i, a, hardRefresh) {

		a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? i.item[0] : i.item[0].nextSibling));

		//Various things done here to improve the performance:
		// 1. we create a setTimeout, that calls refreshPositions
		// 2. on the instance, we have a counter variable, that get's higher after every append
		// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
		// 4. this lets only the last addition to the timeout stack through
		this.counter = this.counter ? ++this.counter : 1;
		var counter = this.counter;

		this._delay(function() {
			if(counter === this.counter) {
				this.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
			}
		});

	},

	_clear: function(event, noPropagation) {

		this.reverting = false;
		// We delay all events that have to be triggered to after the point where the placeholder has been removed and
		// everything else normalized again
		var i,
			delayedTriggers = [];

		// We first have to update the dom position of the actual currentItem
		// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
		if(!this._noFinalSort && this.currentItem.parent().length) {
			this.placeholder.before(this.currentItem);
		}
		this._noFinalSort = null;

		if(this.helper[0] === this.currentItem[0]) {
			for(i in this._storedCSS) {
				if(this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {
					this._storedCSS[i] = "";
				}
			}
			this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
		} else {
			this.currentItem.show();
		}

		if(this.fromOutside && !noPropagation) {
			delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });
		}
		if((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {
			delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changed
		}

		// Check if the items Container has Changed and trigger appropriate
		// events.
		if (this !== this.currentContainer) {
			if(!noPropagation) {
				delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });
				delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.currentContainer));
				delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.currentContainer));
			}
		}


		//Post events to containers
		function delayEvent( type, instance, container ) {
			return function( event ) {
				container._trigger( type, event, instance._uiHash( instance ) );
			};
		}
		for (i = this.containers.length - 1; i >= 0; i--){
			if (!noPropagation) {
				delayedTriggers.push( delayEvent( "deactivate", this, this.containers[ i ] ) );
			}
			if(this.containers[i].containerCache.over) {
				delayedTriggers.push( delayEvent( "out", this, this.containers[ i ] ) );
				this.containers[i].containerCache.over = 0;
			}
		}

		//Do what was originally in plugins
		if ( this.storedCursor ) {
			this.document.find( "body" ).css( "cursor", this.storedCursor );
			this.storedStylesheet.remove();
		}
		if(this._storedOpacity) {
			this.helper.css("opacity", this._storedOpacity);
		}
		if(this._storedZIndex) {
			this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);
		}

		this.dragging = false;

		if(!noPropagation) {
			this._trigger("beforeStop", event, this._uiHash());
		}

		//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
		this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

		if ( !this.cancelHelperRemoval ) {
			if ( this.helper[ 0 ] !== this.currentItem[ 0 ] ) {
				this.helper.remove();
			}
			this.helper = null;
		}

		if(!noPropagation) {
			for (i=0; i < delayedTriggers.length; i++) {
				delayedTriggers[i].call(this, event);
			} //Trigger all delayed events
			this._trigger("stop", event, this._uiHash());
		}

		this.fromOutside = false;
		return !this.cancelHelperRemoval;

	},

	_trigger: function() {
		if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
			this.cancel();
		}
	},

	_uiHash: function(_inst) {
		var inst = _inst || this;
		return {
			helper: inst.helper,
			placeholder: inst.placeholder || $([]),
			position: inst.position,
			originalPosition: inst.originalPosition,
			offset: inst.positionAbs,
			item: inst.currentItem,
			sender: _inst ? _inst.element : null
		};
	}

});



}));

/**
 * jsBezier-0.7
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * licensed under the MIT license.
 *
 * a set of Bezier curve functions that deal with Beziers, used by jsPlumb, and perhaps useful for other people.  These functions work with Bezier
 * curves of arbitrary degree.
 *
 * - functions are all in the 'jsBezier' namespace.
 *
 * - all input points should be in the format {x:.., y:..}. all output points are in this format too.
 *
 * - all input curves should be in the format [ {x:.., y:..}, {x:.., y:..}, {x:.., y:..}, {x:.., y:..} ]
 *
 * - 'location' as used as an input here refers to a decimal in the range 0-1 inclusive, which indicates a point some proportion along the length
 * of the curve.  location as output has the same format and meaning.
 *
 *
 * Function List:
 * --------------
 *
 * distanceFromCurve(point, curve)
 *
 * 	Calculates the distance that the given point lies from the given Bezier.  Note that it is computed relative to the center of the Bezier,
 * so if you have stroked the curve with a wide pen you may wish to take that into account!  The distance returned is relative to the values
 * of the curve and the point - it will most likely be pixels.
 *
 * gradientAtPoint(curve, location)
 *
 * 	Calculates the gradient to the curve at the given location, as a decimal between 0 and 1 inclusive.
 *
 * gradientAtPointAlongCurveFrom (curve, location)
 *
 *	Calculates the gradient at the point on the given curve that is 'distance' units from location.
 *
 * nearestPointOnCurve(point, curve)
 *
 *	Calculates the nearest point to the given point on the given curve.  The return value of this is a JS object literal, containing both the
 *point's coordinates and also the 'location' of the point (see above), for example:  { point:{x:551,y:150}, location:0.263365 }.
 *
 * pointOnCurve(curve, location)
 *
 * 	Calculates the coordinates of the point on the given Bezier curve at the given location.
 *
 * pointAlongCurveFrom(curve, location, distance)
 *
 * 	Calculates the coordinates of the point on the given curve that is 'distance' units from location.  'distance' should be in the same coordinate
 * space as that used to construct the Bezier curve.  For an HTML Canvas usage, for example, distance would be a measure of pixels.
 *
 * locationAlongCurveFrom(curve, location, distance)
 *
 * 	Calculates the location on the given curve that is 'distance' units from location.  'distance' should be in the same coordinate
 * space as that used to construct the Bezier curve.  For an HTML Canvas usage, for example, distance would be a measure of pixels.
 *
 * perpendicularToCurveAt(curve, location, length, distance)
 *
 * 	Calculates the perpendicular to the given curve at the given location.  length is the length of the line you wish for (it will be centered
 * on the point at 'location'). distance is optional, and allows you to specify a point along the path from the given location as the center of
 * the perpendicular returned.  The return value of this is an array of two points: [ {x:...,y:...}, {x:...,y:...} ].
 *
 *
 */

(function() {

    var root = this;

    if(typeof Math.sgn == "undefined") {
        Math.sgn = function(x) { return x == 0 ? 0 : x > 0 ? 1 :-1; };
    }

    var Vectors = {
            subtract 	: 	function(v1, v2) { return {x:v1.x - v2.x, y:v1.y - v2.y }; },
            dotProduct	: 	function(v1, v2) { return (v1.x * v2.x)  + (v1.y * v2.y); },
            square		:	function(v) { return Math.sqrt((v.x * v.x) + (v.y * v.y)); },
            scale		:	function(v, s) { return {x:v.x * s, y:v.y * s }; }
        },

        maxRecursion = 64,
        flatnessTolerance = Math.pow(2.0,-maxRecursion-1);

    /**
     * Calculates the distance that the point lies from the curve.
     *
     * @param point a point in the form {x:567, y:3342}
     * @param curve a Bezier curve in the form [{x:..., y:...}, {x:..., y:...}, {x:..., y:...}, {x:..., y:...}].  note that this is currently
     * hardcoded to assume cubiz beziers, but would be better off supporting any degree.
     * @return a JS object literal containing location and distance, for example: {location:0.35, distance:10}.  Location is analogous to the location
     * argument you pass to the pointOnPath function: it is a ratio of distance travelled along the curve.  Distance is the distance in pixels from
     * the point to the curve.
     */
    var _distanceFromCurve = function(point, curve) {
        var candidates = [],
            w = _convertToBezier(point, curve),
            degree = curve.length - 1, higherDegree = (2 * degree) - 1,
            numSolutions = _findRoots(w, higherDegree, candidates, 0),
            v = Vectors.subtract(point, curve[0]), dist = Vectors.square(v), t = 0.0;

        for (var i = 0; i < numSolutions; i++) {
            v = Vectors.subtract(point, _bezier(curve, degree, candidates[i], null, null));
            var newDist = Vectors.square(v);
            if (newDist < dist) {
                dist = newDist;
                t = candidates[i];
            }
        }
        v = Vectors.subtract(point, curve[degree]);
        newDist = Vectors.square(v);
        if (newDist < dist) {
            dist = newDist;
            t = 1.0;
        }
        return {location:t, distance:dist};
    };
    /**
     * finds the nearest point on the curve to the given point.
     */
    var _nearestPointOnCurve = function(point, curve) {
        var td = _distanceFromCurve(point, curve);
        return {point:_bezier(curve, curve.length - 1, td.location, null, null), location:td.location};
    };
    var _convertToBezier = function(point, curve) {
        var degree = curve.length - 1, higherDegree = (2 * degree) - 1,
            c = [], d = [], cdTable = [], w = [],
            z = [ [1.0, 0.6, 0.3, 0.1], [0.4, 0.6, 0.6, 0.4], [0.1, 0.3, 0.6, 1.0] ];

        for (var i = 0; i <= degree; i++) c[i] = Vectors.subtract(curve[i], point);
        for (var i = 0; i <= degree - 1; i++) {
            d[i] = Vectors.subtract(curve[i+1], curve[i]);
            d[i] = Vectors.scale(d[i], 3.0);
        }
        for (var row = 0; row <= degree - 1; row++) {
            for (var column = 0; column <= degree; column++) {
                if (!cdTable[row]) cdTable[row] = [];
                cdTable[row][column] = Vectors.dotProduct(d[row], c[column]);
            }
        }
        for (i = 0; i <= higherDegree; i++) {
            if (!w[i]) w[i] = [];
            w[i].y = 0.0;
            w[i].x = parseFloat(i) / higherDegree;
        }
        var n = degree, m = degree-1;
        for (var k = 0; k <= n + m; k++) {
            var lb = Math.max(0, k - m),
                ub = Math.min(k, n);
            for (i = lb; i <= ub; i++) {
                j = k - i;
                w[i+j].y += cdTable[j][i] * z[j][i];
            }
        }
        return w;
    };
    /**
     * counts how many roots there are.
     */
    var _findRoots = function(w, degree, t, depth) {
        var left = [], right = [],
            left_count, right_count,
            left_t = [], right_t = [];

        switch (_getCrossingCount(w, degree)) {
            case 0 : {
                return 0;
            }
            case 1 : {
                if (depth >= maxRecursion) {
                    t[0] = (w[0].x + w[degree].x) / 2.0;
                    return 1;
                }
                if (_isFlatEnough(w, degree)) {
                    t[0] = _computeXIntercept(w, degree);
                    return 1;
                }
                break;
            }
        }
        _bezier(w, degree, 0.5, left, right);
        left_count  = _findRoots(left,  degree, left_t, depth+1);
        right_count = _findRoots(right, degree, right_t, depth+1);
        for (var i = 0; i < left_count; i++) t[i] = left_t[i];
        for (var i = 0; i < right_count; i++) t[i+left_count] = right_t[i];
        return (left_count+right_count);
    };
    var _getCrossingCount = function(curve, degree) {
        var n_crossings = 0, sign, old_sign;
        sign = old_sign = Math.sgn(curve[0].y);
        for (var i = 1; i <= degree; i++) {
            sign = Math.sgn(curve[i].y);
            if (sign != old_sign) n_crossings++;
            old_sign = sign;
        }
        return n_crossings;
    };
    var _isFlatEnough = function(curve, degree) {
        var  error,
            intercept_1, intercept_2, left_intercept, right_intercept,
            a, b, c, det, dInv, a1, b1, c1, a2, b2, c2;
        a = curve[0].y - curve[degree].y;
        b = curve[degree].x - curve[0].x;
        c = curve[0].x * curve[degree].y - curve[degree].x * curve[0].y;

        var max_distance_above = max_distance_below = 0.0;

        for (var i = 1; i < degree; i++) {
            var value = a * curve[i].x + b * curve[i].y + c;
            if (value > max_distance_above)
                max_distance_above = value;
            else if (value < max_distance_below)
                max_distance_below = value;
        }

        a1 = 0.0; b1 = 1.0; c1 = 0.0; a2 = a; b2 = b;
        c2 = c - max_distance_above;
        det = a1 * b2 - a2 * b1;
        dInv = 1.0/det;
        intercept_1 = (b1 * c2 - b2 * c1) * dInv;
        a2 = a; b2 = b; c2 = c - max_distance_below;
        det = a1 * b2 - a2 * b1;
        dInv = 1.0/det;
        intercept_2 = (b1 * c2 - b2 * c1) * dInv;
        left_intercept = Math.min(intercept_1, intercept_2);
        right_intercept = Math.max(intercept_1, intercept_2);
        error = right_intercept - left_intercept;
        return (error < flatnessTolerance)? 1 : 0;
    };
    var _computeXIntercept = function(curve, degree) {
        var XLK = 1.0, YLK = 0.0,
            XNM = curve[degree].x - curve[0].x, YNM = curve[degree].y - curve[0].y,
            XMK = curve[0].x - 0.0, YMK = curve[0].y - 0.0,
            det = XNM*YLK - YNM*XLK, detInv = 1.0/det,
            S = (XNM*YMK - YNM*XMK) * detInv;
        return 0.0 + XLK * S;
    };
    var _bezier = function(curve, degree, t, left, right) {
        var temp = [[]];
        for (var j =0; j <= degree; j++) temp[0][j] = curve[j];
        for (var i = 1; i <= degree; i++) {
            for (var j =0 ; j <= degree - i; j++) {
                if (!temp[i]) temp[i] = [];
                if (!temp[i][j]) temp[i][j] = {};
                temp[i][j].x = (1.0 - t) * temp[i-1][j].x + t * temp[i-1][j+1].x;
                temp[i][j].y = (1.0 - t) * temp[i-1][j].y + t * temp[i-1][j+1].y;
            }
        }
        if (left != null)
            for (j = 0; j <= degree; j++) left[j]  = temp[j][0];
        if (right != null)
            for (j = 0; j <= degree; j++) right[j] = temp[degree-j][j];

        return (temp[degree][0]);
    };

    var _curveFunctionCache = {};
    var _getCurveFunctions = function(order) {
        var fns = _curveFunctionCache[order];
        if (!fns) {
            fns = [];
            var f_term = function() { return function(t) { return Math.pow(t, order); }; },
                l_term = function() { return function(t) { return Math.pow((1-t), order); }; },
                c_term = function(c) { return function(t) { return c; }; },
                t_term = function() { return function(t) { return t; }; },
                one_minus_t_term = function() { return function(t) { return 1-t; }; },
                _termFunc = function(terms) {
                    return function(t) {
                        var p = 1;
                        for (var i = 0; i < terms.length; i++) p = p * terms[i](t);
                        return p;
                    };
                };

            fns.push(new f_term());  // first is t to the power of the curve order
            for (var i = 1; i < order; i++) {
                var terms = [new c_term(order)];
                for (var j = 0 ; j < (order - i); j++) terms.push(new t_term());
                for (var j = 0 ; j < i; j++) terms.push(new one_minus_t_term());
                fns.push(new _termFunc(terms));
            }
            fns.push(new l_term());  // last is (1-t) to the power of the curve order

            _curveFunctionCache[order] = fns;
        }

        return fns;
    };


    /**
     * calculates a point on the curve, for a Bezier of arbitrary order.
     * @param curve an array of control points, eg [{x:10,y:20}, {x:50,y:50}, {x:100,y:100}, {x:120,y:100}].  For a cubic bezier this should have four points.
     * @param location a decimal indicating the distance along the curve the point should be located at.  this is the distance along the curve as it travels, taking the way it bends into account.  should be a number from 0 to 1, inclusive.
     */
    var _pointOnPath = function(curve, location) {
        var cc = _getCurveFunctions(curve.length - 1),
            _x = 0, _y = 0;
        for (var i = 0; i < curve.length ; i++) {
            _x = _x + (curve[i].x * cc[i](location));
            _y = _y + (curve[i].y * cc[i](location));
        }

        return {x:_x, y:_y};
    };

    var _dist = function(p1,p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };

    var _isPoint = function(curve) {
        return curve[0].x == curve[1].x && curve[0].y == curve[1].y;
    };

    /**
     * finds the point that is 'distance' along the path from 'location'.  this method returns both the x,y location of the point and also
     * its 'location' (proportion of travel along the path); the method below - _pointAlongPathFrom - calls this method and just returns the
     * point.
     */
    var _pointAlongPath = function(curve, location, distance) {

        if (_isPoint(curve)) {
            return {
                point:curve[0],
                location:location
            };
        }

        var prev = _pointOnPath(curve, location),
            tally = 0,
            curLoc = location,
            direction = distance > 0 ? 1 : -1,
            cur = null;

        while (tally < Math.abs(distance)) {
            curLoc += (0.005 * direction);
            cur = _pointOnPath(curve, curLoc);
            tally += _dist(cur, prev);
            prev = cur;
        }
        return {point:cur, location:curLoc};
    };

    var _length = function(curve) {
        if (_isPoint(curve)) return 0;

        var prev = _pointOnPath(curve, 0),
            tally = 0,
            curLoc = 0,
            direction = 1,
            cur = null;

        while (curLoc < 1) {
            curLoc += (0.005 * direction);
            cur = _pointOnPath(curve, curLoc);
            tally += _dist(cur, prev);
            prev = cur;
        }
        return tally;
    };

    /**
     * finds the point that is 'distance' along the path from 'location'.
     */
    var _pointAlongPathFrom = function(curve, location, distance) {
        return _pointAlongPath(curve, location, distance).point;
    };

    /**
     * finds the location that is 'distance' along the path from 'location'.
     */
    var _locationAlongPathFrom = function(curve, location, distance) {
        return _pointAlongPath(curve, location, distance).location;
    };

    /**
     * returns the gradient of the curve at the given location, which is a decimal between 0 and 1 inclusive.
     *
     * thanks // http://bimixual.org/AnimationLibrary/beziertangents.html
     */
    var _gradientAtPoint = function(curve, location) {
        var p1 = _pointOnPath(curve, location),
            p2 = _pointOnPath(curve.slice(0, curve.length - 1), location),
            dy = p2.y - p1.y, dx = p2.x - p1.x;
        return dy == 0 ? Infinity : Math.atan(dy / dx);
    };

    /**
     returns the gradient of the curve at the point which is 'distance' from the given location.
     if this point is greater than location 1, the gradient at location 1 is returned.
     if this point is less than location 0, the gradient at location 0 is returned.
     */
    var _gradientAtPointAlongPathFrom = function(curve, location, distance) {
        var p = _pointAlongPath(curve, location, distance);
        if (p.location > 1) p.location = 1;
        if (p.location < 0) p.location = 0;
        return _gradientAtPoint(curve, p.location);
    };

    /**
     * calculates a line that is 'length' pixels long, perpendicular to, and centered on, the path at 'distance' pixels from the given location.
     * if distance is not supplied, the perpendicular for the given location is computed (ie. we set distance to zero).
     */
    var _perpendicularToPathAt = function(curve, location, length, distance) {
        distance = distance == null ? 0 : distance;
        var p = _pointAlongPath(curve, location, distance),
            m = _gradientAtPoint(curve, p.location),
            _theta2 = Math.atan(-1 / m),
            y =  length / 2 * Math.sin(_theta2),
            x =  length / 2 * Math.cos(_theta2);
        return [{x:p.point.x + x, y:p.point.y + y}, {x:p.point.x - x, y:p.point.y - y}];
    };

    this.jsBezier = {
        distanceFromCurve : _distanceFromCurve,
        gradientAtPoint : _gradientAtPoint,
        gradientAtPointAlongCurveFrom : _gradientAtPointAlongPathFrom,
        nearestPointOnCurve : _nearestPointOnCurve,
        pointOnCurve : _pointOnPath,
        pointAlongCurveFrom : _pointAlongPathFrom,
        perpendicularToCurveAt : _perpendicularToPathAt,
        locationAlongCurveFrom:_locationAlongPathFrom,
        getLength:_length
    };
}).call(this);

/**
 * Biltong v0.2
 *
 * Various geometry functions written as part of jsPlumb and perhaps useful for others.
 *
 * Copyright (c) 2014 Simon Porritt
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
;(function() {

	
	"use strict";

	var Biltong = this.Biltong = {};

	var _isa = function(a) { return Object.prototype.toString.call(a) === "[object Array]"; },
		_pointHelper = function(p1, p2, fn) {
		    p1 = _isa(p1) ? p1 : [p1.x, p1.y];
		    p2 = _isa(p2) ? p2 : [p2.x, p2.y];    
		    return fn(p1, p2);
		},
		/**
		* @name Biltong.gradient
		* @function
		* @desc Calculates the gradient of a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The gradient of a line between the two points.
		*/
		_gradient = Biltong.gradient = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) { 
		        if (_p2[0] == _p1[0])
		            return _p2[1] > _p1[1] ? Infinity : -Infinity;
		        else if (_p2[1] == _p1[1]) 
		            return _p2[0] > _p1[0] ? 0 : -0;
		        else 
		            return (_p2[1] - _p1[1]) / (_p2[0] - _p1[0]); 
		    });		
		},
		/**
		* @name Biltong.normal
		* @function
		* @desc Calculates the gradient of a normal to a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The gradient of a normal to a line between the two points.
		*/
		_normal = Biltong.normal = function(p1, p2) {
		    return -1 / _gradient(p1, p2);
		},
		/**
		* @name Biltong.lineLength
		* @function
		* @desc Calculates the length of a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The length of a line between the two points.
		*/
		_lineLength = Biltong.lineLength = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        return Math.sqrt(Math.pow(_p2[1] - _p1[1], 2) + Math.pow(_p2[0] - _p1[0], 2));			
		    });
		},
		/**
		* @name Biltong.quadrant
		* @function
		* @desc Calculates the quadrant in which the angle between the two points lies. 
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Integer} The quadrant - 1 for upper right, 2 for lower right, 3 for lower left, 4 for upper left.
		*/
		_quadrant = Biltong.quadrant = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        if (_p2[0] > _p1[0]) {
		            return (_p2[1] > _p1[1]) ? 2 : 1;
		        }
		        else if (_p2[0] == _p1[0]) {
		            return _p2[1] > _p1[1] ? 2 : 1;    
		        }
		        else {
		            return (_p2[1] > _p1[1]) ? 3 : 4;
		        }
		    });
		},
		/**
		* @name Biltong.theta
		* @function
		* @desc Calculates the angle between the two points. 
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The angle between the two points.
		*/
		_theta = Biltong.theta = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        var m = _gradient(_p1, _p2),
		            t = Math.atan(m),
		            s = _quadrant(_p1, _p2);
		        if ((s == 4 || s== 3)) t += Math.PI;
		        if (t < 0) t += (2 * Math.PI);
		    
		        return t;
		    });
		},
		/**
		* @name Biltong.intersects
		* @function
		* @desc Calculates whether or not the two rectangles intersect.
		* @param {Rectangle} r1 First rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @param {Rectangle} r2 Second rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @return {Boolean} True if the rectangles intersect, false otherwise.
		*/
		_intersects = Biltong.intersects = function(r1, r2) {
		    var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h,
		        a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h;
		
			return  ( (x1 <= a1 && a1 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
			        ( (x1 <= a2 && a2 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
			        ( (x1 <= a1 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||
			        ( (x1 <= a2 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||	
			        ( (a1 <= x1 && x1 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
			        ( (a1 <= x2 && x2 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
			        ( (a1 <= x1 && x1 <= a2) && (b1 <= y2 && y2 <= b2) ) ||
			        ( (a1 <= x2 && x1 <= a2) && (b1 <= y2 && y2 <= b2) );
		},
		/**
		* @name Biltong.encloses
		* @function
		* @desc Calculates whether or not r2 is completely enclosed by r1.
		* @param {Rectangle} r1 First rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @param {Rectangle} r2 Second rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @param {Boolean} [allowSharedEdges=false] If true, the concept of enclosure allows for one or more edges to be shared by the two rectangles.
		* @return {Boolean} True if r1 encloses r2, false otherwise.
		*/
		_encloses = Biltong.encloses = function(r1, r2, allowSharedEdges) {
			var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h,
		        a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h,
				c = function(v1, v2, v3, v4) { return allowSharedEdges ? v1 <= v2 && v3>= v4 : v1 < v2 && v3 > v4; };
				
			return c(x1,a1,x2,a2) && c(y1,b1,y2,b2);
		},
		_segmentMultipliers = [null, [1, -1], [1, 1], [-1, 1], [-1, -1] ],
		_inverseSegmentMultipliers = [null, [-1, -1], [-1, 1], [1, 1], [1, -1] ],
		/**
		* @name Biltong.pointOnLine
		* @function
		* @desc Calculates a point on the line from `fromPoint` to `toPoint` that is `distance` units along the length of the line.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Point} Point on the line, in the form `{ x:..., y:... }`.
		*/
		_pointOnLine = Biltong.pointOnLine = function(fromPoint, toPoint, distance) {
		    var m = _gradient(fromPoint, toPoint),
		        s = _quadrant(fromPoint, toPoint),
		        segmentMultiplier = distance > 0 ? _segmentMultipliers[s] : _inverseSegmentMultipliers[s],
		        theta = Math.atan(m),
		        y = Math.abs(distance * Math.sin(theta)) * segmentMultiplier[1],
		        x =  Math.abs(distance * Math.cos(theta)) * segmentMultiplier[0];
		    return { x:fromPoint.x + x, y:fromPoint.y + y };
		},
		/**
		* @name Biltong.perpendicularLineTo
		* @function
		* @desc Calculates a line of length `length` that is perpendicular to the line from `fromPoint` to `toPoint` and passes through `toPoint`.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Line} Perpendicular line, in the form `[ { x:..., y:... }, { x:..., y:... } ]`.
		*/        
		_perpendicularLineTo = Biltong.perpendicularLineTo = function(fromPoint, toPoint, length) {
		    var m = _gradient(fromPoint, toPoint),
		        theta2 = Math.atan(-1 / m),
		        y =  length / 2 * Math.sin(theta2),
		        x =  length / 2 * Math.cos(theta2);
		    return [{x:toPoint.x + x, y:toPoint.y + y}, {x:toPoint.x - x, y:toPoint.y - y}];
		};	
}).call(this);
;
(function () {

    "use strict";

    var root = this,
        Sniff = {
            android: navigator.userAgent.toLowerCase().indexOf("android") > -1
        },
        matchesSelector = function (el, selector, ctx) {
            ctx = ctx || el.parentNode;
            var possibles = ctx.querySelectorAll(selector);
            for (var i = 0; i < possibles.length; i++) {
                if (possibles[i] === el) {
                    return true;
                }
            }
            return false;
        },
        _gel = function (el) {
            return (typeof el == "string" || el.constructor === String) ? document.getElementById(el) : el;
        },
        _t = function (e) {
            return e.srcElement || e.target;
        },
        _d = function (l, fn) {
            for (var i = 0, j = l.length; i < j; i++) {
                if (l[i] == fn) break;
            }
            if (i < l.length) l.splice(i, 1);
        },
        guid = 1,
    //
    // this function generates a guid for every handler, sets it on the handler, then adds
    // it to the associated object's map of handlers for the given event. this is what enables us
    // to unbind all events of some type, or all events (the second of which can be requested by the user,
    // but it also used by Mottle when an element is removed.)
        _store = function (obj, event, fn) {
            var g = guid++;
            obj.__ta = obj.__ta || {};
            obj.__ta[event] = obj.__ta[event] || {};
            // store each handler with a unique guid.
            obj.__ta[event][g] = fn;
            // set the guid on the handler.
            fn.__tauid = g;
            return g;
        },
        _unstore = function (obj, event, fn) {
            obj.__ta && obj.__ta[event] && delete obj.__ta[event][fn.__tauid];
            // a handler might have attached extra functions, so we unbind those too.
            if (fn.__taExtra) {
                for (var i = 0; i < fn.__taExtra.length; i++) {
                    _unbind(obj, fn.__taExtra[i][0], fn.__taExtra[i][1]);
                }
                fn.__taExtra.length = 0;
            }
            // a handler might have attached an unstore callback
            fn.__taUnstore && fn.__taUnstore();
        },
        _curryChildFilter = function (children, obj, fn, evt) {
            if (children == null) return fn;
            else {
                var c = children.split(","),
                    _fn = function (e) {
                        _fn.__tauid = fn.__tauid;
                        var t = _t(e);
                        for (var i = 0; i < c.length; i++) {
                            if (matchesSelector(t, c[i], obj)) {
                                fn.apply(t, arguments);
                            }
                        }
                    };
                registerExtraFunction(fn, evt, _fn);
                return _fn;
            }
        },
    //
    // registers an 'extra' function on some event listener function we were given - a function that we
    // created and bound to the element as part of our housekeeping, and which we want to unbind and remove
    // whenever the given function is unbound.
        registerExtraFunction = function (fn, evt, newFn) {
            fn.__taExtra = fn.__taExtra || [];
            fn.__taExtra.push([evt, newFn]);
        },
        DefaultHandler = function (obj, evt, fn, children) {
            if (isTouchDevice && touchMap[evt]) {
                var tfn = _curryChildFilter(children, obj, fn, touchMap[evt]);
                _bind(obj, touchMap[evt], tfn , fn);
            }
            if (evt === "focus" && obj.getAttribute("tabindex") == null) {
                obj.setAttribute("tabindex", "1");
            }
            _bind(obj, evt, _curryChildFilter(children, obj, fn, evt), fn);
        },
        SmartClickHandler = function (obj, evt, fn, children) {
            if (obj.__taSmartClicks == null) {
                var down = function (e) {
                        obj.__tad = _pageLocation(e);
                    },
                    up = function (e) {
                        obj.__tau = _pageLocation(e);
                    },
                    click = function (e) {
                        if (obj.__tad && obj.__tau && obj.__tad[0] === obj.__tau[0] && obj.__tad[1] === obj.__tau[1]) {
                            for (var i = 0; i < obj.__taSmartClicks.length; i++)
                                obj.__taSmartClicks[i].apply(_t(e), [ e ]);
                        }
                    };
                DefaultHandler(obj, "mousedown", down, children);
                DefaultHandler(obj, "mouseup", up, children);
                DefaultHandler(obj, "click", click, children);
                obj.__taSmartClicks = [];
            }

            // store in the list of callbacks
            obj.__taSmartClicks.push(fn);
            // the unstore function removes this function from the object's listener list for this type.
            fn.__taUnstore = function () {
                _d(obj.__taSmartClicks, fn);
            };
        },
        _tapProfiles = {
            "tap": {touches: 1, taps: 1},
            "dbltap": {touches: 1, taps: 2},
            "contextmenu": {touches: 2, taps: 1}
        },
        TapHandler = function (clickThreshold, dblClickThreshold) {
            return function (obj, evt, fn, children) {
                // if event is contextmenu, for devices which are mouse only, we want to
                // use the default bind.
                if (evt == "contextmenu" && isMouseDevice)
                    DefaultHandler(obj, evt, fn, children);
                else {
                    // the issue here is that this down handler gets registered only for the
                    // child nodes in the first registration. in fact it should be registered with
                    // no child selector and then on down we should cycle through the regustered
                    // functions to see if one of them matches. on mouseup we should execute ALL of
                    // the functions whose children are either null or match the element.
                    if (obj.__taTapHandler == null) {
                        var tt = obj.__taTapHandler = {
                            tap: [],
                            dbltap: [],
                            contextmenu: [],
                            down: false,
                            taps: 0,
                            downSelectors: []
                        };
                        var down = function (e) {
                                var target = e.srcElement || e.target;
                                for (var i = 0; i < tt.downSelectors.length; i++) {
                                    if (tt.downSelectors[i] == null || matchesSelector(target, tt.downSelectors[i], obj)) {
                                        tt.down = true;
                                        setTimeout(clearSingle, clickThreshold);
                                        setTimeout(clearDouble, dblClickThreshold);
                                        break; // we only need one match on mousedown
                                    }
                                }
                            },
                            up = function (e) {
                                if (tt.down) {
                                    var target = e.srcElement || e.target;
                                    tt.taps++;
                                    var tc = _touchCount(e);
                                    for (var eventId in _tapProfiles) {
                                        if (_tapProfiles.hasOwnProperty(eventId)) {
                                            var p = _tapProfiles[eventId];
                                            if (p.touches === tc && (p.taps === 1 || p.taps === tt.taps)) {
                                                for (var i = 0; i < tt[eventId].length; i++) {
                                                    if (tt[eventId][i][1] == null || matchesSelector(target, tt[eventId][i][1], obj))
                                                        tt[eventId][i][0].apply(_t(e), [ e ]);
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            clearSingle = function () {
                                tt.down = false;
                            },
                            clearDouble = function () {
                                tt.taps = 0;
                            };

                        DefaultHandler(obj, "mousedown", down/*, children*/);
                        DefaultHandler(obj, "mouseup", up/*, children*/);
                    }
                    // add this child selector (it can be null, that's fine).
                    obj.__taTapHandler.downSelectors.push(children);

                    obj.__taTapHandler[evt].push([fn, children]);
                    // the unstore function removes this function from the object's listener list for this type.
                    fn.__taUnstore = function () {
                        _d(obj.__taTapHandler[evt], fn);
                    };
                }
            };
        },
        meeHelper = function (type, evt, obj, target) {
            for (var i in obj.__tamee[type]) {
                if (obj.__tamee[type].hasOwnProperty(i)) {
                    obj.__tamee[type][i].apply(target, [ evt ]);
                }
            }
        },
        MouseEnterExitHandler = function () {
            var activeElements = [];
            return function (obj, evt, fn, children) {
                if (!obj.__tamee) {
                    // __tamee holds a flag saying whether the mouse is currently "in" the element, and a list of
                    // both mouseenter and mouseexit functions.
                    obj.__tamee = { over: false, mouseenter: [], mouseexit: [] };
                    // register over and out functions
                    var over = function (e) {
                            var t = _t(e);
                            if ((children == null && (t == obj && !obj.__tamee.over)) || (matchesSelector(t, children, obj) && (t.__tamee == null || !t.__tamee.over))) {
                                meeHelper("mouseenter", e, obj, t);
                                t.__tamee = t.__tamee || {};
                                t.__tamee.over = true;
                                activeElements.push(t);
                            }
                        },
                        out = function (e) {
                            var t = _t(e);
                            // is the current target one of the activeElements? and is the
                            // related target NOT a descendant of it?
                            for (var i = 0; i < activeElements.length; i++) {
                                if (t == activeElements[i] && !matchesSelector((e.relatedTarget || e.toElement), "*", t)) {
                                    t.__tamee.over = false;
                                    activeElements.splice(i, 1);
                                    meeHelper("mouseexit", e, obj, t);
                                }
                            }
                        };

                    _bind(obj, "mouseover", _curryChildFilter(children, obj, over, "mouseover"), over);
                    _bind(obj, "mouseout", _curryChildFilter(children, obj, out, "mouseout"), out);
                }

                fn.__taUnstore = function () {
                    delete obj.__tamee[evt][fn.__tauid];
                };

                _store(obj, evt, fn);
                obj.__tamee[evt][fn.__tauid] = fn;
            };
        },
        isTouchDevice = "ontouchstart" in document.documentElement,
        isMouseDevice = "onmousedown" in document.documentElement,
        touchMap = { "mousedown": "touchstart", "mouseup": "touchend", "mousemove": "touchmove" },
        touchstart = "touchstart", touchend = "touchend", touchmove = "touchmove",
        iev = (function () {
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent,
                    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        })(),
        isIELT9 = iev > -1 && iev < 9,
        _genLoc = function (e, prefix) {
            if (e == null) return [ 0, 0 ];
            var ts = _touches(e), t = _getTouch(ts, 0);
            return [t[prefix + "X"], t[prefix + "Y"]];
        },
        _pageLocation = function (e) {
            if (e == null) return [ 0, 0 ];
            if (isIELT9) {
                return [ e.clientX + document.documentElement.scrollLeft, e.clientY + document.documentElement.scrollTop ];
            }
            else {
                return _genLoc(e, "page");
            }
        },
        _screenLocation = function (e) {
            return _genLoc(e, "screen");
        },
        _clientLocation = function (e) {
            return _genLoc(e, "client");
        },
        _getTouch = function (touches, idx) {
            return touches.item ? touches.item(idx) : touches[idx];
        },
        _touches = function (e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                    e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                [ e ];
        },
        _touchCount = function (e) {
            return _touches(e).length;
        },
    //http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
        _bind = function (obj, type, fn, originalFn) {
            _store(obj, type, fn);
            originalFn.__tauid = fn.__tauid;
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                var key = type + fn.__tauid;
                obj["e" + key] = fn;
                // TODO look at replacing with .call(..)
                obj[key] = function () {
                    obj["e" + key] && obj["e" + key](window.event);
                };
                obj.attachEvent("on" + type, obj[key]);
            }
        },
        _unbind = function (obj, type, fn) {
            if (fn == null) return;
            _each(obj, function () {
                var _el = _gel(this);
                _unstore(_el, type, fn);
                // it has been bound if there is a tauid. otherwise it was not bound and we can ignore it.
                if (fn.__tauid != null) {
                    if (_el.removeEventListener) {
                        _el.removeEventListener(type, fn, false);
                        if (isTouchDevice && touchMap[type]) _el.removeEventListener(touchMap[type], fn, false);
                    }
                    else if (this.detachEvent) {
                        var key = type + fn.__tauid;
                        _el[key] && _el.detachEvent("on" + type, _el[key]);
                        _el[key] = null;
                        _el["e" + key] = null;
                    }
                }

                // if a touch event was also registered, deregister now.
                if (fn.__taTouchProxy) {
                    _unbind(obj, fn.__taTouchProxy[1], fn.__taTouchProxy[0]);
                }
            });
        },
        _each = function (obj, fn) {
            if (obj == null) return;
            // if a list (or list-like), use it. if a string, get a list
            // by running the string through querySelectorAll. else, assume
            // it's an Element.
            // obj.top is "unknown" in IE8.
            obj = (typeof Window !== "undefined" && (typeof obj.top !== "unknown" && obj == obj.top)) ? [ obj ] :
                    (typeof obj !== "string") && (obj.tagName == null && obj.length != null) ? obj :
                    typeof obj === "string" ? document.querySelectorAll(obj)
                : [ obj ];

            for (var i = 0; i < obj.length; i++)
                fn.apply(obj[i]);
        };

    /**
     * Mottle offers support for abstracting out the differences
     * between touch and mouse devices, plus "smart click" functionality
     * (don't fire click if the mouse has moved between mousedown and mouseup),
     * and synthesized click/tap events.
     * @class Mottle
     * @constructor
     * @param {Object} params Constructor params
     * @param {Number} [params.clickThreshold=150] Threshold, in milliseconds beyond which a touchstart followed by a touchend is not considered to be a click.
     * @param {Number} [params.dblClickThreshold=350] Threshold, in milliseconds beyond which two successive tap events are not considered to be a click.
     * @param {Boolean} [params.smartClicks=false] If true, won't fire click events if the mouse has moved between mousedown and mouseup. Note that this functionality
     * requires that Mottle consume the mousedown event, and so may not be viable in all use cases.
     */
    root.Mottle = function (params) {
        params = params || {};
        var clickThreshold = params.clickThreshold || 150,
            dblClickThreshold = params.dblClickThreshold || 350,
            mouseEnterExitHandler = new MouseEnterExitHandler(),
            tapHandler = new TapHandler(clickThreshold, dblClickThreshold),
            _smartClicks = params.smartClicks,
            _doBind = function (obj, evt, fn, children) {
                if (fn == null) return;
                _each(obj, function () {
                    var _el = _gel(this);
                    if (_smartClicks && evt === "click")
                        SmartClickHandler(_el, evt, fn, children);
                    else if (evt === "tap" || evt === "dbltap" || evt === "contextmenu") {
                        tapHandler(_el, evt, fn, children);
                    }
                    else if (evt === "mouseenter" || evt == "mouseexit")
                        mouseEnterExitHandler(_el, evt, fn, children);
                    else
                        DefaultHandler(_el, evt, fn, children);
                });
            };

        /**
         * Removes an element from the DOM, and deregisters all event handlers for it. You should use this
         * to ensure you don't leak memory.
         * @method remove
         * @param {String|Element} el Element, or id of the element, to remove.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.remove = function (el) {
            _each(el, function () {
                var _el = _gel(this);
                if (_el.__ta) {
                    for (var evt in _el.__ta) {
                        if (_el.__ta.hasOwnProperty(evt)) {
                            for (var h in _el.__ta[evt]) {
                                if (_el.__ta[evt].hasOwnProperty(h))
                                    _unbind(_el, evt, _el.__ta[evt][h]);
                            }
                        }
                    }
                }
                _el.parentNode && _el.parentNode.removeChild(_el);
            });
            return this;
        };

        /**
         * Register an event handler, optionally as a delegate for some set of descendant elements. Note
         * that this method takes either 3 or 4 arguments - if you supply 3 arguments it is assumed you have
         * omitted the `children` parameter, and that the event handler should be bound directly to the given element.
         * @method on
         * @param {Element[]|Element|String} el Either an Element, or a CSS spec for a list of elements, or an array of Elements.
         * @param {String} [children] Comma-delimited list of selectors identifying allowed children.
         * @param {String} event Event ID.
         * @param {Function} fn Event handler function.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.on = function (el, event, children, fn) {
            var _el = arguments[0],
                _c = arguments.length == 4 ? arguments[2] : null,
                _e = arguments[1],
                _f = arguments[arguments.length - 1];

            _doBind(_el, _e, _f, _c);
            return this;
        };

        /**
         * Cancel delegate event handling for the given function. Note that unlike with 'on' you do not supply
         * a list of child selectors here: it removes event delegation from all of the child selectors for which the
         * given function was registered (if any).
         * @method off
         * @param {Element[]|Element|String} el Element - or ID of element - from which to remove event listener.
         * @param {String} event Event ID.
         * @param {Function} fn Event handler function.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.off = function (el, event, fn) {
            _unbind(el, event, fn);
            return this;
        };

        /**
         * Triggers some event for a given element.
         * @method trigger
         * @param {Element} el Element for which to trigger the event.
         * @param {String} event Event ID.
         * @param {Event} originalEvent The original event. Should be optional of course, but currently is not, due
         * to the jsPlumb use case that caused this method to be added.
         * @param {Object} [payload] Optional object to set as `payload` on the generated event; useful for message passing.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.trigger = function (el, event, originalEvent, payload) {
            // MouseEvent undefined in old IE; that's how we know it's a mouse event.  A fine Microsoft paradox.
            var originalIsMouse = isMouseDevice && (typeof MouseEvent === "undefined" || originalEvent == null || originalEvent.constructor === MouseEvent);

            var eventToBind = (isTouchDevice && !isMouseDevice && touchMap[event]) ? touchMap[event] : event,
                bindingAMouseEvent = !(isTouchDevice && !isMouseDevice && touchMap[event]);

            var pl = _pageLocation(originalEvent), sl = _screenLocation(originalEvent), cl = _clientLocation(originalEvent);
            _each(el, function () {
                var _el = _gel(this), evt;
                originalEvent = originalEvent || {
                    screenX: sl[0],
                    screenY: sl[1],
                    clientX: cl[0],
                    clientY: cl[1]
                };

                var _decorate = function (_evt) {
                    if (payload) _evt.payload = payload;
                };

                var eventGenerators = {
                    "TouchEvent": function (evt) {
                        var touch = document.createTouch(window, _el, 0, pl[0], pl[1],
                            sl[0], sl[1],
                            cl[0], cl[1],
                            0, 0, 0, 0);

                        // https://gist.github.com/sstephenson/448808
                        var touches = document.createTouchList(touch);
                        var targetTouches = document.createTouchList(touch);
                        var changedTouches = document.createTouchList(touch);
                        evt.initTouchEvent(eventToBind, true, true, window, null, sl[0], sl[1],
                            cl[0], cl[1], false, false, false, false,
                            touches, targetTouches, changedTouches, 1, 0);
                    },
                    "MouseEvents": function (evt) {
                        evt.initMouseEvent(eventToBind, true, true, window, 0,
                            sl[0], sl[1],
                            cl[0], cl[1],
                            false, false, false, false, 1, _el);

                        if (Sniff.android) {
                            // Android's touch events are not standard.
                            var t = document.createTouch(window, _el, 0, pl[0], pl[1],
                                sl[0], sl[1],
                                cl[0], cl[1],
                                0, 0, 0, 0);

                            evt.touches = evt.targetTouches = evt.changedTouches = document.createTouchList(t);
                        }
                    }
                };

                if (document.createEvent) {

                    var ite = !bindingAMouseEvent && !originalIsMouse && (isTouchDevice && touchMap[event] && !Sniff.android),
                        evtName = ite ? "TouchEvent" : "MouseEvents";

                    evt = document.createEvent(evtName);
                    eventGenerators[evtName](evt);
                    _decorate(evt);
                    _el.dispatchEvent(evt);
                }
                else if (document.createEventObject) {
                    evt = document.createEventObject();
                    evt.eventType = evt.eventName = eventToBind;
                    evt.screenX = sl[0];
                    evt.screenY = sl[1];
                    evt.clientX = cl[0];
                    evt.clientY = cl[1];
                    _decorate(evt);
                    _el.fireEvent('on' + eventToBind, evt);
                }
            });
            return this;
        }
    };

    /**
     * Static method to assist in 'consuming' an element: uses `stopPropagation` where available, or sets
     * `e.returnValue=false` where it is not.
     * @method Mottle.consume
     * @param {Event} e Event to consume
     * @param {Boolean} [doNotPreventDefault=false] If true, does not call `preventDefault()` on the event.
     */
    root.Mottle.consume = function (e, doNotPreventDefault) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.returnValue = false;

        if (!doNotPreventDefault && e.preventDefault)
            e.preventDefault();
    };

    /**
     * Gets the page location corresponding to the given event. For touch events this means get the page location of the first touch.
     * @method Mottle.pageLocation
     * @param {Event} e Event to get page location for.
     * @return {Integer[]} [left, top] for the given event.
     */
    root.Mottle.pageLocation = _pageLocation;

    /**
     * Forces touch events to be turned "on". Useful for testing: even if you don't have a touch device, you can still
     * trigger a touch event when this is switched on and it will be captured and acted on.
     * @method setForceTouchEvents
     * @param {Boolean} value If true, force touch events to be on.
     */
    root.Mottle.setForceTouchEvents = function (value) {
        isTouchDevice = value;
    };

    /**
     * Forces mouse events to be turned "on". Useful for testing: even if you don't have a mouse, you can still
     * trigger a mouse event when this is switched on and it will be captured and acted on.
     * @method setForceMouseEvents
     * @param {Boolean} value If true, force mouse events to be on.
     */
    root.Mottle.setForceMouseEvents = function (value) {
        isMouseDevice = value;
    };

}).call(this);

/**
 drag/drop functionality for use with jsPlumb but with
 no knowledge of jsPlumb. supports multiple scopes (separated by whitespace), dragging
 multiple elements, constrain to parent, drop filters, drag start filters, custom
 css classes.

 a lot of the functionality of this script is expected to be plugged in:

 addClass
 removeClass

 addEvent
 removeEvent

 getPosition
 setPosition
 getSize

 indexOf
 intersects

 the name came from here:

 http://mrsharpoblunto.github.io/foswig.js/

 copyright 2015 jsPlumb
 */

;(function() {

    "use strict";

    Array.prototype.suggest = function(item, head) {
        if (this.indexOf(item) === -1) {
            head ? this.unshift(item) : this.push(item);
        }
    };

    Array.prototype.vanquish = function(item) {
        var idx = this.indexOf(item);
        if (idx != -1) this.splice(idx, 1);
    };

    var _isString = function(f) {
        return f == null ? false : (typeof f === "string" || f.constructor == String);
    };

    var getOffsetRect = function (elem) {
        // (1)
        var box = elem.getBoundingClientRect(),
            body = document.body,
            docElem = document.documentElement,
        // (2)
            scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        // (3)
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
        // (4)
            top  = box.top +  scrollTop - clientTop,
            left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    };

    var matchesSelector = function(el, selector, ctx) {
        ctx = ctx || el.parentNode;
        var possibles = ctx.querySelectorAll(selector);
        for (var i = 0; i < possibles.length; i++) {
            if (possibles[i] === el)
                return true;
        }
        return false;
    };

    var iev = (function() {
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent,
                    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        })(),
        DEFAULT_GRID_X = 50,
        DEFAULT_GRID_Y = 50,
        isIELT9 = iev > -1 && iev < 9,
        _pl = function(e) {
            if (isIELT9) {
                return [ e.clientX + document.documentElement.scrollLeft, e.clientY + document.documentElement.scrollTop ];
            }
            else {
                var ts = _touches(e), t = _getTouch(ts, 0);
                // this is for iPad. may not fly for Android.
                return [t.pageX, t.pageY];
            }
        },
        _getTouch = function(touches, idx) { return touches.item ? touches.item(idx) : touches[idx]; },
        _touches = function(e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                    e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                [ e ];
        },
        _classes = {
            draggable:"katavorio-draggable",    // draggable elements
            droppable:"katavorio-droppable",    // droppable elements
            drag : "katavorio-drag",            // elements currently being dragged
            selected:"katavorio-drag-selected", // elements in current drag selection
            active : "katavorio-drag-active",   // droppables that are targets of a currently dragged element
            hover : "katavorio-drag-hover",     // droppables over which a matching drag element is hovering
            noSelect : "katavorio-drag-no-select" // added to the body to provide a hook to suppress text selection
        },
        _defaultScope = "katavorio-drag-scope",
        _events = [ "stop", "start", "drag", "drop", "over", "out", "beforeStart" ],
        _devNull = function() {},
        _true = function() { return true; },
        _foreach = function(l, fn, from) {
            for (var i = 0; i < l.length; i++) {
                if (l[i] != from)
                    fn(l[i]);
            }
        },
        _setDroppablesActive = function(dd, val, andHover, drag) {
            _foreach(dd, function(e) {
                e.setActive(val);
                if (val) e.updatePosition();
                if (andHover) e.setHover(drag, val);
            });
        },
        _each = function(obj, fn) {
            if (obj == null) return;
            obj = !_isString(obj) && (obj.tagName == null && obj.length != null) ? obj : [ obj ];
            for (var i = 0; i < obj.length; i++)
                fn.apply(obj[i], [ obj[i] ]);
        },
        _consume = function(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
        },
        _defaultInputFilterSelector = "input,textarea,select,button,option",
    //
    // filters out events on all input elements, like textarea, checkbox, input, select.
        _inputFilter = function(e, el, _katavorio) {
            var t = e.srcElement || e.target;
            return !matchesSelector(t, _katavorio.getInputFilterSelector(), el);
        };

    var Super = function(el, params, css, scope) {
        this.params = params || {};
        this.el = el;
        this.params.addClass(this.el, this._class);
        this.uuid = _uuid();
        var enabled = true;
        this.setEnabled = function(e) { enabled = e; };
        this.isEnabled = function() { return enabled; };
        this.toggleEnabled = function() { enabled = !enabled; };
        this.setScope = function(scopes) {
            this.scopes = scopes ? scopes.split(/\s+/) : [ scope ];
        };
        this.addScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) { m[s] = true;});
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.removeScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) { delete m[s];});
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.toggleScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) {
                if (m[s]) delete m[s];
                else m[s] = true;
            });
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.setScope(params.scope);
        this.k = params.katavorio;
        return params.katavorio;
    };

    var Drag = function(el, params, css, scope) {
        this._class = css.draggable;
        var k = Super.apply(this, arguments);
        this.rightButtonCanDrag = this.params.rightButtonCanDrag;
        var downAt = [0,0], posAtDown = null, moving = false,
            consumeStartEvent = this.params.consumeStartEvent !== false,
            dragEl = this.el,
            clone = this.params.clone,
            scroll = this.params.scroll,
            _multipleDrop = params.multipleDrop !== false;

        var snapThreshold = params.snapThreshold || 5,
            _snap = function(pos, x, y, thresholdX, thresholdY) {
                thresholdX = thresholdX || snapThreshold;
                thresholdY = thresholdY || snapThreshold;
                var _dx = Math.floor(pos[0] / x),
                    _dxl = x * _dx,
                    _dxt = _dxl + x,
                    _x = Math.abs(pos[0] - _dxl) <= thresholdX ? _dxl : Math.abs(_dxt - pos[0]) <= thresholdX ? _dxt : pos[0];

                var _dy = Math.floor(pos[1] / y),
                    _dyl = y * _dy,
                    _dyt = _dyl + y,
                    _y = Math.abs(pos[1] - _dyl) <= thresholdY ? _dyl : Math.abs(_dyt - pos[1]) <= thresholdY ? _dyt : pos[1];

                return [ _x, _y];
            };

        this.posses = [];
        this.posseRoles = {};

        this.toGrid = function(pos) {
            if (this.params.grid == null) {
                return pos;
            }
            else {
                return _snap(pos, this.params.grid[0], this.params.grid[1]);
            }
        };

        this.snap = function(x, y) {
            if (dragEl == null) return;
            x = x || (this.params.grid ? this.params.grid[0] : DEFAULT_GRID_X);
            y = y || (this.params.grid ? this.params.grid[1] : DEFAULT_GRID_Y);
            var p = this.params.getPosition(dragEl);
            this.params.setPosition(dragEl, _snap(p, x, y, x, y));
        };

        this.constrain = typeof this.params.constrain === "function" ? this.params.constrain  : (this.params.constrain || this.params.containment) ? function(pos) {
            return [
                Math.max(0, Math.min(constrainRect.w - this.size[0], pos[0])),
                Math.max(0, Math.min(constrainRect.h - this.size[1], pos[1]))
            ];
        } : function(pos) { return pos; };

        var _assignId = function(obj) {
                if (typeof obj == "function") {
                    obj._katavorioId = _uuid();
                    return obj._katavorioId;
                } else {
                    return obj;
                }
            },
        // a map of { spec -> [ fn, exclusion ] } entries.
            _filters = {},
            _testFilter = function(e) {
                for (var key in _filters) {
                    var f = _filters[key];
                    var rv = f[0](e);
                    if (f[1]) rv = !rv;
                    if (!rv) return false;
                }
                return true;
            },
            _setFilter = this.setFilter = function(f, _exclude) {
                if (f) {
                    var key = _assignId(f);
                    _filters[key] = [
                        function(e) {
                            var t = e.srcElement || e.target, m;
                            if (_isString(f)) {
                                m = matchesSelector(t, f, el);
                            }
                            else if (typeof f === "function") {
                                m = f(e, el);
                            }
                            return m;
                        },
                            _exclude !== false
                    ];

                }
            },
            _addFilter = this.addFilter = _setFilter,
            _removeFilter = this.removeFilter = function(f) {
                var key = typeof f == "function" ? f._katavorioId : f;
                delete _filters[key];
            };

        this.clearAllFilters = function() {
            _filters = {};
        };

        this.canDrag = this.params.canDrag || _true;

        var constrainRect,
            matchingDroppables = [], intersectingDroppables = [];

        this.downListener = function(e) {
            var isNotRightClick = this.rightButtonCanDrag || (e.which !== 3 && e.button !== 2);
            if (isNotRightClick && this.isEnabled() && this.canDrag()) {
                var _f =  _testFilter(e) && _inputFilter(e, this.el, this.k);
                if (_f) {
                    if (!clone)
                        dragEl = this.el;
                    else {
                        dragEl = this.el.cloneNode(true);
                        dragEl.setAttribute("id", null);
                        dragEl.style.position = "absolute";
                        // the clone node is added to the body; getOffsetRect gives us a value
                        // relative to the body.
                        var b = getOffsetRect(this.el);
                        dragEl.style.left = b.left + "px";
                        dragEl.style.top = b.top + "px";
                        document.body.appendChild(dragEl);
                    }
                    consumeStartEvent && _consume(e);
                    downAt = _pl(e);
                    //
                    this.params.bind(document, "mousemove", this.moveListener);
                    this.params.bind(document, "mouseup", this.upListener);
                    k.markSelection(this);
                    k.markPosses(this);
                    this.params.addClass(document.body, css.noSelect);
                    _dispatch("beforeStart", {el:this.el, pos:posAtDown, e:e, drag:this});
                }
                else if (this.params.consumeFilteredEvents) {
                    _consume(e);
                }
            }
        }.bind(this);

        this.moveListener = function(e) {
            if (downAt) {
                if (!moving) {
                    var _continue = _dispatch("start", {el:this.el, pos:posAtDown, e:e, drag:this});
                    if (_continue !== false) {
                        if (!downAt) return;
                        this.mark(true);
                        moving = true;
                    }
                }

                // it is possible that the start event caused the drag to be aborted. So we check
                // again that we are currently dragging.
                if (downAt) {
                    intersectingDroppables.length = 0;
                    var pos = _pl(e), dx = pos[0] - downAt[0], dy = pos[1] - downAt[1],
                        z = this.params.ignoreZoom ? 1 : k.getZoom();
                    dx /= z;
                    dy /= z;
                    this.moveBy(dx, dy, e);
                    k.updateSelection(dx, dy, this);
                    k.updatePosses(dx, dy, this);
                }
            }
        }.bind(this);

        this.upListener = function(e) {
            if (downAt) {
                downAt = null;
                this.params.unbind(document, "mousemove", this.moveListener);
                this.params.unbind(document, "mouseup", this.upListener);
                this.params.removeClass(document.body, css.noSelect);
                this.unmark(e);
                k.unmarkSelection(this, e);
                k.unmarkPosses(this, e);
                this.stop(e);
                k.notifySelectionDragStop(this, e);
                moving = false;
                if (clone) {
                    dragEl && dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
                    dragEl = null;
                }
            }
        }.bind(this);

        this.getFilters = function() { return _filters; };

        this.abort = function() {
            if (downAt != null)
                this.upListener();
        };

        this.getDragElement = function() {
            return dragEl || this.el;
        };

        var listeners = {"start":[], "drag":[], "stop":[], "over":[], "out":[], "beforeStart":[] };
        if (params.events.start) listeners.start.push(params.events.start);
        if (params.events.beforeStart) listeners.beforeStart.push(params.events.beforeStart);
        if (params.events.stop) listeners.stop.push(params.events.stop);
        if (params.events.drag) listeners.drag.push(params.events.drag);

        this.on = function(evt, fn) {
            if (listeners[evt]) listeners[evt].push(fn);
        };

        var _dispatch = function(evt, value) {
            if (listeners[evt]) {
                for (var i = 0; i < listeners[evt].length; i++) {
                    try {
                        listeners[evt][i](value);
                    }
                    catch (e) { }
                }
            }
        };

        this.notifyStart = function(e) {
            _dispatch("start", {el:this.el, pos:this.params.getPosition(dragEl), e:e, drag:this});
        };

        this.stop = function(e, force) {
            if (force || moving) {
                var positions = [],
                    sel = k.getSelection(),
                    dPos = this.params.getPosition(dragEl);

                if (sel.length > 1) {
                    for (var i = 0; i < sel.length; i++) {
                        var p = this.params.getPosition(sel[i].el);
                        positions.push([ sel[i].el, { left: p[0], top: p[1] }, sel[i] ]);
                    }
                }
                else {
                    positions.push([ dragEl, {left:dPos[0], top:dPos[1]}, this ]);
                }

                _dispatch("stop", {
                    el: dragEl, pos: dPos, e: e, drag: this, selection:positions
                });
            }
        };

        this.mark = function(andNotify) {
            posAtDown = this.params.getPosition(dragEl);
            this.size = this.params.getSize(dragEl);
            matchingDroppables = k.getMatchingDroppables(this);
            _setDroppablesActive(matchingDroppables, true, false, this);
            this.params.addClass(dragEl, this.params.dragClass || css.drag);
            if (this.params.constrain || this.params.containment) {
                var cs = this.params.getSize(dragEl.parentNode);
                constrainRect = { w:cs[0], h:cs[1] };
            }
            if (andNotify) {
                k.notifySelectionDragStart(this);
            }
        };
        this.unmark = function(e) {
            _setDroppablesActive(matchingDroppables, false, true, this);
            this.params.removeClass(dragEl, this.params.dragClass || css.drag);
            matchingDroppables.length = 0;
            for (var i = 0; i < intersectingDroppables.length; i++) {
                var retVal = intersectingDroppables[i].drop(this, e);
                if (retVal === true) break;
            }
        };
        this.moveBy = function(dx, dy, e) {
            intersectingDroppables.length = 0;
            var cPos = this.constrain(this.toGrid(([posAtDown[0] + dx, posAtDown[1] + dy])), dragEl),
                rect = { x:cPos[0], y:cPos[1], w:this.size[0], h:this.size[1]},
                focusDropElement = null;

            this.params.setPosition(dragEl, cPos);
            for (var i = 0; i < matchingDroppables.length; i++) {
                var r2 = { x:matchingDroppables[i].position[0], y:matchingDroppables[i].position[1], w:matchingDroppables[i].size[0], h:matchingDroppables[i].size[1]};
                if (this.params.intersects(rect, r2) && (_multipleDrop || focusDropElement == null || focusDropElement == matchingDroppables[i].el) && matchingDroppables[i].canDrop(this)) {
                    if (!focusDropElement) focusDropElement = matchingDroppables[i].el;
                    intersectingDroppables.push(matchingDroppables[i]);
                    matchingDroppables[i].setHover(this, true, e);
                }
                else if (matchingDroppables[i].isHover()) {
                    matchingDroppables[i].setHover(this, false, e);
                }
            }

            _dispatch("drag", {el:this.el, pos:cPos, e:e, drag:this});

            /* test to see if the parent needs to be scrolled
             if (scroll) {
             var pnsl = dragEl.parentNode.scrollLeft, pnst = dragEl.parentNode.scrollTop;
             console.log("scroll!", pnsl, pnst);
             }*/
        };
        this.destroy = function() {
            this.params.unbind(this.el, "mousedown", this.downListener);
            this.params.unbind(document, "mousemove", this.moveListener);
            this.params.unbind(document, "mouseup", this.upListener);
            this.downListener = null;
            this.upListener = null;
            this.moveListener = null;
            //this.params = null;
            //this.el = null;
            //dragEl = null;
        };

        // init:register mousedown, and perhaps set a filter
        this.params.bind(this.el, "mousedown", this.downListener);

        // if handle provded, use that.  otherwise, try to set a filter.
        // note that a `handle` selector always results in filterExclude being set to false, ie.
        // the selector defines the handle element(s).
        if (this.params.handle)
            _setFilter(this.params.handle, false);
        else
            _setFilter(this.params.filter, this.params.filterExclude);
    };

    var Drop = function(el, params, css, scope) {
        this._class = css.droppable;
        this.params = params || {};
        this._activeClass = this.params.activeClass || css.active;
        this._hoverClass = this.params.hoverClass || css.hover;
        Super.apply(this, arguments);
        var hover = false;
        this.allowLoopback = this.params.allowLoopback !== false;

        this.setActive = function(val) {
            this.params[val ? "addClass" : "removeClass"](this.el, this._activeClass);
        };

        this.updatePosition = function() {
            this.position = this.params.getPosition(this.el);
            this.size = this.params.getSize(this.el);
        };

        this.canDrop = this.params.canDrop || function(drag) {
            return true;
        };

        this.isHover = function() { return hover; };

        this.setHover = function(drag, val, e) {
            // if turning off hover but this was not the drag that caused the hover, ignore.
            if (val || this.el._katavorioDragHover == null || this.el._katavorioDragHover == drag.el._katavorio) {
                this.params[val ? "addClass" : "removeClass"](this.el, this._hoverClass);
                //this.el._katavorioDragHover = val ? drag.el._katavorio : null;
                this.el._katavorioDragHover = val ? drag.el._katavorio : null;
                if (hover !== val)
                    this.params.events[val ? "over" : "out"]({el:this.el, e:e, drag:drag, drop:this});
                hover = val;
            }
        };

        this.drop = function(drag, event) {
            return this.params.events["drop"]({ drag:drag, e:event, drop:this });
        };

        this.destroy = function() {
            this._class = null;
            this._activeClass = null;
            this._hoverClass = null;
            //this.params = null;
            hover = null;
            //this.el = null;
        };
    };

    var _uuid = function() {
        return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        }));
    };

    var _gel = function(el) {
        if (el == null) return null;
        el = (typeof el === "string" || el.constructor == String)  ? document.getElementById(el) : el;
        if (el == null) return null;
        el._katavorio = el._katavorio || _uuid();
        return el;
    };

    this.Katavorio = function(katavorioParams) {

        var _selection = [],
            _selectionMap = {};

        this._dragsByScope = {};
        this._dropsByScope = {};
        var _zoom = 1,
            _reg = function(obj, map) {
                _each(obj, function(_obj) {
                    for(var i = 0; i < _obj.scopes.length; i++) {
                        map[_obj.scopes[i]] = map[_obj.scopes[i]] || [];
                        map[_obj.scopes[i]].push(_obj);
                    }
                });
            },
            _unreg = function(obj, map) {
                var c = 0;
                _each(obj, function(_obj) {
                    for(var i = 0; i < _obj.scopes.length; i++) {
                        if (map[_obj.scopes[i]]) {
                            var idx = katavorioParams.indexOf(map[_obj.scopes[i]], _obj);
                            if (idx != -1) {
                                map[_obj.scopes[i]].splice(idx, 1);
                                c++;
                            }
                        }
                    }
                });

                return c > 0 ;
            },
            _getMatchingDroppables = this.getMatchingDroppables = function(drag) {
                var dd = [], _m = {};
                for (var i = 0; i < drag.scopes.length; i++) {
                    var _dd = this._dropsByScope[drag.scopes[i]];
                    if (_dd) {
                        for (var j = 0; j < _dd.length; j++) {
                            if (_dd[j].canDrop(drag) &&  !_m[_dd[j].uuid] && (_dd[j].allowLoopback || _dd[j].el !== drag.el)) {
                                _m[_dd[j].uuid] = true;
                                dd.push(_dd[j]);
                            }
                        }
                    }
                }
                return dd;
            },
            _prepareParams = function(p) {
                p = p || {};
                var _p = {
                    events:{}
                }, i;
                for (i in katavorioParams) _p[i] = katavorioParams[i];
                for (i in p) _p[i] = p[i];
                // events

                for (i = 0; i < _events.length; i++) {
                    _p.events[_events[i]] = p[_events[i]] || _devNull;
                }
                _p.katavorio = this;
                return _p;
            }.bind(this),
            _mistletoe = function(existingDrag, params) {
                for (var i = 0; i < _events.length; i++) {
                    if (params[_events[i]]) {
                        existingDrag.on(_events[i], params[_events[i]]);
                    }
                }
            }.bind(this),
            _css = {},
            overrideCss = katavorioParams.css || {},
            _scope = katavorioParams.scope || _defaultScope;

        // prepare map of css classes based on defaults frst, then optional overrides
        for (var i in _classes) _css[i] = _classes[i];
        for (var i in overrideCss) _css[i] = overrideCss[i];

        var inputFilterSelector = katavorioParams.inputFilterSelector || _defaultInputFilterSelector;
        /**
         * Gets the selector identifying which input elements to filter from drag events.
         * @method getInputFilterSelector
         * @return {String} Current input filter selector.
         */
        this.getInputFilterSelector = function() { return inputFilterSelector; };

        /**
         * Sets the selector identifying which input elements to filter from drag events.
         * @method setInputFilterSelector
         * @param {String} selector Input filter selector to set.
         * @return {Katavorio} Current instance; method may be chained.
         */
        this.setInputFilterSelector = function(selector) {
            inputFilterSelector = selector;
            return this;
        };

        this.draggable = function(el, params) {
            var o = [];
            _each(el, function(_el) {
                _el = _gel(_el);
                if (_el != null) {
                    if (_el._katavorioDrag == null) {
                        var p = _prepareParams(params);
                        _el._katavorioDrag = new Drag(_el, p, _css, _scope);
                        _reg(_el._katavorioDrag, this._dragsByScope);
                        o.push(_el._katavorioDrag);
                        katavorioParams.addClass(_el, _css.draggable);
                    }
                    else {
                        _mistletoe(_el._katavorioDrag, params);
                    }
                }
            }.bind(this));
            return o;

        };

        this.droppable = function(el, params) {
            var o = [];
            _each(el, function(_el) {
                _el = _gel(_el);
                if (_el != null) {
                    var drop = new Drop(_el, _prepareParams(params), _css, _scope);
                    _el._katavorioDrop = _el._katavorioDrop || [];
                    _el._katavorioDrop.push(drop);
                    _reg(drop, this._dropsByScope);
                    o.push(drop);
                    katavorioParams.addClass(_el, _css.droppable);
                }
            }.bind(this));
            return o;
        };

        /**
         * @name Katavorio#select
         * @function
         * @desc Adds an element to the current selection (for multiple node drag)
         * @param {Element|String} DOM element - or id of the element - to add.
         */
        this.select = function(el) {
            _each(el, function() {
                var _el = _gel(this);
                if (_el && _el._katavorioDrag) {
                    if (!_selectionMap[_el._katavorio]) {
                        _selection.push(_el._katavorioDrag);
                        _selectionMap[_el._katavorio] = [ _el, _selection.length - 1 ];
                        katavorioParams.addClass(_el, _css.selected);
                    }
                }
            });
            return this;
        };

        /**
         * @name Katavorio#deselect
         * @function
         * @desc Removes an element from the current selection (for multiple node drag)
         * @param {Element|String} DOM element - or id of the element - to remove.
         */
        this.deselect = function(el) {
            _each(el, function() {
                var _el = _gel(this);
                if (_el && _el._katavorio) {
                    var e = _selectionMap[_el._katavorio];
                    if (e) {
                        var _s = [];
                        for (var i = 0; i < _selection.length; i++)
                            if (_selection[i].el !== _el) _s.push(_selection[i]);
                        _selection = _s;
                        delete _selectionMap[_el._katavorio];
                        katavorioParams.removeClass(_el, _css.selected);
                    }
                }
            });
            return this;
        };

        this.deselectAll = function() {
            for (var i in _selectionMap) {
                var d = _selectionMap[i];
                katavorioParams.removeClass(d[0], _css.selected);
            }

            _selection.length = 0;
            _selectionMap = {};
        };

        this.markSelection = function(drag) {
            _foreach(_selection, function(e) { e.mark(); }, drag);
        };

        this.markPosses = function(drag) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (d) {
                            d.mark();
                        }, drag);
                    }
                })
            }
        };

        this.unmarkSelection = function(drag, event) {
            _foreach(_selection, function(e) { e.unmark(event); }, drag);
        };

        this.unmarkPosses = function(drag, event) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (d) {
                            d.unmark(event);
                        }, drag);
                    }
                });
            }
        };

        this.getSelection = function() { return _selection.slice(0); };

        this.updateSelection = function(dx, dy, drag) {
            _foreach(_selection, function(e) { e.moveBy(dx, dy); }, drag);
        };

        this.updatePosses = function(dx, dy, drag) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (e) {
                            e.moveBy(dx, dy);
                        }, drag);
                    }
                });
            }
        };

        this.notifySelectionDragStop = function(drag, evt) {
            _foreach(_selection, function(e) { e.stop(evt, true); }, drag);
        };

        this.notifySelectionDragStart = function(drag, evt) {
            _foreach(_selection, function(e) { e.notifyStart(evt);}, drag);
        };

        this.setZoom = function(z) { _zoom = z; };
        this.getZoom = function() { return _zoom; };

        // does the work of changing scopes
        var _scopeManip = function(kObj, scopes, map, fn) {
            _each(kObj, function(_kObj) {
                _unreg(_kObj, map);  // deregister existing scopes
                _kObj[fn](scopes); // set scopes
                _reg(_kObj, map); // register new ones
            });
        };

        _each([ "set", "add", "remove", "toggle"], function(v) {
            this[v + "Scope"] = function(el, scopes) {
                _scopeManip(el._katavorioDrag, scopes, this._dragsByScope, v + "Scope");
                _scopeManip(el._katavorioDrop, scopes, this._dropsByScope, v + "Scope");
            }.bind(this);
            this[v + "DragScope"] = function(el, scopes) {
                _scopeManip(el._katavorioDrag, scopes, this._dragsByScope, v + "Scope");
            }.bind(this);
            this[v + "DropScope"] = function(el, scopes) {
                _scopeManip(el._katavorioDrop, scopes, this._dropsByScope, v + "Scope");
            }.bind(this);
        }.bind(this));

        this.snapToGrid = function(x, y) {
            for (var s in this._dragsByScope) {
                _foreach(this._dragsByScope[s], function(d) { d.snap(x, y); });
            }
        };

        this.getDragsForScope = function(s) { return this._dragsByScope[s]; };
        this.getDropsForScope = function(s) { return this._dropsByScope[s]; };

        var _destroy = function(el, type, map) {
            el = _gel(el);
            if (el[type]) {
                if (_unreg(el[type], map)) {
                    _each(el[type], function(kObj) { kObj.destroy() });
                }

                el[type] = null;
            }
        };

        this.elementRemoved = function(el) {
            this.destroyDraggable(el);
            this.destroyDroppable(el);
        };

        this.destroyDraggable = function(el) {
            _destroy(el, "_katavorioDrag", this._dragsByScope);
        };

        this.destroyDroppable = function(el) {
            _destroy(el, "_katavorioDrop", this._dropsByScope);
        };

        this.reset = function() {
            this._dragsByScope = {};
            this._dropsByScope = {};
            _selection = [];
            _selectionMap = {};
            _posses = {};
        };

        // ----- groups
        var _posses = {};
        /**
         * Add the given element to the posse with the given id, creating the group if it at first does not exist.
         * @param {Element} el Element to add.
         * @param {String...|Object...} spec Variable args parameters. Each argument can be a either a String, indicating
         * the ID of a Posse to which the element should be added as an active participant, or an Object containing
         * `{ id:"posseId", active:false/true}`. In the latter case, if `active` is not provided it is assumed to be
         * true.
         * @returns {Posse} The Posse to which the element(s) was/were added.
         */
        this.addToPosse = function(el, spec) {

            var posses = [], posseId, active;

            var _one = function(_spec) {
                posseId = _isString(_spec) ? _spec : _spec.id;
                active = _isString(_spec) ? true : _spec.active !== false;
                var posse = _posses[posseId] || (function() {
                    var g = {name:posseId, members:[]};
                    _posses[posseId] = g;
                    return g;
                })();
                _each(el, function(_el) {
                    if (_el._katavorioDrag) {
                        posse.members.suggest(_el._katavorioDrag);
                        _el._katavorioDrag.posses.suggest(posse.name);
                        _el._katavorioDrag.posseRoles[posse.name] = active;
                    }
                });
                posses.push(posse);
            };

            for (var i = 1; i < arguments.length; i++) {
                _one(arguments[i]);
            }



            return posses.length == 1 ? posses[0] : posses;
        };

        /**
         * Remove the given element from the given posse(s).
         * @param {Element} el Element to remove.
         * @param {String...} posseId Varargs parameter: one value for each posse to remove the element from.
         */
        this.removeFromPosse = function(el, posseId) {
            if (arguments.length < 2) throw new TypeError("No posse id provided for remove operation");
            for(var i = 1; i < arguments.length; i++) {
                posseId = arguments[i];
                _each(el, function (_el) {
                    if (_el._katavorioDrag && _el._katavorioDrag.posses) {
                        var d = _el._katavorioDrag;
                        _each(posseId, function (p) {
                            _posses[p].members.vanquish(d);
                            d.posses.vanquish(p);
                            delete d.posseRoles[p];
                        });
                    }
                });
            }
        };

        /**
         * Remove the given element from all Posses to which it belongs.
         * @param {Element|Element[]} el Element to remove from Posses.
         */
        this.removeFromAllPosses = function(el) {
            _each(el, function(_el) {
                if (_el._katavorioDrag && _el._katavorioDrag.posses) {
                    var d = _el._katavorioDrag;
                    _each(d.posses, function(p) {
                        _posses[p].members.vanquish(d);
                    });
                    d.posses.length = 0;
                    d.posseRoles = {};
                }
            });
        };
    };
}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains utility functions that run in both browsers and headless.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */

;
(function () {

    var _isa = function (a) {
            return Object.prototype.toString.call(a) === "[object Array]";
        },
        _isnum = function (n) {
            return Object.prototype.toString.call(n) === "[object Number]";
        },
        _iss = function (s) {
            return typeof s === "string";
        },
        _isb = function (s) {
            return typeof s === "boolean";
        },
        _isnull = function (s) {
            return s == null;
        },
        _iso = function (o) {
            return o == null ? false : Object.prototype.toString.call(o) === "[object Object]";
        },
        _isd = function (o) {
            return Object.prototype.toString.call(o) === "[object Date]";
        },
        _isf = function (o) {
            return Object.prototype.toString.call(o) === "[object Function]";
        },
        _ise = function (o) {
            for (var i in o) {
                if (o.hasOwnProperty(i)) return false;
            }
            return true;
        };

    var root = this;
    var exports = root.jsPlumbUtil = {
        isArray: _isa,
        isString: _iss,
        isBoolean: _isb,
        isNull: _isnull,
        isObject: _iso,
        isDate: _isd,
        isFunction: _isf,
        isEmpty: _ise,
        isNumber: _isnum,
        clone: function (a) {
            if (_iss(a)) return "" + a;
            else if (_isb(a)) return !!a;
            else if (_isd(a)) return new Date(a.getTime());
            else if (_isf(a)) return a;
            else if (_isa(a)) {
                var b = [];
                for (var i = 0; i < a.length; i++)
                    b.push(this.clone(a[i]));
                return b;
            }
            else if (_iso(a)) {
                var c = {};
                for (var j in a)
                    c[j] = this.clone(a[j]);
                return c;
            }
            else return a;
        },
        merge: function (a, b, collations) {
            // first change the collations array - if present - into a lookup table, because its faster.
            var cMap = {}, ar, i;
            collations = collations || [];
            for (i = 0; i < collations.length; i++)
                cMap[collations[i]] = true;

            var c = this.clone(a);
            for (i in b) {
                if (c[i] == null) {
                    c[i] = b[i];
                }
                else if (_iss(b[i]) || _isb(b[i])) {
                    if (!cMap[i]) {
                        c[i] = b[i]; // if we dont want to collate, just copy it in.
                    }
                    else {
                        ar = [];
                        // if c's object is also an array we can keep its values.
                        ar.push.apply(ar, _isa(c[i]) ? c[i] : [ c[i] ]);
                        ar.push.apply(ar, _isa(b[i]) ? b[i] : [ b[i] ]);
                        c[i] = ar;
                    }
                }
                else {
                    if (_isa(b[i])) {
                        ar = [];
                        // if c's object is also an array we can keep its values.
                        if (_isa(c[i])) ar.push.apply(ar, c[i]);
                        ar.push.apply(ar, b[i]);
                        c[i] = ar;
                    }
                    else if (_iso(b[i])) {
                        // overwite c's value with an object if it is not already one.
                        if (!_iso(c[i]))
                            c[i] = {};
                        for (var j in b[i]) {
                            c[i][j] = b[i][j];
                        }
                    }
                }

            }
            return c;
        },
        replace: function (inObj, path, value) {
            if (inObj == null) return;
            var q = inObj, t = q;
            path.replace(/([^\.])+/g, function (term, lc, pos, str) {
                var array = term.match(/([^\[0-9]+){1}(\[)([0-9+])/),
                    last = pos + term.length >= str.length,
                    _getArray = function () {
                        return t[array[1]] || (function () {
                            t[array[1]] = [];
                            return t[array[1]];
                        })();
                    };

                if (last) {
                    // set term = value on current t, creating term as array if necessary.
                    if (array)
                        _getArray()[array[3]] = value;
                    else
                        t[term] = value;
                }
                else {
                    // set to current t[term], creating t[term] if necessary.
                    if (array) {
                        var a = _getArray();
                        t = a[array[3]] || (function () {
                            a[array[3]] = {};
                            return a[array[3]];
                        })();
                    }
                    else
                        t = t[term] || (function () {
                            t[term] = {};
                            return t[term];
                        })();
                }
            });

            return inObj;
        },
        //
        // chain a list of functions, supplied by [ object, method name, args ], and return on the first
        // one that returns the failValue. if none return the failValue, return the successValue.
        //
        functionChain: function (successValue, failValue, fns) {
            for (var i = 0; i < fns.length; i++) {
                var o = fns[i][0][fns[i][1]].apply(fns[i][0], fns[i][2]);
                if (o === failValue) {
                    return o;
                }
            }
            return successValue;
        },
        // take the given model and expand out any parameters.
        populate: function (model, values) {
            // for a string, see if it has parameter matches, and if so, try to make the substitutions.
            var getValue = function (fromString) {
                    var matches = fromString.match(/(\${.*?})/g);
                    if (matches != null) {
                        for (var i = 0; i < matches.length; i++) {
                            var val = values[matches[i].substring(2, matches[i].length - 1)] || "";
                            if (val != null) {
                                fromString = fromString.replace(matches[i], val);
                            }
                        }
                    }
                    return fromString;
                },
            // process one entry.
                _one = function (d) {
                    if (d != null) {
                        if (_iss(d)) {
                            return getValue(d);
                        }
                        else if (_isa(d)) {
                            var r = [];
                            for (var i = 0; i < d.length; i++)
                                r.push(_one(d[i]));
                            return r;
                        }
                        else if (_iso(d)) {
                            var s = {};
                            for (var j in d) {
                                s[j] = _one(d[j]);
                            }
                            return s;
                        }
                        else {
                            return d;
                        }
                    }
                };

            return _one(model);
        },
        findWithFunction: function (a, f) {
            if (a)
                for (var i = 0; i < a.length; i++) if (f(a[i])) return i;
            return -1;
        },
        removeWithFunction: function (a, f) {
            var idx = exports.findWithFunction(a, f);
            if (idx > -1) a.splice(idx, 1);
            return idx != -1;
        },
        remove: function (l, v) {
            var idx = l.indexOf(v);
            if (idx > -1) l.splice(idx, 1);
            return idx != -1;
        },
        // TODO support insert index
        addWithFunction: function (list, item, hashFunction) {
            if (exports.findWithFunction(list, hashFunction) == -1) list.push(item);
        },
        addToList: function (map, key, value, insertAtStart) {
            var l = map[key];
            if (l == null) {
                l = [];
                map[key] = l;
            }
            l[insertAtStart ? "unshift" : "push"](value);
            return l;
        },
        //
        // extends the given obj (which can be an array) with the given constructor function, prototype functions, and
        // class members, any of which may be null.
        //
        extend: function (child, parent, _protoFn) {
            var i;
            parent = _isa(parent) ? parent : [ parent ];

            for (i = 0; i < parent.length; i++) {
                for (var j in parent[i].prototype) {
                    if (parent[i].prototype.hasOwnProperty(j)) {
                        child.prototype[j] = parent[i].prototype[j];
                    }
                }
            }

            var _makeFn = function (name, protoFn) {
                return function () {
                    for (i = 0; i < parent.length; i++) {
                        if (parent[i].prototype[name])
                            parent[i].prototype[name].apply(this, arguments);
                    }
                    return protoFn.apply(this, arguments);
                };
            };

            var _oneSet = function (fns) {
                for (var k in fns) {
                    child.prototype[k] = _makeFn(k, fns[k]);
                }
            };

            if (arguments.length > 2) {
                for (i = 2; i < arguments.length; i++)
                    _oneSet(arguments[i]);
            }

            return child;
        },
        uuid: function () {
            return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }));
        },
        logEnabled: true,
        log: function () {
            if (exports.logEnabled && typeof console != "undefined") {
                try {
                    var msg = arguments[arguments.length - 1];
                    console.log(msg);
                }
                catch (e) {
                }
            }
        },

        /**
         * Wraps one function with another, creating a placeholder for the
         * wrapped function if it was null. this is used to wrap the various
         * drag/drop event functions - to allow jsPlumb to be notified of
         * important lifecycle events without imposing itself on the user's
         * drag/drop functionality.
         * @method jsPlumbUtil.wrap
         * @param {Function} wrappedFunction original function to wrap; may be null.
         * @param {Function} newFunction function to wrap the original with.
         * @param {Object} [returnOnThisValue] Optional. Indicates that the wrappedFunction should
         * not be executed if the newFunction returns a value matching 'returnOnThisValue'.
         * note that this is a simple comparison and only works for primitives right now.
         */
        wrap: function (wrappedFunction, newFunction, returnOnThisValue) {
            wrappedFunction = wrappedFunction || function () {
            };
            newFunction = newFunction || function () {
            };
            return function () {
                var r = null;
                try {
                    r = newFunction.apply(this, arguments);
                } catch (e) {
                    exports.log("jsPlumb function failed : " + e);
                }
                if (returnOnThisValue == null || (r !== returnOnThisValue)) {
                    try {
                        r = wrappedFunction.apply(this, arguments);
                    } catch (e) {
                        exports.log("wrapped function failed : " + e);
                    }
                }
                return r;
            };
        }
    };

    exports.EventGenerator = function () {
        var _listeners = {},
            eventsSuspended = false,
        // this is a list of events that should re-throw any errors that occur during their dispatch. it is current private.
            eventsToDieOn = { "ready": true };

        this.bind = function (event, listener, insertAtStart) {
            var _one = function(evt) {
                exports.addToList(_listeners, evt, listener, insertAtStart);
                listener.__jsPlumb = listener.__jsPlumb || {};
                listener.__jsPlumb[jsPlumbUtil.uuid()] = evt;
            };

            if (typeof event === "string") _one(event);
            else if (event.length != null) {
                for (var i = 0; i < event.length; i++) {
                    _one(event[i]);
                }
            }

            return this;
        };

        this.fire = function (event, value, originalEvent) {
            if (!eventsSuspended && _listeners[event]) {
                var l = _listeners[event].length, i = 0, _gone = false, ret = null;
                if (!this.shouldFireEvent || this.shouldFireEvent(event, value, originalEvent)) {
                    while (!_gone && i < l && ret !== false) {
                        // doing it this way rather than catching and then possibly re-throwing means that an error propagated by this
                        // method will have the whole call stack available in the debugger.
                        if (eventsToDieOn[event])
                            _listeners[event][i].apply(this, [ value, originalEvent]);
                        else {
                            try {
                                ret = _listeners[event][i].apply(this, [ value, originalEvent ]);
                            } catch (e) {
                                exports.log("jsPlumb: fire failed for event " + event + " : " + e);
                            }
                        }
                        i++;
                        if (_listeners == null || _listeners[event] == null)
                            _gone = true;
                    }
                }
            }
            return this;
        };

        this.unbind = function (eventOrListener, listener) {

            if (arguments.length === 0) {
                _listeners = {};
            }
            else if (arguments.length === 1) {
                if (typeof eventOrListener === "string")
                    delete _listeners[eventOrListener];
                else if (eventOrListener.__jsPlumb) {
                    var evt;
                    for (var i in eventOrListener.__jsPlumb) {
                        evt = eventOrListener.__jsPlumb[i];
                        exports.remove(_listeners[evt] || [], eventOrListener);
                    }
                }
            }
            else if (arguments.length === 2) {
                exports.remove(_listeners[eventOrListener] || [], listener);
            }

            return this;
        };

        this.getListener = function (forEvent) {
            return _listeners[forEvent];
        };
        this.setSuspendEvents = function (val) {
            eventsSuspended = val;
        };
        this.isSuspendEvents = function () {
            return eventsSuspended;
        };
        this.silently = function(fn) {
            this.setSuspendEvents(true);
            try {
                fn();
            }
            catch (e) {
                jsPlumbUtil.log("Cannot execute silent function " + e);
            }
            this.setSuspendEvents(false);
        };
        this.cleanupListeners = function () {
            for (var i in _listeners) {
                _listeners[i] = null;
            }
        };
    };

    exports.EventGenerator.prototype = {
        cleanup: function () {
            this.cleanupListeners();
        }
    };

}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains utility functions that run in browsers only.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
 ;(function() {

  "use strict";

   var root = this;
   var exports = root.jsPlumbUtil;

   exports.matchesSelector = function(el, selector, ctx) {
       ctx = ctx || el.parentNode;
       var possibles = ctx.querySelectorAll(selector);
       for (var i = 0; i < possibles.length; i++) {
           if (possibles[i] === el)
               return true;
       }
       return false;
   };

   exports.consume = function(e, doNotPreventDefault) {
       if (e.stopPropagation)
           e.stopPropagation();
       else
           e.returnValue = false;

       if (!doNotPreventDefault && e.preventDefault)
            e.preventDefault();
   };

   /*
    * Function: sizeElement
    * Helper to size and position an element. You would typically use
    * this when writing your own Connector or Endpoint implementation.
    *
    * Parameters:
    *  x - [int] x position for the element origin
    *  y - [int] y position for the element origin
    *  w - [int] width of the element
    *  h - [int] height of the element
    *
    */
   exports.sizeElement = function(el, x, y, w, h) {
       if (el) {
           el.style.height = h + "px";
           el.height = h;
           el.style.width = w + "px";
           el.width = w;
           el.style.left = x + "px";
           el.style.top = y + "px";
       }
   };


 }).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the core code.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
(function () {

    "use strict";

    var root = this;
    var connectorTypes = [], rendererTypes;

    var _ju = root.jsPlumbUtil,
        _getOffset = function (el, _instance, relativeToRoot) {
            return _instance.getOffset(el, relativeToRoot);
        },

        /**
         * creates a timestamp, using milliseconds since 1970, but as a string.
         */
        _timestamp = function () {
            return "" + (new Date()).getTime();
        },

    // helper method to update the hover style whenever it, or paintStyle, changes.
    // we use paintStyle as the foundation and merge hoverPaintStyle over the
    // top.
        _updateHoverStyle = function (component) {
            if (component._jsPlumb.paintStyle && component._jsPlumb.hoverPaintStyle) {
                var mergedHoverStyle = {};
                jsPlumb.extend(mergedHoverStyle, component._jsPlumb.paintStyle);
                jsPlumb.extend(mergedHoverStyle, component._jsPlumb.hoverPaintStyle);
                delete component._jsPlumb.hoverPaintStyle;
                // we want the fillStyle of paintStyle to override a gradient, if possible.
                if (mergedHoverStyle.gradient && component._jsPlumb.paintStyle.fillStyle)
                    delete mergedHoverStyle.gradient;
                component._jsPlumb.hoverPaintStyle = mergedHoverStyle;
            }
        },
        events = ["tap", "dbltap", "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu" ],
        eventFilters = { "mouseout": "mouseleave", "mouseexit": "mouseleave" },
        _updateAttachedElements = function (component, state, timestamp, sourceElement) {
            var affectedElements = component.getAttachedElements();
            if (affectedElements) {
                for (var i = 0, j = affectedElements.length; i < j; i++) {
                    if (!sourceElement || sourceElement != affectedElements[i])
                        affectedElements[i].setHover(state, true, timestamp);			// tell the attached elements not to inform their own attached elements.
                }
            }
        },
        _splitType = function (t) {
            return t == null ? null : t.split(" ");
        },
        _mapType = function(map, obj, typeId) {
            for (var i in obj)
                map[i] = typeId;
        },
        _each = function(fn, obj) {
            obj = jsPlumbUtil.isArray(obj) || (obj.length != null && !jsPlumbUtil.isString(obj)) ? obj : [ obj ];
            for (var i = 0; i < obj.length; i++) {
                try {
                    fn.apply(obj[i], [ obj[i] ]);
                }
                catch (e) {
                    jsPlumbUtil.log(".each iteration failed : " + e);
                }
            }
        },
        _applyTypes = function (component, params, doNotRepaint) {
            if (component.getDefaultType) {
                var td = component.getTypeDescriptor(), map = {};
                var defType = component.getDefaultType();
                var o = _ju.merge({}, defType);
                _mapType(map, defType, "__default");
                for (var i = 0, j = component._jsPlumb.types.length; i < j; i++) {
                    var tid = component._jsPlumb.types[i];
                    if (tid !== "__default") {
                        var _t = component._jsPlumb.instance.getType(tid, td);
                        if (_t != null) {
                            o = _ju.merge(o, _t, [ "cssClass" ]);
                            _mapType(map, _t, tid);
                        }
                    }
                }

                if (params) {
                    o = _ju.populate(o, params);
                }

                component.applyType(o, doNotRepaint, map);
                if (!doNotRepaint) component.repaint();
            }
        },

// ------------------------------ BEGIN jsPlumbUIComponent --------------------------------------------

        jsPlumbUIComponent = window.jsPlumbUIComponent = function (params) {

            jsPlumbUtil.EventGenerator.apply(this, arguments);

            var self = this,
                a = arguments,
                idPrefix = self.idPrefix,
                id = idPrefix + (new Date()).getTime();

            this._jsPlumb = {
                instance: params._jsPlumb,
                parameters: params.parameters || {},
                paintStyle: null,
                hoverPaintStyle: null,
                paintStyleInUse: null,
                hover: false,
                beforeDetach: params.beforeDetach,
                beforeDrop: params.beforeDrop,
                overlayPlacements: [],
                hoverClass: params.hoverClass || params._jsPlumb.Defaults.HoverClass,
                types: [],
                typeCache:{}
            };

            this.cacheTypeItem = function(key, item, typeId) {
                this._jsPlumb.typeCache[typeId] = this._jsPlumb.typeCache[typeId] || {};
                this._jsPlumb.typeCache[typeId][key] = item;
            };
            this.getCachedTypeItem = function(key, typeId) {
                return this._jsPlumb.typeCache[typeId] ? this._jsPlumb.typeCache[typeId][key] : null;
            };

            this.getId = function () {
                return id;
            };

// ----------------------------- default type --------------------------------------------


            var o = params.overlays || [], oo = {};
            if (this.defaultOverlayKeys) {
                for (var i = 0; i < this.defaultOverlayKeys.length; i++)
                    Array.prototype.push.apply(o, this._jsPlumb.instance.Defaults[this.defaultOverlayKeys[i]] || []);

                for (i = 0; i < o.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = jsPlumb.convertToFullOverlaySpec(o[i]);
                    oo[fo[1].id] = fo;
                }
            }

            var _defaultType = {
                overlays:oo,
                parameters: params.parameters || {},
                scope: params.scope || this._jsPlumb.instance.getDefaultScope()
            };
            this.getDefaultType = function() {
                return _defaultType;
            };
            this.appendToDefaultType = function(obj) {
                for (var i in obj) _defaultType[i] = obj[i];
            };

// ----------------------------- end default type --------------------------------------------

            // all components can generate events

            if (params.events) {
                for (i in params.events)
                    self.bind(i, params.events[i]);
            }

            // all components get this clone function.
            // TODO issue 116 showed a problem with this - it seems 'a' that is in
            // the clone function's scope is shared by all invocations of it, the classic
            // JS closure problem.  for now, jsPlumb does a version of this inline where
            // it used to call clone.  but it would be nice to find some time to look
            // further at this.
            this.clone = function () {
                var o = {};//new Object();
                this.constructor.apply(o, a);
                return o;
            }.bind(this);

            // user can supply a beforeDetach callback, which will be executed before a detach
            // is performed; returning false prevents the detach.
            this.isDetachAllowed = function (connection) {
                var r = true;
                if (this._jsPlumb.beforeDetach) {
                    try {
                        r = this._jsPlumb.beforeDetach(connection);
                    }
                    catch (e) {
                        _ju.log("jsPlumb: beforeDetach callback failed", e);
                    }
                }
                return r;
            };

            // user can supply a beforeDrop callback, which will be executed before a dropped
            // connection is confirmed. user can return false to reject connection.
            this.isDropAllowed = function (sourceId, targetId, scope, connection, dropEndpoint, source, target) {
                var r = this._jsPlumb.instance.checkCondition("beforeDrop", {
                    sourceId: sourceId,
                    targetId: targetId,
                    scope: scope,
                    connection: connection,
                    dropEndpoint: dropEndpoint,
                    source: source, target: target
                });
                if (this._jsPlumb.beforeDrop) {
                    try {
                        r = this._jsPlumb.beforeDrop({
                            sourceId: sourceId,
                            targetId: targetId,
                            scope: scope,
                            connection: connection,
                            dropEndpoint: dropEndpoint,
                            source: source, target: target
                        });
                    }
                    catch (e) {
                        _ju.log("jsPlumb: beforeDrop callback failed", e);
                    }
                }
                return r;
            };

            var boundListeners = [],
                bindAListener = function (obj, type, fn) {
                    boundListeners.push([obj, type, fn]);
                    obj.bind(type, fn);
                },
                domListeners = [];

            // sets the component associated with listener events. for instance, an overlay delegates
            // its events back to a connector. but if the connector is swapped on the underlying connection,
            // then this component must be changed. This is called by setConnector in the Connection class.
            this.setListenerComponent = function (c) {
                for (var i = 0; i < domListeners.length; i++)
                    domListeners[i][3] = c;
            };


        };

    var _removeTypeCssHelper = function (component, typeIndex) {
        var typeId = component._jsPlumb.types[typeIndex],
            type = component._jsPlumb.instance.getType(typeId, component.getTypeDescriptor());

        if (type != null) {

            if (type.cssClass && component.canvas)
                component._jsPlumb.instance.removeClass(component.canvas, type.cssClass);
        }
    };

    jsPlumbUtil.extend(jsPlumbUIComponent, jsPlumbUtil.EventGenerator, {

        getParameter: function (name) {
            return this._jsPlumb.parameters[name];
        },

        setParameter: function (name, value) {
            this._jsPlumb.parameters[name] = value;
        },

        getParameters: function () {
            return this._jsPlumb.parameters;
        },

        setParameters: function (p) {
            this._jsPlumb.parameters = p;
        },

        getClass:function() {
            return jsPlumb.getClass(this.canvas);
        },

        hasClass:function(clazz) {
            return jsPlumb.hasClass(this.canvas, clazz);
        },

        addClass: function (clazz) {
            jsPlumb.addClass(this.canvas, clazz);
        },

        removeClass: function (clazz) {
            jsPlumb.removeClass(this.canvas, clazz);
        },

        updateClasses: function (classesToAdd, classesToRemove) {
            jsPlumb.updateClasses(this.canvas, classesToAdd, classesToRemove);
        },

        setType: function (typeId, params, doNotRepaint) {
            this.clearTypes();
            this._jsPlumb.types = _splitType(typeId) || [];
            _applyTypes(this, params, doNotRepaint);
        },

        getType: function () {
            return this._jsPlumb.types;
        },

        reapplyTypes: function (params, doNotRepaint) {
            _applyTypes(this, params, doNotRepaint);
        },

        hasType: function (typeId) {
            return this._jsPlumb.types.indexOf(typeId) != -1;
        },

        addType: function (typeId, params, doNotRepaint) {
            var t = _splitType(typeId), _cont = false;
            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    if (!this.hasType(t[i])) {
                        this._jsPlumb.types.push(t[i]);
                        _cont = true;
                    }
                }
                if (_cont) _applyTypes(this, params, doNotRepaint);
            }
        },

        removeType: function (typeId, doNotRepaint) {
            var t = _splitType(typeId), _cont = false, _one = function (tt) {
                var idx = this._jsPlumb.types.indexOf(tt);
                if (idx != -1) {
                    // remove css class if necessary
                    _removeTypeCssHelper(this, idx);
                    this._jsPlumb.types.splice(idx, 1);
                    return true;
                }
                return false;
            }.bind(this);

            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    _cont = _one(t[i]) || _cont;
                }
                if (_cont) _applyTypes(this, null, doNotRepaint);
            }
        },
        clearTypes: function (doNotRepaint) {
            var i = this._jsPlumb.types.length;
            for (var j = 0; j < i; j++) {
                _removeTypeCssHelper(this, 0);
                this._jsPlumb.types.splice(0, 1);
            }
            _applyTypes(this, {}, doNotRepaint);
        },

        toggleType: function (typeId, params, doNotRepaint) {
            var t = _splitType(typeId);
            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    var idx = this._jsPlumb.types.indexOf(t[i]);
                    if (idx != -1) {
                        _removeTypeCssHelper(this, idx);
                        this._jsPlumb.types.splice(idx, 1);
                    }
                    else
                        this._jsPlumb.types.push(t[i]);
                }

                _applyTypes(this, params, doNotRepaint);
            }
        },
        applyType: function (t, doNotRepaint) {
            this.setPaintStyle(t.paintStyle, doNotRepaint);
            this.setHoverPaintStyle(t.hoverPaintStyle, doNotRepaint);
            if (t.parameters) {
                for (var i in t.parameters)
                    this.setParameter(i, t.parameters[i]);
            }
            this._jsPlumb.paintStyleInUse = this.getPaintStyle();
        },
        setPaintStyle: function (style, doNotRepaint) {
//		    	this._jsPlumb.paintStyle = jsPlumb.extend({}, style);
// TODO figure out if we want components to clone paintStyle so as not to share it.
            this._jsPlumb.paintStyle = style;
            this._jsPlumb.paintStyleInUse = this._jsPlumb.paintStyle;
            _updateHoverStyle(this);
            if (!doNotRepaint) this.repaint();
        },
        getPaintStyle: function () {
            return this._jsPlumb.paintStyle;
        },
        setHoverPaintStyle: function (style, doNotRepaint) {
            //this._jsPlumb.hoverPaintStyle = jsPlumb.extend({}, style);
// TODO figure out if we want components to clone paintStyle so as not to share it.		    	
            this._jsPlumb.hoverPaintStyle = style;
            _updateHoverStyle(this);
            if (!doNotRepaint) this.repaint();
        },
        getHoverPaintStyle: function () {
            return this._jsPlumb.hoverPaintStyle;
        },
        destroy: function (force) {
            if (force || this.typeId == null) {
                this.cleanupListeners(); // this is on EventGenerator
                this.clone = null;
                this._jsPlumb = null;
            }
        },

        isHover: function () {
            return this._jsPlumb.hover;
        },

        setHover: function (hover, ignoreAttachedElements, timestamp) {
            // while dragging, we ignore these events.  this keeps the UI from flashing and
            // swishing and whatevering.
            if (this._jsPlumb && !this._jsPlumb.instance.currentlyDragging && !this._jsPlumb.instance.isHoverSuspended()) {

                this._jsPlumb.hover = hover;

                if (this.canvas != null) {
                    if (this._jsPlumb.instance.hoverClass != null) {
                        var method = hover ? "addClass" : "removeClass";
                        this._jsPlumb.instance[method](this.canvas, this._jsPlumb.instance.hoverClass);
                    }
                    if (this._jsPlumb.hoverClass != null) {
                        this._jsPlumb.instance[method](this.canvas, this._jsPlumb.hoverClass);
                    }
                }
                if (this._jsPlumb.hoverPaintStyle != null) {
                    this._jsPlumb.paintStyleInUse = hover ? this._jsPlumb.hoverPaintStyle : this._jsPlumb.paintStyle;
                    if (!this._jsPlumb.instance.isSuspendDrawing()) {
                        timestamp = timestamp || _timestamp();
                        this.repaint({timestamp: timestamp, recalc: false});
                    }
                }
                // get the list of other affected elements, if supported by this component.
                // for a connection, its the endpoints.  for an endpoint, its the connections! surprise.
                if (this.getAttachedElements && !ignoreAttachedElements)
                    _updateAttachedElements(this, hover, _timestamp(), this);
            }
        }
    });

// ------------------------------ END jsPlumbUIComponent --------------------------------------------

    var _jsPlumbInstanceIndex = 0,
        getInstanceIndex = function () {
            var i = _jsPlumbInstanceIndex + 1;
            _jsPlumbInstanceIndex++;
            return i;
        };

    var jsPlumbInstance = window.jsPlumbInstance = function (_defaults) {

        this.Defaults = {
            Anchor: "Bottom",
            Anchors: [ null, null ],
            ConnectionsDetachable: true,
            ConnectionOverlays: [ ],
            Connector: "Bezier",
            Container: null,
            DoNotThrowErrors: false,
            DragOptions: { },
            DropOptions: { },
            Endpoint: "Dot",
            EndpointOverlays: [ ],
            Endpoints: [ null, null ],
            EndpointStyle: { fillStyle: "#456" },
            EndpointStyles: [ null, null ],
            EndpointHoverStyle: null,
            EndpointHoverStyles: [ null, null ],
            HoverPaintStyle: null,
            LabelStyle: { color: "black" },
            LogEnabled: false,
            Overlays: [ ],
            MaxConnections: 1,
            PaintStyle: { lineWidth: 4, strokeStyle: "#456" },
            ReattachConnections: false,
            RenderMode: "svg",
            Scope: "jsPlumb_DefaultScope"
        };
        if (_defaults) jsPlumb.extend(this.Defaults, _defaults);

        this.logEnabled = this.Defaults.LogEnabled;
        this._connectionTypes = {};
        this._endpointTypes = {};

        jsPlumbUtil.EventGenerator.apply(this);

        var _currentInstance = this,
            _instanceIndex = getInstanceIndex(),
            _bb = _currentInstance.bind,
            _initialDefaults = {},
            _zoom = 1,
            _info = function (el) {
                if (el == null) return null;
                else if (el.nodeType == 3 || el.nodeType == 8) {
                    return { el:el, text:true };
                }
                else {
                    var _el = _currentInstance.getElement(el);
                    return { el: _el, id: (jsPlumbUtil.isString(el) && _el == null) ? el : _getId(_el) };
                }
            };

        this.getInstanceIndex = function () {
            return _instanceIndex;
        };

        this.setZoom = function (z, repaintEverything) {
            _zoom = z;
            _currentInstance.fire("zoom", _zoom);
            if (repaintEverything) _currentInstance.repaintEverything();
            return true;
        };
        this.getZoom = function () {
            return _zoom;
        };

        for (var i in this.Defaults)
            _initialDefaults[i] = this.Defaults[i];

        var _container, _containerDelegations = [];
        this.unbindContainer = function() {
            if (_container != null && _containerDelegations.length > 0) {
                for (var i = 0; i < _containerDelegations.length; i++) {
                    _currentInstance.off(_container, _containerDelegations[i][0], _containerDelegations[i][1]);
                }
            }
        };
        this.setContainer = function (c) {

            this.unbindContainer();

            // get container as dom element.
            c = this.getElement(c);
            // move existing connections and endpoints, if any.
            this.select().each(function (conn) {
                conn.moveParent(c);
            });
            this.selectEndpoints().each(function (ep) {
                ep.moveParent(c);
            });

            // set container.
            var previousContainer = _container;
            _container = c;
            _containerDelegations.length = 0;

            var _oneDelegateHandler = function (id, e) {
                var t = e.srcElement || e.target,
                    jp = (t && t.parentNode ? t.parentNode._jsPlumb : null) || (t ? t._jsPlumb : null) || (t && t.parentNode && t.parentNode.parentNode ? t.parentNode.parentNode._jsPlumb : null);
                if (jp) {
                    jp.fire(id, jp, e);
                    // jsplumb also fires every event coming from components/overlays. That's what the test for `jp.component` is for.
                    _currentInstance.fire(id, jp.component || jp, e);
                }
            };

            var _addOneDelegate = function(eventId, selector, fn) {
                _containerDelegations.push([eventId, fn]);
                _currentInstance.on(_container, eventId, selector, fn);
            };

            // delegate one event on the container to jsplumb elements. it might be possible to
            // abstract this out: each of endpoint, connection and overlay could register themselves with
            // jsplumb as "component types" or whatever, and provide a suitable selector. this would be
            // done by the renderer (although admittedly from 2.0 onwards we're not supporting vml anymore)
            var _oneDelegate = function (id) {
                // connections.
                //_addOneDelegate(id, ".jsplumb-connector, .jsplumb-connector > *", function (e) {
                _addOneDelegate(id, ".jsplumb-connector > *", function (e) {
                    _oneDelegateHandler(id, e);
                });
                // endpoints. note they can have an enclosing div, or not.
                _addOneDelegate(id, ".jsplumb-endpoint, .jsplumb-endpoint > *, .jsplumb-endpoint svg *", function (e) {
                    _oneDelegateHandler(id, e);
                });
                // overlays
                _addOneDelegate(id, ".jsplumb-overlay, .jsplumb-overlay *", function (e) {
                    _oneDelegateHandler(id, e);
                });
            };

            for (var i = 0; i < events.length; i++)
                _oneDelegate(events[i]);

            // managed elements
            for (var elId in managedElements) {
                var el = managedElements[elId].el;
                if (el.parentNode === previousContainer) {
                    previousContainer.removeChild(el);
                    _container.appendChild(el);
                }
            }

        };
        this.getContainer = function () {
            return _container;
        };

        this.bind = function (event, fn) {
            if ("ready" === event && initialized) fn();
            else _bb.apply(_currentInstance, [event, fn]);
        };

        _currentInstance.importDefaults = function (d) {
            for (var i in d) {
                _currentInstance.Defaults[i] = d[i];
            }
            if (d.Container)
                _currentInstance.setContainer(d.Container);

            return _currentInstance;
        };

        _currentInstance.restoreDefaults = function () {
            _currentInstance.Defaults = jsPlumb.extend({}, _initialDefaults);
            return _currentInstance;
        };

        var log = null,
            initialized = false,
        // TODO remove from window scope
            connections = [],
        // map of element id -> endpoint lists. an element can have an arbitrary
        // number of endpoints on it, and not all of them have to be connected
        // to anything.
            endpointsByElement = {},
            endpointsByUUID = {},
            managedElements = {},
            offsets = {},
            offsetTimestamps = {},
            draggableStates = {},
            connectionBeingDragged = false,
            sizes = [],
            _suspendDrawing = false,
            _suspendedAt = null,
            DEFAULT_SCOPE = this.Defaults.Scope,
            renderMode = null,  // will be set in init()
            _curIdStamp = 1,
            _idstamp = function () {
                return "" + _curIdStamp++;
            },

        //
        // appends an element to some other element, which is calculated as follows:
        //
        // 1. if Container exists, use that element.
        // 2. if the 'parent' parameter exists, use that.
        // 3. otherwise just use the root element.
        //
        //
            _appendElement = function (el, parent) {
                if (_container)
                    _container.appendChild(el);
                else if (!parent)
                    this.appendToRoot(el);
                else
                    this.getElement(parent).appendChild(el);
            }.bind(this),

        //
        // Draws an endpoint and its connections. this is the main entry point into drawing connections as well
        // as endpoints, since jsPlumb is endpoint-centric under the hood.
        //
        // @param element element to draw (of type library specific element object)
        // @param ui UI object from current library's event system. optional.
        // @param timestamp timestamp for this paint cycle. used to speed things up a little by cutting down the amount of offset calculations we do.
        // @param clearEdits defaults to false; indicates that mouse edits for connectors should be cleared
        ///
            _draw = function (element, ui, timestamp, clearEdits) {

                // TODO is it correct to filter by headless at this top level? how would a headless adapter ever repaint?
                // NO. it is not correct.
                if (!jsPlumb.headless && !_suspendDrawing) {
                    var id = _getId(element),
                        repaintEls = _currentInstance.getDragManager().getElementsForDraggable(id);

                    if (timestamp == null) timestamp = _timestamp();

                    // update the offset of everything _before_ we try to draw anything.
                    var o = _updateOffset({ elId: id, offset: ui, recalc: false, timestamp: timestamp });

                    if (repaintEls) {
                        for (var i in repaintEls) {
                            _updateOffset({
                                elId: repaintEls[i].id,
                                offset: {
                                    left: o.o.left + repaintEls[i].offset.left,
                                    top: o.o.top + repaintEls[i].offset.top
                                },
                                recalc: false,
                                timestamp: timestamp
                            });
                        }
                    }

                    _currentInstance.anchorManager.redraw(id, ui, timestamp, null, clearEdits);

                    if (repaintEls) {
                        for (var j in repaintEls) {
                            _currentInstance.anchorManager.redraw(repaintEls[j].id, ui, timestamp, repaintEls[j].offset, clearEdits, true);
                        }
                    }
                }
            },

        //
        // gets an Endpoint by uuid.
        //
            _getEndpoint = function (uuid) {
                return endpointsByUUID[uuid];
            },

            /**
             * inits a draggable if it's not already initialised.
             * TODO: somehow abstract this to the adapter, because the concept of "draggable" has no
             * place on the server.
             */
            _initDraggableIfNecessary = function (element, isDraggable, dragOptions, id) {
                // move to DragManager?
                if (!jsPlumb.headless) {
                    var _draggable = isDraggable == null ? false : isDraggable;
                    if (_draggable) {
                        if (jsPlumb.isDragSupported(element, _currentInstance)) {
                            var options = dragOptions || _currentInstance.Defaults.DragOptions;
                            options = jsPlumb.extend({}, options); // make a copy.
                            if (!jsPlumb.isAlreadyDraggable(element, _currentInstance)) {
                                var dragEvent = jsPlumb.dragEvents.drag,
                                    stopEvent = jsPlumb.dragEvents.stop,
                                    startEvent = jsPlumb.dragEvents.start,
                                    _del = _currentInstance.getElement(element),
                                    _ancestor = _currentInstance.getDragManager().getDragAncestor(_del),
                                    _noOffset = {left: 0, top: 0},
                                    _ancestorOffset = _noOffset,
                                    _started = false;

                                _manage(id, element);

                                options[startEvent] = _ju.wrap(options[startEvent], function () {
                                    _ancestorOffset = _ancestor != null ? _currentInstance.getOffset(_ancestor) : _noOffset;
                                    _currentInstance.setHoverSuspended(true);
                                    _currentInstance.select({source: element}).addClass(_currentInstance.elementDraggingClass + " " + _currentInstance.sourceElementDraggingClass, true);
                                    _currentInstance.select({target: element}).addClass(_currentInstance.elementDraggingClass + " " + _currentInstance.targetElementDraggingClass, true);
                                    _currentInstance.setConnectionBeingDragged(true);
                                    if (options.canDrag) return dragOptions.canDrag();
                                }, false);

                                options[dragEvent] = _ju.wrap(options[dragEvent], function () {
                                    // TODO: here we could actually use getDragObject, and then compute it ourselves,
                                    // since every adapter does the same thing. but i'm not sure why YUI's getDragObject
                                    // differs from getUIPosition so much
                                    var ui = _currentInstance.getUIPosition(arguments, _currentInstance.getZoom());
                                    // adjust by ancestor offset if there is one: this is for the case that a draggable
                                    // is contained inside some other element that is not the Container.
                                    ui.left += _ancestorOffset.left;
                                    ui.top += _ancestorOffset.top;
                                    _draw(element, ui, null, true);
                                    if (_started) _currentInstance.addClass(element, "jsplumb-dragged");
                                    _started = true;
                                });
                                options[stopEvent] = _ju.wrap(options[stopEvent], function () {
                                    var elements = arguments[0].selection;
                                    var uip = _currentInstance.getUIPosition(arguments);

                                    // this is one element
                                    var _one = function (_e) {
                                        _draw(_e[0], uip);
                                        _currentInstance.removeClass(_e[0], "jsplumb-dragged");
                                        _currentInstance.select({source: _e[0]}).removeClass(_currentInstance.elementDraggingClass + " " + _currentInstance.sourceElementDraggingClass, true);
                                        _currentInstance.select({target: _e[0]}).removeClass(_currentInstance.elementDraggingClass + " " + _currentInstance.targetElementDraggingClass, true);
                                        _currentInstance.getDragManager().dragEnded(_e[0]);
                                    };

                                    for (var i = 0; i < elements.length; i++)
                                        _one(elements[i]);

                                    // this is common across all
                                    _started = false;
                                    _currentInstance.setHoverSuspended(false);
                                    _currentInstance.setConnectionBeingDragged(false);
                                });
                                var elId = _getId(element); // need ID
                                draggableStates[elId] = true;
                                var draggable = draggableStates[elId];
                                options.disabled = draggable == null ? false : !draggable;
                                _currentInstance.initDraggable(element, options);
                                _currentInstance.getDragManager().register(element);
                            }
                            else {
                                // already draggable. attach any start, drag or stop listeners to the current Drag.
                                if (dragOptions.force) {
                                    _currentInstance.initDraggable(element, options);
                                }
                            }
                        }
                    }
                }
            },

            _scopeMatch = function (e1, e2) {
                var s1 = e1.scope.split(/\s/), s2 = e2.scope.split(/\s/);
                for (var i = 0; i < s1.length; i++)
                    for (var j = 0; j < s2.length; j++)
                        if (s2[j] == s1[i]) return true;

                return false;
            },

        /*
         * prepares a final params object that can be passed to _newConnection, taking into account defaults, events, etc.
         */
            _prepareConnectionParams = function (params, referenceParams) {
                var _p = jsPlumb.extend({ }, params);
                if (referenceParams) jsPlumb.extend(_p, referenceParams);

                // hotwire endpoints passed as source or target to sourceEndpoint/targetEndpoint, respectively.
                if (_p.source) {
                    if (_p.source.endpoint)
                        _p.sourceEndpoint = _p.source;
                    else
                        _p.source = _currentInstance.getElement(_p.source);
                }
                if (_p.target) {
                    if (_p.target.endpoint)
                        _p.targetEndpoint = _p.target;
                    else
                        _p.target = _currentInstance.getElement(_p.target);
                }

                // test for endpoint uuids to connect
                if (params.uuids) {
                    _p.sourceEndpoint = _getEndpoint(params.uuids[0]);
                    _p.targetEndpoint = _getEndpoint(params.uuids[1]);
                }

                // now ensure that if we do have Endpoints already, they're not full.
                // source:
                if (_p.sourceEndpoint && _p.sourceEndpoint.isFull()) {
                    _ju.log(_currentInstance, "could not add connection; source endpoint is full");
                    return;
                }

                // target:
                if (_p.targetEndpoint && _p.targetEndpoint.isFull()) {
                    _ju.log(_currentInstance, "could not add connection; target endpoint is full");
                    return;
                }

                // if source endpoint mandates connection type and nothing specified in our params, use it.
                if (!_p.type && _p.sourceEndpoint)
                    _p.type = _p.sourceEndpoint.connectionType;

                // copy in any connectorOverlays that were specified on the source endpoint.
                // it doesnt copy target endpoint overlays.  i'm not sure if we want it to or not.
                if (_p.sourceEndpoint && _p.sourceEndpoint.connectorOverlays) {
                    _p.overlays = _p.overlays || [];
                    for (var i = 0, j = _p.sourceEndpoint.connectorOverlays.length; i < j; i++) {
                        _p.overlays.push(_p.sourceEndpoint.connectorOverlays[i]);
                    }
                }

                // pointer events
                if (!_p["pointer-events"] && _p.sourceEndpoint && _p.sourceEndpoint.connectorPointerEvents)
                    _p["pointer-events"] = _p.sourceEndpoint.connectorPointerEvents;

                var _mergeOverrides = function (def, values) {
                    var m = jsPlumb.extend({}, def);
                    for (var i in values) {
                        if (values[i]) m[i] = values[i];
                    }
                    return m;
                };

                var _addEndpoint = function (el, def, idx) {
                    return _currentInstance.addEndpoint(el, _mergeOverrides(def, {
                        anchor: _p.anchors ? _p.anchors[idx] : _p.anchor,
                        endpoint: _p.endpoints ? _p.endpoints[idx] : _p.endpoint,
                        paintStyle: _p.endpointStyles ? _p.endpointStyles[idx] : _p.endpointStyle,
                        hoverPaintStyle: _p.endpointHoverStyles ? _p.endpointHoverStyles[idx] : _p.endpointHoverStyle
                    }));
                };

                // check for makeSource/makeTarget specs.

                var _oneElementDef = function (type, idx, defs, matchType) {
                    if (_p[type] && !_p[type].endpoint && !_p[type + "Endpoint"] && !_p.newConnection) {
                        var tid = _getId(_p[type]), tep = defs[tid];

                        tep = tep ? tep[matchType] : null;

                        if (tep) {
                            // if not enabled, return.
                            if (!tep.enabled) return false;
                            var newEndpoint = tep.endpoint != null && tep.endpoint._jsPlumb ? tep.endpoint : _addEndpoint(_p[type], tep.def, idx);
                            if (newEndpoint.isFull()) return false;
                            _p[type + "Endpoint"] = newEndpoint;
                            newEndpoint._doNotDeleteOnDetach = false; // reset.
                            newEndpoint._deleteOnDetach = true;
                            if (tep.uniqueEndpoint) {
                                if (!tep.endpoint) {
                                    tep.endpoint = newEndpoint;
                                    newEndpoint._deleteOnDetach = false;
                                    newEndpoint._doNotDeleteOnDetach = true;
                                }
                                else
                                    newEndpoint.finalEndpoint = tep.endpoint;
                            }
                        }
                    }
                };

                if (_oneElementDef("source", 0, this.sourceEndpointDefinitions, _p.type || "default") === false) return;
                if (_oneElementDef("target", 1, this.targetEndpointDefinitions, _p.type || "default") === false) return;

                // last, ensure scopes match
                if (_p.sourceEndpoint && _p.targetEndpoint)
                    if (!_scopeMatch(_p.sourceEndpoint, _p.targetEndpoint)) _p = null;

                return _p;
            }.bind(_currentInstance),

            _newConnection = function (params) {
                var connectionFunc = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType();

                params._jsPlumb = _currentInstance;
                params.newConnection = _newConnection;
                params.newEndpoint = _newEndpoint;
                params.endpointsByUUID = endpointsByUUID;
                params.endpointsByElement = endpointsByElement;
                params.finaliseConnection = _finaliseConnection;
                params.id = "con_" + _idstamp();
                var con = new connectionFunc(params);

                // if the connection is draggable, then maybe we need to tell the target endpoint to init the
                // dragging code. it won't run again if it already configured to be draggable.
                if (con.isDetachable()) {
                    con.endpoints[0].initDraggable("_jsPlumbSource");
                    con.endpoints[1].initDraggable("_jsPlumbTarget");
                }

                return con;
            },

        //
        // adds the connection to the backing model, fires an event if necessary and then redraws
        //
            _finaliseConnection = _currentInstance.finaliseConnection = function (jpc, params, originalEvent, doInformAnchorManager) {
                params = params || {};
                // add to list of connections (by scope).
                if (!jpc.suspendedEndpoint)
                    connections.push(jpc);

                jpc.pending = null;

                // turn off isTemporarySource on the source endpoint (only viable on first draw)
                jpc.endpoints[0].isTemporarySource = false;

                // always inform the anchor manager
                // except that if jpc has a suspended endpoint it's not true to say the
                // connection is new; it has just (possibly) moved. the question is whether
                // to make that call here or in the anchor manager.  i think perhaps here.
                if (doInformAnchorManager !== false)
                    _currentInstance.anchorManager.newConnection(jpc);

                // force a paint
                _draw(jpc.source);

                // fire an event
                if (!params.doNotFireConnectionEvent && params.fireEvent !== false) {

                    var eventArgs = {
                        connection: jpc,
                        source: jpc.source, target: jpc.target,
                        sourceId: jpc.sourceId, targetId: jpc.targetId,
                        sourceEndpoint: jpc.endpoints[0], targetEndpoint: jpc.endpoints[1]
                    };

                    _currentInstance.fire("connection", eventArgs, originalEvent);
                }
            },

        /*
         factory method to prepare a new endpoint.  this should always be used instead of creating Endpoints
         manually, since this method attaches event listeners and an id.
         */
            _newEndpoint = function (params, id) {
                var endpointFunc = _currentInstance.Defaults.EndpointType || jsPlumb.Endpoint;
                var _p = jsPlumb.extend({}, params);
                _p._jsPlumb = _currentInstance;
                _p.newConnection = _newConnection;
                _p.newEndpoint = _newEndpoint;
                _p.endpointsByUUID = endpointsByUUID;
                _p.endpointsByElement = endpointsByElement;
                _p.fireDetachEvent = fireDetachEvent;
                _p.elementId = id || _getId(_p.source);
                var ep = new endpointFunc(_p);
                ep.id = "ep_" + _idstamp();
                _manage(_p.elementId, _p.source);

                if (!jsPlumb.headless)
                    _currentInstance.getDragManager().endpointAdded(_p.source, id);

                return ep;
            },

        /*
         * performs the given function operation on all the connections found
         * for the given element id; this means we find all the endpoints for
         * the given element, and then for each endpoint find the connectors
         * connected to it. then we pass each connection in to the given
         * function.
         */
            _operation = function (elId, func, endpointFunc) {
                var endpoints = endpointsByElement[elId];
                if (endpoints && endpoints.length) {
                    for (var i = 0, ii = endpoints.length; i < ii; i++) {
                        for (var j = 0, jj = endpoints[i].connections.length; j < jj; j++) {
                            var retVal = func(endpoints[i].connections[j]);
                            // if the function passed in returns true, we exit.
                            // most functions return false.
                            if (retVal) return;
                        }
                        if (endpointFunc) endpointFunc(endpoints[i]);
                    }
                }
            },

            _setDraggable = function (element, draggable) {
                return jsPlumb.each(element, function (el) {
                    if (_currentInstance.isDragSupported(el)) {
                        draggableStates[_currentInstance.getAttribute(el, "id")] = draggable;
                        _currentInstance.setElementDraggable(el, draggable);
                    }
                });
            },
        /*
         * private method to do the business of hiding/showing.
         *
         * @param el
         *            either Id of the element in question or a library specific
         *            object for the element.
         * @param state
         *            String specifying a value for the css 'display' property
         *            ('block' or 'none').
         */
            _setVisible = function (el, state, alsoChangeEndpoints) {
                state = state === "block";
                var endpointFunc = null;
                if (alsoChangeEndpoints) {
                    if (state) endpointFunc = function (ep) {
                        ep.setVisible(true, true, true);
                    };
                    else endpointFunc = function (ep) {
                        ep.setVisible(false, true, true);
                    };
                }
                var info = _info(el);
                _operation(info.id, function (jpc) {
                    if (state && alsoChangeEndpoints) {
                        // this test is necessary because this functionality is new, and i wanted to maintain backwards compatibility.
                        // this block will only set a connection to be visible if the other endpoint in the connection is also visible.
                        var oidx = jpc.sourceId === info.id ? 1 : 0;
                        if (jpc.endpoints[oidx].isVisible()) jpc.setVisible(true);
                    }
                    else  // the default behaviour for show, and what always happens for hide, is to just set the visibility without getting clever.
                        jpc.setVisible(state);
                }, endpointFunc);
            },
        /*
         * toggles the draggable state of the given element(s).
         * el is either an id, or an element object, or a list of ids/element objects.
         */
            _toggleDraggable = function (el) {
                return jsPlumb.each(el, function (el) {
                    var elId = _currentInstance.getAttribute(el, "id");
                    var state = draggableStates[elId] == null ? false : draggableStates[elId];
                    state = !state;
                    draggableStates[elId] = state;
                    _currentInstance.setDraggable(el, state);
                    return state;
                }.bind(this));
            },
            /**
             * private method to do the business of toggling hiding/showing.
             */
            _toggleVisible = function (elId, changeEndpoints) {
                var endpointFunc = null;
                if (changeEndpoints) {
                    endpointFunc = function (ep) {
                        var state = ep.isVisible();
                        ep.setVisible(!state);
                    };
                }
                _operation(elId, function (jpc) {
                    var state = jpc.isVisible();
                    jpc.setVisible(!state);
                }, endpointFunc);
            },

        // TODO comparison performance
            _getCachedData = function (elId) {
                var o = offsets[elId];
                if (!o)
                    return _updateOffset({elId: elId});
                else
                    return {o: o, s: sizes[elId]};
            },

            /**
             * gets an id for the given element, creating and setting one if
             * necessary.  the id is of the form
             *
             *    jsPlumb_<instance index>_<index in instance>
             *
             * where "index in instance" is a monotonically increasing integer that starts at 0,
             * for each instance.  this method is used not only to assign ids to elements that do not
             * have them but also to connections and endpoints.
             */
            _getId = function (element, uuid, doNotCreateIfNotFound) {
                if (jsPlumbUtil.isString(element)) return element;
                if (element == null) return null;
                var id = _currentInstance.getAttribute(element, "id");
                if (!id || id === "undefined") {
                    // check if fixed uuid parameter is given
                    if (arguments.length == 2 && arguments[1] !== undefined)
                        id = uuid;
                    else if (arguments.length == 1 || (arguments.length == 3 && !arguments[2]))
                        id = "jsPlumb_" + _instanceIndex + "_" + _idstamp();

                    if (!doNotCreateIfNotFound) _currentInstance.setAttribute(element, "id", id);
                }
                return id;
            };

        this.setConnectionBeingDragged = function (v) {
            connectionBeingDragged = v;
        };
        this.isConnectionBeingDragged = function () {
            return connectionBeingDragged;
        };

        /**
         * Returns a map of all the elements this jsPlumbInstance is currently managing.
         * @returns {Object} Map of [id-> {el, endpoint[], connection, position}] information.
         */
        this.getManagedElements = function() {
            return managedElements;
        };

        this.getRenderMode = function() { return "svg"; };

        this.connectorClass = "jsplumb-connector";
        this.connectorOutlineClass = "jsplumb-connector-outline";
        this.connectedClass = "jsplumb-connected";
        this.hoverClass = "jsplumb-hover";
        this.endpointClass = "jsplumb-endpoint";
        this.endpointConnectedClass = "jsplumb-endpoint-connected";
        this.endpointFullClass = "jsplumb-endpoint-full";
        this.endpointDropAllowedClass = "jsplumb-endpoint-drop-allowed";
        this.endpointDropForbiddenClass = "jsplumb-endpoint-drop-forbidden";
        this.overlayClass = "jsplumb-overlay";
        this.draggingClass = "jsplumb-dragging";
        this.elementDraggingClass = "jsplumb-element-dragging";
        this.sourceElementDraggingClass = "jsplumb-source-element-dragging";
        this.targetElementDraggingClass = "jsplumb-target-element-dragging";
        this.endpointAnchorClassPrefix = "jsplumb-endpoint-anchor";
        this.hoverSourceClass = "jsplumb-source-hover";
        this.hoverTargetClass = "jsplumb-target-hover";
        this.dragSelectClass = "jsplumb-drag-select";

        this.Anchors = {};
        this.Connectors = {  "svg": {} };
        this.Endpoints = { "svg": {} };
        this.Overlays = { "svg": {} } ;
        this.ConnectorRenderers = {};
        this.SVG = "svg";

// --------------------------- jsPlumbInstance public API ---------------------------------------------------------


        this.addEndpoint = function (el, params, referenceParams) {
            referenceParams = referenceParams || {};
            var p = jsPlumb.extend({}, referenceParams);
            jsPlumb.extend(p, params);
            p.endpoint = p.endpoint || _currentInstance.Defaults.Endpoint;
            p.paintStyle = p.paintStyle || _currentInstance.Defaults.EndpointStyle;

            var results = [],
                inputs = (_ju.isArray(el) || (el.length != null && !_ju.isString(el))) ? el : [ el ];

            for (var i = 0, j = inputs.length; i < j; i++) {
                p.source = _currentInstance.getElement(inputs[i]);
                _ensureContainer(p.source);

                var id = _getId(p.source), e = _newEndpoint(p, id);

                // SP new. here we have introduced a class-wide element manager, which is responsible
                // for getting object dimensions and width/height, and for updating these values only
                // when necessary (after a drag, or on a forced refresh call).
                var myOffset = _manage(id, p.source).info.o;
                _ju.addToList(endpointsByElement, id, e);

                if (!_suspendDrawing) {
                    e.paint({
                        anchorLoc: e.anchor.compute({ xy: [ myOffset.left, myOffset.top ], wh: sizes[id], element: e, timestamp: _suspendedAt }),
                        timestamp: _suspendedAt
                    });
                }

                results.push(e);
                e._doNotDeleteOnDetach = true; // mark this as being added via addEndpoint.
            }

            return results.length == 1 ? results[0] : results;
        };

        this.addEndpoints = function (el, endpoints, referenceParams) {
            var results = [];
            for (var i = 0, j = endpoints.length; i < j; i++) {
                var e = _currentInstance.addEndpoint(el, endpoints[i], referenceParams);
                if (_ju.isArray(e))
                    Array.prototype.push.apply(results, e);
                else results.push(e);
            }
            return results;
        };

        this.animate = function (el, properties, options) {
            if (!this.animationSupported) return false;

            options = options || {};
            var del = _currentInstance.getElement(el),
                id = _getId(del),
                stepFunction = jsPlumb.animEvents.step,
                completeFunction = jsPlumb.animEvents.complete;

            options[stepFunction] = _ju.wrap(options[stepFunction], function () {
                _currentInstance.revalidate(id);
            });

            // onComplete repaints, just to make sure everything looks good at the end of the animation.
            options[completeFunction] = _ju.wrap(options[completeFunction], function () {
                _currentInstance.revalidate(id);
            });

            _currentInstance.doAnimate(del, properties, options);
        };

        /**
         * checks for a listener for the given condition, executing it if found, passing in the given value.
         * condition listeners would have been attached using "bind" (which is, you could argue, now overloaded, since
         * firing click events etc is a bit different to what this does).  i thought about adding a "bindCondition"
         * or something, but decided against it, for the sake of simplicity. jsPlumb will never fire one of these
         * condition events anyway.
         */
        this.checkCondition = function (conditionName, args) {
            var l = _currentInstance.getListener(conditionName),
                r = true;

            if (l && l.length > 0) {
                var values = Array.prototype.slice.call(arguments, 1);
                try {
                    for (var i = 0, j = l.length; i < j; i++) {
                        r = r && l[i].apply(l[i], values);
                    }
                }
                catch (e) {
                    _ju.log(_currentInstance, "cannot check condition [" + conditionName + "]" + e);
                }
            }
            return r;
        };

        this.connect = function (params, referenceParams) {
            // prepare a final set of parameters to create connection with
            var _p = _prepareConnectionParams(params, referenceParams), jpc;
            // TODO probably a nicer return value if the connection was not made.  _prepareConnectionParams
            // will return null (and log something) if either endpoint was full.  what would be nicer is to
            // create a dedicated 'error' object.
            if (_p) {
                if (_p.source == null && _p.sourceEndpoint == null) {
                    jsPlumbUtil.log("Cannot establish connection - source does not exist");
                    return;
                }
                if (_p.target == null && _p.targetEndpoint == null) {
                    jsPlumbUtil.log("Cannot establish connection - target does not exist");
                    return;
                }
                _ensureContainer(_p.source);
                // create the connection.  it is not yet registered
                jpc = _newConnection(_p);
                // now add it the model, fire an event, and redraw
                _finaliseConnection(jpc, _p);
            }
            return jpc;
        };

        var stTypes = [
            { el: "source", elId: "sourceId", epDefs: "sourceEndpointDefinitions" },
            { el: "target", elId: "targetId", epDefs: "targetEndpointDefinitions" }
        ];

        var _set = function (c, el, idx, doNotRepaint) {
            var ep, _st = stTypes[idx], cId = c[_st.elId], cEl = c[_st.el], sid, sep,
                oldEndpoint = c.endpoints[idx];

            var evtParams = {
                index: idx,
                originalSourceId: idx === 0 ? cId : c.sourceId,
                newSourceId: c.sourceId,
                originalTargetId: idx == 1 ? cId : c.targetId,
                newTargetId: c.targetId,
                connection: c
            };

            if (el.constructor == jsPlumb.Endpoint) { // TODO here match the current endpoint class; users can change it {
                ep = el;
                ep.addConnection(c);
            }
            else {
                sid = _getId(el);
                sep = this[_st.epDefs][sid];

                if (sid === c[_st.elId])
                    ep = null;  // dont change source/target if the element is already the one given.
                else if (sep) {
                    for (var t in sep) {
                        if (!sep[t].enabled) return;
                        ep = sep[t].endpoint != null && sep[t].endpoint._jsPlumb ? sep[t].endpoint : this.addEndpoint(el, sep[t].def);
                        if (sep[t].uniqueEndpoint) sep[t].endpoint = ep;
                        ep._doNotDeleteOnDetach = false;
                        ep._deleteOnDetach = true;
                        ep.addConnection(c);
                    }
                }
                else {
                    ep = c.makeEndpoint(idx === 0, el, sid);
                    ep._doNotDeleteOnDetach = false;
                    ep._deleteOnDetach = true;
                }
            }

            if (ep != null) {
                oldEndpoint.detachFromConnection(c);
                c.endpoints[idx] = ep;
                c[_st.el] = ep.element;
                c[_st.elId] = ep.elementId;
                evtParams[idx === 0 ? "newSourceId" : "newTargetId"] = ep.elementId;

                fireMoveEvent(evtParams);

                if (!doNotRepaint)
                    c.repaint();
            }

            return evtParams;

        }.bind(this);

        this.setSource = function (connection, el, doNotRepaint) {
            var p = _set(connection, el, 0, doNotRepaint);
            this.anchorManager.sourceChanged(p.originalSourceId, p.newSourceId, connection);
        };
        this.setTarget = function (connection, el, doNotRepaint) {
            var p = _set(connection, el, 1, doNotRepaint);
            this.anchorManager.updateOtherEndpoint(p.originalSourceId, p.originalTargetId, p.newTargetId, connection);
        };

        this.deleteEndpoint = function (object, dontUpdateHover) {
            var endpoint = (typeof object === "string") ? endpointsByUUID[object] : object;
            if (endpoint) {
                _currentInstance.deleteObject({ endpoint: endpoint, dontUpdateHover: dontUpdateHover });
            }
            return _currentInstance;
        };

        this.deleteEveryEndpoint = function () {
            var _is = _currentInstance.setSuspendDrawing(true);
            for (var id in endpointsByElement) {
                var endpoints = endpointsByElement[id];
                if (endpoints && endpoints.length) {
                    for (var i = 0, j = endpoints.length; i < j; i++) {
                        _currentInstance.deleteEndpoint(endpoints[i], true);
                    }
                }
            }
            endpointsByElement = {};
            // SP new
            managedElements = {};
            endpointsByUUID = {};
            offsets = {};
            offsetTimestamps = {};
            _currentInstance.anchorManager.reset();
            _currentInstance.getDragManager().reset();
            if (!_is) _currentInstance.setSuspendDrawing(false);
            return _currentInstance;
        };

        var fireDetachEvent = function (jpc, doFireEvent, originalEvent) {
            // may have been given a connection, or in special cases, an object
            var connType = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType(),
                argIsConnection = jpc.constructor == connType,
                params = argIsConnection ? {
                    connection: jpc,
                    source: jpc.source, target: jpc.target,
                    sourceId: jpc.sourceId, targetId: jpc.targetId,
                    sourceEndpoint: jpc.endpoints[0], targetEndpoint: jpc.endpoints[1]
                } : jpc;

            if (doFireEvent)
                _currentInstance.fire("connectionDetached", params, originalEvent);

            _currentInstance.anchorManager.connectionDetached(params);
        };

        var fireMoveEvent = _currentInstance.fireMoveEvent = function (params, evt) {
            _currentInstance.fire("connectionMoved", params, evt);
        };

        this.unregisterEndpoint = function (endpoint) {
            //if (endpoint._jsPlumb == null) return;
            if (endpoint._jsPlumb.uuid) endpointsByUUID[endpoint._jsPlumb.uuid] = null;
            _currentInstance.anchorManager.deleteEndpoint(endpoint);
            // TODO at least replace this with a removeWithFunction call.
            for (var e in endpointsByElement) {
                var endpoints = endpointsByElement[e];
                if (endpoints) {
                    var newEndpoints = [];
                    for (var i = 0, j = endpoints.length; i < j; i++)
                        if (endpoints[i] != endpoint) newEndpoints.push(endpoints[i]);

                    endpointsByElement[e] = newEndpoints;
                }
                if (endpointsByElement[e].length < 1) {
                    delete endpointsByElement[e];
                }
            }
        };

        this.detach = function () {

            if (arguments.length === 0) return;
            var connType = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType(),
                firstArgIsConnection = arguments[0].constructor == connType,
                params = arguments.length == 2 ? firstArgIsConnection ? (arguments[1] || {}) : arguments[0] : arguments[0],
                fireEvent = (params.fireEvent !== false),
                forceDetach = params.forceDetach,
                conn = firstArgIsConnection ? arguments[0] : params.connection;

            if (conn) {
                if (forceDetach || jsPlumbUtil.functionChain(true, false, [
                    [ conn.endpoints[0], "isDetachAllowed", [ conn ] ],
                    [ conn.endpoints[1], "isDetachAllowed", [ conn ] ],
                    [ conn, "isDetachAllowed", [ conn ] ],
                    [ _currentInstance, "checkCondition", [ "beforeDetach", conn ] ]
                ])) {

                    conn.endpoints[0].detach(conn, false, true, fireEvent);
                }
            }
            else {
                var _p = jsPlumb.extend({}, params); // a backwards compatibility hack: source should be thought of as 'params' in this case.
                // test for endpoint uuids to detach
                if (_p.uuids) {
                    _getEndpoint(_p.uuids[0]).detachFrom(_getEndpoint(_p.uuids[1]), fireEvent);
                } else if (_p.sourceEndpoint && _p.targetEndpoint) {
                    _p.sourceEndpoint.detachFrom(_p.targetEndpoint);
                } else {
                    var sourceId = _getId(_currentInstance.getElement(_p.source)),
                        targetId = _getId(_currentInstance.getElement(_p.target));
                    _operation(sourceId, function (jpc) {
                        if ((jpc.sourceId == sourceId && jpc.targetId == targetId) || (jpc.targetId == sourceId && jpc.sourceId == targetId)) {
                            if (_currentInstance.checkCondition("beforeDetach", jpc)) {
                                jpc.endpoints[0].detach(jpc, false, true, fireEvent);
                            }
                        }
                    });
                }
            }
        };

        this.detachAllConnections = function (el, params) {
            params = params || {};
            el = _currentInstance.getElement(el);
            var id = _getId(el),
                endpoints = endpointsByElement[id];
            if (endpoints && endpoints.length) {
                for (var i = 0, j = endpoints.length; i < j; i++) {
                    endpoints[i].detachAll(params.fireEvent !== false, params.forceDetach);
                }
            }
            return _currentInstance;
        };

        this.detachEveryConnection = function (params) {
            params = params || {};
            _currentInstance.batch(function () {
                for (var id in endpointsByElement) {
                    var endpoints = endpointsByElement[id];
                    if (endpoints && endpoints.length) {
                        for (var i = 0, j = endpoints.length; i < j; i++) {
                            endpoints[i].detachAll(params.fireEvent !== false, params.forceDetach);
                        }
                    }
                }
                connections.length = 0;
            });
            return _currentInstance;
        };

        /// not public.  but of course its exposed. how to change this.
        this.deleteObject = function (params) {
            var result = {
                    endpoints: {},
                    connections: {},
                    endpointCount: 0,
                    connectionCount: 0
                },
                fireEvent = params.fireEvent !== false,
                deleteAttachedObjects = params.deleteAttachedObjects !== false;

            var unravelConnection = function (connection) {
                if (connection != null && result.connections[connection.id] == null) {
                    if (!params.dontUpdateHover && connection._jsPlumb != null) connection.setHover(false);
                    result.connections[connection.id] = connection;
                    result.connectionCount++;
                    if (deleteAttachedObjects) {
                        for (var j = 0; j < connection.endpoints.length; j++) {
                            if (connection.endpoints[j]._deleteOnDetach)
                                unravelEndpoint(connection.endpoints[j]);
                        }
                    }
                }
            };
            var unravelEndpoint = function (endpoint) {
                if (endpoint != null && result.endpoints[endpoint.id] == null) {
                    if (!params.dontUpdateHover && endpoint._jsPlumb != null) endpoint.setHover(false);
                    result.endpoints[endpoint.id] = endpoint;
                    result.endpointCount++;

                    if (deleteAttachedObjects) {
                        for (var i = 0; i < endpoint.connections.length; i++) {
                            var c = endpoint.connections[i];
                            unravelConnection(c);
                        }
                    }
                }
            };

            if (params.connection)
                unravelConnection(params.connection);
            else unravelEndpoint(params.endpoint);

            // loop through connections
            for (var i in result.connections) {
                var c = result.connections[i];
                if (c._jsPlumb) {
                    jsPlumbUtil.removeWithFunction(connections, function (_c) {
                        return c.id == _c.id;
                    });

                    fireDetachEvent(c, params.fireEvent === false ? false : !c.pending, params.originalEvent);

                    c.endpoints[0].detachFromConnection(c);
                    c.endpoints[1].detachFromConnection(c);
                    c.cleanup(true);
                    c.destroy(true);
                }
            }

            // loop through endpoints
            for (var j in result.endpoints) {
                var e = result.endpoints[j];
                if (e._jsPlumb) {
                    _currentInstance.unregisterEndpoint(e);
                    // FIRE some endpoint deleted event?
                    e.cleanup(true);
                    e.destroy(true);
                }
            }

            return result;
        };

        this.draggable = function (el, options) {
            var info;
            _each(function(_el) {
                 info = _info(_el);
                if (info.el) _initDraggableIfNecessary(info.el, true, options, info.id);
            }, el);
            return _currentInstance;
        };

        this.droppable = function(el, options) {
            var info;
            options = options || {};
            options.allowLoopback = false;
            _each(function(_el) {
                info = _info(_el);
                if (info.el) _currentInstance.initDroppable(info.el, options);
            }, el);
            return _currentInstance;
        };

        // helpers for select/selectEndpoints
        var _setOperation = function (list, func, args, selector) {
                for (var i = 0, j = list.length; i < j; i++) {
                    list[i][func].apply(list[i], args);
                }
                return selector(list);
            },
            _getOperation = function (list, func, args) {
                var out = [];
                for (var i = 0, j = list.length; i < j; i++) {
                    out.push([ list[i][func].apply(list[i], args), list[i] ]);
                }
                return out;
            },
            setter = function (list, func, selector) {
                return function () {
                    return _setOperation(list, func, arguments, selector);
                };
            },
            getter = function (list, func) {
                return function () {
                    return _getOperation(list, func, arguments);
                };
            },
            prepareList = function (input, doNotGetIds) {
                var r = [];
                if (input) {
                    if (typeof input == 'string') {
                        if (input === "*") return input;
                        r.push(input);
                    }
                    else {
                        if (doNotGetIds) r = input;
                        else {
                            if (input.length) {
                                for (var i = 0, j = input.length; i < j; i++)
                                    r.push(_info(input[i]).id);
                            }
                            else
                                r.push(_info(input).id);
                        }
                    }
                }
                return r;
            },
            filterList = function (list, value, missingIsFalse) {
                if (list === "*") return true;
                return list.length > 0 ? list.indexOf(value) != -1 : !missingIsFalse;
            };

        // get some connections, specifying source/target/scope
        this.getConnections = function (options, flat) {
            if (!options) {
                options = {};
            } else if (options.constructor == String) {
                options = { "scope": options };
            }
            var scope = options.scope || _currentInstance.getDefaultScope(),
                scopes = prepareList(scope, true),
                sources = prepareList(options.source),
                targets = prepareList(options.target),
                results = (!flat && scopes.length > 1) ? {} : [],
                _addOne = function (scope, obj) {
                    if (!flat && scopes.length > 1) {
                        var ss = results[scope];
                        if (ss == null) {
                            ss = results[scope] = [];
                        }
                        ss.push(obj);
                    } else results.push(obj);
                };

            for (var j = 0, jj = connections.length; j < jj; j++) {
                var c = connections[j];
                if (filterList(scopes, c.scope) && filterList(sources, c.sourceId) && filterList(targets, c.targetId))
                    _addOne(c.scope, c);
            }

            return results;
        };

        var _curryEach = function (list, executor) {
                return function (f) {
                    for (var i = 0, ii = list.length; i < ii; i++) {
                        f(list[i]);
                    }
                    return executor(list);
                };
            },
            _curryGet = function (list) {
                return function (idx) {
                    return list[idx];
                };
            };

        var _makeCommonSelectHandler = function (list, executor) {
            var out = {
                    length: list.length,
                    each: _curryEach(list, executor),
                    get: _curryGet(list)
                },
                setters = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay",
                    "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle",
                    "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible",
                    "repaint", "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind" ],

                getters = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle",
                    "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents" ],
                i, ii;

            for (i = 0, ii = setters.length; i < ii; i++)
                out[setters[i]] = setter(list, setters[i], executor);

            for (i = 0, ii = getters.length; i < ii; i++)
                out[getters[i]] = getter(list, getters[i]);

            return out;
        };

        var _makeConnectionSelectHandler = function (list) {
            var common = _makeCommonSelectHandler(list, _makeConnectionSelectHandler);
            return jsPlumb.extend(common, {
                // setters
                setDetachable: setter(list, "setDetachable", _makeConnectionSelectHandler),
                setReattach: setter(list, "setReattach", _makeConnectionSelectHandler),
                setConnector: setter(list, "setConnector", _makeConnectionSelectHandler),
                detach: function () {
                    for (var i = 0, ii = list.length; i < ii; i++)
                        _currentInstance.detach(list[i]);
                },
                // getters
                isDetachable: getter(list, "isDetachable"),
                isReattach: getter(list, "isReattach")
            });
        };

        var _makeEndpointSelectHandler = function (list) {
            var common = _makeCommonSelectHandler(list, _makeEndpointSelectHandler);
            return jsPlumb.extend(common, {
                setEnabled: setter(list, "setEnabled", _makeEndpointSelectHandler),
                setAnchor: setter(list, "setAnchor", _makeEndpointSelectHandler),
                isEnabled: getter(list, "isEnabled"),
                detachAll: function () {
                    for (var i = 0, ii = list.length; i < ii; i++)
                        list[i].detachAll();
                },
                "remove": function () {
                    for (var i = 0, ii = list.length; i < ii; i++)
                        _currentInstance.deleteObject({endpoint: list[i]});
                }
            });
        };

        this.select = function (params) {
            params = params || {};
            params.scope = params.scope || "*";
            return _makeConnectionSelectHandler(params.connections || _currentInstance.getConnections(params, true));
        };

        this.selectEndpoints = function (params) {
            params = params || {};
            params.scope = params.scope || "*";
            var noElementFilters = !params.element && !params.source && !params.target,
                elements = noElementFilters ? "*" : prepareList(params.element),
                sources = noElementFilters ? "*" : prepareList(params.source),
                targets = noElementFilters ? "*" : prepareList(params.target),
                scopes = prepareList(params.scope, true);

            var ep = [];

            for (var el in endpointsByElement) {
                var either = filterList(elements, el, true),
                    source = filterList(sources, el, true),
                    sourceMatchExact = sources != "*",
                    target = filterList(targets, el, true),
                    targetMatchExact = targets != "*";

                // if they requested 'either' then just match scope. otherwise if they requested 'source' (not as a wildcard) then we have to match only endpoints that have isSource set to to true, and the same thing with isTarget.
                if (either || source || target) {
                    inner:
                        for (var i = 0, ii = endpointsByElement[el].length; i < ii; i++) {
                            var _ep = endpointsByElement[el][i];
                            if (filterList(scopes, _ep.scope, true)) {

                                var noMatchSource = (sourceMatchExact && sources.length > 0 && !_ep.isSource),
                                    noMatchTarget = (targetMatchExact && targets.length > 0 && !_ep.isTarget);

                                if (noMatchSource || noMatchTarget)
                                    continue inner;

                                ep.push(_ep);
                            }
                        }
                }
            }

            return _makeEndpointSelectHandler(ep);
        };

        // get all connections managed by the instance of jsplumb.
        this.getAllConnections = function () {
            return connections;
        };
        this.getDefaultScope = function () {
            return DEFAULT_SCOPE;
        };
        // get an endpoint by uuid.
        this.getEndpoint = _getEndpoint;
        // get endpoints for some element.
        this.getEndpoints = function (el) {
            return endpointsByElement[_info(el).id];
        };
        // gets the default endpoint type. used when subclassing. see wiki.
        this.getDefaultEndpointType = function () {
            return jsPlumb.Endpoint;
        };
        // gets the default connection type. used when subclassing.  see wiki.
        this.getDefaultConnectionType = function () {
            return jsPlumb.Connection;
        };
        /*
         * Gets an element's id, creating one if necessary. really only exposed
         * for the lib-specific functionality to access; would be better to pass
         * the current instance into the lib-specific code (even though this is
         * a static call. i just don't want to expose it to the public API).
         */
        this.getId = _getId;

        this.appendElement = _appendElement;

        var _hoverSuspended = false;
        this.isHoverSuspended = function () {
            return _hoverSuspended;
        };
        this.setHoverSuspended = function (s) {
            _hoverSuspended = s;
        };

        // set an element's connections to be hidden
        this.hide = function (el, changeEndpoints) {
            _setVisible(el, "none", changeEndpoints);
            return _currentInstance;
        };

        // exposed for other objects to use to get a unique id.
        this.idstamp = _idstamp;

        this.connectorsInitialized = false;
        this.registerConnectorType = function (connector, name) {
            connectorTypes.push([connector, name]);
        };

        // ensure that, if the current container exists, it is a DOM element and not a selector.
        // if it does not exist and `candidate` is supplied, the offset parent of that element will be set as the Container.
        // this is used to do a better default behaviour for the case that the user has not set a container:
        // addEndpoint, makeSource, makeTarget and connect all call this method with the offsetParent of the
        // element in question (for connect it is the source element). So if no container is set, it is inferred
        // to be the offsetParent of the first element the user tries to connect.
        var _ensureContainer = function (candidate) {
            if (!_container && candidate) {
                var can = _currentInstance.getElement(candidate);
                if (can.offsetParent) _currentInstance.setContainer(can.offsetParent);
            }
        };

        var _getContainerFromDefaults = function () {
            if (_currentInstance.Defaults.Container)
                _currentInstance.setContainer(_currentInstance.Defaults.Container);
        };

        // check if a given element is managed or not. if not, add to our map. if drawing is not suspended then
        // we'll also stash its dimensions; otherwise we'll do this in a lazy way through updateOffset.
        var _manage = _currentInstance.manage = function (id, element, transient) {
            if (!managedElements[id]) {
                managedElements[id] = {
                    el: element,
                    endpoints: [],
                    connections: []
                };

                managedElements[id].info = _updateOffset({ elId: id, timestamp: _suspendedAt });
                if (!transient) {
                    _currentInstance.fire("manageElement", { id:id, info:managedElements[id].info, el:element });
                }
            }

            return managedElements[id];
        };

        var _unmanage = function(id) {
            if (managedElements[id]) {
                delete managedElements[id];
                _currentInstance.fire("unmanageElement", id);
            }
        };

        /**
         * updates the offset and size for a given element, and stores the
         * values. if 'offset' is not null we use that (it would have been
         * passed in from a drag call) because it's faster; but if it is null,
         * or if 'recalc' is true in order to force a recalculation, we get the current values.
         */
        var _updateOffset = this.updateOffset = function (params) {

            var timestamp = params.timestamp, recalc = params.recalc, offset = params.offset, elId = params.elId, s;
            if (_suspendDrawing && !timestamp) timestamp = _suspendedAt;
            if (!recalc) {
                if (timestamp && timestamp === offsetTimestamps[elId]) {
                    return {o: params.offset || offsets[elId], s: sizes[elId]};
                }
            }
            if (recalc || (!offset && offsets[elId] == null)) { // if forced repaint or no offset available, we recalculate.

                // get the current size and offset, and store them
                s = managedElements[elId] ? managedElements[elId].el : null;
                if (s != null) {
                    sizes[elId] = _currentInstance.getSize(s);
                    offsets[elId] = _currentInstance.getOffset(s);
                    offsetTimestamps[elId] = timestamp;
                }
            } else {
                offsets[elId] = offset || offsets[elId];
                if (sizes[elId] == null) {
                    s = managedElements[elId].el;
                    if (s != null) sizes[elId] = _currentInstance.getSize(s);
                }
                offsetTimestamps[elId] = timestamp;
            }

            if (offsets[elId] && !offsets[elId].right) {
                offsets[elId].right = offsets[elId].left + sizes[elId][0];
                offsets[elId].bottom = offsets[elId].top + sizes[elId][1];
                offsets[elId].width = sizes[elId][0];
                offsets[elId].height = sizes[elId][1];
                offsets[elId].centerx = offsets[elId].left + (offsets[elId].width / 2);
                offsets[elId].centery = offsets[elId].top + (offsets[elId].height / 2);
            }

            return {o: offsets[elId], s: sizes[elId]};
        };

        /**
         * callback from the current library to tell us to prepare ourselves (attach
         * mouse listeners etc; can't do that until the library has provided a bind method)
         */
        this.init = function () {
            rendererTypes = jsPlumb.getRenderModes();

            var _oneType = function (renderer, name, fn) {
                jsPlumb.Connectors[renderer][name] = function () {
                    fn.apply(this, arguments);
                    jsPlumb.ConnectorRenderers[renderer].apply(this, arguments);
                };
                jsPlumbUtil.extend(jsPlumb.Connectors[renderer][name], [ fn, jsPlumb.ConnectorRenderers[renderer]]);
            };

            if (!jsPlumb.connectorsInitialized) {
                for (var i = 0; i < connectorTypes.length; i++) {
                    for (var j = 0; j < rendererTypes.length; j++) {
                        _oneType(rendererTypes[j], connectorTypes[i][1], connectorTypes[i][0]);
                    }

                }
                jsPlumb.connectorsInitialized = true;
            }

            if (!initialized) {
                _getContainerFromDefaults();
                _currentInstance.anchorManager = new jsPlumb.AnchorManager({jsPlumbInstance: _currentInstance});
                initialized = true;
                _currentInstance.fire("ready", _currentInstance);
            }
        }.bind(this);

        this.log = log;
        this.jsPlumbUIComponent = jsPlumbUIComponent;

        /*
         * Creates an anchor with the given params.
         *
         *
         * Returns: The newly created Anchor.
         * Throws: an error if a named anchor was not found.
         */
        this.makeAnchor = function () {
            var pp, _a = function (t, p) {
                if (jsPlumb.Anchors[t]) return new jsPlumb.Anchors[t](p);
                if (!_currentInstance.Defaults.DoNotThrowErrors)
                    throw { msg: "jsPlumb: unknown anchor type '" + t + "'" };
            };
            if (arguments.length === 0) return null;
            var specimen = arguments[0], elementId = arguments[1], jsPlumbInstance = arguments[2], newAnchor = null;
            // if it appears to be an anchor already...
            if (specimen.compute && specimen.getOrientation) return specimen;  //TODO hazy here about whether it should be added or is already added somehow.
            // is it the name of an anchor type?
            else if (typeof specimen == "string") {
                newAnchor = _a(arguments[0], {elementId: elementId, jsPlumbInstance: _currentInstance});
            }
            // is it an array? it will be one of:
            // 		an array of [spec, params] - this defines a single anchor, which may be dynamic, but has parameters.
            //		an array of arrays - this defines some dynamic anchors
            //		an array of numbers - this defines a single anchor.
            else if (_ju.isArray(specimen)) {
                if (_ju.isArray(specimen[0]) || _ju.isString(specimen[0])) {
                    // if [spec, params] format
                    if (specimen.length == 2 && _ju.isObject(specimen[1])) {
                        // if first arg is a string, its a named anchor with params
                        if (_ju.isString(specimen[0])) {
                            pp = jsPlumb.extend({elementId: elementId, jsPlumbInstance: _currentInstance}, specimen[1]);
                            newAnchor = _a(specimen[0], pp);
                        }
                        // otherwise first arg is array, second is params. we treat as a dynamic anchor, which is fine
                        // even if the first arg has only one entry. you could argue all anchors should be implicitly dynamic in fact.
                        else {
                            pp = jsPlumb.extend({elementId: elementId, jsPlumbInstance: _currentInstance, anchors: specimen[0]}, specimen[1]);
                            newAnchor = new jsPlumb.DynamicAnchor(pp);
                        }
                    }
                    else
                        newAnchor = new jsPlumb.DynamicAnchor({anchors: specimen, selector: null, elementId: elementId, jsPlumbInstance: _currentInstance});

                }
                else {
                    var anchorParams = {
                        x: specimen[0], y: specimen[1],
                        orientation: (specimen.length >= 4) ? [ specimen[2], specimen[3] ] : [0, 0],
                        offsets: (specimen.length >= 6) ? [ specimen[4], specimen[5] ] : [ 0, 0 ],
                        elementId: elementId,
                        jsPlumbInstance: _currentInstance,
                        cssClass: specimen.length == 7 ? specimen[6] : null
                    };
                    newAnchor = new jsPlumb.Anchor(anchorParams);
                    newAnchor.clone = function () {
                        return new jsPlumb.Anchor(anchorParams);
                    };
                }
            }

            if (!newAnchor.id) newAnchor.id = "anchor_" + _idstamp();
            return newAnchor;
        };

        /**
         * makes a list of anchors from the given list of types or coords, eg
         * ["TopCenter", "RightMiddle", "BottomCenter", [0, 1, -1, -1] ]
         */
        this.makeAnchors = function (types, elementId, jsPlumbInstance) {
            var r = [];
            for (var i = 0, ii = types.length; i < ii; i++) {
                if (typeof types[i] == "string")
                    r.push(jsPlumb.Anchors[types[i]]({elementId: elementId, jsPlumbInstance: jsPlumbInstance}));
                else if (_ju.isArray(types[i]))
                    r.push(_currentInstance.makeAnchor(types[i], elementId, jsPlumbInstance));
            }
            return r;
        };

        /**
         * Makes a dynamic anchor from the given list of anchors (which may be in shorthand notation as strings or dimension arrays, or Anchor
         * objects themselves) and the given, optional, anchorSelector function (jsPlumb uses a default if this is not provided; most people will
         * not need to provide this - i think).
         */
        this.makeDynamicAnchor = function (anchors, anchorSelector) {
            return new jsPlumb.DynamicAnchor({anchors: anchors, selector: anchorSelector, elementId: null, jsPlumbInstance: _currentInstance});
        };

// --------------------- makeSource/makeTarget ---------------------------------------------- 

        this.targetEndpointDefinitions = {};
        var _setEndpointPaintStylesAndAnchor = function (ep, epIndex, _instance) {
           /* ep.paintStyle = ep.paintStyle ||
                _instance.Defaults.EndpointStyles[epIndex] ||
                _instance.Defaults.EndpointStyle;

            ep.hoverPaintStyle = ep.hoverPaintStyle ||
                _instance.Defaults.EndpointHoverStyles[epIndex] ||
                _instance.Defaults.EndpointHoverStyle;

            ep.anchor = ep.anchor ||
                _instance.Defaults.Anchors[epIndex] ||
                _instance.Defaults.Anchor;

            ep.endpoint = ep.endpoint ||
                _instance.Defaults.Endpoints[epIndex] ||
                _instance.Defaults.Endpoint;*/
        };

        // TODO put all the source stuff inside one parent, keyed by id.
        this.sourceEndpointDefinitions = {};

        var selectorFilter = function (evt, _el, selector, _instance, negate) {
            var t = evt.target || evt.srcElement, ok = false,
                sel = _instance.getSelector(_el, selector);
            for (var j = 0; j < sel.length; j++) {
                if (sel[j] == t) {
                    ok = true;
                    break;
                }
            }
            return negate ? !ok : ok;
        };

        // SP target source refactor
        var _makeElementDropHandler = function (elInfo, p, dropOptions, isSource, isTarget) {
            var proxyComponent = new jsPlumbUIComponent(p);
            var _drop = p._jsPlumb.EndpointDropHandler({
                jsPlumb: _currentInstance,
                enabled: function () {
                    return elInfo.def.enabled;
                },
                isFull: function () {
                    var targetCount = _currentInstance.select({target: elInfo.id}).length;
                    return elInfo.def.maxConnections > 0 && targetCount >= elInfo.def.maxConnections;
                },
                element: elInfo.el,
                elementId: elInfo.id,
                isSource: isSource,
                isTarget: isTarget,
                addClass: function (clazz) {
                    _currentInstance.addClass(elInfo.el, clazz);
                },
                removeClass: function (clazz) {
                    _currentInstance.removeClass(elInfo.el, clazz);
                },
                onDrop: function (jpc) {
                    var source = jpc.endpoints[0];
                    source.anchor.locked = false;
                },
                isDropAllowed: function () {
                    return proxyComponent.isDropAllowed.apply(proxyComponent, arguments);
                },
                isRedrop:function(jpc) {
                    return (jpc.suspendedElement != null && jpc.suspendedEndpoint != null && jpc.suspendedEndpoint.element === elInfo.el);
                },
                getEndpoint: function (jpc) {

                    // make a new Endpoint for the target, or get it from the cache if uniqueEndpoint
                    // is set. if its a redrop the new endpoint will be immediately cleaned up.

                    var newEndpoint = elInfo.def.endpoint;

                    // if no cached endpoint, or there was one but it has been cleaned up
                    // (ie. detached), create a new one
                    if (newEndpoint == null || newEndpoint._jsPlumb == null) {
                        var eps = _currentInstance.deriveEndpointAndAnchorSpec(jpc.getType().join(" "), true);
                        var pp = eps.endpoints ? jsPlumb.extend(p, {
                            endpoint:elInfo.def.def.endpoint || eps.endpoints[1]
                        }) :p;
                        if (eps.anchors) {
                            pp = jsPlumb.extend(pp, {
                                anchor:elInfo.def.def.anchor || eps.anchors[1]
                            });
                        }
                        newEndpoint = _currentInstance.addEndpoint(elInfo.el, pp);
                        newEndpoint._mtNew = true;
                    }

                    if (p.uniqueEndpoint) elInfo.def.endpoint = newEndpoint;  // may of course just store what it just pulled out. that's ok.
                    // TODO test options to makeTarget to see if we should do this?
                    newEndpoint._doNotDeleteOnDetach = false; // reset.
                    newEndpoint._deleteOnDetach = true;

                    // if connection is detachable, init the new endpoint to be draggable, to support that happening.
                    if (jpc.isDetachable())
                        newEndpoint.initDraggable();

                    // if the anchor has a 'positionFinder' set, then delegate to that function to find
                    // out where to locate the anchor.
                    if (newEndpoint.anchor.positionFinder != null) {
                        var dropPosition = _currentInstance.getUIPosition(arguments, _currentInstance.getZoom()),
                            elPosition = _currentInstance.getOffset(elInfo.el),
                            elSize = _currentInstance.getSize(elInfo.el),
                            ap = newEndpoint.anchor.positionFinder(dropPosition, elPosition, elSize, newEndpoint.anchor.constructorParams);

                        newEndpoint.anchor.x = ap[0];
                        newEndpoint.anchor.y = ap[1];
                        // now figure an orientation for it..kind of hard to know what to do actually. probably the best thing i can do is to
                        // support specifying an orientation in the anchor's spec. if one is not supplied then i will make the orientation
                        // be what will cause the most natural link to the source: it will be pointing at the source, but it needs to be
                        // specified in one axis only, and so how to make that choice? i think i will use whichever axis is the one in which
                        // the target is furthest away from the source.
                    }

                    return newEndpoint;
                },
                maybeCleanup: function (ep) {
                    if (ep._mtNew && ep.connections.length === 0) {
                        _currentInstance.deleteObject({endpoint: ep});
                    }
                    else
                        delete ep._mtNew;
                }
            });

            // wrap drop events as needed and initialise droppable
            var dropEvent = jsPlumb.dragEvents.drop;
            dropOptions.scope = dropOptions.scope || (p.scope || _currentInstance.Defaults.Scope);
            dropOptions[dropEvent] = _ju.wrap(dropOptions[dropEvent], _drop, true);

            // if target, return true from the over event. this will cause katavorio to stop setting drops to hover
            // if multipleDrop is set to false.
            if (isTarget) {
                dropOptions[jsPlumb.dragEvents.over] = function () { return true; };
            }

            // vanilla jsplumb only
            if (p.allowLoopback === false) {
                dropOptions.canDrop = function (_drag) {
                    var de = _drag.getDragElement()._jsPlumbRelatedElement;
                    return de != elInfo.el;
                };
            }
            _currentInstance.initDroppable(elInfo.el, dropOptions, "internal");

            return _drop;

        };

        // see API docs
        this.makeTarget = function (el, params, referenceParams) {

            // put jsplumb ref into params without altering the params passed in
            var p = jsPlumb.extend({_jsPlumb: this}, referenceParams);
            jsPlumb.extend(p, params);

            // calculate appropriate paint styles and anchor from the params given
            _setEndpointPaintStylesAndAnchor(p, 1, this);

            var deleteEndpointsOnDetach = !(p.deleteEndpointsOnDetach === false),
                maxConnections = p.maxConnections || -1,

                _doOne = function (el) {

                    // get the element's id and store the endpoint definition for it.  jsPlumb.connect calls will look for one of these,
                    // and use the endpoint definition if found.
                    // decode the info for this element (id and element)
                    var elInfo = _info(el),
                        elid = elInfo.id,
                        dropOptions = jsPlumb.extend({}, p.dropOptions || {}),
                        type = "default";

                    this.targetEndpointDefinitions[elid] = this.targetEndpointDefinitions[elid] || {};

                    _ensureContainer(elid);

                    // store the definition
                    var _def = {
                        def: jsPlumb.extend({}, p),
                        uniqueEndpoint: p.uniqueEndpoint,
                        maxConnections: maxConnections,
                        enabled: true
                    };
                    elInfo.def = _def;
                    this.targetEndpointDefinitions[elid][type] = _def;
                    _makeElementDropHandler(elInfo, p, dropOptions, p.isSource === true, true);

                }.bind(this);

            // make an array if only given one element
            var inputs = el.length && el.constructor != String ? el : [ el ];

            // register each one in the list.
            for (var i = 0, ii = inputs.length; i < ii; i++) {
                _doOne(inputs[i]);
            }

            return this;
        };

        // see api docs
        this.unmakeTarget = function (el, doNotClearArrays) {
            var info = _info(el);
            jsPlumb.destroyDroppable(info.el);
            if (!doNotClearArrays) {
                delete this.targetEndpointDefinitions[info.id];
            }

            return this;
        };

        // see api docs
        this.makeSource = function (el, params, referenceParams) {
            var p = jsPlumb.extend({_jsPlumb: this}, referenceParams);
            jsPlumb.extend(p, params);
            var type = p.connectionType || "default";
            var aae = _currentInstance.deriveEndpointAndAnchorSpec(type);
            p.endpoint = p.endpoint || aae.endpoints[0];
            p.anchor = p.anchor || aae.anchors[0];
            _setEndpointPaintStylesAndAnchor(p, 0, this);
            var maxConnections = p.maxConnections || -1,
                onMaxConnections = p.onMaxConnections,
                _doOne = function (elInfo) {
                    // get the element's id and store the endpoint definition for it.  jsPlumb.connect calls will look for one of these,
                    // and use the endpoint definition if found.
                    var elid = elInfo.id,
                        _del = this.getElement(elInfo.el);

                    this.sourceEndpointDefinitions[elid] = this.sourceEndpointDefinitions[elid] || {};
                    _ensureContainer(elid);

                    var _def = {
                        def:jsPlumb.extend({}, p),
                        uniqueEndpoint: p.uniqueEndpoint,
                        maxConnections: maxConnections,
                        enabled: true
                    };


                    this.sourceEndpointDefinitions[elid][type] = _def;
                    elInfo.def = _def;

                    var stopEvent = jsPlumb.dragEvents.stop,
                        dragEvent = jsPlumb.dragEvents.drag,
                        dragOptions = jsPlumb.extend({ }, p.dragOptions || {}),
                        existingDrag = dragOptions.drag,
                        existingStop = dragOptions.stop,
                        ep = null,
                        endpointAddedButNoDragYet = false;

                    // set scope if its not set in dragOptions but was passed in in params
                    dragOptions.scope = dragOptions.scope || p.scope;

                    dragOptions[dragEvent] = _ju.wrap(dragOptions[dragEvent], function () {
                        if (existingDrag) existingDrag.apply(this, arguments);
                        endpointAddedButNoDragYet = false;
                    });

                    dragOptions[stopEvent] = _ju.wrap(dragOptions[stopEvent], function () {

                        if (existingStop) existingStop.apply(this, arguments);
                        this.currentlyDragging = false;
                        if (ep._jsPlumb != null) { // if not cleaned up...

                            // reset the anchor to the anchor that was initially provided. the one we were using to drag
                            // the connection was just a placeholder that was located at the place the user pressed the
                            // mouse button to initiate the drag.
                            var anchorDef = p.anchor || this.Defaults.Anchor,
                                oldAnchor = ep.anchor,
                                oldConnection = ep.connections[0];

                            // if the connection has a type, try to get an anchor spec for it.
                            /*if (oldConnection != null) {
                                var aae = _currentInstance.deriveEndpointAndAnchorSpec(oldConnection.getType().join(" "), false);
                                if (aae.anchors) anchorDef = aae.anchor[0];
                                if (aae.endpoints) ep.setEndpoint(aae.endpoints[0]);
                            }*/

                            var    newAnchor = this.makeAnchor(anchorDef, elid, this),
                                _el = ep.element;

                            // if the anchor has a 'positionFinder' set, then delegate to that function to find
                            // out where to locate the anchor. issue 117.
                            if (newAnchor.positionFinder != null) {
                                var elPosition = _currentInstance.getOffset(_el),
                                    elSize = this.getSize(_el),
                                    dropPosition = { left: elPosition.left + (oldAnchor.x * elSize[0]), top: elPosition.top + (oldAnchor.y * elSize[1]) },
                                    ap = newAnchor.positionFinder(dropPosition, elPosition, elSize, newAnchor.constructorParams);

                                newAnchor.x = ap[0];
                                newAnchor.y = ap[1];
                            }

                            ep.setAnchor(newAnchor, true);
                            ep.repaint();
                            this.repaint(ep.elementId);
                            if (oldConnection != null) this.repaint(oldConnection.targetId);
                        }
                    }.bind(this));

                    // when the user presses the mouse, add an Endpoint, if we are enabled.
                    var mouseDownListener = function (e) {
                        // on right mouse button, abort.
                        if (e.which === 3 || e.button === 2) return;

                        // TODO store def on element.
                        var def = this.sourceEndpointDefinitions[elid][type];

                        // if disabled, return.
                        if (!def.enabled) return;

                        elid = this.getId(this.getElement(elInfo.el)); // elid might have changed since this method was called to configure the element.

                        // if a filter was given, run it, and return if it says no.
                        if (p.filter) {
                            var r = jsPlumbUtil.isString(p.filter) ? selectorFilter(e, elInfo.el, p.filter, this, p.filterExclude) : p.filter(e, elInfo.el);
                            if (r === false) return;
                        }

                        // if maxConnections reached
                        var sourceCount = this.select({source: elid}).length;
                        if (def.maxConnections >= 0 && (sourceCount >= def.maxConnections)) {
                            if (onMaxConnections) {
                                onMaxConnections({
                                    element: elInfo.el,
                                    maxConnections: maxConnections
                                }, e);
                            }
                            return false;
                        }

                        // find the position on the element at which the mouse was pressed; this is where the endpoint
                        // will be located.
                        var elxy = jsPlumb.getPositionOnElement(e, _del, _zoom);

                        // we need to override the anchor in here, and force 'isSource', but we don't want to mess with
                        // the params passed in, because after a connection is established we're going to reset the endpoint
                        // to have the anchor we were given.
                        var tempEndpointParams = {};
                        jsPlumb.extend(tempEndpointParams, p);
                        tempEndpointParams.isTemporarySource = true;
                        tempEndpointParams.anchor = [ elxy[0], elxy[1] , 0, 0];
                        tempEndpointParams.dragOptions = dragOptions;

                        if (def.def.scope) tempEndpointParams.scope = def.def.scope;

                        ep = this.addEndpoint(elid, tempEndpointParams);
                        endpointAddedButNoDragYet = true;
                        ep._doNotDeleteOnDetach = false; // reset.
                        ep._deleteOnDetach = true;

                        // if unique endpoint and it's already been created, push it onto the endpoint we create. at the end
                        // of a successful connection we'll switch to that endpoint.
                        // TODO this is the same code as the programmatic endpoints create on line 1050 ish
                        if (def.uniqueEndpoint) {
                            if (!def.endpoint) {
                                def.endpoint = ep;
                                ep._deleteOnDetach = false;
                                ep._doNotDeleteOnDetach = true;
                            }
                            else
                                ep.finalEndpoint = def.endpoint;
                        }

                        var _delTempEndpoint = function () {
                            // this mouseup event is fired only if no dragging occurred, by jquery and yui, but for mootools
                            // it is fired even if dragging has occurred, in which case we would blow away a perfectly
                            // legitimate endpoint, were it not for this check.  the flag is set after adding an
                            // endpoint and cleared in a drag listener we set in the dragOptions above.
                            _currentInstance.off(ep.canvas, "mouseup", _delTempEndpoint);
                            _currentInstance.off(elInfo.el, "mouseup", _delTempEndpoint);
                            if (endpointAddedButNoDragYet) {
                                endpointAddedButNoDragYet = false;
                                _currentInstance.deleteEndpoint(ep);
                            }
                        };

                        _currentInstance.on(ep.canvas, "mouseup", _delTempEndpoint);
                        _currentInstance.on(elInfo.el, "mouseup", _delTempEndpoint);

                        // optionally check for attributes to extract from the source element
                        var payload = {};
                        if (def.def.extract) {
                            for (var att in def.def.extract) {
                                var v = e.srcElement.getAttribute(att);
                                if (v) {
                                    payload[def.def.extract[att]] = v;
                                }
                            }
                        }

                        // and then trigger its mousedown event, which will kick off a drag, which will start dragging
                        // a new connection from this endpoint.
                        _currentInstance.trigger(ep.canvas, "mousedown", e, payload);

                        jsPlumbUtil.consume(e);

                    }.bind(this);

                    this.on(elInfo.el, "mousedown", mouseDownListener);
                    _def.trigger = mouseDownListener;

                    // if a filter was provided, set it as a dragFilter on the element,
                    // to prevent the element drag function from kicking in when we want to
                    // drag a new connection
                    if (p.filter && (jsPlumbUtil.isString(p.filter) || jsPlumbUtil.isFunction(p.filter))) {
                        _currentInstance.setDragFilter(elInfo.el, p.filter);
                    }

                    var dropOptions = jsPlumb.extend({}, p.dropOptions || {});

                    _makeElementDropHandler(elInfo, p, dropOptions, true, p.isTarget === true);

                }.bind(this);

            var inputs = el.length && el.constructor != String ? el : [ el ];
            for (var i = 0, ii = inputs.length; i < ii; i++) {
                _doOne(_info(inputs[i]));
            }

            return this;
        };

        // see api docs
        this.unmakeSource = function (el, connectionType, doNotClearArrays) {
            var info = _info(el);
            var eldefs = this.sourceEndpointDefinitions[info.id];
            if (eldefs) {
                for (var def in eldefs) {
                    if (connectionType == null || connectionType === def) {
                        var mouseDownListener = eldefs[def].trigger;
                        if (mouseDownListener)
                            _currentInstance.off(info.el, "mousedown", mouseDownListener);
                        if (!doNotClearArrays) {
                            delete this.sourceEndpointDefinitions[info.id][def];
                        }
                    }
                }
            }

            return this;
        };

        // see api docs
        this.unmakeEverySource = function () {
            for (var i in this.sourceEndpointDefinitions)
                _currentInstance.unmakeSource(i, null, true);

            this.sourceEndpointDefinitions = {};
            return this;
        };

        var _getScope = function (el, types, connectionType) {
            types = jsPlumbUtil.isArray(types) ? types : [ types ];
            var id = _getId(el);
            connectionType = connectionType || "default";
            for (var i = 0; i < types.length; i++) {
                var eldefs = this[types[i]][id];
                if (eldefs && eldefs[connectionType]) return eldefs[connectionType].def.scope || this.Defaults.Scope;
            }
        }.bind(this);

        var _setScope = function (el, scope, types, connectionType) {
            types = jsPlumbUtil.isArray(types) ? types : [ types ];
            var id = _getId(el);
            connectionType = connectionType || "default";
            for (var i = 0; i < types.length; i++) {
                var eldefs = this[types[i]][id];
                if (eldefs && eldefs[connectionType]) {
                    eldefs[connectionType].def.scope = scope;
                }
            }

        }.bind(this);

        this.getScope = function (el, scope) {
            return _getScope(el, [ "sourceEndpointDefinitions", "targetEndpointDefinitions" ]);
        };
        this.getSourceScope = function (el) {
            return _getScope(el, "sourceEndpointDefinitions");
        };
        this.getTargetScope = function (el) {
            return _getScope(el, "targetEndpointDefinitions");
        };
        this.setScope = function (el, scope, connectionType) {
            this.setSourceScope(el, scope, connectionType);
            this.setTargetScope(el, scope, connectionType);
        };
        this.setSourceScope = function (el, scope, connectionType) {
            _setScope(el, scope, "sourceEndpointDefinitions", connectionType);
            // we get the source scope during the mousedown event, but we also want to set this.
            this.setDragScope(el, scope);
        };
        this.setTargetScope = function (el, scope, connectionType) {
            _setScope(el, scope, "targetEndpointDefinitions", connectionType);
            this.setDropScope(el, scope);
        };

        // see api docs
        this.unmakeEveryTarget = function () {
            for (var i in this.targetEndpointDefinitions)
                _currentInstance.unmakeTarget(i, true);

            this.targetEndpointDefinitions = {};
            return this;
        };

        // does the work of setting a source enabled or disabled.
        var _setEnabled = function (type, el, state, toggle, connectionType) {
            var a = type == "source" ? this.sourceEndpointDefinitions : this.targetEndpointDefinitions;
            connectionType = connectionType || "default";


            if (_ju.isString(el) && a[el] && a[el][connectionType]) {
                a[el][connectionType].enabled = toggle ? !a[el][connectionType].enabled : state;
            }
            else if (el.length) {
                for (var i = 0, ii = el.length; i < ii; i++) {
                    var info = _info(el[i]);
                    if (a[info.id] && a[info.id][connectionType])
                        a[info.id][connectionType].enabled = toggle ? !a[info.id][connectionType].enabled : state;
                }
            }
            // otherwise a DOM element
            else {
                var id = _info(el).id;
                if (a[id] && a[id][connectionType])
                    a[id][connectionType].enabled = toggle ? !a[id][connectionType].enabled : state;
            }
            return this;
        }.bind(this);

        var _first = function (el, fn) {
            if (_ju.isString(el) || !el.length)
                return fn.apply(this, [ el ]);
            else if (el.length)
                return fn.apply(this, [ el[0] ]);

        }.bind(this);

        this.toggleSourceEnabled = function (el, connectionType) {
            _setEnabled("source", el, null, true, connectionType);
            return this.isSourceEnabled(el, connectionType);
        };

        this.setSourceEnabled = function (el, state, connectionType) {
            return _setEnabled("source", el, state, null, connectionType);
        };
        this.isSource = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var eldefs = this.sourceEndpointDefinitions[_info(_el).id];
                return eldefs != null && eldefs[connectionType] != null;
            }.bind(this));
        };
        this.isSourceEnabled = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var sep = this.sourceEndpointDefinitions[_info(_el).id];
                return sep && sep[connectionType] && sep[connectionType].enabled === true;
            }.bind(this));
        };

        this.toggleTargetEnabled = function (el, connectionType) {
            _setEnabled("target", el, null, true, connectionType);
            return this.isTargetEnabled(el, connectionType);
        };

        this.isTarget = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var eldefs = this.targetEndpointDefinitions[_info(_el).id];
                return eldefs != null && eldefs[connectionType] != null;
            }.bind(this));
        };
        this.isTargetEnabled = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var tep = this.targetEndpointDefinitions[_info(_el).id];
                return tep && tep[connectionType] && tep[connectionType].enabled === true;
            }.bind(this));
        };
        this.setTargetEnabled = function (el, state, connectionType) {
            return _setEnabled("target", el, state, null, connectionType);
        };

// --------------------- end makeSource/makeTarget ---------------------------------------------- 				

        this.ready = function (fn) {
            _currentInstance.bind("ready", fn);
        };

        var _elEach = function(el, fn) {
            // support both lists...
            if (typeof el == 'object' && el.length)
                for (var i = 0, ii = el.length; i < ii; i++) {
                    fn(el[i]);
                }
            else // ...and single strings or elements.
                fn(el);

            return _currentInstance;
        };

        // repaint some element's endpoints and connections
        this.repaint = function (el, ui, timestamp) {
            return _elEach(el, function(_el) {
                _draw(_el, ui, timestamp);
            });
        };

        this.revalidate = function (el, timestamp, isIdAlready) {
            return _elEach(el, function(_el) {
                var elId = isIdAlready ? _el : _currentInstance.getId(_el);
                _currentInstance.updateOffset({ elId: elId, recalc: true, timestamp:timestamp });
                _currentInstance.repaint(_el);
            });
        };

        // repaint every endpoint and connection.
        this.repaintEverything = function () {
            // TODO this timestamp causes continuous anchors to not repaint properly.
            // fix this. do not just take out the timestamp. it runs a lot faster with
            // the timestamp included.
            var timestamp = _timestamp(), elId;

            for (elId in endpointsByElement) {
                _currentInstance.updateOffset({ elId: elId, recalc: true, timestamp: timestamp });
            }

            for (elId in endpointsByElement) {
                _draw(elId, null, timestamp);
            }

            return this;
        };

        this.removeAllEndpoints = function (el, recurse, affectedElements) {
            affectedElements = affectedElements || [];
            var _one = function (_el) {
                var info = _info(_el),
                    ebe = endpointsByElement[info.id],
                    i, ii;

                if (ebe) {
                    affectedElements.push(info);
                    for (i = 0, ii = ebe.length; i < ii; i++)
                        _currentInstance.deleteEndpoint(ebe[i], false);
                }
                delete endpointsByElement[info.id];

                if (recurse) {
                    if (info.el && info.el.nodeType != 3 && info.el.nodeType != 8) {
                        for (i = 0, ii = info.el.childNodes.length; i < ii; i++) {
                            _one(info.el.childNodes[i]);
                        }
                    }
                }

            };
            _one(el);
            return this;
        };

        var _doRemove = function(info, affectedElements) {
            _currentInstance.removeAllEndpoints(info.id, true, affectedElements);
            var _one = function(_info) {
                _currentInstance.getDragManager().elementRemoved(_info.id);
                _currentInstance.anchorManager.clearFor(_info.id);
                _currentInstance.anchorManager.removeFloatingConnection(_info.id);
                delete _currentInstance.floatingConnections[_info.id];
                delete managedElements[_info.id];
                delete offsets[_info.id];
                if (_info.el) {
                    _currentInstance.removeElement(_info.el);
                    _info.el._jsPlumb = null;
                }
            };

            // remove all affected child elements
            for (var ae = 1; ae < affectedElements.length; ae++) {
                _one(affectedElements[ae]);
            }
            // and always remove the requested one from the dom.
            _one(info);
        };

        /**
         * Remove the given element, including cleaning up all endpoints registered for it.
         * This is exposed in the public API but also used internally by jsPlumb when removing the
         * element associated with a connection drag.
         */
        this.remove = function (el, doNotRepaint) {
            var info = _info(el), affectedElements = [];
            if (info.text) {
                info.el.parentNode.removeChild(info.el);
            }
            else if (info.id) {
                _currentInstance.batch(function () {
                    _doRemove(info, affectedElements);
                }, doNotRepaint === false);
            }
            return _currentInstance;
        };

        this.empty = function (el, doNotRepaint) {
            var affectedElements = [];
            var _one = function(el, dontRemoveFocus) {
                var info = _info(el);
                if (info.text) {
                    info.el.parentNode.removeChild(info.el);
                }
                else if (info.el) {
                    while(info.el.childNodes.length > 0) {
                        _one(info.el.childNodes[0]);
                    }
                    if (!dontRemoveFocus) _doRemove(info, affectedElements);
                }
            };

            _currentInstance.batch(function() {
                _one(el, true);
            }, doNotRepaint === false);

            return _currentInstance;
        };

        this.reset = function () {
            _currentInstance.silently(function() {
                _currentInstance.deleteEveryEndpoint();
                _currentInstance.unbind();
                this.targetEndpointDefinitions = {};
                this.sourceEndpointDefinitions = {};
                connections.length = 0;
                if (this.doReset) this.doReset();
            }.bind(this));
        };

        var _clearObject = function (obj) {
            if (obj.canvas && obj.canvas.parentNode)
                obj.canvas.parentNode.removeChild(obj.canvas);
            obj.cleanup();
            obj.destroy();
        };

        this.clear = function () {
            _currentInstance.select().each(_clearObject);
            _currentInstance.selectEndpoints().each(_clearObject);

            endpointsByElement = {};
            endpointsByUUID = {};
        };

        this.setDefaultScope = function (scope) {
            DEFAULT_SCOPE = scope;
            return _currentInstance;
        };

        // sets whether or not some element should be currently draggable.
        this.setDraggable = _setDraggable;

        this.deriveEndpointAndAnchorSpec = function(type, dontPrependDefault) {
            var bits = ((dontPrependDefault ? "" : "default ") + type).split(/[\s]/), eps = null, ep = null, a = null, as = null;
            for (var i = 0; i < bits.length; i++) {
                var _t = _currentInstance.getType(bits[i], "connection");
                if (_t) {
                    if (_t.endpoints) eps = _t.endpoints;
                    if (_t.endpoint) ep = _t.endpoint;
                    if (_t.anchors) as = _t.anchors;
                    if (_t.anchor) a = _t.anchor;
                }
            }
            return { endpoints: eps ? eps : [ ep, ep ], anchors: as ? as : [a, a ]};
        };

        // sets the id of some element, changing whatever we need to to keep track.
        this.setId = function (el, newId, doNotSetAttribute) {
            //
            var id;

            if (jsPlumbUtil.isString(el)) {
                id = el;
            }
            else {
                el = this.getElement(el);
                id = this.getId(el);
            }

            var sConns = this.getConnections({source: id, scope: '*'}, true),
                tConns = this.getConnections({target: id, scope: '*'}, true);

            newId = "" + newId;

            if (!doNotSetAttribute) {
                el = this.getElement(id);
                this.setAttribute(el, "id", newId);
            }
            else
                el = this.getElement(newId);

            endpointsByElement[newId] = endpointsByElement[id] || [];
            for (var i = 0, ii = endpointsByElement[newId].length; i < ii; i++) {
                endpointsByElement[newId][i].setElementId(newId);
                endpointsByElement[newId][i].setReferenceElement(el);
            }
            delete endpointsByElement[id];

            this.sourceEndpointDefinitions[newId] = this.sourceEndpointDefinitions[id];
            delete this.sourceEndpointDefinitions[id];
            this.targetEndpointDefinitions[newId] = this.targetEndpointDefinitions[id];
            delete this.targetEndpointDefinitions[id];

            this.anchorManager.changeId(id, newId);
            this.getDragManager().changeId(id, newId);
            managedElements[newId] = managedElements[id];
            delete managedElements[id];

            var _conns = function (list, epIdx, type) {
                for (var i = 0, ii = list.length; i < ii; i++) {
                    list[i].endpoints[epIdx].setElementId(newId);
                    list[i].endpoints[epIdx].setReferenceElement(el);
                    list[i][type + "Id"] = newId;
                    list[i][type] = el;
                }
            };
            _conns(sConns, 0, "source");
            _conns(tConns, 1, "target");

            this.repaint(newId);
        };

        this.setDebugLog = function (debugLog) {
            log = debugLog;
        };

        this.setSuspendDrawing = function (val, repaintAfterwards) {
            var curVal = _suspendDrawing;
            _suspendDrawing = val;
            if (val) _suspendedAt = new Date().getTime(); else _suspendedAt = null;
            if (repaintAfterwards) this.repaintEverything();
            return curVal;
        };

        // returns whether or not drawing is currently suspended.
        this.isSuspendDrawing = function () {
            return _suspendDrawing;
        };

        // return timestamp for when drawing was suspended.
        this.getSuspendedAt = function () {
            return _suspendedAt;
        };

        this.batch = function (fn, doNotRepaintAfterwards) {
            var _wasSuspended = this.isSuspendDrawing();
            if (!_wasSuspended)
                this.setSuspendDrawing(true);
            try {
                fn();
            }
            catch (e) {
                _ju.log("Function run while suspended failed", e);
            }
            if (!_wasSuspended)
                this.setSuspendDrawing(false, !doNotRepaintAfterwards);
        };

        this.doWhileSuspended = this.batch;

        this.getCachedData = _getCachedData;
        this.timestamp = _timestamp;
        this.show = function (el, changeEndpoints) {
            _setVisible(el, "block", changeEndpoints);
            return _currentInstance;
        };

        // TODO: update this method to return the current state.
        this.toggleVisible = _toggleVisible;
        this.toggleDraggable = _toggleDraggable;
        this.addListener = this.bind;
    };

    jsPlumbUtil.extend(jsPlumbInstance, jsPlumbUtil.EventGenerator, {
        setAttribute: function (el, a, v) {
            this.setAttribute(el, a, v);
        },
        getAttribute: function (el, a) {
            return this.getAttribute(jsPlumb.getElement(el), a);
        },
        convertToFullOverlaySpec: function(spec) {
            if (jsPlumbUtil.isString(spec)) {
                spec = [ spec, { } ];
            }
            spec[1].id = spec[1].id || jsPlumbUtil.uuid();
            return spec;
        },
        registerConnectionType: function (id, type) {
            this._connectionTypes[id] = jsPlumb.extend({}, type);
            if (type.overlays) {
                var to = {};
                for (var i = 0; i < type.overlays.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = this.convertToFullOverlaySpec(type.overlays[i]);
                    to[fo[1].id] = fo;
                }
                this._connectionTypes[id].overlays = to;
            }
        },
        registerConnectionTypes: function (types) {
            for (var i in types)
                this.registerConnectionType(i, types[i]);
        },
        registerEndpointType: function (id, type) {
            this._endpointTypes[id] = jsPlumb.extend({}, type);
            if (type.overlays) {
                var to = {};
                for (var i = 0; i < type.overlays.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = this.convertToFullOverlaySpec(type.overlays[i]);
                    to[fo[1].id] = fo;
                }
                this._endpointTypes[id].overlays = to;
            }
        },
        registerEndpointTypes: function (types) {
            for (var i in types)
                //this._endpointTypes[i] = jsPlumb.extend({}, types[i]);
                this.registerEndpointType(i, types[i]);
        },
        getType: function (id, typeDescriptor) {
            return typeDescriptor === "connection" ? this._connectionTypes[id] : this._endpointTypes[id];
        },
        setIdChanged: function (oldId, newId) {
            this.setId(oldId, newId, true);
        },
        // set parent: change the parent for some node and update all the registrations we need to.
        setParent: function (el, newParent) {
            var _dom = this.getElement(el),
                _id = this.getId(_dom),
                _pdom = this.getElement(newParent),
                _pid = this.getId(_pdom);

            _dom.parentNode.removeChild(_dom);
            _pdom.appendChild(_dom);
            this.getDragManager().setParent(_dom, _id, _pdom, _pid);
        },
        extend: function (o1, o2, names) {
            var i;
            if (names) {
                for (i = 0; i < names.length; i++)
                    o1[names[i]] = o2[names[i]];
            }
            else
                for (i in o2) o1[i] = o2[i];
            return o1;
        },
        floatingConnections: {},
        getFloatingAnchorIndex: function (jpc) {
            return jpc.endpoints[0].isFloating() ? 0 : jpc.endpoints[1].isFloating() ? 1 : -1;
        }
    });

// --------------------- static instance + AMD registration -------------------------------------------	

// create static instance and assign to window if window exists.	
    var jsPlumb = new jsPlumbInstance();
    // register on window if defined (lets us run on server)
    if (typeof window != 'undefined') window.jsPlumb = jsPlumb;
    // add 'getInstance' method to static instance
    jsPlumb.getInstance = function (_defaults) {
        var j = new jsPlumbInstance(_defaults);
        j.init();
        return j;
    };
    jsPlumb.each = function (spec, fn) {
        if (spec == null) return;
        if (typeof spec === "string")
            fn(jsPlumb.getElement(spec));
        else if (spec.length != null) {
            for (var i = 0; i < spec.length; i++)
                fn(jsPlumb.getElement(spec[i]));
        }
        else
            fn(spec); // assume it's an element.
    };
// maybe register static instance as an AMD module, and getInstance method too.
    if (typeof define === "function") {
        define("jsplumb", [], function () {
            return jsPlumb;
        });
        define("jsplumbinstance", [], function () {
            return jsPlumb.getInstance();
        });
    }
    // CommonJS
    if (typeof exports !== 'undefined') {
        exports.jsPlumb = jsPlumb;
    }


// --------------------- end static instance + AMD registration -------------------------------------------		

}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains the base functionality for DOM type adapters.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    var root = this, _ju = root.jsPlumbUtil;

    var svgAvailable = !!window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"),

        _genLoc = function (e, prefix) {
            if (e == null) return [ 0, 0 ];
            var ts = _touches(e), t = _getTouch(ts, 0);
            return [t[prefix + "X"], t[prefix + "Y"]];
        },
        _pageLocation = function (e) {
            if (e == null) return [ 0, 0 ];
            return _genLoc(e, "page");
        },
        _screenLocation = function (e) {
            return _genLoc(e, "screen");
        },
        _clientLocation = function (e) {
            return _genLoc(e, "client");
        },
        _getTouch = function (touches, idx) {
            return touches.item ? touches.item(idx) : touches[idx];
        },
        _touches = function (e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                    e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                [ e ];
        };

    /**
     Manages dragging for some instance of jsPlumb.

     TODO instead of this being accessed directly, it should subscribe to events on the jsPlumb instance: every method
     in here is called directly by jsPlumb. But what should happen is that we have unpublished events that this listens
     to.  The only trick is getting one of these instantiated with every jsPlumb instance: it needs to have a hook somehow.
     Basically the general idea is to pull ALL the drag code out (prototype method registrations plus this) into a
     dedicated drag script), that does not necessarily need to be included.


     */
    var DragManager = function (_currentInstance) {
        var _draggables = {}, _dlist = [], _delements = {}, _elementsWithEndpoints = {},
        // elementids mapped to the draggable to which they belong.
            _draggablesForElements = {};

        /**
         register some element as draggable.  right now the drag init stuff is done elsewhere, and it is
         possible that will continue to be the case.
         */
        this.register = function (el) {
            var id = _currentInstance.getId(el),
                parentOffset = _currentInstance.getOffset(el);

            if (!_draggables[id]) {
                _draggables[id] = el;
                _dlist.push(el);
                _delements[id] = {};
            }

            // look for child elements that have endpoints and register them against this draggable.
            var _oneLevel = function (p) {
                if (p) {
                    for (var i = 0; i < p.childNodes.length; i++) {
                        if (p.childNodes[i].nodeType != 3 && p.childNodes[i].nodeType != 8) {
                            var cEl = jsPlumb.getElement(p.childNodes[i]),
                                cid = _currentInstance.getId(p.childNodes[i], null, true);
                            if (cid && _elementsWithEndpoints[cid] && _elementsWithEndpoints[cid] > 0) {
                                var cOff = _currentInstance.getOffset(cEl);
                                _delements[id][cid] = {
                                    id: cid,
                                    offset: {
                                        left: cOff.left - parentOffset.left,
                                        top: cOff.top - parentOffset.top
                                    }
                                };
                                _draggablesForElements[cid] = id;
                            }
                            _oneLevel(p.childNodes[i]);
                        }
                    }
                }
            };

            _oneLevel(el);
        };

        // refresh the offsets for child elements of this element.
        this.updateOffsets = function (elId) {
            if (elId != null) {
                var domEl = jsPlumb.getElement(elId),
                    id = _currentInstance.getId(domEl),
                    children = _delements[id],
                    parentOffset = _currentInstance.getOffset(domEl);

                if (children) {
                    for (var i in children) {
                        if (children.hasOwnProperty(i)) {
                            var cel = jsPlumb.getElement(i),
                                cOff = _currentInstance.getOffset(cel);

                            _delements[id][i] = {
                                id: i,
                                offset: {
                                    left: cOff.left - parentOffset.left,
                                    top: cOff.top - parentOffset.top
                                }
                            };
                            _draggablesForElements[i] = id;
                        }
                    }
                }
            }
        };

        /**
         notification that an endpoint was added to the given el.  we go up from that el's parent
         node, looking for a parent that has been registered as a draggable. if we find one, we add this
         el to that parent's list of elements to update on drag (if it is not there already)
         */
        this.endpointAdded = function (el, id) {

            id = id || _currentInstance.getId(el);

            var b = document.body,
                p = el.parentNode;

            _elementsWithEndpoints[id] = _elementsWithEndpoints[id] ? _elementsWithEndpoints[id] + 1 : 1;

            while (p != null && p != b) {
                var pid = _currentInstance.getId(p, null, true);
                if (pid && _draggables[pid]) {
                    var pLoc = _currentInstance.getOffset(p);

                    if (_delements[pid][id] == null) {
                        var cLoc = _currentInstance.getOffset(el);
                        _delements[pid][id] = {
                            id: id,
                            offset: {
                                left: cLoc.left - pLoc.left,
                                top: cLoc.top - pLoc.top
                            }
                        };
                        _draggablesForElements[id] = pid;
                    }
                    break;
                }
                p = p.parentNode;
            }
        };

        this.endpointDeleted = function (endpoint) {
            if (_elementsWithEndpoints[endpoint.elementId]) {
                _elementsWithEndpoints[endpoint.elementId]--;
                if (_elementsWithEndpoints[endpoint.elementId] <= 0) {
                    for (var i in _delements) {
                        if (_delements.hasOwnProperty(i) && _delements[i]) {
                            delete _delements[i][endpoint.elementId];
                            delete _draggablesForElements[endpoint.elementId];
                        }
                    }
                }
            }
        };

        this.changeId = function (oldId, newId) {
            _delements[newId] = _delements[oldId];
            _delements[oldId] = {};
            _draggablesForElements[newId] = _draggablesForElements[oldId];
            _draggablesForElements[oldId] = null;
        };

        this.getElementsForDraggable = function (id) {
            return _delements[id];
        };

        this.elementRemoved = function (elementId) {
            var elId = _draggablesForElements[elementId];
            if (elId) {
                delete _delements[elId][elementId];
                delete _draggablesForElements[elementId];
            }
        };

        this.reset = function () {
            _draggables = {};
            _dlist = [];
            _delements = {};
            _elementsWithEndpoints = {};
        };

        //
        // notification drag ended. We check automatically if need to update some
        // ancestor's offsets.
        //
        this.dragEnded = function (el) {
            var id = _currentInstance.getId(el),
                ancestor = _draggablesForElements[id];

            if (ancestor) this.updateOffsets(ancestor);
        };

        this.setParent = function (el, elId, p, pId) {
            var current = _draggablesForElements[elId];
            if (current) {
                if (!_delements[pId])
                    _delements[pId] = {};
                _delements[pId][elId] = _delements[current][elId];
                delete _delements[current][elId];
                var pLoc = _currentInstance.getOffset(p),
                    cLoc = _currentInstance.getOffset(el);
                _delements[pId][elId].offset = {
                    left: cLoc.left - pLoc.left,
                    top: cLoc.top - pLoc.top
                };
                _draggablesForElements[elId] = pId;
            }
        };

        this.getDragAncestor = function (el) {
            var de = jsPlumb.getElement(el),
                id = _currentInstance.getId(de),
                aid = _draggablesForElements[id];

            if (aid)
                return jsPlumb.getElement(aid);
            else
                return null;
        };

    };

    var trim = function (str) {
            return str == null ? null : (str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
        },
        _setClassName = function (el, cn) {
            cn = trim(cn);
            if (typeof el.className.baseVal != "undefined")  // SVG
                el.className.baseVal = cn;
            else
                el.className = cn;
        },
        _getClassName = function (el) {
            return (typeof el.className.baseVal == "undefined") ? el.className : el.className.baseVal;
        },
        _classManip = function (el, classesToAdd, classesToRemove) {
            classesToAdd = classesToAdd == null ? [] : jsPlumbUtil.isArray(classesToAdd) ? classesToAdd : classesToAdd.split(/\s+/);
            classesToRemove = classesToRemove == null ? [] : jsPlumbUtil.isArray(classesToRemove) ? classesToRemove : classesToRemove.split(/\s+/);

            var className = _getClassName(el),
                curClasses = className.split(/\s+/);

            var _oneSet = function (add, classes) {
                for (var i = 0; i < classes.length; i++) {
                    if (add) {
                        if (curClasses.indexOf(classes[i]) == -1)
                            curClasses.push(classes[i]);
                    }
                    else {
                        var idx = curClasses.indexOf(classes[i]);
                        if (idx != -1)
                            curClasses.splice(idx, 1);
                    }
                }
            };

            _oneSet(true, classesToAdd);
            _oneSet(false, classesToRemove);

            _setClassName(el, curClasses.join(" "));
        };

    jsPlumb.extend(jsPlumbInstance.prototype, {

        headless: false,

        pageLocation: _pageLocation,
        screenLocation: _screenLocation,
        clientLocation: _clientLocation,

        getDragManager:function() {
            if (this.dragManager == null)
                this.dragManager = new DragManager(this);

            return this.dragManager;
        },

        recalculateOffsets:function(elId) {
            this.getDragManager().updateOffsets(elId);
        },

        createElement:function(tag, style, clazz, atts) {
            return this.createElementNS(null, tag, style, clazz, atts);
        },

        createElementNS:function(ns, tag, style, clazz, atts) {
            var e = ns == null ? document.createElement(tag) : document.createElementNS(ns, tag);
            var i;
            style = style || {};
            for (i in style)
                e.style[i] = style[i];

            if (clazz)
                e.className = clazz;

            atts = atts || {};
            for (i in atts)
                e.setAttribute(i, "" + atts[i]);

            return e;
        },

        getAttribute: function (el, attName) {
            return el.getAttribute != null ? el.getAttribute(attName) : null;
        },

        setAttribute: function (el, a, v) {
            if (el.setAttribute != null) el.setAttribute(a, v);
        },

        setAttributes: function (el, atts) {
            for (var i in atts)
                if (atts.hasOwnProperty(i)) el.setAttribute(i, atts[i]);
        },
        appendToRoot: function (node) {
            document.body.appendChild(node);
        },
        getRenderModes: function () {
            return [ "svg"  ];
        },
        getClass:_getClassName,
        addClass: function (el, clazz) {
            jsPlumb.each(el, function (e) {
                _classManip(e, clazz);
            });
        },
        hasClass: function (el, clazz) {
            el = jsPlumb.getElement(el);
            if (el.classList) return el.classList.contains(clazz);
            else {
                return _getClassName(el).indexOf(clazz) != -1;
            }
        },
        removeClass: function (el, clazz) {
            jsPlumb.each(el, function (e) {
                _classManip(e, null, clazz);
            });
        },
        updateClasses: function (el, toAdd, toRemove) {
            jsPlumb.each(el, function (e) {
                _classManip(e, toAdd, toRemove);
            });
        },
        setClass: function (el, clazz) {
            jsPlumb.each(el, function (e) {
                _setClassName(e, clazz);
            });
        },
        setPosition: function (el, p) {
            el.style.left = p.left + "px";
            el.style.top = p.top + "px";
        },
        getPosition: function (el) {
            var _one = function (prop) {
                var v = el.style[prop];
                return v ? v.substring(0, v.length - 2) : 0;
            };
            return {
                left: _one("left"),
                top: _one("top")
            };
        },
        getStyle:function(el, prop) {
            if (typeof window.getComputedStyle !== 'undefined') {
                return getComputedStyle(el, null).getPropertyValue(prop);
            } else {
                return el.currentStyle[prop];
            }
        },
        getSelector: function (ctx, spec) {
            var sel = null;
            if (arguments.length == 1) {
                sel = ctx.nodeType != null ? ctx : document.querySelectorAll(ctx);
            }
            else
                sel = ctx.querySelectorAll(spec);

            return sel;
        },
        getOffset:function(el, relativeToRoot, container) {
            el = jsPlumb.getElement(el);
            container = container || this.getContainer();
            var out = {
                    left: el.offsetLeft,
                    top: el.offsetTop
                },
                op = (relativeToRoot  || (container != null && (el != container && el.offsetParent != container))) ?  el.offsetParent : null,
                _maybeAdjustScroll = function(offsetParent) {
                    if (offsetParent != null && offsetParent !== document.body && (offsetParent.scrollTop > 0 || offsetParent.scrollLeft > 0)) {
                        out.left -= offsetParent.scrollLeft;
                        out.top -= offsetParent.scrollTop;
                    }
                }.bind(this);

            while (op != null) {
                out.left += op.offsetLeft;
                out.top += op.offsetTop;
                _maybeAdjustScroll(op);
                op = relativeToRoot ? op.offsetParent :
                        op.offsetParent == container ? null : op.offsetParent;
            }

            // if container is scrolled and the element (or its offset parent) is not absolute or fixed, adjust accordingly.
            if (container != null && !relativeToRoot && (container.scrollTop > 0 || container.scrollLeft > 0)) {
                var pp = el.offsetParent != null ? this.getStyle(el.offsetParent, "position") : "static",
                    p = this.getStyle(el, "position");
                if (p !== "absolute" && p !== "fixed" && pp !== "absolute" && pp != "fixed") {
                    out.left -= container.scrollLeft;
                    out.top -= container.scrollTop;
                }
            }
            return out;
        },
        //
        // return x+y proportion of the given element's size corresponding to the location of the given event.
        //
        getPositionOnElement: function (evt, el, zoom) {
            var box = typeof el.getBoundingClientRect !== "undefined" ? el.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 },
                body = document.body,
                docElem = document.documentElement,
                scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
                scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                pst = 0,
                psl = 0,
                top = box.top + scrollTop - clientTop + (pst * zoom),
                left = box.left + scrollLeft - clientLeft + (psl * zoom),
                cl = jsPlumb.pageLocation(evt),
                w = box.width || (el.offsetWidth * zoom),
                h = box.height || (el.offsetHeight * zoom),
                x = (cl[0] - left) / w,
                y = (cl[1] - top) / h;

            return [ x, y ];
        },

        /**
         * Gets the absolute position of some element as read from the left/top properties in its style.
         * @method getAbsolutePosition
         * @param {Element} el The element to retrieve the absolute coordinates from. **Note** this is a DOM element, not a selector from the underlying library.
         * @return {Number[]} [left, top] pixel values.
         */
        getAbsolutePosition: function (el) {
            var _one = function (s) {
                var ss = el.style[s];
                if (ss) return parseFloat(ss.substring(0, ss.length - 2));
            };
            return [ _one("left"), _one("top") ];
        },

        /**
         * Sets the absolute position of some element by setting the left/top properties in its style.
         * @method setAbsolutePosition
         * @param {Element} el The element to set the absolute coordinates on. **Note** this is a DOM element, not a selector from the underlying library.
         * @param {Number[]} xy x and y coordinates
         * @param {Number[]} [animateFrom] Optional previous xy to animate from.
         * @param {Object} [animateOptions] Options for the animation.
         */
        setAbsolutePosition: function (el, xy, animateFrom, animateOptions) {
            if (animateFrom) {
                this.animate(el, {
                    left: "+=" + (xy[0] - animateFrom[0]),
                    top: "+=" + (xy[1] - animateFrom[1])
                }, animateOptions);
            }
            else {
                el.style.left = xy[0] + "px";
                el.style.top = xy[1] + "px";
            }
        },
        /**
         * gets the size for the element, in an array : [ width, height ].
         */
        getSize: function (el) {
            return [ el.offsetWidth, el.offsetHeight ];
        },
        getWidth: function (el) {
            return el.offsetWidth;
        },
        getHeight: function (el) {
            return el.offsetHeight;
        }

    });
}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains code for components that support overlays.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
;(function() {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    // ------------------------------ BEGIN OverlayCapablejsPlumbUIComponent --------------------------------------------

    var _internalLabelOverlayId = "__label",
    // this is a shortcut helper method to let people add a label as
    // overlay.
        _makeLabelOverlay = function (component, params) {

            var _params = {
                    cssClass: params.cssClass,
                    labelStyle: component.labelStyle,
                    id: _internalLabelOverlayId,
                    component: component,
                    _jsPlumb: component._jsPlumb.instance  // TODO not necessary, since the instance can be accessed through the component.
                },
                mergedParams = jsPlumb.extend(_params, params);

            return new _jp.Overlays[component._jsPlumb.instance.getRenderMode()].Label(mergedParams);
        },
        _processOverlay = function (component, o) {
            var _newOverlay = null;
            if (_ju.isArray(o)) {	// this is for the shorthand ["Arrow", { width:50 }] syntax
                // there's also a three arg version:
                // ["Arrow", { width:50 }, {location:0.7}]
                // which merges the 3rd arg into the 2nd.
                var type = o[0],
                // make a copy of the object so as not to mess up anyone else's reference...
                    p = _jp.extend({component: component, _jsPlumb: component._jsPlumb.instance}, o[1]);
                if (o.length == 3) _jp.extend(p, o[2]);
                _newOverlay = new _jp.Overlays[component._jsPlumb.instance.getRenderMode()][type](p);
            } else if (o.constructor == String) {
                _newOverlay = new _jp.Overlays[component._jsPlumb.instance.getRenderMode()][o]({component: component, _jsPlumb: component._jsPlumb.instance});
            } else {
                _newOverlay = o;
            }

            _newOverlay.id = _newOverlay.id || _ju.uuid();
            component.cacheTypeItem("overlay", _newOverlay, _newOverlay.id);
            //component._jsPlumb.overlays.push(_newOverlay);
            component._jsPlumb.overlays[_newOverlay.id] = _newOverlay;

            return _newOverlay;
        };

    _jp.OverlayCapableJsPlumbUIComponent = function (params) {

        jsPlumbUIComponent.apply(this, arguments);
        this._jsPlumb.overlays = {};
        this._jsPlumb.overlayPositions = {};

        if (params.label) {
            this.getDefaultType().overlays[_internalLabelOverlayId] = ["Label", {
                label: params.label,
                location: params.labelLocation || this.defaultLabelLocation || 0.5,
                labelStyle: params.labelStyle || this._jsPlumb.instance.Defaults.LabelStyle,
                id:_internalLabelOverlayId
            }];
        }

        this.setListenerComponent = function (c) {
            if (this._jsPlumb) {
                for (var i in this._jsPlumb.overlays)
                    this._jsPlumb.overlays[i].setListenerComponent(c);
            }
        };
    };

    _jp.OverlayCapableJsPlumbUIComponent.applyType = function (component, t) {
        if (t.overlays) {
            // loop through the ones in the type. if already present on the component,
            // dont remove or re-add.
            var keep = {}, i;

            for (i in t.overlays) {

                var existing = component._jsPlumb.overlays[t.overlays[i][1].id];
                if (existing) {
                    // maybe update from data, if there were parameterised values for instance.
                    existing.updateFrom(t.overlays[i][1]);
                    keep[t.overlays[i][1].id] = true;
                }
                else {
                    var c = component.getCachedTypeItem("overlay", t.overlays[i][1].id);
                    if (c != null) {
                        c.reattach(component._jsPlumb.instance);
                        // maybe update from data, if there were parameterised values for instance.
                        c.updateFrom(t.overlays[i][1]);
                        component._jsPlumb.overlays[c.id] = c;
                    }
                    else {
                        c = component.addOverlay(t.overlays[i], true);
                    }
                    keep[c.id] = true;
                }
            }

            // now loop through the full overlays and remove those that we dont want to keep
            for (i in component._jsPlumb.overlays) {
                if (keep[component._jsPlumb.overlays[i].id] == null)
                    component.removeOverlay(component._jsPlumb.overlays[i].id);
            }
        }
    };

    _ju.extend(_jp.OverlayCapableJsPlumbUIComponent, jsPlumbUIComponent, {

        setHover: function (hover, ignoreAttachedElements) {
            if (this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) {
                for (var i in this._jsPlumb.overlays) {
                    this._jsPlumb.overlays[i][hover ? "addClass" : "removeClass"](this._jsPlumb.instance.hoverClass);
                }
            }
        },
        addOverlay: function (overlay, doNotRepaint) {
            var o = _processOverlay(this, overlay);
            if (!doNotRepaint) this.repaint();
            return o;
        },
        getOverlay: function (id) {
            return this._jsPlumb.overlays[id];
        },
        getOverlays: function () {
            return this._jsPlumb.overlays;
        },
        hideOverlay: function (id) {
            var o = this.getOverlay(id);
            if (o) o.hide();
        },
        hideOverlays: function () {
            for (var i in this._jsPlumb.overlays)
                this._jsPlumb.overlays[i].hide();
        },
        showOverlay: function (id) {
            var o = this.getOverlay(id);
            if (o) o.show();
        },
        showOverlays: function () {
            for (var i in this._jsPlumb.overlays)
                this._jsPlumb.overlays[i].show();
        },
        removeAllOverlays: function (doNotRepaint) {
            for (var i in this._jsPlumb.overlays) {
                if (this._jsPlumb.overlays[i].cleanup) this._jsPlumb.overlays[i].cleanup();
            }

            this._jsPlumb.overlays = {};
            this._jsPlumb.overlayPositions = null;
            if (!doNotRepaint)
                this.repaint();
        },
        removeOverlay: function (overlayId) {
            var o = this._jsPlumb.overlays[overlayId];
            if (o) {
                if (o.cleanup) o.cleanup();
                delete this._jsPlumb.overlays[overlayId];
                if (this._jsPlumb.overlayPositions)
                    delete this._jsPlumb.overlayPositions[overlayId];
            }
        },
        removeOverlays: function () {
            for (var i = 0, j = arguments.length; i < j; i++)
                this.removeOverlay(arguments[i]);
        },
        moveParent: function (newParent) {
            if (this.bgCanvas) {
                this.bgCanvas.parentNode.removeChild(this.bgCanvas);
                newParent.appendChild(this.bgCanvas);
            }

            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
                newParent.appendChild(this.canvas);

                for (var i in this._jsPlumb.overlays) {
                    if (this._jsPlumb.overlays[i].isAppendedAtTopLevel) {
                        var el = this._jsPlumb.overlays[i].getElement();
                        el.parentNode.removeChild(el);
                        newParent.appendChild(el);
                    }
                }
            }
        },
        getLabel: function () {
            var lo = this.getOverlay(_internalLabelOverlayId);
            return lo != null ? lo.getLabel() : null;
        },
        getLabelOverlay: function () {
            return this.getOverlay(_internalLabelOverlayId);
        },
        setLabel: function (l) {
            var lo = this.getOverlay(_internalLabelOverlayId);
            if (!lo) {
                var params = l.constructor == String || l.constructor == Function ? { label: l } : l;
                lo = _makeLabelOverlay(this, params);
                this._jsPlumb.overlays[_internalLabelOverlayId] = lo;
            }
            else {
                if (l.constructor == String || l.constructor == Function) lo.setLabel(l);
                else {
                    if (l.label) lo.setLabel(l.label);
                    if (l.location) lo.setLocation(l.location);
                }
            }

            if (!this._jsPlumb.instance.isSuspendDrawing())
                this.repaint();
        },
        cleanup: function (force) {
            for (var i in this._jsPlumb.overlays) {
                this._jsPlumb.overlays[i].cleanup(force);
                this._jsPlumb.overlays[i].destroy(force);
            }
            if (force) {
                this._jsPlumb.overlays = {};
                this._jsPlumb.overlayPositions = null;
            }
        },
        setVisible: function (v) {
            this[v ? "showOverlays" : "hideOverlays"]();
        },
        setAbsoluteOverlayPosition: function (overlay, xy) {
            this._jsPlumb.overlayPositions[overlay.id] = xy;
        },
        getAbsoluteOverlayPosition: function (overlay) {
            return this._jsPlumb.overlayPositions ? this._jsPlumb.overlayPositions[overlay.id] : null;
        }
    });

// ------------------------------ END OverlayCapablejsPlumbUIComponent --------------------------------------------

}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for Endpoints.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    // create the drag handler for a connection
    var _makeConnectionDragHandler = function (endpoint, placeholder, _jsPlumb) {
        var stopped = false;
        return {
            drag: function () {
                if (stopped) {
                    stopped = false;
                    return true;
                }

                if (placeholder.element) {
                    var _ui = _jsPlumb.getUIPosition(arguments, _jsPlumb.getZoom());
                    jsPlumb.setPosition(placeholder.element, _ui);
                    _jsPlumb.repaint(placeholder.element, _ui);
                    // always repaint the source endpoint, because only continuous/dynamic anchors cause the endpoint
                    // to be repainted, so static anchors need to be told (or the endpoint gets dragged around)
                    endpoint.paint({anchorPoint:endpoint.anchor.getCurrentLocation({element:endpoint.element})});
                }
            },
            stopDrag: function () {
                stopped = true;
            }
        };
    };

    // creates a placeholder div for dragging purposes, adds it, and pre-computes its offset.
    var _makeDraggablePlaceholder = function (placeholder, _jsPlumb, ipco, ips) {
        var n = jsPlumb.createElement("div", { position : "absolute" });
        _jsPlumb.appendElement(n);
        var id = _jsPlumb.getId(n);
        jsPlumb.setPosition(n, ipco);
        n.style.width = ips[0] + "px";
        n.style.height = ips[1] + "px";
        _jsPlumb.manage(id, n, true); // TRANSIENT MANAGE
        // create and assign an id, and initialize the offset.
        placeholder.id = id;
        placeholder.element = n;
    };

    // create a floating endpoint (for drag connections)
    var _makeFloatingEndpoint = function (paintStyle, referenceAnchor, endpoint, referenceCanvas, sourceElement, _jsPlumb, _newEndpoint, scope) {
        var floatingAnchor = new _jp.FloatingAnchor({ reference: referenceAnchor, referenceCanvas: referenceCanvas, jsPlumbInstance: _jsPlumb });
        //setting the scope here should not be the way to fix that mootools issue.  it should be fixed by not
        // adding the floating endpoint as a droppable.  that makes more sense anyway!
        // TRANSIENT MANAGE
        return _newEndpoint({
            paintStyle: paintStyle,
            endpoint: endpoint,
            anchor: floatingAnchor,
            source: sourceElement,
            scope: scope
        });
    };

    var typeParameters = [ "connectorStyle", "connectorHoverStyle", "connectorOverlays",
        "connector", "connectionType", "connectorClass", "connectorHoverClass" ];

    // a helper function that tries to find a connection to the given element, and returns it if so. if elementWithPrecedence is null,
    // or no connection to it is found, we return the first connection in our list.
    var findConnectionToUseForDynamicAnchor = function (ep, elementWithPrecedence) {
        var idx = 0;
        if (elementWithPrecedence != null) {
            for (var i = 0; i < ep.connections.length; i++) {
                if (ep.connections[i].sourceId == elementWithPrecedence || ep.connections[i].targetId == elementWithPrecedence) {
                    idx = i;
                    break;
                }
            }
        }

        return ep.connections[idx];
    };

    _jp.Endpoint = function (params) {
        var _jsPlumb = params._jsPlumb,
            _newConnection = params.newConnection,
            _newEndpoint = params.newEndpoint;

        this.idPrefix = "_jsplumb_e_";
        this.defaultLabelLocation = [ 0.5, 0.5 ];
        this.defaultOverlayKeys = ["Overlays", "EndpointOverlays"];
        _jp.OverlayCapableJsPlumbUIComponent.apply(this, arguments);

// TYPE

        this.appendToDefaultType({
            connectionType:params.connectionType,
            maxConnections: params.maxConnections == null ? this._jsPlumb.instance.Defaults.MaxConnections : params.maxConnections, // maximum number of connections this endpoint can be the source of.,
            paintStyle: params.endpointStyle || params.paintStyle || params.style || this._jsPlumb.instance.Defaults.EndpointStyle || _jp.Defaults.EndpointStyle,
            hoverPaintStyle: params.endpointHoverStyle || params.hoverPaintStyle || this._jsPlumb.instance.Defaults.EndpointHoverStyle || _jp.Defaults.EndpointHoverStyle,
            connectorStyle: params.connectorStyle,
            connectorHoverStyle: params.connectorHoverStyle,
            connectorClass: params.connectorClass,
            connectorHoverClass: params.connectorHoverClass,
            connectorOverlays: params.connectorOverlays,
            connector: params.connector,
            connectorTooltip: params.connectorTooltip
        });

// END TYPE

        this._jsPlumb.enabled = !(params.enabled === false);
        this._jsPlumb.visible = true;
        this.element = _jp.getElement(params.source);
        this._jsPlumb.uuid = params.uuid;
        this._jsPlumb.floatingEndpoint = null;
        var inPlaceCopy = null;
        if (this._jsPlumb.uuid) params.endpointsByUUID[this._jsPlumb.uuid] = this;
        this.elementId = params.elementId;
        this.dragProxy = params.dragProxy;

        this._jsPlumb.connectionCost = params.connectionCost;
        this._jsPlumb.connectionsDirected = params.connectionsDirected;
        this._jsPlumb.currentAnchorClass = "";
        this._jsPlumb.events = {};

        var _updateAnchorClass = function () {
            // stash old, get new
            var oldAnchorClass = _jsPlumb.endpointAnchorClassPrefix + "-" + this._jsPlumb.currentAnchorClass;
            this._jsPlumb.currentAnchorClass = this.anchor.getCssClass();
            var anchorClass = _jsPlumb.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");

            this.removeClass(oldAnchorClass);
            this.addClass(anchorClass);
            // add and remove at the same time to reduce the number of reflows.
            jsPlumb.updateClasses(this.element, anchorClass, oldAnchorClass);
        }.bind(this);

        this.prepareAnchor = function(anchorParams) {
            var a = this._jsPlumb.instance.makeAnchor(anchorParams, this.elementId, _jsPlumb);
            a.bind("anchorChanged", function (currentAnchor) {
                this.fire("anchorChanged", {endpoint: this, anchor: currentAnchor});
                _updateAnchorClass();
            }.bind(this));
            return a;
        };

        this.setPreparedAnchor = function(anchor, doNotRepaint) {
            this._jsPlumb.instance.continuousAnchorFactory.clear(this.elementId);
            this.anchor = anchor;
            _updateAnchorClass();

            if (!doNotRepaint)
                this._jsPlumb.instance.repaint(this.elementId);

            return this;
        };

        this.setAnchor = function (anchorParams, doNotRepaint) {
            var a = this.prepareAnchor(anchorParams);
            this.setPreparedAnchor(a, doNotRepaint);
            return this;
        };

        var internalHover = function (state) {
            if (this.connections.length > 0) {
                for (var i = 0; i < this.connections.length; i++)
                    this.connections[i].setHover(state, false);
            }
            else
                this.setHover(state);
        }.bind(this);

        this.bind("mouseover", function () {
            internalHover(true);
        });
        this.bind("mouseout", function () {
            internalHover(false);
        });

        // ANCHOR MANAGER
        if (!params._transient) // in place copies, for example, are transient.  they will never need to be retrieved during a paint cycle, because they dont move, and then they are deleted.
            this._jsPlumb.instance.anchorManager.add(this, this.elementId);

        this.prepareEndpoint = function(ep, typeId) {
            var _e = function (t, p) {
                var rm = _jsPlumb.getRenderMode();
                if (_jp.Endpoints[rm][t]) return new _jp.Endpoints[rm][t](p);
                if (!_jsPlumb.Defaults.DoNotThrowErrors)
                    throw { msg: "jsPlumb: unknown endpoint type '" + t + "'" };
            };

            var endpointArgs = {
                _jsPlumb: this._jsPlumb.instance,
                cssClass: params.cssClass,
                container: params.container,
                tooltip: params.tooltip,
                connectorTooltip: params.connectorTooltip,
                endpoint: this
            };

            var endpoint;

            if (_ju.isString(ep))
                endpoint = _e(ep, endpointArgs);
            else if (_ju.isArray(ep)) {
                endpointArgs = _ju.merge(ep[1], endpointArgs);
                endpoint = _e(ep[0], endpointArgs);
            }
            else {
                endpoint = ep.clone();
            }

            // assign a clone function using a copy of endpointArgs. this is used when a drag starts: the endpoint that was dragged is cloned,
            // and the clone is left in its place while the original one goes off on a magical journey.
            // the copy is to get around a closure problem, in which endpointArgs ends up getting shared by
            // the whole world.
            //var argsForClone = jsPlumb.extend({}, endpointArgs);
            endpoint.clone = function () {
                // TODO this, and the code above, can be refactored to be more dry.
                if (_ju.isString(ep))
                    return _e(ep, endpointArgs);
                else if (_ju.isArray(ep)) {
                    endpointArgs = _ju.merge(ep[1], endpointArgs);
                    return _e(ep[0], endpointArgs);
                }
            }.bind(this);

            endpoint.typeId = typeId;
            return endpoint;
        };

        this.setEndpoint = function(ep, doNotRepaint) {
            var _ep = this.prepareEndpoint(ep);
            this.setPreparedEndpoint(_ep, true);
        };

        this.setPreparedEndpoint = function (ep, doNotRepaint) {
            if (this.endpoint != null) {
                this.endpoint.cleanup();
                this.endpoint.destroy();
            }
            this.endpoint = ep;
            this.type = this.endpoint.type;
            this.canvas = this.endpoint.canvas;
        };

        _jp.extend(this, params, typeParameters);

        this.isSource = params.isSource || false;
        this.isTemporarySource = params.isTemporarySource || false;
        this.isTarget = params.isTarget || false;

        this.connections = params.connections || [];
        this.connectorPointerEvents = params["connector-pointer-events"];

        this.scope = params.scope || _jsPlumb.getDefaultScope();
        this.timestamp = null;
        this.reattachConnections = params.reattach || _jsPlumb.Defaults.ReattachConnections;
        this.connectionsDetachable = _jsPlumb.Defaults.ConnectionsDetachable;
        if (params.connectionsDetachable === false || params.detachable === false)
            this.connectionsDetachable = false;
        this.dragAllowedWhenFull = params.dragAllowedWhenFull !== false;

        if (params.onMaxConnections)
            this.bind("maxConnections", params.onMaxConnections);

        //
        // add a connection. not part of public API.
        //
        this.addConnection = function (connection) {
            this.connections.push(connection);
            this[(this.connections.length > 0 ? "add" : "remove") + "Class"](_jsPlumb.endpointConnectedClass);
            this[(this.isFull() ? "add" : "remove") + "Class"](_jsPlumb.endpointFullClass);
        };

        this.detachFromConnection = function (connection, idx, doNotCleanup) {
            //idx = idx == null ? findConnectionIndex(connection, this) : idx;
            idx = idx == null ? this.connections.indexOf(connection) : idx;
            if (idx >= 0) {
                this.connections.splice(idx, 1);
                this[(this.connections.length > 0 ? "add" : "remove") + "Class"](_jsPlumb.endpointConnectedClass);
                this[(this.isFull() ? "add" : "remove") + "Class"](_jsPlumb.endpointFullClass);
            }

            if (!doNotCleanup && this._deleteOnDetach && this.connections.length === 0) {
                _jsPlumb.deleteObject({
                    endpoint: this,
                    fireEvent: false,
                    deleteAttachedObjects: false
                });
            }
        };

        this.detach = function (connection, ignoreTarget, forceDetach, fireEvent, originalEvent, endpointBeingDeleted, connectionIndex) {

            var idx = connectionIndex == null ? this.connections.indexOf(connection) : connectionIndex,
                actuallyDetached = false;
            fireEvent = (fireEvent !== false);

            if (idx >= 0) {

                if (forceDetach || connection._forceDetach || (connection.isDetachable() && connection.isDetachAllowed(connection) && this.isDetachAllowed(connection) && _jsPlumb.checkCondition("beforeDetach", connection, endpointBeingDeleted) )) {

                    _jsPlumb.deleteObject({
                        connection: connection,
                        fireEvent: (!ignoreTarget && fireEvent),
                        originalEvent: originalEvent,
                        deleteAttachedObjects: false/**/
                    });
                    actuallyDetached = true;
                }
            }
            return actuallyDetached;
        };

        this.detachAll = function (fireEvent, forceDetach) {
            var unaffectedConns = [];
            while (this.connections.length > 0) {
                // TODO this could pass the index in to the detach method to save some time (index will always be zero in this while loop)
                var actuallyDetached = this.detach(this.connections[0], false, forceDetach === true, fireEvent !== false, null, this, 0);
                if (!actuallyDetached) {
                    unaffectedConns.push(this.connections[0]);
                    this.connections.splice(0, 1);
                }
            }
            this.connections = unaffectedConns;
            return this;
        };
        this.detachFrom = function (targetEndpoint, fireEvent, originalEvent) {
            var c = [];
            for (var i = 0; i < this.connections.length; i++) {
                if (this.connections[i].endpoints[1] == targetEndpoint || this.connections[i].endpoints[0] == targetEndpoint) {
                    c.push(this.connections[i]);
                }
            }
            for (var j = 0; j < c.length; j++) {
                this.detach(c[j], false, true, fireEvent, originalEvent);
            }
            return this;
        };

        this.getElement = function () {
            return this.element;
        };

        this.setElement = function (el) {
            var parentId = this._jsPlumb.instance.getId(el),
                curId = this.elementId;
            // remove the endpoint from the list for the current endpoint's element
            _ju.removeWithFunction(params.endpointsByElement[this.elementId], function (e) {
                return e.id == this.id;
            }.bind(this));
            this.element = jsPlumb.getElement(el);
            this.elementId = _jsPlumb.getId(this.element);
            _jsPlumb.anchorManager.rehomeEndpoint(this, curId, this.element);
            _jsPlumb.dragManager.endpointAdded(this.element);
            _ju.addToList(params.endpointsByElement, parentId, this);
            return this;
        };

        /**
         * private but must be exposed.
         */
        this.makeInPlaceCopy = function () {
            var loc = this.anchor.getCurrentLocation({element: this}),
                o = this.anchor.getOrientation(this),
                acc = this.anchor.getCssClass(),
                inPlaceAnchor = {
                    bind: function () {
                    },
                    compute: function () {
                        return [ loc[0], loc[1] ];
                    },
                    getCurrentLocation: function () {
                        return [ loc[0], loc[1] ];
                    },
                    getOrientation: function () {
                        return o;
                    },
                    getCssClass: function () {
                        return acc;
                    }
                };

            return _newEndpoint({
                dropOptions: params.dropOptions,
                anchor: inPlaceAnchor,
                source: this.element,
                paintStyle: this.getPaintStyle(),
                endpoint: params.hideOnDrag ? "Blank" : this.endpoint,
                _transient: true,
                scope: this.scope,
                reference:this
            });
        };

        /**
         * returns a connection from the pool; used when dragging starts.  just gets the head of the array if it can.
         */
        this.connectorSelector = function () {
            var candidate = this.connections[0];
            // SP target source refactor
            if (/*this.isTarget && */candidate) return candidate;
            else {
                return (this.connections.length < this._jsPlumb.maxConnections) || this._jsPlumb.maxConnections == -1 ? null : candidate;
            }
        };

        this.setStyle = this.setPaintStyle;

        this.paint = function (params) {
            params = params || {};
            var timestamp = params.timestamp, recalc = !(params.recalc === false);
            if (!timestamp || this.timestamp !== timestamp) {

                var info = _jsPlumb.updateOffset({ elId: this.elementId, timestamp: timestamp });

                var xy = params.offset ? params.offset.o : info.o;
                if (xy != null) {
                    var ap = params.anchorPoint, connectorPaintStyle = params.connectorPaintStyle;
                    if (ap == null) {
                        var wh = params.dimensions || info.s,
                            anchorParams = { xy: [ xy.left, xy.top ], wh: wh, element: this, timestamp: timestamp };
                        if (recalc && this.anchor.isDynamic && this.connections.length > 0) {
                            var c = findConnectionToUseForDynamicAnchor(this, params.elementWithPrecedence),
                                oIdx = c.endpoints[0] == this ? 1 : 0,
                                oId = oIdx === 0 ? c.sourceId : c.targetId,
                                oInfo = _jsPlumb.getCachedData(oId),
                                oOffset = oInfo.o, oWH = oInfo.s;
                            anchorParams.txy = [ oOffset.left, oOffset.top ];
                            anchorParams.twh = oWH;
                            anchorParams.tElement = c.endpoints[oIdx];
                        }
                        ap = this.anchor.compute(anchorParams);
                    }

                    this.endpoint.compute(ap, this.anchor.getOrientation(this), this._jsPlumb.paintStyleInUse, connectorPaintStyle || this.paintStyleInUse);
                    this.endpoint.paint(this._jsPlumb.paintStyleInUse, this.anchor);
                    this.timestamp = timestamp;

                    // paint overlays
                    for (var i in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(i)) {
                            var o = this._jsPlumb.overlays[i];
                            if (o.isVisible()) {
                                this._jsPlumb.overlayPlacements[i] = o.draw(this.endpoint, this._jsPlumb.paintStyleInUse);
                                o.paint(this._jsPlumb.overlayPlacements[i]);
                            }
                        }
                    }
                }
            }
        };

        this.getTypeDescriptor = function () {
            return "endpoint";
        };
        this.isVisible = function () {
            return this._jsPlumb.visible;
        };

        this.repaint = this.paint;

        var draggingInitialised = false;
        this.initDraggable = function () {

            // is this a connection source? we make it draggable and have the
            // drag listener maintain a connection with a floating endpoint.
            if (!draggingInitialised && _jp.isDragSupported(this.element)) {
                var placeholderInfo = { id: null, element: null },
                    jpc = null,
                    existingJpc = false,
                    existingJpcParams = null,
                    _dragHandler = _makeConnectionDragHandler(this, placeholderInfo, _jsPlumb),
                    dragOptions = params.dragOptions || {},
                    defaultOpts = {},
                    startEvent = _jp.dragEvents.start,
                    stopEvent = _jp.dragEvents.stop,
                    dragEvent = _jp.dragEvents.drag,
                    beforeStartEvent = _jp.dragEvents.beforeStart,
                    payload;

                // respond to beforeStart from katavorio; this will have, optionally, a payload of attribute values
                // that were placed there by the makeSource mousedown listener.
                var beforeStart = function(beforeStartParams) {
                    payload = beforeStartParams.e.payload || {};
                };

                var start = function (startParams) {

// -------------   first, get a connection to drag. this may be null, in which case we are dragging a new one.

                    jpc = this.connectorSelector();

// -------------------------------- now a bunch of tests about whether or not to proceed -------------------------

                    var _continue = true;
                    // if not enabled, return
                    if (!this.isEnabled()) _continue = false;
                    // if no connection and we're not a source - or temporarily a source, as is the case with makeSource - return.
                    if (jpc == null && !this.isSource && !this.isTemporarySource) _continue = false;
                    // otherwise if we're full and not allowed to drag, also return false.
                    if (this.isSource && this.isFull() && !(jpc != null && this.dragAllowedWhenFull)) _continue = false;
                    // if the connection was setup as not detachable or one of its endpoints
                    // was setup as connectionsDetachable = false, or Defaults.ConnectionsDetachable
                    // is set to false...
                    if (jpc != null && !jpc.isDetachable(this)) _continue = false;

                    var beforeDrag = _jsPlumb.checkCondition(jpc == null ? "beforeDrag" : "beforeStartDetach", {
                        endpoint:this,
                        source:this.element,
                        sourceId:this.elementId,
                        connection:jpc
                    });
                    if (beforeDrag === false) _continue = false;
                    // else we might have been given some data. we'll pass it in to a new connection as 'data'.
                    // here we also merge in the optional payload we were given on mousedown.
                    else if (typeof beforeDrag === "object") {
                        jsPlumb.extend(beforeDrag, payload || {});
                    }
                    else
                        // or if no beforeDrag data, maybe use the payload on its own.
                        beforeDrag = payload || {};

                    if (_continue === false) {
                        // this is for mootools and yui. returning false from this causes jquery to stop drag.
                        // the events are wrapped in both mootools and yui anyway, but i don't think returning
                        // false from the start callback would stop a drag.
                        if (_jsPlumb.stopDrag) _jsPlumb.stopDrag(this.canvas);
                        _dragHandler.stopDrag();
                        return false;
                    }

// ---------------------------------------------------------------------------------------------------------------------

                    // ok to proceed.

                    // clear hover for all connections for this endpoint before continuing.
                    for (var i = 0; i < this.connections.length; i++)
                        this.connections[i].setHover(false);

                    this.addClass("endpointDrag");
                    _jsPlumb.setConnectionBeingDragged(true);

                    // if we're not full but there was a connection, make it null. we'll create a new one.
                    if (jpc && !this.isFull() && this.isSource) jpc = null;

                    _jsPlumb.updateOffset({ elId: this.elementId });

// ----------------    make the element we will drag around, and position it -----------------------------

                    var ipco = this._jsPlumb.instance.getOffset(this.canvas),
                        canvasElement = this.canvas,
                        ips = this._jsPlumb.instance.getSize(this.canvas);

                    _makeDraggablePlaceholder(placeholderInfo, _jsPlumb, ipco, ips);

                    // store the id of the dragging div and the source element. the drop function will pick these up.                   
                    _jsPlumb.setAttributes(this.canvas, {
                        "dragId": placeholderInfo.id,
                        "elId": this.elementId
                    });

// ------------------- create an endpoint that will be our floating endpoint ------------------------------------

                    var endpointToFloat = this.dragProxy || this.endpoint;
                    if (this.dragProxy == null && this.connectionType != null) {
                        var aae = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(this.connectionType);
                        if (aae.endpoints[1]) endpointToFloat = aae.endpoints[1];
                    }
                    var centerAnchor = this._jsPlumb.instance.makeAnchor("Center");
                    centerAnchor.isFloating = true;
                    this._jsPlumb.floatingEndpoint = _makeFloatingEndpoint(this.getPaintStyle(), centerAnchor, endpointToFloat, this.canvas, placeholderInfo.element, _jsPlumb, _newEndpoint, this.scope);
                    var _savedAnchor = this._jsPlumb.floatingEndpoint.anchor;


                    if (jpc == null) {

                        this.setHover(false, false);
                        // create a connection. one end is this endpoint, the other is a floating endpoint.                    
                        jpc = _newConnection({
                            sourceEndpoint: this,
                            targetEndpoint: this._jsPlumb.floatingEndpoint,
                            source: this.element,  // for makeSource with parent option.  ensure source element is represented correctly.
                            target: placeholderInfo.element,
                            anchors: [ this.anchor, this._jsPlumb.floatingEndpoint.anchor ],
                            paintStyle: params.connectorStyle, // this can be null. Connection will use the default.
                            hoverPaintStyle: params.connectorHoverStyle,
                            connector: params.connector, // this can also be null. Connection will use the default.
                            overlays: params.connectorOverlays,
                            type: this.connectionType,
                            cssClass: this.connectorClass,
                            hoverClass: this.connectorHoverClass,
                            data:beforeDrag
                        });
                        jpc.pending = true;
                        jpc.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.anchor = _savedAnchor;
                        // fire an event that informs that a connection is being dragged
                        _jsPlumb.fire("connectionDrag", jpc);

                        // register the new connection on the drag manager. This connection, at this point, is 'pending',
                        // and has as its target a temporary element (the 'placeholder'). If the connection subsequently
                        // becomes established, the anchor manager is informed that the target of the connection has
                        // changed.

                        _jsPlumb.anchorManager.newConnection(jpc);

                    } else {
                        existingJpc = true;
                        jpc.setHover(false);
                        // new anchor idx
                        var anchorIdx = jpc.endpoints[0].id == this.id ? 0 : 1;
                        this.detachFromConnection(jpc, null, true);                         // detach from the connection while dragging is occurring. but dont cleanup automatically.

                        // store the original scope (issue 57)
                        var dragScope = _jsPlumb.getDragScope(canvasElement);
                        _jsPlumb.setAttribute(this.canvas, "originalScope", dragScope);

                        // fire an event that informs that a connection is being dragged. we do this before
                        // replacing the original target with the floating element info.
                        _jsPlumb.fire("connectionDrag", jpc);

                        // now we replace ourselves with the temporary div we created above:
                        if (anchorIdx === 0) {
                            existingJpcParams = [ jpc.source, jpc.sourceId, canvasElement, dragScope ];
                            jpc.source = placeholderInfo.element;
                            jpc.sourceId = placeholderInfo.id;

                            _jsPlumb.anchorManager.sourceChanged(jpc.endpoints[anchorIdx].elementId, jpc.sourceId, jpc);

                        } else {
                            existingJpcParams = [ jpc.target, jpc.targetId, canvasElement, dragScope ];
                            jpc.target = placeholderInfo.element;
                            jpc.targetId = placeholderInfo.id;

                            _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.endpoints[anchorIdx].elementId, jpc.targetId, jpc);
                        }

                        // lock the other endpoint; if it is dynamic it will not move while the drag is occurring.
                        // TODO SP i commented this out as part of the rewirte; i think now we want the other endpoint
                        // to behave naturally.
                        // SJP
                        //jpc.endpoints[anchorIdx === 0 ? 1 : 0].anchor.locked = true;


                        // store the original endpoint and assign the new floating endpoint for the drag.
                        jpc.suspendedEndpoint = jpc.endpoints[anchorIdx];

                        // PROVIDE THE SUSPENDED ELEMENT, BE IT A SOURCE OR TARGET (ISSUE 39)
                        jpc.suspendedElement = jpc.endpoints[anchorIdx].getElement();
                        jpc.suspendedElementId = jpc.endpoints[anchorIdx].elementId;
                        jpc.suspendedElementType = anchorIdx === 0 ? "source" : "target";

                        jpc.suspendedEndpoint.setHover(false);
                        this._jsPlumb.floatingEndpoint.referenceEndpoint = jpc.suspendedEndpoint;
                        jpc.endpoints[anchorIdx] = this._jsPlumb.floatingEndpoint;

                        jpc.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.addClass(_jsPlumb.draggingClass);
                    }

                    // register it and register connection on it.
                    _jsPlumb.floatingConnections[placeholderInfo.id] = jpc;
                    // only register for the target endpoint; we will not be dragging the source at any time
                    // before this connection is either discarded or made into a permanent connection.
                    _ju.addToList(params.endpointsByElement, placeholderInfo.id, this._jsPlumb.floatingEndpoint);
                    // tell jsplumb about it
                    _jsPlumb.currentlyDragging = true;
                }.bind(this);

                var stop = function () {
                    _jsPlumb.setConnectionBeingDragged(false);

                    if (jpc && jpc.endpoints != null) {
                        // get the actual drop event (decode from library args to stop function)
                        var originalEvent = _jsPlumb.getDropEvent(arguments);
                        // unlock the other endpoint (if it is dynamic, it would have been locked at drag start)
                        var idx = _jsPlumb.getFloatingAnchorIndex(jpc);
                        jpc.endpoints[idx === 0 ? 1 : 0].anchor.locked = false;
                        // TODO: Dont want to know about css classes inside jsplumb, ideally.
                        jpc.removeClass(_jsPlumb.draggingClass);

                        // if we have the floating endpoint then the connection has not been dropped
                        // on another endpoint.  If it is a new connection we throw it away. If it is an
                        // existing connection we check to see if we should reattach it, throwing it away
                        // if not.
                        if (this._jsPlumb && (jpc.deleteConnectionNow || jpc.endpoints[idx] == this._jsPlumb.floatingEndpoint)) {
                            // 6a. if the connection was an existing one...
                            if (existingJpc && jpc.suspendedEndpoint) {
                                // fix for issue35, thanks Sylvain Gizard: when firing the detach event make sure the
                                // floating endpoint has been replaced.
                                if (idx === 0) {
                                    jpc.floatingElement = jpc.source;
                                    jpc.floatingId = jpc.sourceId;
                                    jpc.floatingEndpoint = jpc.endpoints[0];
                                    jpc.floatingIndex = 0;
                                    jpc.source = existingJpcParams[0];
                                    jpc.sourceId = existingJpcParams[1];
                                } else {
                                    // keep a copy of the floating element; the anchor manager will want to clean up.
                                    jpc.floatingElement = jpc.target;
                                    jpc.floatingId = jpc.targetId;
                                    jpc.floatingEndpoint = jpc.endpoints[1];
                                    jpc.floatingIndex = 1;
                                    jpc.target = existingJpcParams[0];
                                    jpc.targetId = existingJpcParams[1];
                                }

                                var fe = this._jsPlumb.floatingEndpoint; // store for later removal.
                                // restore the original scope (issue 57)
                                _jsPlumb.setDragScope(existingJpcParams[2], existingJpcParams[3]);
                                jpc.endpoints[idx] = jpc.suspendedEndpoint;
                                // IF the connection should be reattached, or the other endpoint refuses detach, then
                                // reset the connection to its original state
                                if (jpc.isReattach() || jpc._forceReattach || jpc._forceDetach || !jpc.endpoints[idx === 0 ? 1 : 0].detach(jpc, false, false, true, originalEvent, true)) {
                                    jpc.setHover(false);
                                    jpc._forceDetach = null;
                                    jpc._forceReattach = null;
                                    this._jsPlumb.floatingEndpoint.detachFromConnection(jpc);
                                    jpc.suspendedEndpoint.addConnection(jpc);

                                    // TODO this code is duplicated in lots of places...and there is nothing external
                                    // in the code; it all refers to the connection itself. we could add a
                                    // `checkSanity(connection)` method to anchorManager that did this.
                                    if (idx == 1) {
                                        _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.floatingId, jpc.targetId, jpc);
                                    }
                                    else {
                                        _jsPlumb.anchorManager.sourceChanged(jpc.floatingId, jpc.sourceId, jpc);
                                    }

                                    _jsPlumb.repaint(existingJpcParams[1]);
                                }
                                else {
                                    _jsPlumb.deleteObject({endpoint: fe});
                                }
                            }
                        }

                        // makeTargets sets this flag, to tell us we have been replaced and should delete this object.
                        if (this.deleteAfterDragStop) {
                            _jsPlumb.deleteObject({endpoint: this});
                        }
                        else {
                            if (this._jsPlumb) {
                                 this.paint({recalc: false});
                            }
                        }

                        // although the connection is no longer valid, there are use cases where this is useful.
                        _jsPlumb.fire("connectionDragStop", jpc, originalEvent);
                        // tell jsplumb that dragging is finished.
                        _jsPlumb.currentlyDragging = false;
                        jpc = null;
                    }

                    // if no endpoints, jpc already cleaned up. but still we want to ensure we're reset properly.
                    // remove the element associated with the floating endpoint
                    // (and its associated floating endpoint and visual artefacts)
                    if (placeholderInfo && placeholderInfo.element) {
                        _jsPlumb.remove(placeholderInfo.element, false, false);
                    }
                    // remove the inplace copy
                    if (inPlaceCopy) {
                        _jsPlumb.deleteObject({endpoint: inPlaceCopy});
                    }

                    if (this._jsPlumb) {
                        // make our canvas visible (TODO: hand off to library; we should not know about DOM)
                        this.canvas.style.visibility = "visible";
                        // unlock our anchor
                        this.anchor.locked = false;
                        // clear floating anchor.
                        this._jsPlumb.floatingEndpoint = null;
                    }

                }.bind(this);

                dragOptions = _jp.extend(defaultOpts, dragOptions);
                dragOptions.scope = this.scope || dragOptions.scope;
                dragOptions[beforeStartEvent] = _ju.wrap(dragOptions[beforeStartEvent], beforeStart, false);
                dragOptions[startEvent] = _ju.wrap(dragOptions[startEvent], start, false);
                // extracted drag handler function so can be used by makeSource
                dragOptions[dragEvent] = _ju.wrap(dragOptions[dragEvent], _dragHandler.drag);
                dragOptions[stopEvent] = _ju.wrap(dragOptions[stopEvent], stop);
                dragOptions.multipleDrop = false;

                dragOptions.canDrag = function () {
                    return this.isSource || this.isTemporarySource || /*(this.isTarget && */this.connections.length > 0/*)*/;
                }.bind(this);

                _jsPlumb.initDraggable(this.canvas, dragOptions, "internal");

                this.canvas._jsPlumbRelatedElement = this.element;

                draggingInitialised = true;
            }
        };

        var ep = params.endpoint || this._jsPlumb.instance.Defaults.Endpoint || _jp.Defaults.Endpoint;
        this.setEndpoint(ep, true);
        var anchorParamsToUse = params.anchor ? params.anchor : params.anchors ? params.anchors : (_jsPlumb.Defaults.Anchor || "Top");
        this.setAnchor(anchorParamsToUse, true);

        // finally, set type if it was provided
        var type = [ "default", (params.type || "")].join(" ");
        this.addType(type, params.data, true);
        this.canvas = this.endpoint.canvas;
        this.canvas._jsPlumb = this;

        this.initDraggable();

        // pulled this out into a function so we can reuse it for the inPlaceCopy canvas; you can now drop detached connections
        // back onto the endpoint you detached it from.
        var _initDropTarget = function (canvas, isTransient, endpoint, referenceEndpoint) {

            if (_jp.isDropSupported(this.element)) {
                var dropOptions = params.dropOptions || _jsPlumb.Defaults.DropOptions || _jp.Defaults.DropOptions;
                dropOptions = _jp.extend({}, dropOptions);
                dropOptions.scope = dropOptions.scope || this.scope;
                var dropEvent = _jp.dragEvents.drop,
                    overEvent = _jp.dragEvents.over,
                    outEvent = _jp.dragEvents.out,
                    _ep = this,
                    drop = _jsPlumb.EndpointDropHandler({
                        getEndpoint: function () {
                            return _ep;
                        },
                        jsPlumb: _jsPlumb,
                        enabled: function () {
                            return endpoint != null ? endpoint.isEnabled() : true;
                        },
                        isFull: function () {
                            return endpoint.isFull();
                        },
                        element: this.element,
                        elementId: this.elementId,
                        isSource: this.isSource,
                        isTarget: this.isTarget,
                        addClass: function (clazz) {
                            _ep.addClass(clazz);
                        },
                        removeClass: function (clazz) {
                            _ep.removeClass(clazz);
                        },
                        isDropAllowed: function () {
                            return _ep.isDropAllowed.apply(_ep, arguments);
                        },
                        reference:referenceEndpoint,
                        isRedrop:function(jpc, dhParams) {
                            return jpc.suspendedEndpoint && dhParams.reference && (jpc.suspendedEndpoint.id === dhParams.reference.id);
                        }
                    });

                dropOptions[dropEvent] = _ju.wrap(dropOptions[dropEvent], drop, true);
                dropOptions[overEvent] = _ju.wrap(dropOptions[overEvent], function () {
                    var draggable = _jp.getDragObject(arguments),
                        id = _jsPlumb.getAttribute(_jp.getElement(draggable), "dragId"),
                        _jpc = _jsPlumb.floatingConnections[id];

                    if (_jpc != null) {
                        var idx = _jsPlumb.getFloatingAnchorIndex(_jpc);
                        // here we should fire the 'over' event if we are a target and this is a new connection,
                        // or we are the same as the floating endpoint.
                        var _cont = (this.isTarget && idx !== 0) || (_jpc.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == _jpc.suspendedEndpoint.id);
                        if (_cont) {
                            var bb = _jsPlumb.checkCondition("checkDropAllowed", {
                                sourceEndpoint: _jpc.endpoints[idx],
                                targetEndpoint: this,
                                connection: _jpc
                            });
                            this[(bb ? "add" : "remove") + "Class"](_jsPlumb.endpointDropAllowedClass);
                            this[(bb ? "remove" : "add") + "Class"](_jsPlumb.endpointDropForbiddenClass);
                            _jpc.endpoints[idx].anchor.over(this.anchor, this);
                        }
                    }
                }.bind(this));

                dropOptions[outEvent] = _ju.wrap(dropOptions[outEvent], function () {
                    var draggable = _jp.getDragObject(arguments),
                        id = draggable == null ? null : _jsPlumb.getAttribute(_jp.getElement(draggable), "dragId"),
                        _jpc = id ? _jsPlumb.floatingConnections[id] : null;

                    if (_jpc != null) {
                        var idx = _jsPlumb.getFloatingAnchorIndex(_jpc);
                        var _cont = (this.isTarget && idx !== 0) || (_jpc.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == _jpc.suspendedEndpoint.id);
                        if (_cont) {
                            this.removeClass(_jsPlumb.endpointDropAllowedClass);
                            this.removeClass(_jsPlumb.endpointDropForbiddenClass);
                            _jpc.endpoints[idx].anchor.out();
                        }
                    }
                }.bind(this));

                _jsPlumb.initDroppable(canvas, dropOptions, "internal", isTransient);
            }
        }.bind(this);

        // Initialise the endpoint's canvas as a drop target. The drop handler will take care of the logic of whether
        // something can actually be dropped.
        if (!this.anchor.isFloating)
            _initDropTarget(this.canvas, !(params._transient || this.anchor.isFloating), this, params.reference);


        return this;
    };

    _ju.extend(_jp.Endpoint, _jp.OverlayCapableJsPlumbUIComponent, {

        setVisible: function (v, doNotChangeConnections, doNotNotifyOtherEndpoint) {
            this._jsPlumb.visible = v;
            if (this.canvas) this.canvas.style.display = v ? "block" : "none";
            this[v ? "showOverlays" : "hideOverlays"]();
            if (!doNotChangeConnections) {
                for (var i = 0; i < this.connections.length; i++) {
                    this.connections[i].setVisible(v);
                    if (!doNotNotifyOtherEndpoint) {
                        var oIdx = this === this.connections[i].endpoints[0] ? 1 : 0;
                        // only change the other endpoint if this is its only connection.
                        if (this.connections[i].endpoints[oIdx].connections.length == 1) this.connections[i].endpoints[oIdx].setVisible(v, true, true);
                    }
                }
            }
        },
        getAttachedElements: function () {
            return this.connections;
        },
        applyType: function (t, doNotRepaint) {
            this.setPaintStyle(t.endpointStyle || t.paintStyle, doNotRepaint);
            this.setHoverPaintStyle(t.endpointHoverStyle || t.hoverPaintStyle, doNotRepaint);
            if (t.maxConnections != null) this._jsPlumb.maxConnections = t.maxConnections;
            if (t.scope) this.scope = t.scope;
            _jp.extend(this, t, typeParameters);
            if (t.cssClass != null && this.canvas) this._jsPlumb.instance.addClass(this.canvas, t.cssClass);
            _jp.OverlayCapableJsPlumbUIComponent.applyType(this, t);
        },
        isEnabled: function () {
            return this._jsPlumb.enabled;
        },
        setEnabled: function (e) {
            this._jsPlumb.enabled = e;
        },
        cleanup: function () {
            var anchorClass = this._jsPlumb.instance.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");
            jsPlumb.removeClass(this.element, anchorClass);
            this.anchor = null;
            this.endpoint.cleanup(true);
            this.endpoint.destroy();
            this.endpoint = null;
            // drag/drop
            this._jsPlumb.instance.destroyDraggable(this.canvas, "internal");
            this._jsPlumb.instance.destroyDroppable(this.canvas, "internal");
        },
        setHover: function (h) {
            if (this.endpoint && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged())
                this.endpoint.setHover(h);
        },
        isFull: function () {
            return this._jsPlumb.maxConnections === 0 ? true : !(this.isFloating() || this._jsPlumb.maxConnections < 0 || this.connections.length < this._jsPlumb.maxConnections);
        },
        /**
         * private but needs to be exposed.
         */
        isFloating: function () {
            return this.anchor != null && this.anchor.isFloating;
        },
        isConnectedTo: function (endpoint) {
            var found = false;
            if (endpoint) {
                for (var i = 0; i < this.connections.length; i++) {
                    if (this.connections[i].endpoints[1] == endpoint || this.connections[i].endpoints[0] == endpoint) {
                        found = true;
                        break;
                    }
                }
            }
            return found;
        },
        getConnectionCost: function () {
            return this._jsPlumb.connectionCost;
        },
        setConnectionCost: function (c) {
            this._jsPlumb.connectionCost = c;
        },
        areConnectionsDirected: function () {
            return this._jsPlumb.connectionsDirected;
        },
        setConnectionsDirected: function (b) {
            this._jsPlumb.connectionsDirected = b;
        },
        setElementId: function (_elId) {
            this.elementId = _elId;
            this.anchor.elementId = _elId;
        },
        setReferenceElement: function (_el) {
            this.element = _jp.getElement(_el);
        },
        setDragAllowedWhenFull: function (allowed) {
            this.dragAllowedWhenFull = allowed;
        },
        equals: function (endpoint) {
            return this.anchor.equals(endpoint.anchor);
        },
        getUuid: function () {
            return this._jsPlumb.uuid;
        },
        computeAnchor: function (params) {
            return this.anchor.compute(params);
        }
    });

    root.jsPlumbInstance.prototype.EndpointDropHandler = function (dhParams) {
        return function (e) {

            var _jsPlumb = dhParams.jsPlumb;

            // remove the classes that are added dynamically. drop is neither forbidden nor allowed now that
            // the drop is finishing.
            dhParams.removeClass(_jsPlumb.endpointDropAllowedClass);
            dhParams.removeClass(_jsPlumb.endpointDropForbiddenClass);

            var originalEvent = _jsPlumb.getDropEvent(arguments),
                draggable = _jsPlumb.getDragObject(arguments),
                id = _jsPlumb.getAttribute(draggable, "dragId"),
                elId = _jsPlumb.getAttribute(draggable, "elId"),
                scope = _jsPlumb.getAttribute(draggable, "originalScope"),
                jpc = _jsPlumb.floatingConnections[id];

            // if no active connection, bail.
            if (jpc == null) return;

            // calculate if this is an existing connection.
            var existingConnection = jpc.suspendedEndpoint != null;

            // if suspended endpoint exists but has been cleaned up, bail. This means it's an existing connection
            // that has been detached and will shortly be discarded.
            if (existingConnection && jpc.suspendedEndpoint._jsPlumb == null) return;

            // get the drop endpoint. for a normal connection this is just the one that would replace the currently
            // floating endpoint. for a makeTarget this is a new endpoint that is created on drop. But we leave that to
            // the handler to figure out.
            var _ep = dhParams.getEndpoint(jpc);

            // If we're not given an endpoint to use, bail.
            if (_ep == null) return;

            // if this is a drop back where the connection came from, mark it force reattach and
            // return; the stop handler will reattach. without firing an event.
            if (dhParams.isRedrop(jpc, dhParams)) {
                jpc._forceReattach = true;
                jpc.setHover(false);
                if (dhParams.maybeCleanup) dhParams.maybeCleanup(_ep);
                return;
            }

            // ensure we dont bother trying to drop sources on non-source eps, and same for target.
            var idx = _jsPlumb.getFloatingAnchorIndex(jpc);
            if ((idx === 0 && !dhParams.isSource)|| (idx === 1 && !dhParams.isTarget)){
                if (dhParams.maybeCleanup) dhParams.maybeCleanup(_ep);
                return;
            }

            if (dhParams.onDrop) dhParams.onDrop(jpc);

            // restore the original scope if necessary (issue 57)
            if (scope) _jsPlumb.setDragScope(draggable, scope);

            // if the target of the drop is full, fire an event (we abort below)
            // makeTarget: keep.
            var isFull = dhParams.isFull(e);
            if (isFull) {
                _ep.fire("maxConnections", {
                    endpoint: this,
                    connection: jpc,
                    maxConnections: _ep._jsPlumb.maxConnections
                }, originalEvent);
            }
            //
            // if endpoint enabled, not full, and matches the index of the floating endpoint...
            if (!isFull &&  dhParams.enabled()) {
                var _doContinue = true;

                // before testing for beforeDrop, reset the connection's source/target to be the actual DOM elements
                // involved (that is, stash any temporary stuff used for dragging. but we need to keep it around in
                // order that the anchor manager can clean things up properly).
                if (idx === 0) {
                    jpc.floatingElement = jpc.source;
                    jpc.floatingId = jpc.sourceId;
                    jpc.floatingEndpoint = jpc.endpoints[0];
                    jpc.floatingIndex = 0;
                    jpc.source = dhParams.element;
                    jpc.sourceId = dhParams.elementId;
                } else {
                    jpc.floatingElement = jpc.target;
                    jpc.floatingId = jpc.targetId;
                    jpc.floatingEndpoint = jpc.endpoints[1];
                    jpc.floatingIndex = 1;
                    jpc.target = dhParams.element;
                    jpc.targetId = dhParams.elementId;
                }

                // if this is an existing connection and detach is not allowed we won't continue. The connection's
                // endpoints have been reinstated; everything is back to how it was.
                if (existingConnection && jpc.suspendedEndpoint.id != _ep.id) {

                    if (!jpc.isDetachAllowed(jpc) || !jpc.endpoints[idx].isDetachAllowed(jpc) || !jpc.suspendedEndpoint.isDetachAllowed(jpc) || !_jsPlumb.checkCondition("beforeDetach", jpc))
                        _doContinue = false;
                }

// ------------ wrap the execution path in a function so we can support asynchronous beforeDrop

                var continueFunction = function (optionalData) {
                    // remove this jpc from the current endpoint, which is a floating endpoint that we will
                    // subsequently discard.
                    jpc.endpoints[idx].detachFromConnection(jpc);

                    // if there's a suspended endpoint, detach it from the connection.
                    if (jpc.suspendedEndpoint) jpc.suspendedEndpoint.detachFromConnection(jpc);

                    jpc.endpoints[idx] = _ep;
                    _ep.addConnection(jpc);

                    // copy our parameters in to the connection:
                    var params = _ep.getParameters();
                    for (var aParam in params)
                        jpc.setParameter(aParam, params[aParam]);

                    if (!existingConnection) {
                        // if not an existing connection and
                        if (params.draggable)
                            _jsPlumb.initDraggable(this.element, dragOptions, "internal", _jsPlumb);
                    }
                    else {
                        var suspendedElementId = jpc.suspendedEndpoint.elementId;
                        _jsPlumb.fireMoveEvent({
                            index: idx,
                            originalSourceId: idx === 0 ? suspendedElementId : jpc.sourceId,
                            newSourceId: idx === 0 ? _ep.elementId : jpc.sourceId,
                            originalTargetId: idx == 1 ? suspendedElementId : jpc.targetId,
                            newTargetId: idx == 1 ? _ep.elementId : jpc.targetId,
                            originalSourceEndpoint: idx === 0 ? jpc.suspendedEndpoint : jpc.endpoints[0],
                            newSourceEndpoint: idx === 0 ? _ep : jpc.endpoints[0],
                            originalTargetEndpoint: idx == 1 ? jpc.suspendedEndpoint : jpc.endpoints[1],
                            newTargetEndpoint: idx == 1 ? _ep : jpc.endpoints[1],
                            connection: jpc
                        }, originalEvent);
                    }

                    if (idx == 1) {
                        _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.floatingId, jpc.targetId, jpc);
                    }
                    else {
                        _jsPlumb.anchorManager.sourceChanged(jpc.floatingId, jpc.sourceId, jpc);
                    }

                    // when makeSource has uniqueEndpoint:true, we want to create connections with new endpoints
                    // that are subsequently deleted. So makeSource sets `finalEndpoint`, which is the Endpoint to
                    // which the connection should be attached. The `detachFromConnection` call below results in the
                    // temporary endpoint being cleaned up.
                    if (jpc.endpoints[0].finalEndpoint) {
                        var _toDelete = jpc.endpoints[0];
                        _toDelete.detachFromConnection(jpc);
                        jpc.endpoints[0] = jpc.endpoints[0].finalEndpoint;
                        jpc.endpoints[0].addConnection(jpc);
                    }

                    // if optionalData was given, merge it onto the connection's data.
                    if (jsPlumbUtil.isObject(optionalData)) {
                        jpc.mergeData(optionalData);
                    }
                    // finalise will inform the anchor manager and also add to
                    // connectionsByScope if necessary.
                    _jsPlumb.finaliseConnection(jpc, null, originalEvent, false);
                    jpc.setHover(false);

                }.bind(this);

                var dontContinueFunction = function () {
                    // otherwise just put it back on the endpoint it was on before the drag.
                    if (jpc.suspendedEndpoint) {
                        jpc.endpoints[idx] = jpc.suspendedEndpoint;
                        jpc.setHover(false);
                        jpc._forceDetach = true;
                        if (idx === 0) {
                            jpc.source = jpc.suspendedEndpoint.element;
                            jpc.sourceId = jpc.suspendedEndpoint.elementId;
                        } else {
                            jpc.target = jpc.suspendedEndpoint.element;
                            jpc.targetId = jpc.suspendedEndpoint.elementId;
                        }
                        jpc.suspendedEndpoint.addConnection(jpc);

                        // TODO checkSanity
                        if (idx == 1) {
                            _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.floatingId, jpc.targetId, jpc);
                        }
                        else {
                            _jsPlumb.anchorManager.sourceChanged(jpc.floatingId, jpc.sourceId, jpc);
                        }

                        _jsPlumb.repaint(jpc.sourceId);
                        jpc._forceDetach = false;
                    }
                };

// --------------------------------------
                // now check beforeDrop.  this will be available only on Endpoints that are setup to
                // have a beforeDrop condition (although, secretly, under the hood all Endpoints and
                // the Connection have them, because they are on jsPlumbUIComponent.  shhh!), because
                // it only makes sense to have it on a target endpoint.
                _doContinue = _doContinue && dhParams.isDropAllowed(jpc.sourceId, jpc.targetId, jpc.scope, jpc, _ep);// && jpc.pending;

                if (_doContinue) {
                    continueFunction(_doContinue);
                    return true;
                }
                else {
                    dontContinueFunction();
                }
            }

            if (dhParams.maybeCleanup) dhParams.maybeCleanup(_ep);

            _jsPlumb.currentlyDragging = false;
        };
    };
}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for Connections.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this,
        _jp = root.jsPlumb,
        _ju = root.jsPlumbUtil;


    var makeConnector = function (_jsPlumb, renderMode, connectorName, connectorArgs, forComponent) {
            if (!_jsPlumb.Defaults.DoNotThrowErrors && jsPlumb.Connectors[renderMode][connectorName] == null)
                throw { msg: "jsPlumb: unknown connector type '" + connectorName + "'" };

            return new _jp.Connectors[renderMode][connectorName](connectorArgs, forComponent);
        },
        _makeAnchor = function (anchorParams, elementId, _jsPlumb) {
            return (anchorParams) ? _jsPlumb.makeAnchor(anchorParams, elementId, _jsPlumb) : null;
        },
        _updateConnectedClass = function (conn, element, _jsPlumb, remove) {
            if (element != null) {
                element._jsPlumbConnections = element._jsPlumbConnections || {};
                if (remove)
                    delete element._jsPlumbConnections[conn.id];
                else
                    element._jsPlumbConnections[conn.id] = true;

                if (_ju.isEmpty(element._jsPlumbConnections)) {
                    _jsPlumb.removeClass(element, _jsPlumb.connectedClass);
                }
                else
                    _jsPlumb.addClass(element, _jsPlumb.connectedClass);
            }
        };

    _jp.Connection = function (params) {
        var _newEndpoint = params.newEndpoint;

        this.id = params.id;
        this.connector = null;
        this.idPrefix = "_jsplumb_c_";
        this.defaultLabelLocation = 0.5;
        this.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"];
        // if a new connection is the result of moving some existing connection, params.previousConnection
        // will have that Connection in it. listeners for the jsPlumbConnection event can look for that
        // member and take action if they need to.
        this.previousConnection = params.previousConnection;
        this.source = _jp.getElement(params.source);
        this.target = _jp.getElement(params.target);
        // sourceEndpoint and targetEndpoint override source/target, if they are present. but 
        // source is not overridden if the Endpoint has declared it is not the final target of a connection;
        // instead we use the source that the Endpoint declares will be the final source element.
        if (params.sourceEndpoint) this.source = params.sourceEndpoint.getElement();
        if (params.targetEndpoint) this.target = params.targetEndpoint.getElement();

        _jp.OverlayCapableJsPlumbUIComponent.apply(this, arguments);

        this.sourceId = this._jsPlumb.instance.getId(this.source);
        this.targetId = this._jsPlumb.instance.getId(this.target);
        this.scope = params.scope; // scope may have been passed in to the connect call. if it wasn't, we will pull it from the source endpoint, after having initialised the endpoints.            
        this.endpoints = [];
        this.endpointStyles = [];

        var _jsPlumb = this._jsPlumb.instance;

        _jsPlumb.manage(this.sourceId, this.source);
        _jsPlumb.manage(this.targetId, this.target);

        this._jsPlumb.visible = true;
        this._jsPlumb.editable = params.editable === true;
        this._jsPlumb.params = {
            cssClass: params.cssClass,
            container: params.container,
            "pointer-events": params["pointer-events"],
            editorParams: params.editorParams,
            overlays: params.overlays
        };
        this._jsPlumb.lastPaintedAt = null;

        // listen to mouseover and mouseout events passed from the container delegate.
        this.bind("mouseover", function () {
            this.setHover(true);
        }.bind(this));
        this.bind("mouseout", function () {
            this.setHover(false);
        }.bind(this));

// INITIALISATION CODE

        this.makeEndpoint = function (isSource, el, elId, ep) {
            elId = elId || this._jsPlumb.instance.getId(el);
            return this.prepareEndpoint(_jsPlumb, _newEndpoint, this, ep, isSource ? 0 : 1, params, el, elId);
        };

        // if type given, get the endpoint definitions mapping to that type from the jsplumb instance, and use those.
        // we apply types at the end of this constructor but endpoints are only honoured in a type definition at
        // create time.
        if (params.type) {
            params.endpoints = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(params.type).endpoints;
        }

        var eS = this.makeEndpoint(true, this.source, this.sourceId, params.sourceEndpoint),
            eT = this.makeEndpoint(false, this.target, this.targetId, params.targetEndpoint);

        if (eS) _ju.addToList(params.endpointsByElement, this.sourceId, eS);
        if (eT) _ju.addToList(params.endpointsByElement, this.targetId, eT);
        // if scope not set, set it to be the scope for the source endpoint.
        if (!this.scope) this.scope = this.endpoints[0].scope;

        // if explicitly told to (or not to) delete endpoints on detach, override endpoint's preferences
        if (params.deleteEndpointsOnDetach != null) {
            this.endpoints[0]._deleteOnDetach = params.deleteEndpointsOnDetach;
            this.endpoints[1]._deleteOnDetach = params.deleteEndpointsOnDetach;
        }
        else {
            // otherwise, unless the endpoints say otherwise, mark them for deletion.
            if (!this.endpoints[0]._doNotDeleteOnDetach) this.endpoints[0]._deleteOnDetach = true;
            if (!this.endpoints[1]._doNotDeleteOnDetach) this.endpoints[1]._deleteOnDetach = true;
        }

// -------------------------- DEFAULT TYPE ---------------------------------------------

        // DETACHABLE
        var _detachable = _jsPlumb.Defaults.ConnectionsDetachable;
        if (params.detachable === false) _detachable = false;
        if (this.endpoints[0].connectionsDetachable === false) _detachable = false;
        if (this.endpoints[1].connectionsDetachable === false) _detachable = false;
        // REATTACH
        var _reattach = params.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || _jsPlumb.Defaults.ReattachConnections;

        this.appendToDefaultType({
            detachable: _detachable,
            rettach: _reattach,
            paintStyle:this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || params.paintStyle || _jsPlumb.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle,
            hoverPaintStyle:this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || params.hoverPaintStyle || _jsPlumb.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle
        });


        var _suspendedAt = _jsPlumb.getSuspendedAt();
        if (!_jsPlumb.isSuspendDrawing()) {
            // paint the endpoints
            var myInfo = _jsPlumb.getCachedData(this.sourceId),
                myOffset = myInfo.o, myWH = myInfo.s,
                otherInfo = _jsPlumb.getCachedData(this.targetId),
                otherOffset = otherInfo.o,
                otherWH = otherInfo.s,
                initialTimestamp = _suspendedAt || _jsPlumb.timestamp(),
                anchorLoc = this.endpoints[0].anchor.compute({
                    xy: [ myOffset.left, myOffset.top ], wh: myWH, element: this.endpoints[0],
                    elementId: this.endpoints[0].elementId,
                    txy: [ otherOffset.left, otherOffset.top ], twh: otherWH, tElement: this.endpoints[1],
                    timestamp: initialTimestamp
                });

            this.endpoints[0].paint({ anchorLoc: anchorLoc, timestamp: initialTimestamp });

            anchorLoc = this.endpoints[1].anchor.compute({
                xy: [ otherOffset.left, otherOffset.top ], wh: otherWH, element: this.endpoints[1],
                elementId: this.endpoints[1].elementId,
                txy: [ myOffset.left, myOffset.top ], twh: myWH, tElement: this.endpoints[0],
                timestamp: initialTimestamp
            });
            this.endpoints[1].paint({ anchorLoc: anchorLoc, timestamp: initialTimestamp });
        }

        this.getTypeDescriptor = function () {
            return "connection";
        };
        this.getAttachedElements = function () {
            return this.endpoints;
        };

        this.isDetachable = function () {
            return this._jsPlumb.detachable === true;
        };
        this.setDetachable = function (detachable) {
            this._jsPlumb.detachable = detachable === true;
        };
        this.isReattach = function () {
            return this._jsPlumb.reattach === true || this.endpoints[0].reattachConnections === true || this.endpoints[1].reattachConnections === true;
        };
        this.setReattach = function (reattach) {
            this._jsPlumb.reattach = reattach === true;
        };

// END INITIALISATION CODE


// COST + DIRECTIONALITY
        // if cost not supplied, try to inherit from source endpoint
        this._jsPlumb.cost = params.cost || this.endpoints[0].getConnectionCost();
        this._jsPlumb.directed = params.directed;
        // inherit directed flag if set no source endpoint
        if (params.directed == null) this._jsPlumb.directed = this.endpoints[0].areConnectionsDirected();
// END COST + DIRECTIONALITY

// PARAMETERS
        // merge all the parameters objects into the connection.  parameters set
        // on the connection take precedence; then source endpoint params, then
        // finally target endpoint params.
        var _p = jsPlumb.extend({}, this.endpoints[1].getParameters());
        _jp.extend(_p, this.endpoints[0].getParameters());
        _jp.extend(_p, this.getParameters());
        this.setParameters(_p);
// END PARAMETERS

// PAINTING

        this.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || params.connector || _jsPlumb.Defaults.Connector || _jp.Defaults.Connector, true);
        var data = params.data == null || !jsPlumbUtil.isObject(params.data) ? {} : params.data;
        this.getData = function() { return data; };
        this.setData = function(d) { data = d || {}; };
        this.mergeData = function(d) { data = jsPlumb.extend(data, d); };

        // the very last thing we do is apply types, if there are any.
        var _types = [ "default", this.endpoints[0].connectionType, this.endpoints[1].connectionType,  params.type ].join(" ");
        if (/[^\s]/.test(_types))
            this.addType(_types, params.data, true);

        this.updateConnectedClass();

// END PAINTING    
    };

    _ju.extend(_jp.Connection, _jp.OverlayCapableJsPlumbUIComponent, {
        applyType: function (t, doNotRepaint, typeMap) {

            // none of these things result in the creation of objects so can be ignored.
            if (t.detachable != null) this.setDetachable(t.detachable);
            if (t.reattach != null) this.setReattach(t.reattach);
            if (t.scope) this.scope = t.scope;

            if (t.cssClass != null && this.canvas) this._jsPlumb.instance.addClass(this.canvas, t.cssClass);

            var _anchors = null;
            // this also results in the creation of objects.
            if (t.anchor) {
                // note that even if the param was anchor, we store `anchors`.
                _anchors = this.getCachedTypeItem("anchors", typeMap.anchor);
                if (_anchors == null) {
                    _anchors = [ this._jsPlumb.instance.makeAnchor(t.anchor), this._jsPlumb.instance.makeAnchor(t.anchor) ];
                    this.cacheTypeItem("anchors", _anchors, typeMap.anchor);
                }
            }
            else if (t.anchors) {
                _anchors = this.getCachedTypeItem("anchors", typeMap.anchors);
                if (_anchors == null) {
                    _anchors = [
                        this._jsPlumb.instance.makeAnchor(t.anchors[0]),
                        this._jsPlumb.instance.makeAnchor(t.anchors[1])
                    ];
                    this.cacheTypeItem("anchors", _anchors, typeMap.anchors);
                }
            }
            if (_anchors != null) {
                this.endpoints[0].anchor = _anchors[0];
                this.endpoints[1].anchor = _anchors[1];
                if (this.endpoints[1].anchor.isDynamic) this._jsPlumb.instance.repaint(this.endpoints[1].elementId);
            }

            _jp.OverlayCapableJsPlumbUIComponent.applyType(this, t);
        },
        addClass: function (c, informEndpoints) {
            if (informEndpoints) {
                this.endpoints[0].addClass(c);
                this.endpoints[1].addClass(c);
                if (this.suspendedEndpoint) this.suspendedEndpoint.addClass(c);
            }
            if (this.connector) {
                this.connector.addClass(c);
            }
        },
        removeClass: function (c, informEndpoints) {
            if (informEndpoints) {
                this.endpoints[0].removeClass(c);
                this.endpoints[1].removeClass(c);
                if (this.suspendedEndpoint) this.suspendedEndpoint.removeClass(c);
            }
            if (this.connector) {
                this.connector.removeClass(c);
            }
        },
        isVisible: function () {
            return this._jsPlumb.visible;
        },
        setVisible: function (v) {
            this._jsPlumb.visible = v;
            if (this.connector)
                this.connector.setVisible(v);
            this.repaint();
        },
        cleanup: function () {
            this.updateConnectedClass(true);
            this.endpoints = null;
            this.source = null;
            this.target = null;
            if (this.connector != null) {
                this.connector.cleanup(true);
                this.connector.destroy(true);
            }
            this.connector = null;
        },
        updateConnectedClass:function(remove) {
            _updateConnectedClass(this, this.source, this._jsPlumb.instance, remove);
            _updateConnectedClass(this, this.target, this._jsPlumb.instance, remove);
        },
        setHover: function (state) {
            if (this.connector && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) {
                this.connector.setHover(state);
                root.jsPlumb[state ? "addClass" : "removeClass"](this.source, this._jsPlumb.instance.hoverSourceClass);
                root.jsPlumb[state ? "addClass" : "removeClass"](this.target, this._jsPlumb.instance.hoverTargetClass);
            }
        },
        getUuids:function() {
            return [ this.endpoints[0].getUuid(), this.endpoints[1].getUuid() ];
        },
        getCost: function () {
            return this._jsPlumb.cost;
        },
        setCost: function (c) {
            this._jsPlumb.cost = c;
        },
        isDirected: function () {
            return this._jsPlumb.directed === true;
        },
        getConnector: function () {
            return this.connector;
        },
        prepareConnector:function(connectorSpec, typeId) {
            var connectorArgs = {
                    _jsPlumb: this._jsPlumb.instance,
                    cssClass: this._jsPlumb.params.cssClass,
                    container: this._jsPlumb.params.container,
                    "pointer-events": this._jsPlumb.params["pointer-events"]
                },
                renderMode = this._jsPlumb.instance.getRenderMode(),
                connector;

            if (_ju.isString(connectorSpec))
                connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec, connectorArgs, this); // lets you use a string as shorthand.
            else if (_ju.isArray(connectorSpec)) {
                if (connectorSpec.length == 1)
                    connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec[0], connectorArgs, this);
                else
                    connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec[0], _ju.merge(connectorSpec[1], connectorArgs), this);
            }
            if (typeId != null) connector.typeId = typeId;
            return connector;
        },
        setPreparedConnector: function(connector, doNotRepaint, doNotChangeListenerComponent, typeId) {

            var previous, previousClasses = "";
            // the connector will not be cleaned up if it was set as part of a type, because `typeId` will be set on it
            // and we havent passed in `true` for "force" here.
            if (this.connector != null) {
                previous = this.connector;
                previousClasses = previous.getClass();
                this.connector.cleanup();
                this.connector.destroy();
            }

            this.connector = connector;
            if (typeId) {
                this.cacheTypeItem("connector", connector, typeId);
            }

            this.canvas = this.connector.canvas;
            this.bgCanvas = this.connector.bgCanvas;

            // put classes from prior connector onto the canvas
            this.addClass(previousClasses);

            // new: instead of binding listeners per connector, we now just have one delegate on the container.
            // so for that handler we set the connection as the '_jsPlumb' member of the canvas element, and
            // bgCanvas, if it exists, which it does right now in the VML renderer, so it won't from v 2.0.0 onwards.
            if (this.canvas) this.canvas._jsPlumb = this;
            if (this.bgCanvas) this.bgCanvas._jsPlumb = this;

            if (previous != null) {
                var o = this.getOverlays();
                for (var i = 0; i < o.length; i++) {
                    if (o[i].transfer) o[i].transfer(this.connector);
                }
            }

            if (!doNotChangeListenerComponent) this.setListenerComponent(this.connector);
            if (!doNotRepaint) this.repaint();
        },
        setConnector: function (connectorSpec, doNotRepaint, doNotChangeListenerComponent, typeId) {
            var connector = this.prepareConnector(connectorSpec, typeId);
            this.setPreparedConnector(connector, doNotRepaint, doNotChangeListenerComponent, typeId);
        },
        paint: function (params) {

            if (!this._jsPlumb.instance.isSuspendDrawing() && this._jsPlumb.visible) {
                params = params || {};
                var timestamp = params.timestamp,
                // if the moving object is not the source we must transpose the two references.
                    swap = false,
                    tId = swap ? this.sourceId : this.targetId, sId = swap ? this.targetId : this.sourceId,
                    tIdx = swap ? 0 : 1, sIdx = swap ? 1 : 0;

                if (timestamp == null || timestamp != this._jsPlumb.lastPaintedAt) {
                    var sourceInfo = this._jsPlumb.instance.updateOffset({elId:sId}).o,
                        targetInfo = this._jsPlumb.instance.updateOffset({elId:tId}).o,
                        sE = this.endpoints[sIdx], tE = this.endpoints[tIdx];

                    var sAnchorP = sE.anchor.getCurrentLocation({xy: [sourceInfo.left, sourceInfo.top], wh: [sourceInfo.width, sourceInfo.height], element: sE, timestamp: timestamp}),
                        tAnchorP = tE.anchor.getCurrentLocation({xy: [targetInfo.left, targetInfo.top], wh: [targetInfo.width, targetInfo.height], element: tE, timestamp: timestamp});

                    this.connector.resetBounds();

                    this.connector.compute({
                        sourcePos: sAnchorP,
                        targetPos: tAnchorP,
                        sourceEndpoint: this.endpoints[sIdx],
                        targetEndpoint: this.endpoints[tIdx],
                        lineWidth: this._jsPlumb.paintStyleInUse.lineWidth,
                        sourceInfo: sourceInfo,
                        targetInfo: targetInfo
                    });

                    var overlayExtents = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };

                    // compute overlays. we do this first so we can get their placements, and adjust the
                    // container if needs be (if an overlay would be clipped)
                    for (var i in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(i)) {
                            var o = this._jsPlumb.overlays[i];
                            if (o.isVisible()) {
                                this._jsPlumb.overlayPlacements[i] = o.draw(this.connector, this._jsPlumb.paintStyleInUse, this.getAbsoluteOverlayPosition(o));
                                overlayExtents.minX = Math.min(overlayExtents.minX, this._jsPlumb.overlayPlacements[i].minX);
                                overlayExtents.maxX = Math.max(overlayExtents.maxX, this._jsPlumb.overlayPlacements[i].maxX);
                                overlayExtents.minY = Math.min(overlayExtents.minY, this._jsPlumb.overlayPlacements[i].minY);
                                overlayExtents.maxY = Math.max(overlayExtents.maxY, this._jsPlumb.overlayPlacements[i].maxY);
                            }
                        }
                    }

                    var lineWidth = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 1) / 2,
                        outlineWidth = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 0),
                        extents = {
                            xmin: Math.min(this.connector.bounds.minX - (lineWidth + outlineWidth), overlayExtents.minX),
                            ymin: Math.min(this.connector.bounds.minY - (lineWidth + outlineWidth), overlayExtents.minY),
                            xmax: Math.max(this.connector.bounds.maxX + (lineWidth + outlineWidth), overlayExtents.maxX),
                            ymax: Math.max(this.connector.bounds.maxY + (lineWidth + outlineWidth), overlayExtents.maxY)
                        };
                    // paint the connector.
                    this.connector.paint(this._jsPlumb.paintStyleInUse, null, extents);
                    // and then the overlays
                    for (var j in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(j)) {
                            var p = this._jsPlumb.overlays[j];
                            if (p.isVisible()) {
                                p.paint(this._jsPlumb.overlayPlacements[j], extents);
                            }
                        }
                    }
                }
                this._jsPlumb.lastPaintedAt = timestamp;
            }
        },
        repaint: function (params) {
            params = params || {};
            this.paint({ elId: this.sourceId, recalc: !(params.recalc === false), timestamp: params.timestamp});
        },
        prepareEndpoint: function (_jsPlumb, _newEndpoint, conn, existing, index, params, element, elementId) {
            var e;
            if (existing) {
                conn.endpoints[index] = existing;
                existing.addConnection(conn);
            } else {
                if (!params.endpoints) params.endpoints = [ null, null ];
                var ep = params.endpoints[index] || params.endpoint || _jsPlumb.Defaults.Endpoints[index] || jsPlumb.Defaults.Endpoints[index] || _jsPlumb.Defaults.Endpoint || jsPlumb.Defaults.Endpoint;
                if (!params.endpointStyles) params.endpointStyles = [ null, null ];
                if (!params.endpointHoverStyles) params.endpointHoverStyles = [ null, null ];
                var es = params.endpointStyles[index] || params.endpointStyle || _jsPlumb.Defaults.EndpointStyles[index] || jsPlumb.Defaults.EndpointStyles[index] || _jsPlumb.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle;
                // Endpoints derive their fillStyle from the connector's strokeStyle, if no fillStyle was specified.
                if (es.fillStyle == null && params.paintStyle != null)
                    es.fillStyle = params.paintStyle.strokeStyle;

                if (es.outlineColor == null && params.paintStyle != null)
                    es.outlineColor = params.paintStyle.outlineColor;
                if (es.outlineWidth == null && params.paintStyle != null)
                    es.outlineWidth = params.paintStyle.outlineWidth;

                var ehs = params.endpointHoverStyles[index] || params.endpointHoverStyle || _jsPlumb.Defaults.EndpointHoverStyles[index] || jsPlumb.Defaults.EndpointHoverStyles[index] || _jsPlumb.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle;
                // endpoint hover fill style is derived from connector's hover stroke style
                if (params.hoverPaintStyle != null) {
                    if (ehs == null) ehs = {};
                    if (ehs.fillStyle == null) {
                        ehs.fillStyle = params.hoverPaintStyle.strokeStyle;
                    }
                }
                var a = params.anchors ? params.anchors[index] :
                        params.anchor ? params.anchor :
                            _makeAnchor(_jsPlumb.Defaults.Anchors[index], elementId, _jsPlumb) ||
                            _makeAnchor(_jp.Defaults.Anchors[index], elementId, _jsPlumb) ||
                            _makeAnchor(_jsPlumb.Defaults.Anchor, elementId, _jsPlumb) ||
                            _makeAnchor(_jp.Defaults.Anchor, elementId, _jsPlumb),
                    u = params.uuids ? params.uuids[index] : null;

                e = _newEndpoint({
                    paintStyle: es, hoverPaintStyle: ehs, endpoint: ep, connections: [ conn ],
                    uuid: u, anchor: a, source: element, scope: params.scope,
                    reattach: params.reattach || _jsPlumb.Defaults.ReattachConnections,
                    detachable: params.detachable || _jsPlumb.Defaults.ConnectionsDetachable
                });
                conn.endpoints[index] = e;

                if (params.drawEndpoints === false) e.setVisible(false, true, true);

            }
            return e;
        }

    }); // END Connection class            
}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for creating and manipulating anchors.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";

    var root = this,
        _ju = root.jsPlumbUtil,
        _jp = root.jsPlumb;

    //
    // manages anchors for all elements.
    //
    _jp.AnchorManager = function (params) {
        var _amEndpoints = {},
            continuousAnchorLocations = {},
            userDefinedContinuousAnchorLocations = {},
            continuousAnchorOrientations = {},
            Orientation = { HORIZONTAL: "horizontal", VERTICAL: "vertical", DIAGONAL: "diagonal", IDENTITY: "identity" },
            axes = ["left", "top", "right", "bottom"],
            connectionsByElementId = {},
            self = this,
            anchorLists = {},
            jsPlumbInstance = params.jsPlumbInstance,
            floatingConnections = {},
            calculateOrientation = function (sourceId, targetId, sd, td, sourceAnchor, targetAnchor) {

                if (sourceId === targetId) return {
                    orientation: Orientation.IDENTITY,
                    a: ["top", "top"]
                };

                var theta = Math.atan2((td.centery - sd.centery), (td.centerx - sd.centerx)),
                    theta2 = Math.atan2((sd.centery - td.centery), (sd.centerx - td.centerx));

// --------------------------------------------------------------------------------------

                // improved face calculation. get midpoints of each face for source and target, then put in an array with all combinations of
                // source/target faces. sort this array by distance between midpoints. the entry at index 0 is our preferred option. we can
                // go through the array one by one until we find an entry in which each requested face is supported.
                var candidates = [], midpoints = { };
                (function (types, dim) {
                    for (var i = 0; i < types.length; i++) {
                        midpoints[types[i]] = {
                            "left": [ dim[i].left, dim[i].centery ],
                            "right": [ dim[i].right, dim[i].centery ],
                            "top": [ dim[i].centerx, dim[i].top ],
                            "bottom": [ dim[i].centerx , dim[i].bottom]
                        };
                    }
                })([ "source", "target" ], [ sd, td ]);

                for (var sf = 0; sf < axes.length; sf++) {
                    for (var tf = 0; tf < axes.length; tf++) {
                        if (sf != tf) {
                            candidates.push({
                                source: axes[sf],
                                target: axes[tf],
                                dist: Biltong.lineLength(midpoints.source[axes[sf]], midpoints.target[axes[tf]])
                            });
                        }
                    }
                }

                candidates.sort(function (a, b) {
                    return a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0;
                });

                // now go through this list and try to get an entry that satisfies both (there will be one, unless one of the anchors
                // declares no available faces)
                var sourceEdge = candidates[0].source, targetEdge = candidates[0].target;
                for (var i = 0; i < candidates.length; i++) {

                    if (!sourceAnchor.isContinuous || sourceAnchor.isEdgeSupported(candidates[i].source))
                        sourceEdge = candidates[i].source;
                    else
                        sourceEdge = null;

                    if (!targetAnchor.isContinuous || targetAnchor.isEdgeSupported(candidates[i].target))
                        targetEdge = candidates[i].target;
                    else {
                        targetEdge = null;
                    }

                    if (sourceEdge != null && targetEdge != null) break;
                }

// --------------------------------------------------------------------------------------

                return {
                    a: [ sourceEdge, targetEdge ],
                    theta: theta,
                    theta2: theta2
                };
            },
        // used by placeAnchors function
            placeAnchorsOnLine = function (desc, elementDimensions, elementPosition, connections, horizontal, otherMultiplier, reverse) {
                var a = [], step = elementDimensions[horizontal ? 0 : 1] / (connections.length + 1);

                for (var i = 0; i < connections.length; i++) {
                    var val = (i + 1) * step, other = otherMultiplier * elementDimensions[horizontal ? 1 : 0];
                    if (reverse)
                        val = elementDimensions[horizontal ? 0 : 1] - val;

                    var dx = (horizontal ? val : other), x = elementPosition[0] + dx, xp = dx / elementDimensions[0],
                        dy = (horizontal ? other : val), y = elementPosition[1] + dy, yp = dy / elementDimensions[1];

                    a.push([ x, y, xp, yp, connections[i][1], connections[i][2] ]);
                }

                return a;
            },
        // used by edgeSortFunctions
            currySort = function (reverseAngles) {
                return function (a, b) {
                    var r = true;
                    if (reverseAngles) {
                        r = a[0][0] < b[0][0];
                    }
                    else {
                        r = a[0][0] > b[0][0];
                    }
                    return r === false ? -1 : 1;
                };
            },
        // used by edgeSortFunctions
            leftSort = function (a, b) {
                // first get adjusted values
                var p1 = a[0][0] < 0 ? -Math.PI - a[0][0] : Math.PI - a[0][0],
                    p2 = b[0][0] < 0 ? -Math.PI - b[0][0] : Math.PI - b[0][0];
                if (p1 > p2) return 1;
                else return a[0][1] > b[0][1] ? 1 : -1;
            },
        // used by placeAnchors
            edgeSortFunctions = {
                "top": function (a, b) {
                    return a[0] > b[0] ? 1 : -1;
                },
                "right": currySort(true),
                "bottom": currySort(true),
                "left": leftSort
            },
        // used by placeAnchors
            _sortHelper = function (_array, _fn) {
                return _array.sort(_fn);
            },
        // used by AnchorManager.redraw
            placeAnchors = function (elementId, _anchorLists) {
                var cd = jsPlumbInstance.getCachedData(elementId), sS = cd.s, sO = cd.o,
                    placeSomeAnchors = function (desc, elementDimensions, elementPosition, unsortedConnections, isHorizontal, otherMultiplier, orientation) {
                        if (unsortedConnections.length > 0) {
                            var sc = _sortHelper(unsortedConnections, edgeSortFunctions[desc]), // puts them in order based on the target element's pos on screen
                                reverse = desc === "right" || desc === "top",
                                anchors = placeAnchorsOnLine(desc, elementDimensions,
                                    elementPosition, sc,
                                    isHorizontal, otherMultiplier, reverse);

                            // takes a computed anchor position and adjusts it for parent offset and scroll, then stores it.
                            var _setAnchorLocation = function (endpoint, anchorPos) {
                                continuousAnchorLocations[endpoint.id] = [ anchorPos[0], anchorPos[1], anchorPos[2], anchorPos[3] ];
                                continuousAnchorOrientations[endpoint.id] = orientation;
                            };

                            for (var i = 0; i < anchors.length; i++) {
                                var c = anchors[i][4], weAreSource = c.endpoints[0].elementId === elementId, weAreTarget = c.endpoints[1].elementId === elementId;
                                if (weAreSource)
                                    _setAnchorLocation(c.endpoints[0], anchors[i]);
                                else if (weAreTarget)
                                    _setAnchorLocation(c.endpoints[1], anchors[i]);
                            }
                        }
                    };

                placeSomeAnchors("bottom", sS, [sO.left, sO.top], _anchorLists.bottom, true, 1, [0, 1]);
                placeSomeAnchors("top", sS, [sO.left, sO.top], _anchorLists.top, true, 0, [0, -1]);
                placeSomeAnchors("left", sS, [sO.left, sO.top], _anchorLists.left, false, 0, [-1, 0]);
                placeSomeAnchors("right", sS, [sO.left, sO.top], _anchorLists.right, false, 1, [1, 0]);
            };

        this.reset = function () {
            _amEndpoints = {};
            connectionsByElementId = {};
            anchorLists = {};
        };
        this.addFloatingConnection = function (key, conn) {
            floatingConnections[key] = conn;
        };
        this.removeFloatingConnection = function (key) {
            delete floatingConnections[key];
        };
        this.newConnection = function (conn) {
            var sourceId = conn.sourceId, targetId = conn.targetId,
                ep = conn.endpoints,
                doRegisterTarget = true,
                registerConnection = function (otherIndex, otherEndpoint, otherAnchor, elId, c) {
                    if ((sourceId == targetId) && otherAnchor.isContinuous) {
                        // remove the target endpoint's canvas.  we dont need it.
                        conn._jsPlumb.instance.removeElement(ep[1].canvas);
                        doRegisterTarget = false;
                    }
                    _ju.addToList(connectionsByElementId, elId, [c, otherEndpoint, otherAnchor.constructor == _jp.DynamicAnchor]);
                };

            registerConnection(0, ep[0], ep[0].anchor, targetId, conn);
            if (doRegisterTarget)
                registerConnection(1, ep[1], ep[1].anchor, sourceId, conn);
        };
        var removeEndpointFromAnchorLists = function (endpoint) {
            (function (list, eId) {
                if (list) {  // transient anchors dont get entries in this list.
                    var f = function (e) {
                        return e[4] == eId;
                    };
                    _ju.removeWithFunction(list.top, f);
                    _ju.removeWithFunction(list.left, f);
                    _ju.removeWithFunction(list.bottom, f);
                    _ju.removeWithFunction(list.right, f);
                }
            })(anchorLists[endpoint.elementId], endpoint.id);
        };
        this.connectionDetached = function (connInfo, doNotRedraw) {
            var connection = connInfo.connection || connInfo,
                sourceId = connInfo.sourceId,
                targetId = connInfo.targetId,
                ep = connection.endpoints,
                removeConnection = function (otherIndex, otherEndpoint, otherAnchor, elId, c) {
                   _ju.removeWithFunction(connectionsByElementId[elId], function (_c) {
                        return _c[0].id == c.id;
                    });
                };

            removeConnection(1, ep[1], ep[1].anchor, sourceId, connection);
            removeConnection(0, ep[0], ep[0].anchor, targetId, connection);
            if (connection.floatingId) {
                removeConnection(connection.floatingIndex, connection.floatingEndpoint, connection.floatingEndpoint.anchor, connection.floatingId, connection);
                removeEndpointFromAnchorLists(connection.floatingEndpoint);
            }

            // remove from anchorLists            
            removeEndpointFromAnchorLists(connection.endpoints[0]);
            removeEndpointFromAnchorLists(connection.endpoints[1]);

            if (!doNotRedraw) {
                self.redraw(connection.sourceId);
                if (connection.targetId !== connection.sourceId)
                    self.redraw(connection.targetId);
            }
        };
        this.add = function (endpoint, elementId) {
            _ju.addToList(_amEndpoints, elementId, endpoint);
        };
        this.changeId = function (oldId, newId) {
            connectionsByElementId[newId] = connectionsByElementId[oldId];
            _amEndpoints[newId] = _amEndpoints[oldId];
            delete connectionsByElementId[oldId];
            delete _amEndpoints[oldId];
        };
        this.getConnectionsFor = function (elementId) {
            return connectionsByElementId[elementId] || [];
        };
        this.getEndpointsFor = function (elementId) {
            return _amEndpoints[elementId] || [];
        };
        this.deleteEndpoint = function (endpoint) {
            _ju.removeWithFunction(_amEndpoints[endpoint.elementId], function (e) {
                return e.id == endpoint.id;
            });
            removeEndpointFromAnchorLists(endpoint);
        };
        this.clearFor = function (elementId) {
            delete _amEndpoints[elementId];
            _amEndpoints[elementId] = [];
        };
        // updates the given anchor list by either updating an existing anchor's info, or adding it. this function
        // also removes the anchor from its previous list, if the edge it is on has changed.
        // all connections found along the way (those that are connected to one of the faces this function
        // operates on) are added to the connsToPaint list, as are their endpoints. in this way we know to repaint
        // them wthout having to calculate anything else about them.
        var _updateAnchorList = function (lists, theta, order, conn, aBoolean, otherElId, idx, reverse, edgeId, elId, connsToPaint, endpointsToPaint) {
            // first try to find the exact match, but keep track of the first index of a matching element id along the way.s
            var exactIdx = -1,
                firstMatchingElIdx = -1,
                endpoint = conn.endpoints[idx],
                endpointId = endpoint.id,
                oIdx = [1, 0][idx],
                values = [
                    [ theta, order ],
                    conn,
                    aBoolean,
                    otherElId,
                    endpointId
                ],
                listToAddTo = lists[edgeId],
                listToRemoveFrom = endpoint._continuousAnchorEdge ? lists[endpoint._continuousAnchorEdge] : null,
                i,
                candidate;

            if (listToRemoveFrom) {
                var rIdx = _ju.findWithFunction(listToRemoveFrom, function (e) {
                    return e[4] == endpointId;
                });
                if (rIdx != -1) {
                    listToRemoveFrom.splice(rIdx, 1);
                    // get all connections from this list
                    for (i = 0; i < listToRemoveFrom.length; i++) {
                        candidate = listToRemoveFrom[i][1];
                        _ju.addWithFunction(connsToPaint, candidate, function (c) {
                            return c.id == candidate.id;
                        });
                        _ju.addWithFunction(endpointsToPaint, listToRemoveFrom[i][1].endpoints[idx], function (e) {
                            return e.id == candidate.endpoints[idx].id;
                        });
                        _ju.addWithFunction(endpointsToPaint, listToRemoveFrom[i][1].endpoints[oIdx], function (e) {
                            return e.id == candidate.endpoints[oIdx].id;
                        });
                    }
                }
            }

            for (i = 0; i < listToAddTo.length; i++) {
                candidate = listToAddTo[i][1];
                if (params.idx == 1 && listToAddTo[i][3] === otherElId && firstMatchingElIdx == -1)
                    firstMatchingElIdx = i;
                _ju.addWithFunction(connsToPaint, candidate, function (c) {
                    return c.id == candidate.id;
                });
                _ju.addWithFunction(endpointsToPaint, listToAddTo[i][1].endpoints[idx], function (e) {
                    return e.id == candidate.endpoints[idx].id;
                });
                _ju.addWithFunction(endpointsToPaint, listToAddTo[i][1].endpoints[oIdx], function (e) {
                    return e.id == candidate.endpoints[oIdx].id;
                });
            }
            if (exactIdx != -1) {
                listToAddTo[exactIdx] = values;
            }
            else {
                var insertIdx = reverse ? firstMatchingElIdx != -1 ? firstMatchingElIdx : 0 : listToAddTo.length; // of course we will get this from having looked through the array shortly.
                listToAddTo.splice(insertIdx, 0, values);
            }

            // store this for next time.
            endpoint._continuousAnchorEdge = edgeId;
        };

        //
        // find the entry in an endpoint's list for this connection and update its target endpoint
        // with the current target in the connection.
        // 
        //
        this.updateOtherEndpoint = function (elId, oldTargetId, newTargetId, connection) {
            var sIndex = _ju.findWithFunction(connectionsByElementId[elId], function (i) {
                    return i[0].id === connection.id;
                }),
                tIndex = _ju.findWithFunction(connectionsByElementId[oldTargetId], function (i) {
                    return i[0].id === connection.id;
                });

            // update or add data for source
            if (sIndex != -1) {
                connectionsByElementId[elId][sIndex][0] = connection;
                connectionsByElementId[elId][sIndex][1] = connection.endpoints[1];
                connectionsByElementId[elId][sIndex][2] = connection.endpoints[1].anchor.constructor == _jp.DynamicAnchor;
            }

            // remove entry for previous target (if there)
            if (tIndex > -1) {
                connectionsByElementId[oldTargetId].splice(tIndex, 1);
                // add entry for new target
                _ju.addToList(connectionsByElementId, newTargetId, [connection, connection.endpoints[0], connection.endpoints[0].anchor.constructor == _jp.DynamicAnchor]);
            }

            connection.updateConnectedClass();
        };

        //
        // notification that the connection given has changed source from the originalId to the newId.
        // This involves:
        // 1. removing the connection from the list of connections stored for the originalId
        // 2. updating the source information for the target of the connection
        // 3. re-registering the connection in connectionsByElementId with the newId
        //
        this.sourceChanged = function (originalId, newId, connection) {
            if (originalId !== newId) {
                // remove the entry that points from the old source to the target
                _ju.removeWithFunction(connectionsByElementId[originalId], function (info) {
                    return info[0].id === connection.id;
                });
                // find entry for target and update it
                var tIdx = _ju.findWithFunction(connectionsByElementId[connection.targetId], function (i) {
                    return i[0].id === connection.id;
                });
                if (tIdx > -1) {
                    connectionsByElementId[connection.targetId][tIdx][0] = connection;
                    connectionsByElementId[connection.targetId][tIdx][1] = connection.endpoints[0];
                    connectionsByElementId[connection.targetId][tIdx][2] = connection.endpoints[0].anchor.constructor == _jp.DynamicAnchor;
                }
                // add entry for new source
                _ju.addToList(connectionsByElementId, newId, [connection, connection.endpoints[1], connection.endpoints[1].anchor.constructor == _jp.DynamicAnchor]);

                // TODO SP not final on this yet. when a user drags an existing connection and it turns into a self
                // loop, then this code hides the target endpoint (by removing it from the DOM) But I think this should
                // occur only if the anchor is Continuous
                if (connection.endpoints[1].anchor.isContinuous) {
                    if (connection.source === connection.target) {
                        connection._jsPlumb.instance.removeElement(connection.endpoints[1].canvas);
                    }
                    else {
                        if (connection.endpoints[1].canvas.parentNode == null) {
                            connection._jsPlumb.instance.appendElement(connection.endpoints[1].canvas);
                        }
                    }
                }

                connection.updateConnectedClass();
            }
        };

        //
        // moves the given endpoint from `currentId` to `element`.
        // This involves:
        //
        // 1. changing the key in _amEndpoints under which the endpoint is stored
        // 2. changing the source or target values in all of the endpoint's connections
        // 3. changing the array in connectionsByElementId in which the endpoint's connections
        //    are stored (done by either sourceChanged or updateOtherEndpoint)
        //
        this.rehomeEndpoint = function (ep, currentId, element) {
            var eps = _amEndpoints[currentId] || [],
                elementId = jsPlumbInstance.getId(element);

            if (elementId !== currentId) {
                var idx = eps.indexOf(ep);
                if (idx > -1) {
                    var _ep = eps.splice(idx, 1)[0];
                    self.add(_ep, elementId);
                }
            }

            for (var i = 0; i < ep.connections.length; i++) {
                if (ep.connections[i].sourceId == currentId) {
                    ep.connections[i].sourceId = ep.elementId;
                    ep.connections[i].source = ep.element;
                    self.sourceChanged(currentId, ep.elementId, ep.connections[i]);
                }
                else if (ep.connections[i].targetId == currentId) {
                    ep.connections[i].targetId = ep.elementId;
                    ep.connections[i].target = ep.element;
                    self.updateOtherEndpoint(ep.connections[i].sourceId, currentId, ep.elementId, ep.connections[i]);
                }
            }
        };

        this.redraw = function (elementId, ui, timestamp, offsetToUI, clearEdits, doNotRecalcEndpoint) {

            if (!jsPlumbInstance.isSuspendDrawing()) {
                // get all the endpoints for this element
                var ep = _amEndpoints[elementId] || [],
                    endpointConnections = connectionsByElementId[elementId] || [],
                    connectionsToPaint = [],
                    endpointsToPaint = [],
                    anchorsToUpdate = [];

                timestamp = timestamp || jsPlumbInstance.timestamp();
                // offsetToUI are values that would have been calculated in the dragManager when registering
                // an endpoint for an element that had a parent (somewhere in the hierarchy) that had been
                // registered as draggable.
                offsetToUI = offsetToUI || {left: 0, top: 0};
                if (ui) {
                    ui = {
                        left: ui.left + offsetToUI.left,
                        top: ui.top + offsetToUI.top
                    };
                }

                // valid for one paint cycle.
                var myOffset = jsPlumbInstance.updateOffset({ elId: elementId, offset: ui, recalc: false, timestamp: timestamp }),
                    orientationCache = {};

                // actually, first we should compute the orientation of this element to all other elements to which
                // this element is connected with a continuous anchor (whether both ends of the connection have
                // a continuous anchor or just one)

                for (var i = 0; i < endpointConnections.length; i++) {
                    var conn = endpointConnections[i][0],
                        sourceId = conn.sourceId,
                        targetId = conn.targetId,
                        sourceContinuous = conn.endpoints[0].anchor.isContinuous,
                        targetContinuous = conn.endpoints[1].anchor.isContinuous;

                    if (sourceContinuous || targetContinuous) {
                        var oKey = sourceId + "_" + targetId,
                            o = orientationCache[oKey],
                            oIdx = conn.sourceId == elementId ? 1 : 0;

                        if (sourceContinuous && !anchorLists[sourceId]) anchorLists[sourceId] = { top: [], right: [], bottom: [], left: [] };
                        if (targetContinuous && !anchorLists[targetId]) anchorLists[targetId] = { top: [], right: [], bottom: [], left: [] };

                        if (elementId != targetId) jsPlumbInstance.updateOffset({ elId: targetId, timestamp: timestamp });
                        if (elementId != sourceId) jsPlumbInstance.updateOffset({ elId: sourceId, timestamp: timestamp });

                        var td = jsPlumbInstance.getCachedData(targetId),
                            sd = jsPlumbInstance.getCachedData(sourceId);

                        if (targetId == sourceId && (sourceContinuous || targetContinuous)) {
                            // here we may want to improve this by somehow determining the face we'd like
                            // to put the connector on.  ideally, when drawing, the face should be calculated
                            // by determining which face is closest to the point at which the mouse button
                            // was released.  for now, we're putting it on the top face.
                            _updateAnchorList(
                                anchorLists[sourceId],
                                    -Math.PI / 2,
                                0,
                                conn,
                                false,
                                targetId,
                                0, false, "top", sourceId, connectionsToPaint, endpointsToPaint);
                        }
                        else {
                            if (!o) {
                                o = calculateOrientation(sourceId, targetId, sd.o, td.o, conn.endpoints[0].anchor, conn.endpoints[1].anchor);
                                orientationCache[oKey] = o;
                                // this would be a performance enhancement, but the computed angles need to be clamped to
                                //the (-PI/2 -> PI/2) range in order for the sorting to work properly.
                                /*  orientationCache[oKey2] = {
                                 orientation:o.orientation,
                                 a:[o.a[1], o.a[0]],
                                 theta:o.theta + Math.PI,
                                 theta2:o.theta2 + Math.PI
                                 };*/
                            }
                            if (sourceContinuous) _updateAnchorList(anchorLists[sourceId], o.theta, 0, conn, false, targetId, 0, false, o.a[0], sourceId, connectionsToPaint, endpointsToPaint);
                            if (targetContinuous) _updateAnchorList(anchorLists[targetId], o.theta2, -1, conn, true, sourceId, 1, true, o.a[1], targetId, connectionsToPaint, endpointsToPaint);
                        }

                        if (sourceContinuous) _ju.addWithFunction(anchorsToUpdate, sourceId, function (a) {
                            return a === sourceId;
                        });
                        if (targetContinuous) _ju.addWithFunction(anchorsToUpdate, targetId, function (a) {
                            return a === targetId;
                        });
                        _ju.addWithFunction(connectionsToPaint, conn, function (c) {
                            return c.id == conn.id;
                        });
                        if ((sourceContinuous && oIdx === 0) || (targetContinuous && oIdx === 1))
                            _ju.addWithFunction(endpointsToPaint, conn.endpoints[oIdx], function (e) {
                                return e.id == conn.endpoints[oIdx].id;
                            });
                    }
                }

                // place Endpoints whose anchors are continuous but have no Connections
                for (i = 0; i < ep.length; i++) {
                    if (ep[i].connections.length === 0 && ep[i].anchor.isContinuous) {
                        if (!anchorLists[elementId]) anchorLists[elementId] = { top: [], right: [], bottom: [], left: [] };
                        _updateAnchorList(anchorLists[elementId], -Math.PI / 2, 0, {endpoints: [ep[i], ep[i]], paint: function () {
                        }}, false, elementId, 0, false, ep[i].anchor.getDefaultFace(), elementId, connectionsToPaint, endpointsToPaint);
                        _ju.addWithFunction(anchorsToUpdate, elementId, function (a) {
                            return a === elementId;
                        });
                    }
                }


                // now place all the continuous anchors we need to;
                for (i = 0; i < anchorsToUpdate.length; i++) {
                    placeAnchors(anchorsToUpdate[i], anchorLists[anchorsToUpdate[i]]);
                }

                // now that continuous anchors have been placed, paint all the endpoints for this element
                // TODO performance: add the endpoint ids to a temp array, and then when iterating in the next
                // loop, check that we didn't just paint that endpoint. we can probably shave off a few more milliseconds this way.
                for (i = 0; i < ep.length; i++) {
                    ep[i].paint({ timestamp: timestamp, offset: myOffset, dimensions: myOffset.s, recalc: doNotRecalcEndpoint !== true });
                }

                // ... and any other endpoints we came across as a result of the continuous anchors.
                for (i = 0; i < endpointsToPaint.length; i++) {
                    var cd = jsPlumbInstance.getCachedData(endpointsToPaint[i].elementId);
                    endpointsToPaint[i].paint({ timestamp: timestamp, offset: cd, dimensions: cd.s });
                }

                // paint all the standard and "dynamic connections", which are connections whose other anchor is
                // static and therefore does need to be recomputed; we make sure that happens only one time.

                // TODO we could have compiled a list of these in the first pass through connections; might save some time.
                for (i = 0; i < endpointConnections.length; i++) {
                    var otherEndpoint = endpointConnections[i][1];
                    if (otherEndpoint.anchor.constructor == _jp.DynamicAnchor) {
                        otherEndpoint.paint({ elementWithPrecedence: elementId, timestamp: timestamp });
                        _ju.addWithFunction(connectionsToPaint, endpointConnections[i][0], function (c) {
                            return c.id == endpointConnections[i][0].id;
                        });
                        // all the connections for the other endpoint now need to be repainted
                        for (var k = 0; k < otherEndpoint.connections.length; k++) {
                            if (otherEndpoint.connections[k] !== endpointConnections[i][0])
                                _ju.addWithFunction(connectionsToPaint, otherEndpoint.connections[k], function (c) {
                                    return c.id == otherEndpoint.connections[k].id;
                                });
                        }
                    } else if (otherEndpoint.anchor.constructor == _jp.Anchor) {
                        _ju.addWithFunction(connectionsToPaint, endpointConnections[i][0], function (c) {
                            return c.id == endpointConnections[i][0].id;
                        });
                    }
                }

                // paint current floating connection for this element, if there is one.
                var fc = floatingConnections[elementId];
                if (fc)
                    fc.paint({timestamp: timestamp, recalc: false, elId: elementId});

                // paint all the connections
                for (i = 0; i < connectionsToPaint.length; i++) {
                    connectionsToPaint[i].paint({elId: elementId, timestamp: timestamp, recalc: false, clearEdits: clearEdits});
                }
            }
        };

        var ContinuousAnchor = function (anchorParams) {
            _ju.EventGenerator.apply(this);
            this.type = "Continuous";
            this.isDynamic = true;
            this.isContinuous = true;
            var faces = anchorParams.faces || ["top", "right", "bottom", "left"],
                clockwise = !(anchorParams.clockwise === false),
                availableFaces = { },
                opposites = { "top": "bottom", "right": "left", "left": "right", "bottom": "top" },
                clockwiseOptions = { "top": "right", "right": "bottom", "left": "top", "bottom": "left" },
                antiClockwiseOptions = { "top": "left", "right": "top", "left": "bottom", "bottom": "right" },
                secondBest = clockwise ? clockwiseOptions : antiClockwiseOptions,
                lastChoice = clockwise ? antiClockwiseOptions : clockwiseOptions,
                cssClass = anchorParams.cssClass || "";

            for (var i = 0; i < faces.length; i++) {
                availableFaces[faces[i]] = true;
            }

            this.getDefaultFace = function () {
                return faces.length === 0 ? "top" : faces[0];
            };

            // if the given edge is supported, returns it. otherwise looks for a substitute that _is_
            // supported. if none supported we also return the request edge.
            this.verifyEdge = function (edge) {
                if (availableFaces[edge]) return edge;
                else if (availableFaces[opposites[edge]]) return opposites[edge];
                else if (availableFaces[secondBest[edge]]) return secondBest[edge];
                else if (availableFaces[lastChoice[edge]]) return lastChoice[edge];
                return edge; // we have to give them something.
            };

            this.isEdgeSupported = function (edge) {
                return availableFaces[edge] === true;
            };

            this.compute = function (params) {
                return userDefinedContinuousAnchorLocations[params.element.id] || continuousAnchorLocations[params.element.id] || [0, 0];
            };
            this.getCurrentLocation = function (params) {
                return userDefinedContinuousAnchorLocations[params.element.id] || continuousAnchorLocations[params.element.id] || [0, 0];
            };
            this.getOrientation = function (endpoint) {
                return continuousAnchorOrientations[endpoint.id] || [0, 0];
            };
            this.clearUserDefinedLocation = function () {
                delete userDefinedContinuousAnchorLocations[anchorParams.elementId];
            };
            this.setUserDefinedLocation = function (loc) {
                userDefinedContinuousAnchorLocations[anchorParams.elementId] = loc;
            };
            this.getCssClass = function () {
                return cssClass;
            };
        };

        // continuous anchors
        jsPlumbInstance.continuousAnchorFactory = {
            get: function (params) {
                return new ContinuousAnchor(params);
            },
            clear: function (elementId) {
                delete userDefinedContinuousAnchorLocations[elementId];
                delete continuousAnchorLocations[elementId];
            }
        };
    };

    /**
     * Anchors model a position on some element at which an Endpoint may be located.  They began as a first class citizen of jsPlumb, ie. a user
     * was required to create these themselves, but over time this has been replaced by the concept of referring to them either by name (eg. "TopMiddle"),
     * or by an array describing their coordinates (eg. [ 0, 0.5, 0, -1 ], which is the same as "TopMiddle").  jsPlumb now handles all of the
     * creation of Anchors without user intervention.
     */
    _jp.Anchor = function (params) {
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.elementId = params.elementId;
        this.cssClass = params.cssClass || "";
        this.userDefinedLocation = null;
        this.orientation = params.orientation || [ 0, 0 ];
        this.lastReturnValue = null;
        this.offsets = params.offsets || [ 0, 0 ];
        this.timestamp = null;

        _ju.EventGenerator.apply(this);

        this.compute = function (params) {

            var xy = params.xy, wh = params.wh, timestamp = params.timestamp;

            if (params.clearUserDefinedLocation)
                this.userDefinedLocation = null;

            if (timestamp && timestamp === self.timestamp)
                return this.lastReturnValue;

            if (this.userDefinedLocation != null) {
                this.lastReturnValue = this.userDefinedLocation;
            }
            else {
                this.lastReturnValue = [ xy[0] + (this.x * wh[0]) + this.offsets[0], xy[1] + (this.y * wh[1]) + this.offsets[1] ];
            }

            this.timestamp = timestamp;
            return this.lastReturnValue;
        };

        this.getCurrentLocation = function (params) {
            params = params || {};
            return (this.lastReturnValue == null || (params.timestamp != null && this.timestamp != params.timestamp)) ? this.compute(params) : this.lastReturnValue;
        };
    };
    _ju.extend(_jp.Anchor, _ju.EventGenerator, {
        equals: function (anchor) {
            if (!anchor) return false;
            var ao = anchor.getOrientation(),
                o = this.getOrientation();
            return this.x == anchor.x && this.y == anchor.y && this.offsets[0] == anchor.offsets[0] && this.offsets[1] == anchor.offsets[1] && o[0] == ao[0] && o[1] == ao[1];
        },
        getUserDefinedLocation: function () {
            return this.userDefinedLocation;
        },
        setUserDefinedLocation: function (l) {
            this.userDefinedLocation = l;
        },
        clearUserDefinedLocation: function () {
            this.userDefinedLocation = null;
        },
        getOrientation: function () {
            return this.orientation;
        },
        getCssClass: function () {
            return this.cssClass;
        }
    });

    /**
     * An Anchor that floats. its orientation is computed dynamically from
     * its position relative to the anchor it is floating relative to.  It is used when creating
     * a connection through drag and drop.
     *
     * TODO FloatingAnchor could totally be refactored to extend Anchor just slightly.
     */
    _jp.FloatingAnchor = function (params) {

        _jp.Anchor.apply(this, arguments);

        // this is the anchor that this floating anchor is referenced to for
        // purposes of calculating the orientation.
        var ref = params.reference,
            // the canvas this refers to.
            refCanvas = params.referenceCanvas,
            size = _jp.getSize(refCanvas),
            // these are used to store the current relative position of our
            // anchor wrt the reference anchor. they only indicate
            // direction, so have a value of 1 or -1 (or, very rarely, 0). these
            // values are written by the compute method, and read
            // by the getOrientation method.
            xDir = 0, yDir = 0,
            // temporary member used to store an orientation when the floating
            // anchor is hovering over another anchor.
            orientation = null,
            _lastResult = null;

        // clear from parent. we want floating anchor orientation to always be computed.
        this.orientation = null;

        // set these to 0 each; they are used by certain types of connectors in the loopback case,
        // when the connector is trying to clear the element it is on. but for floating anchor it's not
        // very important.
        this.x = 0;
        this.y = 0;

        this.isFloating = true;

        this.compute = function (params) {
            var xy = params.xy,
                result = [ xy[0] + (size[0] / 2), xy[1] + (size[1] / 2) ]; // return origin of the element. we may wish to improve this so that any object can be the drag proxy.
            _lastResult = result;
            return result;
        };

        this.getOrientation = function (_endpoint) {
            if (orientation) return orientation;
            else {
                var o = ref.getOrientation(_endpoint);
                // here we take into account the orientation of the other
                // anchor: if it declares zero for some direction, we declare zero too. this might not be the most awesome. perhaps we can come
                // up with a better way. it's just so that the line we draw looks like it makes sense. maybe this wont make sense.
                return [ Math.abs(o[0]) * xDir * -1,
                        Math.abs(o[1]) * yDir * -1 ];
            }
        };

        /**
         * notification the endpoint associated with this anchor is hovering
         * over another anchor; we want to assume that anchor's orientation
         * for the duration of the hover.
         */
        this.over = function (anchor, endpoint) {
            orientation = anchor.getOrientation(endpoint);
        };

        /**
         * notification the endpoint associated with this anchor is no
         * longer hovering over another anchor; we should resume calculating
         * orientation as we normally do.
         */
        this.out = function () {
            orientation = null;
        };

        this.getCurrentLocation = function (params) {
            return _lastResult == null ? this.compute(params) : _lastResult;
        };
    };
    _ju.extend(_jp.FloatingAnchor, _jp.Anchor);

    var _convertAnchor = function (anchor, jsPlumbInstance, elementId) {
        return anchor.constructor == _jp.Anchor ? anchor : jsPlumbInstance.makeAnchor(anchor, elementId, jsPlumbInstance);
    };

    /* 
     * A DynamicAnchor is an Anchor that contains a list of other Anchors, which it cycles
     * through at compute time to find the one that is located closest to
     * the center of the target element, and returns that Anchor's compute
     * method result. this causes endpoints to follow each other with
     * respect to the orientation of their target elements, which is a useful
     * feature for some applications.
     * 
     */
    _jp.DynamicAnchor = function (params) {
        _jp.Anchor.apply(this, arguments);

        this.isDynamic = true;
        this.anchors = [];
        this.elementId = params.elementId;
        this.jsPlumbInstance = params.jsPlumbInstance;

        for (var i = 0; i < params.anchors.length; i++)
            this.anchors[i] = _convertAnchor(params.anchors[i], this.jsPlumbInstance, this.elementId);

        this.getAnchors = function () {
            return this.anchors;
        };
        this.locked = false;
        var _curAnchor = this.anchors.length > 0 ? this.anchors[0] : null,
            _lastAnchor = _curAnchor,
            self = this,

        // helper method to calculate the distance between the centers of the two elements.
            _distance = function (anchor, cx, cy, xy, wh) {
                var ax = xy[0] + (anchor.x * wh[0]), ay = xy[1] + (anchor.y * wh[1]),
                    acx = xy[0] + (wh[0] / 2), acy = xy[1] + (wh[1] / 2);
                return (Math.sqrt(Math.pow(cx - ax, 2) + Math.pow(cy - ay, 2)) +
                    Math.sqrt(Math.pow(acx - ax, 2) + Math.pow(acy - ay, 2)));
            },
        // default method uses distance between element centers.  you can provide your own method in the dynamic anchor
        // constructor (and also to jsPlumb.makeDynamicAnchor). the arguments to it are four arrays:
        // xy - xy loc of the anchor's element
        // wh - anchor's element's dimensions
        // txy - xy loc of the element of the other anchor in the connection
        // twh - dimensions of the element of the other anchor in the connection.
        // anchors - the list of selectable anchors
            _anchorSelector = params.selector || function (xy, wh, txy, twh, anchors) {
                var cx = txy[0] + (twh[0] / 2), cy = txy[1] + (twh[1] / 2);
                var minIdx = -1, minDist = Infinity;
                for (var i = 0; i < anchors.length; i++) {
                    var d = _distance(anchors[i], cx, cy, xy, wh);
                    if (d < minDist) {
                        minIdx = i + 0;
                        minDist = d;
                    }
                }
                return anchors[minIdx];
            };

        this.compute = function (params) {
            var xy = params.xy, wh = params.wh, txy = params.txy, twh = params.twh;

            this.timestamp = params.timestamp;

            var udl = self.getUserDefinedLocation();
            if (udl != null) {
                return udl;
            }

            // if anchor is locked or an opposite element was not given, we
            // maintain our state. anchor will be locked
            // if it is the source of a drag and drop.
            if (this.locked || txy == null || twh == null)
                return _curAnchor.compute(params);
            else
                params.timestamp = null; // otherwise clear this, i think. we want the anchor to compute.

            _curAnchor = _anchorSelector(xy, wh, txy, twh, this.anchors);
            this.x = _curAnchor.x;
            this.y = _curAnchor.y;

            if (_curAnchor != _lastAnchor)
                this.fire("anchorChanged", _curAnchor);

            _lastAnchor = _curAnchor;

            return _curAnchor.compute(params);
        };

        this.getCurrentLocation = function (params) {
            return this.getUserDefinedLocation() || (_curAnchor != null ? _curAnchor.getCurrentLocation(params) : null);
        };

        this.getOrientation = function (_endpoint) {
            return _curAnchor != null ? _curAnchor.getOrientation(_endpoint) : [ 0, 0 ];
        };
        this.over = function (anchor, endpoint) {
            if (_curAnchor != null) _curAnchor.over(anchor, endpoint);
        };
        this.out = function () {
            if (_curAnchor != null) _curAnchor.out();
        };

        this.getCssClass = function () {
            return (_curAnchor && _curAnchor.getCssClass()) || "";
        };
    };
    _ju.extend(_jp.DynamicAnchor, _jp.Anchor);

// -------- basic anchors ------------------    
    var _curryAnchor = function (x, y, ox, oy, type, fnInit) {
        _jp.Anchors[type] = function (params) {
            var a = params.jsPlumbInstance.makeAnchor([ x, y, ox, oy, 0, 0 ], params.elementId, params.jsPlumbInstance);
            a.type = type;
            if (fnInit) fnInit(a, params);
            return a;
        };
    };

    _curryAnchor(0.5, 0, 0, -1, "TopCenter");
    _curryAnchor(0.5, 1, 0, 1, "BottomCenter");
    _curryAnchor(0, 0.5, -1, 0, "LeftMiddle");
    _curryAnchor(1, 0.5, 1, 0, "RightMiddle");

    _curryAnchor(0.5, 0, 0, -1, "Top");
    _curryAnchor(0.5, 1, 0, 1, "Bottom");
    _curryAnchor(0, 0.5, -1, 0, "Left");
    _curryAnchor(1, 0.5, 1, 0, "Right");
    _curryAnchor(0.5, 0.5, 0, 0, "Center");
    _curryAnchor(1, 0, 0, -1, "TopRight");
    _curryAnchor(1, 1, 0, 1, "BottomRight");
    _curryAnchor(0, 0, 0, -1, "TopLeft");
    _curryAnchor(0, 1, 0, 1, "BottomLeft");

// ------- dynamic anchors -------------------    

    // default dynamic anchors chooses from Top, Right, Bottom, Left
    _jp.Defaults.DynamicAnchors = function (params) {
        return params.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], params.elementId, params.jsPlumbInstance);
    };

    // default dynamic anchors bound to name 'AutoDefault'
    _jp.Anchors.AutoDefault = function (params) {
        var a = params.jsPlumbInstance.makeDynamicAnchor(_jp.Defaults.DynamicAnchors(params));
        a.type = "AutoDefault";
        return a;
    };

// ------- continuous anchors -------------------    

    var _curryContinuousAnchor = function (type, faces) {
        _jp.Anchors[type] = function (params) {
            var a = params.jsPlumbInstance.makeAnchor(["Continuous", { faces: faces }], params.elementId, params.jsPlumbInstance);
            a.type = type;
            return a;
        };
    };

    _jp.Anchors.Continuous = function (params) {
        return params.jsPlumbInstance.continuousAnchorFactory.get(params);
    };

    _curryContinuousAnchor("ContinuousLeft", ["left"]);
    _curryContinuousAnchor("ContinuousTop", ["top"]);
    _curryContinuousAnchor("ContinuousBottom", ["bottom"]);
    _curryContinuousAnchor("ContinuousRight", ["right"]);

// ------- position assign anchors -------------------    

    // this anchor type lets you assign the position at connection time.
    _curryAnchor(0, 0, 0, 0, "Assign", function (anchor, params) {
        // find what to use as the "position finder". the user may have supplied a String which represents
        // the id of a position finder in jsPlumb.AnchorPositionFinders, or the user may have supplied the
        // position finder as a function.  we find out what to use and then set it on the anchor.
        var pf = params.position || "Fixed";
        anchor.positionFinder = pf.constructor == String ? params.jsPlumbInstance.AnchorPositionFinders[pf] : pf;
        // always set the constructor params; the position finder might need them later (the Grid one does,
        // for example)
        anchor.constructorParams = params;
    });

    // these are the default anchor positions finders, which are used by the makeTarget function.  supplying
    // a position finder argument to that function allows you to specify where the resulting anchor will
    // be located
    jsPlumbInstance.prototype.AnchorPositionFinders = {
        "Fixed": function (dp, ep, es) {
            return [ (dp.left - ep.left) / es[0], (dp.top - ep.top) / es[1] ];
        },
        "Grid": function (dp, ep, es, params) {
            var dx = dp.left - ep.left, dy = dp.top - ep.top,
                gx = es[0] / (params.grid[0]), gy = es[1] / (params.grid[1]),
                mx = Math.floor(dx / gx), my = Math.floor(dy / gy);
            return [ ((mx * gx) + (gx / 2)) / es[0], ((my * gy) + (gy / 2)) / es[1] ];
        }
    };

// ------- perimeter anchors -------------------    

    _jp.Anchors.Perimeter = function (params) {
        params = params || {};
        var anchorCount = params.anchorCount || 60,
            shape = params.shape;

        if (!shape) throw new Error("no shape supplied to Perimeter Anchor type");

        var _circle = function () {
                var r = 0.5, step = Math.PI * 2 / anchorCount, current = 0, a = [];
                for (var i = 0; i < anchorCount; i++) {
                    var x = r + (r * Math.sin(current)),
                        y = r + (r * Math.cos(current));
                    a.push([ x, y, 0, 0 ]);
                    current += step;
                }
                return a;
            },
            _path = function (segments) {
                var anchorsPerFace = anchorCount / segments.length, a = [],
                    _computeFace = function (x1, y1, x2, y2, fractionalLength) {
                        anchorsPerFace = anchorCount * fractionalLength;
                        var dx = (x2 - x1) / anchorsPerFace, dy = (y2 - y1) / anchorsPerFace;
                        for (var i = 0; i < anchorsPerFace; i++) {
                            a.push([
                                    x1 + (dx * i),
                                    y1 + (dy * i),
                                0,
                                0
                            ]);
                        }
                    };

                for (var i = 0; i < segments.length; i++)
                    _computeFace.apply(null, segments[i]);

                return a;
            },
            _shape = function (faces) {
                var s = [];
                for (var i = 0; i < faces.length; i++) {
                    s.push([faces[i][0], faces[i][1], faces[i][2], faces[i][3], 1 / faces.length]);
                }
                return _path(s);
            },
            _rectangle = function () {
                return _shape([
                    [ 0, 0, 1, 0 ],
                    [ 1, 0, 1, 1 ],
                    [ 1, 1, 0, 1 ],
                    [ 0, 1, 0, 0 ]
                ]);
            };

        var _shapes = {
                "Circle": _circle,
                "Ellipse": _circle,
                "Diamond": function () {
                    return _shape([
                        [ 0.5, 0, 1, 0.5 ],
                        [ 1, 0.5, 0.5, 1 ],
                        [ 0.5, 1, 0, 0.5 ],
                        [ 0, 0.5, 0.5, 0 ]
                    ]);
                },
                "Rectangle": _rectangle,
                "Square": _rectangle,
                "Triangle": function () {
                    return _shape([
                        [ 0.5, 0, 1, 1 ],
                        [ 1, 1, 0, 1 ],
                        [ 0, 1, 0.5, 0]
                    ]);
                },
                "Path": function (params) {
                    var points = params.points, p = [], tl = 0;
                    for (var i = 0; i < points.length - 1; i++) {
                        var l = Math.sqrt(Math.pow(points[i][2] - points[i][0]) + Math.pow(points[i][3] - points[i][1]));
                        tl += l;
                        p.push([points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], l]);
                    }
                    for (var j = 0; j < p.length; j++) {
                        p[j][4] = p[j][4] / tl;
                    }
                    return _path(p);
                }
            },
            _rotate = function (points, amountInDegrees) {
                var o = [], theta = amountInDegrees / 180 * Math.PI;
                for (var i = 0; i < points.length; i++) {
                    var _x = points[i][0] - 0.5,
                        _y = points[i][1] - 0.5;

                    o.push([
                            0.5 + ((_x * Math.cos(theta)) - (_y * Math.sin(theta))),
                            0.5 + ((_x * Math.sin(theta)) + (_y * Math.cos(theta))),
                        points[i][2],
                        points[i][3]
                    ]);
                }
                return o;
            };

        if (!_shapes[shape]) throw new Error("Shape [" + shape + "] is unknown by Perimeter Anchor type");

        var da = _shapes[shape](params);
        if (params.rotation) da = _rotate(da, params.rotation);
        var a = params.jsPlumbInstance.makeDynamicAnchor(da);
        a.type = "Perimeter";
        return a;
    };
}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the default Connectors, Endpoint and Overlay definitions.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil, _jg = root.Biltong;

    _jp.Segments = {

        /*
         * Class: AbstractSegment
         * A Connector is made up of 1..N Segments, each of which has a Type, such as 'Straight', 'Arc',
         * 'Bezier'. This is new from 1.4.2, and gives us a lot more flexibility when drawing connections: things such
         * as rounded corners for flowchart connectors, for example, or a straight line stub for Bezier connections, are
         * much easier to do now.
         *
         * A Segment is responsible for providing coordinates for painting it, and also must be able to report its length.
         * 
         */
        AbstractSegment: function (params) {
            this.params = params;

            /**
             * Function: findClosestPointOnPath
             * Finds the closest point on this segment to the given [x, y],
             * returning both the x and y of the point plus its distance from
             * the supplied point, and its location along the length of the
             * path inscribed by the segment.  This implementation returns
             * Infinity for distance and null values for everything else;
             * subclasses are expected to override.
             */
            this.findClosestPointOnPath = function (x, y) {
                return {
                    d: Infinity,
                    x: null,
                    y: null,
                    l: null
                };
            };

            this.getBounds = function () {
                return {
                    minX: Math.min(params.x1, params.x2),
                    minY: Math.min(params.y1, params.y2),
                    maxX: Math.max(params.x1, params.x2),
                    maxY: Math.max(params.y1, params.y2)
                };
            };
        },
        Straight: function (params) {
            var _super = _jp.Segments.AbstractSegment.apply(this, arguments),
                length, m, m2, x1, x2, y1, y2,
                _recalc = function () {
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    m = _jg.gradient({x: x1, y: y1}, {x: x2, y: y2});
                    m2 = -1 / m;
                };

            this.type = "Straight";

            this.getLength = function () {
                return length;
            };
            this.getGradient = function () {
                return m;
            };

            this.getCoordinates = function () {
                return { x1: x1, y1: y1, x2: x2, y2: y2 };
            };
            this.setCoordinates = function (coords) {
                x1 = coords.x1;
                y1 = coords.y1;
                x2 = coords.x2;
                y2 = coords.y2;
                _recalc();
            };
            this.setCoordinates({x1: params.x1, y1: params.y1, x2: params.x2, y2: params.y2});

            this.getBounds = function () {
                return {
                    minX: Math.min(x1, x2),
                    minY: Math.min(y1, y2),
                    maxX: Math.max(x1, x2),
                    maxY: Math.max(y1, y2)
                };
            };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive. for the straight line segment this is simple maths.
             */
            this.pointOnPath = function (location, absolute) {
                if (location === 0 && !absolute)
                    return { x: x1, y: y1 };
                else if (location == 1 && !absolute)
                    return { x: x2, y: y2 };
                else {
                    var l = absolute ? location > 0 ? location : length + location : location * length;
                    return _jg.pointOnLine({x: x1, y: y1}, {x: x2, y: y2}, l);
                }
            };

            /**
             * returns the gradient of the segment at the given point - which for us is constant.
             */
            this.gradientAtPoint = function (_) {
                return m;
            };

            /**
             * returns the point on the segment's path that is 'distance' along the length of the path from 'location', where
             * 'location' is a decimal from 0 to 1 inclusive, and 'distance' is a number of pixels.
             * this hands off to jsPlumbUtil to do the maths, supplying two points and the distance.
             */
            this.pointAlongPathFrom = function (location, distance, absolute) {
                var p = this.pointOnPath(location, absolute),
                    farAwayPoint = distance <= 0 ? {x: x1, y: y1} : {x: x2, y: y2 };

                /*
                 location == 1 ? {
                 x:x1 + ((x2 - x1) * 10),
                 y:y1 + ((y1 - y2) * 10)
                 } :
                 */

                if (distance <= 0 && Math.abs(distance) > 1) distance *= -1;

                return _jg.pointOnLine(p, farAwayPoint, distance);
            };

            // is c between a and b?
            var within = function (a, b, c) {
                return c >= Math.min(a, b) && c <= Math.max(a, b);
            };
            // find which of a and b is closest to c
            var closest = function (a, b, c) {
                return Math.abs(c - a) < Math.abs(c - b) ? a : b;
            };

            /**
             Function: findClosestPointOnPath
             Finds the closest point on this segment to [x,y]. See
             notes on this method in AbstractSegment.
             */
            this.findClosestPointOnPath = function (x, y) {
                var out = {
                    d: Infinity,
                    x: null,
                    y: null,
                    l: null,
                    x1: x1,
                    x2: x2,
                    y1: y1,
                    y2: y2
                };

                if (m === 0) {
                    out.y = y1;
                    out.x = within(x1, x2, x) ? x : closest(x1, x2, x);
                }
                else if (m == Infinity || m == -Infinity) {
                    out.x = x1;
                    out.y = within(y1, y2, y) ? y : closest(y1, y2, y);
                }
                else {
                    // closest point lies on normal from given point to this line.  
                    var b = y1 - (m * x1),
                        b2 = y - (m2 * x),
                    // y1 = m.x1 + b and y1 = m2.x1 + b2
                    // so m.x1 + b = m2.x1 + b2
                    // x1(m - m2) = b2 - b
                    // x1 = (b2 - b) / (m - m2)
                        _x1 = (b2 - b) / (m - m2),
                        _y1 = (m * _x1) + b;

                    out.x = within(x1, x2, _x1) ? _x1 : closest(x1, x2, _x1);//_x1;
                    out.y = within(y1, y2, _y1) ? _y1 : closest(y1, y2, _y1);//_y1;
                }

                var fractionInSegment = _jg.lineLength([ out.x, out.y ], [ x1, y1 ]);
                out.d = _jg.lineLength([x, y], [out.x, out.y]);
                out.l = fractionInSegment / length;
                return out;
            };
        },

        /*
         Arc Segment. You need to supply:

         r   -   radius
         cx  -   center x for the arc
         cy  -   center y for the arc
         ac  -   whether the arc is anticlockwise or not. default is clockwise.

         and then either:

         startAngle  -   startAngle for the arc.
         endAngle    -   endAngle for the arc.

         or:

         x1          -   x for start point
         y1          -   y for start point
         x2          -   x for end point
         y2          -   y for end point

         */
        Arc: function (params) {
            var _super = _jp.Segments.AbstractSegment.apply(this, arguments),
                _calcAngle = function (_x, _y) {
                    return _jg.theta([params.cx, params.cy], [_x, _y]);
                },
                _calcAngleForLocation = function (segment, location) {
                    if (segment.anticlockwise) {
                        var sa = segment.startAngle < segment.endAngle ? segment.startAngle + TWO_PI : segment.startAngle,
                            s = Math.abs(sa - segment.endAngle);
                        return sa - (s * location);
                    }
                    else {
                        var ea = segment.endAngle < segment.startAngle ? segment.endAngle + TWO_PI : segment.endAngle,
                            ss = Math.abs(ea - segment.startAngle);

                        return segment.startAngle + (ss * location);
                    }
                },
                TWO_PI = 2 * Math.PI;

            this.radius = params.r;
            this.anticlockwise = params.ac;
            this.type = "Arc";

            if (params.startAngle && params.endAngle) {
                this.startAngle = params.startAngle;
                this.endAngle = params.endAngle;
                this.x1 = params.cx + (this.radius * Math.cos(params.startAngle));
                this.y1 = params.cy + (this.radius * Math.sin(params.startAngle));
                this.x2 = params.cx + (this.radius * Math.cos(params.endAngle));
                this.y2 = params.cy + (this.radius * Math.sin(params.endAngle));
            }
            else {
                this.startAngle = _calcAngle(params.x1, params.y1);
                this.endAngle = _calcAngle(params.x2, params.y2);
                this.x1 = params.x1;
                this.y1 = params.y1;
                this.x2 = params.x2;
                this.y2 = params.y2;
            }

            if (this.endAngle < 0) this.endAngle += TWO_PI;
            if (this.startAngle < 0) this.startAngle += TWO_PI;

            // segment is used by vml     
            //this.segment = _jg.quadrant([this.x1, this.y1], [this.x2, this.y2]);

            // we now have startAngle and endAngle as positive numbers, meaning the
            // absolute difference (|d|) between them is the sweep (s) of this arc, unless the
            // arc is 'anticlockwise' in which case 's' is given by 2PI - |d|.

            var ea = this.endAngle < this.startAngle ? this.endAngle + TWO_PI : this.endAngle;
            this.sweep = Math.abs(ea - this.startAngle);
            if (this.anticlockwise) this.sweep = TWO_PI - this.sweep;
            var circumference = 2 * Math.PI * this.radius,
                frac = this.sweep / TWO_PI,
                length = circumference * frac;

            this.getLength = function () {
                return length;
            };

            this.getBounds = function () {
                return {
                    minX: params.cx - params.r,
                    maxX: params.cx + params.r,
                    minY: params.cy - params.r,
                    maxY: params.cy + params.r
                };
            };

            var VERY_SMALL_VALUE = 0.0000000001,
                gentleRound = function (n) {
                    var f = Math.floor(n), r = Math.ceil(n);
                    if (n - f < VERY_SMALL_VALUE)
                        return f;
                    else if (r - n < VERY_SMALL_VALUE)
                        return r;
                    return n;
                };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive.
             */
            this.pointOnPath = function (location, absolute) {

                if (location === 0) {
                    return { x: this.x1, y: this.y1, theta: this.startAngle };
                }
                else if (location == 1) {
                    return { x: this.x2, y: this.y2, theta: this.endAngle };
                }

                if (absolute) {
                    location = location / length;
                }

                var angle = _calcAngleForLocation(this, location),
                    _x = params.cx + (params.r * Math.cos(angle)),
                    _y = params.cy + (params.r * Math.sin(angle));

                return { x: gentleRound(_x), y: gentleRound(_y), theta: angle };
            };

            /**
             * returns the gradient of the segment at the given point.
             */
            this.gradientAtPoint = function (location, absolute) {
                var p = this.pointOnPath(location, absolute);
                var m = _jg.normal([ params.cx, params.cy ], [p.x, p.y ]);
                if (!this.anticlockwise && (m == Infinity || m == -Infinity)) m *= -1;
                return m;
            };

            this.pointAlongPathFrom = function (location, distance, absolute) {
                var p = this.pointOnPath(location, absolute),
                    arcSpan = distance / circumference * 2 * Math.PI,
                    dir = this.anticlockwise ? -1 : 1,
                    startAngle = p.theta + (dir * arcSpan),
                    startX = params.cx + (this.radius * Math.cos(startAngle)),
                    startY = params.cy + (this.radius * Math.sin(startAngle));

                return {x: startX, y: startY};
            };
        },

        Bezier: function (params) {
            this.curve = [
                { x: params.x1, y: params.y1},
                { x: params.cp1x, y: params.cp1y },
                { x: params.cp2x, y: params.cp2y },
                { x: params.x2, y: params.y2 }
            ];

            var _super = _jp.Segments.AbstractSegment.apply(this, arguments);
            // although this is not a strictly rigorous determination of bounds
            // of a bezier curve, it works for the types of curves that this segment
            // type produces.
            this.bounds = {
                minX: Math.min(params.x1, params.x2, params.cp1x, params.cp2x),
                minY: Math.min(params.y1, params.y2, params.cp1y, params.cp2y),
                maxX: Math.max(params.x1, params.x2, params.cp1x, params.cp2x),
                maxY: Math.max(params.y1, params.y2, params.cp1y, params.cp2y)
            };

            this.type = "Bezier";

            var _translateLocation = function (_curve, location, absolute) {
                if (absolute)
                    location = root.jsBezier.locationAlongCurveFrom(_curve, location > 0 ? 0 : 1, location);

                return location;
            };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive.
             */
            this.pointOnPath = function (location, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.pointOnCurve(this.curve, location);
            };

            /**
             * returns the gradient of the segment at the given point.
             */
            this.gradientAtPoint = function (location, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.gradientAtPoint(this.curve, location);
            };

            this.pointAlongPathFrom = function (location, distance, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.pointAlongCurveFrom(this.curve, location, distance);
            };

            this.getLength = function () {
                return root.jsBezier.getLength(this.curve);
            };

            this.getBounds = function () {
                return this.bounds;
            };
        }
    };

    /*
     Class: AbstractComponent
     Superclass for AbstractConnector and AbstractEndpoint.
     */
    var AbstractComponent = function () {
        this.resetBounds = function () {
            this.bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
        };
        this.resetBounds();
    };

    /*
     * Class: AbstractConnector
     * Superclass for all Connectors; here is where Segments are managed.  This is exposed on jsPlumb just so it
     * can be accessed from other files. You should not try to instantiate one of these directly.
     *
     * When this class is asked for a pointOnPath, or gradient etc, it must first figure out which segment to dispatch
     * that request to. This is done by keeping track of the total connector length as segments are added, and also
     * their cumulative ratios to the total length.  Then when the right segment is found it is a simple case of dispatching
     * the request to it (and adjusting 'location' so that it is relative to the beginning of that segment.)
     */
    _jp.Connectors.AbstractConnector = function (params) {

        AbstractComponent.apply(this, arguments);

        var segments = [],
            totalLength = 0,
            segmentProportions = [],
            segmentProportionalLengths = [],
            stub = params.stub || 0,
            sourceStub = _ju.isArray(stub) ? stub[0] : stub,
            targetStub = _ju.isArray(stub) ? stub[1] : stub,
            gap = params.gap || 0,
            sourceGap = _ju.isArray(gap) ? gap[0] : gap,
            targetGap = _ju.isArray(gap) ? gap[1] : gap,
            userProvidedSegments = null,
            edited = false,
            paintInfo = null;

        // to be overridden by subclasses.
        this.getPath = function () {
        };
        this.setPath = function (path) {
        };

        /**
         * Function: findSegmentForPoint
         * Returns the segment that is closest to the given [x,y],
         * null if nothing found.  This function returns a JS
         * object with:
         *
         *   d   -   distance from segment
         *   l   -   proportional location in segment
         *   x   -   x point on the segment
         *   y   -   y point on the segment
         *   s   -   the segment itself.
         */
        this.findSegmentForPoint = function (x, y) {
            var out = { d: Infinity, s: null, x: null, y: null, l: null };
            for (var i = 0; i < segments.length; i++) {
                var _s = segments[i].findClosestPointOnPath(x, y);
                if (_s.d < out.d) {
                    out.d = _s.d;
                    out.l = _s.l;
                    out.x = _s.x;
                    out.y = _s.y;
                    out.s = segments[i];
                    out.x1 = _s.x1;
                    out.x2 = _s.x2;
                    out.y1 = _s.y1;
                    out.y2 = _s.y2;
                    out.index = i;
                }
            }

            return out;
        };

        var _updateSegmentProportions = function () {
                var curLoc = 0;
                for (var i = 0; i < segments.length; i++) {
                    var sl = segments[i].getLength();
                    segmentProportionalLengths[i] = sl / totalLength;
                    segmentProportions[i] = [curLoc, (curLoc += (sl / totalLength)) ];
                }
            },

            /**
             * returns [segment, proportion of travel in segment, segment index] for the segment
             * that contains the point which is 'location' distance along the entire path, where
             * 'location' is a decimal between 0 and 1 inclusive. in this connector type, paths
             * are made up of a list of segments, each of which contributes some fraction to
             * the total length.
             * From 1.3.10 this also supports the 'absolute' property, which lets us specify a location
             * as the absolute distance in pixels, rather than a proportion of the total path.
             */
            _findSegmentForLocation = function (location, absolute) {
                if (absolute) {
                    location = location > 0 ? location / totalLength : (totalLength + location) / totalLength;
                }
                var idx = segmentProportions.length - 1, inSegmentProportion = 1;
                for (var i = 0; i < segmentProportions.length; i++) {
                    if (segmentProportions[i][1] >= location) {
                        idx = i;
                        // todo is this correct for all connector path types?
                        inSegmentProportion = location == 1 ? 1 : location === 0 ? 0 : (location - segmentProportions[i][0]) / segmentProportionalLengths[i];
                        break;
                    }
                }
                return { segment: segments[idx], proportion: inSegmentProportion, index: idx };
            },
            _addSegment = function (conn, type, params) {
                if (params.x1 == params.x2 && params.y1 == params.y2) return;
                var s = new _jp.Segments[type](params);
                segments.push(s);
                totalLength += s.getLength();
                conn.updateBounds(s);
            },
            _clearSegments = function () {
                totalLength = segments.length = segmentProportions.length = segmentProportionalLengths.length = 0;
            };

        this.setSegments = function (_segs) {
            userProvidedSegments = [];
            totalLength = 0;
            for (var i = 0; i < _segs.length; i++) {
                userProvidedSegments.push(_segs[i]);
                totalLength += _segs[i].getLength();
            }
        };

        this.getLength = function() {
            return totalLength;
        };

        var _prepareCompute = function (params) {
            this.lineWidth = params.lineWidth;
            var segment = _jg.quadrant(params.sourcePos, params.targetPos),
                swapX = params.targetPos[0] < params.sourcePos[0],
                swapY = params.targetPos[1] < params.sourcePos[1],
                lw = params.lineWidth || 1,
                so = params.sourceEndpoint.anchor.getOrientation(params.sourceEndpoint),
                to = params.targetEndpoint.anchor.getOrientation(params.targetEndpoint),
                x = swapX ? params.targetPos[0] : params.sourcePos[0],
                y = swapY ? params.targetPos[1] : params.sourcePos[1],
                w = Math.abs(params.targetPos[0] - params.sourcePos[0]),
                h = Math.abs(params.targetPos[1] - params.sourcePos[1]);

            // if either anchor does not have an orientation set, we derive one from their relative
            // positions.  we fix the axis to be the one in which the two elements are further apart, and
            // point each anchor at the other element.  this is also used when dragging a new connection.
            if (so[0] === 0 && so[1] === 0 || to[0] === 0 && to[1] === 0) {
                var index = w > h ? 0 : 1, oIndex = [1, 0][index];
                so = [];
                to = [];
                so[index] = params.sourcePos[index] > params.targetPos[index] ? -1 : 1;
                to[index] = params.sourcePos[index] > params.targetPos[index] ? 1 : -1;
                so[oIndex] = 0;
                to[oIndex] = 0;
            }

            var sx = swapX ? w + (sourceGap * so[0]) : sourceGap * so[0],
                sy = swapY ? h + (sourceGap * so[1]) : sourceGap * so[1],
                tx = swapX ? targetGap * to[0] : w + (targetGap * to[0]),
                ty = swapY ? targetGap * to[1] : h + (targetGap * to[1]),
                oProduct = ((so[0] * to[0]) + (so[1] * to[1]));

            var result = {
                sx: sx, sy: sy, tx: tx, ty: ty, lw: lw,
                xSpan: Math.abs(tx - sx),
                ySpan: Math.abs(ty - sy),
                mx: (sx + tx) / 2,
                my: (sy + ty) / 2,
                so: so, to: to, x: x, y: y, w: w, h: h,
                segment: segment,
                startStubX: sx + (so[0] * sourceStub),
                startStubY: sy + (so[1] * sourceStub),
                endStubX: tx + (to[0] * targetStub),
                endStubY: ty + (to[1] * targetStub),
                isXGreaterThanStubTimes2: Math.abs(sx - tx) > (sourceStub + targetStub),
                isYGreaterThanStubTimes2: Math.abs(sy - ty) > (sourceStub + targetStub),
                opposite: oProduct == -1,
                perpendicular: oProduct === 0,
                orthogonal: oProduct == 1,
                sourceAxis: so[0] === 0 ? "y" : "x",
                points: [x, y, w, h, sx, sy, tx, ty ]
            };
            result.anchorOrientation = result.opposite ? "opposite" : result.orthogonal ? "orthogonal" : "perpendicular";
            return result;
        };

        this.getSegments = function () {
            return segments;
        };

        this.updateBounds = function (segment) {
            var segBounds = segment.getBounds();
            this.bounds.minX = Math.min(this.bounds.minX, segBounds.minX);
            this.bounds.maxX = Math.max(this.bounds.maxX, segBounds.maxX);
            this.bounds.minY = Math.min(this.bounds.minY, segBounds.minY);
            this.bounds.maxY = Math.max(this.bounds.maxY, segBounds.maxY);
        };

        var dumpSegmentsToConsole = function () {
            console.log("SEGMENTS:");
            for (var i = 0; i < segments.length; i++) {
                console.log(segments[i].type, segments[i].getLength(), segmentProportions[i]);
            }
        };

        this.pointOnPath = function (location, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            return seg.segment && seg.segment.pointOnPath(seg.proportion, false) || [0, 0];
        };

        this.gradientAtPoint = function (location, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            return seg.segment && seg.segment.gradientAtPoint(seg.proportion, false) || 0;
        };

        this.pointAlongPathFrom = function (location, distance, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            // TODO what happens if this crosses to the next segment?
            return seg.segment && seg.segment.pointAlongPathFrom(seg.proportion, distance, false) || [0, 0];
        };

        this.compute = function (params) {
            if (!edited)
                paintInfo = _prepareCompute.call(this, params);

            _clearSegments();
            this._compute(paintInfo, params);
            this.x = paintInfo.points[0];
            this.y = paintInfo.points[1];
            this.w = paintInfo.points[2];
            this.h = paintInfo.points[3];
            this.segment = paintInfo.segment;
            _updateSegmentProportions();
        };

        return {
            addSegment: _addSegment,
            prepareCompute: _prepareCompute,
            sourceStub: sourceStub,
            targetStub: targetStub,
            maxStub: Math.max(sourceStub, targetStub),
            sourceGap: sourceGap,
            targetGap: targetGap,
            maxGap: Math.max(sourceGap, targetGap)
        };
    };
    _ju.extend(_jp.Connectors.AbstractConnector, AbstractComponent);

    /**
     * Class: Connectors.Straight
     * The Straight connector draws a simple straight line between the two anchor points.  It does not have any constructor parameters.
     */
    var Straight = _jp.Connectors.Straight = function () {
        this.type = "Straight";
        var _super = _jp.Connectors.AbstractConnector.apply(this, arguments);

        this._compute = function (paintInfo, _) {
            _super.addSegment(this, "Straight", {x1: paintInfo.sx, y1: paintInfo.sy, x2: paintInfo.startStubX, y2: paintInfo.startStubY});
            _super.addSegment(this, "Straight", {x1: paintInfo.startStubX, y1: paintInfo.startStubY, x2: paintInfo.endStubX, y2: paintInfo.endStubY});
            _super.addSegment(this, "Straight", {x1: paintInfo.endStubX, y1: paintInfo.endStubY, x2: paintInfo.tx, y2: paintInfo.ty});
        };
    };
    _ju.extend(_jp.Connectors.Straight, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(Straight, "Straight");


    // ********************************* END OF CONNECTOR TYPES *******************************************************************

    // ********************************* ENDPOINT TYPES *******************************************************************

    _jp.Endpoints.AbstractEndpoint = function (params) {
        AbstractComponent.apply(this, arguments);
        var compute = this.compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var out = this._compute.apply(this, arguments);
            this.x = out[0];
            this.y = out[1];
            this.w = out[2];
            this.h = out[3];
            this.bounds.minX = this.x;
            this.bounds.minY = this.y;
            this.bounds.maxX = this.x + this.w;
            this.bounds.maxY = this.y + this.h;
            return out;
        };
        return {
            compute: compute,
            cssClass: params.cssClass
        };
    };
    _ju.extend(_jp.Endpoints.AbstractEndpoint, AbstractComponent);

    /**
     * Class: Endpoints.Dot
     * A round endpoint, with default radius 10 pixels.
     */

    /**
     * Function: Constructor
     *
     * Parameters:
     *
     *    radius    -    radius of the endpoint.  defaults to 10 pixels.
     */
    _jp.Endpoints.Dot = function (params) {
        this.type = "Dot";
        var _super = _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        params = params || {};
        this.radius = params.radius || 10;
        this.defaultOffset = 0.5 * this.radius;
        this.defaultInnerRadius = this.radius / 3;

        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            this.radius = endpointStyle.radius || this.radius;
            var x = anchorPoint[0] - this.radius,
                y = anchorPoint[1] - this.radius,
                w = this.radius * 2,
                h = this.radius * 2;

            if (endpointStyle.strokeStyle) {
                var lw = endpointStyle.lineWidth || 1;
                x -= lw;
                y -= lw;
                w += (lw * 2);
                h += (lw * 2);
            }
            return [ x, y, w, h, this.radius ];
        };
    };
    _ju.extend(_jp.Endpoints.Dot, _jp.Endpoints.AbstractEndpoint);

    _jp.Endpoints.Rectangle = function (params) {
        this.type = "Rectangle";
        var _super = _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        params = params || {};
        this.width = params.width || 20;
        this.height = params.height || 20;

        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var width = endpointStyle.width || this.width,
                height = endpointStyle.height || this.height,
                x = anchorPoint[0] - (width / 2),
                y = anchorPoint[1] - (height / 2);

            return [ x, y, width, height];
        };
    };
    _ju.extend(_jp.Endpoints.Rectangle, _jp.Endpoints.AbstractEndpoint);

    var DOMElementEndpoint = function (params) {
        _jp.jsPlumbUIComponent.apply(this, arguments);
        this._jsPlumb.displayElements = [];
    };
    _ju.extend(DOMElementEndpoint, _jp.jsPlumbUIComponent, {
        getDisplayElements: function () {
            return this._jsPlumb.displayElements;
        },
        appendDisplayElement: function (el) {
            this._jsPlumb.displayElements.push(el);
        }
    });

    /**
     * Class: Endpoints.Image
     * Draws an image as the Endpoint.
     */
    /**
     * Function: Constructor
     *
     * Parameters:
     *
     *    src    -    location of the image to use.

     TODO: multiple references to self. not sure quite how to get rid of them entirely. perhaps self = null in the cleanup
     function will suffice

     TODO this class still might leak memory.

     */
    _jp.Endpoints.Image = function (params) {

        this.type = "Image";
        DOMElementEndpoint.apply(this, arguments);
        _jp.Endpoints.AbstractEndpoint.apply(this, arguments);

        var _onload = params.onload,
            src = params.src || params.url,
            clazz = params.cssClass ? " " + params.cssClass : "";

        this._jsPlumb.img = new Image();
        this._jsPlumb.ready = false;
        this._jsPlumb.initialized = false;
        this._jsPlumb.deleted = false;
        this._jsPlumb.widthToUse = params.width;
        this._jsPlumb.heightToUse = params.height;
        this._jsPlumb.endpoint = params.endpoint;

        this._jsPlumb.img.onload = function () {
            if (this._jsPlumb != null) {
                this._jsPlumb.ready = true;
                this._jsPlumb.widthToUse = this._jsPlumb.widthToUse || this._jsPlumb.img.width;
                this._jsPlumb.heightToUse = this._jsPlumb.heightToUse || this._jsPlumb.img.height;
                if (_onload) {
                    _onload(this);
                }
            }
        }.bind(this);

        /*
         Function: setImage
         Sets the Image to use in this Endpoint.

         Parameters:
         img         -   may be a URL or an Image object
         onload      -   optional; a callback to execute once the image has loaded.
         */
        this._jsPlumb.endpoint.setImage = function (_img, onload) {
            var s = _img.constructor == String ? _img : _img.src;
            _onload = onload;
            this._jsPlumb.img.src = s;

            if (this.canvas != null)
                this.canvas.setAttribute("src", this._jsPlumb.img.src);
        }.bind(this);

        this._jsPlumb.endpoint.setImage(src, _onload);
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            this.anchorPoint = anchorPoint;
            if (this._jsPlumb.ready) return [anchorPoint[0] - this._jsPlumb.widthToUse / 2, anchorPoint[1] - this._jsPlumb.heightToUse / 2,
                this._jsPlumb.widthToUse, this._jsPlumb.heightToUse];
            else return [0, 0, 0, 0];
        };

        this.canvas = jsPlumb.createElement("img", {
            position:"absolute",
            margin:0,
            padding:0,
            outline:0
        }, this._jsPlumb.instance.endpointClass + clazz);

        if (this._jsPlumb.widthToUse) this.canvas.setAttribute("width", this._jsPlumb.widthToUse);
        if (this._jsPlumb.heightToUse) this.canvas.setAttribute("height", this._jsPlumb.heightToUse);
        this._jsPlumb.instance.appendElement(this.canvas);

        this.actuallyPaint = function (d, style, anchor) {
            if (!this._jsPlumb.deleted) {
                if (!this._jsPlumb.initialized) {
                    this.canvas.setAttribute("src", this._jsPlumb.img.src);
                    this.appendDisplayElement(this.canvas);
                    this._jsPlumb.initialized = true;
                }
                var x = this.anchorPoint[0] - (this._jsPlumb.widthToUse / 2),
                    y = this.anchorPoint[1] - (this._jsPlumb.heightToUse / 2);
                _ju.sizeElement(this.canvas, x, y, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse);
            }
        };

        this.paint = function (style, anchor) {
            if (this._jsPlumb != null) {  // may have been deleted
                if (this._jsPlumb.ready) {
                    this.actuallyPaint(style, anchor);
                }
                else {
                    root.setTimeout(function () {
                        this.paint(style, anchor);
                    }.bind(this), 200);
                }
            }
        };
    };
    _ju.extend(_jp.Endpoints.Image, [ DOMElementEndpoint, _jp.Endpoints.AbstractEndpoint ], {
        cleanup: function (force) {
            if (force) {
                this._jsPlumb.deleted = true;
                if (this.canvas) this.canvas.parentNode.removeChild(this.canvas);
                this.canvas = null;
            }
        }
    });

    /*
     * Class: Endpoints.Blank
     * An Endpoint that paints nothing (visible) on the screen.  Supports cssClass and hoverClass parameters like all Endpoints.
     */
    _jp.Endpoints.Blank = function (params) {
        var _super = _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        this.type = "Blank";
        DOMElementEndpoint.apply(this, arguments);
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            return [anchorPoint[0], anchorPoint[1], 10, 0];
        };

        var clazz = params.cssClass ? " " + params.cssClass : "";

        this.canvas = jsPlumb.createElement("div", {
            display: "block",
            width: "1px",
            height: "1px",
            background: "transparent",
            position: "absolute"
        }, this._jsPlumb.instance.endpointClass + clazz);

        this._jsPlumb.instance.appendElement(this.canvas);

        this.paint = function (style, anchor) {
            _ju.sizeElement(this.canvas, this.x, this.y, this.w, this.h);
        };
    };
    _ju.extend(_jp.Endpoints.Blank, [_jp.Endpoints.AbstractEndpoint, DOMElementEndpoint], {
        cleanup: function () {
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    });

    /*
     * Class: Endpoints.Triangle
     * A triangular Endpoint.
     */
    /*
     * Function: Constructor
     *
     * Parameters:
     *
     * 	width	-	width of the triangle's base.  defaults to 55 pixels.
     * 	height	-	height of the triangle from base to apex.  defaults to 55 pixels.
     */
    _jp.Endpoints.Triangle = function (params) {
        this.type = "Triangle";
        _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        params = params || {  };
        params.width = params.width || 55;
        params.height = params.height || 55;
        this.width = params.width;
        this.height = params.height;
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var width = endpointStyle.width || self.width,
                height = endpointStyle.height || self.height,
                x = anchorPoint[0] - (width / 2),
                y = anchorPoint[1] - (height / 2);
            return [ x, y, width, height ];
        };
    };
// ********************************* END OF ENDPOINT TYPES *******************************************************************


// ********************************* OVERLAY DEFINITIONS ***********************************************************************    

    var AbstractOverlay = _jp.Overlays.AbstractOverlay = function (params) {
        this.visible = true;
        this.isAppendedAtTopLevel = true;
        this.component = params.component;
        this.loc = params.location == null ? 0.5 : params.location;
        this.endpointLoc = params.endpointLocation == null ? [ 0.5, 0.5] : params.endpointLocation;
    };
    AbstractOverlay.prototype = {
        cleanup: function (force) {
            if (force) {
                this.component = null;
                this.canvas = null;
                this.endpointLoc = null;
            }
        },
        reattach:function(instance) {

        },
        setVisible: function (val) {
            this.visible = val;
            this.component.repaint();
        },
        isVisible: function () {
            return this.visible;
        },
        hide: function () {
            this.setVisible(false);
        },
        show: function () {
            this.setVisible(true);
        },
        incrementLocation: function (amount) {
            this.loc += amount;
            this.component.repaint();
        },
        setLocation: function (l) {
            this.loc = l;
            this.component.repaint();
        },
        getLocation: function () {
            return this.loc;
        },
        updateFrom:function() { }
    };


    /*
     * Class: Overlays.Arrow
     *
     * An arrow overlay, defined by four points: the head, the two sides of the tail, and a 'foldback' point at some distance along the length
     * of the arrow that lines from each tail point converge into.  The foldback point is defined using a decimal that indicates some fraction
     * of the length of the arrow and has a default value of 0.623.  A foldback point value of 1 would mean that the arrow had a straight line
     * across the tail.
     */
    /*
     * Function: Constructor
     *
     * Parameters:
     *
     * 	length - distance in pixels from head to tail baseline. default 20.
     * 	width - width in pixels of the tail baseline. default 20.
     * 	fillStyle - style to use when filling the arrow.  defaults to "black".
     * 	strokeStyle - style to use when stroking the arrow. defaults to null, which means the arrow is not stroked.
     * 	lineWidth - line width to use when stroking the arrow. defaults to 1, but only used if strokeStyle is not null.
     * 	foldback - distance (as a decimal from 0 to 1 inclusive) along the length of the arrow marking the point the tail points should fold back to.  defaults to 0.623.
     * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the arrow should sit on the connector. defaults to 0.5.
     * 	direction - indicates the direction the arrow points in. valid values are -1 and 1; 1 is default.
     */
    _jp.Overlays.Arrow = function (params) {
        this.type = "Arrow";
        AbstractOverlay.apply(this, arguments);
        this.isAppendedAtTopLevel = false;
        params = params || {};

        this.length = params.length || 20;
        this.width = params.width || 20;
        this.id = params.id;
        var direction = (params.direction || 1) < 0 ? -1 : 1,
            paintStyle = params.paintStyle || { lineWidth: 1 },
        // how far along the arrow the lines folding back in come to. default is 62.3%.
            foldback = params.foldback || 0.623;

        this.computeMaxSize = function () {
            return self.width * 1.5;
        };

        this.draw = function (component, currentConnectionPaintStyle) {

            var hxy, mid, txy, tail, cxy;
            if (component.pointAlongPathFrom) {

                if (_ju.isString(this.loc) || this.loc > 1 || this.loc < 0) {
                    var l = parseInt(this.loc, 10),
                        fromLoc = this.loc < 0 ? 1 : 0;
                    hxy = component.pointAlongPathFrom(fromLoc, l, false);
                    mid = component.pointAlongPathFrom(fromLoc, l - (direction * this.length / 2), false);
                    txy = _jg.pointOnLine(hxy, mid, this.length);
                }
                else if (this.loc == 1) {
                    hxy = component.pointOnPath(this.loc);
                    mid = component.pointAlongPathFrom(this.loc, -(this.length));
                    txy = _jg.pointOnLine(hxy, mid, this.length);

                    if (direction == -1) {
                        var _ = txy;
                        txy = hxy;
                        hxy = _;
                    }
                }
                else if (this.loc === 0) {
                    txy = component.pointOnPath(this.loc);
                    mid = component.pointAlongPathFrom(this.loc, this.length);
                    hxy = _jg.pointOnLine(txy, mid, this.length);
                    if (direction == -1) {
                        var __ = txy;
                        txy = hxy;
                        hxy = __;
                    }
                }
                else {
                    hxy = component.pointAlongPathFrom(this.loc, direction * this.length / 2);
                    mid = component.pointOnPath(this.loc);
                    txy = _jg.pointOnLine(hxy, mid, this.length);
                }

                tail = _jg.perpendicularLineTo(hxy, txy, this.width);
                cxy = _jg.pointOnLine(hxy, txy, foldback * this.length);

                var d = { hxy: hxy, tail: tail, cxy: cxy },
                    strokeStyle = paintStyle.strokeStyle || currentConnectionPaintStyle.strokeStyle,
                    fillStyle = paintStyle.fillStyle || currentConnectionPaintStyle.strokeStyle,
                    lineWidth = paintStyle.lineWidth || currentConnectionPaintStyle.lineWidth;

                return {
                    component: component,
                    d: d,
                    lineWidth: lineWidth,
                    strokeStyle: strokeStyle,
                    fillStyle: fillStyle,
                    minX: Math.min(hxy.x, tail[0].x, tail[1].x),
                    maxX: Math.max(hxy.x, tail[0].x, tail[1].x),
                    minY: Math.min(hxy.y, tail[0].y, tail[1].y),
                    maxY: Math.max(hxy.y, tail[0].y, tail[1].y)
                };
            }
            else return {component: component, minX: 0, maxX: 0, minY: 0, maxY: 0};
        };
    };
    _ju.extend(_jp.Overlays.Arrow, AbstractOverlay, {
        updateFrom:function(d) {
            this.length = d.length || this.length;
            this.width = d.width|| this.width;
            this.direction = d.direction != null ? d.direction : this.direction;
            this.foldback = d.foldback|| this.foldback;
        }
    });

    /*
     * Class: Overlays.PlainArrow
     *
     * A basic arrow.  This is in fact just one instance of the more generic case in which the tail folds back on itself to some
     * point along the length of the arrow: in this case, that foldback point is the full length of the arrow.  so it just does
     * a 'call' to Arrow with foldback set appropriately.
     */
    /*
     * Function: Constructor
     * See <Overlays.Arrow> for allowed parameters for this overlay.
     */
    _jp.Overlays.PlainArrow = function (params) {
        params = params || {};
        var p = _jp.extend(params, {foldback: 1});
        _jp.Overlays.Arrow.call(this, p);
        this.type = "PlainArrow";
    };
    _ju.extend(_jp.Overlays.PlainArrow, _jp.Overlays.Arrow);

    /*
     * Class: Overlays.Diamond
     * 
     * A diamond. Like PlainArrow, this is a concrete case of the more generic case of the tail points converging on some point...it just
     * happens that in this case, that point is greater than the length of the the arrow.
     *
     *      this could probably do with some help with positioning...due to the way it reuses the Arrow paint code, what Arrow thinks is the
     *      center is actually 1/4 of the way along for this guy.  but we don't have any knowledge of pixels at this point, so we're kind of
     *      stuck when it comes to helping out the Arrow class. possibly we could pass in a 'transpose' parameter or something. the value
     *      would be -l/4 in this case - move along one quarter of the total length.
     */
    /*
     * Function: Constructor
     * See <Overlays.Arrow> for allowed parameters for this overlay.
     */
    _jp.Overlays.Diamond = function (params) {
        params = params || {};
        var l = params.length || 40,
            p = jsPlumb.extend(params, {length: l / 2, foldback: 2});
        _jp.Overlays.Arrow.call(this, p);
        this.type = "Diamond";
    };
    _ju.extend(_jp.Overlays.Diamond, _jp.Overlays.Arrow);

    var _getDimensions = function (component, forceRefresh) {
        if (component._jsPlumb.cachedDimensions == null || forceRefresh)
            component._jsPlumb.cachedDimensions = component.getDimensions();
        return component._jsPlumb.cachedDimensions;
    };

    // abstract superclass for overlays that add an element to the DOM.
    var AbstractDOMOverlay = function (params) {
        _jp.jsPlumbUIComponent.apply(this, arguments);
        AbstractOverlay.apply(this, arguments);

        // hand off fired events to associated component.
        var _f = this.fire;
        this.fire = function () {
            _f.apply(this, arguments);
            if (this.component) this.component.fire.apply(this.component, arguments);
        };

        this.detached=false;
        this.id = params.id;
        this._jsPlumb.div = null;
        this._jsPlumb.initialised = false;
        this._jsPlumb.component = params.component;
        this._jsPlumb.cachedDimensions = null;
        this._jsPlumb.create = params.create;
        this._jsPlumb.initiallyInvisible = params.visible === false;

        this.getElement = function () {
            if (this._jsPlumb.div == null) {
                var div = this._jsPlumb.div = jsPlumb.getElement(this._jsPlumb.create(this._jsPlumb.component));
                div.style.position = "absolute";
                div.className = this._jsPlumb.instance.overlayClass + " " +
                    (this.cssClass ? this.cssClass :
                        params.cssClass ? params.cssClass : "");
                this._jsPlumb.instance.appendElement(div);
                this._jsPlumb.instance.getId(div);
                this.canvas = div;

                // in IE the top left corner is what it placed at the desired location.  This will not
                // be fixed. IE8 is not going to be supported for much longer.
                var ts = "translate(-50%, -50%)";
                div.style.webkitTransform = ts;
                div.style.mozTransform = ts;
                div.style.msTransform = ts;
                div.style.oTransform = ts;
                div.style.transform = ts;

                // write the related component into the created element
                div._jsPlumb = this;

                if (params.visible === false)
                    div.style.display = "none";
            }
            return this._jsPlumb.div;
        };

        this.draw = function (component, currentConnectionPaintStyle, absolutePosition) {
            var td = _getDimensions(this);
            if (td != null && td.length == 2) {
                var cxy = { x: 0, y: 0 };

                // absolutePosition would have been set by a call to connection.setAbsoluteOverlayPosition.
                if (absolutePosition) {
                    cxy = { x: absolutePosition[0], y: absolutePosition[1] };
                }
                else if (component.pointOnPath) {
                    var loc = this.loc, absolute = false;
                    if (_ju.isString(this.loc) || this.loc < 0 || this.loc > 1) {
                        loc = parseInt(this.loc, 10);
                        absolute = true;
                    }
                    cxy = component.pointOnPath(loc, absolute);  // a connection
                }
                else {
                    var locToUse = this.loc.constructor == Array ? this.loc : this.endpointLoc;
                    cxy = { x: locToUse[0] * component.w,
                        y: locToUse[1] * component.h };
                }

                var minx = cxy.x - (td[0] / 2),
                    miny = cxy.y - (td[1] / 2);

                return {
                    component: component,
                    d: { minx: minx, miny: miny, td: td, cxy: cxy },
                    minX: minx,
                    maxX: minx + td[0],
                    minY: miny,
                    maxY: miny + td[1]
                };
            }
            else return {minX: 0, maxX: 0, minY: 0, maxY: 0};
        };
    };
    _ju.extend(AbstractDOMOverlay, [_jp.jsPlumbUIComponent, AbstractOverlay], {
        getDimensions: function () {
            return [1,1];
        },
        setVisible: function (state) {
            if (this._jsPlumb.div) {
                this._jsPlumb.div.style.display = state ? "block" : "none";
                // if initially invisible, dimensions are 0,0 and never get updated
                if (state && this._jsPlumb.initiallyInvisible) {
                    _getDimensions(this, true);
                    this.component.repaint();
                    this._jsPlumb.initiallyInvisible = false;
                }
            }
        },
        /*
         * Function: clearCachedDimensions
         * Clears the cached dimensions for the label. As a performance enhancement, label dimensions are
         * cached from 1.3.12 onwards. The cache is cleared when you change the label text, of course, but
         * there are other reasons why the text dimensions might change - if you make a change through CSS, for
         * example, you might change the font size.  in that case you should explicitly call this method.
         */
        clearCachedDimensions: function () {
            this._jsPlumb.cachedDimensions = null;
        },
        cleanup: function (force) {
            if (force) {
                if (this._jsPlumb.div != null) {
                    this._jsPlumb.div._jsPlumb = null;
                    this._jsPlumb.instance.removeElement(this._jsPlumb.div);
                }
            }
            else {
                // if not a forced cleanup, just detach child from parent for now.
                if (this._jsPlumb && this._jsPlumb.div && this._jsPlumb.div.parentNode)
                    this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div);
                this.detached = true;
            }

        },
        reattach:function(instance) {
            if (this._jsPlumb.div != null) instance.getContainer().appendChild(this._jsPlumb.div);
            this.detached = false;
        },
        computeMaxSize: function () {
            var td = _getDimensions(this);
            return Math.max(td[0], td[1]);
        },
        paint: function (p, containerExtents) {
            if (!this._jsPlumb.initialised) {
                this.getElement();
                p.component.appendDisplayElement(this._jsPlumb.div);
                this._jsPlumb.initialised = true;
                if (this.detached) this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div);
            }
            this._jsPlumb.div.style.left = (p.component.x + p.d.minx) + "px";
            this._jsPlumb.div.style.top = (p.component.y + p.d.miny) + "px";
        }
    });

    /*
     * Class: Overlays.Custom
     * A Custom overlay. You supply a 'create' function which returns some DOM element, and jsPlumb positions it.
     * The 'create' function is passed a Connection or Endpoint.
     */
    /*
     * Function: Constructor
     * 
     * Parameters:
     * 	create - function for jsPlumb to call that returns a DOM element.
     * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the label should sit on the connector. defaults to 0.5.
     * 	id - optional id to use for later retrieval of this overlay.
     * 	
     */
    _jp.Overlays.Custom = function (params) {
        this.type = "Custom";
        AbstractDOMOverlay.apply(this, arguments);
    };
    _ju.extend(_jp.Overlays.Custom, AbstractDOMOverlay);

    _jp.Overlays.GuideLines = function () {
        var self = this;
        self.length = 50;
        self.lineWidth = 5;
        this.type = "GuideLines";
        AbstractOverlay.apply(this, arguments);
        _jp.jsPlumbUIComponent.apply(this, arguments);
        this.draw = function (connector, currentConnectionPaintStyle) {

            var head = connector.pointAlongPathFrom(self.loc, self.length / 2),
                mid = connector.pointOnPath(self.loc),
                tail = _jg.pointOnLine(head, mid, self.length),
                tailLine = _jg.perpendicularLineTo(head, tail, 40),
                headLine = _jg.perpendicularLineTo(tail, head, 20);

            return {
                connector: connector,
                head: head,
                tail: tail,
                headLine: headLine,
                tailLine: tailLine,
                minX: Math.min(head.x, tail.x, headLine[0].x, headLine[1].x),
                minY: Math.min(head.y, tail.y, headLine[0].y, headLine[1].y),
                maxX: Math.max(head.x, tail.x, headLine[0].x, headLine[1].x),
                maxY: Math.max(head.y, tail.y, headLine[0].y, headLine[1].y)
            };
        };

        // this.cleanup = function() { };  // nothing to clean up for GuideLines
    };

    /*
     * Class: Overlays.Label

     */
    /*
     * Function: Constructor
     * 
     * Parameters:
     * 	cssClass - optional css class string to append to css class. This string is appended "as-is", so you can of course have multiple classes
     *             defined.  This parameter is preferred to using labelStyle, borderWidth and borderStyle.
     * 	label - the label to paint.  May be a string or a function that returns a string.  Nothing will be painted if your label is null or your
     *         label function returns null.  empty strings _will_ be painted.
     * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the label should sit on the connector. defaults to 0.5.
     * 	id - optional id to use for later retrieval of this overlay.
     * 
     * 	
     */
    _jp.Overlays.Label = function (params) {
        this.labelStyle = params.labelStyle;

        var labelWidth = null, labelHeight = null, labelText = null, labelPadding = null;
        this.cssClass = this.labelStyle != null ? this.labelStyle.cssClass : null;
        var p = _jp.extend({
            create: function () {
                return jsPlumb.createElement("div");
            }}, params);
        _jp.Overlays.Custom.call(this, p);
        this.type = "Label";
        this.label = params.label || "";
        this.labelText = null;
        if (this.labelStyle) {
            var el = this.getElement();
            this.labelStyle.font = this.labelStyle.font || "12px sans-serif";
            el.style.font = this.labelStyle.font;
            el.style.color = this.labelStyle.color || "black";
            if (this.labelStyle.fillStyle) el.style.background = this.labelStyle.fillStyle;
            if (this.labelStyle.borderWidth > 0) {
                var dStyle = this.labelStyle.borderStyle ? this.labelStyle.borderStyle : "black";
                el.style.border = this.labelStyle.borderWidth + "px solid " + dStyle;
            }
            if (this.labelStyle.padding) el.style.padding = this.labelStyle.padding;
        }

    };
    _ju.extend(_jp.Overlays.Label, _jp.Overlays.Custom, {
        cleanup: function (force) {
            if (force) {
                this.div = null;
                this.label = null;
                this.labelText = null;
                this.cssClass = null;
                this.labelStyle = null;
            }
        },
        getLabel: function () {
            return this.label;
        },
        /*
         * Function: setLabel
         * sets the label's, um, label.  you would think i'd call this function
         * 'setText', but you can pass either a Function or a String to this, so
         * it makes more sense as 'setLabel'. This uses innerHTML on the label div, so keep
         * that in mind if you need escaped HTML.
         */
        setLabel: function (l) {
            this.label = l;
            this.labelText = null;
            this.clearCachedDimensions();
            this.update();
            this.component.repaint();
        },
        getDimensions: function () {
            this.update();
            return AbstractDOMOverlay.prototype.getDimensions.apply(this, arguments);
        },
        update: function () {
            if (typeof this.label == "function") {
                var lt = this.label(this);
                this.getElement().innerHTML = lt.replace(/\r\n/g, "<br/>");
            }
            else {
                if (this.labelText == null) {
                    this.labelText = this.label;
                    this.getElement().innerHTML = this.labelText.replace(/\r\n/g, "<br/>");
                }
            }
        },
        updateFrom:function(d) {
            if(d.label) this.setLabel(d.label);
        }
    });

    // ********************************* END OF OVERLAY DEFINITIONS ***********************************************************************

}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains the base class for library adapters.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
;(function() {
    "use strict";
    var root = this,
        _jp = root.jsPlumb;

    var _getEventManager = function(instance) {
        var e = instance._mottle;
        if (!e) {
            e = instance._mottle = new root.Mottle();
        }
        return e;
    };

    _jp.extend(root.jsPlumbInstance.prototype, {
        getEventManager:function() {
            return _getEventManager(this);
        },
        on : function(el, event, callback) {
            // TODO: here we would like to map the tap event if we know its
            // an internal bind to a click. we have to know its internal because only
            // then can we be sure that the UP event wont be consumed (tap is a synthesized
            // event from a mousedown followed by a mouseup).
            //event = { "click":"tap", "dblclick":"dbltap"}[event] || event;
            this.getEventManager().on.apply(this, arguments);
            return this;
        },
        off : function(el, event, callback) {
            this.getEventManager().off.apply(this, arguments);
            return this;
        }
    });


}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the 'flowchart' connectors, consisting of vertical and horizontal line segments.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var Flowchart = function (params) {
        this.type = "Flowchart";
        params = params || {};
        params.stub = params.stub == null ? 30 : params.stub;
        var segments,
            _super = _jp.Connectors.AbstractConnector.apply(this, arguments),
            midpoint = params.midpoint == null ? 0.5 : params.midpoint,
            alwaysRespectStubs = params.alwaysRespectStubs === true,
            userSuppliedSegments = null,
            lastx = null, lasty = null, lastOrientation,
            cornerRadius = params.cornerRadius != null ? params.cornerRadius : 0,
            sgn = function (n) {
                return n < 0 ? -1 : n === 0 ? 0 : 1;
            },
            /**
             * helper method to add a segment.
             */
            addSegment = function (segments, x, y, paintInfo) {
                if (lastx == x && lasty == y) return;
                var lx = lastx == null ? paintInfo.sx : lastx,
                    ly = lasty == null ? paintInfo.sy : lasty,
                    o = lx == x ? "v" : "h",
                    sgnx = sgn(x - lx),
                    sgny = sgn(y - ly);

                lastx = x;
                lasty = y;
                segments.push([lx, ly, x, y, o, sgnx, sgny]);
            },
            segLength = function (s) {
                return Math.sqrt(Math.pow(s[0] - s[2], 2) + Math.pow(s[1] - s[3], 2));
            },
            _cloneArray = function (a) {
                var _a = [];
                _a.push.apply(_a, a);
                return _a;
            },
            writeSegments = function (conn, segments, paintInfo) {
                var current = null, next;
                for (var i = 0; i < segments.length - 1; i++) {

                    current = current || _cloneArray(segments[i]);
                    next = _cloneArray(segments[i + 1]);
                    if (cornerRadius > 0 && current[4] != next[4]) {
                        var radiusToUse = Math.min(cornerRadius, segLength(current), segLength(next));
                        // right angle. adjust current segment's end point, and next segment's start point.
                        current[2] -= current[5] * radiusToUse;
                        current[3] -= current[6] * radiusToUse;
                        next[0] += next[5] * radiusToUse;
                        next[1] += next[6] * radiusToUse;
                        var ac = (current[6] == next[5] && next[5] == 1) ||
                                ((current[6] == next[5] && next[5] === 0) && current[5] != next[6]) ||
                                (current[6] == next[5] && next[5] == -1),
                            sgny = next[1] > current[3] ? 1 : -1,
                            sgnx = next[0] > current[2] ? 1 : -1,
                            sgnEqual = sgny == sgnx,
                            cx = (sgnEqual && ac || (!sgnEqual && !ac)) ? next[0] : current[2],
                            cy = (sgnEqual && ac || (!sgnEqual && !ac)) ? current[3] : next[1];

                        _super.addSegment(conn, "Straight", {
                            x1: current[0], y1: current[1], x2: current[2], y2: current[3]
                        });

                        _super.addSegment(conn, "Arc", {
                            r: radiusToUse,
                            x1: current[2],
                            y1: current[3],
                            x2: next[0],
                            y2: next[1],
                            cx: cx,
                            cy: cy,
                            ac: ac
                        });
                    }
                    else {
                        // dx + dy are used to adjust for line width.
                        var dx = (current[2] == current[0]) ? 0 : (current[2] > current[0]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2),
                            dy = (current[3] == current[1]) ? 0 : (current[3] > current[1]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2);
                        _super.addSegment(conn, "Straight", {
                            x1: current[0] - dx, y1: current[1] - dy, x2: current[2] + dx, y2: current[3] + dy
                        });
                    }
                    current = next;
                }
                if (next != null) {
                    // last segment
                    _super.addSegment(conn, "Straight", {
                        x1: next[0], y1: next[1], x2: next[2], y2: next[3]
                    });
                }
            };

        this.setSegments = function (s) {
            userSuppliedSegments = s;
        };

        this.isEditable = function () {
            return true;
        };

        /*
         Function: getOriginalSegments
         Gets the segments before the addition of rounded corners. This is used by the flowchart
         connector editor, since it only wants to concern itself with the original segments.
         */
        this.getOriginalSegments = function () {
            return userSuppliedSegments || segments;
        };

        this._compute = function (paintInfo, params) {

            if (params.clearEdits)
                userSuppliedSegments = null;

            if (userSuppliedSegments != null) {
                writeSegments(this, userSuppliedSegments, paintInfo);
                return;
            }

            segments = [];
            lastx = null;
            lasty = null;
            lastOrientation = null;

            var midx = paintInfo.startStubX + ((paintInfo.endStubX - paintInfo.startStubX) * midpoint),
                midy = paintInfo.startStubY + ((paintInfo.endStubY - paintInfo.startStubY) * midpoint);

            var orientations = { x: [ 0, 1 ], y: [ 1, 0 ] },
                commonStubCalculator = function () {
                    return [ paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY ];
                },
                stubCalculators = {
                    perpendicular: commonStubCalculator,
                    orthogonal: commonStubCalculator,
                    opposite: function (axis) {
                        var pi = paintInfo,
                            idx = axis == "x" ? 0 : 1,
                            areInProximity = {
                                "x": function () {
                                    return ( (pi.so[idx] == 1 && (
                                        ( (pi.startStubX > pi.endStubX) && (pi.tx > pi.startStubX) ) ||
                                        ( (pi.sx > pi.endStubX) && (pi.tx > pi.sx))))) ||

                                        ( (pi.so[idx] == -1 && (
                                            ( (pi.startStubX < pi.endStubX) && (pi.tx < pi.startStubX) ) ||
                                            ( (pi.sx < pi.endStubX) && (pi.tx < pi.sx)))));
                                },
                                "y": function () {
                                    return ( (pi.so[idx] == 1 && (
                                        ( (pi.startStubY > pi.endStubY) && (pi.ty > pi.startStubY) ) ||
                                        ( (pi.sy > pi.endStubY) && (pi.ty > pi.sy))))) ||

                                        ( (pi.so[idx] == -1 && (
                                            ( (pi.startStubY < pi.endStubY) && (pi.ty < pi.startStubY) ) ||
                                            ( (pi.sy < pi.endStubY) && (pi.ty < pi.sy)))));
                                }
                            };

                        if (!alwaysRespectStubs && areInProximity[axis]()) {
                            return {
                                "x": [(paintInfo.sx + paintInfo.tx) / 2, paintInfo.startStubY, (paintInfo.sx + paintInfo.tx) / 2, paintInfo.endStubY],
                                "y": [paintInfo.startStubX, (paintInfo.sy + paintInfo.ty) / 2, paintInfo.endStubX, (paintInfo.sy + paintInfo.ty) / 2]
                            }[axis];
                        }
                        else {
                            return [ paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY ];
                        }
                    }
                },
                lineCalculators = {
                    perpendicular: function (axis) {
                        var pi = paintInfo,
                            sis = {
                                x: [
                                    [ [ 1, 2, 3, 4 ], null, [ 2, 1, 4, 3 ] ],
                                    null,
                                    [ [ 4, 3, 2, 1 ], null, [ 3, 4, 1, 2 ] ]
                                ],
                                y: [
                                    [ [ 3, 2, 1, 4 ], null, [ 2, 3, 4, 1 ] ],
                                    null,
                                    [ [ 4, 1, 2, 3 ], null, [ 1, 4, 3, 2 ] ]
                                ]
                            },
                            stubs = {
                                x: [ [ pi.startStubX, pi.endStubX ], null, [ pi.endStubX, pi.startStubX ] ],
                                y: [ [ pi.startStubY, pi.endStubY ], null, [ pi.endStubY, pi.startStubY ] ]
                            },
                            midLines = {
                                x: [ [ midx, pi.startStubY ], [ midx, pi.endStubY ] ],
                                y: [ [ pi.startStubX, midy ], [ pi.endStubX, midy ] ]
                            },
                            linesToEnd = {
                                x: [ [ pi.endStubX, pi.startStubY ] ],
                                y: [ [ pi.startStubX, pi.endStubY ] ]
                            },
                            startToEnd = {
                                x: [ [ pi.startStubX, pi.endStubY ], [ pi.endStubX, pi.endStubY ] ],
                                y: [ [ pi.endStubX, pi.startStubY ], [ pi.endStubX, pi.endStubY ] ]
                            },
                            startToMidToEnd = {
                                x: [ [ pi.startStubX, midy ], [ pi.endStubX, midy ], [ pi.endStubX, pi.endStubY ] ],
                                y: [ [ midx, pi.startStubY ], [ midx, pi.endStubY ], [ pi.endStubX, pi.endStubY ] ]
                            },
                            otherStubs = {
                                x: [ pi.startStubY, pi.endStubY ],
                                y: [ pi.startStubX, pi.endStubX ]
                            },
                            soIdx = orientations[axis][0], toIdx = orientations[axis][1],
                            _so = pi.so[soIdx] + 1,
                            _to = pi.to[toIdx] + 1,
                            otherFlipped = (pi.to[toIdx] == -1 && (otherStubs[axis][1] < otherStubs[axis][0])) || (pi.to[toIdx] == 1 && (otherStubs[axis][1] > otherStubs[axis][0])),
                            stub1 = stubs[axis][_so][0],
                            stub2 = stubs[axis][_so][1],
                            segmentIndexes = sis[axis][_so][_to];

                        if (pi.segment == segmentIndexes[3] || (pi.segment == segmentIndexes[2] && otherFlipped)) {
                            return midLines[axis];
                        }
                        else if (pi.segment == segmentIndexes[2] && stub2 < stub1) {
                            return linesToEnd[axis];
                        }
                        else if ((pi.segment == segmentIndexes[2] && stub2 >= stub1) || (pi.segment == segmentIndexes[1] && !otherFlipped)) {
                            return startToMidToEnd[axis];
                        }
                        else if (pi.segment == segmentIndexes[0] || (pi.segment == segmentIndexes[1] && otherFlipped)) {
                            return startToEnd[axis];
                        }
                    },
                    orthogonal: function (axis, startStub, otherStartStub, endStub, otherEndStub) {
                        var pi = paintInfo,
                            extent = {
                                "x": pi.so[0] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub),
                                "y": pi.so[1] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub)
                            }[axis];

                        return {
                            "x": [
                                [ extent, otherStartStub ],
                                [ extent, otherEndStub ],
                                [ endStub, otherEndStub ]
                            ],
                            "y": [
                                [ otherStartStub, extent ],
                                [ otherEndStub, extent ],
                                [ otherEndStub, endStub ]
                            ]
                        }[axis];
                    },
                    opposite: function (axis, ss, oss, es) {
                        var pi = paintInfo,
                            otherAxis = {"x": "y", "y": "x"}[axis],
                            dim = {"x": "height", "y": "width"}[axis],
                            comparator = pi["is" + axis.toUpperCase() + "GreaterThanStubTimes2"];

                        if (params.sourceEndpoint.elementId == params.targetEndpoint.elementId) {
                            var _val = oss + ((1 - params.sourceEndpoint.anchor[otherAxis]) * params.sourceInfo[dim]) + _super.maxStub;
                            return {
                                "x": [
                                    [ ss, _val ],
                                    [ es, _val ]
                                ],
                                "y": [
                                    [ _val, ss ],
                                    [ _val, es ]
                                ]
                            }[axis];

                        }
                        else if (!comparator || (pi.so[idx] == 1 && ss > es) || (pi.so[idx] == -1 && ss < es)) {
                            return {
                                "x": [
                                    [ ss, midy ],
                                    [ es, midy ]
                                ],
                                "y": [
                                    [ midx, ss ],
                                    [ midx, es ]
                                ]
                            }[axis];
                        }
                        else if ((pi.so[idx] == 1 && ss < es) || (pi.so[idx] == -1 && ss > es)) {
                            return {
                                "x": [
                                    [ midx, pi.sy ],
                                    [ midx, pi.ty ]
                                ],
                                "y": [
                                    [ pi.sx, midy ],
                                    [ pi.tx, midy ]
                                ]
                            }[axis];
                        }
                    }
                };

            var stubs = stubCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis),
                idx = paintInfo.sourceAxis == "x" ? 0 : 1,
                oidx = paintInfo.sourceAxis == "x" ? 1 : 0,
                ss = stubs[idx],
                oss = stubs[oidx],
                es = stubs[idx + 2],
                oes = stubs[oidx + 2];

            // add the start stub segment.
            addSegment(segments, stubs[0], stubs[1], paintInfo);

            // compute the rest of the line
            var p = lineCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis, ss, oss, es, oes);
            if (p) {
                for (var i = 0; i < p.length; i++) {
                    addSegment(segments, p[i][0], p[i][1], paintInfo);
                }
            }

            // line to end stub
            addSegment(segments, stubs[2], stubs[3], paintInfo);

            // end stub to end
            addSegment(segments, paintInfo.tx, paintInfo.ty, paintInfo);

            writeSegments(this, segments, paintInfo);
        };

        this.getPath = function () {
            var _last = null, _lastAxis = null, s = [], segs = userSuppliedSegments || segments;
            for (var i = 0; i < segs.length; i++) {
                var seg = segs[i], axis = seg[4], axisIndex = (axis == "v" ? 3 : 2);
                if (_last != null && _lastAxis === axis) {
                    _last[axisIndex] = seg[axisIndex];
                }
                else {
                    if (seg[0] != seg[2] || seg[1] != seg[3]) {
                        s.push({
                            start: [ seg[0], seg[1] ],
                            end: [ seg[2], seg[3] ]
                        });
                        _last = seg;
                        _lastAxis = seg[4];
                    }
                }
            }
            return s;
        };

        this.setPath = function (path) {
            userSuppliedSegments = [];
            for (var i = 0; i < path.length; i++) {
                var lx = path[i].start[0],
                    ly = path[i].start[1],
                    x = path[i].end[0],
                    y = path[i].end[1],
                    o = lx == x ? "v" : "h",
                    sgnx = sgn(x - lx),
                    sgny = sgn(y - ly);

                userSuppliedSegments.push([lx, ly, x, y, o, sgnx, sgny]);
            }
        };
    };

    _ju.extend(Flowchart, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(Flowchart, "Flowchart");
}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the state machine connectors.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var _segment = function (x1, y1, x2, y2) {
            if (x1 <= x2 && y2 <= y1) return 1;
            else if (x1 <= x2 && y1 <= y2) return 2;
            else if (x2 <= x1 && y2 >= y1) return 3;
            return 4;
        },

    // the control point we will use depends on the faces to which each end of the connection is assigned, specifically whether or not the
    // two faces are parallel or perpendicular.  if they are parallel then the control point lies on the midpoint of the axis in which they
    // are parellel and varies only in the other axis; this variation is proportional to the distance that the anchor points lie from the
    // center of that face.  if the two faces are perpendicular then the control point is at some distance from both the midpoints; the amount and
    // direction are dependent on the orientation of the two elements. 'seg', passed in to this method, tells you which segment the target element
    // lies in with respect to the source: 1 is top right, 2 is bottom right, 3 is bottom left, 4 is top left.
    //
    // sourcePos and targetPos are arrays of info about where on the source and target each anchor is located.  their contents are:
    //
    // 0 - absolute x
    // 1 - absolute y
    // 2 - proportional x in element (0 is left edge, 1 is right edge)
    // 3 - proportional y in element (0 is top edge, 1 is bottom edge)
    //
        _findControlPoint = function (midx, midy, segment, sourceEdge, targetEdge, dx, dy, distance, proximityLimit) {
            // TODO (maybe)
            // - if anchor pos is 0.5, make the control point take into account the relative position of the elements.
            if (distance <= proximityLimit) return [midx, midy];

            if (segment === 1) {
                if (sourceEdge[3] <= 0 && targetEdge[3] >= 1) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] >= 1 && targetEdge[2] <= 0) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + (-1 * dx) , midy + (-1 * dy) ];
            }
            else if (segment === 2) {
                if (sourceEdge[3] >= 1 && targetEdge[3] <= 0) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] >= 1 && targetEdge[2] <= 0) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + dx, midy + (-1 * dy) ];
            }
            else if (segment === 3) {
                if (sourceEdge[3] >= 1 && targetEdge[3] <= 0) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] <= 0 && targetEdge[2] >= 1) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + (-1 * dx) , midy + (-1 * dy) ];
            }
            else if (segment === 4) {
                if (sourceEdge[3] <= 0 && targetEdge[3] >= 1) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] <= 0 && targetEdge[2] >= 1) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + dx , midy + (-1 * dy) ];
            }

        };

    var StateMachine = function (params) {
        params = params || {};
        this.type = "StateMachine";

        var _super = _jp.Connectors.AbstractConnector.apply(this, arguments),
            curviness = params.curviness || 10,
            margin = params.margin || 5,
            proximityLimit = params.proximityLimit || 80,
            clockwise = params.orientation && params.orientation === "clockwise",
            loopbackRadius = params.loopbackRadius || 25,
            showLoopback = params.showLoopback !== false;

        this._compute = function (paintInfo, params) {
            var w = Math.abs(params.sourcePos[0] - params.targetPos[0]),
                h = Math.abs(params.sourcePos[1] - params.targetPos[1]);

            if (!showLoopback || (params.sourceEndpoint.elementId !== params.targetEndpoint.elementId)) {
                var _sx = params.sourcePos[0] < params.targetPos[0] ? 0 : w,
                    _sy = params.sourcePos[1] < params.targetPos[1] ? 0 : h,
                    _tx = params.sourcePos[0] < params.targetPos[0] ? w : 0,
                    _ty = params.sourcePos[1] < params.targetPos[1] ? h : 0;

                // now adjust for the margin
                if (params.sourcePos[2] === 0) _sx -= margin;
                if (params.sourcePos[2] === 1) _sx += margin;
                if (params.sourcePos[3] === 0) _sy -= margin;
                if (params.sourcePos[3] === 1) _sy += margin;
                if (params.targetPos[2] === 0) _tx -= margin;
                if (params.targetPos[2] === 1) _tx += margin;
                if (params.targetPos[3] === 0) _ty -= margin;
                if (params.targetPos[3] === 1) _ty += margin;

                //
                // these connectors are quadratic bezier curves, having a single control point. if both anchors
                // are located at 0.5 on their respective faces, the control point is set to the midpoint and you
                // get a straight line.  this is also the case if the two anchors are within 'proximityLimit', since
                // it seems to make good aesthetic sense to do that. outside of that, the control point is positioned
                // at 'curviness' pixels away along the normal to the straight line connecting the two anchors.
                //
                // there may be two improvements to this.  firstly, we might actually support the notion of avoiding nodes
                // in the UI, or at least making a good effort at doing so.  if a connection would pass underneath some node,
                // for example, we might increase the distance the control point is away from the midpoint in a bid to
                // steer it around that node.  this will work within limits, but i think those limits would also be the likely
                // limits for, once again, aesthetic good sense in the layout of a chart using these connectors.
                //
                // the second possible change is actually two possible changes: firstly, it is possible we should gradually
                // decrease the 'curviness' as the distance between the anchors decreases; start tailing it off to 0 at some
                // point (which should be configurable).  secondly, we might slightly increase the 'curviness' for connectors
                // with respect to how far their anchor is from the center of its respective face. this could either look cool,
                // or stupid, and may indeed work only in a way that is so subtle as to have been a waste of time.
                //

                var _midx = (_sx + _tx) / 2,
                    _midy = (_sy + _ty) / 2,
                    segment = _segment(_sx, _sy, _tx, _ty),
                    distance = Math.sqrt(Math.pow(_tx - _sx, 2) + Math.pow(_ty - _sy, 2)),
                    // calculate the control point.  this code will be where we'll put in a rudimentary element avoidance scheme; it
                    // will work by extending the control point to force the curve to be, um, curvier.
                    _controlPoint = _findControlPoint(_midx,
                        _midy,
                        segment,
                        params.sourcePos,
                        params.targetPos,
                        curviness, curviness,
                        distance,
                        proximityLimit);

                _super.addSegment(this, "Bezier", {
                    x1: _tx, y1: _ty, x2: _sx, y2: _sy,
                    cp1x: _controlPoint[0], cp1y: _controlPoint[1],
                    cp2x: _controlPoint[0], cp2y: _controlPoint[1]
                });
            }
            else {
                // a loopback connector.  draw an arc from one anchor to the other.
                var x1 = params.sourcePos[0], y1 = params.sourcePos[1] - margin,
                    cx = x1, cy = y1 - loopbackRadius,
                // canvas sizing stuff, to ensure the whole painted area is visible.
                    _w = 2 * loopbackRadius,
                    _h = 2 * loopbackRadius,
                    _x = cx - loopbackRadius,
                    _y = cy - loopbackRadius;

                paintInfo.points[0] = _x;
                paintInfo.points[1] = _y;
                paintInfo.points[2] = _w;
                paintInfo.points[3] = _h;

                // ADD AN ARC SEGMENT.
                _super.addSegment(this, "Arc", {
                    loopback: true,
                    x1: (x1 - _x) + 4,
                    y1: y1 - _y,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    r: loopbackRadius,
                    ac: !clockwise,
                    x2: (x1 - _x) - 4,
                    y2: y1 - _y,
                    cx: cx - _x,
                    cy: cy - _y
                });
            }
        };
    };
    _ju.extend(StateMachine, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(StateMachine, "StateMachine");
}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for the Bezier connector type.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var Bezier = function (params) {
        params = params || {};

        var _super = _jp.Connectors.AbstractConnector.apply(this, arguments),
            majorAnchor = params.curviness || 150,
            minorAnchor = 10;

        this.type = "Bezier";
        this.getCurviness = function () {
            return majorAnchor;
        };

        this._findControlPoint = function (point, sourceAnchorPosition, targetAnchorPosition, sourceEndpoint, targetEndpoint, soo, too) {
            // determine if the two anchors are perpendicular to each other in their orientation.  we swap the control
            // points around if so (code could be tightened up)
            var perpendicular = soo[0] != too[0] || soo[1] == too[1],
                p = [];

            if (!perpendicular) {
                if (soo[0] === 0) // X
                    p.push(sourceAnchorPosition[0] < targetAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                else p.push(point[0] - (majorAnchor * soo[0]));

                if (soo[1] === 0) // Y
                    p.push(sourceAnchorPosition[1] < targetAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                else p.push(point[1] + (majorAnchor * too[1]));
            }
            else {
                if (too[0] === 0) // X
                    p.push(targetAnchorPosition[0] < sourceAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                else p.push(point[0] + (majorAnchor * too[0]));

                if (too[1] === 0) // Y
                    p.push(targetAnchorPosition[1] < sourceAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                else p.push(point[1] + (majorAnchor * soo[1]));
            }

            return p;
        };

        this._compute = function (paintInfo, p) {
            var sp = p.sourcePos,
                tp = p.targetPos,
                _w = Math.abs(sp[0] - tp[0]),
                _h = Math.abs(sp[1] - tp[1]),
                _sx = sp[0] < tp[0] ? _w : 0,
                _sy = sp[1] < tp[1] ? _h : 0,
                _tx = sp[0] < tp[0] ? 0 : _w,
                _ty = sp[1] < tp[1] ? 0 : _h,
                _CP = this._findControlPoint([_sx, _sy], sp, tp, p.sourceEndpoint, p.targetEndpoint, paintInfo.so, paintInfo.to),
                _CP2 = this._findControlPoint([_tx, _ty], tp, sp, p.targetEndpoint, p.sourceEndpoint, paintInfo.to, paintInfo.so);

            _super.addSegment(this, "Bezier", {
                x1: _sx, y1: _sy, x2: _tx, y2: _ty,
                cp1x: _CP[0], cp1y: _CP[1], cp2x: _CP2[0], cp2y: _CP2[1]
            });
        };
    };

    _ju.extend(Bezier, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(Bezier, "Bezier");

}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the SVG renderers.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

// ************************** SVG utility methods ********************************************	

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var svgAttributeMap = {
            "stroke-linejoin": "stroke-linejoin",
            "stroke-dashoffset": "stroke-dashoffset",
            "stroke-linecap": "stroke-linecap"
        },
        STROKE_DASHARRAY = "stroke-dasharray",
        DASHSTYLE = "dashstyle",
        LINEAR_GRADIENT = "linearGradient",
        RADIAL_GRADIENT = "radialGradient",
        DEFS = "defs",
        FILL = "fill",
        STOP = "stop",
        STROKE = "stroke",
        STROKE_WIDTH = "stroke-width",
        STYLE = "style",
        NONE = "none",
        JSPLUMB_GRADIENT = "jsplumb_gradient_",
        LINE_WIDTH = "lineWidth",
        ns = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml"
        },
        _attr = function (node, attributes) {
            for (var i in attributes)
                node.setAttribute(i, "" + attributes[i]);
        },
        _node = function (name, attributes) {
            attributes = attributes || {};
            attributes.version = "1.1";
            attributes.xmlns = ns.xhtml;
            return jsPlumb.createElementNS(ns.svg, name, null, null, attributes);
        },
        _pos = function (d) {
            return "position:absolute;left:" + d[0] + "px;top:" + d[1] + "px";
        },
        _clearGradient = function (parent) {
            var els = parent.querySelectorAll(" defs,linearGradient,radialGradient");
            for (var i = 0; i < els.length; i++)
                els[i].parentNode.removeChild(els[i]);
        },
        _updateGradient = function (parent, node, style, dimensions, uiComponent) {
            var id = JSPLUMB_GRADIENT + uiComponent._jsPlumb.instance.idstamp();
            // first clear out any existing gradient
            _clearGradient(parent);
            // this checks for an 'offset' property in the gradient, and in the absence of it, assumes
            // we want a linear gradient. if it's there, we create a radial gradient.
            // it is possible that a more explicit means of defining the gradient type would be
            // better. relying on 'offset' means that we can never have a radial gradient that uses
            // some default offset, for instance.
            // issue 244 suggested the 'gradientUnits' attribute; without this, straight/flowchart connectors with gradients would
            // not show gradients when the line was perfectly horizontal or vertical.
            var g;
            if (!style.gradient.offset)
                g = _node(LINEAR_GRADIENT, {id: id, gradientUnits: "userSpaceOnUse"});
            else
                g = _node(RADIAL_GRADIENT, { id: id });

            var defs = _node(DEFS);
            parent.appendChild(defs);
            defs.appendChild(g);

            // the svg radial gradient seems to treat stops in the reverse
            // order to how canvas does it.  so we want to keep all the maths the same, but
            // iterate the actual style declarations in reverse order, if the x indexes are not in order.
            for (var i = 0; i < style.gradient.stops.length; i++) {
                var styleToUse = uiComponent.segment == 1 || uiComponent.segment == 2 ? i : style.gradient.stops.length - 1 - i,
                    //stopColor = _ju.convertStyle(style.gradient.stops[styleToUse][1], true),
                    stopColor = style.gradient.stops[styleToUse][1],
                    s = _node(STOP, {"offset": Math.floor(style.gradient.stops[i][0] * 100) + "%", "stop-color": stopColor});

                g.appendChild(s);
            }
            var applyGradientTo = style.strokeStyle ? STROKE : FILL;
            node.setAttribute(applyGradientTo, "url(#" + id + ")");
        },
        _applyStyles = function (parent, node, style, dimensions, uiComponent) {

            node.setAttribute(FILL, style.fillStyle ? style.fillStyle : NONE);
            node.setAttribute(STROKE, style.strokeStyle ? style.strokeStyle : NONE);

            if (style.gradient) {
                _updateGradient(parent, node, style, dimensions, uiComponent);
            }
            else {
                // make sure we clear any existing gradient
                _clearGradient(parent);
                node.setAttribute(STYLE, "");
            }

            if (style.lineWidth) {
                node.setAttribute(STROKE_WIDTH, style.lineWidth);
            }

            // in SVG there is a stroke-dasharray attribute we can set, and its syntax looks like
            // the syntax in VML but is actually kind of nasty: values are given in the pixel
            // coordinate space, whereas in VML they are multiples of the width of the stroked
            // line, which makes a lot more sense.  for that reason, jsPlumb is supporting both
            // the native svg 'stroke-dasharray' attribute, and also the 'dashstyle' concept from
            // VML, which will be the preferred method.  the code below this converts a dashstyle
            // attribute given in terms of stroke width into a pixel representation, by using the
            // stroke's lineWidth.
            if (style[DASHSTYLE] && style[LINE_WIDTH] && !style[STROKE_DASHARRAY]) {
                var sep = style[DASHSTYLE].indexOf(",") == -1 ? " " : ",",
                    parts = style[DASHSTYLE].split(sep),
                    styleToUse = "";
                parts.forEach(function (p) {
                    styleToUse += (Math.floor(p * style.lineWidth) + sep);
                });
                node.setAttribute(STROKE_DASHARRAY, styleToUse);
            }
            else if (style[STROKE_DASHARRAY]) {
                node.setAttribute(STROKE_DASHARRAY, style[STROKE_DASHARRAY]);
            }

            // extra attributes such as join type, dash offset.
            for (var i in svgAttributeMap) {
                if (style[i]) {
                    node.setAttribute(svgAttributeMap[i], style[i]);
                }
            }
        },
        _appendAtIndex = function (svg, path, idx) {
            if (svg.childNodes.length > idx) {
                svg.insertBefore(path, svg.childNodes[idx]);
            }
            else svg.appendChild(path);
        };

    /**
     utility methods for other objects to use.
     */
    _ju.svg = {
        node: _node,
        attr: _attr,
        pos: _pos
    };

    // ************************** / SVG utility methods ********************************************

    /*
     * Base class for SVG components.
     */
    var SvgComponent = function (params) {
        var pointerEventsSpec = params.pointerEventsSpec || "all", renderer = {};

        _jp.jsPlumbUIComponent.apply(this, params.originalArgs);
        this.canvas = null;
        this.path = null;
        this.svg = null;
        this.bgCanvas = null;

        var clazz = params.cssClass + " " + (params.originalArgs[0].cssClass || ""),
            svgParams = {
                "style": "",
                "width": 0,
                "height": 0,
                "pointer-events": pointerEventsSpec,
                "position": "absolute"
            };

        this.svg = _node("svg", svgParams);

        if (params.useDivWrapper) {
            this.canvas = jsPlumb.createElement("div", { position : "absolute" });
            _ju.sizeElement(this.canvas, 0, 0, 1, 1);
            this.canvas.className = clazz;
        }
        else {
            _attr(this.svg, { "class": clazz });
            this.canvas = this.svg;
        }

        params._jsPlumb.appendElement(this.canvas, params.originalArgs[0].parent);
        if (params.useDivWrapper) this.canvas.appendChild(this.svg);

        var displayElements = [ this.canvas ];
        this.getDisplayElements = function () {
            return displayElements;
        };

        this.appendDisplayElement = function (el) {
            displayElements.push(el);
        };

        this.paint = function (style, anchor, extents) {
            if (style != null) {

                var xy = [ this.x, this.y ], wh = [ this.w, this.h ], p;
                if (extents != null) {
                    if (extents.xmin < 0) xy[0] += extents.xmin;
                    if (extents.ymin < 0) xy[1] += extents.ymin;
                    wh[0] = extents.xmax + ((extents.xmin < 0) ? -extents.xmin : 0);
                    wh[1] = extents.ymax + ((extents.ymin < 0) ? -extents.ymin : 0);
                }

                if (params.useDivWrapper) {
                    _ju.sizeElement(this.canvas, xy[0], xy[1], wh[0], wh[1]);
                    xy[0] = 0;
                    xy[1] = 0;
                    p = _pos([ 0, 0 ]);
                }
                else
                    p = _pos([ xy[0], xy[1] ]);

                renderer.paint.apply(this, arguments);

                _attr(this.svg, {
                    "style": p,
                    "width": wh[0] || 0,
                    "height": wh[1] || 0
                });
            }
        };

        return {
            renderer: renderer
        };
    };

    _ju.extend(SvgComponent, _jp.jsPlumbUIComponent, {
        cleanup: function (force) {
            if (force || this.typeId == null) {
                if (this.canvas) this.canvas._jsPlumb = null;
                if (this.svg) this.svg._jsPlumb = null;
                if (this.bgCanvas) this.bgCanvas._jsPlumb = null;

                if (this.canvas && this.canvas.parentNode)
                    this.canvas.parentNode.removeChild(this.canvas);
                if (this.bgCanvas && this.bgCanvas.parentNode)
                    this.canvas.parentNode.removeChild(this.canvas);

                this.svg = null;
                this.canvas = null;
                this.path = null;
                this.group = null;
            }
            else {
                // if not a forced cleanup, just detach from DOM for now.
                if (this.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
                if (this.bgCanvas && this.bgCanvas.parentNode) this.bgCanvas.parentNode.removeChild(this.bgCanvas);
            }
        },
        reattach:function(instance) {
            var c = instance.getContainer();
            if (this.canvas && this.canvas.parentNode == null) c.appendChild(this.canvas);
            if (this.bgCanvas && this.bgCanvas.parentNode == null) c.appendChild(this.bgCanvas);
        },
        setVisible: function (v) {
            if (this.canvas) {
                this.canvas.style.display = v ? "block" : "none";
            }
        }
    });

    /*
     * Base class for SVG connectors.
     */
    _jp.ConnectorRenderers.svg = function (params) {
        var self = this,
            _super = SvgComponent.apply(this, [
                {
                    cssClass: params._jsPlumb.connectorClass,
                    originalArgs: arguments,
                    pointerEventsSpec: "none",
                    _jsPlumb: params._jsPlumb
                }
            ]);

        _super.renderer.paint = function (style, anchor, extents) {

            var segments = self.getSegments(), p = "", offset = [0, 0];
            if (extents.xmin < 0) offset[0] = -extents.xmin;
            if (extents.ymin < 0) offset[1] = -extents.ymin;

            if (segments.length > 0) {

                // create path from segments.
                for (var i = 0; i < segments.length; i++) {
                    p += _jp.Segments.svg.SegmentRenderer.getPath(segments[i]);
                    p += " ";
                }

                var a = {
                        d: p,
                        transform: "translate(" + offset[0] + "," + offset[1] + ")",
                        "pointer-events": params["pointer-events"] || "visibleStroke"
                    },
                    outlineStyle = null,
                    d = [self.x, self.y, self.w, self.h];

                // outline style.  actually means drawing an svg object underneath the main one.
                if (style.outlineColor) {
                    var outlineWidth = style.outlineWidth || 1,
                        outlineStrokeWidth = style.lineWidth + (2 * outlineWidth);
                    outlineStyle = _jp.extend({}, style);
                    delete outlineStyle.gradient;
                    outlineStyle.strokeStyle = style.outlineColor;
                    outlineStyle.lineWidth = outlineStrokeWidth;

                    if (self.bgPath == null) {
                        self.bgPath = _node("path", a);
                        _jp.addClass(self.bgPath, _jp.connectorOutlineClass);
                        _appendAtIndex(self.svg, self.bgPath, 0);
                    }
                    else {
                        _attr(self.bgPath, a);
                    }

                    _applyStyles(self.svg, self.bgPath, outlineStyle, d, self);
                }

                if (self.path == null) {
                    self.path = _node("path", a);
                    _appendAtIndex(self.svg, self.path, style.outlineColor ? 1 : 0);
                }
                else {
                    _attr(self.path, a);
                }

                _applyStyles(self.svg, self.path, style, d, self);
            }
        };
    };
    _ju.extend(_jp.ConnectorRenderers.svg, SvgComponent);

// ******************************* svg segment renderer *****************************************************	

    _jp.Segments.svg = {
        SegmentRenderer: {
            getPath: function (segment) {
                return ({
                    "Straight": function () {
                        var d = segment.getCoordinates();
                        return "M " + d.x1 + " " + d.y1 + " L " + d.x2 + " " + d.y2;
                    },
                    "Bezier": function () {
                        var d = segment.params;
                        return "M " + d.x1 + " " + d.y1 +
                            " C " + d.cp1x + " " + d.cp1y + " " + d.cp2x + " " + d.cp2y + " " + d.x2 + " " + d.y2;
                    },
                    "Arc": function () {
                        var d = segment.params,
                            laf = segment.sweep > Math.PI ? 1 : 0,
                            sf = segment.anticlockwise ? 0 : 1;

                        return "M" + segment.x1 + " " + segment.y1 + " A " + segment.radius + " " + d.r + " 0 " + laf + "," + sf + " " + segment.x2 + " " + segment.y2;
                    }
                })[segment.type]();
            }
        }
    };

// ******************************* /svg segments *****************************************************

    /*
     * Base class for SVG endpoints.
     */
    var SvgEndpoint = _jp.SvgEndpoint = function (params) {
        var _super = SvgComponent.apply(this, [
            {
                cssClass: params._jsPlumb.endpointClass,
                originalArgs: arguments,
                pointerEventsSpec: "all",
                useDivWrapper: true,
                _jsPlumb: params._jsPlumb
            }
        ]);

        _super.renderer.paint = function (style) {
            var s = _jp.extend({}, style);
            if (s.outlineColor) {
                s.strokeWidth = s.outlineWidth;
                s.strokeStyle = s.outlineColor;
            }

            if (this.node == null) {
                this.node = this.makeNode(s);
                this.svg.appendChild(this.node);
            }
            else if (this.updateNode != null) {
                this.updateNode(this.node);
            }
            _applyStyles(this.svg, this.node, s, [ this.x, this.y, this.w, this.h ], this);
            _pos(this.node, [ this.x, this.y ]);
        }.bind(this);

    };
    _ju.extend(SvgEndpoint, SvgComponent);

    /*
     * SVG Dot Endpoint
     */
    _jp.Endpoints.svg.Dot = function () {
        _jp.Endpoints.Dot.apply(this, arguments);
        SvgEndpoint.apply(this, arguments);
        this.makeNode = function (style) {
            return _node("circle", {
                "cx": this.w / 2,
                "cy": this.h / 2,
                "r": this.radius
            });
        };
        this.updateNode = function (node) {
            _attr(node, {
                "cx": this.w / 2,
                "cy": this.h / 2,
                "r": this.radius
            });
        };
    };
    _ju.extend(_jp.Endpoints.svg.Dot, [_jp.Endpoints.Dot, SvgEndpoint]);

    /*
     * SVG Rectangle Endpoint
     */
    _jp.Endpoints.svg.Rectangle = function () {
        _jp.Endpoints.Rectangle.apply(this, arguments);
        SvgEndpoint.apply(this, arguments);
        this.makeNode = function (style) {
            return _node("rect", {
                "width": this.w,
                "height": this.h
            });
        };
        this.updateNode = function (node) {
            _attr(node, {
                "width": this.w,
                "height": this.h
            });
        };
    };
    _ju.extend(_jp.Endpoints.svg.Rectangle, [_jp.Endpoints.Rectangle, SvgEndpoint]);

    /*
     * SVG Image Endpoint is the default image endpoint.
     */
    _jp.Endpoints.svg.Image = _jp.Endpoints.Image;
    /*
     * Blank endpoint in svg renderer is the default Blank endpoint.
     */
    _jp.Endpoints.svg.Blank = _jp.Endpoints.Blank;
    /*
     * Label overlay in svg renderer is the default Label overlay.
     */
    _jp.Overlays.svg.Label = _jp.Overlays.Label;
    /*
     * Custom overlay in svg renderer is the default Custom overlay.
     */
    _jp.Overlays.svg.Custom = _jp.Overlays.Custom;

    var AbstractSvgArrowOverlay = function (superclass, originalArgs) {
        superclass.apply(this, originalArgs);
        _jp.jsPlumbUIComponent.apply(this, originalArgs);
        this.isAppendedAtTopLevel = false;
        var self = this;
        this.path = null;
        this.paint = function (params, containerExtents) {
            // only draws on connections, not endpoints.
            if (params.component.svg && containerExtents) {
                if (this.path == null) {
                    this.path = _node("path", {
                        "pointer-events": "all"
                    });
                    params.component.svg.appendChild(this.path);

                    this.canvas = params.component.svg; // for the sake of completeness; this behaves the same as other overlays
                }
                var clazz = originalArgs && (originalArgs.length == 1) ? (originalArgs[0].cssClass || "") : "",
                    offset = [0, 0];

                if (containerExtents.xmin < 0) offset[0] = -containerExtents.xmin;
                if (containerExtents.ymin < 0) offset[1] = -containerExtents.ymin;

                _attr(this.path, {
                    "d": makePath(params.d),
                    "class": clazz,
                    stroke: params.strokeStyle ? params.strokeStyle : null,
                    fill: params.fillStyle ? params.fillStyle : null,
                    transform: "translate(" + offset[0] + "," + offset[1] + ")"
                });
            }
        };
        var makePath = function (d) {
            return (isNaN(d.cxy.x) || isNaN(d.cxy.y)) ? "" : "M" + d.hxy.x + "," + d.hxy.y +
                " L" + d.tail[0].x + "," + d.tail[0].y +
                " L" + d.cxy.x + "," + d.cxy.y +
                " L" + d.tail[1].x + "," + d.tail[1].y +
                " L" + d.hxy.x + "," + d.hxy.y;
        };
        this.transfer = function(target) {
            if (target.canvas && this.path && this.path.parentNode) {
                this.path.parentNode.removeChild(this.path);
                target.canvas.appendChild(this.path);
            }
        };
    };
    _ju.extend(AbstractSvgArrowOverlay, [_jp.jsPlumbUIComponent, _jp.Overlays.AbstractOverlay], {
        cleanup: function (force) {
            if (this.path != null) {
                if (force)
                    this._jsPlumb.instance.removeElement(this.path);
                else
                    if (this.path.parentNode)
                        this.path.parentNode.removeChild(this.path);
            }
        },
        reattach:function(instance) {
            if (this.path && this.canvas && this.path.parentNode == null)
                this.canvas.appendChild(this.path);
        },
        setVisible: function (v) {
            if (this.path != null) (this.path.style.display = (v ? "block" : "none"));
        }
    });

    _jp.Overlays.svg.Arrow = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.Arrow, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.Arrow, [ _jp.Overlays.Arrow, AbstractSvgArrowOverlay ]);

    _jp.Overlays.svg.PlainArrow = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.PlainArrow, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.PlainArrow, [ _jp.Overlays.PlainArrow, AbstractSvgArrowOverlay ]);

    _jp.Overlays.svg.Diamond = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.Diamond, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.Diamond, [ _jp.Overlays.Diamond, AbstractSvgArrowOverlay ]);

    // a test
    _jp.Overlays.svg.GuideLines = function () {
        var path = null, self = this, p1_1, p1_2;
        _jp.Overlays.GuideLines.apply(this, arguments);
        this.paint = function (params, containerExtents) {
            if (path == null) {
                path = _node("path");
                params.connector.svg.appendChild(path);
                self.attachListeners(path, params.connector);
                self.attachListeners(path, self);

                p1_1 = _node("path");
                params.connector.svg.appendChild(p1_1);
                self.attachListeners(p1_1, params.connector);
                self.attachListeners(p1_1, self);

                p1_2 = _node("path");
                params.connector.svg.appendChild(p1_2);
                self.attachListeners(p1_2, params.connector);
                self.attachListeners(p1_2, self);
            }

            var offset = [0, 0];
            if (containerExtents.xmin < 0) offset[0] = -containerExtents.xmin;
            if (containerExtents.ymin < 0) offset[1] = -containerExtents.ymin;

            _attr(path, {
                "d": makePath(params.head, params.tail),
                stroke: "red",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });

            _attr(p1_1, {
                "d": makePath(params.tailLine[0], params.tailLine[1]),
                stroke: "blue",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });

            _attr(p1_2, {
                "d": makePath(params.headLine[0], params.headLine[1]),
                stroke: "green",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });
        };

        var makePath = function (d1, d2) {
            return "M " + d1.x + "," + d1.y +
                " L" + d2.x + "," + d2.y;
        };
    };
    _ju.extend(_jp.Overlays.svg.GuideLines, _jp.Overlays.GuideLines);
}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the 'vanilla' adapter - having no external dependencies other than bundled libs.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil,
        _jk = root.Katavorio, _jg = root.Biltong;

    var _getDragManager = function (instance, category) {

        category = category || "main";
        var key = "_katavorio_" + category;
        var k = instance[key],
            e = instance.getEventManager();

        if (!k) {
            k = new _jk({
                bind: e.on,
                unbind: e.off,
                getSize: jsPlumb.getSize,
                getPosition: function (el) {
                    // if this is a nested draggable then compute the offset against its own offsetParent, otherwise
                    // compute against the Container's origin. see also the getUIPosition method below.
                    var o = instance.getOffset(el, false, el._katavorioDrag ? el.offsetParent : null);
                    return [o.left, o.top];
                },
                setPosition: function (el, xy) {
                    el.style.left = xy[0] + "px";
                    el.style.top = xy[1] + "px";
                },
                addClass: jsPlumb.addClass,
                removeClass: jsPlumb.removeClass,
                intersects: _jg.intersects,
                indexOf: function(l, i) { return l.indexOf(i); },
                css: {
                    noSelect: instance.dragSelectClass,
                    droppable: "jsplumb-droppable",
                    draggable: "jsplumb-draggable",
                    drag: "jsplumb-drag",
                    selected: "jsplumb-drag-selected",
                    active: "jsplumb-drag-active",
                    hover: "jsplumb-drag-hover"
                }
            });
            instance[key] = k;
            instance.bind("zoom", k.setZoom);
        }
        return k;
    };

    var _animProps = function (o, p) {
        var _one = function (pName) {
            if (p[pName] != null) {
                if (_ju.isString(p[pName])) {
                    var m = p[pName].match(/-=/) ? -1 : 1,
                        v = p[pName].substring(2);
                    return o[pName] + (m * v);
                }
                else return p[pName];
            }
            else
                return o[pName];
        };
        return [ _one("left"), _one("top") ];
    };

    _jp.extend(root.jsPlumbInstance.prototype, {

        animationSupported:true,
        getElement: function (el) {
            if (el == null) return null;
            // here we pluck the first entry if el was a list of entries.
            // this is not my favourite thing to do, but previous versions of
            // jsplumb supported jquery selectors, and it is possible a selector
            // will be passed in here.
            el = typeof el === "string" ? el : el.length != null && el.enctype == null ? el[0] : el;
            return typeof el === "string" ? document.getElementById(el) : el;
        },
        removeElement: function (element) {
            _getDragManager(this).elementRemoved(element);
            this.getEventManager().remove(element);
        },
        //
        // this adapter supports a rudimentary animation function. no easing is supported.  only
        // left/top properties are supported. property delta args are expected to be in the form
        //
        // +=x.xxxx
        //
        // or
        //
        // -=x.xxxx
        //
        doAnimate: function (el, properties, options) {
            options = options || {};
            var o = this.getOffset(el),
                ap = _animProps(o, properties),
                ldist = ap[0] - o.left,
                tdist = ap[1] - o.top,
                d = options.duration || 250,
                step = 15, steps = d / step,
                linc = (step / d) * ldist,
                tinc = (step / d) * tdist,
                idx = 0,
                int = setInterval(function () {
                    jsPlumb.setPosition(el, {
                        left: o.left + (linc * (idx + 1)),
                        top: o.top + (tinc * (idx + 1))
                    });
                    if (options.step != null) options.step(idx, Math.ceil(steps));
                    idx++;
                    if (idx >= steps) {
                        window.clearInterval(int);
                        if (options.complete != null) options.complete();
                    }
                }, step);
        },
        // DRAG/DROP
        destroyDraggable: function (el, category) {
            _getDragManager(this, category).destroyDraggable(el);
        },
        destroyDroppable: function (el, category) {
            _getDragManager(this, category).destroyDroppable(el);
        },
        initDraggable: function (el, options, category) {
            _getDragManager(this, category).draggable(el, options);
        },
        initDroppable: function (el, options, category) {
            _getDragManager(this, category).droppable(el, options);
        },
        isAlreadyDraggable: function (el) {
            return el._katavorioDrag != null;
        },
        isDragSupported: function (el, options) {
            return true;
        },
        isDropSupported: function (el, options) {
            return true;
        },
        isElementDraggable: function (el) {
            el = jsPlumb.getElement(el);
            return el._katavorioDrag && el._katavorioDrag.isEnabled();
        },
        getDragObject: function (eventArgs) {
            return eventArgs[0].drag.getDragElement();
        },
        getDragScope: function (el) {
            return el._katavorioDrag && el._katavorioDrag.scopes.join(" ") || "";
        },
        getDropEvent: function (args) {
            return args[0].e;
        },
        getUIPosition: function (eventArgs, zoom) {
            // here the position reported to us by Katavorio is relative to the element's offsetParent. For top
            // level nodes that is fine, but if we have a nested draggable then its offsetParent is actually
            // not going to be the jsplumb container; it's going to be some child of that element. In that case
            // we want to adjust the UI position to account for the offsetParent's position relative to the Container
            // origin.
            var el = eventArgs[0].el;
            var p = { left:eventArgs[0].pos[0], top:eventArgs[0].pos[1] };
            if (el._katavorioDrag && el.offsetParent !== this.getContainer()) {
                var oc = this.getOffset(el.offsetParent);
                p.left += oc.left;
                p.top += oc.top;
            }
            return p;
        },
        setDragFilter: function (el, filter, _exclude) {
            if (el._katavorioDrag) {
                el._katavorioDrag.setFilter(filter, _exclude);
            }
        },
        setElementDraggable: function (el, draggable) {
            el = jsPlumb.getElement(el);
            if (el._katavorioDrag)
                el._katavorioDrag.setEnabled(draggable);
        },
        setDragScope: function (el, scope) {
            if (el._katavorioDrag)
                el._katavorioDrag.k.setDragScope(el, scope);
        },
        setDropScope:function(el, scope) {
            if (el._katavorioDrop && el._katavorioDrop.length > 0) {
                el._katavorioDrop[0].k.setDropScope(el, scope);
            }
        },
        addToPosse:function(el, spec) {
            var specs = Array.prototype.slice.call(arguments, 1);
            var dm = _getDragManager(this);
            jsPlumb.each(el, function(_el) {
                _el = [ jsPlumb.getElement(_el) ];
                _el.push.apply(_el, specs );
                dm.addToPosse.apply(dm, _el);
            });
        },
        removeFromPosse:function(el, posseId) {
            var specs = Array.prototype.slice.call(arguments, 1);
            var dm = _getDragManager(this);
            jsPlumb.each(el, function(_el) {
                _el = [ jsPlumb.getElement(_el) ];
                _el.push.apply(_el, specs );
                dm.removeFromPosse.apply(dm, _el);
            });
        },
        removeFromAllPosses:function(el) {
            var dm = _getDragManager(this);
            jsPlumb.each(el, function(_el) { dm.removeFromAllPosses(jsPlumb.getElement(_el)); });
        },
        dragEvents: {
            'start': 'start', 'stop': 'stop', 'drag': 'drag', 'step': 'step',
            'over': 'over', 'out': 'out', 'drop': 'drop', 'complete': 'complete',
            'beforeStart':'beforeStart'
        },
        animEvents: {
            'step': "step", 'complete': 'complete'
        },
        stopDrag: function (el) {
            if (el._katavorioDrag)
                el._katavorioDrag.abort();
        },
        addToDragSelection: function (spec) {
            _getDragManager(this).select(spec);
        },
        removeFromDragSelection: function (spec) {
            _getDragManager(this).deselect(spec);
        },
        clearDragSelection: function () {
            _getDragManager(this).deselectAll();
        },
        trigger: function (el, event, originalEvent, payload) {
            this.getEventManager().trigger(el, event, originalEvent, payload);
        },
        doReset:function() {
            // look for katavorio instances and reset each one if found.
            for (var key in this) {
                if (key.indexOf("_katavorio_") === 0) {
                    this[key].reset();
                }
            }
        }
    });

    var ready = function (f) {
        var _do = function () {
            if (/complete|loaded|interactive/.test(document.readyState) && typeof(document.body) != "undefined" && document.body != null)
                f();
            else
                setTimeout(_do, 9);
        };

        _do();
    };
    ready(_jp.init);

}).call(this);

//blackbox
var rpnblackboxmodule = function() {

    var datas;
    var domelem;
    var shuffle;
    var toggleViewButton;
    var state;

    var init = function(_datas,_state, _domelem) {
        _.defaults(_datas, {
            operation: "x1",
            left: [1],
            right: [1],
            shuffle: false,
            validation:{
                mode:"lock",
                type:"integer"
            }
        });
        datas = _datas;
        domelem = _domelem;
        shuffle = _datas.shuffle;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state = [];
            _.each(datas.right, function(val, idx) {
                state.push({
                    position: "right",
                    originalposition: idx,
                    value: val,
                    response:null
                })
            });
            _.each(datas.left, function(val, idx) {
                state.push({
                    position: "left",
                    originalposition: idx,
                    value: val,
                    response:null
                })
            });
            if (shuffle)
                state = _.shuffle(state);
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('blackbox text-center');

        domelem.append($('<div class="row header"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><p class="text-center">x</p></div><div class="col-xs-2 operation"></div><div class="col-xs-2"><p class="text-center">y</p></div></div>'));
        $('.header', domelem).hide();

        _.each(state, function(box, idx) {
            if (box.position == 'left') {
                domelem.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><p class="text-center">' + box.value + '</p></div><div class="col-xs-2 operation"><p class="text-center"><i class="glyphicon glyphicon-minus"></i>' + datas.operation + '<i class="glyphicon glyphicon-arrow-right"></i></p></div><div class="col-xs-2"><input type="text" data-bind="" class="rpnm_input form-control" style="text-align: center;"></div></div>'));
            }
            else {
                domelem.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><input type="text" class="rpnm_input form-control" style="text-align: center;"></div><div class="col-xs-2 operation"><p class="text-center"><i class="glyphicon glyphicon-minus"></i>' + datas.operation + '<i class="glyphicon glyphicon-arrow-right"></i></p></div><div class="col-xs-2"><p class="text-center">' + box.value + '</p></div></div>'));
            }
        });
       
        $.each($('.rpnm_input', domelem),function(idx, gap){
            $(gap).val(state[idx].response);
        });
        
        
        toggleViewButton = $('<button>', {
            'data-toggle': 'button',
            'class': 'btn btn-link btn-xs',
            text: ' ' + rpnsequence.getLabels().BlackboxTableView
        }).prepend($('<i class="glyphicon glyphicon-resize-small"></i>'));
        domelem.append($('<p class="text-center"></p>').append(toggleViewButton));
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
            textNode.nodeValue = ' ' + ($el.hasClass('showArchieved') ? rpnsequence.getLabels().BlackboxTableView : rpnsequence.getLabels().BlackboxView);
            $el.toggleClass('showArchieved');
            toggleView();
        });
        
        //Input validation
        rpnsequence.addvalidation($('.rpnm_input',domelem),datas.validation);
    };
    
    var validate = function(){
        $.each($('.rpnm_input', domelem), function(idx, gap) {
            if(isNaN(state[idx].response = $(gap).val().split("'").join(""))==false){
                state[idx].response = $(gap).val().split("'").join("");
            }else{
               state[idx].response = $(gap).val(); 
            }
        });
        return state;
    };
    
    var score = function(sol) {
        var score = 0;
        
        _.each(sol.right, function(val, idx) {
            score+=(_.findWhere(state, {position: "right", originalposition: idx}).response==val?1:0);
        });
        _.each(sol.left, function(val, idx) {
            score+=(_.findWhere(state, {position: "left", originalposition: idx}).response==val?1:0);
        });
        return score;
    };
    
    return {
        init: init,
        validate:validate,
        score:score
    };

};
//cardmaze
var rpncardmazemodule = function() {

    var datas;
    var domelem;
    var currentHead;
    var height;
    var width;
    var snake;
    var startid;
    var endid;
    var state;

    var init = function(_datas,_state, _domelem) {
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
        state = [];
        snake = [];
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }
        buildUi();
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
        bindUiEvents();
        _.each(state,function(val,idx){
            $($('.card',domelem)[val]).trigger('click');
        })
    };


    var bindUiEvents = function() {
        _.each($('.card',domelem), function(card, idx) {
            $(card).click(function() {
                if ($(card).hasClass('start') || $(card).hasClass('selectable') || $(card).hasClass('selected')) {
                    if (((idx == currentHead && $(card).hasClass('start') ) ||idx == currentHead + width || idx == currentHead - width || idx == currentHead - 1 || idx == currentHead + 1) && !$(card).hasClass('selected')) {
                        snake.push(card);

                    }else if($(card).hasClass('selected')){
                        snake=snake.slice(0,_.indexOf(snake,card)+1);
                    }
                    currentHead = idx;
                    $('.selected',domelem).removeClass('selected');
                    $('.selectable',domelem).removeClass('selectable');
                    $('.card',domelem).removeClass('fromtop frombottom fromleft fromright totop tobottom toleft toright');
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
                            $($('.card',domelem)[idx + width]).addClass('selectable');
                        }
                        if (!((idx - width) < 0)) {
                            $($('.card',domelem)[idx - width]).addClass('selectable');
                        }
                        if (idx % width != 0) {
                            $($('.card',domelem)[idx - 1]).addClass('selectable');
                        }
                        if ((idx + 1) % width != 0) {
                            $($('.card',domelem)[idx + 1]).addClass('selectable');
                        }
                    }
                }
            });
        });
    };
    
    var validate = function(){
        _.each(snake,function(card,idx){
            state[idx]=$(card).data("cardId");
        });
        return state;
    };
    
    var score = function(sol) {
        var score = 0;
        _.each(sol, function(cardIdx, idx) {
            score += (state[idx] == cardIdx ? 1 : 0);
        })
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score:score
    };
};
//doc
var rpndocmodule = function() {

    var datas;
    var domelem;
    var state;
    var object;

    var init = function(_datas,_state, _domelem) {
        /*_.defaults(_datas, {
            tofill: "tofill not set!<b>Read</b> documentation please!"
        });*/

        datas = _datas;
        object= !_.isUndefined(_datas.object);
        domelem = _domelem;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }
        else{
            state={
                seen : ''
            };
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('doc');
        var doc = $('<div class="doc">');
        var objectType = (_.isUndefined(datas.object)||_.isUndefined(datas.object.type))?"":datas.object.type;
        var objectWidth = (_.isUndefined(datas.object)||_.isUndefined(datas.object.width))?"width=\"100%\"":"width=" + datas.object.width;
        var objectHeight = (_.isUndefined(datas.object)||_.isUndefined(datas.object.height))?"height=\"70%\"":"height=" + datas.object.height;
        var objectStyle = (_.isUndefined(datas.object)||_.isUndefined(datas.object.style))?"":"style=" + datas.object.style;
        var objectAttribut = (_.isUndefined(datas.object)||_.isUndefined(datas.object.attribut))?"":datas.object.attribut;
        var object = $('<'+objectType+' src="'+datas.object.url+'" '+objectWidth+' '+objectHeight+' '+objectStyle+' '+objectAttribut+' ></'+objectType+'>');
        
        doc.append(object);
        domelem.append(doc);
        
        bindUiEvents();
    };

    var bindUiEvents = function() {

    };
    
    var validate = function(){
        state.seen = true;
        return state;
    };
    
   var score = function(sol) {
        var score = 0;
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };

};
//dragdropsorting
var rpndragdropsortingmodule = function() {

    var datas;
    var domelem;
    var state;
    var dragfromtext;
    var singledd;
    var itemSortedState;
    var itemToSortArray;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            todrag: ["empty"],
            todrop: ["empty too :'("],
            tosort: "empty"
        });
        datas = _datas;
        dragfromtext = !_.isUndefined(_datas.dragfromtext);
        singledd = !_.isUndefined(_datas.singledd) ? _datas.singledd : false;
        domelem = _domelem;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state = {
                todrag:datas.todrag,
                todrop:datas.todrop
            };
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('dragdropsorting');
        if (dragfromtext){
            //build trash
            if (!singledd){
                var dragdropsortingtoolbar = $('<div class="dragdropsortingtoolbar"></div>');
                var trash = $('<i class="fa fa-trash-o"></i>').droppable({
                    accept:'.sorted',
                    hoverClass: 'gapsimpleddresponse-hover',
                    drop: function(e,u) {
                        $(u.draggable, domelem).remove();
                        handleToDragState();
                    }
                });
                dragdropsortingtoolbar.append(trash);
                domelem.append(dragdropsortingtoolbar);
            }
            
            //build panel with sentences and items to sort
            domelem.append($('<div class="form-inline">' + datas.tosort + '</div><div class="row"><div class="container dropzonecontainer"></div></div>'));
            
            itemSortedState = new Array();
            itemToSortArray = new Array();
            
            $.each($('b', domelem), function(idx, todragg) {
                var t = $(todragg);

                itemSortedState[idx] = (_.indexOf(state.todrag, t.html())>-1 || state.todrag.toString()=="empty") ? 0 : 1;
                itemToSortArray[idx] = t.html();
                
                var draggable=$('<ul id="drag_this_'+idx+'" class="dragthis list-unstyled list-inline fromtext '+((itemSortedState[idx])?"dropped":"")+'"><li class="draggable">'+t.html()+'</li></ul>').sortable({
                    connectWith: '.droppable ul',
                    appendTo:'body',
                    placeholder:'droppable-placeholder',
                    forcePlaceholderSize :true,
                    dropOnEmpty: true,
                    distance: 0.5,
                    remove: function(e,li) {
                        copyHelper= li.item.clone().insertAfter(li.item);
                        $(this).sortable('cancel');
                    },
                    items:"li:not(.disabled)"
                }).disableSelection();
                if(singledd && itemSortedState[idx]){
                        draggable.sortable('destroy');
                    }
                t.replaceWith(draggable);
            });
        }else{
            //build panel for items to sort
            domelem.append($('<div class="row"><div class="container"><div class="col-md-2 col"><ul id="drag_this_'+domelem.attr('id')+'" class="dragthis list-unstyled"></ul></div></div><div class="row"><div class="container dropzonecontainer"></div></div>'));
        }
        //Build panel for dropzone
        var nbcol=datas.todrop.length
        $.each(datas.todrop, function(idx, drop) {
            $('.dropzonecontainer',domelem).append($('<div class="col-xs-'+(nbcol<5?'3':'2')+(idx==0?(nbcol==2?' col-xs-offset-3':(nbcol==3||nbcol==5)?' col-xs-offset-1':''):'')+'"><div class="droppable"><span class="lead">' + drop + '</span><ul class="list-unstyled"></ul></div></div>'));
            if(!_.isUndefined(state[drop])){
                _.each(state[drop],function(dropped,idxi){
                    $('ul',$('.droppable',domelem)[idx]).append('<li class="draggable sorted">'+dropped+'</li>');
                });
            }
        });
        $('.droppable ul',domelem).sortable({
            connectWith: '.droppable ul',
            dropOnEmpty: true,
            placeholder:'droppable-placeholder',
            forcePlaceholderSize :true,
            distance: 0.5,
            receive:function  (event, ui) {
                if(dragfromtext && $(ui.sender[0], domelem).hasClass('fromtext')){
                    $(ui.sender[0], domelem).addClass('dropped');
                    if(singledd){
                        $(ui.sender[0], domelem).sortable('destroy');
                    }
                    removeDuplicates();
                }else if(dragfromtext){
                    removeDuplicates();
                }else{
                    if($(ui.sender[0], domelem).hasClass('dragthis')){
                        state.todrag.pop();
                    }
                    nextDraggable();
                }
            }
        }).droppable({
            drop: function(event,ui) {
                ui.draggable.addClass('sorted');
            }
        });
        bindUiEvents();
        if(!dragfromtext){
            nextDraggable();
        }
    };

    var nextDraggable = function() {
        if ($('.dragthis li',domelem).length == 0 && state.todrag.length > 0) {
            var itemToDrag = _.last(state.todrag);
            $('.dragthis',domelem).append($('<li class="draggable">' + itemToDrag + '</li>'));
            $('.dragthis',domelem).sortable({
                connectWith: '.droppable ul',
                appendTo:'body',
                placeholder:'droppable-placeholder',
                forcePlaceholderSize :true,
                dropOnEmpty: true,
                distance: 0.5
            });
        }
    };

    var bindUiEvents = function() {

    };
    
    var validate = function(){
        var itemSorted = new Array();
        _.each($('.droppable',domelem), function(elem, idx) {
            var txts = [];
            $.each($(elem).find('li'), function(idx, txt) {
                txts.push($(txt).html());
                itemSorted.push($(txt).html());
            });
            state[$(elem).find('span').html()] = txts;
        });
        if (dragfromtext){
            state.todrag = _.difference(itemToSortArray, _.uniq(itemSorted));
        }
        console.log(state)
        return state;
    };
    
    var removeDuplicates = function(){
        _.each($('.droppable',domelem), function(elem, idx) {
            var list = new Array();
            $.each($(elem).find('li'), function(id, txt) {
                var item = $(txt).html();
                if (_.indexOf(list, item)>-1){
                    this.remove();
                }else{
                    list.push(item);               
                }
            });
        });
    };
    
    var handleToDragState = function(){
        var itemSorted = new Array();
        _.each($('.droppable',domelem), function(elem, idx) {
            $.each($(elem).find('li'), function(idx, txt) {
                itemSorted.push($(txt).html());
            });
        });
        itemSorted = _.compact(_.uniq(itemSorted));
        console.log(itemSorted)
        $.each($('li', '.form-inline'), function(idx, todrag){
            console.log($(todrag).html())
            if (_.indexOf(itemSorted, $(todrag).html())==-1){
                 itemSortedState[idx] = 0;
                $(todrag).hasClass('sorted') ? $(todrag).removeClass('sorted') : '';
                $(todrag).parent().hasClass('dropped') ? $(todrag).parent().removeClass('dropped') : '';
            }
        });
    };
    
    var score = function(sols) {
        var score = 0;
        _.map(sols, function(sol, drop) {
            score += _.intersection(state[drop], sol).length;
            if (!singledd && dragfromtext){
                score -= _.difference(state[drop], sol).length;
            }
        });
        score = score >= 0 ? score : 0;
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };
};
//dropdown
var rpndropdownmodule = function() {

    var datas;
    var domelem;
    var state;
    

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            sentence: "",
            circumstance:["",""]
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state= _.map(_.filter(datas.items,function(item){return item.choice.length>1}),function(item,idx){return '';});
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('dropdown');

        //build panel with sentence
        if(!_.isEmpty(datas.circumstance[0])) {domelem.append($('<hr style="border-top: 5px solid #ccc;"><p><b>' + datas.circumstance[0] + '</b></p>'));}
		if(!_.isEmpty(datas.sentence)) {domelem.append($('<p>' + datas.sentence + '</p>'));}
        if(!_.isEmpty(datas.circumstance[1])) {domelem.append($('<hr style="border-top: 5px solid #ccc;"><p><b>' + datas.circumstance[1] + '</b></p>'));}

        //build sentence with items to select
        var sentenceToComplete=$('<div class="form-inline">');
        var internalCounter=0;
        $.each(datas.items, function(idx, item) {
            if(item.choice.length==1){
                sentenceToComplete.append(" " + item.choice[0] + " ");
            }else{
                var opts=[];
                
                opts[0]=$('<option value="" '+(state[internalCounter]==''?'selected':'')+'> ?</option>');
                $.each(datas.items[idx].choice, function(id, choice){
                    opts[id+1]=$('<option value="' + choice+ '" '+(state[internalCounter]==choice?'selected':'')+'>' + choice + '</option>');
                });
                sentenceToComplete.append($('<select class="rpnm-input dropdown form-control">').append(opts));
                internalCounter++;
            }
        });
        domelem.append(sentenceToComplete);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        
    };
    
    var validate = function(){
        state=_.map($('select',domelem),function(ele,idx){return $(ele).val()});
        return state;
    };
    
    var score = function(sol){
        var score=0;
        _.each(sol,function(s,idx){
            if(s.alternative){
                score += (_.contains(s.alternative,state[idx] ) ? 1 : 0);
            }else{
                score += state[idx] == s ? 1 : 0;
            }
        });
        return score;
    };
    

    return {
        init: init,
        validate: validate,
        score:score
    };

};
//dropdown
var rpndropdown2module = function() {

    var datas;
    var domelem;
    var state;
    

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            toselect: "toselect not set!<b>Read</b> documentation please!",
            items:[]
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state= _.map(_.filter(datas.items,function(item){return item.choice.length>1}),function(item,idx){return '';});
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('dropdown2');

        //build sentence with items to select
        domelem.append($('<div class="form-inline">' + datas.toselect + '</div>'));
        $.each($('b', domelem), function(idx, toselect) {
            var t =$(toselect);
            var opts=[];
            $.each(datas.items[idx].choice, function(id, choice){
                opts[id]=$('<option value="' + choice+ '" '+(state[idx]==choice?'selected':'')+'>' + choice + '</option>');
            });
            t.append($('<select class="rpnm-input dropdown form-control">').append(opts));
        });

        bindUiEvents();
    };

    var bindUiEvents = function() {
        
    };
    
    var validate = function(){
        state=_.map($('select',domelem),function(ele,idx){return $(ele).val()});
        return state;
    };
    
    var score = function(sol){
        var score=0;
        _.each(sol,function(s,idx){
            if(s.alternative){
                score += (_.contains(s.alternative,state[idx] ) ? 1 : 0);
            }else{
                score += state[idx] == s ? 1 : 0;
            }
        });
        return score;
    };
    

    return {
        init: init,
        validate: validate,
        score:score
    };

};
//gapfull
var rpngapfullmodule = function() {

    var datas;
    var domelem;
    var gapfull;
    var state;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            sentence: "sentence not set!"
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state=datas.sentence;
        }
        
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('gapfull');

        //build panel with sentence
        domelem.append($('<p>' + datas.sentence + '</p><input type="text" class="rpnm_input form-control">'));
        gapfull=$('.rpnm_input',domelem);
        gapfull.val(state);

        bindUiEvents();
    };

    var bindUiEvents = function() {
    };
    
    var validate = function(){
        if(isNaN($('.rpnm_input',domelem).val().split("'").join(""))==false){
            state= $('.rpnm_input',domelem).val().split("'").join("");
        }else{
           state= $('.rpnm_input',domelem).val(); 
        }
        
        return state;
    };
    
    var score =  function(sol) {
        //Try to trim and do automatic corrections here.
        return state == sol ? 1 : 0;
    };
    
    return {
        init: init,
        validate: validate,
        score:score
    };

};
//gapsimple
var rpngapsimplemodule = function() {

    var datas;
    var domelem;
    var dragdrop;
    var clone;
    var maxfillength;
    var state;
    var dragfromtext;
    var dragimage;
    var singledd;
    var answerArray;

    var init = function(_datas,_state, _domelem) {
        _.defaults(_datas, {
            tofill: "tofill not set!<b>Read</b> documentation please!"
        });

        datas = _datas;
        dragdrop= !_.isUndefined(_datas.fillers);
        dragfromtext = !_.isUndefined(_datas.dragfromtext);
        dragimage = !_.isUndefined(_datas.dragimage);
        singledd = !_.isUndefined(_datas.singledd);
        domelem = _domelem;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state=_.map($('b:not([class])',datas.tofill),function(b,idx){return '';});
        }
        buildUi();
        
    };

    var buildUi = function() {
        domelem.addClass('gapsimple');
        var maxwidth=0;
        answerArray = new Array();

        if(dragdrop || dragfromtext){
            var toolbar = $('<div class="gapsimpleddtoolbar">');
            if (singledd){
                $.each(datas.fillers, function(idx, filler) {
                    var divDrag = $('<div class="divdraggable" id="div'+idx+'" ></div>');
                    if(!(_.contains(state, filler))){
                        var drag = $('<span class="singledraggable" draggable="true" id="drag'+_.indexOf(datas.fillers, filler)+'" val="'+_.indexOf(datas.fillers, filler)+'" >'+filler+'</span>').on('dragstart', function (ev) {
                            ev.originalEvent.dataTransfer.setData("text", ev.target.id);
                        });
                        divDrag.append(drag);
                    }
                    toolbar.append(divDrag);
                });
            }
            else if(dragdrop){
            $.each(datas.fillers, function(idx, filler) {
                var draggable=$('<span class="draggable ori" val="'+idx+'" >'+filler+'</span> ').draggable({
                    revert: "invalid",
                    appendTo: domelem,
                    helper: "clone",
                    snap: true,
                    snapMode: 'inner'
                });
                toolbar.append(draggable);
                maxwidth=maxwidth<draggable.width()?draggable.width():maxwidth;
            });
            maxfillength=_.max(datas.fillers, function(filler){ return filler.length; }).length;
            }
            //build trash
            if (!datas.singledd){
                var trash = $('<i class="fa fa-trash-o"></i>').droppable({
                    accept:'.clone',
                    hoverClass: 'gapsimpleddresponse-hover',
                    drop: function(e,u) {
                        $(u.draggable, domelem).remove();
                    }
                });
                toolbar.append(trash);
            }
            domelem.append(toolbar);
        }
        
        //build panel with sentences
        domelem.append($('<div class="form-inline">' + datas.tofill + '</div>'));
        
         $.each($('b[class=drag]', domelem), function(idx, tofill) {
            var t = $(tofill);
            var draggable=$('<span class="draggable ori">'+t.html()+'</span> ').draggable({
                revert: "invalid",
                appendTo: domelem,
                helper: "clone",
                snap: true,
                snapMode: "inner"
            });
            t.replaceWith(draggable);
            maxwidth=maxwidth<draggable.width()?draggable.width():maxwidth;
        });
        
        $.each($('b', domelem), function(idx, tofill) {
            var t = $(tofill);
            var txt = "";
            //var txt = _.isEmpty(t.text())?"":"<strong>(" + t.text() + ")</strong>";
            if(singledd){
                var drop = $('<b class="gapsimpleddresponse">').on('dragenter', function(ev){
                    ev.stopPropagation(); 
                    ev.preventDefault();
                }).on('dragover', function(ev){
                    ev.preventDefault();
                }).on('drop', function(ev) {
                    ev.preventDefault();
                    var target = ev.target;
                    var targetPlaced = target;
                    var valPlaced = ev.target.getAttribute("val");
                    
                    if(ev.target.className == "singledraggable"){
                        target = $(target).parent();
                        $("#div"+valPlaced, domelem).append($(targetPlaced));
                    }
                    var data = ev.originalEvent.dataTransfer.getData("text");
                    $(target).append($("#"+data, domelem));
                });
                t.replaceWith(drop);
                
                var alreadyGivenResponse = (_.isEmpty(state[idx]) ? '' : $('<span class="singledraggable" draggable="true" id="drag'+_.indexOf(datas.fillers, state[idx])+'" val="'+_.indexOf(datas.fillers, state[idx])+'" >'+state[idx]+'</span>'));
                $(alreadyGivenResponse).on('dragstart', function (ev) {
                    ev.originalEvent.dataTransfer.setData("text", ev.target.id);
                });
                drop.append(alreadyGivenResponse);
            }
            else if(dragdrop || dragfromtext){
                //add a drop area
                var drop=$('<b class="gapsimpleddresponse">');
                t.replaceWith(drop);

                drop.droppable({
                    accept:'.draggable',
                    hoverClass: 'gapsimpleddresponse-hover',
                    drop: function(e,u) {
                        var nb = $(this).children('span').attr('val');
                        //$('.gapsimpleddtoolbar span[val='+nb+']').show();
                        $(this).empty();
                        //$(this).append(((u.draggable.hasClass('ori')?u.draggable.clone():u.draggable)).css("position","inherit").addClass('clone').removeClass('ori').draggable({
                        $(this).append(((u.draggable.hasClass('ori')?u.draggable.clone():u.draggable).addClass('clone').removeClass('ori')).draggable({
                            revert: "invalid",
                            appendTo: domelem,
                            helper: "clone",
                            snap: true,
                            snapMode: "inner"
                        }));
                        answerArray[idx] = dragimage?datas.fillers[u.draggable.attr("val")]:'';
                    }
                });

                //and fill if there is already a response
                if(!_.isEmpty(state[idx])){
                    var alreadyGivenResponse=$('<span class="'+(_.isEmpty(state[idx])?'':'draggable clone')+'" '+((_.isEmpty(state[idx]) && dragimage)?'':'val="'+idx+'"')+'>'+(_.isEmpty(state[idx])?'':state[idx])+'</span>');
                    drop.append(alreadyGivenResponse.draggable({
                        revert: "invalid",
                        appendTo: domelem,
                        helper: "clone"
                    }));
                    
                    answerArray[idx] = state[idx];
                }
            }else{
                var textAlign = (_.isUndefined(datas.validation)||_.isUndefined(datas.validation.align))?"":" " + datas.validation.align;
				var textWidth = (_.isUndefined(datas.validation)||_.isUndefined(datas.validation.width))?"":" style='width:" + datas.validation.width + "'";
				if(t.text().substr(-1)!="_"){
					txt = _.isEmpty(t.text())?"":"<strong>(" + t.text() + ")</strong>";
                    t.replaceWith($('<span class="text-nowrap"><input type="text" class="rpnm_input gapsimple form-control' + textAlign + '"' + textWidth + '>' + txt + '</span>'));
                }else{
					txt = t.text().slice(0,-1);
					t.replaceWith($('<span class="text-nowrap">' + txt +'<input type="text" class="rpnm_input gapsimple form-control' + textAlign + '"' + textWidth + '></span>'));
				}
                $($('.rpnm_input',domelem)[idx]).val(state[idx]);
            }
        });
        bindUiEvents();
    };

    var bindUiEvents = function() {
        //Input validation
        rpnsequence.addvalidation($('.rpnm_input',domelem),datas.validation);
    };
    
    
    var validate = function(){
        if(dragdrop || dragfromtext){
            _.each($('.gapsimpleddresponse',domelem),function(elem,idx){
                if(dragimage){
                    state[idx] = !_.isUndefined($('.draggable',$(elem)).html()) ? ($('.draggable',$(elem)).html().length==0?'':answerArray[idx]):'';
                }else if(datas.singledd){
                    state[idx] = $('.singledraggable',$(elem)).html();
                }else{
                    state[idx] = $('.draggable',$(elem)).html();
                }
            });
        }else{
            $.each($('.gapsimple',domelem), function(idx, gap) {
                if(isNaN($(gap).val().trim().split("'").join(""))==false){
                    state[idx] = $(gap).val().trim().split("'").join("");
                }else{
                   state[idx] = $(gap).val().trim(); 
                }
            });
        }
        return state;
    };
    
   var score = function(sol) {
        var score = 0;
        _.each(sol, function(val, idx) {
            if(val.alternative){
                score += (_.contains(val.alternative,state[idx] ) ? 1 : 0);
                /*
                var alternativelength=val.alternative.length;
                for (var al=0;al<alternativelength;al++){
                   if(val.alternative[al]==state[idx]){
                        score ++;
                    }
                }
                */
           
            }else{
                score += (val != "" && state[idx] == val) ? 1 : 0;
                score -= (val == "" && state[idx] != val) ? 1 : 0;
            }
        });
        score = score >= 0 ? score : 0;
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };

};

//marker
var rpnmarkermodule = function() {

    var datas;
    var domelem;
    var state;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            markers: [],
            tomark: ["fill tomark please!"],
            hidden:false,
            smallButtons:false,
            displayTooltip:true
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            var availableColors = ["#8d61a4","#01a271","#5dc2e7","#ed656a","#f5a95e","#eee227","#7a5a14","#63b553","#e95c7b","#f5a95e"];
            state={
                selectedMarker : '',
                responses:_.map($('b',datas.tomark),function(b,idx){return '';}),
                markers:_.map(datas.markers,function(m,idx){return { label:m,color:(availableColors[idx] || '#222')}})
            };
        }
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('marker');
        var toolbar = $('<div>', {
            'class': 'btn-group',
            'data-toggle': 'buttons'
        });
        
        toolbar.append($('<label class="btn btn-default '+(datas.smallButtons?'':'btn-lg ') + (state.selectedMarker.label==''?'active':'')+' eraser"><input type="radio" name="options" autocomplete="off" '+(state.selectedMarker==''?'checked':'')+'><span class="edicons-tool-eraser"></span> ' + rpnsequence.getLabels().Eraser + '</label>').click(function() {
            state.selectedMarker = {color:'',label:''};
        }));
        $.each(state.markers, function(idx, marker) {
            toolbar.append($('<label class="btn btn-default '+(datas.smallButtons?'':'btn-lg ') + (state.selectedMarker.label==marker.label?'active':'')+' stab"><input type="radio" name="options" autocomplete="off" '+(state.selectedMarker==marker.label?'checked':'')+'><span class="edicons-tool-stab" style="color:'+marker.color+'"></span> ' + marker.label + '</label>').click(function() {
                state.selectedMarker = marker;
            }));
        });
        domelem.append(toolbar);

        //build panel with sentences
        if(!_.isUndefined(datas.background)){
            if(_.isUndefined(datas.background.url)){
                rpnsequence.log('background defined without url!');
                domelem.append($('<div class="markable" >' + datas.tomark + '</div>'));
            }else{
                _.defaults(datas.background,{
    				"width":"0px",
    				"height":"0px",
    				"paddingTop":"0px",
    				"paddingRight":"0px",
    				"paddingBottom":"0px",
    				"paddingLeft":"0px"
                });
                domelem.append($('<div class="markable" style="width:'+datas.background.width+';height:'+datas.background.height+';padding-top:'+datas.background.paddingTop+';padding-right:'+datas.background.paddingRight+';padding-bottom:'+datas.background.paddingBottom+';padding-left:'+datas.background.paddingLeft+';background-image:url('+rpnsequence.computeMediaUrl(datas.background.url)+');background-repeat:no-repeat;background-size:contain">' + datas.tomark + '</div>'));    
            }
        }else{
            domelem.append($('<div class="markable" >' + datas.tomark + '</div>'));
        }
        $.each($('b', domelem), function(idx, tomark) {
            var t = $(tomark);
            if(!_.isEmpty(state.responses[idx])){
                t.css('background-color',_.findWhere(state.markers,{label:state.responses[idx]}).color);
                if(datas.displayTooltip){
                    t.attr('data-original-title', state.responses[idx])
                        .tooltip('fixTitle');
                }
            }
            if(!datas.hidden){
                t.css('cursor', 'pointer');
            }else{
                t.css('font-weight','normal');
                t.css('background-color','rgba(255, 255, 255, 0)');
            }
            t.click(function() {
                t.css('background-color',state.selectedMarker.color);
                if(datas.displayTooltip && state.selectedMarker.color!=''){
                    t.attr('data-original-title', state.selectedMarker.label)
                        .tooltip('fixTitle')
                        .tooltip('show');
                }else{
                    t.tooltip('destroy');
                }
                state['responses'][idx] = state.selectedMarker.label;
            });
        });
        bindUiEvents();
    };

    var bindUiEvents = function() {
    };
    
    var validate = function(){
        return state;
    };
    
    var score =  function(sol) {
        var score = 0;
        _.each(sol, function(val, idx) {
            score += (val != "" && state.responses[idx] == val) ? 1 : 0;
            score -= (val == "" && state.responses[idx] != val) ? 1 : 0;
        });
        score = score >= 0 ? score : 0;
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score

    };
};

//mqc
var rpnmqcmodule = function() {

    var datas;
    var domelem;
    var state;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            questions: ["No questions!"],
            answers: ["As no answers"],
            vertical:false,
            mqcmultiple:false
        });

        datas = _datas;
        domelem = _domelem;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state={
                responses:_.map(datas.questions,function(q,idx){return'';})
            };
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('mqc');
		
        //build panel with sentences
        var uilist = $('<ul>', {
            'class': 'list-unstyled'
        });
    
        $.each(datas.questions, function(idq, question) {
            var li = $('<li>');
            li.append($('<p>' + question + '</p>'));
            var answerGroup = $('<div class="'+(datas.vertical?'btn-group-vertical':'btn-group')+'" role="group" data-toggle="buttons">');
            var idmqc = datas.answers.length==1?0:idq;
            //multiple responses allowed
            if(datas.mqcmultiple){
                var answerArray = new Array(datas.answers.length);
                answerArray = _.map(answerArray,function(aa,idaa){return'';});
                $.each(datas.answers[idmqc].choice, function(ida, answer) {
                    answerArray[ida] = (!_.isEmpty(state.responses[idq][ida])&&state.responses[idq][ida]==answer)? state.responses[idq][ida] : '';
                    answerGroup.append($('<label class="btn btn-default '+((!_.isEmpty(state.responses[idq][ida])&&state.responses[idq][ida]==answer)?'active':'')+'"><input type="checkbox" autocomplete="off" '+((!_.isEmpty(state.responses[idq][ida])&&state.responses[idq][ida]==answer)?'checked':'')+'>' + answer + '</label>').click(function(lab) {
                        answerArray[ida] = !$(lab.currentTarget).hasClass('active')? answer : '';
                        state.responses[idq] = answerArray;
                    }));
                    li.append(answerGroup);
                });
            }
            else{
                $.each(datas.answers[idmqc].choice, function(ida, answer) {
                    answerGroup.append($('<label class="btn btn-default '+((!_.isEmpty(state.responses[idq])&&state.responses[idq]==answer)?'active':'')+'"><input type="radio" autocomplete="off" '+((!_.isEmpty(state.responses[idq])&&state.responses[idq]==answer)?'checked':'')+'>' + answer + '</label>').click(function() {
                        state.responses[idq] = answer;
                    }));
                    li.append(answerGroup);
                });
            }
            uilist.append(li);
        });
        
        domelem.append(uilist);
        bindUiEvents();
    };

    var bindUiEvents = function() {
    };
    
    var validate = function(){
        return state;
    };
    
    var score= function(sol) {
        var score = 0;
        _.each(sol, function(val, idx) {
            score += _.isEqual(state.responses[idx],val) ? 1 : 0;
        });
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };

};
//multiplelistssync
var rpnmultiplelistssyncmodule = function() {

    var datas;
    var domelem;
    var state;
    var typeList;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            lists: {
                "title":"",
                "items":["list", "not", "set!"],
                "movable":false
            },
            vertical:true
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state= {
                lists : _.map(_.filter(datas.lists,function(list){return list.items.length>1}),function(list,idx){return '';}),
                responses:_.map(_.filter(datas.responses,function(resp){return resp.length>1}),function(r,idx){return '';})
            };
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('multiplelistssync');
        var listToSort;
        typeList = new Array();
        
        //build lists with items to sort
        _.each(datas.lists, function(li,idx){
            typeList[idx] = datas.lists[idx].type ? datas.lists[idx].type : '';
            if(datas.lists[idx].movable){
                listToSort = $('<ul class="list-unstyled'+(datas.vertical?'':' list-inline')+'" id="sortable-'+idx+'" >'+(_.isEmpty(datas.lists[idx].title) ? '' : '<li class="title">'+datas.lists[idx].title)+'</li></ul>').sortable({
                    items: "li:not(.title)",
                    placeholder: "sorting-highlight",
                    tolerance:"pointer"
                });
            }
            else{
                listToSort = $('<ul class="list-unstyled'+(datas.vertical?'':' list-inline')+' unmovable" id="sortable-'+idx+'" >'+(_.isEmpty(datas.lists[idx].title) ? '' : '<li class="title">'+datas.lists[idx].title)+'</li></ul>')
            }
            //and fill if there is already a response
            if(!_.isEmpty(state.lists[idx])){
                _.each(state.lists[idx], function(item,id) {
                    var noElem = _.indexOf(datas.lists[idx].items, item);
                    listToSort.append($('<li val=\"'+noElem+'\">'+item+'</li>'));
                });
            }
            else{
                _.each(datas.lists[idx].items, function(item,id) {
                    listToSort.append($('<li val=\"'+id+'\">'+item+'</li>'));
                });
            };
            domelem.append(listToSort);
        });
        $(domelem).disableSelection();
        
        bindUiEvents();
    };
   
    var bindUiEvents = function() {
        
    };
    
    var validate = function(){
        var answerArray = new Array();
        _.each($('ul',domelem), function(ul,idx){
            answerArray.push(_.map($('ul[id="sortable-'+idx+'"] li:not(.title)',domelem),function(ele,id){
                return (typeList[idx]=="picture") ? datas.lists[idx].items[$(ele).attr("val")] : $(ele).html()
            }));
        });
        state.lists = answerArray;
        state.responses = _.unzip(answerArray);
        return state;
    };
    
   var score = function(sols){
        var score = 0;
        _.map(sols.syncitems, function(sol) {
            _.each(state.responses, function(resp, idx){
                score += _.isEqual(resp, sol) ? 1 : 0;
            });
        });
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score:score
    };

};
/*global rpnsequence, jsPlumb, _*/
//plumb
var rpnplumbmodule = function() {

    var datas;
    var domelem;
    var state;
    var plumb;
    

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            left: ["item1", "item2", "item3"],
            right: ["item1", "item2", "item3"],
            multipleTarget:false,
            shuffle:false
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state = {};
            _.defaults(state, {
                left: [],
                right: [],
                responses:[]
            });
            state.left=_.map(datas.left, function(d,i){
                return i;
            });
            state.right=_.map(datas.right, function(d,i){
                return i;
            });
            state.left=datas.shuffle?_.shuffle(state.left):state.left;
            state.right=datas.shuffle?_.shuffle(state.right):state.right;
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('plumb');
        
        //build sentence with items to select
        var leftItems=$('<ul class="list-unstyled plumbsource"></ul>');
        var rightItems=$('<ul class="list-unstyled plumbtarget"></ul>');
        _.each(state.left, function(item, idx) {
            leftItems.append($('<li>').html(datas.left[item]).data( 'idx', item ));
        });
        _.each(state.right, function(item, idx) {
            rightItems.append($('<li>').html(datas.right[item]).data( 'idx', item ));
        });
        domelem.append([$('<div class="col-xs-5"></div>').append(leftItems),$('<div class="col-xs-2"></div>'),$('<div class="col-xs-5"></div>').append(rightItems)]);
        plumb=jsPlumb.getInstance();
        plumb.importDefaults({
            Connector : [ "Bezier", { curviness: 0 } ],
            PaintStyle : {
                lineWidth:4
            },
            DragOptions : { cursor: "crosshair" },
            Endpoint : [ "Dot", { radius:10 } ]
        });
        plumb.ready(function(){
            plumb.setContainer(domelem);
            //handle change style on target endpoint
            plumb.bind("connection",function(info){
                //rpnsequence.log($(info.source).data('idx') + ' -> ' + $(info.target).data('idx'));
                var srcIdx=$(info.source).data('idx');
                state.responses[srcIdx]=$(info.target).data('idx');
                info.targetEndpoint.setPaintStyle({
                    fillStyle:info.sourceEndpoint.connectorStyle.strokeStyle
                });
            });
            //handle change style on target endpoint and on connector style
            plumb.bind("connectionMoved",function(info){
                info.connection.setPaintStyle({strokeStyle:info.newSourceEndpoint.connectorStyle.strokeStyle});
                info.newTargetEndpoint.setPaintStyle({
                    fillStyle:info.newSourceEndpoint.connectorStyle.strokeStyle
                });
            });
            $('li',leftItems).each(function(i,li){
                plumb.makeSource(li, {
                    maxConnections:1,
                    endpointStyle:{ fillStyle:rpnsequence.getColor(i)},
                    connectorStyle:{ strokeStyle:rpnsequence.getColor(i), lineWidth:2 },
                    anchor: "Right"
                });
            });
            $('li',rightItems).each(function(i,li){
               plumb.makeTarget(li, {
                    maxConnections:datas.multipleTarget?-1:1,
                    anchor:"Left"
                });
            });
            //try to remount sta given
            _.each(state.responses,function(target,source){
                if(target !=null){
                    var srcElem=_.filter($('ul.plumbsource li',domelem),function(li){
                        return $(li).data('idx')==source;
                    });
                    var targetElem=_.filter($('ul.plumbtarget li',domelem),function(li){
                        return $(li).data('idx')==target
                    });
                    plumb.connect({
                       source:$(srcElem[0]).attr('id'),
                       target:$(targetElem[0]).attr('id')
                    });
                }
            });
        });
        
        $(window).resize(function(){
            plumb.repaintEverything();
        });
    };
    var validate = function(){
        return state;
    };
    
   var score = function(sol){
        var score = 0;
        _.each(sol,function(target,source){
            if(state.responses[source]==target[1]){
                score++;
            }
        });
        return score;
    };
    var displayed = function(){
         plumb.repaintEverything();
    }
    return {
        displayed:displayed,
        init: init,
        validate: validate,
        score:score
    };

};
/* global _*/
/*!
 * rpnmodule 0.2.5 (https://github.com/golayp/rpnmodule)
 * 
 * Dependencies: jquery 2.1.3, bootstrap 3.3.7, underscore 1.8.3
 * 
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
var rpnsequence = (function() {

    var sequencedatas;
    var currentmod;
    var source;
    var solurl;
    var states;
    var warnexit;
    var sequenceendHandler;
    var moduleendHandler;
    var mediapathHandler;
    var readyHandler;
    var alertModal;
    var domelem;
    var validationButton;
    var btnOrder;
    var btnRecall;
    var bypassModule;
    var testMode;
    var navigationEnabled;
    var debug;
    var loadstate;
    var selectedLabels;
    var moduleLocation;
    var modules;

    var labels = {
        en: {
            Recall: "Recall",
            Order: "Order",
            Warning: "Warning",
            BeforeUnloadMsg: "Module running!",
            Wait: "Please wait...",
            Validate: "Next",
            EndSequence:"Continue",
            Eraser: "Eraser",
            DragDropNotEmpty: "There are still some items to sort!",
            CardMazeNotEnded: "You have not finished the maze!",
            BlackboxTableView: "Values table",
            BlackboxView: "Blackbox",
            Quit:"Quit"
        },
        fr: {
            Recall: "Rappel",
            Order: "Consignes",
            Warning: "Attention",
            BeforeUnloadMsg: "Exercice en cours!",
            Wait: "Veuillez patienter...",
            Validate: "Suite",
            EndSequence:"Continuer",
            Eraser: "Effaceur",
            DragDropNotEmpty: "Il y a encore des éléments à trier!",
            CardMazeNotEnded: "Vous n'avez pas terminé le labyrinthe!",
            BlackboxTableView: "Tableau de valeurs",
            BlackboxView: "Boîte noire",
            Quit:"Quitter"
        }
    };

    var init = function(opts) {
        if (_.isUndefined(opts)) {
            opts = {};
        }
        _.defaults(opts, {
            sequrl: "seq.json",
            solurl: "sol.json",
            stateurl:"sta.json",
            warnonexit: false,
            domelem: $('body'),
            onsequenceend: function(states, score) {},
            onmoduleend: function() {},
            onsequenceready:function(){},
            language: "en",
            debug: false,
            disablestateloading:false,
            navigationEnabled: false,
            quitDisabled:false,
            bypassModule:false,
            testMode:false
        });
        selectedLabels = labels[opts.language];
        states = [];
        modules=[];
        warnexit = opts.warnonexit;
        solurl = opts.solurl;
        debug = opts.debug;
        loadstate=!opts.disablestateloading;
        domelem = opts.domelem;
        sequenceendHandler = opts.onsequenceend;
        moduleendHandler = opts.onmoduleend;
        readyHandler = opts.onsequenceready;
        
        bypassModule=opts.bypassModule;
        testMode=opts.testMode;
        
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
            if(loadstate){
                $.getJSON(opts.stateurl,function(savedStates){
                    states=_.map(sequencedatas.modules,function(mod,idx){return { state:savedStates.states[idx]};});
                    buildUi();
                }).error(function() {
                    states=_.map(sequencedatas.modules,function(mod,idx){return { state:undefined};});
                    buildUi();
                });
            }else{
                states=_.map(sequencedatas.modules,function(mod,idx){return { state:undefined};});
                buildUi();
            }
            
        });
    };
    var getColor = function(idx){
        return ["#8d61a4","#01a271","#5dc2e7","#ed656a","#f5a95e","#eee227","#7a5a14","#bbbbbb","#63b553","#e95c7b","#f5a95e"][idx];
    }
    var buildUi = function() {
        moduleLocation=$('<div></div>')
        validationButton=$('<button class="btn btn-success" id="rpnm_validation"></button>');
        btnOrder=$('<button class="btn btn-default btn-sm" data-target="#rpnm_order_modal" data-toggle="modal"><span class="visible-xs visible-sm"><i class="glyphicon glyphicon-question-sign"></i></span><span class="visible-md visible-lg"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</span></button>');
        btnRecall=$('<button class="btn btn-default btn-sm" data-target="#rpnm_recall_modal" data-toggle="modal"><span class="visible-xs visible-sm"><i class="glyphicon glyphicon-bell"></i></span><span class="visible-md visible-lg"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</span></button>');
        source=$('<div class="col-md-12"></div>');
        var baseContainer=$('<div class="container"></div>');
        if(!_.isUndefined(sequencedatas.cssClass)){
            baseContainer.addClass(sequencedatas.cssClass);
        }
        domelem.append([
            baseContainer.append([
                $('<div class="row sequence-header"></div>').append([
                    $('<div class="col-md-5"><h1>'+sequencedatas.title+'</h1></div>'),
                    $('<div class="col-xs-4"><nav id="rpnm_modulenav"><ul class="pagination pagination-sm"></div>'),
                    $('<div class="col-md-3"></div>').append([
                        btnOrder,
                        btnRecall
                    ]),
                ]),
                moduleLocation,
                $('<div class="row sequence-footer"></div>').append([
                    $('<div class="col-md-12" id="rpnm_toolbar"></div>').append(
                        validationButton
                    ),
                    source
                ])
            ])
        ]);
        domelem.append($('<div id="rpnm_recall_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_order_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_alert_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-warning-sign"></i> ' + selectedLabels.Warning + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_wait_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">' + selectedLabels.Wait + '</h4></div><div class="modal-body"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% completed</span></div></div></div></div></div></div>'));
        alertModal = $('#rpnm_alert_modal');
        if (!navigationEnabled) {
            $('#rpnm_modulenav').remove();
        }
        _.each(sequencedatas.modules, function(modData, idx) {
            _.defaults(modData,{
                disposition:'top'
            });
            var modTitle=$('<h2 id="rpnm_title"></h2>');
            if(_.isUndefined(modData.title)){
                modTitle.hide();
            }else{
                modTitle.html(modData.title);
                modTitle.show();
            }
            var divContext=$('<div id="rpnm_context"></div>');
            var divDirective=$('<div id="rpnm_directive"></div>');
            var divContent=$('<div>');
            
           
            
            
            var rpnmInstance = $('<div id="rpnm_inst_' + idx + '" class="row rpnm_instance">');
                
            if(modData.disposition=='bottom'){
                divContent.addClass('col-md-12');
                rpnmInstance.append([
                    divContent,
                    $('<div class="col-md-12"></div>').append([modTitle,divContext,divDirective])
                ]);
            }else if(modData.disposition=='left'){
                divContent.addClass('col-md-6');
                rpnmInstance.append([
                    $('<div class="col-md-6"></div>').append([modTitle,divContext,divDirective]),
                    divContent
                ]);
            }else if(modData.disposition=='right'){
                divContent.addClass('col-md-6');
                rpnmInstance.append([
                    divContent,
                    $('<div class="col-md-6"></div>').append([modTitle,divContext,divDirective])
                ]);
            }else{
                //default top
                divContent.addClass('col-md-12');
                rpnmInstance.append([
                    $('<div class="col-md-12"></div>').append([modTitle,divContext,divDirective]),
                    divContent
                ]);
            }
            
            _.isUndefined(modData.context)? _.isUndefined(sequencedatas.context) ? divContext.hide():divContext.show().html(sequencedatas.context) :divContext.show().html(modData.context);
            _.isUndefined(modData.directive)? _.isUndefined(sequencedatas.directive) ? divDirective.hide(): divDirective.show().html(sequencedatas.directive) : divDirective.show().html(modData.directive);
            
            
            
            if(_.isNull(states[idx]).state){
                _.isNull(states[idx]).state=undefined;
            }
            if (modData.type == 'marker') {
                modules[idx]=rpnmarkermodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'mqc') {
                modules[idx]=rpnmqcmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'gapsimple') {
                modules[idx]=rpngapsimplemodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'gapfull') {
                modules[idx]=rpngapfullmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'clock') {
                modules[idx]=rpnclockmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'blackbox') {
                modules[idx]=rpnblackboxmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'dragdropsorting') {
                modules[idx]=rpndragdropsortingmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'cardmaze') {
                modules[idx]=rpncardmazemodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'dropdown') {
                modules[idx]=rpndropdownmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'dropdown2') {
                modules[idx]=rpndropdown2module();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'sorting') {
                modules[idx]=rpnsortingmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'map') {
                modules[idx]=rpnmapmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'doc') {
                modules[idx]=rpndocmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'multiplelistssync') {
                modules[idx]=rpnmultiplelistssyncmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            
            moduleLocation.append(rpnmInstance);
            //load plumb module after dom append in order to make connector available for paint
            if (modData.type == 'plumb') {
                modules[idx]=rpnplumbmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            handleMediaPath(rpnmInstance);
            rpnmInstance.hide();
            if(modData.type!='gapfull'){
                divContent.disableSelection();
            }
            $('#rpnm_modulenav ul').append($('<li><a href="#">' + (idx + 1) + '</a></li>'));
            if(bypassModule && idx==sequencedatas.modules.length-1){
                handleEndOfSequence();
            }
        });
        if (warnexit) {
            $(window).bind('beforeunload', function(e) {
                return selectedLabels.BeforeUnloadMsg;
            });
        }
        bindUiEvents();
        displayCurrentModule();
        ready();
    };
    
    
    var ready=function(){
        readyHandler();
    };
    
    var bindUiEvents = function() {
        //Validation
        validationButton.click(function(){
            handleEndOfModule(modules[currentmod].validate(),currentmod+1);
        });
        //Navigation
        if (navigationEnabled && sequencedatas.modules.length > 1) {
            _.each($('#rpnm_modulenav ul li'),function(nav,idx){
                $(nav).click(function() {
                    modules[currentmod].validate();
                    handleEndOfModule(modules[currentmod].validate(),idx);
                });
            });
        }
    };

    var displayCurrentModule = function() {
        var moduleDatas = sequencedatas.modules[currentmod];
        _.defaults(moduleDatas, {
            title: "title"
        });
        $('.rpnm_instance').hide();

        var moduleDiv = $('#rpnm_inst_' + currentmod);
        if(!_.isUndefined(moduleDatas.cssClass)){
            moduleDiv.addClass(moduleDatas.cssClass);
        }
        bindModuleSharedDatas(moduleDatas);
        
        //navigation
        if (navigationEnabled) {
            $('#rpnm_modulenav ul li').removeClass('active');
            $($('#rpnm_modulenav ul li')[currentmod]).addClass('active');
        }
        if(currentmod==sequencedatas.modules.length-1){
            validationButton.html(selectedLabels.EndSequence+' <i class="glyphicon glyphicon glyphicon-ok-circle"></i>').removeClass("btn-primary").addClass("btn-success");
        }else{
            validationButton.html(selectedLabels.Validate+' <i class="glyphicon glyphicon-chevron-right"></i>').removeClass("btn-success").addClass("btn-primary");
        }
        moduleDiv.show();
        if(!_.isUndefined( modules[currentmod].displayed)){
            modules[currentmod].displayed();
        }
    };

    var bindModuleSharedDatas = function(datas) {
        if (!_.isUndefined(datas.recall)){
            $('#rpnm_recall_modal .modal-body').html(datas.recall);
            btnRecall.show();
        }else if(!_.isUndefined(sequencedatas.recall)){
            $('#rpnm_recall_modal .modal-body').html(sequencedatas.recall);
            btnRecall.show();
        }
        if (!_.isUndefined(datas.order)) {
            $('#rpnm_order_modal .modal-body').html(datas.order);
            btnOrder.show();
        }else if(!_.isUndefined(sequencedatas.order)){
            $('#rpnm_order_modal .modal-body').html(sequencedatas.order);
            btnOrder.show();
        }
        if(!_.isUndefined(datas.background) || !_.isUndefined(sequencedatas.background)){
            moduleLocation.css({
                'background-image':'url(' + _.isUndefined(datas.background)?sequencedatas.background:datas.background + ')',
                'background-repeat': 'no-repeat',
                'background-position': 'top center',
                'background-size':'cover'
            });
        }else{
            moduleLocation.css({
                'background-image':'none'
            });
        }
        
        if(_.isUndefined(datas.recall)&&_.isUndefined(sequencedatas.recall)){
            btnRecall.hide();  
        }else{
            handleMediaPath($('#rpnm_recall_modal .modal-body'));
        }
        if(_.isUndefined(datas.order)&&_.isUndefined(sequencedatas.order)){
            btnOrder.hide();  
        }else{
            handleMediaPath($('#rpnm_order_modal .modal-body'));
        }
        source.html(_.isUndefined(datas.sources) ? _.isUndefined(sequencedatas.sources)?"":sequencedatas.sources :  datas.sources);
    };

    var handleEndOfModule = function(state,nextmodtoshow) {
        //store result locally
        states[currentmod] = {
            state:state
        };
        
        moduleendHandler({states:_.map(states,function(sta){return sta.state;})},function(){
            //Save status of module
            sequencedatas.modules[currentmod].status = 'ended';
            currentmod=nextmodtoshow;
            if(currentmod>sequencedatas.modules.length-1){
                handleEndOfSequence();
            }else{
                displayCurrentModule();
            }        
        });
    };

    var handleEndOfSequence = function() {
        log('End of sequence');
        if(!testMode && !bypassModule){
            log(JSON.stringify({states:_.map(states,function(sta){return sta.state;})},null, '\t'));
        }
        //retrieve solutions and use correction function to make score
        $.getJSON(solurl, function(ssol) {
            var score = 0;
            _.each(ssol.solutions, function(sol, idx) {
                score +=modules[idx].score(sol);
            });
            log('SCORE: '+ score);
            if (warnexit) {
                $(window).unbind('beforeunload');
            }
            if(testMode){
                displayAlert('Score :' + score + ' pt' + (score>1?'s':''),function(){
                    sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score);
                });
            }
            else
            {
                sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score);
            }
            
        });
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

    var handleMediaPath = function(content) {
        //Images paths
        _.each($('img:not(.rpnm-img, .rpnm-mediapath)',content), function(elem, idx) {
            var img = $(elem);
            img.addClass('rpnm-mediapath');
            if (img.is('.modal-body img')) {
                img.addClass('img-responsive img-rounded');
            }
        });
    };

    var getLabels = function() {
        return selectedLabels;
    };
    
    var addvalidation = function(inputs,validationoptions){
        if(_.isUndefined(validationoptions)){
            return;
        }
        _.defaults(validationoptions,{
            mode:"lock",
            type:"natural"
        });
        
        //prevent copy paste cut
        $(inputs).bind("cut copy paste",function(e) {
            e.preventDefault();
        });
        if(validationoptions.mode=='lock'){
        
            $(inputs).bind('input propertychange',function(){
                var mylength=$(this).val().length;
                var myelement=document.activeElement;
                myelement.focus();
                var myelementcursor=myelement.selectionStart;
                var myvalbeorenumberofchar=$(this).val();
                if(validationoptions.numberofchar){
                    if(validationoptions.type=="natural"){
                        var mylength=$(this).val().length;
                    }else{
                        var mylength=$(this).val().length+1;
                    }
                    if(mylength>validationoptions.numberofchar){
                        $(this).val($(this).val().substr(0,mylength-1));
                    }
                }
                if(validationoptions.type=="natural"){
                    
                    if($(this).val().indexOf('-')==1){$(this).val($(this).val().substring(1))};
                    var val_0=$(this).val();
                    var negative='';
                    if (val_0.match(/^-/)){
                        negative='';
                        mystring=val_0.substring(1,myelementcursor);
                        $(this).val(myvalbeorenumberofchar);
                    }
                    
                    var stringbeforecursor= val_0.substring(0,myelementcursor);
                    var stringaftercursor= val_0.substring(myelementcursor);
                    var nbofseparatorbeforearray1=stringbeforecursor.match(/\'/g);
                    var nbofseparator1=0;
                    if(nbofseparatorbeforearray1){
                        nbofseparator1=nbofseparatorbeforearray1.length;
                    }
                    var firstchardigit='';
                    val_0=val_0.split('\'');
                    val_0=val_0.join('');
                    var val=/^[\d]\d*/.exec(val_0);
                    
                    if(val==null){
                        val=[myvalbeorenumberofchar.split('.').join('')];
                        val=/^[\d]\d*/.exec(val_0);
                        myelementcursor=myelementcursor-1;
                        val="";
                        $(this).val(val);
                    }
                    else if (val[0]!=val_0){
                        val[0]=val[0]+stringaftercursor;
                        myelementcursor=myelementcursor-1;
                    }
                    if (val[0].match(/^-/)){
                        negative='';
                        val[0]=val[0].substr(1);
                    }
                    
                    firstchardigit=val[0].charAt(0);
                    var secondchar=val[0].charAt(1);
                    var digitatsepartor=myvalbeorenumberofchar.charAt(myelementcursor);
                    if(digitatsepartor){
                        if(digitatsepartor.match(/\d/)==null&&myelementcursor-1<=val[0].length){
                            val=myvalbeorenumberofchar.substr(0,myelementcursor)+myvalbeorenumberofchar.substr(myelementcursor+1);
                        }
                    }
                    
                    if(firstchardigit=='0'){myelementcursor=myelementcursor-1};
                    if(/\d/.exec(secondchar)==null){$(this).val(myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2))};
                    
                    if(val[0].match(/^0[^,\.]/)){
                        var val=/^[\d]\d*/.exec(val[0]);
                    }

                    if(val[0].match(/^-/)){
                        var val=/[\d]\d*/.exec(val[0]);
                    }
                  
                    if(val=='' || val==null){
                        if(/\d/.exec(secondchar)==null){
                         val=myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2);
                                
                        }else{
                            val='';
                        }
                    }
                    $(this).val(negative+val);
                    var nb=$(this).val().split('\'');
                    
                    nb=nb.join('');
                    if(nb.substring(0,1)=='0'||nb==null||nb==undefined||isNaN(nb)||nb=='-'){
                        nb=nb.substring(myvalbeorenumberofchar);
                        $(this).val(myvalbeorenumberofchar.substring(1));
                    }else{
                        $(this).val(negative+parseInt(nb));
                    }
                    
                    if(validationoptions.milleseparator==true){
                        var nb=$(this).val().split('\'');
                        nb=nb.join('');
                        var val=/(^[0-9]\d*)/.exec(nb);
                        if(/\d/.exec(secondchar)==null){$(this).val(myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2))};
                        if(val=='' || val==null){
                            if(/\d/.exec(secondchar)==null){
                                $(this).val(myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2));
                                
                            }else{
                                $(this).val('');
                            }

                        }else if(val=='00'){
                           $(this).val('0');

                        }else if(parseInt(val) != 0 && val[0].length==2){
                           $(this).val(parseInt(val));
                        }else{
                            for (var i=val[0].length-1;i>=0;i-=3){;
                                if (val[0].charAt(i-3) && val[0].charAt(i-3)!='-'){
                                    var avant=val[0].substring(0,i-2);
                                    var apres=val[0].substring(i-2);
                                    val[0]=avant+'\''+apres;
                                    if(i<=myelementcursor){myelementcursor=myelementcursor+1};
                                }
                            }
                            $(this).val(val[0]);
                            var stringbeforecursor= $(this).val().substring(0,myelementcursor);
                            var nbofseparatorbeforearray2=stringbeforecursor.match(/\'/g);
                            var nbofseparator2=0;
                            if(nbofseparatorbeforearray2){
                                myelementcursor=myelementcursor-nbofseparator1;
                            }
                    }
                        
                    }else{
                        var val=/(^-?[0-9]\d*)/.exec($(this).val());
                        if(val=='' || val==null || val==0){
                            $(this).val('');
                        }else if(isNaN(val)){
                            $(this).val(parseInt(val));
                        } 
                    }
                }
                else if(validationoptions.type=="integer"){
                    if($(this).val().indexOf('-')==1){$(this).val($(this).val().substring(1))};
                    var val_0=$(this).val();
                    var negative='';
                    if (val_0.match(/^-/)){
                        negative='-';
                        mystring=val_0.substring(1,myelementcursor);
                        $(this).val('-'+val_0.substring(myelementcursor));
                    }
                    
                    var stringbeforecursor= val_0.substring(0,myelementcursor);
                    var stringaftercursor= val_0.substring(myelementcursor);
                    var nbofseparatorbeforearray1=stringbeforecursor.match(/\'/g);
                    var nbofseparator1=0;
                    if(nbofseparatorbeforearray1){
                        nbofseparator1=nbofseparatorbeforearray1.length;
                    }
                    var firstchardigit='';
                    val_0=val_0.split('\'');
                    val_0=val_0.join('');
                    var val=/^[-\d]\d*/.exec(val_0);
                    if(val==null){val=['']};
                    if (val[0]!=val_0){
                        val[0]=val[0]+stringaftercursor;
                        myelementcursor=myelementcursor-1;
                    }
                    if (val[0].match(/^-/)){
                        negative='-';
                        val[0]=val[0].substr(1);
                    }
                    var firstchardigit=val[0].charAt(0);
                    var secondchar=val[0].charAt(1);
                    if(firstchardigit=='0'){myelementcursor=myelementcursor-1};
                    if(firstchardigit=='-' && secondchar=='-'){
                        val[0]=val[0].substring(1);
                    }
                    if(val[0].match(/^0[^,\.]/)){
                        var val=/^[-\d]\d*/.exec(val[0]);
                    }
                    if(val[0].match(/^-/)){
                        var val=val[0].substr(1);
                    }
                    if(val=='' || val==null){
                       if(/\d/.exec(secondchar)==null){
                            $(this).val(myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2));
                            
                        }else{
                            $(this).val('');
                        }
                    }
                    $(this).val(negative+val);
                    var nb=$(this).val().split('\'');
                    nb=nb.join('');
                    if(nb==null||nb==undefined||isNaN(nb)||nb=='-'){
                        $(this).val(negative);
                    }else{
                        nb=Math.abs(Number(nb));
                        $(this).val(negative+parseInt(nb));
                    }
                    if(validationoptions.numberofchar){
                        if($(this).val().length>=validationoptions.numberofchar){
                            $(this).val($(this).val().substr(0,$(this).val().length-1))
                        }
                    }
                    if(validationoptions.milleseparator==true){
                        var nb=$(this).val().split('\'');
                        nb=nb.join('');
                        var val=/[-0-9']\d*/.exec(nb);
                        if(val=='' || val==null){
                           if(/\d/.exec(secondchar)==null){
                                $(this).val(myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2));
                                
                            }else{
                                $(this).val('');
                            }

                        }else  if(val=='-'){
                            $(this).val('-');

                        }else if(val=='-0'){
                            $(this).val('-');

                        }else if(val=='00'){
                           $(this).val('0');

                        }else if(parseInt(val) != 0 && val[0].length==2){
                           $(this).val(parseInt(val)); 

                        }else{
                            for (var i=val[0].length-1;i>=0;i-=3){
                                if (val[0].charAt(i-3) && val[0].charAt(i-3)!='-'){
                                    var avant=val[0].substring(0,i-2);
                                    var apres=val[0].substring(i-2);
                                    val[0]=avant+'\''+apres;
                                    if(i<=myelementcursor){myelementcursor=myelementcursor+1};
                                }
                            }
                            $(this).val(val[0]);
                            var stringbeforecursor= $(this).val().substring(0,myelementcursor);
                            var nbofseparatorbeforearray2=stringbeforecursor.match(/\'/g);
                            var nbofseparator2=0;
                            if(nbofseparatorbeforearray2){
                                myelementcursor=myelementcursor-nbofseparator1;
                            }
                        }
                    }else{
                        var val=/[-0-9]\d*/.exec($(this).val());
                        if(val=='' || val==null){
                            $(this).val('');
                        }else  if(val=='-'){
                            $(this).val('-');
                        }else if(val=='-0'){
                            $(this).val('-');
                        }else if(val=='00'){
                           $(this).val('0');
                        }else{
                            $(this).val(parseInt(val));
                        }
                    }
                }
                else if(validationoptions.type=='posdecimal'){ 
                   $(this).val($(this).val().replace(',','.'));
                    if($(this).val().indexOf('-')==1){$(this).val($(this).val().substring(1))};
                    var val_0=$(this).val();
                    if(val_0.match(/\./g)!=null){
                        if(val_0.match(/\./g).length>1){
                            val_0=val_0.substring(0,myelementcursor).split('.').join('')+'.'+val_0.substring(myelementcursor).split('.').join('');
                        }
                    }
                    var negative='';
                    var stringbeforecursor= val_0.substring(0,myelementcursor);
                    var stringaftercursor= val_0.substring(myelementcursor);
                    var nbofseparatorbeforearray1=stringbeforecursor.match(/\'/g);
                    var nbofseparator1=0;
                    if(nbofseparatorbeforearray1){
                        nbofseparator1=nbofseparatorbeforearray1.length;
                    }
                    var firstchardigit='';
                    val_0=val_0.split('\'');
                    val_0=val_0.join('');
                    var val=/^[-.\d]\d*\.?\d*/.exec(val_0);
                    if(val==null){val=['']};
                    if (val[0]!=val_0){
                        val[0]=val[0]+stringaftercursor;
                        myelementcursor=myelementcursor-1;
                    }
                    if (val[0].match(/^-/)){
                        negative='-';
                        val[0]=val[0].substr(1);
                        myelementcursor=myelementcursor-1;
                    }
                    firstchardigit=val[0].charAt(0);
                    var secondchar=val[0].charAt(1);
                    if(firstchardigit=='0'&& secondchar!='.'){myelementcursor=myelementcursor-1};
                    if(val[0].match(/^0[^,\.]/)){
                        var val=/^[-.\d]\d*.?\d*/.exec(val[0]);
                    }
                    if(val[0].match(/^-/)){
                        var val=/[.\d]\d*.?\d*/.exec(val[0]);
                    }
                    if(val=='' || val==null){
                       val='';
                    }else if(val=='.'){
                        val='0.';
                        myelementcursor=myelementcursor+1;
                    }
                    $(this).val(negative+val);
                    var point=$(this).val().match(/\./);
                    var nbInteger=$(this).val().split('.');
                    var nb=nbInteger[0].split('\'');
                    nb=nb.join('');
                    if(point==null||point==undefined){point=''};
                    if(nbInteger[1]==null||nbInteger[1]==undefined){nbInteger[1]=''};
                    if(nb==null||nb==undefined||isNaN(nb)||nb=='-'){
                        nb='';
                        $(this).val(nb+point+nbInteger[1]);
                    }else{
                        if(nb==''){myelementcursor=1};
                        nb=Math.abs(Number(nb));
                        $(this).val(parseInt(nb)+point+nbInteger[1]);
                    }
                    if(validationoptions.numberofchar){
                        var leftpoint;
                        var thepoint=false;
                        if($(this).val().match(/\./)){
                            leftpoint=$(this).val().split('.');
                            thepoint=true;
                        }
                        if($(this).val().length>=validationoptions.numberofchar && $(this).val().charAt($(this).val().length-1)=='.'){
                            $(this).val(myvalbeorenumberofchar.substr(0,myvalbeorenumberofchar.length-1))
                        }
                        else if($(this).val().length>=Number(validationoptions.numberofchar)-1 && $(this).val().charAt($(this).val().length-1)=='.'){
                            $(this).val(myvalbeorenumberofchar.substr(0,myvalbeorenumberofchar.length-1))
                        }
                        else if ($(this).val().length<validationoptions.numberofchar){rpnsequence.log('on ne fait rien')}
                        else if($(this).val().length>=validationoptions.numberofchar && thepoint==false){
                            $(this).val($(this).val().substr(0,$(this).val().length-1));
                        }else if($(this).val().length>=Number(validationoptions.numberofchar)+1 && thepoint==true && leftpoint[0].length>=4 && validationoptions.milleseparator==true){
                            
                            $(this).val($(this).val().substr(0,$(this).val().length-2));
                            if($(this).val().charAt($(this).val().length-1)=='.'){$(this).val($(this).val().substr(0,$(this).val().length-1))};
                            
                        }else if($(this).val().length>=Number(validationoptions.numberofchar)+1 && thepoint==true && leftpoint[0].length>=4 && !validationoptions.milleseparator){
                            $(this).val($(this).val().substr(0,$(this).val().length-1));
                            if($(this).val().charAt($(this).val().length-1)=='.'){$(this).val($(this).val().substr(0,$(this).val().length-1))};
                        }else if ($(this).val().length>validationoptions.numberofchar){
                            $(this).val($(this).val().substr(0,$(this).val().length-1));
                        }
                        else{
                            $(this).val($(this).val().substr(0,$(this).val().length));
                        }
                    }
                    if(validationoptions.milleseparator==true){
                        var point=$(this).val().match(/\./);
                        var nbInteger=$(this).val().split('.');
                        var nb=nbInteger[0].split('\'');
                        nb=nb.join('');
                        var val=/[0-9']\d*/.exec(nb);
                        if(val=='' || val==null){
                            $(this).val('');

                        }else  if(val=='-'){
                            $(this).val('-');

                        }else if(val=='-0'){
                            $(this).val('-');

                        }else if(val=='00'){
                           $(this).val('0');

                        }else if(parseInt(val) != 0 && val[0].length==2){
                            if(point=='' || point == null){
                                $(this).val(parseInt(val));    
                            }else{
                                $(this).val(parseInt(val)+point+nbInteger[1]); 
                            } 

                        }else{
                            for (var i=val[0].length-1;i>=0;i-=3){
                                if (val[0].charAt(i-3) && val[0].charAt(i-3)!='-'){
                                    var avant=val[0].substring(0,i-2);
                                    var apres=val[0].substring(i-2);
                                    val[0]=avant+'\''+apres;
                                    if(i<=myelementcursor){myelementcursor=myelementcursor+1};
                                }
                            }
                            if(point=='' || point == null){
                                $(this).val(val[0]);
                            }else{
                                $(this).val(val[0]+point+nbInteger[1]); 
                            }
                            var stringbeforecursor= $(this).val().substring(0,myelementcursor);
                            var nbofseparatorbeforearray2=stringbeforecursor.match(/\'/g);
                            var nbofseparator2=0;
                            if(nbofseparatorbeforearray2){
                                myelementcursor=myelementcursor-nbofseparator1;
                            }
                        }
                    }
                	
                }
                else if(validationoptions.type=='decimal'){
                    $(this).val($(this).val().replace(',','.'));
                    if($(this).val().indexOf('-')==1){$(this).val($(this).val().substring(1))};
                    var val_0=$(this).val();
                    if(val_0.match(/\./g)!=null){
                        if(val_0.match(/\./g).length>1){
                            if (val_0.match(/^-/)){
                                mystring=val_0.substring(1,myelementcursor);
                                if(mystring.length==1){
                                    val_0='-0.'+val_0.substring(myelementcursor).split('.').join('');
                                }else{
                                  val_0=val_0.substring(0,myelementcursor).split('.').join('')+'.'+val_0.substring(myelementcursor).split('.').join('');   
                                }
                            }else{
                               val_0=val_0.substring(0,myelementcursor).split('.').join('')+'.'+val_0.substring(myelementcursor).split('.').join(''); 
                            }
                            
                        }
                    }
                    var negative='';
                    var stringbeforecursor= val_0.substring(0,myelementcursor);
                    var stringaftercursor= val_0.substring(myelementcursor);
                    var nbofseparatorbeforearray1=stringbeforecursor.match(/\'/g);
                    var nbofseparator1=0;
                    if(nbofseparatorbeforearray1){
                        nbofseparator1=nbofseparatorbeforearray1.length;
                    }
                    var firstchardigit='';
                    val_0=val_0.split('\'');
                    val_0=val_0.join('');
                    var val=/^[-.\d]\d*\.?\d*/.exec(val_0);
                    if(val==null){val=['']};
                    if (val[0]!=val_0){
                        val[0]=val[0]+stringaftercursor;
                        myelementcursor=myelementcursor-1;
                    }
                    if (val[0].match(/^-/)){
                        negative='-';
                        val[0]=val[0].substr(1);
                    }
                    var firstchardigit=val[0].charAt(0);
                    var secondchar=val[0].charAt(1);
                    if(firstchardigit=='0'&& secondchar!='.'){myelementcursor=myelementcursor-1;}
                    if(val[0].match(/^0[^,\.]/)){
                        var val=/^[-.\d]\d*.?\d*/.exec(val[0]);
                    }
                    if(val[0].match(/^-/)){
                        var val=/[.\d]\d*.?\d*/.exec(val[0]);
                    }
                    if(val=='' || val==null){
                       val='';
                    }else if(val=='.'){
                        val='0.';
                        myelementcursor=myelementcursor+1;
                    }
                    $(this).val(negative+val);
                    var point=$(this).val().match(/\./);
                    var nbInteger=$(this).val().split('.');
                    var nb=nbInteger[0].split('\'');
                    nb=nb.join('');
                    if(point==null||point==undefined){point=''};
                    if(nbInteger[1]==null||nbInteger[1]==undefined){nbInteger[1]=''};
                    if(nb==null||nb==undefined||isNaN(nb)||nb=='-'){
                        nb='';
                        $(this).val(negative+nb+point+nbInteger[1]);
                    }else{
                        nb=Math.abs(Number(nb));
                        $(this).val(negative+parseInt(nb)+point+nbInteger[1]);
                    }
                    if(validationoptions.numberofchar){
                        var leftpoint;
                        var thepoint=false;
                        if($(this).val().match(/\./)){
                            leftpoint=$(this).val().split('.');
                            thepoint=true;
                        }
                        if($(this).val().length>=validationoptions.numberofchar && $(this).val().charAt($(this).val().length-1)=='.'){
                            $(this).val(myvalbeorenumberofchar.substr(0,myvalbeorenumberofchar.length-1))
                        }
                        else if($(this).val().length>=Number(validationoptions.numberofchar)-1 && $(this).val().charAt($(this).val().length-1)=='.'){
                            $(this).val(myvalbeorenumberofchar.substr(0,myvalbeorenumberofchar.length-1))
                        }
                        else if ($(this).val().length<validationoptions.numberofchar){rpnsequence.log('on ne fait rien')}
                        else if($(this).val().length>=validationoptions.numberofchar && thepoint==false){
                            $(this).val($(this).val().substr(0,$(this).val().length-1));
                        }else if($(this).val().length>=Number(validationoptions.numberofchar)+1 && thepoint==true && leftpoint[0].length>=4 && validationoptions.milleseparator==true){
                            $(this).val($(this).val().substr(0,$(this).val().length-2));
                            if($(this).val().charAt($(this).val().length-1)=='.'){$(this).val($(this).val().substr(0,$(this).val().length-1))};
                            
                        }else if($(this).val().length>=Number(validationoptions.numberofchar)+1 && thepoint==true && leftpoint[0].length>=4 && !validationoptions.milleseparator){
                            $(this).val($(this).val().substr(0,$(this).val().length-1));
                            if($(this).val().charAt($(this).val().length-1)=='.'){$(this).val($(this).val().substr(0,$(this).val().length-1))};
                        }else if ($(this).val().length>validationoptions.numberofchar){
                            $(this).val($(this).val().substr(0,$(this).val().length-1));
                        }
                        else{
                            $(this).val($(this).val().substr(0,$(this).val().length));
                        }
                    }
                    if(validationoptions.milleseparator==true){
                        var point=$(this).val().match(/\./);
                        var nbInteger=$(this).val().split('.');
                        var nb=nbInteger[0].split('\'');
                        nb=nb.join('');
                        var val=/[-0-9']\d*/.exec(nb);
                        if(val=='' || val==null){
                            $(this).val('');

                        }else  if(val=='-'){
                            $(this).val('-');
                        }else if(val=='00'){
                           $(this).val('0');

                        }else if(parseInt(val) != 0 && val[0].length==2){
                           if(point=='' || point == null){
                                $(this).val(parseInt(val));    
                            }else{
                                $(this).val(parseInt(val)+point+nbInteger[1]); 
                            }
                        }else{
                            for (var i=val[0].length-1;i>=0;i-=3){
                                if (val[0].charAt(i-3) && val[0].charAt(i-3)!='-'){
                                    var avant=val[0].substring(0,i-2);
                                    var apres=val[0].substring(i-2);
                                    val[0]=avant+'\''+apres;
                                    if(i<=myelementcursor){
                                        myelementcursor=myelementcursor+1;
                                    }     
                                }
                            }
                            if(point=='' || point == null){
                                $(this).val(val[0]);    
                            }else{
                                $(this).val(val[0]+point+nbInteger[1]);  
                            }
                            var stringbeforecursor= $(this).val().substring(0,myelementcursor);
                            var nbofseparatorbeforearray2=stringbeforecursor.match(/\'/g);
                            var nbofseparator2=0;
                            if(nbofseparatorbeforearray2){
                                myelementcursor=myelementcursor-nbofseparator1;
                            }
                        }
                    }
                }
                else if(validationoptions.type=='lowercase'){
                    var val_0=$(this).val().toLowerCase();
                    var val=/[a-zâäàéèùêëîïôöçñ]*/.exec(val_0);
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }
                else if(validationoptions.type=='familycase'){
                    var val=/^[A-ZÀÂÄÉÈÙÊËÎÏÔÖÑa-zâäàéèùêëîïôöçñ][a-zâäàéèùêëîïôöçñ]*/.exec($(this).val());
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }
                else if(validationoptions.type=='uppercase'){
                    var val_0=$(this).val().toUpperCase()
                    var val=/[A-ZÀÂÄÉÈÙÊËÎÏÔÖÑ]*/.exec(val_0);
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }
                else if(validationoptions.type=='letter'){
                    var val=/[A-ZÀÂÄÉÈÙÊËÎÏÔÖÑa-zâäàéèùêëîïôöçñ]*/.exec($(this).val());
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }
                else if(validationoptions.type=='words'){
                    var val=/[A-ZÀÂÄÉÈÙÊËÎÏÔÖÑa-zâäàéèùêëîïôöçñ' ]*/.exec($(this).val().replace(/\s{2,}/g,' '));
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }
                else if(validationoptions.type[0]=='list'){
                    var tablength=validationoptions.type.length;
                    var val0=$(this).val().split('^');
                    val0=val0.join('');
                    var myval=val0;
                    var mychar=myval.charAt(myelementcursor-1);
                    val0=val0.split(mychar).join('');
                    var valinliste=myval+"+";
                    var regvarinlist=new RegExp(valinliste);
                    var val='';
                    for(var i=1;i<tablength;i++){
                        if(val==''||val==null){
                            val=regvarinlist.exec(validationoptions.type[i]);
                        }
                    }
                    if(val=='' || val==null){
                        $(this).val(val0);
                        myelementcursor=myelementcursor-1;
                    }else{
                        $(this).val(val);
                    }
                }
                
                myelement.setSelectionRange(myelementcursor, myelementcursor);
                
            });
        }
    };
    
    
    return {
        init: init,
        displayAlert: displayAlert,
        log: log,
        getLabels: getLabels,
        addvalidation: addvalidation,
        getColor:getColor
    };
})();
//sorting
var rpnsortingmodule = function() {

    var datas;
    var domelem;
    var state;
    

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            sentence: ["sentence", "not", "set!"],
            shuffle:false,
            vertical:false
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state= datas.sentence;
            if(datas.shuffle){
                state=_.shuffle(state);
            }
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('sorting');

        //build sentence with items to select
        var sentenceToSort=$('<ul class="list-unstyled'+(datas.vertical?'':' list-inline')+'"></ul>');
        _.each(state, function(item, idx) {
            var noElem = _.indexOf(datas.sentence, item);
            sentenceToSort.append($('<li val="'+noElem+'">'+item+'</li>'));
        });
        domelem.append(sentenceToSort);
        sentenceToSort.sortable({
          placeholder: "sorting-highlight",
          tolerance:"pointer"
        });
        $(domelem).disableSelection();
        bindUiEvents();
    };

    var bindUiEvents = function() {
        
    };
    
    var validate = function(){
        state=_.map($('li',domelem),function(ele,idx){
            return ($(ele).children().is("img")) ? datas.sentence[$(ele).attr("val")] : $(ele).html();
        });
        return state;
    };
    
   var score = function(sol){
        var score = 0;
        if(sol.alternative){
            _.each(sol.alternative, function(ssol, idx) {
                score += (_.isEqual(state,ssol) ? 1 : 0);
            });
        }else{
            score = (_.isEqual(state,sol) ? 1 : 0);
        }
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score:score
    };

};