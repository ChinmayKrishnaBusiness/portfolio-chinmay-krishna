/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    function b(b, d) {
        var e, f, g, h = b.nodeName.toLowerCase();
        return "area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap='#" + f + "']")[0], !!g && c(g)) : !1) : (/^(input|select|textarea|button|object)$/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b)
    }

    function c(b) {
        return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
                return "hidden" === a.css(this, "visibility")
            }).length
    }
    a.ui = a.ui || {}, a.extend(a.ui, {
        version: "1.11.4",
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
    }), a.fn.extend({
        scrollParent: function(b) {
            var c = this.css("position"),
                d = "absolute" === c,
                e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                f = this.parents().filter(function() {
                    var b = a(this);
                    return d && "static" === b.css("position") ? !1 : e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))
                }).eq(0);
            return "fixed" !== c && f.length ? f : a(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var a = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++a)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
            })
        }
    }), a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
            return function(c) {
                return !!a.data(c, b)
            }
        }) : function(b, c, d) {
            return !!a.data(b, d[3])
        },
        focusable: function(c) {
            return b(c, !isNaN(a.attr(c, "tabindex")))
        },
        tabbable: function(c) {
            var d = a.attr(c, "tabindex"),
                e = isNaN(d);
            return (e || d >= 0) && b(c, !e)
        }
    }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(b, c) {
        function d(b, c, d, f) {
            return a.each(e, function() {
                c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
            }), c
        }
        var e = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"],
            f = c.toLowerCase(),
            g = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
        a.fn["inner" + c] = function(b) {
            return void 0 === b ? g["inner" + c].call(this) : this.each(function() {
                a(this).css(f, d(this, b) + "px")
            })
        }, a.fn["outer" + c] = function(b, e) {
            return "number" != typeof b ? g["outer" + c].call(this, b) : this.each(function() {
                a(this).css(f, d(this, b, !0, e) + "px")
            })
        }
    }), a.fn.addBack || (a.fn.addBack = function(a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {
        return function(c) {
            return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
        }
    }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.fn.extend({
        focus: function(b) {
            return function(c, d) {
                return "number" == typeof c ? this.each(function() {
                    var b = this;
                    setTimeout(function() {
                        a(b).focus(), d && d.call(b)
                    }, c)
                }) : b.apply(this, arguments)
            }
        }(a.fn.focus),
        disableSelection: function() {
            var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(a + ".ui-disableSelection", function(a) {
                    a.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(b) {
            if (void 0 !== b) return this.css("zIndex", b);
            if (this.length)
                for (var c, d, e = a(this[0]); e.length && e[0] !== document;) {
                    if (c = e.css("position"), ("absolute" === c || "relative" === c || "fixed" === c) && (d = parseInt(e.css("zIndex"), 10), !isNaN(d) && 0 !== d)) return d;
                    e = e.parent()
                }
            return 0
        }
    }), a.ui.plugin = {
        add: function(b, c, d) {
            var e, f = a.ui[b].prototype;
            for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
        },
        call: function(a, b, c, d) {
            var e, f = a.plugins[b];
            if (f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))
                for (e = 0; e < f.length; e++) a.options[f[e][0]] && f[e][1].apply(a.element, c)
        }
    }
});;
/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    var b = 0,
        c = Array.prototype.slice;
    return a.cleanData = function(b) {
        return function(c) {
            var d, e, f;
            for (f = 0; null != (e = c[f]); f++) try {
                d = a._data(e, "events"), d && d.remove && a(e).triggerHandler("remove")
            } catch (g) {}
            b(c)
        }
    }(a.cleanData), a.widget = function(b, c, d) {
        var e, f, g, h, i = {},
            j = b.split(".")[0];
        return b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function(b) {
            return !!a.data(b, e)
        }, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function(a, b) {
            return this._createWidget ? void(arguments.length && this._createWidget(a, b)) : new g(a, b)
        }, a.extend(g, f, {
            version: d.version,
            _proto: a.extend({}, d),
            _childConstructors: []
        }), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function(b, d) {
            return a.isFunction(d) ? void(i[b] = function() {
                var a = function() {
                        return c.prototype[b].apply(this, arguments)
                    },
                    e = function(a) {
                        return c.prototype[b].apply(this, a)
                    };
                return function() {
                    var b, c = this._super,
                        f = this._superApply;
                    return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b
                }
            }()) : void(i[b] = d)
        }), g.prototype = a.widget.extend(h, {
            widgetEventPrefix: f ? h.widgetEventPrefix || b : b
        }, i, {
            constructor: g,
            namespace: j,
            widgetName: b,
            widgetFullName: e
        }), f ? (a.each(f._childConstructors, function(b, c) {
            var d = c.prototype;
            a.widget(d.namespace + "." + d.widgetName, g, c._proto)
        }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g), g
    }, a.widget.extend = function(b) {
        for (var d, e, f = c.call(arguments, 1), g = 0, h = f.length; h > g; g++)
            for (d in f[g]) e = f[g][d], f[g].hasOwnProperty(d) && void 0 !== e && (a.isPlainObject(e) ? b[d] = a.isPlainObject(b[d]) ? a.widget.extend({}, b[d], e) : a.widget.extend({}, e) : b[d] = e);
        return b
    }, a.widget.bridge = function(b, d) {
        var e = d.prototype.widgetFullName || b;
        a.fn[b] = function(f) {
            var g = "string" == typeof f,
                h = c.call(arguments, 1),
                i = this;
            return g ? this.each(function() {
                var c, d = a.data(this, e);
                return "instance" === f ? (i = d, !1) : d ? a.isFunction(d[f]) && "_" !== f.charAt(0) ? (c = d[f].apply(d, h), c !== d && void 0 !== c ? (i = c && c.jquery ? i.pushStack(c.get()) : c, !1) : void 0) : a.error("no such method '" + f + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + f + "'")
            }) : (h.length && (f = a.widget.extend.apply(null, [f].concat(h))), this.each(function() {
                var b = a.data(this, e);
                b ? (b.option(f || {}), b._init && b._init()) : a.data(this, e, new d(f, this))
            })), i
        }
    }, a.Widget = function() {}, a.Widget._childConstructors = [], a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(c, d) {
            d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = b++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(a) {
                    a.target === d && this.destroy()
                }
            }), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this.options = a.widget.extend({}, this.options, this._getCreateOptions(), c), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: a.noop,
        _getCreateEventData: a.noop,
        _create: a.noop,
        _init: a.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: a.noop,
        widget: function() {
            return this.element
        },
        option: function(b, c) {
            var d, e, f, g = b;
            if (0 === arguments.length) return a.widget.extend({}, this.options);
            if ("string" == typeof b)
                if (g = {}, d = b.split("."), b = d.shift(), d.length) {
                    for (e = g[b] = a.widget.extend({}, this.options[b]), f = 0; f < d.length - 1; f++) e[d[f]] = e[d[f]] || {}, e = e[d[f]];
                    if (b = d.pop(), 1 === arguments.length) return void 0 === e[b] ? null : e[b];
                    e[b] = c
                } else {
                    if (1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];
                    g[b] = c
                }
            return this._setOptions(g), this
        },
        _setOptions: function(a) {
            var b;
            for (b in a) this._setOption(b, a[b]);
            return this
        },
        _setOption: function(a, b) {
            return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!b), b && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(b, c, d) {
            var e, f = this;
            "boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function(d, g) {
                function h() {
                    return b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0
                }
                "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
                var i = d.match(/^([\w:-]*)\s*(.*)$/),
                    j = i[1] + f.eventNamespace,
                    k = i[2];
                k ? e.delegate(k, j, h) : c.bind(j, h)
            })
        },
        _off: function(b, c) {
            c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, b.unbind(c).undelegate(c), this.bindings = a(this.bindings.not(b).get()), this.focusable = a(this.focusable.not(b).get()), this.hoverable = a(this.hoverable.not(b).get())
        },
        _delay: function(a, b) {
            function c() {
                return ("string" == typeof a ? d[a] : a).apply(d, arguments)
            }
            var d = this;
            return setTimeout(c, b || 0)
        },
        _hoverable: function(b) {
            this.hoverable = this.hoverable.add(b), this._on(b, {
                mouseenter: function(b) {
                    a(b.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(b) {
                    a(b.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(b) {
            this.focusable = this.focusable.add(b), this._on(b, {
                focusin: function(b) {
                    a(b.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(b) {
                    a(b.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(b, c, d) {
            var e, f, g = this.options[b];
            if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)
                for (e in f) e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
        }
    }, a.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(b, c) {
        a.Widget.prototype["_" + b] = function(d, e, f) {
            "string" == typeof e && (e = {
                effect: e
            });
            var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
            e = e || {}, "number" == typeof e && (e = {
                duration: e
            }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
                a(this)[b](), f && f.call(d[0]), c()
            })
        }
    }), a.widget
});;
/*!
 * jQuery UI Accordion 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/accordion/
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./widget"], a) : a(jQuery)
}(function(a) {
    return a.widget("ui.accordion", {
        version: "1.11.4",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        hideProps: {
            borderTopWidth: "hide",
            borderBottomWidth: "hide",
            paddingTop: "hide",
            paddingBottom: "hide",
            height: "hide"
        },
        showProps: {
            borderTopWidth: "show",
            borderBottomWidth: "show",
            paddingTop: "show",
            paddingBottom: "show",
            height: "show"
        },
        _create: function() {
            var b = this.options;
            this.prevShow = this.prevHide = a(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), b.collapsible || b.active !== !1 && null != b.active || (b.active = 0), this._processPanels(), b.active < 0 && (b.active += this.headers.length), this._refresh()
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : a()
            }
        },
        _createIcons: function() {
            var b = this.options.icons;
            b && (a("<span>").addClass("ui-accordion-header-icon ui-icon " + b.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(b.header).addClass(b.activeHeader), this.headers.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function() {
            var a;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), a = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && a.css("height", "")
        },
        _setOption: function(a, b) {
            return "active" === a ? void this._activate(b) : ("event" === a && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(b)), this._super(a, b), "collapsible" !== a || b || this.options.active !== !1 || this._activate(0), "icons" === a && (this._destroyIcons(), b && this._createIcons()), void("disabled" === a && (this.element.toggleClass("ui-state-disabled", !!b).attr("aria-disabled", b), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!b))))
        },
        _keydown: function(b) {
            if (!b.altKey && !b.ctrlKey) {
                var c = a.ui.keyCode,
                    d = this.headers.length,
                    e = this.headers.index(b.target),
                    f = !1;
                switch (b.keyCode) {
                    case c.RIGHT:
                    case c.DOWN:
                        f = this.headers[(e + 1) % d];
                        break;
                    case c.LEFT:
                    case c.UP:
                        f = this.headers[(e - 1 + d) % d];
                        break;
                    case c.SPACE:
                    case c.ENTER:
                        this._eventHandler(b);
                        break;
                    case c.HOME:
                        f = this.headers[0];
                        break;
                    case c.END:
                        f = this.headers[d - 1]
                }
                f && (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), b.preventDefault())
            }
        },
        _panelKeyDown: function(b) {
            b.keyCode === a.ui.keyCode.UP && b.ctrlKey && a(b.currentTarget).prev().focus()
        },
        refresh: function() {
            var b = this.options;
            this._processPanels(), b.active === !1 && b.collapsible === !0 || !this.headers.length ? (b.active = !1, this.active = a()) : b.active === !1 ? this._activate(0) : this.active.length && !a.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (b.active = !1, this.active = a()) : this._activate(Math.max(0, b.active - 1)) : b.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
        },
        _processPanels: function() {
            var a = this.headers,
                b = this.panels;
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), b && (this._off(a.not(this.headers)), this._off(b.not(this.panels)))
        },
        _refresh: function() {
            var b, c = this.options,
                d = c.heightStyle,
                e = this.element.parent();
            this.active = this._findActive(c.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function() {
                var b = a(this),
                    c = b.uniqueId().attr("id"),
                    d = b.next(),
                    e = d.uniqueId().attr("id");
                b.attr("aria-controls", e), d.attr("aria-labelledby", c)
            }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }).next().attr({
                "aria-hidden": "true"
            }).hide(), this.active.length ? this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }).next().attr({
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(c.event), "fill" === d ? (b = e.height(), this.element.siblings(":visible").each(function() {
                var c = a(this),
                    d = c.css("position");
                "absolute" !== d && "fixed" !== d && (b -= c.outerHeight(!0))
            }), this.headers.each(function() {
                b -= a(this).outerHeight(!0)
            }), this.headers.next().each(function() {
                a(this).height(Math.max(0, b - a(this).innerHeight() + a(this).height()))
            }).css("overflow", "auto")) : "auto" === d && (b = 0, this.headers.next().each(function() {
                b = Math.max(b, a(this).css("height", "").height())
            }).height(b))
        },
        _activate: function(b) {
            var c = this._findActive(b)[0];
            c !== this.active[0] && (c = c || this.active[0], this._eventHandler({
                target: c,
                currentTarget: c,
                preventDefault: a.noop
            }))
        },
        _findActive: function(b) {
            return "number" == typeof b ? this.headers.eq(b) : a()
        },
        _setupEvents: function(b) {
            var c = {
                keydown: "_keydown"
            };
            b && a.each(b.split(" "), function(a, b) {
                c[b] = "_eventHandler"
            }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, c), this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }), this._hoverable(this.headers), this._focusable(this.headers)
        },
        _eventHandler: function(b) {
            var c = this.options,
                d = this.active,
                e = a(b.currentTarget),
                f = e[0] === d[0],
                g = f && c.collapsible,
                h = g ? a() : e.next(),
                i = d.next(),
                j = {
                    oldHeader: d,
                    oldPanel: i,
                    newHeader: g ? a() : e,
                    newPanel: h
                };
            b.preventDefault(), f && !c.collapsible || this._trigger("beforeActivate", b, j) === !1 || (c.active = g ? !1 : this.headers.index(e), this.active = f ? a() : e, this._toggle(j), d.removeClass("ui-accordion-header-active ui-state-active"), c.icons && d.children(".ui-accordion-header-icon").removeClass(c.icons.activeHeader).addClass(c.icons.header), f || (e.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), c.icons && e.children(".ui-accordion-header-icon").removeClass(c.icons.header).addClass(c.icons.activeHeader), e.next().addClass("ui-accordion-content-active")))
        },
        _toggle: function(b) {
            var c = b.newPanel,
                d = this.prevShow.length ? this.prevShow : b.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = c, this.prevHide = d, this.options.animate ? this._animate(c, d, b) : (d.hide(), c.show(), this._toggleComplete(b)), d.attr({
                "aria-hidden": "true"
            }), d.prev().attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }), c.length && d.length ? d.prev().attr({
                tabIndex: -1,
                "aria-expanded": "false"
            }) : c.length && this.headers.filter(function() {
                return 0 === parseInt(a(this).attr("tabIndex"), 10)
            }).attr("tabIndex", -1), c.attr("aria-hidden", "false").prev().attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _animate: function(a, b, c) {
            var d, e, f, g = this,
                h = 0,
                i = a.css("box-sizing"),
                j = a.length && (!b.length || a.index() < b.index()),
                k = this.options.animate || {},
                l = j && k.down || k,
                m = function() {
                    g._toggleComplete(c)
                };
            return "number" == typeof l && (f = l), "string" == typeof l && (e = l), e = e || l.easing || k.easing, f = f || l.duration || k.duration, b.length ? a.length ? (d = a.show().outerHeight(), b.animate(this.hideProps, {
                duration: f,
                easing: e,
                step: function(a, b) {
                    b.now = Math.round(a)
                }
            }), void a.hide().animate(this.showProps, {
                duration: f,
                easing: e,
                complete: m,
                step: function(a, c) {
                    c.now = Math.round(a), "height" !== c.prop ? "content-box" === i && (h += c.now) : "content" !== g.options.heightStyle && (c.now = Math.round(d - b.outerHeight() - h), h = 0)
                }
            })) : b.animate(this.hideProps, f, e, m) : a.animate(this.showProps, f, e, m)
        },
        _toggleComplete: function(a) {
            var b = a.oldPanel;
            b.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), b.length && (b.parent()[0].className = b.parent()[0].className), this._trigger("activate", null, a)
        }
    })
});;
/*!
 * jQuery UI Tabs 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tabs/
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./widget"], a) : a(jQuery)
}(function(a) {
    return a.widget("ui.tabs", {
        version: "1.11.4",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _isLocal: function() {
            var a = /#.*$/;
            return function(b) {
                var c, d;
                b = b.cloneNode(!1), c = b.href.replace(a, ""), d = location.href.replace(a, "");
                try {
                    c = decodeURIComponent(c)
                } catch (e) {}
                try {
                    d = decodeURIComponent(d)
                } catch (e) {}
                return b.hash.length > 1 && c === d
            }
        }(),
        _create: function() {
            var b = this,
                c = this.options;
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", c.collapsible), this._processTabs(), c.active = this._initialActive(), a.isArray(c.disabled) && (c.disabled = a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"), function(a) {
                return b.tabs.index(a)
            }))).sort()), this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(c.active) : this.active = a(), this._refresh(), this.active.length && this.load(c.active)
        },
        _initialActive: function() {
            var b = this.options.active,
                c = this.options.collapsible,
                d = location.hash.substring(1);
            return null === b && (d && this.tabs.each(function(c, e) {
                return a(e).attr("aria-controls") === d ? (b = c, !1) : void 0
            }), null === b && (b = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === b || -1 === b) && (b = this.tabs.length ? 0 : !1)), b !== !1 && (b = this.tabs.index(this.tabs.eq(b)), -1 === b && (b = c ? !1 : 0)), !c && b === !1 && this.anchors.length && (b = 0), b
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : a()
            }
        },
        _tabKeydown: function(b) {
            var c = a(this.document[0].activeElement).closest("li"),
                d = this.tabs.index(c),
                e = !0;
            if (!this._handlePageNav(b)) {
                switch (b.keyCode) {
                    case a.ui.keyCode.RIGHT:
                    case a.ui.keyCode.DOWN:
                        d++;
                        break;
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.LEFT:
                        e = !1, d--;
                        break;
                    case a.ui.keyCode.END:
                        d = this.anchors.length - 1;
                        break;
                    case a.ui.keyCode.HOME:
                        d = 0;
                        break;
                    case a.ui.keyCode.SPACE:
                        return b.preventDefault(), clearTimeout(this.activating), void this._activate(d);
                    case a.ui.keyCode.ENTER:
                        return b.preventDefault(), clearTimeout(this.activating), void this._activate(d === this.options.active ? !1 : d);
                    default:
                        return
                }
                b.preventDefault(), clearTimeout(this.activating), d = this._focusNextTab(d, e), b.ctrlKey || b.metaKey || (c.attr("aria-selected", "false"), this.tabs.eq(d).attr("aria-selected", "true"), this.activating = this._delay(function() {
                    this.option("active", d)
                }, this.delay))
            }
        },
        _panelKeydown: function(b) {
            this._handlePageNav(b) || b.ctrlKey && b.keyCode === a.ui.keyCode.UP && (b.preventDefault(), this.active.focus())
        },
        _handlePageNav: function(b) {
            return b.altKey && b.keyCode === a.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : b.altKey && b.keyCode === a.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
        },
        _findNextTab: function(b, c) {
            function d() {
                return b > e && (b = 0), 0 > b && (b = e), b
            }
            for (var e = this.tabs.length - 1; - 1 !== a.inArray(d(), this.options.disabled);) b = c ? b + 1 : b - 1;
            return b
        },
        _focusNextTab: function(a, b) {
            return a = this._findNextTab(a, b), this.tabs.eq(a).focus(), a
        },
        _setOption: function(a, b) {
            return "active" === a ? void this._activate(b) : "disabled" === a ? void this._setupDisabled(b) : (this._super(a, b), "collapsible" === a && (this.element.toggleClass("ui-tabs-collapsible", b), b || this.options.active !== !1 || this._activate(0)), "event" === a && this._setupEvents(b), void("heightStyle" === a && this._setupHeightStyle(b)))
        },
        _sanitizeSelector: function(a) {
            return a ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function() {
            var b = this.options,
                c = this.tablist.children(":has(a[href])");
            b.disabled = a.map(c.filter(".ui-state-disabled"), function(a) {
                return c.index(a)
            }), this._processTabs(), b.active !== !1 && this.anchors.length ? this.active.length && !a.contains(this.tablist[0], this.active[0]) ? this.tabs.length === b.disabled.length ? (b.active = !1, this.active = a()) : this._activate(this._findNextTab(Math.max(0, b.active - 1), !1)) : b.active = this.tabs.index(this.active) : (b.active = !1, this.active = a()), this._refresh()
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-hidden": "true"
            }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var b = this,
                c = this.tabs,
                d = this.anchors,
                e = this.panels;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function(b) {
                a(this).is(".ui-state-disabled") && b.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                a(this).closest("li").is(".ui-state-disabled") && this.blur()
            }), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function() {
                return a("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = a(), this.anchors.each(function(c, d) {
                var e, f, g, h = a(d).uniqueId().attr("id"),
                    i = a(d).closest("li"),
                    j = i.attr("aria-controls");
                b._isLocal(d) ? (e = d.hash, g = e.substring(1), f = b.element.find(b._sanitizeSelector(e))) : (g = i.attr("aria-controls") || a({}).uniqueId()[0].id, e = "#" + g, f = b.element.find(e), f.length || (f = b._createPanel(g), f.insertAfter(b.panels[c - 1] || b.tablist)), f.attr("aria-live", "polite")), f.length && (b.panels = b.panels.add(f)), j && i.data("ui-tabs-aria-controls", j), i.attr({
                    "aria-controls": g,
                    "aria-labelledby": h
                }), f.attr("aria-labelledby", h)
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), c && (this._off(c.not(this.tabs)), this._off(d.not(this.anchors)), this._off(e.not(this.panels)))
        },
        _getList: function() {
            return this.tablist || this.element.find("ol,ul").eq(0)
        },
        _createPanel: function(b) {
            return a("<div>").attr("id", b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function(b) {
            a.isArray(b) && (b.length ? b.length === this.anchors.length && (b = !0) : b = !1);
            for (var c, d = 0; c = this.tabs[d]; d++) b === !0 || -1 !== a.inArray(d, b) ? a(c).addClass("ui-state-disabled").attr("aria-disabled", "true") : a(c).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = b
        },
        _setupEvents: function(b) {
            var c = {};
            b && a.each(b.split(" "), function(a, b) {
                c[b] = "_eventHandler"
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                click: function(a) {
                    a.preventDefault()
                }
            }), this._on(this.anchors, c), this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(b) {
            var c, d = this.element.parent();
            "fill" === b ? (c = d.height(), c -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                var b = a(this),
                    d = b.css("position");
                "absolute" !== d && "fixed" !== d && (c -= b.outerHeight(!0))
            }), this.element.children().not(this.panels).each(function() {
                c -= a(this).outerHeight(!0)
            }), this.panels.each(function() {
                a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
            }).css("overflow", "auto")) : "auto" === b && (c = 0, this.panels.each(function() {
                c = Math.max(c, a(this).height("").height())
            }).height(c))
        },
        _eventHandler: function(b) {
            var c = this.options,
                d = this.active,
                e = a(b.currentTarget),
                f = e.closest("li"),
                g = f[0] === d[0],
                h = g && c.collapsible,
                i = h ? a() : this._getPanelForTab(f),
                j = d.length ? this._getPanelForTab(d) : a(),
                k = {
                    oldTab: d,
                    oldPanel: j,
                    newTab: h ? a() : f,
                    newPanel: i
                };
            b.preventDefault(), f.hasClass("ui-state-disabled") || f.hasClass("ui-tabs-loading") || this.running || g && !c.collapsible || this._trigger("beforeActivate", b, k) === !1 || (c.active = h ? !1 : this.tabs.index(f), this.active = g ? a() : f, this.xhr && this.xhr.abort(), j.length || i.length || a.error("jQuery UI Tabs: Mismatching fragment identifier."), i.length && this.load(this.tabs.index(f), b), this._toggle(b, k))
        },
        _toggle: function(b, c) {
            function d() {
                f.running = !1, f._trigger("activate", b, c)
            }

            function e() {
                c.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), g.length && f.options.show ? f._show(g, f.options.show, d) : (g.show(), d())
            }
            var f = this,
                g = c.newPanel,
                h = c.oldPanel;
            this.running = !0, h.length && this.options.hide ? this._hide(h, this.options.hide, function() {
                c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), e()
            }) : (c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), h.hide(), e()), h.attr("aria-hidden", "true"), c.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }), g.length && h.length ? c.oldTab.attr("tabIndex", -1) : g.length && this.tabs.filter(function() {
                return 0 === a(this).attr("tabIndex")
            }).attr("tabIndex", -1), g.attr("aria-hidden", "false"), c.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _activate: function(b) {
            var c, d = this._findActive(b);
            d[0] !== this.active[0] && (d.length || (d = this.active), c = d.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: c,
                currentTarget: c,
                preventDefault: a.noop
            }))
        },
        _findActive: function(b) {
            return b === !1 ? a() : this.tabs.eq(b)
        },
        _getIndex: function(a) {
            return "string" == typeof a && (a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))), a
        },
        _destroy: function() {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function() {
                a.data(this, "ui-tabs-destroy") ? a(this).remove() : a(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }), this.tabs.each(function() {
                var b = a(this),
                    c = b.data("ui-tabs-aria-controls");
                c ? b.attr("aria-controls", c).removeData("ui-tabs-aria-controls") : b.removeAttr("aria-controls")
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(b) {
            var c = this.options.disabled;
            c !== !1 && (void 0 === b ? c = !1 : (b = this._getIndex(b), c = a.isArray(c) ? a.map(c, function(a) {
                return a !== b ? a : null
            }) : a.map(this.tabs, function(a, c) {
                return c !== b ? c : null
            })), this._setupDisabled(c))
        },
        disable: function(b) {
            var c = this.options.disabled;
            if (c !== !0) {
                if (void 0 === b) c = !0;
                else {
                    if (b = this._getIndex(b), -1 !== a.inArray(b, c)) return;
                    c = a.isArray(c) ? a.merge([b], c).sort() : [b]
                }
                this._setupDisabled(c)
            }
        },
        load: function(b, c) {
            b = this._getIndex(b);
            var d = this,
                e = this.tabs.eq(b),
                f = e.find(".ui-tabs-anchor"),
                g = this._getPanelForTab(e),
                h = {
                    tab: e,
                    panel: g
                },
                i = function(a, b) {
                    "abort" === b && d.panels.stop(!1, !0), e.removeClass("ui-tabs-loading"), g.removeAttr("aria-busy"), a === d.xhr && delete d.xhr
                };
            this._isLocal(f[0]) || (this.xhr = a.ajax(this._ajaxSettings(f, c, h)), this.xhr && "canceled" !== this.xhr.statusText && (e.addClass("ui-tabs-loading"), g.attr("aria-busy", "true"), this.xhr.done(function(a, b, e) {
                setTimeout(function() {
                    g.html(a), d._trigger("load", c, h), i(e, b)
                }, 1)
            }).fail(function(a, b) {
                setTimeout(function() {
                    i(a, b)
                }, 1)
            })))
        },
        _ajaxSettings: function(b, c, d) {
            var e = this;
            return {
                url: b.attr("href"),
                beforeSend: function(b, f) {
                    return e._trigger("beforeLoad", c, a.extend({
                        jqXHR: b,
                        ajaxSettings: f
                    }, d))
                }
            }
        },
        _getPanelForTab: function(b) {
            var c = a(b).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + c))
        }
    })
});;
/*!
 * jQuery UI Effects 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    var b = "ui-effects-",
        c = a;
    /*!
     * jQuery Color Animations v2.1.2
     * https://github.com/jquery/jquery-color
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * Date: Wed Jan 16 08:47:09 2013 -0600
     */
    return a.effects = {
        effect: {}
    },
        function(a, b) {
            function c(a, b, c) {
                var d = l[b.type] || {};
                return null == a ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : d.max < a ? d.max : a)
            }

            function d(b) {
                var c = j(),
                    d = c._rgba = [];
                return b = b.toLowerCase(), o(i, function(a, e) {
                    var f, g = e.re.exec(b),
                        h = g && e.parse(g),
                        i = e.space || "rgba";
                    return h ? (f = c[i](h), c[k[i].cache] = f[k[i].cache], d = c._rgba = f._rgba, !1) : void 0
                }), d.length ? ("0,0,0,0" === d.join() && a.extend(d, f.transparent), c) : f[b]
            }

            function e(a, b, c) {
                return c = (c + 1) % 1, 1 > 6 * c ? a + (b - a) * c * 6 : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
            }
            var f, g = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                h = /^([\-+])=\s*(\d+\.?\d*)/,
                i = [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(a) {
                        return [a[1], a[2], a[3], a[4]]
                    }
                }, {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(a) {
                        return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
                    }
                }, {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function(a) {
                        return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
                    }
                }, {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function(a) {
                        return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
                    }
                }, {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function(a) {
                        return [a[1], a[2] / 100, a[3] / 100, a[4]]
                    }
                }],
                j = a.Color = function(b, c, d, e) {
                    return new a.Color.fn.parse(b, c, d, e)
                },
                k = {
                    rgba: {
                        props: {
                            red: {
                                idx: 0,
                                type: "byte"
                            },
                            green: {
                                idx: 1,
                                type: "byte"
                            },
                            blue: {
                                idx: 2,
                                type: "byte"
                            }
                        }
                    },
                    hsla: {
                        props: {
                            hue: {
                                idx: 0,
                                type: "degrees"
                            },
                            saturation: {
                                idx: 1,
                                type: "percent"
                            },
                            lightness: {
                                idx: 2,
                                type: "percent"
                            }
                        }
                    }
                },
                l = {
                    "byte": {
                        floor: !0,
                        max: 255
                    },
                    percent: {
                        max: 1
                    },
                    degrees: {
                        mod: 360,
                        floor: !0
                    }
                },
                m = j.support = {},
                n = a("<p>")[0],
                o = a.each;
            n.style.cssText = "background-color:rgba(1,1,1,.5)", m.rgba = n.style.backgroundColor.indexOf("rgba") > -1, o(k, function(a, b) {
                b.cache = "_" + a, b.props.alpha = {
                    idx: 3,
                    type: "percent",
                    def: 1
                }
            }), j.fn = a.extend(j.prototype, {
                parse: function(e, g, h, i) {
                    if (e === b) return this._rgba = [null, null, null, null], this;
                    (e.jquery || e.nodeType) && (e = a(e).css(g), g = b);
                    var l = this,
                        m = a.type(e),
                        n = this._rgba = [];
                    return g !== b && (e = [e, g, h, i], m = "array"), "string" === m ? this.parse(d(e) || f._default) : "array" === m ? (o(k.rgba.props, function(a, b) {
                        n[b.idx] = c(e[b.idx], b)
                    }), this) : "object" === m ? (e instanceof j ? o(k, function(a, b) {
                        e[b.cache] && (l[b.cache] = e[b.cache].slice())
                    }) : o(k, function(b, d) {
                        var f = d.cache;
                        o(d.props, function(a, b) {
                            if (!l[f] && d.to) {
                                if ("alpha" === a || null == e[a]) return;
                                l[f] = d.to(l._rgba)
                            }
                            l[f][b.idx] = c(e[a], b, !0)
                        }), l[f] && a.inArray(null, l[f].slice(0, 3)) < 0 && (l[f][3] = 1, d.from && (l._rgba = d.from(l[f])))
                    }), this) : void 0
                },
                is: function(a) {
                    var b = j(a),
                        c = !0,
                        d = this;
                    return o(k, function(a, e) {
                        var f, g = b[e.cache];
                        return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], o(e.props, function(a, b) {
                            return null != g[b.idx] ? c = g[b.idx] === f[b.idx] : void 0
                        })), c
                    }), c
                },
                _space: function() {
                    var a = [],
                        b = this;
                    return o(k, function(c, d) {
                        b[d.cache] && a.push(c)
                    }), a.pop()
                },
                transition: function(a, b) {
                    var d = j(a),
                        e = d._space(),
                        f = k[e],
                        g = 0 === this.alpha() ? j("transparent") : this,
                        h = g[f.cache] || f.to(g._rgba),
                        i = h.slice();
                    return d = d[f.cache], o(f.props, function(a, e) {
                        var f = e.idx,
                            g = h[f],
                            j = d[f],
                            k = l[e.type] || {};
                        null !== j && (null === g ? i[f] = j : (k.mod && (j - g > k.mod / 2 ? g += k.mod : g - j > k.mod / 2 && (g -= k.mod)), i[f] = c((j - g) * b + g, e)))
                    }), this[e](i)
                },
                blend: function(b) {
                    if (1 === this._rgba[3]) return this;
                    var c = this._rgba.slice(),
                        d = c.pop(),
                        e = j(b)._rgba;
                    return j(a.map(c, function(a, b) {
                        return (1 - d) * e[b] + d * a
                    }))
                },
                toRgbaString: function() {
                    var b = "rgba(",
                        c = a.map(this._rgba, function(a, b) {
                            return null == a ? b > 2 ? 1 : 0 : a
                        });
                    return 1 === c[3] && (c.pop(), b = "rgb("), b + c.join() + ")"
                },
                toHslaString: function() {
                    var b = "hsla(",
                        c = a.map(this.hsla(), function(a, b) {
                            return null == a && (a = b > 2 ? 1 : 0), b && 3 > b && (a = Math.round(100 * a) + "%"), a
                        });
                    return 1 === c[3] && (c.pop(), b = "hsl("), b + c.join() + ")"
                },
                toHexString: function(b) {
                    var c = this._rgba.slice(),
                        d = c.pop();
                    return b && c.push(~~(255 * d)), "#" + a.map(c, function(a) {
                        return a = (a || 0).toString(16), 1 === a.length ? "0" + a : a
                    }).join("")
                },
                toString: function() {
                    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                }
            }), j.fn.parse.prototype = j.fn, k.hsla.to = function(a) {
                if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
                var b, c, d = a[0] / 255,
                    e = a[1] / 255,
                    f = a[2] / 255,
                    g = a[3],
                    h = Math.max(d, e, f),
                    i = Math.min(d, e, f),
                    j = h - i,
                    k = h + i,
                    l = .5 * k;
                return b = i === h ? 0 : d === h ? 60 * (e - f) / j + 360 : e === h ? 60 * (f - d) / j + 120 : 60 * (d - e) / j + 240, c = 0 === j ? 0 : .5 >= l ? j / k : j / (2 - k), [Math.round(b) % 360, c, l, null == g ? 1 : g]
            }, k.hsla.from = function(a) {
                if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
                var b = a[0] / 360,
                    c = a[1],
                    d = a[2],
                    f = a[3],
                    g = .5 >= d ? d * (1 + c) : d + c - d * c,
                    h = 2 * d - g;
                return [Math.round(255 * e(h, g, b + 1 / 3)), Math.round(255 * e(h, g, b)), Math.round(255 * e(h, g, b - 1 / 3)), f]
            }, o(k, function(d, e) {
                var f = e.props,
                    g = e.cache,
                    i = e.to,
                    k = e.from;
                j.fn[d] = function(d) {
                    if (i && !this[g] && (this[g] = i(this._rgba)), d === b) return this[g].slice();
                    var e, h = a.type(d),
                        l = "array" === h || "object" === h ? d : arguments,
                        m = this[g].slice();
                    return o(f, function(a, b) {
                        var d = l["object" === h ? a : b.idx];
                        null == d && (d = m[b.idx]), m[b.idx] = c(d, b)
                    }), k ? (e = j(k(m)), e[g] = m, e) : j(m)
                }, o(f, function(b, c) {
                    j.fn[b] || (j.fn[b] = function(e) {
                        var f, g = a.type(e),
                            i = "alpha" === b ? this._hsla ? "hsla" : "rgba" : d,
                            j = this[i](),
                            k = j[c.idx];
                        return "undefined" === g ? k : ("function" === g && (e = e.call(this, k), g = a.type(e)), null == e && c.empty ? this : ("string" === g && (f = h.exec(e), f && (e = k + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), j[c.idx] = e, this[i](j)))
                    })
                })
            }), j.hook = function(b) {
                var c = b.split(" ");
                o(c, function(b, c) {
                    a.cssHooks[c] = {
                        set: function(b, e) {
                            var f, g, h = "";
                            if ("transparent" !== e && ("string" !== a.type(e) || (f = d(e)))) {
                                if (e = j(f || e), !m.rgba && 1 !== e._rgba[3]) {
                                    for (g = "backgroundColor" === c ? b.parentNode : b;
                                         ("" === h || "transparent" === h) && g && g.style;) try {
                                        h = a.css(g, "backgroundColor"), g = g.parentNode
                                    } catch (i) {}
                                    e = e.blend(h && "transparent" !== h ? h : "_default")
                                }
                                e = e.toRgbaString()
                            }
                            try {
                                b.style[c] = e
                            } catch (i) {}
                        }
                    }, a.fx.step[c] = function(b) {
                        b.colorInit || (b.start = j(b.elem, c), b.end = j(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos))
                    }
                })
            }, j.hook(g), a.cssHooks.borderColor = {
                expand: function(a) {
                    var b = {};
                    return o(["Top", "Right", "Bottom", "Left"], function(c, d) {
                        b["border" + d + "Color"] = a
                    }), b
                }
            }, f = a.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [null, null, null, 0],
                _default: "#ffffff"
            }
        }(c),
        function() {
            function b(b) {
                var c, d, e = b.ownerDocument.defaultView ? b.ownerDocument.defaultView.getComputedStyle(b, null) : b.currentStyle,
                    f = {};
                if (e && e.length && e[0] && e[e[0]])
                    for (d = e.length; d--;) c = e[d], "string" == typeof e[c] && (f[a.camelCase(c)] = e[c]);
                else
                    for (c in e) "string" == typeof e[c] && (f[c] = e[c]);
                return f
            }

            function d(b, c) {
                var d, e, g = {};
                for (d in c) e = c[d], b[d] !== e && (f[d] || (a.fx.step[d] || !isNaN(parseFloat(e))) && (g[d] = e));
                return g
            }
            var e = ["add", "remove", "toggle"],
                f = {
                    border: 1,
                    borderBottom: 1,
                    borderColor: 1,
                    borderLeft: 1,
                    borderRight: 1,
                    borderTop: 1,
                    borderWidth: 1,
                    margin: 1,
                    padding: 1
                };
            a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(b, d) {
                a.fx.step[d] = function(a) {
                    ("none" !== a.end && !a.setAttr || 1 === a.pos && !a.setAttr) && (c.style(a.elem, d, a.end), a.setAttr = !0)
                }
            }), a.fn.addBack || (a.fn.addBack = function(a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
            }), a.effects.animateClass = function(c, f, g, h) {
                var i = a.speed(f, g, h);
                return this.queue(function() {
                    var f, g = a(this),
                        h = g.attr("class") || "",
                        j = i.children ? g.find("*").addBack() : g;
                    j = j.map(function() {
                        var c = a(this);
                        return {
                            el: c,
                            start: b(this)
                        }
                    }), f = function() {
                        a.each(e, function(a, b) {
                            c[b] && g[b + "Class"](c[b])
                        })
                    }, f(), j = j.map(function() {
                        return this.end = b(this.el[0]), this.diff = d(this.start, this.end), this
                    }), g.attr("class", h), j = j.map(function() {
                        var b = this,
                            c = a.Deferred(),
                            d = a.extend({}, i, {
                                queue: !1,
                                complete: function() {
                                    c.resolve(b)
                                }
                            });
                        return this.el.animate(this.diff, d), c.promise()
                    }), a.when.apply(a, j.get()).done(function() {
                        f(), a.each(arguments, function() {
                            var b = this.el;
                            a.each(this.diff, function(a) {
                                b.css(a, "")
                            })
                        }), i.complete.call(g[0])
                    })
                })
            }, a.fn.extend({
                addClass: function(b) {
                    return function(c, d, e, f) {
                        return d ? a.effects.animateClass.call(this, {
                            add: c
                        }, d, e, f) : b.apply(this, arguments)
                    }
                }(a.fn.addClass),
                removeClass: function(b) {
                    return function(c, d, e, f) {
                        return arguments.length > 1 ? a.effects.animateClass.call(this, {
                            remove: c
                        }, d, e, f) : b.apply(this, arguments)
                    }
                }(a.fn.removeClass),
                toggleClass: function(b) {
                    return function(c, d, e, f, g) {
                        return "boolean" == typeof d || void 0 === d ? e ? a.effects.animateClass.call(this, d ? {
                            add: c
                        } : {
                            remove: c
                        }, e, f, g) : b.apply(this, arguments) : a.effects.animateClass.call(this, {
                            toggle: c
                        }, d, e, f)
                    }
                }(a.fn.toggleClass),
                switchClass: function(b, c, d, e, f) {
                    return a.effects.animateClass.call(this, {
                        add: c,
                        remove: b
                    }, d, e, f)
                }
            })
        }(),
        function() {
            function c(b, c, d, e) {
                return a.isPlainObject(b) && (c = b, b = b.effect), b = {
                    effect: b
                }, null == c && (c = {}), a.isFunction(c) && (e = c, d = null, c = {}), ("number" == typeof c || a.fx.speeds[c]) && (e = d, d = c, c = {}), a.isFunction(d) && (e = d, d = null), c && a.extend(b, c), d = d || c.duration, b.duration = a.fx.off ? 0 : "number" == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, b.complete = e || c.complete, b
            }

            function d(b) {
                return !b || "number" == typeof b || a.fx.speeds[b] ? !0 : "string" != typeof b || a.effects.effect[b] ? a.isFunction(b) ? !0 : "object" != typeof b || b.effect ? !1 : !0 : !0
            }
            a.extend(a.effects, {
                version: "1.11.4",
                save: function(a, c) {
                    for (var d = 0; d < c.length; d++) null !== c[d] && a.data(b + c[d], a[0].style[c[d]])
                },
                restore: function(a, c) {
                    var d, e;
                    for (e = 0; e < c.length; e++) null !== c[e] && (d = a.data(b + c[e]), void 0 === d && (d = ""), a.css(c[e], d))
                },
                setMode: function(a, b) {
                    return "toggle" === b && (b = a.is(":hidden") ? "show" : "hide"), b
                },
                getBaseline: function(a, b) {
                    var c, d;
                    switch (a[0]) {
                        case "top":
                            c = 0;
                            break;
                        case "middle":
                            c = .5;
                            break;
                        case "bottom":
                            c = 1;
                            break;
                        default:
                            c = a[0] / b.height
                    }
                    switch (a[1]) {
                        case "left":
                            d = 0;
                            break;
                        case "center":
                            d = .5;
                            break;
                        case "right":
                            d = 1;
                            break;
                        default:
                            d = a[1] / b.width
                    }
                    return {
                        x: d,
                        y: c
                    }
                },
                createWrapper: function(b) {
                    if (b.parent().is(".ui-effects-wrapper")) return b.parent();
                    var c = {
                            width: b.outerWidth(!0),
                            height: b.outerHeight(!0),
                            "float": b.css("float")
                        },
                        d = a("<div></div>").addClass("ui-effects-wrapper").css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0
                        }),
                        e = {
                            width: b.width(),
                            height: b.height()
                        },
                        f = document.activeElement;
                    try {
                        f.id
                    } catch (g) {
                        f = document.body
                    }
                    return b.wrap(d), (b[0] === f || a.contains(b[0], f)) && a(f).focus(), d = b.parent(), "static" === b.css("position") ? (d.css({
                        position: "relative"
                    }), b.css({
                        position: "relative"
                    })) : (a.extend(c, {
                        position: b.css("position"),
                        zIndex: b.css("z-index")
                    }), a.each(["top", "left", "bottom", "right"], function(a, d) {
                        c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
                    }), b.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })), b.css(e), d.css(c).show()
                },
                removeWrapper: function(b) {
                    var c = document.activeElement;
                    return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).focus()), b
                },
                setTransition: function(b, c, d, e) {
                    return e = e || {}, a.each(c, function(a, c) {
                        var f = b.cssUnit(c);
                        f[0] > 0 && (e[c] = f[0] * d + f[1])
                    }), e
                }
            }), a.fn.extend({
                effect: function() {
                    function b(b) {
                        function c() {
                            a.isFunction(f) && f.call(e[0]), a.isFunction(b) && b()
                        }
                        var e = a(this),
                            f = d.complete,
                            h = d.mode;
                        (e.is(":hidden") ? "hide" === h : "show" === h) ? (e[h](), c()) : g.call(e[0], d, c)
                    }
                    var d = c.apply(this, arguments),
                        e = d.mode,
                        f = d.queue,
                        g = a.effects.effect[d.effect];
                    return a.fx.off || !g ? e ? this[e](d.duration, d.complete) : this.each(function() {
                        d.complete && d.complete.call(this)
                    }) : f === !1 ? this.each(b) : this.queue(f || "fx", b)
                },
                show: function(a) {
                    return function(b) {
                        if (d(b)) return a.apply(this, arguments);
                        var e = c.apply(this, arguments);
                        return e.mode = "show", this.effect.call(this, e)
                    }
                }(a.fn.show),
                hide: function(a) {
                    return function(b) {
                        if (d(b)) return a.apply(this, arguments);
                        var e = c.apply(this, arguments);
                        return e.mode = "hide", this.effect.call(this, e)
                    }
                }(a.fn.hide),
                toggle: function(a) {
                    return function(b) {
                        if (d(b) || "boolean" == typeof b) return a.apply(this, arguments);
                        var e = c.apply(this, arguments);
                        return e.mode = "toggle", this.effect.call(this, e)
                    }
                }(a.fn.toggle),
                cssUnit: function(b) {
                    var c = this.css(b),
                        d = [];
                    return a.each(["em", "px", "%", "pt"], function(a, b) {
                        c.indexOf(b) > 0 && (d = [parseFloat(c), b])
                    }), d
                }
            })
        }(),
        function() {
            var b = {};
            a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(a, c) {
                b[c] = function(b) {
                    return Math.pow(b, a + 2)
                }
            }), a.extend(b, {
                Sine: function(a) {
                    return 1 - Math.cos(a * Math.PI / 2)
                },
                Circ: function(a) {
                    return 1 - Math.sqrt(1 - a * a)
                },
                Elastic: function(a) {
                    return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15)
                },
                Back: function(a) {
                    return a * a * (3 * a - 2)
                },
                Bounce: function(a) {
                    for (var b, c = 4; a < ((b = Math.pow(2, --c)) - 1) / 11;);
                    return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2)
                }
            }), a.each(b, function(b, c) {
                a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function(a) {
                    return 1 - c(1 - a)
                }, a.easing["easeInOut" + b] = function(a) {
                    return .5 > a ? c(2 * a) / 2 : 1 - c(-2 * a + 2) / 2
                }
            })
        }(), a.effects
});;
(function(jQuery) {
    "use strict";
    /*jslint browser: true, unparam: true, regexp: true, node: true*/
    /*global $, jQuery, alert, google, no_ajax_pages*/
    var $page_loader = jQuery('.page-loader'),
        ajax_url = jQuery('#ajax_url').val(),
        transition, $exclude_links;
    NProgress.configure({
        trickleRate: 0.05,
        trickleSpeed: 1000
    });
    /************************************
     RESIZE GALLERY SLIDER VIDEO
     ************************************/
    function resize_gallery_video() {
        if (jQuery(window).width() < 769) {
            jQuery('iframe.gallery').each(function() {
                jQuery(this).width(jQuery('#gallery-container-wrap').width());
            });
        } else {
            jQuery('iframe.gallery').each(function() {
                jQuery(this).width((jQuery(this).height() * 1.77));
            });
        }
    }
    /************************************
     Menu Link animation - Revised in V4.3
     ************************************/
    function be_menu_link_animation() {
        var delay_time = 500,
            index = 0,
            slidebar_menu = document.getElementById("slidebar-menu").children,
            child_count = slidebar_menu.length;
        for (index; index < child_count; index++) {
            jQuery(slidebar_menu[index]).delay(delay_time).addClass("menu-loaded", 200);
            delay_time += 100;
        }
    }
    /************************************
     Update Custom Scroll Bar
     ************************************/
    function be_custom_scrollbar() {
        if (jQuery('.gallery_content_area').length > 0) {
            //     if (jQuery('.gallery_content_area').hasClass('mCustomScrollbar')) {
            //         jQuery(".gallery_content_area").mCustomScrollbar('update');
            //     } else {
            jQuery(".gallery_content_area").mCustomScrollbar({
                autoHideScrollbar: true
            });
            //   }
        }
    }

    /************************************
     RESIZE GALLERY SLIDER VIDEO - Revised in V4.3
     ************************************/

    function single_page_nav() {
        var body_content = jQuery('body'),
            append_section = '',
            specific_section = jQuery('.be-section'),
            section_length = specific_section.length,
            section_id,
            section_title,
            index = 0;
        if (jQuery('.single-page-nav-wrap')) {
            body_content.find('.single-page-nav-wrap').remove();
        }
        if (body_content.hasClass('single-page-version')) {
            if (jQuery('#hero-section').length > 0) {
                append_section = '<a class="single-page-nav-link back-to-top" href="#"><span>Home</span></a>';
            }
            for (index; index < section_length; index++) {
                section_id = specific_section.eq(index).attr('id');
                section_title = specific_section.eq(index).attr('data-title');
                if (section_id) {
                    if (section_title) {
                        section_title = "<span>" + section_title + "</span>";
                    } else {
                        section_title = '';
                    }
                    append_section += '<a class="single-page-nav-link" href="#' + section_id + '">' + section_title + '</a>';
                }
            }
        }
        body_content.append('<div class="single-page-nav-wrap clearfix"><div class="single-page-nav-wrap-inner clearfix"><div class="sinle-page-nav-links">' + append_section + '</div></div></div>');
    }

    function munu_item_update() {
        var body_content = jQuery('body'),
            header_height = jQuery('#wpadminbar').height() + 1,
            main_menu_items = jQuery('li.menu-item'),
            single_page_nav_dots = jQuery('.single-page-nav-link'), //Should add context after converting single-page-nav-wrap and single-page-nav-links to ID
            total_sections = jQuery('.be-section'),
            section_count = total_sections.length,
            window_height = jQuery(window),
            header_bottom_bar = jQuery('#header-bottom-bar'),
            index = 0;
        if (body_content.hasClass('top-header')) {
            header_height += Number(jQuery('#header-wrap').attr('data-default-height'));
            if (header_bottom_bar.length > 0) {
                header_height += header_bottom_bar.height();
            }
        }
        if (body_content.hasClass('single-page-version')) {
            main_menu_items.removeClass('current-menu-item');
            for (index; index < section_count; index++) {
                var current_object = total_sections.eq(index),
                    current_object_id = current_object.attr('id');
                if (window_height.scrollTop() + header_height >= current_object.offset().top) {
                    main_menu_items.removeClass('current-menu-item current-section');
                    single_page_nav_dots.removeClass('current-section-nav-link');
                    if (current_object_id) {
                        main_menu_items.find('a[href$="#' + current_object_id + '"]').closest('li.menu-item').addClass('current-menu-item current-section');
                        single_page_nav_dots.filter('a[href$="#' + current_object_id + '"]').addClass('current-section-nav-link');
                    }
                }
            }
        }
    }
    /************************************
     SECTION BACKGROUND VIDEO
     ************************************/
    function be_resize_background_video() {
        jQuery('.be-section .be-bg-video, .be-slider-video .be-bg-video').each(function() {
            var $img = jQuery(this),
                $section = $img.parent(),
                windowWidth = $section.width(),
                windowHeight = $section.outerHeight(),
                r_w = windowHeight / windowWidth,
                i_w = $img.width(),
                i_h = $img.height(),
                r_i = i_h / i_w,
                new_w, new_h;
            if (r_w > r_i) {
                new_h = windowHeight;
                new_w = windowHeight / r_i;
            } else {
                new_h = windowWidth * r_i;
                new_w = windowWidth;
            }
            $img.css({
                width: new_w,
                height: new_h,
                left: (windowWidth - new_w) / 2,
                top: (windowHeight - new_h) / 2,
                display: 'block'
            });
        });
    }
    /************************************
     Close Custom Popups
     ************************************/
    function be_close_sidebar() {
        var $body = jQuery('body');
        if ($body.hasClass('top-overlay-menu') || $body.hasClass('left-overlay-menu')) {
            if ($body.hasClass('be-themes-layout-layout-border-header-top')) {
                be_close_slidebarmenu();
            }
            jQuery('.layout-box-container').fadeIn();
            jQuery('#slidebar-menu li').removeClass('menu-loaded');
        } else {
            be_close_slidebarmenu();
        }
        jQuery('.sb-slidebar').removeClass('opened');
        jQuery('body,html').removeClass('slider-bar-opened');
    }

    function be_close_slidebarmenu() {
        var $body = jQuery('body'),
            $be_sidebar_mobile_menu = jQuery('.sliderbar-menu-controller').find('.be-mobile-menu-icon'),
            $main = jQuery('#main');

        if ($body.hasClass('slider-bar-opened') && $body.hasClass('top-header')) {
            $be_sidebar_mobile_menu.toggleClass('is-clicked');
        }
    }

    function be_open_leftstrip() {
        jQuery('.left-strip-wrapper').removeClass('hide');
        jQuery('html').removeClass('hide-overflow');
    }

    function be_close_mobilemenu() {
        if (jQuery('.mobile-menu').is(":visible")) {
            jQuery('.mobile-menu').slideFadeToggle();
            jQuery('.mobile-nav-controller .be-mobile-menu-icon').toggleClass('is-clicked');
        }
    }

    function be_close_searchbox() {
        if (jQuery('.search-box-wrapper').is(":visible")) {
            jQuery('.search-box-wrapper').fadeOut();
            jQuery('html').toggleClass('hide-overflow');
        }
    }
    /************************************
     ANIMATE SCROLL
     ************************************/
    function be_animate_scroll(element) {
        if (jQuery('body').hasClass('section-scroll') && (jQuery(window).width() > 1024) && jQuery('html').hasClass('csstransforms')) {
            jQuery.fn.translate(element);
            return false;
        }
        var $scroll_to = 1,
            $sticky_offset;
        if (element.length > 0) {
            $scroll_to = Number(element.offset().top) - Number(jQuery('#wpadminbar').height());
        }
        if (jQuery(window).width() > 960 && !((jQuery('body').hasClass('page-template-page-splitscreen-left')) || (jQuery('body').hasClass('page-template-page-splitscreen-right')))) {
            if (jQuery('body').hasClass('sticky-header') || jQuery('body').hasClass('transparent-sticky')) {
                if (jQuery('body').hasClass('sticky-header')) {
                    $sticky_offset = (jQuery('#header').offset().top + Number(jQuery('#header-wrap').attr('data-default-height')) + Number(jQuery('#header-top-bar-wrap').innerHeight()) + Number(jQuery('#header-bottom-bar').innerHeight()));
                }
                if (jQuery('body').hasClass('transparent-sticky')) {
                    if (jQuery('.header-hero-section').length > 0) {
                        $sticky_offset = ((Number(jQuery('.header-hero-section').offset().top) + Number(jQuery('.header-hero-section').height())) - (Number(jQuery('#wpadminbar').innerHeight())));
                    } else {
                        $sticky_offset = Number((jQuery('#page-content div').children('.be-section:nth-child(1)')).offset().top) + Number((jQuery('#page-content div').children('.be-section:nth-child(1)')).height()) - (Number(jQuery('#wpadminbar').innerHeight()));
                    }
                }
                if (jQuery('#main').hasClass('layout-border-header-top')) {
                    $scroll_to = $scroll_to - (Number(jQuery('#header-wrap').attr('data-default-height')) + Number(jQuery('#header-bottom-bar').innerHeight()));
                } else {
                    if ($scroll_to > $sticky_offset) {
                        $scroll_to = $scroll_to - (Number(jQuery('#header-wrap').attr('data-sticky-height')) + Number(jQuery('#header-bottom-bar').innerHeight()));
                    }
                    if ($scroll_to < $sticky_offset) {
                        $scroll_to = $scroll_to - (Number(jQuery('#header-wrap').attr('data-default-height')) + Number(jQuery('#header-bottom-bar').innerHeight()));
                    }
                    if ($scroll_to === $sticky_offset && jQuery('body').hasClass('transparent-sticky')) {
                        $scroll_to = $scroll_to - (Number(jQuery('#header-wrap').attr('data-sticky-height')) + Number(jQuery('#header-bottom-bar').innerHeight()));
                    }
                }
            } else {
                if (jQuery('#main').hasClass('layout-border-header-top')) {
                    $scroll_to = $scroll_to - Number(jQuery('#header-inner-wrap').innerHeight());
                }
            }
        }
        jQuery('body, html').animate({
            scrollTop: $scroll_to
        }, 1000, 'easeOutQuart', function() {
            be_close_sidebar();
            // be_close_slidebarmenu();
            be_open_leftstrip();
            // be_hide_close_overlay();
            munu_item_update();
        });
    }
    /************************************
     STICKY SIDEBAR
     ************************************/
    function be_sticky_sidebar() {
        var $window = jQuery(window),
            $sidebar = jQuery(".floting-sidebar"),
            offset = jQuery('#content-wrap').offset(),
            $scrollHeight = jQuery("#page-content").height(),
            $scrollOffset = jQuery("#page-content").offset(),
            $headerHeight = 0;
        if (jQuery(".floting-sidebar").length > 0) {
            if (jQuery('body').hasClass('sticky-header') || jQuery('body').hasClass('transparent-sticky')) {
                $headerHeight = Number(jQuery('#header-inner-wrap').innerHeight()) + Number(jQuery('#wpadminbar').innerHeight());
            } else {
                $headerHeight = Number(jQuery('#wpadminbar').innerHeight());
            }
            if ($window.width() > 960) {
                if (($window.scrollTop() + $headerHeight) > offset.top) {
                    if ($window.scrollTop() + $headerHeight + $sidebar.height() + 50 < $scrollOffset.top + $scrollHeight) {
                        $sidebar.stop().animate({
                            marginTop: ($window.scrollTop() - offset.top) + $headerHeight + 30,
                            paddingTop: 30
                        });
                    } else {
                        $sidebar.stop().animate({
                            marginTop: ($scrollHeight - $sidebar.height() - 80) + 30,
                            paddingTop: 30
                        });
                    }
                } else {
                    $sidebar.stop().animate({
                        marginTop: 0,
                        paddingTop: 0
                    });
                }
            } else {
                $sidebar.css('margin-top', 0);
            }
        }
        if (jQuery(".fixed-sidebar").length > 0) {
            var $sidebarSelector = jQuery(".fixed-sidebar"),
                offset = jQuery('#content-wrap').offset(),
                $scrollHeight = jQuery("#page-content").height(),
                $scrollOffset = jQuery("#page-content").offset(),
                $scroll_top = $window.scrollTop(),
                $footerHeight = jQuery('#footer').outerHeight(),
                $widgetsHeight = jQuery('#bottom-widgets').outerHeight(),
                $sidebarHeight = $sidebarSelector.find('.fixed-sidebar-content .be-section').outerHeight(),
                $headerHeight = Number(jQuery('#header-inner-wrap').height()), // + Number(jQuery('#wpadminbar').height()),
                $heroSectionHeight = Number(jQuery('.hero-section-wrap').height()),
                $headerTopPadding = 0,
                $breakingPoint1 = 0,
                $breakingPoint2 = 0;

            // Sticky Default Header
            if (jQuery('body').hasClass('sticky-header') || jQuery('body').hasClass('transparent-sticky')) {
                $headerTopPadding = $headerHeight;
            }

            // Non Sticky Header
            if (jQuery('body').hasClass('header-transparent')) { //Transparent
                if ($heroSectionHeight > 0) { //With Hero Section
                    $breakingPoint1 = $heroSectionHeight;
                } else { //Without Hero Section
                    $breakingPoint1 = 1;
                }
            } else { //Non Transparent
                if ($heroSectionHeight > 0) { //With Hero Section
                    $breakingPoint1 = $heroSectionHeight + $headerHeight;
                } else { //Without Hero Section
                    $breakingPoint1 = $headerHeight;
                }
            }

            $breakingPoint2 = (jQuery(document).height()) - ($scroll_top + jQuery(window).height() + $footerHeight + $widgetsHeight);

            if ($window.width() > 960) {
                if ($scroll_top < $breakingPoint1) {
                    $sidebarSelector.removeClass('active-fixed').css('top', 0);
                    // $sidebarSelector.width('30%');
                    $sidebarSelector.width($sidebarSelector.parent().outerWidth() * 0.30);
                } else if ($breakingPoint2 <= 0) {
                    var $negative = ($breakingPoint2);
                    $sidebarSelector.addClass('active-fixed').removeClass('top-animate').css('top', $negative);
                    $sidebarSelector.width($sidebarSelector.parent().outerWidth() * 0.30);

                } else if (($scroll_top >= $breakingPoint1) && ($breakingPoint2 > 0)) {
                    $sidebarSelector.addClass('active-fixed  top-animate').css('top', $headerTopPadding);
                    $sidebarSelector.width($sidebarSelector.parent().outerWidth() * 0.30);
                }
                jQuery(".fixed-sidebar-content-inner").mCustomScrollbar('update');
            }
        }
    }

    function be_split_screen_template() {
        if ((jQuery(".page-template-page-splitscreen-left").length > 0) || (jQuery(".page-template-page-splitscreen-right").length > 0)) {
            var $heroSection = jQuery("#hero-section"),
                $window = jQuery(window),
                $scroll_top = $window.scrollTop(),
                $footerHeight = jQuery('#footer').outerHeight(),
                $widgetsHeight = jQuery('#bottom-widgets').outerHeight(),
                $headerHeight = Number(jQuery('#header-inner-wrap').height()),
                $headerTopPadding = 0,
                $headerTopPaddingonScroll = 0,
                $breakingPoint1 = 0,
                $breakingPoint2 = 0;

            // Non Sticky Header
            if (jQuery('body').hasClass('header-transparent')) { //Transparent
                $breakingPoint1 = 1;
                $headerTopPadding = 0;
            } else { //Non Transparent
                $breakingPoint1 = $headerHeight;
                $headerTopPadding = $headerHeight;
            }

            $breakingPoint2 = (jQuery(document).height()) - ($scroll_top + $window.height() + $footerHeight + $widgetsHeight);

            if ($window.width() > 960) {
                $heroSection.css('top', $headerTopPadding);
                if ($scroll_top < $breakingPoint1) {
                    $heroSection.css('top', $headerTopPadding - ($scroll_top));
                } else if ($breakingPoint2 <= 0) {
                    $heroSection.css('top', $breakingPoint2);
                } else if (($scroll_top >= $breakingPoint1) && ($breakingPoint2 > 0)) {
                    $heroSection.css('top', 0);
                }
            }
        }
    }


    /************************************
     DOCUMEnT READY EVENT
     ************************************/
    function do_ajax_complete() {

        var $page_template = jQuery('body').attr('data-be-page-template');

        jQuery('html').removeClass('section-scroll');
        jQuery('html').removeClass('show-overflow');
        jQuery('.component ul li:first-child').addClass('current');
        jQuery('input[placeholder], textarea[placeholder]').placeholder();
        if (jQuery('.hero-section-wrap, .full-screen-section').length > 0) {
            jQuery('.hero-section-wrap, .full-screen-section').FullScreen();
        }
        if (($page_template == 'page-splitscreen-left') || ($page_template == 'page-splitscreen-right')) {
            jQuery('.hero-section-wrap').FullScreen();
        }
        jQuery('#header').Transparent();
        jQuery('body').SectionScroll();
        be_close_sidebar();
        // be_close_slidebarmenu();
        be_open_leftstrip();
        // be_hide_close_overlay();
        single_page_nav();
        munu_item_update();
        // be_lightbox(); Function and Call Moved to BE Page Builder Plugin
        // Flickity Slider for Portfolio
        be_flickity_default_header();
        be_flickity_getHeight();
        be_flickity_call();
        be_flickity_thumb_call();
        be_carousel_thumb_call();

        if (jQuery('#galaxy-canvas').length > 0) {
            galaxy_canvas();
        }
        pattern_canvas();
        water_drop_canvas();

        /************************************
         RESPONSIVE IFRAME
         ************************************/
        jQuery('body').find('iframe').not('.rev_slider iframe').each(function() {
            jQuery(this).parent().fitVids();
        });
        /********************************
         Menu
         ********************************/

        jQuery('.top-overlay-menu .sliderbar-nav-controller-wrap').on("click", be_menu_link_animation);

        jQuery('.left-overlay-menu .left-strip-wrapper').on("click", be_menu_link_animation);

        var $menu = jQuery('#navigation .menu, #navigation-left-side .menu, #navigation-right-side .menu').children('ul');
        $menu.superfish({
            animation: {
                opacity: 'show'
            },
            animationOut: {
                opacity: 'hide'
            },
            speed: 400,
            delay: 600
        });
        /********************************
         Video Backgrounds
         ********************************/
        if (jQuery('.be-section .be-bg-video, .be-slider-video .be-bg-video').length > 0) {
            jQuery('.be-section .be-bg-video, .be-slider-video .be-bg-video').load();
            jQuery('.be-section .be-bg-video, .be-slider-video .be-bg-video').on("loadedmetadata", function() {
                jQuery(this).css({
                    width: this.videoWidth,
                    height: this.videoHeight
                });
                be_resize_background_video();
                jQuery(this).css('display', 'block');
            });
        }
        /********************************
         Sliders
         ********************************/
        if (('#gallery-container-wrap').length > 0) {

            jQuery('#gallery-container-wrap').fitVids();
            jQuery('#gallery-container-wrap').CenteredSlider();
            jQuery('.be-carousel-thumb').thumbnailSlider();
            resize_gallery_video();

        }
        // jQuery('body').imagesLoaded(function () {
        //     *******************************
        //         Flexslider
        //     *******************************
        //     Flex Slider is deprecated and implemented using Owl Carousel. Code is present in Page Builder Plugin Script.

        // });

        if (jQuery('#carousel').length > 0) {
            jQuery('#carousel').imagesLoaded(function() {
                jQuery('#carousel').elastislide();
            });
        }

        if (jQuery('.fixed-sidebar-content-inner').length > 0) {
            if (jQuery('.fixed-sidebar-content-inner').hasClass('mCustomScrollbar')) {
                jQuery(".fixed-sidebar-content-inner").mCustomScrollbar('update');
            } else {
                jQuery(".fixed-sidebar-content-inner").mCustomScrollbar({
                    autoHideScrollbar: true,
                    mouseWheelPixels: 300
                });
            }
        }
        var $body = jQuery('body');
        if (!($body.hasClass('disable_rev_slider_bg_check')) && !($body.hasClass('semi'))) {
            if ($body.hasClass('header-transparent') && jQuery('#hero-section').find('.rev_slider_wrapper').length > 0) {
                jQuery('#hero-section').find('.rev_slider_wrapper').each(function() {
                    var $wrapper = jQuery(this).attr('id'),
                        $instance = jQuery(this).find('.rev_slider').attr('id'),
                        be_revapi = $instance.split('_');
                    window['revapi' + be_revapi[2]].bind("revolution.slide.onchange", function(e, data) {
                        setTimeout(function() {
                            BackgroundCheck.init({
                                targets: '#header #header-inner-wrap',
                                images: '.active-revslide .tp-bgimg'
                            });
                            BackgroundCheck.refresh();
                        }, 100);
                    });
                });
            }
        }

    }
    /*******************************************************
     Ajax Load Pages with HTML Pushstate and page transitions
     ********************************************************/
    if (jQuery('body').hasClass('all-ajax-content')) {
        transition = function($newEl) {
            var $oldEl = this;
            $oldEl.find('.logo').hide();
            $oldEl.fadeOut(500, function() {
                jQuery(window).trigger('djax_transition');

                // if (jQuery('.rev_slider_wrapper').length > 0) {
                //     jQuery('.rev_slider_wrapper').each(function () {
                //         var $wrapper = jQuery(this).attr('id'), $instance = jQuery(this).find('.rev_slider').attr('id'), be_revapi = $instance.split('_');
                //         window['revapi'+be_revapi[2]].revkill();
                //     });
                // }
                if (jQuery('.be-countdown').length > 0) {
                    jQuery('.be-countdown').each(function() {
                        jQuery(this).countdown('destroy');
                    });
                }
                if (jQuery('body').hasClass('header-transparent') && jQuery('#hero-section').find('.rev_slider_wrapper').length > 0) {
                    BackgroundCheck.destroy();
                }

                Waypoint.destroyAll();
                $oldEl.after($newEl);
                $oldEl.off().empty().remove();
                $newEl.fadeIn(500);
                //jQuery('html').fadeIn(500);
                jQuery('body').imagesLoaded(function() {
                    do_ajax_complete();
                    jQuery(document).trigger("update_content");
                    if (jQuery('.loader-style6').length > 0) {
                        NProgress.done();
                    }
                });
                be_custom_scrollbar();
                jQuery(document).trigger('change');
            });
        };
        $exclude_links = jQuery('#all_ajax_exclude_links').val().split(',');
        window.no_ajax_pages.push('product', 'add-to-cart', 'pdf', 'doc', 'eps', 'png', 'zip', 'admin', 'wp-', 'feed', '#', '?remove_item');
        jQuery.each($exclude_links, function(index, item) {
            window.no_ajax_pages.push(jQuery.trim(item));
        });
        window.no_ajax_pages = jQuery.grep(no_ajax_pages, function(n) {
            return n;
        });
        jQuery('html').djax('.ajaxable', no_ajax_pages, transition);
        jQuery(window).bind('djaxLoad', function(e, data) {
            var content = data.response,
                nobodyClass;
            content = content.replace(/(<\/?)body( .+?)?>/gi, '$1NOTBODY$2>', data);
            nobodyClass = jQuery(content).filter('notbody').attr("class");
            jQuery('body').attr("class", nobodyClass);
            jQuery('#wp-admin-bar-edit').html(jQuery(content).filter('notbody').find('#wp-admin-bar-edit').html());
            jQuery('head').find('meta, link[rel="canonical"]').remove();
            jQuery(content).filter('meta, link[rel="canonical"]').each(function() {
                jQuery('head').prepend(jQuery(this));
            });
        });
        jQuery(window).bind('djaxClick', function(e, data) {
            jQuery('.page-loader').fadeIn();
            if (jQuery('.loader-style6').length > 0) {
                NProgress.start();
            }
            be_close_sidebar();
            be_open_leftstrip();
            be_close_searchbox();
            jQuery('html, body, document').stop().animate({
                scrollTop: jQuery('html').offset().top
            }, 1000, 'easeInOutQuint');

        });
    }

    function be_flickity_default_header() {
        if (jQuery('.portfolio-sliders').length) {
            if (jQuery('body.header-transparent').length) {
                if (Number(jQuery(window).width()) <= 960) {
                    jQuery('#header-inner-wrap').css('position', 'relative');
                } else {
                    jQuery('#header-inner-wrap').css('position', 'absolute');
                }
            }
        }
    }

    function be_flickity_getHeight() {
        if (jQuery('#content.portfolio-sliders').length) {
            var $this = jQuery('#content.portfolio-sliders'),
                $gutter_width = Number($this.attr('data-gutter-width')),
                $slider_type = $this.attr('data-slider-type'),
                $window_width = Number(jQuery(window).width()) + jQuery.getScrollbarWidth(), //Number(jQuery('#main-wrapper').width()) + jQuery.getScrollbarWidth()
                $mobile_calculation = true,
                $full_window_height = Number(jQuery(window).height()),
                $window_height = $full_window_height - (Number(jQuery('#header').innerHeight()) + Number(jQuery('#wpadminbar').innerHeight()) + Number(jQuery('#portfolio-title-nav-wrap').innerHeight()));


            if ($this.find('.disable-flickity-mobile').length) {
                $mobile_calculation = false;
            }
            if (jQuery('body').hasClass('be-themes-layout-layout-border-header-top')) {
                var $border_length = 1;
            } else {
                var $border_length = 2;
            }
            //Calculate Height and Width of Image Wrappers
            //CONDITION 1 - If Flickity is Disabled for Mobile Devices
            if ($mobile_calculation == false && $window_width <= 960) {
                $this.find('.be-flickity .img-wrap').each(function() {
                    var $this_img_wrap = jQuery(this),
                        $this_img = $this_img_wrap.find('img'),
                        $data_source = $this_img.attr('data-flickity-lazyload');

                    $this_img.removeAttr("data-flickity-lazyload");
                    $this_img.attr('src', $data_source);
                    $this_img_wrap.width('100%').height('100%');
                });
            }
            //CONDITION 2 - Calculation for all Desktop Screen Sizes. And for Mobile Screen Size when Flickity is Enabled.
            if ($mobile_calculation == true || $window_width > 960) {
                if ($window_width <= 960) {
                    if ($window_width >= 480 && $window_width < 640) {
                        $window_height = $full_window_height;
                    }
                    $this.find('.img-wrap').width($window_width).height($window_height);
                    $this.find('.be-flickity').css('padding', 0);
                } else {

                    if ($slider_type == 'be-ribbon-carousel' || $slider_type == 'be-center-carousel') {
                        if (jQuery('#bottom-widgets').length) {
                            var $footer_height = 0;
                        } else {
                            var $footer_height = Number(jQuery('#footer').innerHeight());
                        }
                        var $window_height_addl = $window_height - ((Number(jQuery('.layout-box-bottom:visible').height()) * $border_length) + $footer_height),
                            $given_slider_height = $this.attr('data-height');

                        //Set Height and Width according to above Calculations
                        var $slider_height = (($window_height_addl / 100) * parseInt($given_slider_height)),
                            $padding = ($window_height_addl - $slider_height) / 2;

                        $this.find('.img-wrap').height($slider_height);
                        $this.find('.be-flickity').css('padding', $padding + 'px 0px ' + $padding + 'px 0px').css('opacity', 1);
                        $this.find('.be-flickity .img-wrap').each(function() {
                            var $this_img = jQuery(this),
                                $img = $this_img.find('img'),
                                $img_actual_width = $this_img.attr('data-image-width'),
                                $img_actual_height = $this_img.attr('data-image-height'),
                                $img_width = ($img_actual_width * $slider_height) / $img_actual_height;

                            $this_img.width($img_width);
                        });

                    } else if ($slider_type == 'be-centered' || $slider_type == 'be-fullscreen') {

                        $given_slider_height = $this.attr('data-height'); //100;
                        //Larger Screens
                        if (jQuery('#bottom-widgets').length) {
                            var $footer_height = 0;
                        } else {
                            var $footer_height = Number(jQuery('#footer').innerHeight());
                        }
                        var $window_height_addl = $window_height - ((Number(jQuery('.layout-box-bottom:visible').height()) * $border_length) + $footer_height);

                        //Set Height and Width according to above Calculations
                        var $slider_height = (($window_height_addl / 100) * parseInt($given_slider_height)),
                            $padding = ($window_height_addl - $slider_height) / 2;

                        $this.find('.be-flickity').css('padding', $padding + 'px 0px ' + $padding + 'px 0px').css('opacity', 1);
                        $this.find('.img-wrap').height($slider_height).width('100%');
                    }
                }
            }

            //Calculation of Thumbnail Position if Flickity is Enabled for Mobile Devices
            if ($mobile_calculation == true) {
                if ($window_width <= 960) {
                    var $thumbnail_position = $window_height + 37 - Number(jQuery('#header').innerHeight());
                    jQuery('.portfolio-sliders .single-portfolio-slider.carousel_bar_area').css('top', $thumbnail_position);
                } else {
                    jQuery('.portfolio-sliders .single-portfolio-slider.carousel_bar_area').css('top', 'initial');
                }
            }
        }
    }

    function be_flickity_call() {
        var $flickity_gallery = jQuery('.main-gallery.be-flickity'),
            $slider_type = $flickity_gallery.closest('.portfolio-sliders').attr('data-slider-type'),
            $nav_arrow = Boolean($flickity_gallery.attr('data-nav-arrow')),
            $auto_play_time = parseInt($flickity_gallery.attr('data-auto-play')),
            $free_scroll = Boolean($flickity_gallery.attr('data-free-scroll')),
            $keyboard_crtl = Boolean($flickity_gallery.attr('data-keyboard-crtl')),
            $loop_ctrl = Boolean($flickity_gallery.attr('data-loop-crtl')),
            $cell_align = 'center',
            $percentPosition = true,
            $body = jQuery('body');

        if ($auto_play_time <= 0) {
            $auto_play_time = false;
        }

        if ($slider_type == 'be-ribbon-carousel') {
            $cell_align = 'left';
            $percentPosition = false;
        }
        if ($slider_type == 'be-center-carousel') {
            $cell_align = 'center';
            $percentPosition = false;
        }
        if ((Number(jQuery(window).width()) + jQuery.getScrollbarWidth()) <= 960) {
            $free_scroll = false;
        }
        var $flickity_gallery = jQuery('.main-gallery.be-flickity').flickity({
            lazyLoad: 3,
            prevNextButtons: $nav_arrow,
            wrapAround: $loop_ctrl,
            freeScroll: $free_scroll,
            accessibility: $keyboard_crtl,
            autoPlay: $auto_play_time,
            contain: true,
            cellAlign: $cell_align,
            percentPosition: $percentPosition,
            pageDots: false,
            watchCSS: true,
            arrowShape: {
                x0: 20,
                x1: 40,
                y1: 20,
                x2: 45,
                y2: 20,
                x3: 25
            }
        });
        var $flickity_instance = $flickity_gallery.data('flickity');

        var iframes = $flickity_gallery.find('.img-wrap iframe');
        if ($slider_type == 'be-ribbon-carousel' || $slider_type == 'be-center-carousel') {
            be_flickity_resetGutter($flickity_gallery);
        }
        $flickity_gallery.on('lazyLoad', function(event, cellElement) {
            var img = event.originalEvent.target;
            // Resize to Parent
            if ($slider_type != 'be-centered') {
                if (Number(jQuery(window).width()) > 960) {
                    jQuery(img).resizeToParent();
                }
            }

        })
        // Apply Fit Vids
        $flickity_gallery.find('.img-wrap iframe').fitVids();
        $flickity_gallery.find('.img-wrap iframe').css('opacity', 1);
        $flickity_gallery.find('.img-wrap .img-overlay-wrap').css('display', 'block');

        if ($slider_type == 'be-fullscreen') {
            $flickity_gallery.flickity('resize');
        }

        $flickity_gallery.on('settle', function(event, pointer) {
            // Pause Video on Slider Movement
            iframes.each(function() {
                var iframe_id = jQuery(this).attr('id');
                if (iframe_id) {
                    var iframe = document.getElementById(iframe_id);
                    var player = $f(iframe);
                    player.api("pause");
                }
            });

            var $this_img_wrap = jQuery($flickity_instance.selectedElement);
            // Increment Slider Count
            jQuery('.current-slide-count').text(($flickity_instance.selectedIndex) + 1);
            // Remove Overlay Wrapper
            $flickity_gallery.find('.img-wrap.is-selected').css('z-index', '-1');
            // Background Check
            if (!($body.hasClass('disable_rev_slider_bg_check')) && !($body.hasClass('semi'))) {
                if ($slider_type == 'be-fullscreen' && ($this_img_wrap.find('iframe').length <= 0)) {

                    BackgroundCheck.init({
                        targets: '#header #header-inner-wrap, .portfolio-sliders .transparent-nav-bar',
                        images: '.be-fullscreen .img-wrap.is-selected img'
                    });

                    BackgroundCheck.refresh();
                }
            }
        })
        // BackgroundCheck.destroy();
    }

    function flickity_resize() {
        var $flickity_gallery = jQuery('.main-gallery.be-flickity'),
            $slider_type = $flickity_gallery.closest('.portfolio-sliders').attr('data-slider-type');

        if ($slider_type != 'be-centered') {
            if (Number(jQuery(window).width()) > 960) {
                $flickity_gallery.find('.img-wrap img').resizeToParent();
            }
        }
    }

    function be_flickity_resetGutter(onFlickityGallery) {
        var $flickity_slider = onFlickityGallery.find('.flickity-slider'),
            $flickity_wrapper = onFlickityGallery.closest('#content'),
            $gutter_width = $flickity_wrapper.attr('data-gutter-width');

        if (Number(jQuery(window).width()) <= 960) {
            $flickity_slider.css('left', 0);
        } else {
            $flickity_slider.css('left', Number($gutter_width));
        }
    }

    function be_flickity_thumb_call() {

        var $flickity_thumb_gallery = jQuery('.be-flickity-thumb').flickity({
            asNavFor: '.main-gallery',
            freeScroll: true,
            contain: true,
            pageDots: false,
            prevNextButtons: false
        });
    }

    function be_carousel_thumb_call() {

        var $flickity_thumb_gallery = jQuery('.be-carousel-thumb').flickity({
            freeScroll: true,
            contain: true,
            pageDots: false,
            prevNextButtons: false
        });
    }

    /************************************
     DOCUMET READY EVENT
     ************************************/
    jQuery(document).ready(function() {
        do_ajax_complete();

        /**************************************
         EVENTS
         **************************************/
        jQuery(document).on('click', '.header-search-controls .search-button', function() {
            jQuery('.search-box-wrapper').fadeToggle().find('.s').focus();
            if (jQuery('.search-box-wrapper').hasClass('style2-header-search-widget')) {
                jQuery('html').toggleClass('hide-overflow');
            }
        });
        // Submenu Click Logic
        jQuery(document).on('click', '#mobile-menu li a', function() {
            if ((jQuery(this).attr('href') != '#') && !(jQuery(this).closest('li').hasClass('menu-item-has-children'))) {
                be_close_mobilemenu();
            }
        });
        /********************************
         Navigations
         ********************************/
        jQuery(document).on('click', '.mobile-nav-controller-wrap', function() {
            jQuery('.mobile-menu').slideFadeToggle();
            jQuery('.mobile-nav-controller .be-mobile-menu-icon').toggleClass('is-clicked');
        });
        jQuery(document).on('click', '.mobile-sub-menu-controller', function() {
            jQuery(this).siblings('.sub-menu').slideFadeToggle();
            jQuery(this).toggleClass('isClicked');
        });
        // Submenu Click Logic
        jQuery(document).on('click', '.left-header .menu-item-has-children a , #mobile-menu .menu-item-has-children a', function() {
            if (jQuery(this).attr('href') == '#') {
                jQuery(this).siblings('.sub-menu').slideFadeToggle();
                jQuery(this).siblings('.mobile-sub-menu-controller').toggleClass('isClicked');
            }
        });

        jQuery(document).on('click', '.menu-falling-animate-controller', function() {
            var delay = 1,
                $this = jQuery(this);
            if (jQuery('body').hasClass('menu-animate-fall-active')) {
                // jQuery('#navigation').find('#menu').children('.menu-item').each(function() {
                //     jQuery(this).delay(delay).removeClass('return-position', 400);
                //     delay += 50;
                // }).promise().done( function(){
                //     jQuery('body').removeClass('menu-animate-fall-active');
                //     jQuery('.menu-falling-animate-controller .be-mobile-menu-icon').toggleClass('is-clicked');
                // });
                jQuery('#menu, #left-menu, #right-menu').children('.menu-item').each(function() {
                    jQuery(this).delay(delay).removeClass('return-position', 400);
                    delay += 50;
                }).promise().done(function() {
                    jQuery('body').removeClass('menu-animate-fall-active');
                    jQuery('.menu-falling-animate-controller .be-mobile-menu-icon').toggleClass('is-clicked');
                });
            } else {
                // jQuery('#navigation').find('#menu').children('.menu-item').each(function() {
                //     jQuery(this).delay(delay).addClass('return-position', 400);
                //     delay += 50;
                // }).promise().done( function(){
                //     jQuery('body').addClass('menu-animate-fall-active');
                //     // $this.find('.font-icon').addClass('active');
                //     jQuery('.menu-falling-animate-controller .be-mobile-menu-icon').toggleClass('is-clicked');
                // });
                jQuery('#menu, #left-menu, #right-menu').children('.menu-item').each(function() {
                    jQuery(this).delay(delay).addClass('return-position', 400);
                    delay += 50;
                }).promise().done(function() {
                    jQuery('body').addClass('menu-animate-fall-active');
                    // $this.find('.font-icon').addClass('active');
                    jQuery('.menu-falling-animate-controller .be-mobile-menu-icon').toggleClass('is-clicked');
                });

            }
        });

        /********************************
         Local Scroll
         ********************************/
        jQuery(document).on('click', 'a[href="#"]', function(e) {
            e.preventDefault();
        });
        jQuery(document).on('click', 'a', function(e) {
            var $link_to = jQuery(this).attr('href'),
                url_arr, $element, $path = window.location.href;
            if (jQuery(this).hasClass('ui-tabs-anchor')) {
                return false;
            }
            if ($link_to) {
                url_arr = $link_to.split('#');
                if ($link_to.indexOf('#') >= 0 && $path.indexOf(url_arr[0]) >= 0) {
                    $element = $link_to.substring($link_to.indexOf('#') + 1);
                    if ($element) {
                        if (jQuery('#' + $element).length > 0) {
                            e.preventDefault();
                            if (jQuery(window).width() < 960) {
                                jQuery('.mobile-menu').slideUp(500, function() {
                                    be_animate_scroll(jQuery('#' + $element));
                                });
                            } else {
                                be_animate_scroll(jQuery('#' + $element));
                            }
                        }
                    }
                }
            }
        });
        /********************************
         Menu Sidebar
         ********************************/
        jQuery(document).on('click', '.sliderbar-nav-controller-wrap', function() {
            var $body = jQuery('body');
            jQuery('.sb-slidebar').toggleClass('opened');
            jQuery('html,body').toggleClass('slider-bar-opened');
            if ($body.hasClass('top-overlay-menu')) {
                jQuery('html').toggleClass('hide-overflow');
                // jQuery('.layout-box-container').fadeOut();
                if ($body.hasClass('be-themes-layout-layout-border-header-top')) {
                    jQuery('.sliderbar-menu-controller .be-mobile-menu-icon').toggleClass('is-clicked');
                }
            } else {
                jQuery('.sliderbar-menu-controller .be-mobile-menu-icon').toggleClass('is-clicked');
            }
        });
        jQuery(document).on('click', '#sb-left-strip', function() {
            var $this = jQuery(this);
            jQuery('.sb-slidebar').toggleClass('opened');
            if ($this.hasClass('menu_push_main')) {
                jQuery('html, body').toggleClass('slider-bar-opened');
            }
            if ($this.hasClass('overlay')) {
                jQuery('html').toggleClass('hide-overflow');
                jQuery('.layout-box-container').fadeOut();
            }
            if ($this.hasClass('strip')) {
                jQuery('.left-strip-wrapper').toggleClass('hide');
                jQuery('#main-wrapper').toggleClass('hidden-strip');
            }
        });
        jQuery(document).on('click', '.overlay-menu-close', function() {
            be_close_sidebar();
            be_open_leftstrip();
        });
        /********************************
         Portfolio Custom Gallery
         ********************************/
        jQuery(document).on('click', '.single_portfolio_info_close', function() {
            jQuery(this).closest('.gallery_content').toggleClass('show');
            jQuery(".gallery_content_area").mCustomScrollbar("update");
        });
        jQuery(document).on('mouseenter', '.carousel_bar_dots', function() {
            jQuery(this).parent().find('.carousel_bar_wrap').css('opacity', '0').stop().animate({
                opacity: 1,
                bottom: '0px'
            }, 500);
        });
        jQuery(document).on('mouseleave', '.carousel_bar_area', function() {
            jQuery(this).find('.carousel_bar_wrap').stop().animate({
                opacity: 0,
                bottom: '-500px'
            }, 500);
        });
        /********************************
         Close Custom Popups
         ********************************/
        jQuery(document).on('mouseup', '.sliderbar-menu-controller, .sb-slidebar, .mobile-nav-controller, .mobile-menu, .header-search-controls .search-button, .search-box-wrapper', function() {
            if (jQuery(this).hasClass('sliderbar-menu-controller') || jQuery(this).hasClass('sb-slidebar')) {
                be_close_mobilemenu();
                be_close_searchbox();
            }
            if (jQuery(this).hasClass('mobile-nav-controller') || jQuery(this).hasClass('mobile-menu')) {
                be_close_sidebar();
                be_close_searchbox();
            }
            if (jQuery(this).hasClass('search-button') || jQuery(this).hasClass('search-box-wrapper')) {
                be_close_mobilemenu();
                be_close_sidebar();
            }
            return false;
        });

        jQuery(document).on('mouseup', function() {
            be_close_sidebar();
            be_open_leftstrip();
            be_close_mobilemenu();
            be_close_searchbox();
        });
        jQuery(document).on('keyup', function(e) {
            if (e.keyCode === 27) {
                be_close_sidebar();
                be_open_leftstrip();
                be_close_searchbox();
                if (jQuery('.gallery_content').hasClass('show')) {
                    jQuery('.gallery_content').removeClass('show');
                } else {
                    if (jQuery('.gallery-slider-wrap').hasClass('opened')) {
                        jQuery('html').removeClass('overflow-hidden');
                        jQuery('.gallery-slider-wrap').css('left', '100%').css('opacity', 0);
                        setTimeout(function() {
                            jQuery('.gallery-slider-wrap').removeClass('opened');
                            jQuery('.gallery-slider-content').empty();
                            jQuery('.gallery-slider-wrap').css('left', '-100%');
                        }, 300);
                    }
                }
            }
        });
        jQuery(document).on('click', '.header-search-form-close', function(e) {
            e.preventDefault();
            be_close_searchbox();
        });
        /********************************
         MouseMove Parallax
         ********************************/
        jQuery(document).on('mousemove', '.be-bg-mousemove-parallax', function(e) {
            var amountMovedX = (event.pageX / jQuery(this).width()) * 100,
                amountMovedY = (event.pageY / jQuery(this).height()) * 100;
            if (amountMovedX > 100) {
                amountMovedX = 100;
            } else if (amountMovedX < 0) {
                amountMovedX = 0;
            }
            if (amountMovedY > 100) {
                amountMovedY = 100;
            } else if (amountMovedY < 0) {
                amountMovedY = 0;
            }
            jQuery(this).stop(true, false).animate({
                backgroundPosition: amountMovedX + '% ' + amountMovedY + '%'
            }, 200);
        });
        /********************************
         Back To Top
         ********************************/
        jQuery(document).on('click', '#back-to-top, .back-to-top', function(e) {
            e.preventDefault();
            jQuery('body,html').animate({
                scrollTop: 0
            }, 1000, 'easeInOutQuint');
        });
    }); // END DOCUMENT READY EVENT


    jQuery(window).smartresize(function() {
        resize_gallery_video();
        be_flickity_default_header();
        be_flickity_getHeight();
        var $flickity_gallery = jQuery('.main-gallery.be-flickity');
        if (jQuery(window).width() > 960) {
            $flickity_gallery.find('.img-wrap').each(function() {
                var $this_img = jQuery(this),
                    $img = $this_img.find('img');
                //Reassign Img Source Attribute to Enable Lazyload in Larger Screen Sizes
                if (($img.attr('src')) && !($img.hasClass('flickity-lazyloaded'))) {
                    var $data_source = $img.attr('src');
                    $img.removeAttr("src");
                    $img.attr('data-flickity-lazyload', $data_source);
                }
            });
        }
        $flickity_gallery.flickity('reloadCells');


        // Resize to Parent
        flickity_resize();
        be_flickity_resetGutter($flickity_gallery);
        be_flickity_thumb_call();
        be_carousel_thumb_call();

        jQuery(".gallery_content_area, .ps-content-inner").mCustomScrollbar("update");
        be_sticky_sidebar();
        be_split_screen_template();
        be_resize_background_video();
        munu_item_update();
        if (jQuery(window).width() > 960) {
            jQuery('.mobile-menu').slideUp();
        }
    }); // END WINDOW RESIZE EVENT
    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > 10) {
            jQuery('#back-to-top').fadeIn();
        } else {
            jQuery('#back-to-top').fadeOut();
        }
        munu_item_update();
        be_sticky_sidebar();
        be_split_screen_template();
    }); // END WINDOW SCROLL EVENT
    jQuery(window).load(function() {
        var $hash = window.location.hash;
        if ($hash) {
            if (jQuery($hash).length > 0) {
                be_animate_scroll(jQuery($hash));
            }
        }
        setTimeout(function() {
            jQuery('body').imagesLoaded(function() {
                be_sticky_sidebar();
                be_split_screen_template();
                $page_loader.fadeOut();
            });
            // jQuery(window).trigger('resize');
        }, 200);
        be_custom_scrollbar();
    }); // END WINDOW LOAD EVENT
}(jQuery));;
/******INDEX*************************

 1. Plugin Base
 2. PhotoSwipe
 3. Moment
 4. Appear
 5. Owl Carousel-2

 **************************************/

/** Abstract base class for collection plugins v1.0.1.
 Written by Keith Wood (kbwood{at}iinet.com.au) December 2013.
 Licensed under the MIT (http://keith-wood.name/licence.html) license. */
;
(function() {
    var j = false;
    window.JQClass = function() {};
    JQClass.classes = {};
    JQClass.extend = function extender(f) {
        var g = this.prototype;
        j = true;
        var h = new this();
        j = false;
        for (var i in f) {
            h[i] = typeof f[i] == 'function' && typeof g[i] == 'function' ? (function(d, e) {
                return function() {
                    var b = this._super;
                    this._super = function(a) {
                        return g[d].apply(this, a || [])
                    };
                    var c = e.apply(this, arguments);
                    this._super = b;
                    return c
                }
            })(i, f[i]) : f[i]
        }

        function JQClass() {
            if (!j && this._init) {
                this._init.apply(this, arguments)
            }
        }
        JQClass.prototype = h;
        JQClass.prototype.constructor = JQClass;
        JQClass.extend = extender;
        return JQClass
    }
})();
(function($) {
    JQClass.classes.JQPlugin = JQClass.extend({
        name: 'plugin',
        defaultOptions: {},
        regionalOptions: {},
        _getters: [],
        _getMarker: function() {
            return 'is-' + this.name
        },
        _init: function() {
            $.extend(this.defaultOptions, (this.regionalOptions && this.regionalOptions['']) || {});
            var c = camelCase(this.name);
            $[c] = this;
            $.fn[c] = function(a) {
                var b = Array.prototype.slice.call(arguments, 1);
                if ($[c]._isNotChained(a, b)) {
                    return $[c][a].apply($[c], [this[0]].concat(b))
                }
                return this.each(function() {
                    if (typeof a === 'string') {
                        if (a[0] === '_' || !$[c][a]) {
                            throw 'Unknown method: ' + a;
                        }
                        $[c][a].apply($[c], [this].concat(b))
                    } else {
                        $[c]._attach(this, a)
                    }
                })
            }
        },
        setDefaults: function(a) {
            $.extend(this.defaultOptions, a || {})
        },
        _isNotChained: function(a, b) {
            if (a === 'option' && (b.length === 0 || (b.length === 1 && typeof b[0] === 'string'))) {
                return true
            }
            return $.inArray(a, this._getters) > -1
        },
        _attach: function(a, b) {
            a = $(a);
            if (a.hasClass(this._getMarker())) {
                return
            }
            a.addClass(this._getMarker());
            b = $.extend({}, this.defaultOptions, this._getMetadata(a), b || {});
            var c = $.extend({
                name: this.name,
                elem: a,
                options: b
            }, this._instSettings(a, b));
            a.data(this.name, c);
            this._postAttach(a, c);
            this.option(a, b)
        },
        _instSettings: function(a, b) {
            return {}
        },
        _postAttach: function(a, b) {},
        _getMetadata: function(d) {
            try {
                var f = d.data(this.name.toLowerCase()) || '';
                f = f.replace(/'/g, '"');
                f = f.replace(/([a-zA-Z0-9]+):/g, function(a, b, i) {
                    var c = f.substring(0, i).match(/"/g);
                    return (!c || c.length % 2 === 0 ? '"' + b + '":' : b + ':')
                });
                f = $.parseJSON('{' + f + '}');
                for (var g in f) {
                    var h = f[g];
                    if (typeof h === 'string' && h.match(/^new Date\((.*)\)$/)) {
                        f[g] = eval(h)
                    }
                }
                return f
            } catch (e) {
                return {}
            }
        },
        _getInst: function(a) {
            return $(a).data(this.name) || {}
        },
        option: function(a, b, c) {
            a = $(a);
            var d = a.data(this.name);
            if (!b || (typeof b === 'string' && c == null)) {
                var e = (d || {}).options;
                return (e && b ? e[b] : e)
            }
            if (!a.hasClass(this._getMarker())) {
                return
            }
            var e = b || {};
            if (typeof b === 'string') {
                e = {};
                e[b] = c
            }
            this._optionsChanged(a, d, e);
            $.extend(d.options, e)
        },
        _optionsChanged: function(a, b, c) {},
        destroy: function(a) {
            a = $(a);
            if (!a.hasClass(this._getMarker())) {
                return
            }
            this._preDestroy(a, this._getInst(a));
            a.removeData(this.name).removeClass(this._getMarker())
        },
        _preDestroy: function(a, b) {}
    });

    function camelCase(c) {
        return c.replace(/-([a-z])/g, function(a, b) {
            return b.toUpperCase()
        })
    }
    $.JQPlugin = {
        createPlugin: function(a, b) {
            if (typeof a === 'object') {
                b = a;
                a = 'JQPlugin'
            }
            a = camelCase(a);
            var c = camelCase(b.name);
            JQClass.classes[c] = JQClass.classes[a].extend(b);
            new JQClass.classes[c]()
        }
    }
})(jQuery);

/******************************************************************************/

/*! PhotoSwipe Default UI - 4.0.6 - 2015-02-25
 * http://photoswipe.com
 * Copyright (c) 2015 Dmitry Semenov; */
! function(a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipeUI_Default = b()
}(this, function() {
    "use strict";
    var a = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = this,
            w = !1,
            x = !0,
            y = !0,
            z = {
                barsSize: {
                    top: 44,
                    bottom: "auto"
                },
                closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
                timeToIdle: 4e3,
                timeToIdleOutside: 1e3,
                loadingIndicatorDelay: 1e3,
                addCaptionHTMLFn: function(a, b) {
                    return a.title ? (b.children[0].innerHTML = a.title, !0) : (b.children[0].innerHTML = "", !1)
                },
                closeEl: !0,
                captionEl: !0,
                fullscreenEl: !0,
                zoomEl: !0,
                shareEl: !0,
                counterEl: !0,
                arrowEl: !0,
                preloaderEl: !0,
                tapToClose: !1,
                tapToToggleControls: !0,
                clickToCloseNonZoomable: !0,
                shareButtons: [{
                    id: "facebook",
                    label: "Share on Facebook",
                    url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
                }, {
                    id: "twitter",
                    label: "Tweet",
                    url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
                }, {
                    id: "pinterest",
                    label: "Pin it",
                    url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
                }, {
                    id: "download",
                    label: "Download image",
                    url: "{{raw_image_url}}",
                    download: !0
                }],
                getImageURLForShare: function() {
                    return a.currItem.src || ""
                },
                getPageURLForShare: function() {
                    return window.location.href
                },
                getTextForShare: function() {
                    return a.currItem.title || ""
                },
                indexIndicatorSep: " / "
            },
            A = function(a) {
                if (r) return !0;
                a = a || window.event, q.timeToIdle && q.mouseUsed && !k && K();
                for (var c, d, e = a.target || a.srcElement, f = e.className, g = 0; g < S.length; g++) c = S[g], c.onTap && f.indexOf("pswp__" + c.name) > -1 && (c.onTap(), d = !0);
                if (d) {
                    a.stopPropagation && a.stopPropagation(), r = !0;
                    var h = b.features.isOldAndroid ? 600 : 30;
                    s = setTimeout(function() {
                        r = !1
                    }, h)
                }
            },
            B = function() {
                return !a.likelyTouchDevice || q.mouseUsed || screen.width > 1200
            },
            C = function(a, c, d) {
                b[(d ? "add" : "remove") + "Class"](a, "pswp__" + c)
            },
            D = function() {
                var a = 1 === q.getNumItemsFn();
                a !== p && (C(d, "ui--one-slide", a), p = a)
            },
            E = function() {
                C(i, "share-modal--hidden", y)
            },
            F = function() {
                return y = !y, y ? (b.removeClass(i, "pswp__share-modal--fade-in"), setTimeout(function() {
                    y && E()
                }, 300)) : (E(), setTimeout(function() {
                    y || b.addClass(i, "pswp__share-modal--fade-in")
                }, 30)), y || H(), !1
            },
            G = function(b) {
                b = b || window.event;
                var c = b.target || b.srcElement;
                return a.shout("shareLinkClick", b, c), c.href ? c.hasAttribute("download") ? !0 : (window.open(c.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), y || F(), !1) : !1
            },
            H = function() {
                for (var a, b, c, d, e, f = "", g = 0; g < q.shareButtons.length; g++) a = q.shareButtons[g], c = q.getImageURLForShare(a), d = q.getPageURLForShare(a), e = q.getTextForShare(a), b = a.url.replace("{{url}}", encodeURIComponent(d)).replace("{{image_url}}", encodeURIComponent(c)).replace("{{raw_image_url}}", c).replace("{{text}}", encodeURIComponent(e)), f += '<a href="' + b + '" target="_blank" class="pswp__share--' + a.id + '"' + (a.download ? "download" : "") + ">" + a.label + "</a>", q.parseShareButtonOut && (f = q.parseShareButtonOut(a, f));
                i.children[0].innerHTML = f, i.children[0].onclick = G
            },
            I = function(a) {
                for (var c = 0; c < q.closeElClasses.length; c++)
                    if (b.hasClass(a, "pswp__" + q.closeElClasses[c])) return !0
            },
            J = 0,
            K = function() {
                clearTimeout(u), J = 0, k && v.setIdle(!1)
            },
            L = function(a) {
                a = a ? a : window.event;
                var b = a.relatedTarget || a.toElement;
                b && "HTML" !== b.nodeName || (clearTimeout(u), u = setTimeout(function() {
                    v.setIdle(!0)
                }, q.timeToIdleOutside))
            },
            M = function() {
                q.fullscreenEl && (c || (c = v.getFullscreenAPI()), c ? (b.bind(document, c.eventK, v.updateFullscreen), v.updateFullscreen(), b.addClass(a.template, "pswp--supports-fs")) : b.removeClass(a.template, "pswp--supports-fs"))
            },
            N = function() {
                q.preloaderEl && (O(!0), l("beforeChange", function() {
                    clearTimeout(o), o = setTimeout(function() {
                        a.currItem && a.currItem.loading ? (!a.allowProgressiveImg() || a.currItem.img && !a.currItem.img.naturalWidth) && O(!1) : O(!0)
                    }, q.loadingIndicatorDelay)
                }), l("imageLoadComplete", function(b, c) {
                    a.currItem === c && O(!0)
                }))
            },
            O = function(a) {
                n !== a && (C(m, "preloader--active", !a), n = a)
            },
            P = function(a) {
                var c = a.vGap;
                if (B()) {
                    var g = q.barsSize;
                    if (q.captionEl && "auto" === g.bottom)
                        if (f || (f = b.createEl("pswp__caption pswp__caption--fake"), f.appendChild(b.createEl("pswp__caption__center")), d.insertBefore(f, e), b.addClass(d, "pswp__ui--fit")), q.addCaptionHTMLFn(a, f, !0)) {
                            var h = f.clientHeight;
                            c.bottom = parseInt(h, 10) || 44
                        } else c.bottom = g.top;
                    else c.bottom = "auto" === g.bottom ? 0 : g.bottom;
                    c.top = g.top
                } else c.top = c.bottom = 0
            },
            Q = function() {
                q.timeToIdle && l("mouseUsed", function() {
                    b.bind(document, "mousemove", K), b.bind(document, "mouseout", L), t = setInterval(function() {
                        J++, 2 === J && v.setIdle(!0)
                    }, q.timeToIdle / 2)
                })
            },
            R = function() {
                l("onVerticalDrag", function(a) {
                    x && .95 > a ? v.hideControls() : !x && a >= .95 && v.showControls()
                });
                var a;
                l("onPinchClose", function(b) {
                    x && .9 > b ? (v.hideControls(), a = !0) : a && !x && b > .9 && v.showControls()
                }), l("zoomGestureEnded", function() {
                    a = !1, a && !x && v.showControls()
                })
            },
            S = [{
                name: "caption",
                option: "captionEl",
                onInit: function(a) {
                    e = a
                }
            }, {
                name: "share-modal",
                option: "shareEl",
                onInit: function(a) {
                    i = a
                },
                onTap: function() {
                    F()
                }
            }, {
                name: "button--share",
                option: "shareEl",
                onInit: function(a) {
                    h = a
                },
                onTap: function() {
                    F()
                }
            }, {
                name: "button--zoom",
                option: "zoomEl",
                onTap: a.toggleDesktopZoom
            }, {
                name: "counter",
                option: "counterEl",
                onInit: function(a) {
                    g = a
                }
            }, {
                name: "button--close",
                option: "closeEl",
                onTap: a.close
            }, {
                name: "button--arrow--left",
                option: "arrowEl",
                onTap: a.prev
            }, {
                name: "button--arrow--right",
                option: "arrowEl",
                onTap: a.next
            }, {
                name: "button--fs",
                option: "fullscreenEl",
                onTap: function() {
                    c.isFullscreen() ? c.exit() : c.enter()
                }
            }, {
                name: "preloader",
                option: "preloaderEl",
                onInit: function(a) {
                    m = a
                }
            }],
            T = function() {
                var a, c, e, f = function(d) {
                    if (d)
                        for (var f = d.length, g = 0; f > g; g++) {
                            a = d[g], c = a.className;
                            for (var h = 0; h < S.length; h++) e = S[h], c.indexOf("pswp__" + e.name) > -1 && (q[e.option] ? (b.removeClass(a, "pswp__element--disabled"), e.onInit && e.onInit(a)) : b.addClass(a, "pswp__element--disabled"))
                        }
                };
                f(d.children);
                var g = b.getChildByClass(d, "pswp__top-bar");
                g && f(g.children)
            };
        v.init = function() {
            b.extend(a.options, z, !0), q = a.options, d = b.getChildByClass(a.scrollWrap, "pswp__ui"), l = a.listen, R(), l("beforeChange", v.update), l("doubleTap", function(b) {
                var c = a.currItem.initialZoomLevel;
                a.getZoomLevel() !== c ? a.zoomTo(c, b, 333) : a.zoomTo(q.getDoubleTapZoom(!1, a.currItem), b, 333)
            }), l("preventDragEvent", function(a, b, c) {
                var d = a.target || a.srcElement;
                d && d.className && a.type.indexOf("mouse") > -1 && (d.className.indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(d.tagName)) && (c.prevent = !1)
            }), l("bindEvents", function() {
                b.bind(d, "pswpTap click", A), b.bind(a.scrollWrap, "pswpTap", v.onGlobalTap), a.likelyTouchDevice || b.bind(a.scrollWrap, "mouseover", v.onMouseOver)
            }), l("unbindEvents", function() {
                y || F(), t && clearInterval(t), b.unbind(document, "mouseout", L), b.unbind(document, "mousemove", K), b.unbind(d, "pswpTap click", A), b.unbind(a.scrollWrap, "pswpTap", v.onGlobalTap), b.unbind(a.scrollWrap, "mouseover", v.onMouseOver), c && (b.unbind(document, c.eventK, v.updateFullscreen), c.isFullscreen() && (q.hideAnimationDuration = 0, c.exit()), c = null)
            }), l("destroy", function() {
                q.captionEl && (f && d.removeChild(f), b.removeClass(e, "pswp__caption--empty")), i && (i.children[0].onclick = null), b.removeClass(d, "pswp__ui--over-close"), b.addClass(d, "pswp__ui--hidden"), v.setIdle(!1)
            }), q.showAnimationDuration || b.removeClass(d, "pswp__ui--hidden"), l("initialZoomIn", function() {
                q.showAnimationDuration && b.removeClass(d, "pswp__ui--hidden")
            }), l("initialZoomOut", function() {
                b.addClass(d, "pswp__ui--hidden")
            }), l("parseVerticalMargin", P), T(), q.shareEl && h && i && (y = !0), D(), Q(), M(), N()
        }, v.setIdle = function(a) {
            k = a, C(d, "ui--idle", a)
        }, v.update = function() {
            x && a.currItem ? (v.updateIndexIndicator(), q.captionEl && (q.addCaptionHTMLFn(a.currItem, e), C(e, "caption--empty", !a.currItem.title)), w = !0) : w = !1, y || F(), D()
        }, v.updateFullscreen = function(d) {
            d && setTimeout(function() {
                a.setScrollOffset(0, b.getScrollY())
            }, 50), b[(c.isFullscreen() ? "add" : "remove") + "Class"](a.template, "pswp--fs")
        }, v.updateIndexIndicator = function() {
            q.counterEl && (g.innerHTML = a.getCurrentIndex() + 1 + q.indexIndicatorSep + q.getNumItemsFn())
        }, v.onGlobalTap = function(c) {
            c = c || window.event;
            var d = c.target || c.srcElement;
            if (!r)
                if (c.detail && "mouse" === c.detail.pointerType) {
                    if (I(d)) return void a.close();
                    b.hasClass(d, "pswp__img") && (1 === a.getZoomLevel() && a.getZoomLevel() <= a.currItem.fitRatio ? q.clickToCloseNonZoomable && a.close() : a.toggleDesktopZoom(c.detail.releasePoint))
                } else if (q.tapToToggleControls && (x ? v.hideControls() : v.showControls()), q.tapToClose && (b.hasClass(d, "pswp__img") || I(d))) return void a.close()
        }, v.onMouseOver = function(a) {
            a = a || window.event;
            var b = a.target || a.srcElement;
            C(d, "ui--over-close", I(b))
        }, v.hideControls = function() {
            b.addClass(d, "pswp__ui--hidden"), x = !1
        }, v.showControls = function() {
            x = !0, w || v.update(), b.removeClass(d, "pswp__ui--hidden")
        }, v.supportsFullscreen = function() {
            var a = document;
            return !!(a.exitFullscreen || a.mozCancelFullScreen || a.webkitExitFullscreen || a.msExitFullscreen)
        }, v.getFullscreenAPI = function() {
            var b, c = document.documentElement,
                d = "fullscreenchange";
            return c.requestFullscreen ? b = {
                enterK: "requestFullscreen",
                exitK: "exitFullscreen",
                elementK: "fullscreenElement",
                eventK: d
            } : c.mozRequestFullScreen ? b = {
                enterK: "mozRequestFullScreen",
                exitK: "mozCancelFullScreen",
                elementK: "mozFullScreenElement",
                eventK: "moz" + d
            } : c.webkitRequestFullscreen ? b = {
                enterK: "webkitRequestFullscreen",
                exitK: "webkitExitFullscreen",
                elementK: "webkitFullscreenElement",
                eventK: "webkit" + d
            } : c.msRequestFullscreen && (b = {
                enterK: "msRequestFullscreen",
                exitK: "msExitFullscreen",
                elementK: "msFullscreenElement",
                eventK: "MSFullscreenChange"
            }), b && (b.enter = function() {
                return j = q.closeOnScroll, q.closeOnScroll = !1, "webkitRequestFullscreen" !== this.enterK ? a.template[this.enterK]() : void a.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
            }, b.exit = function() {
                return q.closeOnScroll = j, document[this.exitK]()
            }, b.isFullscreen = function() {
                return document[this.elementK]
            }), b
        }
    };
    return a
});

/*! PhotoSwipe - v4.0.6 - 2015-02-25
 * http://photoswipe.com
 * Copyright (c) 2015 Dmitry Semenov; */
! function(a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipe = b()
}(this, function() {
    "use strict";
    var a = function(a, b, c, d) {
        var e = {
            features: null,
            bind: function(a, b, c, d) {
                var e = (d ? "remove" : "add") + "EventListener";
                b = b.split(" ");
                for (var f = 0; f < b.length; f++) b[f] && a[e](b[f], c, !1)
            },
            isArray: function(a) {
                return a instanceof Array
            },
            createEl: function(a, b) {
                var c = document.createElement(b || "div");
                return a && (c.className = a), c
            },
            getScrollY: function() {
                var a = window.pageYOffset;
                return void 0 !== a ? a : document.documentElement.scrollTop
            },
            unbind: function(a, b, c) {
                e.bind(a, b, c, !0)
            },
            removeClass: function(a, b) {
                var c = new RegExp("(\\s|^)" + b + "(\\s|$)");
                a.className = a.className.replace(c, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            addClass: function(a, b) {
                e.hasClass(a, b) || (a.className += (a.className ? " " : "") + b)
            },
            hasClass: function(a, b) {
                return a.className && new RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className)
            },
            getChildByClass: function(a, b) {
                for (var c = a.firstChild; c;) {
                    if (e.hasClass(c, b)) return c;
                    c = c.nextSibling
                }
            },
            arraySearch: function(a, b, c) {
                for (var d = a.length; d--;)
                    if (a[d][c] === b) return d;
                return -1
            },
            extend: function(a, b, c) {
                for (var d in b)
                    if (b.hasOwnProperty(d)) {
                        if (c && a.hasOwnProperty(d)) continue;
                        a[d] = b[d]
                    }
            },
            easing: {
                sine: {
                    out: function(a) {
                        return Math.sin(a * (Math.PI / 2))
                    },
                    inOut: function(a) {
                        return -(Math.cos(Math.PI * a) - 1) / 2
                    }
                },
                cubic: {
                    out: function(a) {
                        return --a * a * a + 1
                    }
                }
            },
            detectFeatures: function() {
                if (e.features) return e.features;
                var a = e.createEl(),
                    b = a.style,
                    c = "",
                    d = {};
                if (d.oldIE = document.all && !document.addEventListener, d.touch = "ontouchstart" in window, window.requestAnimationFrame && (d.raf = window.requestAnimationFrame, d.caf = window.cancelAnimationFrame), d.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !d.pointerEvent) {
                    var f = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var g = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        g && g.length > 0 && (g = parseInt(g[1], 10), g >= 1 && 8 > g && (d.isOldIOSPhone = !0))
                    }
                    var h = f.match(/Android\s([0-9\.]*)/),
                        i = h ? h[1] : 0;
                    i = parseFloat(i), i >= 1 && (4.4 > i && (d.isOldAndroid = !0), d.androidVersion = i), d.isMobileOpera = /opera mini|opera mobi/i.test(f)
                }
                for (var j, k, l = ["transform", "perspective", "animationName"], m = ["", "webkit", "Moz", "ms", "O"], n = 0; 4 > n; n++) {
                    c = m[n];
                    for (var o = 0; 3 > o; o++) j = l[o], k = c + (c ? j.charAt(0).toUpperCase() + j.slice(1) : j), !d[j] && k in b && (d[j] = k);
                    c && !d.raf && (c = c.toLowerCase(), d.raf = window[c + "RequestAnimationFrame"], d.raf && (d.caf = window[c + "CancelAnimationFrame"] || window[c + "CancelRequestAnimationFrame"]))
                }
                if (!d.raf) {
                    var p = 0;
                    d.raf = function(a) {
                        var b = (new Date).getTime(),
                            c = Math.max(0, 16 - (b - p)),
                            d = window.setTimeout(function() {
                                a(b + c)
                            }, c);
                        return p = b + c, d
                    }, d.caf = function(a) {
                        clearTimeout(a)
                    }
                }
                return d.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, e.features = d, d
            }
        };
        e.detectFeatures(), e.features.oldIE && (e.bind = function(a, b, c, d) {
            b = b.split(" ");
            for (var e, f = (d ? "detach" : "attach") + "Event", g = function() {
                c.handleEvent.call(c)
            }, h = 0; h < b.length; h++)
                if (e = b[h])
                    if ("object" == typeof c && c.handleEvent) {
                        if (d) {
                            if (!c["oldIE" + e]) return !1
                        } else c["oldIE" + e] = g;
                        a[f]("on" + e, c["oldIE" + e])
                    } else a[f]("on" + e, c)
        });
        var f = this,
            g = 25,
            h = 3,
            i = {
                allowPanToNext: !0,
                spacing: .12,
                bgOpacity: 1,
                mouseUsed: !1,
                loop: !0,
                pinchToClose: !0,
                closeOnScroll: !0,
                closeOnVerticalDrag: !0,
                hideAnimationDuration: 333,
                showAnimationDuration: 333,
                showHideOpacity: !1,
                focus: !0,
                escKey: !0,
                arrowKeys: !0,
                mainScrollEndFriction: .35,
                panEndFriction: .35,
                isClickableElement: function(a) {
                    return "A" === a.tagName
                },
                getDoubleTapZoom: function(a, b) {
                    return a ? 1 : b.initialZoomLevel < .7 ? 1 : 1.5
                },
                maxSpreadZoom: 2,
                scaleMode: "fit",
                modal: !0,
                alwaysFadeIn: !1
            };
        e.extend(i, d);
        var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb, mb = function() {
                return {
                    x: 0,
                    y: 0
                }
            },
            nb = mb(),
            ob = mb(),
            pb = mb(),
            qb = {},
            rb = 0,
            sb = mb(),
            tb = 0,
            ub = !0,
            vb = [],
            wb = {},
            xb = function(a, b) {
                e.extend(f, b.publicMethods), vb.push(a)
            },
            yb = function(a) {
                var b = $c();
                return a > b - 1 ? a - b : 0 > a ? b + a : a
            },
            zb = {},
            Ab = function(a, b) {
                return zb[a] || (zb[a] = []), zb[a].push(b)
            },
            Bb = function(a) {
                var b = zb[a];
                if (b) {
                    var c = Array.prototype.slice.call(arguments);
                    c.shift();
                    for (var d = 0; d < b.length; d++) b[d].apply(f, c)
                }
            },
            Cb = function() {
                return (new Date).getTime()
            },
            Db = function(a) {
                jb = a, f.bg.style.opacity = a * i.bgOpacity
            },
            Eb = function(a, b, c, d) {
                a[F] = u + b + "px, " + c + "px" + v + " scale(" + d + ")"
            },
            Fb = function() {
                eb && Eb(eb, pb.x, pb.y, s)
            },
            Gb = function(a) {
                a.container && Eb(a.container.style, a.initialPosition.x, a.initialPosition.y, a.initialZoomLevel)
            },
            Hb = function(a, b) {
                b[F] = u + a + "px, 0px" + v
            },
            Ib = function(a, b) {
                if (!i.loop && b) {
                    var c = m + (sb.x * rb - a) / sb.x,
                        d = Math.round(a - rc.x);
                    (0 > c && d > 0 || c >= $c() - 1 && 0 > d) && (a = rc.x + d * i.mainScrollEndFriction)
                }
                rc.x = a, Hb(a, n)
            },
            Jb = function(a, b) {
                var c = sc[a] - y[a];
                return ob[a] + nb[a] + c - c * (b / t)
            },
            Kb = function(a, b) {
                a.x = b.x, a.y = b.y, b.id && (a.id = b.id)
            },
            Lb = function(a) {
                a.x = Math.round(a.x), a.y = Math.round(a.y)
            },
            Mb = null,
            Nb = function() {
                Mb && (e.unbind(document, "mousemove", Nb), e.addClass(a, "pswp--has_mouse"), i.mouseUsed = !0, Bb("mouseUsed")), Mb = setTimeout(function() {
                    Mb = null
                }, 100)
            },
            Ob = function() {
                e.bind(document, "keydown", f), O.transform && e.bind(f.scrollWrap, "click", f), i.mouseUsed || e.bind(document, "mousemove", Nb), e.bind(window, "resize scroll", f), Bb("bindEvents")
            },
            Pb = function() {
                e.unbind(window, "resize", f), e.unbind(window, "scroll", r.scroll), e.unbind(document, "keydown", f), e.unbind(document, "mousemove", Nb), O.transform && e.unbind(f.scrollWrap, "click", f), V && e.unbind(window, p, f), Bb("unbindEvents")
            },
            Qb = function(a, b) {
                var c = gd(f.currItem, qb, a);
                return b && (db = c), c
            },
            Rb = function(a) {
                return a || (a = f.currItem), a.initialZoomLevel
            },
            Sb = function(a) {
                return a || (a = f.currItem), a.w > 0 ? i.maxSpreadZoom : 1
            },
            Tb = function(a, b, c, d) {
                return d === f.currItem.initialZoomLevel ? (c[a] = f.currItem.initialPosition[a], !0) : (c[a] = Jb(a, d), c[a] > b.min[a] ? (c[a] = b.min[a], !0) : c[a] < b.max[a] ? (c[a] = b.max[a], !0) : !1)
            },
            Ub = function() {
                if (F) {
                    var b = O.perspective && !H;
                    return u = "translate" + (b ? "3d(" : "("), void(v = O.perspective ? ", 0px)" : ")")
                }
                F = "left", e.addClass(a, "pswp--ie"), Hb = function(a, b) {
                    b.left = a + "px"
                }, Gb = function(a) {
                    var b = a.container.style,
                        c = a.fitRatio * a.w,
                        d = a.fitRatio * a.h;
                    b.width = c + "px", b.height = d + "px", b.left = a.initialPosition.x + "px", b.top = a.initialPosition.y + "px"
                }, Fb = function() {
                    if (eb) {
                        var a = eb,
                            b = f.currItem,
                            c = b.fitRatio * b.w,
                            d = b.fitRatio * b.h;
                        a.width = c + "px", a.height = d + "px", a.left = pb.x + "px", a.top = pb.y + "px"
                    }
                }
            },
            Vb = function(a) {
                var b = "";
                i.escKey && 27 === a.keyCode ? b = "close" : i.arrowKeys && (37 === a.keyCode ? b = "prev" : 39 === a.keyCode && (b = "next")), b && (a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || (a.preventDefault ? a.preventDefault() : a.returnValue = !1, f[b]()))
            },
            Wb = function(a) {
                a && (Y || X || fb || T) && (a.preventDefault(), a.stopPropagation())
            },
            Xb = function() {
                f.setScrollOffset(0, e.getScrollY())
            },
            Yb = {},
            Zb = 0,
            $b = function(a) {
                Yb[a] && (Yb[a].raf && J(Yb[a].raf), Zb--, delete Yb[a])
            },
            _b = function(a) {
                Yb[a] && $b(a), Yb[a] || (Zb++, Yb[a] = {})
            },
            ac = function() {
                for (var a in Yb) Yb.hasOwnProperty(a) && $b(a)
            },
            bc = function(a, b, c, d, e, f, g) {
                var h, i = Cb();
                _b(a);
                var j = function() {
                    if (Yb[a]) {
                        if (h = Cb() - i, h >= d) return $b(a), f(c), void(g && g());
                        f((c - b) * e(h / d) + b), Yb[a].raf = I(j)
                    }
                };
                j()
            },
            cc = {
                shout: Bb,
                listen: Ab,
                viewportSize: qb,
                options: i,
                isMainScrollAnimating: function() {
                    return fb
                },
                getZoomLevel: function() {
                    return s
                },
                getCurrentIndex: function() {
                    return m
                },
                isDragging: function() {
                    return V
                },
                isZooming: function() {
                    return ab
                },
                setScrollOffset: function(a, b) {
                    y.x = a, N = y.y = b
                },
                applyZoomPan: function(a, b, c) {
                    pb.x = b, pb.y = c, s = a, Fb()
                },
                init: function() {
                    if (!j && !k) {
                        var c;
                        f.framework = e, f.template = a, f.bg = e.getChildByClass(a, "pswp__bg"), K = a.className, j = !0, O = e.detectFeatures(), I = O.raf, J = O.caf, F = O.transform, M = O.oldIE, f.scrollWrap = e.getChildByClass(a, "pswp__scroll-wrap"), f.container = e.getChildByClass(f.scrollWrap, "pswp__container"), n = f.container.style, f.itemHolders = z = [{
                            el: f.container.children[0],
                            wrap: 0,
                            index: -1
                        }, {
                            el: f.container.children[1],
                            wrap: 0,
                            index: -1
                        }, {
                            el: f.container.children[2],
                            wrap: 0,
                            index: -1
                        }], z[0].el.style.display = z[2].el.style.display = "none", Ub(), r = {
                            resize: f.updateSize,
                            scroll: Xb,
                            keydown: Vb,
                            click: Wb
                        };
                        var d = O.isOldIOSPhone || O.isOldAndroid || O.isMobileOpera;
                        for (O.animationName && O.transform && !d || (i.showAnimationDuration = i.hideAnimationDuration = 0), c = 0; c < vb.length; c++) f["init" + vb[c]]();
                        if (b) {
                            var g = f.ui = new b(f, e);
                            g.init()
                        }
                        Bb("firstUpdate"), m = m || i.index || 0, (isNaN(m) || 0 > m || m >= $c()) && (m = 0), f.currItem = Zc(m), (O.isOldIOSPhone || O.isOldAndroid) && (ub = !1), i.modal && (a.setAttribute("aria-hidden", "false"), ub ? a.style.position = "fixed" : (a.style.position = "absolute", a.style.top = e.getScrollY() + "px")), void 0 === N && (Bb("initialLayout"), N = L = e.getScrollY());
                        var l = "pswp--open ";
                        for (i.mainClass && (l += i.mainClass + " "), i.showHideOpacity && (l += "pswp--animate_opacity "), l += H ? "pswp--touch" : "pswp--notouch", l += O.animationName ? " pswp--css_animation" : "", l += O.svg ? " pswp--svg" : "", e.addClass(a, l), f.updateSize(), o = -1, tb = null, c = 0; h > c; c++) Hb((c + o) * sb.x, z[c].el.style);
                        M || e.bind(f.scrollWrap, q, f), Ab("initialZoomInEnd", function() {
                            f.setContent(z[0], m - 1), f.setContent(z[2], m + 1), z[0].el.style.display = z[2].el.style.display = "block", i.focus && a.focus(), Ob()
                        }), f.setContent(z[1], m), f.updateCurrItem(), Bb("afterInit"), ub || (w = setInterval(function() {
                            Zb || V || ab || s !== f.currItem.initialZoomLevel || f.updateSize()
                        }, 1e3)), e.addClass(a, "pswp--visible")
                    }
                },
                close: function() {
                    j && (j = !1, k = !0, Bb("close"), Pb(), ad(f.currItem, null, !0, f.destroy))
                },
                destroy: function() {
                    Bb("destroy"), Vc && clearTimeout(Vc), i.modal && (a.setAttribute("aria-hidden", "true"), a.className = K), w && clearInterval(w), e.unbind(f.scrollWrap, q, f), e.unbind(window, "scroll", f), xc(), ac(), zb = null
                },
                panTo: function(a, b, c) {
                    c || (a > db.min.x ? a = db.min.x : a < db.max.x && (a = db.max.x), b > db.min.y ? b = db.min.y : b < db.max.y && (b = db.max.y)), pb.x = a, pb.y = b, Fb()
                },
                handleEvent: function(a) {
                    a = a || window.event, r[a.type] && r[a.type](a)
                },
                goTo: function(a) {
                    a = yb(a);
                    var b = a - m;
                    tb = b, m = a, f.currItem = Zc(m), rb -= b, Ib(sb.x * rb), ac(), fb = !1, f.updateCurrItem()
                },
                next: function() {
                    f.goTo(m + 1)
                },
                prev: function() {
                    f.goTo(m - 1)
                },
                updateCurrZoomItem: function(a) {
                    if (a && Bb("beforeChange", 0), z[1].el.children.length) {
                        var b = z[1].el.children[0];
                        eb = e.hasClass(b, "pswp__zoom-wrap") ? b.style : null
                    } else eb = null;
                    db = f.currItem.bounds, t = s = f.currItem.initialZoomLevel, pb.x = db.center.x, pb.y = db.center.y, a && Bb("afterChange")
                },
                invalidateCurrItems: function() {
                    x = !0;
                    for (var a = 0; h > a; a++) z[a].item && (z[a].item.needsUpdate = !0)
                },
                updateCurrItem: function(a) {
                    if (0 !== tb) {
                        var b, c = Math.abs(tb);
                        if (!(a && 2 > c)) {
                            f.currItem = Zc(m), Bb("beforeChange", tb), c >= h && (o += tb + (tb > 0 ? -h : h), c = h);
                            for (var d = 0; c > d; d++) tb > 0 ? (b = z.shift(), z[h - 1] = b, o++, Hb((o + 2) * sb.x, b.el.style), f.setContent(b, m - c + d + 1 + 1)) : (b = z.pop(), z.unshift(b), o--, Hb(o * sb.x, b.el.style), f.setContent(b, m + c - d - 1 - 1));
                            if (eb && 1 === Math.abs(tb)) {
                                var e = Zc(A);
                                e.initialZoomLevel !== s && (gd(e, qb), Gb(e))
                            }
                            tb = 0, f.updateCurrZoomItem(), A = m, Bb("afterChange")
                        }
                    }
                },
                updateSize: function(b) {
                    if (!ub) {
                        var c = e.getScrollY();
                        if (N !== c && (a.style.top = c + "px", N = c), !b && wb.x === window.innerWidth && wb.y === window.innerHeight) return;
                        wb.x = window.innerWidth, wb.y = window.innerHeight, a.style.height = wb.y + "px"
                    }
                    if (qb.x = f.scrollWrap.clientWidth, qb.y = f.scrollWrap.clientHeight, y = {
                            x: 0,
                            y: N
                        }, sb.x = qb.x + Math.round(qb.x * i.spacing), sb.y = qb.y, Ib(sb.x * rb), Bb("beforeResize"), void 0 !== o) {
                        for (var d, g, j, k = 0; h > k; k++) d = z[k], Hb((k + o) * sb.x, d.el.style), j = m + k - 1, i.loop && $c() > 2 && (j = yb(j)), g = Zc(j), g && (x || g.needsUpdate || !g.bounds) ? (f.cleanSlide(g), f.setContent(d, j), 1 === k && (f.currItem = g, f.updateCurrZoomItem(!0)), g.needsUpdate = !1) : -1 === d.index && j >= 0 && f.setContent(d, j), g && g.container && (gd(g, qb), Gb(g));
                        x = !1
                    }
                    t = s = f.currItem.initialZoomLevel, db = f.currItem.bounds, db && (pb.x = db.center.x, pb.y = db.center.y, Fb()), Bb("resize")
                },
                zoomTo: function(a, b, c, d, f) {
                    b && (t = s, sc.x = Math.abs(b.x) - pb.x, sc.y = Math.abs(b.y) - pb.y, Kb(ob, pb));
                    var g = Qb(a, !1),
                        h = {};
                    Tb("x", g, h, a), Tb("y", g, h, a);
                    var i = s,
                        j = {
                            x: pb.x,
                            y: pb.y
                        };
                    Lb(h);
                    var k = function(b) {
                        1 === b ? (s = a, pb.x = h.x, pb.y = h.y) : (s = (a - i) * b + i, pb.x = (h.x - j.x) * b + j.x, pb.y = (h.y - j.y) * b + j.y), f && f(b), Fb()
                    };
                    c ? bc("customZoomTo", 0, 1, c, d || e.easing.sine.inOut, k) : k(1)
                }
            },
            dc = 30,
            ec = 10,
            fc = {},
            gc = {},
            hc = {},
            ic = {},
            jc = {},
            kc = [],
            lc = {},
            mc = [],
            nc = {},
            oc = 0,
            pc = mb(),
            qc = 0,
            rc = mb(),
            sc = mb(),
            tc = mb(),
            uc = function(a, b) {
                return a.x === b.x && a.y === b.y
            },
            vc = function(a, b) {
                return Math.abs(a.x - b.x) < g && Math.abs(a.y - b.y) < g
            },
            wc = function(a, b) {
                return nc.x = Math.abs(a.x - b.x), nc.y = Math.abs(a.y - b.y), Math.sqrt(nc.x * nc.x + nc.y * nc.y)
            },
            xc = function() {
                Z && (J(Z), Z = null)
            },
            yc = function() {
                V && (Z = I(yc), Oc())
            },
            zc = function() {
                return !("fit" === i.scaleMode && s === f.currItem.initialZoomLevel)
            },
            Ac = function(a, b) {
                return a ? a.className && a.className.indexOf("pswp__scroll-wrap") > -1 ? !1 : b(a) ? a : Ac(a.parentNode, b) : !1
            },
            Bc = {},
            Cc = function(a, b) {
                return Bc.prevent = !Ac(a.target, i.isClickableElement), Bb("preventDragEvent", a, b, Bc), Bc.prevent
            },
            Dc = function(a, b) {
                return b.x = a.pageX, b.y = a.pageY, b.id = a.identifier, b
            },
            Ec = function(a, b, c) {
                c.x = .5 * (a.x + b.x), c.y = .5 * (a.y + b.y)
            },
            Fc = function(a, b, c) {
                if (a - Q > 50) {
                    var d = mc.length > 2 ? mc.shift() : {};
                    d.x = b, d.y = c, mc.push(d), Q = a
                }
            },
            Gc = function() {
                var a = pb.y - f.currItem.initialPosition.y;
                return 1 - Math.abs(a / (qb.y / 2))
            },
            Hc = {},
            Ic = {},
            Jc = [],
            Kc = function(a) {
                for (; Jc.length > 0;) Jc.pop();
                return G ? (lb = 0, kc.forEach(function(a) {
                    0 === lb ? Jc[0] = a : 1 === lb && (Jc[1] = a), lb++
                })) : a.type.indexOf("touch") > -1 ? a.touches && a.touches.length > 0 && (Jc[0] = Dc(a.touches[0], Hc), a.touches.length > 1 && (Jc[1] = Dc(a.touches[1], Ic))) : (Hc.x = a.pageX, Hc.y = a.pageY, Hc.id = "", Jc[0] = Hc), Jc
            },
            Lc = function(a, b) {
                var c, d, e, g, h = 0,
                    j = pb[a] + b[a],
                    k = b[a] > 0,
                    l = rc.x + b.x,
                    m = rc.x - lc.x;
                return c = j > db.min[a] || j < db.max[a] ? i.panEndFriction : 1, j = pb[a] + b[a] * c, !i.allowPanToNext && s !== f.currItem.initialZoomLevel || (eb ? "h" !== gb || "x" !== a || X || (k ? (j > db.min[a] && (c = i.panEndFriction, h = db.min[a] - j, d = db.min[a] - ob[a]), (0 >= d || 0 > m) && $c() > 1 ? (g = l, 0 > m && l > lc.x && (g = lc.x)) : db.min.x !== db.max.x && (e = j)) : (j < db.max[a] && (c = i.panEndFriction, h = j - db.max[a], d = ob[a] - db.max[a]), (0 >= d || m > 0) && $c() > 1 ? (g = l, m > 0 && l < lc.x && (g = lc.x)) : db.min.x !== db.max.x && (e = j))) : g = l, "x" !== a) ? void(fb || $ || s > f.currItem.fitRatio && (pb[a] += b[a] * c)) : (void 0 !== g && (Ib(g, !0), $ = g === lc.x ? !1 : !0), db.min.x !== db.max.x && (void 0 !== e ? pb.x = e : $ || (pb.x += b.x * c)), void 0 !== g)
            },
            Mc = function(a) {
                if (!("mousedown" === a.type && a.button > 0)) {
                    if (Yc) return void a.preventDefault();
                    if (!U || "mousedown" !== a.type) {
                        if (Cc(a, !0) && a.preventDefault(), Bb("pointerDown"), G) {
                            var b = e.arraySearch(kc, a.pointerId, "id");
                            0 > b && (b = kc.length), kc[b] = {
                                x: a.pageX,
                                y: a.pageY,
                                id: a.pointerId
                            }
                        }
                        var c = Kc(a),
                            d = c.length;
                        _ = null, ac(), V && 1 !== d || (V = hb = !0, e.bind(window, p, f), S = kb = ib = T = $ = Y = W = X = !1, gb = null, Bb("firstTouchStart", c), Kb(ob, pb), nb.x = nb.y = 0, Kb(ic, c[0]), Kb(jc, ic), lc.x = sb.x * rb, mc = [{
                            x: ic.x,
                            y: ic.y
                        }], Q = P = Cb(), Qb(s, !0), xc(), yc()), !ab && d > 1 && !fb && !$ && (t = s, X = !1, ab = W = !0, nb.y = nb.x = 0, Kb(ob, pb), Kb(fc, c[0]), Kb(gc, c[1]), Ec(fc, gc, tc), sc.x = Math.abs(tc.x) - pb.x, sc.y = Math.abs(tc.y) - pb.y, bb = cb = wc(fc, gc))
                    }
                }
            },
            Nc = function(a) {
                if (a.preventDefault(), G) {
                    var b = e.arraySearch(kc, a.pointerId, "id");
                    if (b > -1) {
                        var c = kc[b];
                        c.x = a.pageX, c.y = a.pageY
                    }
                }
                if (V) {
                    var d = Kc(a);
                    if (gb || Y || ab) _ = d;
                    else {
                        var f = Math.abs(d[0].x - ic.x) - Math.abs(d[0].y - ic.y);
                        Math.abs(f) >= ec && (gb = f > 0 ? "h" : "v", _ = d)
                    }
                }
            },
            Oc = function() {
                if (_) {
                    var a = _.length;
                    if (0 !== a)
                        if (Kb(fc, _[0]), hc.x = fc.x - ic.x, hc.y = fc.y - ic.y, ab && a > 1) {
                            if (ic.x = fc.x, ic.y = fc.y, !hc.x && !hc.y && uc(_[1], gc)) return;
                            Kb(gc, _[1]), X || (X = !0, Bb("zoomGestureStarted"));
                            var b = wc(fc, gc),
                                c = Tc(b);
                            c > f.currItem.initialZoomLevel + f.currItem.initialZoomLevel / 15 && (kb = !0);
                            var d = 1,
                                e = Rb(),
                                g = Sb();
                            if (e > c)
                                if (i.pinchToClose && !kb && t <= f.currItem.initialZoomLevel) {
                                    var h = e - c,
                                        j = 1 - h / (e / 1.2);
                                    Db(j), Bb("onPinchClose", j), ib = !0
                                } else d = (e - c) / e, d > 1 && (d = 1), c = e - d * (e / 3);
                            else c > g && (d = (c - g) / (6 * e), d > 1 && (d = 1), c = g + d * e);
                            0 > d && (d = 0), bb = b, Ec(fc, gc, pc), nb.x += pc.x - tc.x, nb.y += pc.y - tc.y, Kb(tc, pc), pb.x = Jb("x", c), pb.y = Jb("y", c), S = c > s, s = c, Fb()
                        } else {
                            if (!gb) return;
                            if (hb && (hb = !1, Math.abs(hc.x) >= ec && (hc.x -= _[0].x - jc.x), Math.abs(hc.y) >= ec && (hc.y -= _[0].y - jc.y)), ic.x = fc.x, ic.y = fc.y, 0 === hc.x && 0 === hc.y) return;
                            if ("v" === gb && i.closeOnVerticalDrag && !zc()) {
                                nb.y += hc.y, pb.y += hc.y;
                                var k = Gc();
                                return T = !0, Bb("onVerticalDrag", k), Db(k), void Fb()
                            }
                            Fc(Cb(), fc.x, fc.y), Y = !0, db = f.currItem.bounds;
                            var l = Lc("x", hc);
                            l || (Lc("y", hc), Lb(pb), Fb())
                        }
                }
            },
            Pc = function(a) {
                if (O.isOldAndroid) {
                    if (U && "mouseup" === a.type) return;
                    a.type.indexOf("touch") > -1 && (clearTimeout(U), U = setTimeout(function() {
                        U = 0
                    }, 600))
                }
                Bb("pointerUp"), Cc(a, !1) && a.preventDefault();
                var b;
                if (G) {
                    var c = e.arraySearch(kc, a.pointerId, "id");
                    if (c > -1)
                        if (b = kc.splice(c, 1)[0], navigator.pointerEnabled) b.type = a.pointerType || "mouse";
                        else {
                            var d = {
                                4: "mouse",
                                2: "touch",
                                3: "pen"
                            };
                            b.type = d[a.pointerType], b.type || (b.type = a.pointerType || "mouse")
                        }
                }
                var g, h = Kc(a),
                    i = h.length;
                if ("mouseup" === a.type && (i = 0), 2 === i) return _ = null, !0;
                1 === i && Kb(jc, h[0]), 0 !== i || gb || fb || (b || ("mouseup" === a.type ? b = {
                    x: a.pageX,
                    y: a.pageY,
                    type: "mouse"
                } : a.changedTouches && a.changedTouches[0] && (b = {
                    x: a.changedTouches[0].pageX,
                    y: a.changedTouches[0].pageY,
                    type: "touch"
                })), Bb("touchRelease", a, b));
                var j = -1;
                if (0 === i && (V = !1, e.unbind(window, p, f), xc(), ab ? j = 0 : -1 !== qc && (j = Cb() - qc)), qc = 1 === i ? Cb() : -1, g = -1 !== j && 150 > j ? "zoom" : "swipe", ab && 2 > i && (ab = !1, 1 === i && (g = "zoomPointerUp"), Bb("zoomGestureEnded")), _ = null, Y || X || fb || T)
                    if (ac(), R || (R = Qc()), R.calculateSwipeSpeed("x"), T) {
                        var k = Gc();
                        if (.6 > k) f.close();
                        else {
                            var l = pb.y,
                                m = jb;
                            bc("verticalDrag", 0, 1, 300, e.easing.cubic.out, function(a) {
                                pb.y = (f.currItem.initialPosition.y - l) * a + l, Db((1 - m) * a + m), Fb()
                            }), Bb("onVerticalDrag", 1)
                        }
                    } else {
                        if (($ || fb) && 0 === i) {
                            var n = Sc(g, R);
                            if (n) return;
                            g = "zoomPointerUp"
                        }
                        if (!fb) return "swipe" !== g ? void Uc() : void(!$ && s > f.currItem.fitRatio && Rc(R))
                    }
            },
            Qc = function() {
                var a, b, c = {
                    lastFlickOffset: {},
                    lastFlickDist: {},
                    lastFlickSpeed: {},
                    slowDownRatio: {},
                    slowDownRatioReverse: {},
                    speedDecelerationRatio: {},
                    speedDecelerationRatioAbs: {},
                    distanceOffset: {},
                    backAnimDestination: {},
                    backAnimStarted: {},
                    calculateSwipeSpeed: function(d) {
                        mc.length > 1 ? (a = Cb() - Q + 50, b = mc[mc.length - 2][d]) : (a = Cb() - P, b = jc[d]), c.lastFlickOffset[d] = ic[d] - b, c.lastFlickDist[d] = Math.abs(c.lastFlickOffset[d]), c.lastFlickSpeed[d] = c.lastFlickDist[d] > 20 ? c.lastFlickOffset[d] / a : 0, Math.abs(c.lastFlickSpeed[d]) < .1 && (c.lastFlickSpeed[d] = 0), c.slowDownRatio[d] = .95, c.slowDownRatioReverse[d] = 1 - c.slowDownRatio[d], c.speedDecelerationRatio[d] = 1
                    },
                    calculateOverBoundsAnimOffset: function(a, b) {
                        c.backAnimStarted[a] || (pb[a] > db.min[a] ? c.backAnimDestination[a] = db.min[a] : pb[a] < db.max[a] && (c.backAnimDestination[a] = db.max[a]), void 0 !== c.backAnimDestination[a] && (c.slowDownRatio[a] = .7, c.slowDownRatioReverse[a] = 1 - c.slowDownRatio[a], c.speedDecelerationRatioAbs[a] < .05 && (c.lastFlickSpeed[a] = 0, c.backAnimStarted[a] = !0, bc("bounceZoomPan" + a, pb[a], c.backAnimDestination[a], b || 300, e.easing.sine.out, function(b) {
                            pb[a] = b, Fb()
                        }))))
                    },
                    calculateAnimOffset: function(a) {
                        c.backAnimStarted[a] || (c.speedDecelerationRatio[a] = c.speedDecelerationRatio[a] * (c.slowDownRatio[a] + c.slowDownRatioReverse[a] - c.slowDownRatioReverse[a] * c.timeDiff / 10), c.speedDecelerationRatioAbs[a] = Math.abs(c.lastFlickSpeed[a] * c.speedDecelerationRatio[a]), c.distanceOffset[a] = c.lastFlickSpeed[a] * c.speedDecelerationRatio[a] * c.timeDiff, pb[a] += c.distanceOffset[a])
                    },
                    panAnimLoop: function() {
                        return Yb.zoomPan && (Yb.zoomPan.raf = I(c.panAnimLoop), c.now = Cb(), c.timeDiff = c.now - c.lastNow, c.lastNow = c.now, c.calculateAnimOffset("x"), c.calculateAnimOffset("y"), Fb(), c.calculateOverBoundsAnimOffset("x"), c.calculateOverBoundsAnimOffset("y"), c.speedDecelerationRatioAbs.x < .05 && c.speedDecelerationRatioAbs.y < .05) ? (pb.x = Math.round(pb.x), pb.y = Math.round(pb.y), Fb(), void $b("zoomPan")) : void 0
                    }
                };
                return c
            },
            Rc = function(a) {
                return a.calculateSwipeSpeed("y"), db = f.currItem.bounds, a.backAnimDestination = {}, a.backAnimStarted = {}, Math.abs(a.lastFlickSpeed.x) <= .05 && Math.abs(a.lastFlickSpeed.y) <= .05 ? (a.speedDecelerationRatioAbs.x = a.speedDecelerationRatioAbs.y = 0, a.calculateOverBoundsAnimOffset("x"), a.calculateOverBoundsAnimOffset("y"), !0) : (_b("zoomPan"), a.lastNow = Cb(), void a.panAnimLoop())
            },
            Sc = function(a, b) {
                var c;
                fb || (oc = m);
                var d;
                if ("swipe" === a) {
                    var g = ic.x - jc.x,
                        h = b.lastFlickDist.x < 10;
                    g > dc && (h || b.lastFlickOffset.x > 20) ? d = -1 : -dc > g && (h || b.lastFlickOffset.x < -20) && (d = 1)
                }
                var j;
                d && (m += d, 0 > m ? (m = i.loop ? $c() - 1 : 0, j = !0) : m >= $c() && (m = i.loop ? 0 : $c() - 1, j = !0), (!j || i.loop) && (tb += d, rb -= d, c = !0));
                var k, l = sb.x * rb,
                    n = Math.abs(l - rc.x);
                return c || l > rc.x == b.lastFlickSpeed.x > 0 ? (k = Math.abs(b.lastFlickSpeed.x) > 0 ? n / Math.abs(b.lastFlickSpeed.x) : 333, k = Math.min(k, 400), k = Math.max(k, 250)) : k = 333, oc === m && (c = !1), fb = !0, Bb("mainScrollAnimStart"), bc("mainScroll", rc.x, l, k, e.easing.cubic.out, Ib, function() {
                    ac(), fb = !1, oc = -1, (c || oc !== m) && f.updateCurrItem(), Bb("mainScrollAnimComplete")
                }), c && f.updateCurrItem(!0), c
            },
            Tc = function(a) {
                return 1 / cb * a * t
            },
            Uc = function() {
                var a = s,
                    b = Rb(),
                    c = Sb();
                b > s ? a = b : s > c && (a = c);
                var d, g = 1,
                    h = jb;
                return ib && !S && !kb && b > s ? (f.close(), !0) : (ib && (d = function(a) {
                    Db((g - h) * a + h)
                }), f.zoomTo(a, 0, 300, e.easing.cubic.out, d), !0)
            };
        xb("Gestures", {
            publicMethods: {
                initGestures: function() {
                    var a = function(a, b, c, d, e) {
                        B = a + b, C = a + c, D = a + d, E = e ? a + e : ""
                    };
                    G = O.pointerEvent, G && O.touch && (O.touch = !1), G ? navigator.pointerEnabled ? a("pointer", "down", "move", "up", "cancel") : a("MSPointer", "Down", "Move", "Up", "Cancel") : O.touch ? (a("touch", "start", "move", "end", "cancel"), H = !0) : a("mouse", "down", "move", "up"), p = C + " " + D + " " + E, q = B, G && !H && (H = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1), f.likelyTouchDevice = H, r[B] = Mc, r[C] = Nc, r[D] = Pc, E && (r[E] = r[D]), O.touch && (q += " mousedown", p += " mousemove mouseup", r.mousedown = r[B], r.mousemove = r[C], r.mouseup = r[D]), H || (i.allowPanToNext = !1)
                }
            }
        });
        var Vc, Wc, Xc, Yc, Zc, $c, _c, ad = function(b, c, d, g) {
                Vc && clearTimeout(Vc), Yc = !0, Xc = !0;
                var h;
                b.initialLayout ? (h = b.initialLayout, b.initialLayout = null) : h = i.getThumbBoundsFn && i.getThumbBoundsFn(m);
                var j = d ? i.hideAnimationDuration : i.showAnimationDuration,
                    k = function() {
                        $b("initialZoom"), d ? (f.template.removeAttribute("style"), f.bg.removeAttribute("style")) : (Db(1), c && (c.style.display = "block"), e.addClass(a, "pswp--animated-in"), Bb("initialZoom" + (d ? "OutEnd" : "InEnd"))), g && g(), Yc = !1
                    };
                if (!j || !h || void 0 === h.x) {
                    var n = function() {
                        Bb("initialZoom" + (d ? "Out" : "In")), s = b.initialZoomLevel, Kb(pb, b.initialPosition), Fb(), a.style.opacity = d ? 0 : 1, Db(1), k()
                    };
                    return void n()
                }
                var o = function() {
                    var c = l,
                        g = !f.currItem.src || f.currItem.loadError || i.showHideOpacity;
                    b.miniImg && (b.miniImg.style.webkitBackfaceVisibility = "hidden"), d || (s = h.w / b.w, pb.x = h.x, pb.y = h.y - L, f[g ? "template" : "bg"].style.opacity = .001, Fb()), _b("initialZoom"), d && !c && e.removeClass(a, "pswp--animated-in"), g && (d ? e[(c ? "remove" : "add") + "Class"](a, "pswp--animate_opacity") : setTimeout(function() {
                        e.addClass(a, "pswp--animate_opacity")
                    }, 30)), Vc = setTimeout(function() {
                        if (Bb("initialZoom" + (d ? "Out" : "In")), d) {
                            var f = h.w / b.w,
                                i = {
                                    x: pb.x,
                                    y: pb.y
                                },
                                l = s,
                                m = jb,
                                n = function(b) {
                                    1 === b ? (s = f, pb.x = h.x, pb.y = h.y - N) : (s = (f - l) * b + l, pb.x = (h.x - i.x) * b + i.x, pb.y = (h.y - N - i.y) * b + i.y), Fb(), g ? a.style.opacity = 1 - b : Db(m - b * m)
                                };
                            c ? bc("initialZoom", 0, 1, j, e.easing.cubic.out, n, k) : (n(1), Vc = setTimeout(k, j + 20))
                        } else s = b.initialZoomLevel, Kb(pb, b.initialPosition), Fb(), Db(1), g ? a.style.opacity = 1 : Db(1), Vc = setTimeout(k, j + 20)
                    }, d ? 25 : 90)
                };
                o()
            },
            bd = {},
            cd = [],
            dd = {
                index: 0,
                errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                forceProgressiveLoading: !1,
                preload: [1, 1],
                getNumItemsFn: function() {
                    return Wc.length
                }
            },
            ed = function() {
                return {
                    center: {
                        x: 0,
                        y: 0
                    },
                    max: {
                        x: 0,
                        y: 0
                    },
                    min: {
                        x: 0,
                        y: 0
                    }
                }
            },
            fd = function(a, b, c) {
                var d = a.bounds;
                d.center.x = Math.round((bd.x - b) / 2), d.center.y = Math.round((bd.y - c) / 2) + a.vGap.top, d.max.x = b > bd.x ? Math.round(bd.x - b) : d.center.x, d.max.y = c > bd.y ? Math.round(bd.y - c) + a.vGap.top : d.center.y, d.min.x = b > bd.x ? 0 : d.center.x, d.min.y = c > bd.y ? a.vGap.top : d.center.y
            },
            gd = function(a, b, c) {
                if (a.src && !a.loadError) {
                    var d = !c;
                    if (d && (a.vGap || (a.vGap = {
                            top: 0,
                            bottom: 0
                        }), Bb("parseVerticalMargin", a)), bd.x = b.x, bd.y = b.y - a.vGap.top - a.vGap.bottom, d) {
                        var e = bd.x / a.w,
                            f = bd.y / a.h;
                        a.fitRatio = f > e ? e : f;
                        var g = i.scaleMode;
                        "orig" === g ? c = 1 : "fit" === g && (c = a.fitRatio), c > 1 && (c = 1), a.initialZoomLevel = c, a.bounds || (a.bounds = ed())
                    }
                    if (!c) return;
                    return fd(a, a.w * c, a.h * c), d && c === a.initialZoomLevel && (a.initialPosition = a.bounds.center), a.bounds
                }
                return a.w = a.h = 0, a.initialZoomLevel = a.fitRatio = 1, a.bounds = ed(), a.initialPosition = a.bounds.center, a.bounds
            },
            hd = function(a, b, c, d, e, g) {
                if (!b.loadError) {
                    var h, j = f.isDragging() && !f.isZooming(),
                        k = a === m || f.isMainScrollAnimating() || j;
                    !e && (H || i.alwaysFadeIn) && k && (h = !0), d && (h && (d.style.opacity = 0), b.imageAppended = !0, c.appendChild(d), h && setTimeout(function() {
                        d.style.opacity = 1, g && setTimeout(function() {
                            b && b.loaded && b.placeholder && (b.placeholder.style.display = "none", b.placeholder = null)
                        }, 500)
                    }, 50))
                }
            },
            id = function(a) {
                a.loading = !0, a.loaded = !1;
                var b = a.img = e.createEl("pswp__img", "img"),
                    c = function() {
                        a.loading = !1, a.loaded = !0, a.loadComplete ? a.loadComplete(a) : a.img = null, b.onload = b.onerror = null, b = null
                    };
                return b.onload = c, b.onerror = function() {
                    a.loadError = !0, c()
                }, b.src = a.src, b
            },
            jd = function(a, b) {
                return a.src && a.loadError && a.container ? (b && (a.container.innerHTML = ""), a.container.innerHTML = i.errorMsg.replace("%url%", a.src), !0) : void 0
            },
            kd = function() {
                if (cd.length) {
                    for (var a, b = 0; b < cd.length; b++) a = cd[b], a.holder.index === a.index && hd(a.index, a.item, a.baseDiv, a.img);
                    cd = []
                }
            };
        xb("Controller", {
            publicMethods: {
                lazyLoadItem: function(a) {
                    a = yb(a);
                    var b = Zc(a);
                    b && b.src && !b.loaded && !b.loading && (Bb("gettingData", a, b), id(b))
                },
                initController: function() {
                    e.extend(i, dd, !0), f.items = Wc = c, Zc = f.getItemAt, $c = i.getNumItemsFn, _c = i.loop, $c() < 3 && (i.loop = !1), Ab("beforeChange", function(a) {
                        var b, c = i.preload,
                            d = null === a ? !0 : a > 0,
                            e = Math.min(c[0], $c()),
                            g = Math.min(c[1], $c());
                        for (b = 1;
                             (d ? g : e) >= b; b++) f.lazyLoadItem(m + b);
                        for (b = 1;
                             (d ? e : g) >= b; b++) f.lazyLoadItem(m - b)
                    }), Ab("initialLayout", function() {
                        f.currItem.initialLayout = i.getThumbBoundsFn && i.getThumbBoundsFn(m)
                    }), Ab("mainScrollAnimComplete", kd), Ab("initialZoomInEnd", kd), Ab("destroy", function() {
                        for (var a, b = 0; b < Wc.length; b++) a = Wc[b], a.container && (a.container = null), a.placeholder && (a.placeholder = null), a.img && (a.img = null), a.preloader && (a.preloader = null), a.loadError && (a.loaded = a.loadError = !1);
                        cd = null
                    })
                },
                getItemAt: function(a) {
                    return a >= 0 && void 0 !== Wc[a] ? Wc[a] : !1
                },
                allowProgressiveImg: function() {
                    return i.forceProgressiveLoading || !H || i.mouseUsed || screen.width > 1200
                },
                setContent: function(a, b) {
                    i.loop && (b = yb(b));
                    var c = f.getItemAt(a.index);
                    c && (c.container = null);
                    var d, g = f.getItemAt(b);
                    if (!g) return void(a.el.innerHTML = "");
                    Bb("gettingData", b, g), a.index = b, a.item = g;
                    var h = g.container = e.createEl("pswp__zoom-wrap");
                    if (!g.src && g.html && (g.html.tagName ? h.appendChild(g.html) : h.innerHTML = g.html), jd(g), !g.src || g.loadError || g.loaded) g.src && !g.loadError && (d = e.createEl("pswp__img", "img"), d.style.webkitBackfaceVisibility = "hidden", d.style.opacity = 1, d.src = g.src, hd(b, g, h, d, !0));
                    else {
                        if (g.loadComplete = function(c) {
                                if (j) {
                                    if (c.img && (c.img.style.webkitBackfaceVisibility = "hidden"), a && a.index === b) {
                                        if (jd(c, !0)) return c.loadComplete = c.img = null, gd(c, qb), Gb(c), void(a.index === m && f.updateCurrZoomItem());
                                        c.imageAppended ? !Yc && c.placeholder && (c.placeholder.style.display = "none", c.placeholder = null) : O.transform && (fb || Yc) ? cd.push({
                                            item: c,
                                            baseDiv: h,
                                            img: c.img,
                                            index: b,
                                            holder: a
                                        }) : hd(b, c, h, c.img, fb || Yc)
                                    }
                                    c.loadComplete = null, c.img = null, Bb("imageLoadComplete", b, c)
                                }
                            }, e.features.transform) {
                            var k = "pswp__img pswp__img--placeholder";
                            k += g.msrc ? "" : " pswp__img--placeholder--blank";
                            var l = e.createEl(k, g.msrc ? "img" : "");
                            g.msrc && (l.src = g.msrc), l.style.width = g.w + "px", l.style.height = g.h + "px", h.appendChild(l), g.placeholder = l
                        }
                        g.loading || id(g), f.allowProgressiveImg() && (!Xc && O.transform ? cd.push({
                            item: g,
                            baseDiv: h,
                            img: g.img,
                            index: b,
                            holder: a
                        }) : hd(b, g, h, g.img, !0, !0))
                    }
                    gd(g, qb), Xc || b !== m ? Gb(g) : (eb = h.style, ad(g, d || g.img)), a.el.innerHTML = "", a.el.appendChild(h)
                },
                cleanSlide: function(a) {
                    a.img && (a.img.onload = a.img.onerror = null), a.loaded = a.loading = a.img = a.imageAppended = !1
                }
            }
        });
        var ld, md = {},
            nd = function(a, b, c) {
                var d = document.createEvent("CustomEvent"),
                    e = {
                        origEvent: a,
                        target: a.target,
                        releasePoint: b,
                        pointerType: c || "touch"
                    };
                d.initCustomEvent("pswpTap", !0, !0, e), a.target.dispatchEvent(d)
            };
        xb("Tap", {
            publicMethods: {
                initTap: function() {
                    Ab("firstTouchStart", f.onTapStart), Ab("touchRelease", f.onTapRelease), Ab("destroy", function() {
                        md = {}, ld = null
                    })
                },
                onTapStart: function(a) {
                    a.length > 1 && (clearTimeout(ld), ld = null)
                },
                onTapRelease: function(a, b) {
                    if (b && !Y && !W && !Zb) {
                        var c = b;
                        if (ld && (clearTimeout(ld), ld = null, vc(c, md))) return void Bb("doubleTap", c);
                        if ("mouse" === b.type) return void nd(a, b, "mouse");
                        var d = a.target.tagName.toUpperCase();
                        if ("BUTTON" === d || e.hasClass(a.target, "pswp__single-tap")) return void nd(a, b);
                        Kb(md, c), ld = setTimeout(function() {
                            nd(a, b), ld = null
                        }, 300)
                    }
                }
            }
        });
        var od;
        xb("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function() {
                    M || (H ? Ab("mouseUsed", function() {
                        f.setupDesktopZoom()
                    }) : f.setupDesktopZoom(!0))
                },
                setupDesktopZoom: function(b) {
                    od = {};
                    var c = "wheel mousewheel DOMMouseScroll";
                    Ab("bindEvents", function() {
                        e.bind(a, c, f.handleMouseWheel)
                    }), Ab("unbindEvents", function() {
                        od && e.unbind(a, c, f.handleMouseWheel)
                    }), f.mouseZoomedIn = !1;
                    var d, g = function() {
                            f.mouseZoomedIn && (e.removeClass(a, "pswp--zoomed-in"), f.mouseZoomedIn = !1), 1 > s ? e.addClass(a, "pswp--zoom-allowed") : e.removeClass(a, "pswp--zoom-allowed"), h()
                        },
                        h = function() {
                            d && (e.removeClass(a, "pswp--dragging"), d = !1)
                        };
                    Ab("resize", g), Ab("afterChange", g), Ab("pointerDown", function() {
                        f.mouseZoomedIn && (d = !0, e.addClass(a, "pswp--dragging"))
                    }), Ab("pointerUp", h), b || g()
                },
                handleMouseWheel: function(a) {
                    if (s <= f.currItem.fitRatio) return i.closeOnScroll ? F && Math.abs(a.deltaY) > 2 && (l = !0, f.close()) : a.preventDefault(), !0;
                    if (a.preventDefault(), a.stopPropagation(), od.x = 0, "deltaX" in a) od.x = a.deltaX, od.y = a.deltaY;
                    else if ("wheelDelta" in a) a.wheelDeltaX && (od.x = -.16 * a.wheelDeltaX), od.y = a.wheelDeltaY ? -.16 * a.wheelDeltaY : -.16 * a.wheelDelta;
                    else {
                        if (!("detail" in a)) return;
                        od.y = a.detail
                    }
                    Qb(s, !0), f.panTo(pb.x - od.x, pb.y - od.y)
                },
                toggleDesktopZoom: function(b) {
                    b = b || {
                            x: qb.x / 2,
                            y: qb.y / 2 + N
                        };
                    var c = i.getDoubleTapZoom(!0, f.currItem),
                        d = s === c;
                    f.mouseZoomedIn = !d, f.zoomTo(d ? f.currItem.initialZoomLevel : c, b, 333), e[(d ? "remove" : "add") + "Class"](a, "pswp--zoomed-in")
                }
            }
        });
        var pd, qd, rd, sd, td, ud, vd, wd, xd, yd, zd, Ad, Bd = {
                history: !0,
                galleryUID: 1
            },
            Cd = function() {
                return zd.hash.substring(1)
            },
            Dd = function() {
                pd && clearTimeout(pd), rd && clearTimeout(rd)
            },
            Ed = function() {
                var a = Cd(),
                    b = {};
                if (a.length < 5) return b;
                for (var c = a.split("&"), d = 0; d < c.length; d++)
                    if (c[d]) {
                        var e = c[d].split("=");
                        e.length < 2 || (b[e[0]] = e[1])
                    }
                return b.pid = parseInt(b.pid, 10) - 1, b.pid < 0 && (b.pid = 0), b
            },
            Fd = function() {
                if (rd && clearTimeout(rd), Zb || V) return void(rd = setTimeout(Fd, 500));
                sd ? clearTimeout(qd) : sd = !0;
                var a = vd + "&gid=" + i.galleryUID + "&pid=" + (m + 1);
                wd || -1 === zd.hash.indexOf(a) && (yd = !0);
                var b = zd.href.split("#")[0] + "#" + a;
                Ad ? "#" + a !== window.location.hash && history[wd ? "replaceState" : "pushState"]("", document.title, b) : wd ? zd.replace(b) : zd.hash = a, wd = !0, qd = setTimeout(function() {
                    sd = !1
                }, 60)
            };
        xb("History", {
            publicMethods: {
                initHistory: function() {
                    if (e.extend(i, Bd, !0), i.history) {
                        zd = window.location, yd = !1, xd = !1, wd = !1, vd = Cd(), Ad = "pushState" in history, vd.indexOf("gid=") > -1 && (vd = vd.split("&gid=")[0], vd = vd.split("?gid=")[0]), Ab("afterChange", f.updateURL), Ab("unbindEvents", function() {
                            e.unbind(window, "hashchange", f.onHashChange)
                        });
                        var a = function() {
                            ud = !0, xd || (yd ? history.back() : vd ? zd.hash = vd : Ad ? history.pushState("", document.title, zd.pathname + zd.search) : zd.hash = ""), Dd()
                        };
                        Ab("unbindEvents", function() {
                            l && a()
                        }), Ab("destroy", function() {
                            ud || a()
                        }), Ab("firstUpdate", function() {
                            m = Ed().pid
                        });
                        var b = vd.indexOf("pid=");
                        b > -1 && (vd = vd.substring(0, b), "&" === vd.slice(-1) && (vd = vd.slice(0, -1))), setTimeout(function() {
                            j && e.bind(window, "hashchange", f.onHashChange)
                        }, 40)
                    }
                },
                onHashChange: function() {
                    return Cd() === vd ? (xd = !0, void f.close()) : void(sd || (td = !0, f.goTo(Ed().pid), td = !1))
                },
                updateURL: function() {
                    Dd(), td || (wd ? pd = setTimeout(Fd, 800) : Fd())
                }
            }
        }), e.extend(f, cc)
    };
    return a
});

/******************************************************************************/

//! moment.js
//! version : 2.10.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
! function(a, b) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b()
}(this, function() {
    "use strict";

    function a() {
        return Dc.apply(null, arguments)
    }

    function b(a) {
        Dc = a
    }

    function c(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }

    function d(a) {
        return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a)
    }

    function e(a, b) {
        var c, d = [];
        for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
        return d
    }

    function f(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }

    function g(a, b) {
        for (var c in b) f(b, c) && (a[c] = b[c]);
        return f(b, "toString") && (a.toString = b.toString), f(b, "valueOf") && (a.valueOf = b.valueOf), a
    }

    function h(a, b, c, d) {
        return za(a, b, c, d, !0).utc()
    }

    function i() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }

    function j(a) {
        return null == a._pf && (a._pf = i()), a._pf
    }

    function k(a) {
        if (null == a._isValid) {
            var b = j(a);
            a._isValid = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.nullInput && !b.invalidFormat && !b.userInvalidated, a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour)
        }
        return a._isValid
    }

    function l(a) {
        var b = h(0 / 0);
        return null != a ? g(j(b), a) : j(b).userInvalidated = !0, b
    }

    function m(a, b) {
        var c, d, e;
        if ("undefined" != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), "undefined" != typeof b._i && (a._i = b._i), "undefined" != typeof b._f && (a._f = b._f), "undefined" != typeof b._l && (a._l = b._l), "undefined" != typeof b._strict && (a._strict = b._strict), "undefined" != typeof b._tzm && (a._tzm = b._tzm), "undefined" != typeof b._isUTC && (a._isUTC = b._isUTC), "undefined" != typeof b._offset && (a._offset = b._offset), "undefined" != typeof b._pf && (a._pf = j(b)), "undefined" != typeof b._locale && (a._locale = b._locale), Fc.length > 0)
            for (c in Fc) d = Fc[c], e = b[d], "undefined" != typeof e && (a[d] = e);
        return a
    }

    function n(b) {
        m(this, b), this._d = new Date(+b._d), Gc === !1 && (Gc = !0, a.updateOffset(this), Gc = !1)
    }

    function o(a) {
        return a instanceof n || null != a && null != a._isAMomentObject
    }

    function p(a) {
        var b = +a,
            c = 0;
        return 0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)), c
    }

    function q(a, b, c) {
        var d, e = Math.min(a.length, b.length),
            f = Math.abs(a.length - b.length),
            g = 0;
        for (d = 0; e > d; d++)(c && a[d] !== b[d] || !c && p(a[d]) !== p(b[d])) && g++;
        return g + f
    }

    function r() {}

    function s(a) {
        return a ? a.toLowerCase().replace("_", "-") : a
    }

    function t(a) {
        for (var b, c, d, e, f = 0; f < a.length;) {
            for (e = s(a[f]).split("-"), b = e.length, c = s(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
                if (d = u(e.slice(0, b).join("-"))) return d;
                if (c && c.length >= b && q(e, c, !0) >= b - 1) break;
                b--
            }
            f++
        }
        return null
    }

    function u(a) {
        var b = null;
        if (!Hc[a] && "undefined" != typeof module && module && module.exports) try {
            b = Ec._abbr, require("./locale/" + a), v(b)
        } catch (c) {}
        return Hc[a]
    }

    function v(a, b) {
        var c;
        return a && (c = "undefined" == typeof b ? x(a) : w(a, b), c && (Ec = c)), Ec._abbr
    }

    function w(a, b) {
        return null !== b ? (b.abbr = a, Hc[a] || (Hc[a] = new r), Hc[a].set(b), v(a), Hc[a]) : (delete Hc[a], null)
    }

    function x(a) {
        var b;
        if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return Ec;
        if (!c(a)) {
            if (b = u(a)) return b;
            a = [a]
        }
        return t(a)
    }

    function y(a, b) {
        var c = a.toLowerCase();
        Ic[c] = Ic[c + "s"] = Ic[b] = a
    }

    function z(a) {
        return "string" == typeof a ? Ic[a] || Ic[a.toLowerCase()] : void 0
    }

    function A(a) {
        var b, c, d = {};
        for (c in a) f(a, c) && (b = z(c), b && (d[b] = a[c]));
        return d
    }

    function B(b, c) {
        return function(d) {
            return null != d ? (D(this, b, d), a.updateOffset(this, c), this) : C(this, b)
        }
    }

    function C(a, b) {
        return a._d["get" + (a._isUTC ? "UTC" : "") + b]()
    }

    function D(a, b, c) {
        return a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
    }

    function E(a, b) {
        var c;
        if ("object" == typeof a)
            for (c in a) this.set(c, a[c]);
        else if (a = z(a), "function" == typeof this[a]) return this[a](b);
        return this
    }

    function F(a, b, c) {
        for (var d = "" + Math.abs(a), e = a >= 0; d.length < b;) d = "0" + d;
        return (e ? c ? "+" : "" : "-") + d
    }

    function G(a, b, c, d) {
        var e = d;
        "string" == typeof d && (e = function() {
            return this[d]()
        }), a && (Mc[a] = e), b && (Mc[b[0]] = function() {
            return F(e.apply(this, arguments), b[1], b[2])
        }), c && (Mc[c] = function() {
            return this.localeData().ordinal(e.apply(this, arguments), a)
        })
    }

    function H(a) {
        return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
    }

    function I(a) {
        var b, c, d = a.match(Jc);
        for (b = 0, c = d.length; c > b; b++) Mc[d[b]] ? d[b] = Mc[d[b]] : d[b] = H(d[b]);
        return function(e) {
            var f = "";
            for (b = 0; c > b; b++) f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
            return f
        }
    }

    function J(a, b) {
        return a.isValid() ? (b = K(b, a.localeData()), Lc[b] || (Lc[b] = I(b)), Lc[b](a)) : a.localeData().invalidDate()
    }

    function K(a, b) {
        function c(a) {
            return b.longDateFormat(a) || a
        }
        var d = 5;
        for (Kc.lastIndex = 0; d >= 0 && Kc.test(a);) a = a.replace(Kc, c), Kc.lastIndex = 0, d -= 1;
        return a
    }

    function L(a, b, c) {
        _c[a] = "function" == typeof b ? b : function(a) {
            return a && c ? c : b
        }
    }

    function M(a, b) {
        return f(_c, a) ? _c[a](b._strict, b._locale) : new RegExp(N(a))
    }

    function N(a) {
        return a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
            return b || c || d || e
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function O(a, b) {
        var c, d = b;
        for ("string" == typeof a && (a = [a]), "number" == typeof b && (d = function(a, c) {
            c[b] = p(a)
        }), c = 0; c < a.length; c++) ad[a[c]] = d
    }

    function P(a, b) {
        O(a, function(a, c, d, e) {
            d._w = d._w || {}, b(a, d._w, d, e)
        })
    }

    function Q(a, b, c) {
        null != b && f(ad, a) && ad[a](b, c._a, c, a)
    }

    function R(a, b) {
        return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
    }

    function S(a) {
        return this._months[a.month()]
    }

    function T(a) {
        return this._monthsShort[a.month()]
    }

    function U(a, b, c) {
        var d, e, f;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
            if (e = h([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
            if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
            if (!c && this._monthsParse[d].test(a)) return d
        }
    }

    function V(a, b) {
        var c;
        return "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), R(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a)
    }

    function W(b) {
        return null != b ? (V(this, b), a.updateOffset(this, !0), this) : C(this, "Month")
    }

    function X() {
        return R(this.year(), this.month())
    }

    function Y(a) {
        var b, c = a._a;
        return c && -2 === j(a).overflow && (b = c[cd] < 0 || c[cd] > 11 ? cd : c[dd] < 1 || c[dd] > R(c[bd], c[cd]) ? dd : c[ed] < 0 || c[ed] > 24 || 24 === c[ed] && (0 !== c[fd] || 0 !== c[gd] || 0 !== c[hd]) ? ed : c[fd] < 0 || c[fd] > 59 ? fd : c[gd] < 0 || c[gd] > 59 ? gd : c[hd] < 0 || c[hd] > 999 ? hd : -1, j(a)._overflowDayOfYear && (bd > b || b > dd) && (b = dd), j(a).overflow = b), a
    }

    function Z(b) {
        a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b)
    }

    function $(a, b) {
        var c = !0,
            d = a + "\n" + (new Error).stack;
        return g(function() {
            return c && (Z(d), c = !1), b.apply(this, arguments)
        }, b)
    }

    function _(a, b) {
        kd[a] || (Z(b), kd[a] = !0)
    }

    function aa(a) {
        var b, c, d = a._i,
            e = ld.exec(d);
        if (e) {
            for (j(a).iso = !0, b = 0, c = md.length; c > b; b++)
                if (md[b][1].exec(d)) {
                    a._f = md[b][0] + (e[6] || " ");
                    break
                }
            for (b = 0, c = nd.length; c > b; b++)
                if (nd[b][1].exec(d)) {
                    a._f += nd[b][0];
                    break
                }
            d.match(Yc) && (a._f += "Z"), ta(a)
        } else a._isValid = !1
    }

    function ba(b) {
        var c = od.exec(b._i);
        return null !== c ? void(b._d = new Date(+c[1])) : (aa(b), void(b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b))))
    }

    function ca(a, b, c, d, e, f, g) {
        var h = new Date(a, b, c, d, e, f, g);
        return 1970 > a && h.setFullYear(a), h
    }

    function da(a) {
        var b = new Date(Date.UTC.apply(null, arguments));
        return 1970 > a && b.setUTCFullYear(a), b
    }

    function ea(a) {
        return fa(a) ? 366 : 365
    }

    function fa(a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }

    function ga() {
        return fa(this.year())
    }

    function ha(a, b, c) {
        var d, e = c - b,
            f = c - a.day();
        return f > e && (f -= 7), e - 7 > f && (f += 7), d = Aa(a).add(f, "d"), {
            week: Math.ceil(d.dayOfYear() / 7),
            year: d.year()
        }
    }

    function ia(a) {
        return ha(a, this._week.dow, this._week.doy).week
    }

    function ja() {
        return this._week.dow
    }

    function ka() {
        return this._week.doy
    }

    function la(a) {
        var b = this.localeData().week(this);
        return null == a ? b : this.add(7 * (a - b), "d")
    }

    function ma(a) {
        var b = ha(this, 1, 4).week;
        return null == a ? b : this.add(7 * (a - b), "d")
    }

    function na(a, b, c, d, e) {
        var f, g, h = da(a, 0, 1).getUTCDay();
        return h = 0 === h ? 7 : h, c = null != c ? c : e, f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0), g = 7 * (b - 1) + (c - e) + f + 1, {
            year: g > 0 ? a : a - 1,
            dayOfYear: g > 0 ? g : ea(a - 1) + g
        }
    }

    function oa(a) {
        var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == a ? b : this.add(a - b, "d")
    }

    function pa(a, b, c) {
        return null != a ? a : null != b ? b : c
    }

    function qa(a) {
        var b = new Date;
        return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()]
    }

    function ra(a) {
        var b, c, d, e, f = [];
        if (!a._d) {
            for (d = qa(a), a._w && null == a._a[dd] && null == a._a[cd] && sa(a), a._dayOfYear && (e = pa(a._a[bd], d[bd]), a._dayOfYear > ea(e) && (j(a)._overflowDayOfYear = !0), c = da(e, 0, a._dayOfYear), a._a[cd] = c.getUTCMonth(), a._a[dd] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b) a._a[b] = f[b] = d[b];
            for (; 7 > b; b++) a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
            24 === a._a[ed] && 0 === a._a[fd] && 0 === a._a[gd] && 0 === a._a[hd] && (a._nextDay = !0, a._a[ed] = 0), a._d = (a._useUTC ? da : ca).apply(null, f), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[ed] = 24)
        }
    }

    function sa(a) {
        var b, c, d, e, f, g, h;
        b = a._w, null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = pa(b.GG, a._a[bd], ha(Aa(), 1, 4).year), d = pa(b.W, 1), e = pa(b.E, 1)) : (f = a._locale._week.dow, g = a._locale._week.doy, c = pa(b.gg, a._a[bd], ha(Aa(), f, g).year), d = pa(b.w, 1), null != b.d ? (e = b.d, f > e && ++d) : e = null != b.e ? b.e + f : f), h = na(c, d, e, g, f), a._a[bd] = h.year, a._dayOfYear = h.dayOfYear
    }

    function ta(b) {
        if (b._f === a.ISO_8601) return void aa(b);
        b._a = [], j(b).empty = !0;
        var c, d, e, f, g, h = "" + b._i,
            i = h.length,
            k = 0;
        for (e = K(b._f, b._locale).match(Jc) || [], c = 0; c < e.length; c++) f = e[c], d = (h.match(M(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && j(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), k += d.length), Mc[f] ? (d ? j(b).empty = !1 : j(b).unusedTokens.push(f), Q(f, d, b)) : b._strict && !d && j(b).unusedTokens.push(f);
        j(b).charsLeftOver = i - k, h.length > 0 && j(b).unusedInput.push(h), j(b).bigHour === !0 && b._a[ed] <= 12 && b._a[ed] > 0 && (j(b).bigHour = void 0), b._a[ed] = ua(b._locale, b._a[ed], b._meridiem), ra(b), Y(b)
    }

    function ua(a, b, c) {
        var d;
        return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b
    }

    function va(a) {
        var b, c, d, e, f;
        if (0 === a._f.length) return j(a).invalidFormat = !0, void(a._d = new Date(0 / 0));
        for (e = 0; e < a._f.length; e++) f = 0, b = m({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], ta(b), k(b) && (f += j(b).charsLeftOver, f += 10 * j(b).unusedTokens.length, j(b).score = f, (null == d || d > f) && (d = f, c = b));
        g(a, c || b)
    }

    function wa(a) {
        if (!a._d) {
            var b = A(a._i);
            a._a = [b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], ra(a)
        }
    }

    function xa(a) {
        var b, e = a._i,
            f = a._f;
        return a._locale = a._locale || x(a._l), null === e || void 0 === f && "" === e ? l({
            nullInput: !0
        }) : ("string" == typeof e && (a._i = e = a._locale.preparse(e)), o(e) ? new n(Y(e)) : (c(f) ? va(a) : f ? ta(a) : d(e) ? a._d = e : ya(a), b = new n(Y(a)), b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b))
    }

    function ya(b) {
        var f = b._i;
        void 0 === f ? b._d = new Date : d(f) ? b._d = new Date(+f) : "string" == typeof f ? ba(b) : c(f) ? (b._a = e(f.slice(0), function(a) {
            return parseInt(a, 10)
        }), ra(b)) : "object" == typeof f ? wa(b) : "number" == typeof f ? b._d = new Date(f) : a.createFromInputFallback(b)
    }

    function za(a, b, c, d, e) {
        var f = {};
        return "boolean" == typeof c && (d = c, c = void 0), f._isAMomentObject = !0, f._useUTC = f._isUTC = e, f._l = c, f._i = a, f._f = b, f._strict = d, xa(f)
    }

    function Aa(a, b, c, d) {
        return za(a, b, c, d, !1)
    }

    function Ba(a, b) {
        var d, e;
        if (1 === b.length && c(b[0]) && (b = b[0]), !b.length) return Aa();
        for (d = b[0], e = 1; e < b.length; ++e) b[e][a](d) && (d = b[e]);
        return d
    }

    function Ca() {
        var a = [].slice.call(arguments, 0);
        return Ba("isBefore", a)
    }

    function Da() {
        var a = [].slice.call(arguments, 0);
        return Ba("isAfter", a)
    }

    function Ea(a) {
        var b = A(a),
            c = b.year || 0,
            d = b.quarter || 0,
            e = b.month || 0,
            f = b.week || 0,
            g = b.day || 0,
            h = b.hour || 0,
            i = b.minute || 0,
            j = b.second || 0,
            k = b.millisecond || 0;
        this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = x(), this._bubble()
    }

    function Fa(a) {
        return a instanceof Ea
    }

    function Ga(a, b) {
        G(a, 0, 0, function() {
            var a = this.utcOffset(),
                c = "+";
            return 0 > a && (a = -a, c = "-"), c + F(~~(a / 60), 2) + b + F(~~a % 60, 2)
        })
    }

    function Ha(a) {
        var b = (a || "").match(Yc) || [],
            c = b[b.length - 1] || [],
            d = (c + "").match(td) || ["-", 0, 0],
            e = +(60 * d[1]) + p(d[2]);
        return "+" === d[0] ? e : -e
    }

    function Ia(b, c) {
        var e, f;
        return c._isUTC ? (e = c.clone(), f = (o(b) || d(b) ? +b : +Aa(b)) - +e, e._d.setTime(+e._d + f), a.updateOffset(e, !1), e) : Aa(b).local();
        return c._isUTC ? Aa(b).zone(c._offset || 0) : Aa(b).local()
    }

    function Ja(a) {
        return 15 * -Math.round(a._d.getTimezoneOffset() / 15)
    }

    function Ka(b, c) {
        var d, e = this._offset || 0;
        return null != b ? ("string" == typeof b && (b = Ha(b)), Math.abs(b) < 16 && (b = 60 * b), !this._isUTC && c && (d = Ja(this)), this._offset = b, this._isUTC = !0, null != d && this.add(d, "m"), e !== b && (!c || this._changeInProgress ? $a(this, Va(b - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Ja(this)
    }

    function La(a, b) {
        return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset()
    }

    function Ma(a) {
        return this.utcOffset(0, a)
    }

    function Na(a) {
        return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Ja(this), "m")), this
    }

    function Oa() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Ha(this._i)), this
    }

    function Pa(a) {
        return a = a ? Aa(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0
    }

    function Qa() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }

    function Ra() {
        if (this._a) {
            var a = this._isUTC ? h(this._a) : Aa(this._a);
            return this.isValid() && q(this._a, a.toArray()) > 0
        }
        return !1
    }

    function Sa() {
        return !this._isUTC
    }

    function Ta() {
        return this._isUTC
    }

    function Ua() {
        return this._isUTC && 0 === this._offset
    }

    function Va(a, b) {
        var c, d, e, g = a,
            h = null;
        return Fa(a) ? g = {
            ms: a._milliseconds,
            d: a._days,
            M: a._months
        } : "number" == typeof a ? (g = {}, b ? g[b] = a : g.milliseconds = a) : (h = ud.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = {
            y: 0,
            d: p(h[dd]) * c,
            h: p(h[ed]) * c,
            m: p(h[fd]) * c,
            s: p(h[gd]) * c,
            ms: p(h[hd]) * c
        }) : (h = vd.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = {
            y: Wa(h[2], c),
            M: Wa(h[3], c),
            d: Wa(h[4], c),
            h: Wa(h[5], c),
            m: Wa(h[6], c),
            s: Wa(h[7], c),
            w: Wa(h[8], c)
        }) : null == g ? g = {} : "object" == typeof g && ("from" in g || "to" in g) && (e = Ya(Aa(g.from), Aa(g.to)), g = {}, g.ms = e.milliseconds, g.M = e.months), d = new Ea(g), Fa(a) && f(a, "_locale") && (d._locale = a._locale), d
    }

    function Wa(a, b) {
        var c = a && parseFloat(a.replace(",", "."));
        return (isNaN(c) ? 0 : c) * b
    }

    function Xa(a, b) {
        var c = {
            milliseconds: 0,
            months: 0
        };
        return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c
    }

    function Ya(a, b) {
        var c;
        return b = Ia(b, a), a.isBefore(b) ? c = Xa(a, b) : (c = Xa(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c
    }

    function Za(a, b) {
        return function(c, d) {
            var e, f;
            return null === d || isNaN(+d) || (_(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Va(c, d), $a(this, e, a), this
        }
    }

    function $a(b, c, d, e) {
        var f = c._milliseconds,
            g = c._days,
            h = c._months;
        e = null == e ? !0 : e, f && b._d.setTime(+b._d + f * d), g && D(b, "Date", C(b, "Date") + g * d), h && V(b, C(b, "Month") + h * d), e && a.updateOffset(b, g || h)
    }

    function _a(a) {
        var b = a || Aa(),
            c = Ia(b, this).startOf("day"),
            d = this.diff(c, "days", !0),
            e = -6 > d ? "sameElse" : -1 > d ? "lastWeek" : 0 > d ? "lastDay" : 1 > d ? "sameDay" : 2 > d ? "nextDay" : 7 > d ? "nextWeek" : "sameElse";
        return this.format(this.localeData().calendar(e, this, Aa(b)))
    }

    function ab() {
        return new n(this)
    }

    function bb(a, b) {
        var c;
        return b = z("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = o(a) ? a : Aa(a), +this > +a) : (c = o(a) ? +a : +Aa(a), c < +this.clone().startOf(b))
    }

    function cb(a, b) {
        var c;
        return b = z("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = o(a) ? a : Aa(a), +a > +this) : (c = o(a) ? +a : +Aa(a), +this.clone().endOf(b) < c)
    }

    function db(a, b, c) {
        return this.isAfter(a, c) && this.isBefore(b, c)
    }

    function eb(a, b) {
        var c;
        return b = z(b || "millisecond"), "millisecond" === b ? (a = o(a) ? a : Aa(a), +this === +a) : (c = +Aa(a), +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b))
    }

    function fb(a) {
        return 0 > a ? Math.ceil(a) : Math.floor(a)
    }

    function gb(a, b, c) {
        var d, e, f = Ia(a, this),
            g = 6e4 * (f.utcOffset() - this.utcOffset());
        return b = z(b), "year" === b || "month" === b || "quarter" === b ? (e = hb(this, f), "quarter" === b ? e /= 3 : "year" === b && (e /= 12)) : (d = this - f, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - g) / 864e5 : "week" === b ? (d - g) / 6048e5 : d), c ? e : fb(e)
    }

    function hb(a, b) {
        var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
            f = a.clone().add(e, "months");
        return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d)
    }

    function ib() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }

    function jb() {
        var a = this.clone().utc();
        return 0 < a.year() && a.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : J(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : J(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }

    function kb(b) {
        var c = J(this, b || a.defaultFormat);
        return this.localeData().postformat(c)
    }

    function lb(a, b) {
        return this.isValid() ? Va({
            to: this,
            from: a
        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
    }

    function mb(a) {
        return this.from(Aa(), a)
    }

    function nb(a, b) {
        return this.isValid() ? Va({
            from: this,
            to: a
        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
    }

    function ob(a) {
        return this.to(Aa(), a)
    }

    function pb(a) {
        var b;
        return void 0 === a ? this._locale._abbr : (b = x(a), null != b && (this._locale = b), this)
    }

    function qb() {
        return this._locale
    }

    function rb(a) {
        switch (a = z(a)) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
        }
        return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
    }

    function sb(a) {
        return a = z(a), void 0 === a || "millisecond" === a ? this : this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms")
    }

    function tb() {
        return +this._d - 6e4 * (this._offset || 0)
    }

    function ub() {
        return Math.floor(+this / 1e3)
    }

    function vb() {
        return this._offset ? new Date(+this) : this._d
    }

    function wb() {
        var a = this;
        return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()]
    }

    function xb() {
        return k(this)
    }

    function yb() {
        return g({}, j(this))
    }

    function zb() {
        return j(this).overflow
    }

    function Ab(a, b) {
        G(0, [a, a.length], 0, b)
    }

    function Bb(a, b, c) {
        return ha(Aa([a, 11, 31 + b - c]), b, c).week
    }

    function Cb(a) {
        var b = ha(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return null == a ? b : this.add(a - b, "y")
    }

    function Db(a) {
        var b = ha(this, 1, 4).year;
        return null == a ? b : this.add(a - b, "y")
    }

    function Eb() {
        return Bb(this.year(), 1, 4)
    }

    function Fb() {
        var a = this.localeData()._week;
        return Bb(this.year(), a.dow, a.doy)
    }

    function Gb(a) {
        return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
    }

    function Hb(a, b) {
        if ("string" == typeof a)
            if (isNaN(a)) {
                if (a = b.weekdaysParse(a), "number" != typeof a) return null
            } else a = parseInt(a, 10);
        return a
    }

    function Ib(a) {
        return this._weekdays[a.day()]
    }

    function Jb(a) {
        return this._weekdaysShort[a.day()]
    }

    function Kb(a) {
        return this._weekdaysMin[a.day()]
    }

    function Lb(a) {
        var b, c, d;
        for (this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++)
            if (this._weekdaysParse[b] || (c = Aa([2e3, 1]).day(b), d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a)) return b
    }

    function Mb(a) {
        var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != a ? (a = Hb(a, this.localeData()), this.add(a - b, "d")) : b
    }

    function Nb(a) {
        var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == a ? b : this.add(a - b, "d")
    }

    function Ob(a) {
        return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7)
    }

    function Pb(a, b) {
        G(a, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), b)
        })
    }

    function Qb(a, b) {
        return b._meridiemParse
    }

    function Rb(a) {
        return "p" === (a + "").toLowerCase().charAt(0)
    }

    function Sb(a, b, c) {
        return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
    }

    function Tb(a) {
        G(0, [a, 3], 0, "millisecond")
    }

    function Ub() {
        return this._isUTC ? "UTC" : ""
    }

    function Vb() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }

    function Wb(a) {
        return Aa(1e3 * a)
    }

    function Xb() {
        return Aa.apply(null, arguments).parseZone()
    }

    function Yb(a, b, c) {
        var d = this._calendar[a];
        return "function" == typeof d ? d.call(b, c) : d
    }

    function Zb(a) {
        var b = this._longDateFormat[a];
        return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(a) {
            return a.slice(1)
        }), this._longDateFormat[a] = b), b
    }

    function $b() {
        return this._invalidDate
    }

    function _b(a) {
        return this._ordinal.replace("%d", a)
    }

    function ac(a) {
        return a
    }

    function bc(a, b, c, d) {
        var e = this._relativeTime[c];
        return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a)
    }

    function cc(a, b) {
        var c = this._relativeTime[a > 0 ? "future" : "past"];
        return "function" == typeof c ? c(b) : c.replace(/%s/i, b)
    }

    function dc(a) {
        var b, c;
        for (c in a) b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    }

    function ec(a, b, c, d) {
        var e = x(),
            f = h().set(d, b);
        return e[c](f, a)
    }

    function fc(a, b, c, d, e) {
        if ("number" == typeof a && (b = a, a = void 0), a = a || "", null != b) return ec(a, b, c, e);
        var f, g = [];
        for (f = 0; d > f; f++) g[f] = ec(a, f, c, e);
        return g
    }

    function gc(a, b) {
        return fc(a, b, "months", 12, "month")
    }

    function hc(a, b) {
        return fc(a, b, "monthsShort", 12, "month")
    }

    function ic(a, b) {
        return fc(a, b, "weekdays", 7, "day")
    }

    function jc(a, b) {
        return fc(a, b, "weekdaysShort", 7, "day")
    }

    function kc(a, b) {
        return fc(a, b, "weekdaysMin", 7, "day")
    }

    function lc() {
        var a = this._data;
        return this._milliseconds = Rd(this._milliseconds), this._days = Rd(this._days), this._months = Rd(this._months), a.milliseconds = Rd(a.milliseconds), a.seconds = Rd(a.seconds), a.minutes = Rd(a.minutes), a.hours = Rd(a.hours), a.months = Rd(a.months), a.years = Rd(a.years), this
    }

    function mc(a, b, c, d) {
        var e = Va(b, c);
        return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble()
    }

    function nc(a, b) {
        return mc(this, a, b, 1)
    }

    function oc(a, b) {
        return mc(this, a, b, -1)
    }

    function pc() {
        var a, b, c, d = this._milliseconds,
            e = this._days,
            f = this._months,
            g = this._data,
            h = 0;
        return g.milliseconds = d % 1e3, a = fb(d / 1e3), g.seconds = a % 60, b = fb(a / 60), g.minutes = b % 60, c = fb(b / 60), g.hours = c % 24, e += fb(c / 24), h = fb(qc(e)), e -= fb(rc(h)), f += fb(e / 30), e %= 30, h += fb(f / 12), f %= 12, g.days = e, g.months = f, g.years = h, this
    }

    function qc(a) {
        return 400 * a / 146097
    }

    function rc(a) {
        return 146097 * a / 400
    }

    function sc(a) {
        var b, c, d = this._milliseconds;
        if (a = z(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + 12 * qc(b), "month" === a ? c : c / 12;
        switch (b = this._days + Math.round(rc(this._months / 12)), a) {
            case "week":
                return b / 7 + d / 6048e5;
            case "day":
                return b + d / 864e5;
            case "hour":
                return 24 * b + d / 36e5;
            case "minute":
                return 1440 * b + d / 6e4;
            case "second":
                return 86400 * b + d / 1e3;
            case "millisecond":
                return Math.floor(864e5 * b) + d;
            default:
                throw new Error("Unknown unit " + a)
        }
    }

    function tc() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * p(this._months / 12)
    }

    function uc(a) {
        return function() {
            return this.as(a)
        }
    }

    function vc(a) {
        return a = z(a), this[a + "s"]()
    }

    function wc(a) {
        return function() {
            return this._data[a]
        }
    }

    function xc() {
        return fb(this.days() / 7)
    }

    function yc(a, b, c, d, e) {
        return e.relativeTime(b || 1, !!c, a, d)
    }

    function zc(a, b, c) {
        var d = Va(a).abs(),
            e = fe(d.as("s")),
            f = fe(d.as("m")),
            g = fe(d.as("h")),
            h = fe(d.as("d")),
            i = fe(d.as("M")),
            j = fe(d.as("y")),
            k = e < ge.s && ["s", e] || 1 === f && ["m"] || f < ge.m && ["mm", f] || 1 === g && ["h"] || g < ge.h && ["hh", g] || 1 === h && ["d"] || h < ge.d && ["dd", h] || 1 === i && ["M"] || i < ge.M && ["MM", i] || 1 === j && ["y"] || ["yy", j];
        return k[2] = b, k[3] = +a > 0, k[4] = c, yc.apply(null, k)
    }

    function Ac(a, b) {
        return void 0 === ge[a] ? !1 : void 0 === b ? ge[a] : (ge[a] = b, !0)
    }

    function Bc(a) {
        var b = this.localeData(),
            c = zc(this, !a, b);
        return a && (c = b.pastFuture(+this, c)), b.postformat(c)
    }

    function Cc() {
        var a = he(this.years()),
            b = he(this.months()),
            c = he(this.days()),
            d = he(this.hours()),
            e = he(this.minutes()),
            f = he(this.seconds() + this.milliseconds() / 1e3),
            g = this.asSeconds();
        return g ? (0 > g ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D"
    }
    var Dc, Ec, Fc = a.momentProperties = [],
        Gc = !1,
        Hc = {},
        Ic = {},
        Jc = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
        Kc = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        Lc = {},
        Mc = {},
        Nc = /\d/,
        Oc = /\d\d/,
        Pc = /\d{3}/,
        Qc = /\d{4}/,
        Rc = /[+-]?\d{6}/,
        Sc = /\d\d?/,
        Tc = /\d{1,3}/,
        Uc = /\d{1,4}/,
        Vc = /[+-]?\d{1,6}/,
        Wc = /\d+/,
        Xc = /[+-]?\d+/,
        Yc = /Z|[+-]\d\d:?\d\d/gi,
        Zc = /[+-]?\d+(\.\d{1,3})?/,
        $c = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        _c = {},
        ad = {},
        bd = 0,
        cd = 1,
        dd = 2,
        ed = 3,
        fd = 4,
        gd = 5,
        hd = 6;
    G("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }), G("MMM", 0, 0, function(a) {
        return this.localeData().monthsShort(this, a)
    }), G("MMMM", 0, 0, function(a) {
        return this.localeData().months(this, a)
    }), y("month", "M"), L("M", Sc), L("MM", Sc, Oc), L("MMM", $c), L("MMMM", $c), O(["M", "MM"], function(a, b) {
        b[cd] = p(a) - 1
    }), O(["MMM", "MMMM"], function(a, b, c, d) {
        var e = c._locale.monthsParse(a, d, c._strict);
        null != e ? b[cd] = e : j(c).invalidMonth = a
    });
    var id = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        jd = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        kd = {};
    a.suppressDeprecationWarnings = !1;
    var ld = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        md = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
            ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
            ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d{2}/],
            ["YYYY-DDD", /\d{4}-\d{3}/]
        ],
        nd = [
            ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
            ["HH:mm", /(T| )\d\d:\d\d/],
            ["HH", /(T| )\d\d/]
        ],
        od = /^\/?Date\((\-?\d+)/i;
    a.createFromInputFallback = $("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(a) {
        a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
    }), G(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }), G(0, ["YYYY", 4], 0, "year"), G(0, ["YYYYY", 5], 0, "year"), G(0, ["YYYYYY", 6, !0], 0, "year"), y("year", "y"), L("Y", Xc), L("YY", Sc, Oc), L("YYYY", Uc, Qc), L("YYYYY", Vc, Rc), L("YYYYYY", Vc, Rc), O(["YYYY", "YYYYY", "YYYYYY"], bd), O("YY", function(b, c) {
        c[bd] = a.parseTwoDigitYear(b)
    }), a.parseTwoDigitYear = function(a) {
        return p(a) + (p(a) > 68 ? 1900 : 2e3)
    };
    var pd = B("FullYear", !1);
    G("w", ["ww", 2], "wo", "week"), G("W", ["WW", 2], "Wo", "isoWeek"), y("week", "w"), y("isoWeek", "W"), L("w", Sc), L("ww", Sc, Oc), L("W", Sc), L("WW", Sc, Oc), P(["w", "ww", "W", "WW"], function(a, b, c, d) {
        b[d.substr(0, 1)] = p(a)
    });
    var qd = {
        dow: 0,
        doy: 6
    };
    G("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), y("dayOfYear", "DDD"), L("DDD", Tc), L("DDDD", Pc), O(["DDD", "DDDD"], function(a, b, c) {
        c._dayOfYear = p(a)
    }), a.ISO_8601 = function() {};
    var rd = $("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
            var a = Aa.apply(null, arguments);
            return this > a ? this : a
        }),
        sd = $("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
            var a = Aa.apply(null, arguments);
            return a > this ? this : a
        });
    Ga("Z", ":"), Ga("ZZ", ""), L("Z", Yc), L("ZZ", Yc), O(["Z", "ZZ"], function(a, b, c) {
        c._useUTC = !0, c._tzm = Ha(a)
    });
    var td = /([\+\-]|\d\d)/gi;
    a.updateOffset = function() {};
    var ud = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
        vd = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    Va.fn = Ea.prototype;
    var wd = Za(1, "add"),
        xd = Za(-1, "subtract");
    a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var yd = $("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(a) {
        return void 0 === a ? this.localeData() : this.locale(a)
    });
    G(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }), G(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }), Ab("gggg", "weekYear"), Ab("ggggg", "weekYear"), Ab("GGGG", "isoWeekYear"), Ab("GGGGG", "isoWeekYear"), y("weekYear", "gg"), y("isoWeekYear", "GG"), L("G", Xc), L("g", Xc), L("GG", Sc, Oc), L("gg", Sc, Oc), L("GGGG", Uc, Qc), L("gggg", Uc, Qc), L("GGGGG", Vc, Rc), L("ggggg", Vc, Rc), P(["gggg", "ggggg", "GGGG", "GGGGG"], function(a, b, c, d) {
        b[d.substr(0, 2)] = p(a)
    }), P(["gg", "GG"], function(b, c, d, e) {
        c[e] = a.parseTwoDigitYear(b)
    }), G("Q", 0, 0, "quarter"), y("quarter", "Q"), L("Q", Nc), O("Q", function(a, b) {
        b[cd] = 3 * (p(a) - 1)
    }), G("D", ["DD", 2], "Do", "date"), y("date", "D"), L("D", Sc), L("DD", Sc, Oc), L("Do", function(a, b) {
        return a ? b._ordinalParse : b._ordinalParseLenient
    }), O(["D", "DD"], dd), O("Do", function(a, b) {
        b[dd] = p(a.match(Sc)[0], 10)
    });
    var zd = B("Date", !0);
    G("d", 0, "do", "day"), G("dd", 0, 0, function(a) {
        return this.localeData().weekdaysMin(this, a)
    }), G("ddd", 0, 0, function(a) {
        return this.localeData().weekdaysShort(this, a)
    }), G("dddd", 0, 0, function(a) {
        return this.localeData().weekdays(this, a)
    }), G("e", 0, 0, "weekday"), G("E", 0, 0, "isoWeekday"), y("day", "d"), y("weekday", "e"), y("isoWeekday", "E"), L("d", Sc), L("e", Sc), L("E", Sc), L("dd", $c), L("ddd", $c), L("dddd", $c), P(["dd", "ddd", "dddd"], function(a, b, c) {
        var d = c._locale.weekdaysParse(a);
        null != d ? b.d = d : j(c).invalidWeekday = a
    }), P(["d", "e", "E"], function(a, b, c, d) {
        b[d] = p(a)
    });
    var Ad = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        Bd = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        Cd = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    G("H", ["HH", 2], 0, "hour"), G("h", ["hh", 2], 0, function() {
        return this.hours() % 12 || 12
    }), Pb("a", !0), Pb("A", !1), y("hour", "h"), L("a", Qb), L("A", Qb), L("H", Sc), L("h", Sc), L("HH", Sc, Oc), L("hh", Sc, Oc), O(["H", "HH"], ed), O(["a", "A"], function(a, b, c) {
        c._isPm = c._locale.isPM(a), c._meridiem = a
    }), O(["h", "hh"], function(a, b, c) {
        b[ed] = p(a), j(c).bigHour = !0
    });
    var Dd = /[ap]\.?m?\.?/i,
        Ed = B("Hours", !0);
    G("m", ["mm", 2], 0, "minute"), y("minute", "m"), L("m", Sc), L("mm", Sc, Oc), O(["m", "mm"], fd);
    var Fd = B("Minutes", !1);
    G("s", ["ss", 2], 0, "second"), y("second", "s"), L("s", Sc), L("ss", Sc, Oc), O(["s", "ss"], gd);
    var Gd = B("Seconds", !1);
    G("S", 0, 0, function() {
        return ~~(this.millisecond() / 100)
    }), G(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10)
    }), Tb("SSS"), Tb("SSSS"), y("millisecond", "ms"), L("S", Tc, Nc), L("SS", Tc, Oc), L("SSS", Tc, Pc), L("SSSS", Wc), O(["S", "SS", "SSS", "SSSS"], function(a, b) {
        b[hd] = p(1e3 * ("0." + a))
    });
    var Hd = B("Milliseconds", !1);
    G("z", 0, 0, "zoneAbbr"), G("zz", 0, 0, "zoneName");
    var Id = n.prototype;
    Id.add = wd, Id.calendar = _a, Id.clone = ab, Id.diff = gb, Id.endOf = sb, Id.format = kb, Id.from = lb, Id.fromNow = mb, Id.to = nb, Id.toNow = ob, Id.get = E, Id.invalidAt = zb, Id.isAfter = bb, Id.isBefore = cb, Id.isBetween = db, Id.isSame = eb, Id.isValid = xb, Id.lang = yd, Id.locale = pb, Id.localeData = qb, Id.max = sd, Id.min = rd, Id.parsingFlags = yb, Id.set = E, Id.startOf = rb, Id.subtract = xd, Id.toArray = wb, Id.toDate = vb, Id.toISOString = jb, Id.toJSON = jb, Id.toString = ib, Id.unix = ub, Id.valueOf = tb, Id.year = pd, Id.isLeapYear = ga, Id.weekYear = Cb, Id.isoWeekYear = Db, Id.quarter = Id.quarters = Gb, Id.month = W, Id.daysInMonth = X, Id.week = Id.weeks = la, Id.isoWeek = Id.isoWeeks = ma, Id.weeksInYear = Fb, Id.isoWeeksInYear = Eb, Id.date = zd, Id.day = Id.days = Mb, Id.weekday = Nb, Id.isoWeekday = Ob, Id.dayOfYear = oa, Id.hour = Id.hours = Ed, Id.minute = Id.minutes = Fd, Id.second = Id.seconds = Gd, Id.millisecond = Id.milliseconds = Hd, Id.utcOffset = Ka, Id.utc = Ma, Id.local = Na, Id.parseZone = Oa, Id.hasAlignedHourOffset = Pa, Id.isDST = Qa, Id.isDSTShifted = Ra, Id.isLocal = Sa, Id.isUtcOffset = Ta, Id.isUtc = Ua, Id.isUTC = Ua, Id.zoneAbbr = Ub, Id.zoneName = Vb, Id.dates = $("dates accessor is deprecated. Use date instead.", zd), Id.months = $("months accessor is deprecated. Use month instead", W), Id.years = $("years accessor is deprecated. Use year instead", pd), Id.zone = $("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", La);
    var Jd = Id,
        Kd = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        Ld = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        },
        Md = "Invalid date",
        Nd = "%d",
        Od = /\d{1,2}/,
        Pd = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        Qd = r.prototype;
    Qd._calendar = Kd, Qd.calendar = Yb, Qd._longDateFormat = Ld, Qd.longDateFormat = Zb, Qd._invalidDate = Md, Qd.invalidDate = $b, Qd._ordinal = Nd, Qd.ordinal = _b, Qd._ordinalParse = Od, Qd.preparse = ac, Qd.postformat = ac, Qd._relativeTime = Pd, Qd.relativeTime = bc, Qd.pastFuture = cc, Qd.set = dc, Qd.months = S, Qd._months = id, Qd.monthsShort = T, Qd._monthsShort = jd, Qd.monthsParse = U, Qd.week = ia, Qd._week = qd, Qd.firstDayOfYear = ka, Qd.firstDayOfWeek = ja, Qd.weekdays = Ib, Qd._weekdays = Ad, Qd.weekdaysMin = Kb, Qd._weekdaysMin = Cd, Qd.weekdaysShort = Jb, Qd._weekdaysShort = Bd, Qd.weekdaysParse = Lb, Qd.isPM = Rb, Qd._meridiemParse = Dd, Qd.meridiem = Sb, v("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(a) {
            var b = a % 10,
                c = 1 === p(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        }
    }), a.lang = $("moment.lang is deprecated. Use moment.locale instead.", v), a.langData = $("moment.langData is deprecated. Use moment.localeData instead.", x);
    var Rd = Math.abs,
        Sd = uc("ms"),
        Td = uc("s"),
        Ud = uc("m"),
        Vd = uc("h"),
        Wd = uc("d"),
        Xd = uc("w"),
        Yd = uc("M"),
        Zd = uc("y"),
        $d = wc("milliseconds"),
        _d = wc("seconds"),
        ae = wc("minutes"),
        be = wc("hours"),
        ce = wc("days"),
        de = wc("months"),
        ee = wc("years"),
        fe = Math.round,
        ge = {
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        },
        he = Math.abs,
        ie = Ea.prototype;
    ie.abs = lc, ie.add = nc, ie.subtract = oc, ie.as = sc, ie.asMilliseconds = Sd, ie.asSeconds = Td, ie.asMinutes = Ud, ie.asHours = Vd, ie.asDays = Wd, ie.asWeeks = Xd, ie.asMonths = Yd, ie.asYears = Zd, ie.valueOf = tc, ie._bubble = pc, ie.get = vc, ie.milliseconds = $d, ie.seconds = _d, ie.minutes = ae, ie.hours = be, ie.days = ce, ie.weeks = xc, ie.months = de, ie.years = ee, ie.humanize = Bc, ie.toISOString = Cc, ie.toString = Cc, ie.toJSON = Cc, ie.locale = pb, ie.localeData = qb, ie.toIsoString = $("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Cc), ie.lang = yd, G("X", 0, 0, "unix"), G("x", 0, 0, "valueOf"), L("x", Xc), L("X", Zc), O("X", function(a, b, c) {
        c._d = new Date(1e3 * parseFloat(a, 10))
    }), O("x", function(a, b, c) {
        c._d = new Date(p(a))
    }), a.version = "2.10.3", b(Aa), a.fn = Jd, a.min = Ca, a.max = Da, a.utc = h, a.unix = Wb, a.months = gc, a.isDate = d, a.locale = v, a.invalid = l, a.duration = Va, a.isMoment = o, a.weekdays = ic, a.parseZone = Xb, a.localeData = x, a.isDuration = Fa, a.monthsShort = hc, a.weekdaysMin = kc, a.defineLocale = w, a.weekdaysShort = jc, a.normalizeUnits = z, a.relativeTimeThreshold = Ac;
    var je = a;
    return je
});

/******************************************************************************/

/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.3.6
 */
;
(function($) {
    var selectors = [];

    var check_binded = false;
    var check_lock = false;
    var defaults = {
        interval: 250,
        force_process: false
    };
    var $window = $(window);

    var $prior_appeared = [];

    function process() {
        check_lock = false;
        for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
            var $appeared = $(selectors[index]).filter(function() {
                return $(this).is(':appeared');
            });

            $appeared.trigger('appear', [$appeared]);

            if ($prior_appeared[index]) {
                var $disappeared = $prior_appeared[index].not($appeared);
                $disappeared.trigger('disappear', [$disappeared]);
            }
            $prior_appeared[index] = $appeared;
        }
    };

    function add_selector(selector) {
        selectors.push(selector);
        $prior_appeared.push();
    }

    // "appeared" custom filter
    $.expr[':']['appeared'] = function(element) {
        var $element = $(element);
        if (!$element.is(':visible')) {
            return false;
        }

        var window_left = $window.scrollLeft();
        var window_top = $window.scrollTop();
        var offset = $element.offset();
        var left = offset.left;
        var top = offset.top;

        if (top + $element.height() >= window_top &&
            top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
            left + $element.width() >= window_left &&
            left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
            return true;
        } else {
            return false;
        }
    };

    $.fn.extend({
        // watching for element's appearance in browser viewport
        appear: function(options) {
            var opts = $.extend({}, defaults, options || {});
            var selector = this.selector || this;
            if (!check_binded) {
                var on_check = function() {
                    if (check_lock) {
                        return;
                    }
                    check_lock = true;

                    setTimeout(process, opts.interval);
                };

                $(window).scroll(on_check).resize(on_check);
                check_binded = true;
            }

            if (opts.force_process) {
                setTimeout(process, opts.interval);
            }
            add_selector(selector);
            return $(selector);
        }
    });

    $.extend({
        // force elements's appearance check
        force_appear: function() {
            if (check_binded) {
                process();
                return true;
            }
            return false;
        }
    });
})(function() {
    if (typeof module !== 'undefined') {
        // Node
        return require('jquery');
    } else {
        return jQuery;
    }
}());

;
(function($) {
    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */
    $.fn.visible = function(partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

})(jQuery);


/******************************************************************************/

/** Owl Carousel 2.4 **/

! function(a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Pipe, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }

    function f(a) {
        if (a.touches !== d) return {
            x: a.touches[0].pageX,
            y: a.touches[0].pageY
        };
        if (a.touches === d) {
            if (a.pageX !== d) return {
                x: a.pageX,
                y: a.pageY
            };
            if (a.pageX === d) return {
                x: a.clientX,
                y: a.clientY
            }
        }
    }

    function g(a) {
        var b, d, e = c.createElement("div"),
            f = a;
        for (b in f)
            if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [d, b];
        return [!1]
    }

    function h() {
        return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }

    function i() {
        return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }

    function j() {
        return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }

    function k() {
        return "ontouchstart" in b || !!navigator.msMaxTouchPoints
    }

    function l() {
        return b.navigator.msPointerEnabled
    }
    var m, n, o;
    m = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    }, n = {
        isTouch: !1,
        isScrolling: !1,
        isSwiping: !1,
        direction: !1,
        inMotion: !1
    }, o = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    }, e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Plugins = {}, e.Pipe = [{
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var a = this._clones,
                b = this.$stage.children(".cloned");
            (b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var a, b, c = this._clones,
                d = this._items,
                e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
            for (a = 0, b = Math.abs(e / 2); b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a, b, c, d = this.settings.rtl ? 1 : -1,
                e = (this.width() / this.settings.items).toFixed(3),
                f = 0;
            for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var b, c, d = (this.width() / this.settings.items).toFixed(3),
                e = {
                    width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                    "padding-left": this.settings.stagePadding || "",
                    "padding-right": this.settings.stagePadding || ""
                };
            if (this.$stage.css(e), e = {
                    width: this.settings.autoWidth ? "auto" : d - this.settings.margin
                }, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function(a) {
                    return a > 1
                }).length > 0)
                for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e);
            else this.$stage.children().css(e)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current && this.reset(this.$stage.children().index(a.current))
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }], e.prototype.initialize = function() {
        if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
            var b, c, e;
            if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), !1
        }
        this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, e.prototype.setup = function() {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) {
            b >= a && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function(a, b) {
            return b.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, e.prototype.optionsLogic = function() {
        this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
            return this[a]
        }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function() {
        if (0 === this._items.length) return !1;
        (new Date).getTime();
        this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed")
    }, e.prototype.eventsCall = function() {
        this.e._onDragStart = a.proxy(function(a) {
            this.onDragStart(a)
        }, this), this.e._onDragMove = a.proxy(function(a) {
            this.onDragMove(a)
        }, this), this.e._onDragEnd = a.proxy(function(a) {
            this.onDragEnd(a)
        }, this), this.e._onResize = a.proxy(function(a) {
            this.onResize(a)
        }, this), this.e._transitionEnd = a.proxy(function(a) {
            this.transitionEnd(a)
        }, this), this.e._preventClick = a.proxy(function(a) {
            this.preventClick(a)
        }, this)
    }, e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function() {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
    }, e.prototype.eventsRouter = function(a) {
        var b = a.type;
        "mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a)
    }, e.prototype.internalEvents = function() {
        var c = (k(), l());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function(a) {
            this.eventsRouter(a)
        }, this)), this.$stage.on("dragstart", function() {
            return !1
        }), this.$stage.get(0).onselectstart = function() {
            return !1
        }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function(a) {
            this.eventsRouter(a)
        }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this))
    }, e.prototype.onDragStart = function(d) {
        var e, g, h, i;
        if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1;
        if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
        this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function(a) {
            this.eventsRouter(a)
        }, this))
    }, e.prototype.onDragMove = function(a) {
        var c, e, g, h, i, j;
        this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, e.prototype.onDragEnd = function(b) {
        var d, e, f;
        if (this.state.isTouch) {
            if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
            this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents")
        }
    }, e.prototype.removeClick = function(c) {
        this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function() {
            a(c).off("click.preventClick")
        }, 300)
    }, e.prototype.preventClick = function(b) {
        b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick")
    }, e.prototype.getTransformProperty = function() {
        var a, c;
        return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12]
    }, e.prototype.closest = function(b) {
        var c = -1,
            d = 30,
            e = this.width(),
            f = this.coordinates();
        return this.settings.freeDrag || a.each(f, a.proxy(function(a, g) {
            return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c
        }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c
    }, e.prototype.animate = function(b) {
        this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
            left: b + "px"
        }) : this.$stage.animate({
            left: b
        }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function() {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function(a) {
        this._invalidated[a] = !0
    }, e.prototype.reset = function(a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function(b, c) {
        var e = c ? this._items.length : this._items.length + this._clones.length;
        return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b))
    }, e.prototype.relative = function(a) {
        return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function(a) {
        var b, c, d, e = 0,
            f = this.settings;
        if (a) return this._items.length - 1;
        if (!f.loop && f.center) b = this._items.length - 1;
        else if (f.loop || f.center)
            if (f.loop || f.center) b = this._items.length + f.items;
            else {
                if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";
                for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width();
                     (d = this.coordinates(e)) && !(d * revert >= c);) b = ++e
            }
        else b = this._items.length - f.items;
        return b
    }, e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) {
                return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function(a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function(b) {
        var c = null;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
    }, e.prototype.duration = function(a, b, c) {
        return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function(c, d) {
        if (this.settings.loop) {
            var e = c - this.relative(this.current()),
                f = this.current(),
                g = this.current(),
                h = this.current() + e,
                i = 0 > g - h ? !0 : !1,
                j = this._clones.length + this._items.length;
            h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function() {
                this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update()
            }, this), 30)
        } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update()
    }, e.prototype.next = function(a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function(a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.transitionEnd = function(a) {
        return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
    }, e.prototype.viewport = function() {
        var d;
        if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
        else if (b.innerWidth) d = b.innerWidth;
        else {
            if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
            d = c.documentElement.clientWidth
        }
        return d
    }, e.prototype.replace = function(b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function(a, b) {
        b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", {
            content: a,
            position: b
        }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
            content: a,
            position: b
        })
    }, e.prototype.remove = function(a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.addTriggerableEvents = function() {
        var b = a.proxy(function(b, c) {
            return a.proxy(function(a) {
                a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c]))
            }, this)
        }, this);
        a.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, a.proxy(function(a, c) {
            this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"))
        }, this))
    }, e.prototype.watchVisibility = function() {
        function c(a) {
            return a.offsetWidth > 0 && a.offsetHeight > 0
        }

        function d() {
            c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile))
        }
        c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
    }, e.prototype.preloadAutoWidthImages = function(b) {
        var c, d, e, f;
        c = 0, d = this, b.each(function(g, h) {
            e = a(h), f = new Image, f.onload = function() {
                c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize())
            }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina")
        })
    }, e.prototype.destroy = function() {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var d in this._plugins) this._plugins[d].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() {
            return !1
        })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : c > a;
            case ">":
                return d ? c > a : a > c;
            case ">=":
                return d ? c >= a : a >= c;
            case "<=":
                return d ? a >= c : c >= a
        }
    }, e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function(b, c, d) {
        var e = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            f = a.camelCase(a.grep(["on", b, d], function(a) {
                return a
            }).join("-").toLowerCase()),
            g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, e, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(g)
        }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g
    }, e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.browserSupport = function() {
        if (this.support3d = j(), this.support3d) {
            this.transformVendor = i();
            var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = b.orientation
    }, a.fn.owlCarousel = function(b) {
        return this.each(function() {
            a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b))
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
    function(a, b) {
        var c = function(b) {
            this._core = b, this._loaded = [], this._handlers = {
                "initialized.owl.carousel change.owl.carousel": a.proxy(function(b) {
                    if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                        for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function(a, b) {
                            this.load(b)
                        }, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h)
                }, this)
            }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        c.Defaults = {
            lazyLoad: !1
        }, c.prototype.load = function(c) {
            var d = this._core.$stage.children().eq(c),
                e = d && d.find(".owl-lazy");
            !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
                var e, f = a(d),
                    g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
                this._core.trigger("load", {
                    element: f,
                    url: g
                }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                    f.css("opacity", 1), this._core.trigger("loaded", {
                        element: f,
                        url: g
                    }, "lazy")
                }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
                    f.css({
                        "background-image": "url(" + g + ")",
                        opacity: "1"
                    }), this._core.trigger("loaded", {
                        element: f,
                        url: g
                    }, "lazy")
                }, this), e.src = g)
            }, this)), this._loaded.push(d.get(0)))
        }, c.prototype.destroy = function() {
            var a, b;
            for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
            for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
        }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c
    }(window.Zepto || window.jQuery, window, document),
    function(a) {
        var b = function(c) {
            this._core = c, this._handlers = {
                "initialized.owl.carousel": a.proxy(function() {
                    this._core.settings.autoHeight && this.update()
                }, this),
                "changed.owl.carousel": a.proxy(function(a) {
                    this._core.settings.autoHeight && "position" == a.property.name && this.update()
                }, this),
                "loaded.owl.lazy": a.proxy(function(a) {
                    this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
                }, this)
            }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        b.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        }, b.prototype.update = function() {
            this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
        }, b.prototype.destroy = function() {
            var a, b;
            for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
            for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
        }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c) {
        var d = function(b) {
            this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
                "resize.owl.carousel": a.proxy(function(a) {
                    this._core.settings.video && !this.isInFullScreen() && a.preventDefault()
                }, this),
                "refresh.owl.carousel changed.owl.carousel": a.proxy(function() {
                    this._playing && this.stop()
                }, this),
                "prepared.owl.carousel": a.proxy(function(b) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }, this)
            }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
                this.play(a)
            }, this))
        };
        d.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        }, d.prototype.fetch = function(a, b) {
            var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
                d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
                e = a.attr("data-width") || this._core.settings.videoWidth,
                f = a.attr("data-height") || this._core.settings.videoHeight,
                g = a.attr("href");
            if (!g) throw new Error("Missing video URL.");
            if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
            else {
                if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
                c = "vimeo"
            }
            d = d[6], this._videos[g] = {
                type: c,
                id: d,
                width: e,
                height: f
            }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
        }, d.prototype.thumbnail = function(b, c) {
            var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
                h = b.find("img"),
                i = "src",
                j = "",
                k = this._core.settings,
                l = function(a) {
                    e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
                };
            return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
                type: "GET",
                url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(a) {
                    f = a[0].thumbnail_large, l(f)
                }
            }))
        }, d.prototype.stop = function() {
            this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
        }, d.prototype.play = function(b) {
            this._core.trigger("play", null, "video"), this._playing && this.stop();
            var c, d, e = a(b.target || b.srcElement),
                f = e.closest("." + this._core.settings.itemClass),
                g = this._videos[f.attr("data-video")],
                h = g.width || "100%",
                i = g.height || this._core.$stage.height();
            "youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d)
        }, d.prototype.isInFullScreen = function() {
            var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
            return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0
        }, d.prototype.destroy = function() {
            var a, b;
            this._core.$element.off("click.owl.video");
            for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
            for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
        }, a.fn.owlCarousel.Constructor.Plugins.Video = d
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c, d) {
        var e = function(b) {
            this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
                "change.owl.carousel": a.proxy(function(a) {
                    "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
                }, this),
                "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                    this.swapping = "translated" == a.type
                }, this),
                "translate.owl.carousel": a.proxy(function() {
                    this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                }, this)
            }, this.core.$element.on(this.handlers)
        };
        e.Defaults = {
            animateOut: !1,
            animateIn: !1
        }, e.prototype.swap = function() {
            if (1 === this.core.settings.items && this.core.support3d) {
                this.core.speed(0);
                var b, c = a.proxy(this.clear, this),
                    d = this.core.$stage.children().eq(this.previous),
                    e = this.core.$stage.children().eq(this.next),
                    f = this.core.settings.animateIn,
                    g = this.core.settings.animateOut;
                this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({
                    left: b + "px"
                }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
            }
        }, e.prototype.clear = function(b) {
            a(b.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
        }, e.prototype.destroy = function() {
            var a, b;
            for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
            for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
        }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c) {
        var d = function(b) {
            this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
                "translated.owl.carousel refreshed.owl.carousel": a.proxy(function() {
                    this.autoplay()
                }, this),
                "play.owl.autoplay": a.proxy(function(a, b, c) {
                    this.play(b, c)
                }, this),
                "stop.owl.autoplay": a.proxy(function() {
                    this.stop()
                }, this),
                "mouseover.owl.autoplay": a.proxy(function() {
                    this.core.settings.autoplayHoverPause && this.pause()
                }, this),
                "mouseleave.owl.autoplay": a.proxy(function() {
                    this.core.settings.autoplayHoverPause && this.autoplay()
                }, this)
            }, this.core.$element.on(this.handlers)
        };
        d.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        }, d.prototype.autoplay = function() {
            this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function() {
                this.play()
            }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
        }, d.prototype.play = function() {
            return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
        }, d.prototype.stop = function() {
            b.clearInterval(this.interval)
        }, d.prototype.pause = function() {
            b.clearInterval(this.interval)
        }, d.prototype.destroy = function() {
            var a, c;
            b.clearInterval(this.interval);
            for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
            for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
        }, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
    }(window.Zepto || window.jQuery, window, document),
    function(a) {
        "use strict";
        var b = function(c) {
            this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
                next: this._core.next,
                prev: this._core.prev,
                to: this._core.to
            }, this._handlers = {
                "prepared.owl.carousel": a.proxy(function(b) {
                    this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                }, this),
                "add.owl.carousel": a.proxy(function(b) {
                    this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                }, this),
                "remove.owl.carousel prepared.owl.carousel": a.proxy(function(a) {
                    this._core.settings.dotsData && this._templates.splice(a.position, 1)
                }, this),
                "change.owl.carousel": a.proxy(function(a) {
                    if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                        var b = this._core.current(),
                            c = this._core.maximum(),
                            d = this._core.minimum();
                        a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
                    }
                }, this),
                "changed.owl.carousel": a.proxy(function(a) {
                    "position" == a.property.name && this.draw()
                }, this),
                "refreshed.owl.carousel": a.proxy(function() {
                    this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
                }, this)
            }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers)
        };
        b.Defaults = {
            nav: !1,
            navRewind: !0,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
            controlsClass: "owl-controls"
        }, b.prototype.initialize = function() {
            var b, c, d = this._core.settings;
            d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function(b) {
                var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
                b.preventDefault(), this.to(c, d.dotsSpeed)
            }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function() {
                this.prev(d.navSpeed)
            }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function() {
                this.next(d.navSpeed)
            }, this));
            for (c in this._overrides) this._core[c] = a.proxy(this[c], this)
        }, b.prototype.destroy = function() {
            var a, b, c, d;
            for (a in this._handlers) this.$element.off(a, this._handlers[a]);
            for (b in this._controls) this._controls[b].remove();
            for (d in this.overides) this._core[d] = this._overrides[d];
            for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
        }, b.prototype.update = function() {
            var a, b, c, d = this._core.settings,
                e = this._core.clones().length / 2,
                f = e + this._core.items().length,
                g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
            if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy)
                for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)(b >= g || 0 === b) && (this._pages.push({
                    start: a - e,
                    end: a - e + g - 1
                }), b = 0, ++c), b += this._core.mergers(this._core.relative(a))
        }, b.prototype.draw = function() {
            var b, c, d = "",
                e = this._core.settings,
                f = (this._core.$stage.children(), this._core.relative(this._core.current()));
            if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots) {
                if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) {
                    for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];
                    this._controls.$indicators.html(d)
                } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
                this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active")
            }
            this._controls.$indicators.toggle(e.dots)
        }, b.prototype.onTrigger = function(b) {
            var c = this._core.settings;
            b.page = {
                index: a.inArray(this.current(), this._pages),
                count: this._pages.length,
                size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items)
            }
        }, b.prototype.current = function() {
            var b = this._core.relative(this._core.current());
            return a.grep(this._pages, function(a) {
                return a.start <= b && a.end >= b
            }).pop()
        }, b.prototype.getPosition = function(b) {
            var c, d, e = this._core.settings;
            return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
        }, b.prototype.next = function(b) {
            a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
        }, b.prototype.prev = function(b) {
            a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
        }, b.prototype.to = function(b, c, d) {
            var e;
            d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
        }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b
    }(window.Zepto || window.jQuery, window, document),
    function(a, b) {
        "use strict";
        var c = function(d) {
            this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
                "initialized.owl.carousel": a.proxy(function() {
                    "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
                }, this),
                "prepared.owl.carousel": a.proxy(function(b) {
                    var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                    this._hashes[c] = b.content
                }, this)
            }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function() {
                var a = b.location.hash.substring(1),
                    c = this._core.$stage.children(),
                    d = this._hashes[a] && c.index(this._hashes[a]) || 0;
                return a ? void this._core.to(d, !1, !0) : !1
            }, this))
        };
        c.Defaults = {
            URLhashListener: !1
        }, c.prototype.destroy = function() {
            var c, d;
            a(b).off("hashchange.owl.navigation");
            for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
            for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
        }, a.fn.owlCarousel.Constructor.Plugins.Hash = c
    }(window.Zepto || window.jQuery, window, document);

/*****************************************************************************/
;
/* ===========================================================
 * jquery-simple-text-rotator.js v1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * A very simple and light weight jQuery plugin that
 * allows you to rotate multiple text without changing
 * the layout
 * https://github.com/peachananr/simple-text-rotator
 *
 * ========================================================== */

! function($) {

    var defaults = {
        animation: "dissolve",
        separator: ",",
        speed: 2000
    };

    $.fx.step.textShadowBlur = function(fx) {
        $(fx.elem).prop('textShadowBlur', fx.now).css({
            textShadow: '0 0 ' + Math.floor(fx.now) + 'px black'
        });
    };

    $.fn.textrotator = function(options) {
        var settings = $.extend({}, defaults, options);

        return this.each(function() {
            var el = $(this)
            var array = [];
            $.each(el.html().split(settings.separator), function(key, value) {
                if (value) {
                    array.push(value);
                }
            });
            el.html(array[0]);

            // animation option
            var rotate = function() {
                switch (settings.animation) {
                    case 'dissolve':
                        el.animate({
                            textShadowBlur: 20,
                            opacity: 0
                        }, 500, function() {
                            index = $.inArray(el.text(), array)
                            if ((index + 1) == array.length) index = -1
                            el.text(array[index + 1]).animate({
                                textShadowBlur: 0,
                                opacity: 1
                            }, 500);
                        });
                        break;

                    case 'flip':
                        if (el.find(".back").length > 0) {
                            el.html(el.find(".back").html())
                        }

                        var initial = el.html()
                        var index = $.inArray(initial, array)
                        if ((index + 1) == array.length) index = -1

                        el.html("");
                        $("<span class='front'>" + initial + "</span>").appendTo(el);
                        $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
                        el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({
                            "-webkit-transform": " rotateY(-180deg)",
                            "-moz-transform": " rotateY(-180deg)",
                            "-o-transform": " rotateY(-180deg)",
                            "transform": " rotateY(-180deg)"
                        })

                        break;

                    case 'flipUp':
                        if (el.find(".back").length > 0) {
                            el.html(el.find(".back").html())
                        }

                        var initial = el.html()
                        var index = $.inArray(initial, array)
                        if ((index + 1) == array.length) index = -1

                        el.html("");
                        $("<span class='front'>" + initial + "</span>").appendTo(el);
                        $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
                        el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({
                            "-webkit-transform": " rotateX(-180deg)",
                            "-moz-transform": " rotateX(-180deg)",
                            "-o-transform": " rotateX(-180deg)",
                            "transform": " rotateX(-180deg)"
                        })

                        break;

                    case 'flipCube':
                        if (el.find(".back").length > 0) {
                            el.html(el.find(".back").html())
                        }

                        var initial = el.html()
                        var index = $.inArray(initial, array)
                        if ((index + 1) == array.length) index = -1

                        el.html("");
                        $("<span class='front'>" + initial + "</span>").appendTo(el);
                        $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
                        el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({
                            "-webkit-transform": " rotateY(180deg)",
                            "-moz-transform": " rotateY(180deg)",
                            "-o-transform": " rotateY(180deg)",
                            "transform": " rotateY(180deg)"
                        })

                        break;

                    case 'flipCubeUp':
                        if (el.find(".back").length > 0) {
                            el.html(el.find(".back").html())
                        }

                        var initial = el.html()
                        var index = $.inArray(initial, array)
                        if ((index + 1) == array.length) index = -1

                        el.html("");
                        $("<span class='front'>" + initial + "</span>").appendTo(el);
                        $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
                        el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({
                            "-webkit-transform": " rotateX(180deg)",
                            "-moz-transform": " rotateX(180deg)",
                            "-o-transform": " rotateX(180deg)",
                            "transform": " rotateX(180deg)"
                        })

                        break;

                    case 'spin':
                        if (el.find(".rotating").length > 0) {
                            el.html(el.find(".rotating").html())
                        }
                        index = $.inArray(el.html(), array)
                        if ((index + 1) == array.length) index = -1

                        el.wrapInner("<span class='rotating spin' />").find(".rotating").hide().html(array[index + 1]).show().css({
                            "-webkit-transform": " rotate(0) scale(1)",
                            "-moz-transform": "rotate(0) scale(1)",
                            "-o-transform": "rotate(0) scale(1)",
                            "transform": "rotate(0) scale(1)"
                        })
                        break;

                    case 'fade':
                        index = $.inArray(el.html(), array)
                        el.fadeOut(1000, function() {
                            if ((index + 1) == array.length) index = -1
                            el.html(array[index + 1]).fadeIn(settings.speed);
                        });
                        break;
                }
            };
            setInterval(rotate, settings.speed);
        });
    }

}(window.jQuery);;
/**!
 * easyPieChart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.5
 **/
! function(a, b) {
    "object" == typeof exports ? module.exports = b(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], b) : b(a.jQuery)
}(this, function(a) {
    var b = function(a, b) {
            var c, d = document.createElement("canvas");
            a.appendChild(d), "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(d);
            var e = d.getContext("2d");
            d.width = d.height = b.size;
            var f = 1;
            window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, "px"].join(""), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI);
            var g = (b.size - b.lineWidth) / 2;
            b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function() {
                    return +new Date
                };
            var h = function(a, b, c) {
                    c = Math.min(Math.max(-1, c || 0), 1);
                    var d = 0 >= c ? !0 : !1;
                    e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke()
                },
                i = function() {
                    var a, c;
                    e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save();
                    for (var d = 24; d > 0; --d) d % 6 === 0 ? (c = b.scaleLength, a = 0) : (c = .6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
                    e.restore()
                },
                j = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
                            window.setTimeout(a, 1e3 / 60)
                        }
                }(),
                k = function() {
                    b.scaleColor && i(), b.trackColor && h(b.trackColor, b.lineWidth, 1)
                };
            this.getCanvas = function() {
                return d
            }, this.getCtx = function() {
                return e
            }, this.clear = function() {
                e.clearRect(b.size / -2, b.size / -2, b.size, b.size)
            }, this.draw = function(a) {
                b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap;
                var d;
                d = "function" == typeof b.barColor ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100)
            }.bind(this), this.animate = function(a, c) {
                var d = Date.now();
                b.onStart(a, c);
                var e = function() {
                    var f = Math.min(Date.now() - d, b.animate.duration),
                        g = b.easing(this, f, a, c - a, b.animate.duration);
                    this.draw(g), b.onStep(a, c, g), f >= b.animate.duration ? b.onStop(a, c) : j(e)
                }.bind(this);
                j(e)
            }.bind(this)
        },
        c = function(a, c) {
            var d = {
                barColor: "#ef1e25",
                trackColor: "#f9f9f9",
                scaleColor: "#dfe0e0",
                scaleLength: 5,
                lineCap: "round",
                lineWidth: 3,
                size: 110,
                rotate: 0,
                animate: {
                    duration: 1e3,
                    enabled: !0
                },
                easing: function(a, b, c, d, e) {
                    return b /= e / 2, 1 > b ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
                },
                onStart: function() {},
                onStep: function() {},
                onStop: function() {}
            };
            if ("undefined" != typeof b) d.renderer = b;
            else {
                if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                d.renderer = SVGRenderer
            }
            var e = {},
                f = 0,
                g = function() {
                    this.el = a, this.options = e;
                    for (var b in d) d.hasOwnProperty(b) && (e[b] = c && "undefined" != typeof c[b] ? c[b] : d[b], "function" == typeof e[b] && (e[b] = e[b].bind(this)));
                    e.easing = "string" == typeof e.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[e.easing]) ? jQuery.easing[e.easing] : d.easing, "number" == typeof e.animate && (e.animate = {
                        duration: e.animate,
                        enabled: !0
                    }), "boolean" != typeof e.animate || e.animate || (e.animate = {
                        duration: 1e3,
                        enabled: e.animate
                    }), this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent")))
                }.bind(this);
            this.update = function(a) {
                return a = parseFloat(a), e.animate.enabled ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this
            }.bind(this), this.disableAnimation = function() {
                return e.animate.enabled = !1, this
            }, this.enableAnimation = function() {
                return e.animate.enabled = !0, this
            }, g()
        };
    a.fn.easyPieChart = function(b) {
        return this.each(function() {
            var d;
            a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)))
        })
    }
});

;
/**
 * jquery.hoverdir.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
;
(function($, window, undefined) {

    'use strict';

    $.HoverDir = function(options, element) {

        this.$el = $(element);
        this._init(options);

    };

    // the options
    $.HoverDir.defaults = {
        speed: 300,
        easing: 'ease',
        hoverDelay: 0,
        inverse: false
    };

    $.HoverDir.prototype = {

        _init: function(options) {

            // options
            this.options = $.extend(true, {}, $.HoverDir.defaults, options);
            // transition properties
            this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing;
            // support for CSS transitions
            this.support = Modernizr.csstransitions;
            // load the events
            this._loadEvents();

        },
        _loadEvents: function() {

            var self = this;

            this.$el.on('mouseenter.hoverdir, mouseleave.hoverdir', function(event) {

                var $el = $(this),
                    $hoverElem = $el.find('div.thumb-overlay'),
                    direction = self._getDir($el, {
                        x: event.pageX,
                        y: event.pageY
                    }),
                    styleCSS = self._getStyle(direction);

                if (event.type === 'mouseenter') {

                    $hoverElem.hide().css(styleCSS.from);
                    clearTimeout(self.tmhover);

                    self.tmhover = setTimeout(function() {

                        $hoverElem.show(0, function() {

                            var $el = $(this);
                            if (self.support) {
                                $el.css('transition', self.transitionProp);
                            }
                            self._applyAnimation($el, styleCSS.to, self.options.speed);

                        });


                    }, self.options.hoverDelay);

                } else {

                    if (self.support) {
                        $hoverElem.css('transition', self.transitionProp);
                    }
                    clearTimeout(self.tmhover);
                    self._applyAnimation($hoverElem, styleCSS.from, self.options.speed);

                }

            });

        },
        // credits : http://stackoverflow.com/a/3647634
        _getDir: function($el, coordinates) {

            // the width and height of the current div
            var w = $el.width(),
                h = $el.height(),

            // calculate the x and y to get an angle to the center of the div from that x and y.
            // gets the x value relative to the center of the DIV and "normalize" it
                x = (coordinates.x - $el.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
                y = (coordinates.y - $el.offset().top - (h / 2)) * (h > w ? (w / h) : 1),

            // the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
            // first calculate the angle of the point,
            // add 180 deg to get rid of the negative values
            // divide by 90 to get the quadrant
            // add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
                direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

            return direction;

        },
        _getStyle: function(direction) {

            var fromStyle, toStyle,
                slideFromTop = {
                    left: '0px',
                    top: '-100%'
                },
                slideFromBottom = {
                    left: '0px',
                    top: '100%'
                },
                slideFromLeft = {
                    left: '-100%',
                    top: '0px'
                },
                slideFromRight = {
                    left: '100%',
                    top: '0px'
                },
                slideTop = {
                    top: '0px'
                },
                slideLeft = {
                    left: '0px'
                };

            switch (direction) {
                case 0:
                    // from top
                    fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
                    toStyle = slideTop;
                    break;
                case 1:
                    // from right
                    fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
                    toStyle = slideLeft;
                    break;
                case 2:
                    // from bottom
                    fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
                    toStyle = slideTop;
                    break;
                case 3:
                    // from left
                    fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
                    toStyle = slideLeft;
                    break;
            };

            return {
                from: fromStyle,
                to: toStyle
            };

        },
        // apply a transition or fallback to jquery animate based on Modernizr.csstransitions support
        _applyAnimation: function(el, styleCSS, speed) {

            $.fn.applyStyle = this.support ? $.fn.css : $.fn.animate;
            el.stop().applyStyle(styleCSS, $.extend(true, [], {
                duration: speed + 'ms'
            }));

        },

    };

    var logError = function(message) {

        if (window.console) {

            window.console.error(message);

        }

    };

    $.fn.hoverdir = function(options) {

        var instance = $.data(this, 'hoverdir');

        if (typeof options === 'string') {

            var args = Array.prototype.slice.call(arguments, 1);

            this.each(function() {

                if (!instance) {

                    logError("cannot call methods on hoverdir prior to initialization; " +
                        "attempted to call method '" + options + "'");
                    return;

                }

                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {

                    logError("no such method '" + options + "' for hoverdir instance");
                    return;

                }

                instance[options].apply(instance, args);

            });

        } else {

            this.each(function() {

                if (instance) {

                    instance._init();

                } else {

                    instance = $.data(this, 'hoverdir', new $.HoverDir(options, this));

                }

            });

        }

        return instance;

    };

})(jQuery, window);