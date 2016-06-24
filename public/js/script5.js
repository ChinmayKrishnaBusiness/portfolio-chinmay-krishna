/**
 * Created by chinmaykrishna on 24/06/16.
 */
;
(function($) {
    $.fn.countTo = function(options) {
        options = options || {};
        return $(this).each(function() {
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from: $(this).data('from'),
                to: $(this).data('to'),
                speed: $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals: $(this).data('decimals')
            }, options);
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};
            $self.data('countTo', data);
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);
            render(value);

            function updateTimer() {
                value += increment;
                loopCount++;
                render(value);
                if (typeof(settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }
                if (loopCount >= loops) {
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;
                    if (typeof(settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.text(formattedValue);
            }
        });
    };
    $.fn.countTo.defaults = {
        from: 0,
        to: 0,
        speed: 1000,
        refreshInterval: 100,
        decimals: 0,
        formatter: formatter,
        onUpdate: null,
        onComplete: null
    };

    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    }
}(jQuery));;;
(function($) {
    var w = 'countdown';
    var Y = 0;
    var O = 1;
    var W = 2;
    var D = 3;
    var H = 4;
    var M = 5;
    var S = 6;
    $.JQPlugin.createPlugin({
        name: w,
        defaultOptions: {
            until: null,
            since: null,
            timezone: null,
            serverSync: null,
            format: 'dHMS',
            layout: '',
            compact: false,
            padZeroes: false,
            significant: 0,
            description: '',
            expiryUrl: '',
            expiryText: '',
            alwaysExpire: false,
            onExpiry: null,
            onTick: null,
            tickInterval: 1
        },
        regionalOptions: {
            '': {
                labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
                labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
                compactLabels: ['y', 'm', 'w', 'd'],
                whichLabels: null,
                digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                timeSeparator: ':',
                isRTL: false
            }
        },
        _getters: ['getTimes'],
        _rtlClass: w + '-rtl',
        _sectionClass: w + '-section',
        _amountClass: w + '-amount',
        _periodClass: w + '-period',
        _rowClass: w + '-row',
        _holdingClass: w + '-holding',
        _showClass: w + '-show',
        _descrClass: w + '-descr',
        _timerElems: [],
        _init: function() {
            var c = this;
            this._super();
            this._serverSyncs = [];
            var d = (typeof Date.now == 'function' ? Date.now : function() {
                return new Date().getTime()
            });
            var e = (window.performance && typeof window.performance.now == 'function');

            function timerCallBack(a) {
                var b = (a < 1e12 ? (e ? (performance.now() + performance.timing.navigationStart) : d()) : a || d());
                if (b - g >= 1000) {
                    c._updateElems();
                    g = b
                }
                f(timerCallBack)
            }
            var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
            var g = 0;
            if (!f || $.noRequestAnimationFrame) {
                $.noRequestAnimationFrame = null;
                setInterval(function() {
                    c._updateElems()
                }, 980)
            } else {
                g = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || d();
                f(timerCallBack)
            }
        },
        UTCDate: function(a, b, c, e, f, g, h, i) {
            if (typeof b == 'object' && b.constructor == Date) {
                i = b.getMilliseconds();
                h = b.getSeconds();
                g = b.getMinutes();
                f = b.getHours();
                e = b.getDate();
                c = b.getMonth();
                b = b.getFullYear()
            }
            var d = new Date();
            d.setUTCFullYear(b);
            d.setUTCDate(1);
            d.setUTCMonth(c || 0);
            d.setUTCDate(e || 1);
            d.setUTCHours(f || 0);
            d.setUTCMinutes((g || 0) - (Math.abs(a) < 30 ? a * 60 : a));
            d.setUTCSeconds(h || 0);
            d.setUTCMilliseconds(i || 0);
            return d
        },
        periodsToSeconds: function(a) {
            return a[0] * 31557600 + a[1] * 2629800 + a[2] * 604800 + a[3] * 86400 + a[4] * 3600 + a[5] * 60 + a[6]
        },
        resync: function() {
            var d = this;
            $('.' + this._getMarker()).each(function() {
                var a = $.data(this, d.name);
                if (a.options.serverSync) {
                    var b = null;
                    for (var i = 0; i < d._serverSyncs.length; i++) {
                        if (d._serverSyncs[i][0] == a.options.serverSync) {
                            b = d._serverSyncs[i];
                            break
                        }
                    }
                    if (b[2] == null) {
                        var c = ($.isFunction(a.options.serverSync) ? a.options.serverSync.apply(this, []) : null);
                        b[2] = (c ? new Date().getTime() - c.getTime() : 0) - b[1]
                    }
                    if (a._since) {
                        a._since.setMilliseconds(a._since.getMilliseconds() + b[2])
                    }
                    a._until.setMilliseconds(a._until.getMilliseconds() + b[2])
                }
            });
            for (var i = 0; i < d._serverSyncs.length; i++) {
                if (d._serverSyncs[i][2] != null) {
                    d._serverSyncs[i][1] += d._serverSyncs[i][2];
                    delete d._serverSyncs[i][2]
                }
            }
        },
        _instSettings: function(a, b) {
            return {
                _periods: [0, 0, 0, 0, 0, 0, 0]
            }
        },
        _addElem: function(a) {
            if (!this._hasElem(a)) {
                this._timerElems.push(a)
            }
        },
        _hasElem: function(a) {
            return ($.inArray(a, this._timerElems) > -1)
        },
        _removeElem: function(b) {
            this._timerElems = $.map(this._timerElems, function(a) {
                return (a == b ? null : a)
            })
        },
        _updateElems: function() {
            for (var i = this._timerElems.length - 1; i >= 0; i--) {
                this._updateCountdown(this._timerElems[i])
            }
        },
        _optionsChanged: function(a, b, c) {
            if (c.layout) {
                c.layout = c.layout.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            }
            this._resetExtraLabels(b.options, c);
            var d = (b.options.timezone != c.timezone);
            $.extend(b.options, c);
            this._adjustSettings(a, b, c.until != null || c.since != null || d);
            var e = new Date();
            if ((b._since && b._since < e) || (b._until && b._until > e)) {
                this._addElem(a[0])
            }
            this._updateCountdown(a, b)
        },
        _updateCountdown: function(a, b) {
            a = a.jquery ? a : $(a);
            b = b || this._getInst(a);
            if (!b) {
                return
            }
            a.html(this._generateHTML(b)).toggleClass(this._rtlClass, b.options.isRTL);
            if ($.isFunction(b.options.onTick)) {
                var c = b._hold != 'lap' ? b._periods : this._calculatePeriods(b, b._show, b.options.significant, new Date());
                if (b.options.tickInterval == 1 || this.periodsToSeconds(c) % b.options.tickInterval == 0) {
                    b.options.onTick.apply(a[0], [c])
                }
            }
            var d = b._hold != 'pause' && (b._since ? b._now.getTime() < b._since.getTime() : b._now.getTime() >= b._until.getTime());
            if (d && !b._expiring) {
                b._expiring = true;
                if (this._hasElem(a[0]) || b.options.alwaysExpire) {
                    this._removeElem(a[0]);
                    if ($.isFunction(b.options.onExpiry)) {
                        b.options.onExpiry.apply(a[0], [])
                    }
                    if (b.options.expiryText) {
                        var e = b.options.layout;
                        b.options.layout = b.options.expiryText;
                        this._updateCountdown(a[0], b);
                        b.options.layout = e
                    }
                    if (b.options.expiryUrl) {
                        window.location = b.options.expiryUrl
                    }
                }
                b._expiring = false
            } else if (b._hold == 'pause') {
                this._removeElem(a[0])
            }
        },
        _resetExtraLabels: function(a, b) {
            for (var n in b) {
                if (n.match(/[Ll]abels[02-9]|compactLabels1/)) {
                    a[n] = b[n]
                }
            }
            for (var n in a) {
                if (n.match(/[Ll]abels[02-9]|compactLabels1/) && typeof b[n] === 'undefined') {
                    a[n] = null
                }
            }
        },
        _adjustSettings: function(a, b, c) {
            var d = null;
            for (var i = 0; i < this._serverSyncs.length; i++) {
                if (this._serverSyncs[i][0] == b.options.serverSync) {
                    d = this._serverSyncs[i][1];
                    break
                }
            }
            if (d != null) {
                var e = (b.options.serverSync ? d : 0);
                var f = new Date()
            } else {
                var g = ($.isFunction(b.options.serverSync) ? b.options.serverSync.apply(a[0], []) : null);
                var f = new Date();
                var e = (g ? f.getTime() - g.getTime() : 0);
                this._serverSyncs.push([b.options.serverSync, e])
            }
            var h = b.options.timezone;
            h = (h == null ? -f.getTimezoneOffset() : h);
            if (c || (!c && b._until == null && b._since == null)) {
                b._since = b.options.since;
                if (b._since != null) {
                    b._since = this.UTCDate(h, this._determineTime(b._since, null));
                    if (b._since && e) {
                        b._since.setMilliseconds(b._since.getMilliseconds() + e)
                    }
                }
                b._until = this.UTCDate(h, this._determineTime(b.options.until, f));
                if (e) {
                    b._until.setMilliseconds(b._until.getMilliseconds() + e)
                }
            }
            b._show = this._determineShow(b)
        },
        _preDestroy: function(a, b) {
            this._removeElem(a[0]);
            a.empty()
        },
        pause: function(a) {
            this._hold(a, 'pause')
        },
        lap: function(a) {
            this._hold(a, 'lap')
        },
        resume: function(a) {
            this._hold(a, null)
        },
        toggle: function(a) {
            var b = $.data(a, this.name) || {};
            this[!b._hold ? 'pause' : 'resume'](a)
        },
        toggleLap: function(a) {
            var b = $.data(a, this.name) || {};
            this[!b._hold ? 'lap' : 'resume'](a)
        },
        _hold: function(a, b) {
            var c = $.data(a, this.name);
            if (c) {
                if (c._hold == 'pause' && !b) {
                    c._periods = c._savePeriods;
                    var d = (c._since ? '-' : '+');
                    c[c._since ? '_since' : '_until'] = this._determineTime(d + c._periods[0] + 'y' + d + c._periods[1] + 'o' + d + c._periods[2] + 'w' + d + c._periods[3] + 'd' + d + c._periods[4] + 'h' + d + c._periods[5] + 'm' + d + c._periods[6] + 's');
                    this._addElem(a)
                }
                c._hold = b;
                c._savePeriods = (b == 'pause' ? c._periods : null);
                $.data(a, this.name, c);
                this._updateCountdown(a, c)
            }
        },
        getTimes: function(a) {
            var b = $.data(a, this.name);
            return (!b ? null : (b._hold == 'pause' ? b._savePeriods : (!b._hold ? b._periods : this._calculatePeriods(b, b._show, b.options.significant, new Date()))))
        },
        _determineTime: function(k, l) {
            var m = this;
            var n = function(a) {
                var b = new Date();
                b.setTime(b.getTime() + a * 1000);
                return b
            };
            var o = function(a) {
                a = a.toLowerCase();
                var b = new Date();
                var c = b.getFullYear();
                var d = b.getMonth();
                var e = b.getDate();
                var f = b.getHours();
                var g = b.getMinutes();
                var h = b.getSeconds();
                var i = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
                var j = i.exec(a);
                while (j) {
                    switch (j[2] || 's') {
                        case 's':
                            h += parseInt(j[1], 10);
                            break;
                        case 'm':
                            g += parseInt(j[1], 10);
                            break;
                        case 'h':
                            f += parseInt(j[1], 10);
                            break;
                        case 'd':
                            e += parseInt(j[1], 10);
                            break;
                        case 'w':
                            e += parseInt(j[1], 10) * 7;
                            break;
                        case 'o':
                            d += parseInt(j[1], 10);
                            e = Math.min(e, m._getDaysInMonth(c, d));
                            break;
                        case 'y':
                            c += parseInt(j[1], 10);
                            e = Math.min(e, m._getDaysInMonth(c, d));
                            break
                    }
                    j = i.exec(a)
                }
                return new Date(c, d, e, f, g, h, 0)
            };
            var p = (k == null ? l : (typeof k == 'string' ? o(k) : (typeof k == 'number' ? n(k) : k)));
            if (p) p.setMilliseconds(0);
            return p
        },
        _getDaysInMonth: function(a, b) {
            return 32 - new Date(a, b, 32).getDate()
        },
        _normalLabels: function(a) {
            return a
        },
        _generateHTML: function(c) {
            var d = this;
            c._periods = (c._hold ? c._periods : this._calculatePeriods(c, c._show, c.options.significant, new Date()));
            var e = false;
            var f = 0;
            var g = c.options.significant;
            var h = $.extend({}, c._show);
            for (var i = Y; i <= S; i++) {
                e |= (c._show[i] == '?' && c._periods[i] > 0);
                h[i] = (c._show[i] == '?' && !e ? null : c._show[i]);
                f += (h[i] ? 1 : 0);
                g -= (c._periods[i] > 0 ? 1 : 0)
            }
            var j = [false, false, false, false, false, false, false];
            for (var i = S; i >= Y; i--) {
                if (c._show[i]) {
                    if (c._periods[i]) {
                        j[i] = true
                    } else {
                        j[i] = g > 0;
                        g--
                    }
                }
            }
            var k = (c.options.compact ? c.options.compactLabels : c.options.labels);
            var l = c.options.whichLabels || this._normalLabels;
            var m = function(a) {
                var b = c.options['compactLabels' + l(c._periods[a])];
                return (h[a] ? d._translateDigits(c, c._periods[a]) + (b ? b[a] : k[a]) + ' ' : '')
            };
            var n = (c.options.padZeroes ? 2 : 1);
            var o = function(a) {
                var b = c.options['labels' + l(c._periods[a])];
                return ((!c.options.significant && h[a]) || (c.options.significant && j[a]) ? '<span class="' + d._sectionClass + '">' + '<span class="' + d._amountClass + '">' + d._minDigits(c, c._periods[a], n) + '</span>' + '<span class="' + d._periodClass + '">' + (b ? b[a] : k[a]) + '</span></span>' : '')
            };
            return (c.options.layout ? this._buildLayout(c, h, c.options.layout, c.options.compact, c.options.significant, j) : ((c.options.compact ? '<span class="' + this._rowClass + ' ' + this._amountClass + (c._hold ? ' ' + this._holdingClass : '') + '">' + m(Y) + m(O) + m(W) + m(D) + (h[H] ? this._minDigits(c, c._periods[H], 2) : '') + (h[M] ? (h[H] ? c.options.timeSeparator : '') + this._minDigits(c, c._periods[M], 2) : '') + (h[S] ? (h[H] || h[M] ? c.options.timeSeparator : '') + this._minDigits(c, c._periods[S], 2) : '') : '<span class="' + this._rowClass + ' ' + this._showClass + (c.options.significant || f) + (c._hold ? ' ' + this._holdingClass : '') + '">' + o(Y) + o(O) + o(W) + o(D) + o(H) + o(M) + o(S)) + '</span>' + (c.options.description ? '<span class="' + this._rowClass + ' ' + this._descrClass + '">' + c.options.description + '</span>' : '')))
        },
        _buildLayout: function(c, d, e, f, g, h) {
            var j = c.options[f ? 'compactLabels' : 'labels'];
            var k = c.options.whichLabels || this._normalLabels;
            var l = function(a) {
                return (c.options[(f ? 'compactLabels' : 'labels') + k(c._periods[a])] || j)[a]
            };
            var m = function(a, b) {
                return c.options.digits[Math.floor(a / b) % 10]
            };
            var o = {
                desc: c.options.description,
                sep: c.options.timeSeparator,
                yl: l(Y),
                yn: this._minDigits(c, c._periods[Y], 1),
                ynn: this._minDigits(c, c._periods[Y], 2),
                ynnn: this._minDigits(c, c._periods[Y], 3),
                y1: m(c._periods[Y], 1),
                y10: m(c._periods[Y], 10),
                y100: m(c._periods[Y], 100),
                y1000: m(c._periods[Y], 1000),
                ol: l(O),
                on: this._minDigits(c, c._periods[O], 1),
                onn: this._minDigits(c, c._periods[O], 2),
                onnn: this._minDigits(c, c._periods[O], 3),
                o1: m(c._periods[O], 1),
                o10: m(c._periods[O], 10),
                o100: m(c._periods[O], 100),
                o1000: m(c._periods[O], 1000),
                wl: l(W),
                wn: this._minDigits(c, c._periods[W], 1),
                wnn: this._minDigits(c, c._periods[W], 2),
                wnnn: this._minDigits(c, c._periods[W], 3),
                w1: m(c._periods[W], 1),
                w10: m(c._periods[W], 10),
                w100: m(c._periods[W], 100),
                w1000: m(c._periods[W], 1000),
                dl: l(D),
                dn: this._minDigits(c, c._periods[D], 1),
                dnn: this._minDigits(c, c._periods[D], 2),
                dnnn: this._minDigits(c, c._periods[D], 3),
                d1: m(c._periods[D], 1),
                d10: m(c._periods[D], 10),
                d100: m(c._periods[D], 100),
                d1000: m(c._periods[D], 1000),
                hl: l(H),
                hn: this._minDigits(c, c._periods[H], 1),
                hnn: this._minDigits(c, c._periods[H], 2),
                hnnn: this._minDigits(c, c._periods[H], 3),
                h1: m(c._periods[H], 1),
                h10: m(c._periods[H], 10),
                h100: m(c._periods[H], 100),
                h1000: m(c._periods[H], 1000),
                ml: l(M),
                mn: this._minDigits(c, c._periods[M], 1),
                mnn: this._minDigits(c, c._periods[M], 2),
                mnnn: this._minDigits(c, c._periods[M], 3),
                m1: m(c._periods[M], 1),
                m10: m(c._periods[M], 10),
                m100: m(c._periods[M], 100),
                m1000: m(c._periods[M], 1000),
                sl: l(S),
                sn: this._minDigits(c, c._periods[S], 1),
                snn: this._minDigits(c, c._periods[S], 2),
                snnn: this._minDigits(c, c._periods[S], 3),
                s1: m(c._periods[S], 1),
                s10: m(c._periods[S], 10),
                s100: m(c._periods[S], 100),
                s1000: m(c._periods[S], 1000)
            };
            var p = e;
            for (var i = Y; i <= S; i++) {
                var q = 'yowdhms'.charAt(i);
                var r = new RegExp('\\{' + q + '<\\}([\\s\\S]*)\\{' + q + '>\\}', 'g');
                p = p.replace(r, ((!g && d[i]) || (g && h[i]) ? '$1' : ''))
            }
            $.each(o, function(n, v) {
                var a = new RegExp('\\{' + n + '\\}', 'g');
                p = p.replace(a, v)
            });
            return p
        },
        _minDigits: function(a, b, c) {
            b = '' + b;
            if (b.length >= c) {
                return this._translateDigits(a, b)
            }
            b = '0000000000' + b;
            return this._translateDigits(a, b.substr(b.length - c))
        },
        _translateDigits: function(b, c) {
            return ('' + c).replace(/[0-9]/g, function(a) {
                return b.options.digits[a]
            })
        },
        _determineShow: function(a) {
            var b = a.options.format;
            var c = [];
            c[Y] = (b.match('y') ? '?' : (b.match('Y') ? '!' : null));
            c[O] = (b.match('o') ? '?' : (b.match('O') ? '!' : null));
            c[W] = (b.match('w') ? '?' : (b.match('W') ? '!' : null));
            c[D] = (b.match('d') ? '?' : (b.match('D') ? '!' : null));
            c[H] = (b.match('h') ? '?' : (b.match('H') ? '!' : null));
            c[M] = (b.match('m') ? '?' : (b.match('M') ? '!' : null));
            c[S] = (b.match('s') ? '?' : (b.match('S') ? '!' : null));
            return c
        },
        _calculatePeriods: function(c, d, e, f) {
            c._now = f;
            c._now.setMilliseconds(0);
            var g = new Date(c._now.getTime());
            if (c._since) {
                if (f.getTime() < c._since.getTime()) {
                    c._now = f = g
                } else {
                    f = c._since
                }
            } else {
                g.setTime(c._until.getTime());
                if (f.getTime() > c._until.getTime()) {
                    c._now = f = g
                }
            }
            var h = [0, 0, 0, 0, 0, 0, 0];
            if (d[Y] || d[O]) {
                var i = this._getDaysInMonth(f.getFullYear(), f.getMonth());
                var j = this._getDaysInMonth(g.getFullYear(), g.getMonth());
                var k = (g.getDate() == f.getDate() || (g.getDate() >= Math.min(i, j) && f.getDate() >= Math.min(i, j)));
                var l = function(a) {
                    return (a.getHours() * 60 + a.getMinutes()) * 60 + a.getSeconds()
                };
                var m = Math.max(0, (g.getFullYear() - f.getFullYear()) * 12 + g.getMonth() - f.getMonth() + ((g.getDate() < f.getDate() && !k) || (k && l(g) < l(f)) ? -1 : 0));
                h[Y] = (d[Y] ? Math.floor(m / 12) : 0);
                h[O] = (d[O] ? m - h[Y] * 12 : 0);
                f = new Date(f.getTime());
                var n = (f.getDate() == i);
                var o = this._getDaysInMonth(f.getFullYear() + h[Y], f.getMonth() + h[O]);
                if (f.getDate() > o) {
                    f.setDate(o)
                }
                f.setFullYear(f.getFullYear() + h[Y]);
                f.setMonth(f.getMonth() + h[O]);
                if (n) {
                    f.setDate(o)
                }
            }
            var p = Math.floor((g.getTime() - f.getTime()) / 1000);
            var q = function(a, b) {
                h[a] = (d[a] ? Math.floor(p / b) : 0);
                p -= h[a] * b
            };
            q(W, 604800);
            q(D, 86400);
            q(H, 3600);
            q(M, 60);
            q(S, 1);
            if (p > 0 && !c._since) {
                var r = [1, 12, 4.3482, 7, 24, 60, 60];
                var s = S;
                var t = 1;
                for (var u = S; u >= Y; u--) {
                    if (d[u]) {
                        if (h[s] >= t) {
                            h[s] = 0;
                            p = 1
                        }
                        if (p > 0) {
                            h[u]++;
                            p = 0;
                            s = u;
                            t = 1
                        }
                    }
                    t *= r[u]
                }
            }
            if (e) {
                for (var u = Y; u <= S; u++) {
                    if (e && h[u]) {
                        e--
                    } else if (!e) {
                        h[u] = 0
                    }
                }
            }
            return h
        }
    })
})(jQuery);;;
(function(jQuery) {
    "use strict";
    var $page_loader = jQuery('.page-loader'),
        ajax_url = jQuery('#ajax_url').val(),
        transition, $exclude_links;

    function be_countdown() {
        if (jQuery('.be-countdown').length > 0) {
            jQuery('.be-countdown').each(function() {
                var $this = jQuery(this);
                var $date = moment($this.attr('data-time'), 'YYYY-MM-DD HH:mm:ss').toDate();
                jQuery(this).countdown({
                    until: $date
                });
            });
        }
    }

    function be_google_maps() {
        if (jQuery('.gmap').length > 0) {
            var styles = {
                black: [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": 17
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": 20
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": 17
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": 29
                    }, {
                        "weight": 0.2
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": 18
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": 16
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": 21
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#000000"
                    }, {
                        "lightness": 16
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "saturation": 36
                    }, {
                        "color": "#000000"
                    }, {
                        "lightness": 40
                    }]
                }, {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": 19
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": 20
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": 17
                    }, {
                        "weight": 1.2
                    }]
                }],
                greyscale: [{
                    "featureType": "landscape",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "lightness": 65
                    }, {
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "poi",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "lightness": 51
                    }, {
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "road.highway",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "lightness": 30
                    }, {
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "road.local",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "lightness": 40
                    }, {
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "transit",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "administrative.province",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "lightness": -25
                    }, {
                        "saturation": -100
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "hue": "#ffff00"
                    }, {
                        "lightness": -25
                    }, {
                        "saturation": -97
                    }]
                }],
                midnight: [{
                    "featureType": "water",
                    "stylers": [{
                        "color": "#021019"
                    }]
                }, {
                    "featureType": "landscape",
                    "stylers": [{
                        "color": "#08304b"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#0c4152"
                    }, {
                        "lightness": 5
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#000000"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#0b434f"
                    }, {
                        "lightness": 25
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#000000"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#0b3d51"
                    }, {
                        "lightness": 16
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": 13
                    }]
                }, {
                    "featureType": "transit",
                    "stylers": [{
                        "color": "#146474"
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#000000"
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#144b53"
                    }, {
                        "lightness": 14
                    }, {
                        "weight": 1.4
                    }]
                }],
                standard: [],
                bluewater: [{
                    "featureType": "water",
                    "stylers": [{
                        "color": "#46bcec"
                    }, {
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "landscape",
                    "stylers": [{
                        "color": "#f2f2f2"
                    }]
                }, {
                    "featureType": "road",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "lightness": 45
                    }]
                }, {
                    "featureType": "road.highway",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#444444"
                    }]
                }, {
                    "featureType": "transit",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "poi",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }]
            };
            jQuery('.gmap').each(function() {
                var $address = jQuery(this).data('address'),
                    $zoom = jQuery(this).data('zoom'),
                    $lat = jQuery(this).attr('data-latitude'),
                    $lan = jQuery(this).attr('data-longitude'),
                    $custom_marker = jQuery(this).attr('data-marker'),
                    map_style = jQuery(this).attr('data-style'),
                    mapOptions = {
                        zoom: $zoom,
                        scrollwheel: false,
                        navigationControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        center: new google.maps.LatLng(parseFloat($lat), parseFloat($lan)),
                        styles: styles[map_style]
                    },
                    map = new google.maps.Map(jQuery(this)[0], mapOptions),
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat($lat), parseFloat($lan)),
                        map: map,
                        title: $address,
                        icon: $custom_marker
                    });
                marker.setMap(map);
            });
        }
    }

    function arrange_team() {
        jQuery('.grid-wrap:not(.changed)').each(function() {
            var $this = jQuery(this),
                $col = Number($this.attr('data-col')),
                i = 0;
            $this.addClass('changed');
            $this.find('.grid-col').css('width', 100 / $col + '%');
            $this.find('.grid-col:nth-of-type(' + $col + 'n)').css('border-right', 'none');
            for (i; i < $this.find('.grid-col').length; i += $col) {
                $this.find('.grid-col').slice(i, i + $col).wrapAll("<div class='grid-row clearfix'></div>");
            }
            $this.find('.grid-row:last-child').find('.grid-col').css('border-bottom', 'none');
            $this.css('opacity', 1);
        });
        if (jQuery('.process-style1').length > 0) {
            jQuery('.process-style1').each(function() {
                jQuery(this).find('.process-divider:last-child').remove();
            });
        }
    }

    function arrange_animate_icon() {
        jQuery('.animate-icon-module-style1').each(function() {
            var $this = jQuery(this),
                $width, $gutter = Number($this.closest('.animate-icon-module-style1-wrap').attr('data-gutter-width')),
                $item_width;
            $width = Number($this.closest('.animate-icon-module-style1-wrap-container').width());
            $this.closest('.animate-icon-module-style1-wrap').width($width);
            $item_width = ($width - (($this.siblings().length) * $gutter));
            $this.width($item_width / ($this.siblings().length + 1));
            if ($this.is(':last-child')) {
                $this.css('margin-right', '0px');
            } else {
                $this.css('margin-right', $gutter + 'px');
            }
            $this.css('opacity', 1);
        });
        jQuery('.animate-icon-module-style2-wrap').each(function() {
            var $this = jQuery(this),
                $normal_content_height = 0,
                $hover_content_height = 0,
                $module_height = 0;
            var $max_module_height = 0;
            var i = 1;
            $this.find('.animate-icon-module-style2').each(function() {
                var $this_module = jQuery(this);
                $normal_content_height = Number($this_module.find('.animate-icon-module-style2-normal-content').innerHeight());
                $hover_content_height = Number($this_module.find('.animate-icon-module-style2-hover-content').innerHeight());
                $module_height = $normal_content_height + $hover_content_height;
                if (jQuery(window).width() <= 960) {
                    $this_module.closest('.animate-icon-module-style2-wrap').css('height', 'auto');
                    $this_module.find('.animate-icon-module-style2-inner-wrap').css('height', $module_height + 115 + 'px');
                } else {
                    if (i == 1) {
                        $max_module_height = $module_height;
                    } else {
                        if ($module_height >= $max_module_height) {
                            $max_module_height = $module_height;
                        }
                    }
                    i = i + 1;
                }
            });
            if (jQuery(window).width() > 960) {
                $this.css('height', $max_module_height * 2 + 40 + 'px');
                $this.find('.animate-icon-module-style2-inner-wrap').css('height', 'auto');
            }
            $this.find('.animate-icon-module-style2').css('opacity', 1);
        });
    }

    function be_lightbox() {
        if (jQuery('.image-popup-vertical-fit').length > 0) {
            jQuery('.image-popup-vertical-fit').magnificPopup({
                mainClass: 'mfp-img-mobile my-mfp-zoom-in',
                closeOnContentClick: true,
                gallery: {
                    enabled: true
                },
                image: {
                    verticalFit: true,
                    titleSrc: 'title'
                },
                zoom: {
                    enabled: true,
                    duration: 300
                },
                preloader: true,
                type: 'inline',
                overflowY: 'auto',
                removalDelay: 300,
                callbacks: {
                    afterClose: function() {
                        if (jQuery('body').hasClass('smooth-scroll')) {
                            jQuery('html').css('overflow-y', 'scroll');
                        }
                    },
                    open: function() {
                        jQuery('body').addClass('mfp-active-state');
                        if (jQuery('#main').hasClass('layout-border')) {
                            jQuery('.mfp-content').addClass('layout-border');
                        }
                    },
                    close: function() {
                        jQuery('body').removeClass('mfp-active-state');
                    }
                }
            });
        }
        if (jQuery('.mfp-iframe').length > 0) {
            jQuery('.mfp-iframe').magnificPopup({
                iframe: {
                    patterns: {
                        youtube: {
                            index: 'youtube.com/',
                            id: 'v=',
                            src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0&showinfo=0'
                        }
                    }
                }
            });
        }
        if (jQuery('.popup-gallery').length > 0) {
            jQuery('.popup-gallery').magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1]
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                },
                preloader: true,
                callbacks: {
                    afterClose: function() {
                        if (jQuery('body').hasClass('smooth-scroll')) {
                            jQuery('html').css('overflow-y', 'scroll');
                        }
                    },
                    open: function() {
                        jQuery('body').addClass('mfp-active-state');
                        if (jQuery('#main').hasClass('layout-border')) {
                            jQuery('.mfp-content').addClass('layout-border');
                        }
                    },
                    close: function() {
                        jQuery('body').removeClass('mfp-active-state');
                    }
                }
            });
        }
        if (jQuery('.popup-with-content').length > 0) {
            jQuery('.popup-with-content').magnificPopup({
                type: 'inline',
                preloader: false
            });
        }
    }

    function be_custom_scroll_animation() {
        if (jQuery('.animate-number.animate').length > 0) {
            jQuery('.animate-number.animate').each(function(i, el) {
                var el = jQuery(el);
                if (el.visible(true)) {
                    el.removeClass('animate');
                    var $endval = Number(el.attr('data-number'));
                    el.countTo({
                        from: 0,
                        to: $endval,
                        speed: 1500,
                        refreshInterval: 30
                    });
                }
            });
        }
        if (jQuery('.chart').length > 0) {
            jQuery('.chart').each(function(i, el) {
                var el = jQuery(el);
                if (el.visible(true)) {
                    var $this = jQuery(this),
                        $barColor = $this.attr('data-percentage-bar-color'),
                        $trackColor = $this.attr('data-percentage-track-color'),
                        $scaleColor = $this.attr('data-percentage-scale-color'),
                        $size = $this.attr('data-size'),
                        $lineWidth = $this.attr('data-linewidth');
                    $this.easyPieChart({
                        animate: 1000,
                        barColor: $barColor,
                        trackColor: $trackColor,
                        scaleColor: $scaleColor,
                        size: $size,
                        lineWidth: $lineWidth,
                        onStep: function(from, to, percent) {
                            jQuery(this.el).find('span.percentage').text(Math.round(percent));
                            jQuery(this.el).find('span.percentage').attr('data-from', from);
                            jQuery(this.el).find('span.percentage').attr('data-to', to);
                        }
                    });
                }
            });
        }
        if (jQuery('.be-skill').length > 0) {
            jQuery('.be-skill').each(function(i, el) {
                var el = jQuery(el);
                if (el.visible(true)) {
                    var $this = jQuery(this),
                        $animate_property = 'width';
                    if ($this.closest('.skill_container').hasClass('skill-vertical')) {
                        $animate_property = 'height';
                    }
                    $this.css($animate_property, jQuery(this).attr('data-skill-value'));
                }
            });
        }
        if (jQuery('.be-animate').length > 0) {
            jQuery('.be-animate').each(function(i, el) {
                var el = jQuery(el);
                if (el.visible(true)) {
                    el.addClass("already-visible");
                    el.addClass(el.attr('data-animation'));
                    el.addClass('animated');
                }
            });
        }
        if (jQuery('.be-section.be-bg-parallax').length > 0) {
            jQuery('.be-section.be-bg-parallax').each(function(i, el) {
                var el = jQuery(el);
                if (el.visible(true)) {
                    if (!jQuery(this).hasClass('parallaxed')) {
                        jQuery(this).parallax("50%", 0.4);
                        jQuery(this).addClass('parallaxed');
                    }
                }
            });
        }
        if (jQuery('.portfolio-container.portfolio-item-parallax').length > 0) {
            if (jQuery('html').hasClass('no-touch') && (jQuery(window).width() >= 768)) {
                jQuery('.portfolio-container.portfolio-item-parallax').each(function() {
                    var $window_height = jQuery(window).height(),
                        $window_scroll_top = jQuery(window).scrollTop();
                    jQuery(this).find('.element.parallax-effect').each(function() {
                        var $this = jQuery(this),
                            offset = $this.offset().top,
                            animate_pos = offset - ($window_height / 2),
                            opacity = ((animate_pos) - $window_scroll_top) / 1.5,
                            opacity_2 = opacity * 1.7;
                        $this.find('.element-inner').css({
                            '-webkit-transform': 'translatey(' + opacity_2 + 'px) scale(0.7) translatez(0px)',
                            '-moz-transform': 'translatey(' + opacity_2 + 'px) scale(0.7) translatez(0px)',
                            '-o-transform': 'translatey(' + opacity_2 + 'px) scale(0.7) translatez(0px)',
                            '-ms-transform': 'translatey(' + opacity_2 + 'px) scale(0.7) translatez(0px)',
                            'transform': 'translatey(' + opacity_2 + 'px) scale(0.7) translatez(0px)'
                        });
                        $this.find('.thumb-title-wrap, .custom-like-button').css({
                            '-webkit-transform': 'scale(1.4) translatez(0px)',
                            '-moz-transform': 'scale(1.4) translatez(0px)',
                            '-o-transform': 'scale(1.4) translatez(0px)',
                            '-ms-transform': 'scale(1.4) translatez(0px)',
                            'transform': 'scale(1.4) translatez(0px)'
                        });
                    });
                    jQuery(this).find('.element.no-parallax-effect').each(function() {
                        var $this = jQuery(this),
                            offset = $this.offset().top,
                            animate_pos = offset - ($window_height / 2),
                            opacity = ((animate_pos) - $window_scroll_top) / 2;
                        $this.find('.element-inner').css({
                            '-webkit-transform': 'translatey(' + opacity + 'px) translatez(0px)',
                            '-moz-transform': 'translatey(' + opacity + 'px) translatez(0px)',
                            '-o-transform': 'translatey(' + opacity + 'px) translatez(0px)',
                            '-ms-transform': 'translatey(' + opacity + 'px) translatez(0px)',
                            'transform': 'translatey(' + opacity + 'px) translatez(0px)',
                        });
                    });
                });
            }
        }
    }

    function be_reset_colblock_height() {
        if (jQuery(window).width() < 768) {
            jQuery('.be-no-space .column-block').each(function() {
                if (jQuery(this).children('div').children().length > 0) {
                    jQuery(this).css('min-height', 'initial');
                }
            });
        }
    }

    function do_ajax_complete() {
        if (jQuery('.justified-gallery').length > 0) {
            jQuery('.justified-gallery').each(function() {
                var $this = jQuery(this),
                    $gutter_width = $this.attr('data-gutter-width'),
                    $image_height = $this.attr('data-image-height');
                $this.imagesLoaded(function() {
                    $this.justifiedGallery({
                        rowHeight: $image_height,
                        margins: $gutter_width,
                    })
                    var delay = 1;
                    $this.find('.element').each(function() {
                        jQuery(this).find('img').one("load", function() {
                            jQuery(this).parent().delay(delay).addClass('img-loaded', 300);
                            delay += 200;
                        }).each(function() {
                            if (this.complete) {
                                jQuery(this).load();
                            }
                        });
                    });
                });
            });
        }
        if (jQuery(".trigger_infinite_scroll.justified_gallery_infinite_scroll").length > 0) {
            jQuery(".trigger_infinite_scroll.justified_gallery_infinite_scroll").each(function() {
                var $this = jQuery(this),
                    $justified_gallery_wrap = $this.closest('.justified-gallery-inner-wrap'),
                    $justified_gallery = $justified_gallery_wrap.find('.justified-gallery'),
                    $paged = Number($justified_gallery_wrap.attr("data-paged")),
                    $action = $justified_gallery_wrap.attr("data-action"),
                    $source = $justified_gallery_wrap.attr("data-source"),
                    $images_arr = $justified_gallery_wrap.attr("data-images-array"),
                    $items_per_load = $justified_gallery_wrap.attr("data-items-per-load"),
                    $hover_style = $justified_gallery_wrap.attr("data-hover-style"),
                    $img_grayscale = $justified_gallery_wrap.attr("data-image-grayscale"),
                    $image_effect = $justified_gallery_wrap.attr("data-image-effect"),
                    $thumb_overlay_color = $justified_gallery_wrap.attr("data-thumb-overlay-color"),
                    $gradient_style_color = $justified_gallery_wrap.attr("data-grad-style-color"),
                    $like_button = $justified_gallery_wrap.attr("data-like-button"),
                    $disable_overlay = $justified_gallery_wrap.attr("data-disable-overlay"),
                    $ajaxData = "action=" + $action + "&source=" + $source + "&images_arr=" + $images_arr + "&items_per_load=" + $items_per_load + "&hover_style=" + $hover_style + "&img_grayscale=" + $img_grayscale + "&image_effect=" + $image_effect + "&thumb_overlay_color=" + $thumb_overlay_color + "&gradient_style_color=" + $gradient_style_color + "&like_button=" + $like_button + "&disable_overlay=" + $disable_overlay;
                var be_waypoint = new Waypoint({
                    element: $this,
                    handler: function(direction) {
                        if (direction === 'down') {
                            var $this_waypoint = this,
                                $page_loader = jQuery('.page-loader');
                            $this_waypoint.disable();
                            $page_loader.fadeIn();
                            jQuery.ajax({
                                type: "POST",
                                url: ajax_url,
                                data: $ajaxData + "&paged=" + $paged
                            }).done(function(data) {
                                if (data != 'Array0') {
                                    var $newItems = jQuery(data);
                                    $newItems.imagesLoaded(function() {
                                        $justified_gallery.append($newItems).justifiedGallery('norewind');
                                        var delay = 1;
                                        $justified_gallery.find('.element').each(function() {
                                            jQuery(this).find('img').one("load", function() {
                                                jQuery(this).parent().delay(delay).addClass('img-loaded', 300);
                                                delay += 200;
                                            }).each(function() {
                                                if (this.complete) {
                                                    jQuery(this).load();
                                                }
                                            });
                                        });
                                        $this_waypoint.enable();
                                        $paged = Number($paged) + 1;
                                        $page_loader.fadeOut();
                                    });
                                } else {
                                    $this_waypoint.destroy();
                                    $this.fadeOut();
                                    $page_loader.fadeOut();
                                }
                            });
                        }
                    },
                    offset: 'bottom-in-view'
                })
            });
        }
        jQuery('.portfolio-container').imagesLoaded(function() {
            jQuery('.portfolio-container.force-show-thumb-overlay').css('opacity', '1');
        });
        if (jQuery('.accordion').length > 0) {
            jQuery('.accordion').each(function() {
                var $accordion = jQuery(this),
                    $collapse = Number($accordion.attr('data-collapsed'));
                if ($collapse === 1) {
                    $accordion.accordion({
                        collapsible: $collapse,
                        heightStyle: "content",
                        active: false
                    }).css('opacity', 1);
                } else {
                    $accordion.accordion({
                        collapsible: $collapse,
                        heightStyle: "content"
                    }).css('opacity', 1);
                }
            });
        }
        if (jQuery('.tabs').length > 0) {
            jQuery('.tabs').tabs({
                fx: {
                    opacity: 'toggle',
                    duration: 200
                }
            }).css('opacity', 1);
        }
        if ((!jQuery('html').hasClass('touch')) && (jQuery('.be-section.be-bg-parallax').length > 0)) {
            jQuery('.be-section.be-bg-parallax').appear();
            jQuery('.be-section.be-bg-parallax').each(function() {
                if (jQuery(this).is(':appeared')) {
                    if (!jQuery(this).hasClass('parallaxed')) {
                        jQuery(this).parallax("50%", 0.5);
                        jQuery(this).addClass('parallaxed');
                    }
                }
            });
        }
        (function() {
            var initPhotoSwipeFromDOM = function(gallerySelector) {
                var parseThumbnailElements = function(el) {
                    var items = [],
                        el, childElements, thumbnailEl, size, item;
                    var anchor = jQuery(el).find('a.thumb-wrap');
                    anchor.each(function() {
                        size = jQuery(this).attr('data-size').split('x');
                        item = {
                            src: jQuery(this).attr('href'),
                            w: parseInt(size[0], 10),
                            h: parseInt(size[1], 10),
                            author: jQuery(this).attr('data-author')
                        };
                        item.title = jQuery(this).attr('title');
                        item.el = jQuery(this);
                        item.o = {
                            src: item.src,
                            w: item.w,
                            h: item.h
                        };
                        items.push(item);
                    });
                    return items;
                };
                var closest = function closest(el, fn) {
                    return el && (fn(el) ? el : closest(el.parentNode, fn));
                };
                var onThumbnailsClick = function(e) {
                    e = e || window.event;
                    e.preventDefault ? e.preventDefault() : e.returnValue = false;
                    var eTarget = e.target || e.srcElement;
                    if (!clickedListItem) {
                        return;
                    }
                    var clickedGallery = clickedListItem.parentNode;
                    var childNodes = clickedListItem.parentNode.childNodes,
                        numChildNodes = childNodes.length,
                        nodeIndex = 0,
                        index;
                    for (var i = 0; i < numChildNodes; i++) {
                        if (childNodes[i].nodeType !== 1) {
                            continue;
                        }
                        if (childNodes[i] === clickedListItem) {
                            index = nodeIndex;
                            break;
                        }
                        nodeIndex++;
                    }
                    if (index >= 0) {
                        openPhotoSwipe(index, clickedGallery);
                    }
                    return false;
                };
                var photoswipeParseHash = function() {
                    var hash = window.location.hash.substring(1),
                        params = {};
                    if (hash.length < 5) {
                        return params;
                    }
                    var vars = hash.split('&');
                    for (var i = 0; i < vars.length; i++) {
                        if (!vars[i]) {
                            continue;
                        }
                        var pair = vars[i].split('=');
                        if (pair.length < 2) {
                            continue;
                        }
                        params[pair[0]] = pair[1];
                    }
                    if (params.gid) {
                        params.gid = parseInt(params.gid, 10);
                    }
                    if (!params.hasOwnProperty('pid')) {
                        return params;
                    }
                    params.pid = parseInt(params.pid, 10);
                    return params;
                };
                var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
                    var pswpElement = document.querySelectorAll('.pswp')[0],
                        gallery, options, items, history = true;
                    if (jQuery('body').hasClass('all-ajax-content')) {
                        history = false;
                    }
                    items = parseThumbnailElements(galleryElement);
                    options = {
                        index: index,
                        history: history,
                        galleryUID: galleryElement.attr('data-pswp-uid'),
                        getThumbBoundsFn: function(index) {
                            var thumbnail = items[index].el.find('img')[0],
                                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                                rect = thumbnail.getBoundingClientRect();
                            return {
                                x: rect.left,
                                y: rect.top + pageYScroll,
                                w: rect.width
                            };
                        },
                        addCaptionHTMLFn: function(item, captionEl, isFake) {
                            if (!item.title) {
                                captionEl.children[0].innerText = '';
                                return false;
                            }
                            captionEl.children[0].innerHTML = item.title;
                            return true;
                        }
                    };
                    var radios = document.getElementsByName('gallery-style');
                    for (var i = 0, length = radios.length; i < length; i++) {
                        if (radios[i].checked) {
                            if (radios[i].id == 'radio-all-controls') {} else if (radios[i].id == 'radio-minimal-black') {
                                options.mainClass = 'pswp--minimal--dark';
                                options.barsSize = {
                                    top: 0,
                                    bottom: 0
                                };
                                options.captionEl = false;
                                options.fullscreenEl = false;
                                options.shareEl = false;
                                options.bgOpacity = 0.85;
                                options.tapToClose = true;
                                options.tapToToggleControls = false;
                            }
                            break;
                        }
                    }
                    if (disableAnimation) {
                        options.showAnimationDuration = 0;
                    }
                    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                    var realViewportWidth, useLargeImages = false,
                        firstResize = true,
                        imageSrcWillChange;
                    gallery.listen('beforeResize', function() {
                        var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
                        dpiRatio = Math.min(dpiRatio, 2.5);
                        realViewportWidth = gallery.viewportSize.x * dpiRatio;
                        if (realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200) {
                            if (!useLargeImages) {
                                useLargeImages = true;
                                imageSrcWillChange = true;
                            }
                        } else {
                            if (useLargeImages) {
                                useLargeImages = false;
                                imageSrcWillChange = true;
                            }
                        }
                        if (imageSrcWillChange && !firstResize) {
                            gallery.invalidateCurrItems();
                        }
                        if (firstResize) {
                            firstResize = false;
                        }
                        imageSrcWillChange = false;
                    });
                    gallery.listen('gettingData', function(index, item) {
                        item.src = item.o.src;
                        item.w = item.o.w;
                        item.h = item.o.h;
                    });
                    gallery.init();
                };
                var galleryElements = jQuery(gallerySelector);
                var i = 0;
                galleryElements.each(function() {
                    var $this = jQuery(this);
                    $this.attr('data-pswp-uid', i + 1);
                    $this.off('click');
                    $this.on('click', 'a.thumb-wrap', function(e) {
                        e.preventDefault();
                        openPhotoSwipe(jQuery(this).closest('.element').index(), $this);
                    });
                    i++;
                });
                var hashData = photoswipeParseHash();
                if (hashData.pid > 0 && hashData.gid > 0) {
                    openPhotoSwipe(hashData.pid - 1, galleryElements.eq(hashData.gid - 1), true);
                }
            };
            initPhotoSwipeFromDOM('.be-photoswipe-gallery');
        })();
        if (jQuery('.portfolio-container').length > 0) {
            jQuery('.portfolio-container').each(function() {
                var $this = jQuery(this),
                    $i = 0;
                if ($this.closest('.portfolio').hasClass('two-col')) {
                    $this.find('.element').each(function() {
                        if ($i == 1 || $i == 2) {
                            jQuery(this).addClass('parallax-effect');
                            $i = $i + 1;
                        } else if ($i == 3) {
                            jQuery(this).addClass('no-parallax-effect');
                            $i = 0;
                        } else {
                            jQuery(this).addClass('no-parallax-effect');
                            $i = $i + 1;
                        }
                    });
                } else {
                    $this.find('.element:odd').addClass('parallax-effect');
                    $this.find('.element:even').addClass('no-parallax-effect');
                }
            });
        }
        if (jQuery('.portfolio-container .element.style3-hover .element-inner').length > 0) {
            jQuery('.portfolio-container .element.style3-hover .element-inner').each(function() {
                jQuery(this).hoverdir();
            });
        }
        if (jQuery('.portfolio-container .element.style4-hover .element-inner').length > 0) {
            jQuery('.portfolio-container .element.style4-hover .element-inner').each(function() {
                jQuery(this).hoverdir({
                    inverse: true
                });
            });
        }
        if (jQuery(".rotates").length > 0) {
            jQuery(".rotates").each(function() {
                var $animation = jQuery(this).attr('data-animation'),
                    $speed = Number(jQuery(this).attr('data-speed'));
                jQuery(this).textrotator({
                    animation: $animation,
                    separator: "||",
                    speed: $speed
                }).css('opacity', 1);
            });
        }
        if (jQuery(".typed").length > 0) {
            jQuery(".typed").each(function() {
                var $this = jQuery(this),
                    $typed_text = $this.text(),
                    $typed_text_arr = $typed_text.split('||');
                $this.empty().typed({
                    strings: $typed_text_arr,
                    typeSpeed: 30,
                    backDelay: 500,
                    loop: true,
                    loopCount: false
                }).css('opacity', 1);
            });
        }
        if (jQuery(".be-services").length > 0) {
            jQuery('.be-services').each(function() {
                var $this = jQuery(this);
                $this.find('li:even').addClass('even');
                $this.find('li:odd').addClass('odd');
                $this.find('li:last-child').addClass('last');
                $this.animate({
                    opacity: 1
                });
            });
        }
        if (jQuery('.client-carousel-module').length > 0) {
            jQuery('.client-carousel-module').imagesLoaded(function() {
                jQuery('.client-carousel-module').each(function() {
                    var $this = jQuery(this),
                        $slideShow = $this.attr('data-slide-show'),
                        $slideshowspeed = 4000,
                        $item_number = $this.children('.client-carousel-item').length;
                    if ($item_number > 5) {
                        $item_number = 5;
                    }
                    if (0 == $slideShow) {
                        $slideShow = false;
                    } else {
                        $slideShow = true;
                        $slideshowspeed = $this.attr('data-slide-show-speed');
                    }
                    if ($item_number == 1) {
                        $this.fadeIn();
                    } else {
                        $this.owlCarousel({
                            navSpeed: 500,
                            autoplay: $slideShow,
                            autoplayTimeout: $slideshowspeed,
                            autoplaySpeed: 1000,
                            autoplayHoverPause: true,
                            loop: true,
                            navRewind: false,
                            nav: false,
                            responsiveRefreshRate: 0,
                            responsive: {
                                0: {
                                    items: 2,
                                    dots: true
                                },
                                768: {
                                    items: $item_number,
                                    dots: false
                                }
                            },
                            onInitialize: function() {
                                $this.fadeIn(500);
                                $this.trigger('refresh.owl.carousel');
                            },
                        });
                    }
                });
            });
        }
        if (jQuery('.portfolio-carousel-module').length > 0) {
            jQuery('.portfolio-carousel-module').imagesLoaded(function() {
                jQuery('.portfolio-carousel-module').each(function() {
                    var $this = jQuery(this),
                        $item_number = $this.children('.carousel-item').length;
                    if ($item_number > 5) {
                        $item_number = 5;
                    }
                    if ($item_number == 1) {
                        $this.fadeIn();
                    } else {
                        $this.owlCarousel({
                            autoplay: false,
                            autoplayHoverPause: true,
                            navRewind: false,
                            navText: ['<i class="font-icon icon-arrow_carrot-left"></i>', '<i class="font-icon icon-arrow_carrot-right"></i>'],
                            responsiveRefreshRate: 0,
                            responsive: {
                                0: {
                                    items: 2,
                                    dots: true,
                                    nav: false
                                },
                                767: {
                                    items: $item_number,
                                    dots: false,
                                    nav: true
                                }
                            },
                            onInitialize: function() {
                                $this.fadeIn(500);
                                $this.trigger('refresh.owl.carousel');
                            }
                        });
                    }
                });
            });
        }
        if (jQuery('.be_image_slider').length > 0) {
            jQuery('.be_image_slider').imagesLoaded(function() {
                jQuery('.be_image_slider').each(function() {
                    var $this = jQuery(this).find('.image_slider_module'),
                        $slideshow = $this.attr('data-auto-slide'),
                        $slideshowspeed = 5000,
                        $number = $this.find('.be_image_slide').length;
                    if ('no' == $slideshow) {
                        $slideshow = false;
                    } else {
                        $slideshow = true;
                        $slideshowspeed = $this.attr('data-slide-interval');
                    }
                    if ($number == 1) {
                        $this.fadeIn();
                    } else {
                        $this.owlCarousel({
                            items: 1,
                            autoHeight: true,
                            autoplay: $slideshow,
                            autoplayTimeout: $slideshowspeed,
                            autoplaySpeed: 1000,
                            autoplayHoverPause: true,
                            navRewind: false,
                            nav: true,
                            loop: true,
                            navText: ['<i class="font-icon icon-arrow_carrot-left"></i>', '<i class="font-icon icon-arrow_carrot-right"></i>'],
                            dots: false,
                            onInitialize: function() {
                                $this.fadeIn(500);
                                $this.trigger('refresh.owl.carousel');
                            }
                        });
                    }
                });
            });
        }
        if (jQuery('.testimonials-slides').length > 0) {
            jQuery('.testimonials-slides').imagesLoaded(function() {
                jQuery('.testimonials-slides').each(function() {
                    var $slide = jQuery(this),
                        $this = jQuery(this).find('.testimonial_module'),
                        $slideshow = Number($this.attr('data-slide-show')),
                        $slideshowspeed = 4000,
                        $pagination = Number($this.attr('data-pagination')),
                        $number = $slide.find('.testimonial_slide').length;
                    if (0 == $slideshow) {
                        $slideshow = false;
                    } else {
                        $slideshow = true;
                        $slideshowspeed = $this.attr('data-slide-show-speed');
                    }
                    if ($pagination == 0) {
                        $pagination = false;
                    } else {
                        $pagination = true;
                    }
                    if ($number == 1) {
                        $slide.fadeIn();
                    } else {
                        $this.owlCarousel({
                            items: 1,
                            autoHeight: true,
                            autoplay: $slideshow,
                            autoplayTimeout: $slideshowspeed,
                            autoplaySpeed: 1000,
                            autoplayHoverPause: true,
                            navRewind: false,
                            loop: true,
                            dots: $pagination,
                            onInitialize: function() {
                                $slide.fadeIn();
                                $this.trigger('refresh.owl.carousel');
                            }
                        });
                    }
                });
            });
        }
        if (jQuery('.tweet-slides').length > 0) {
            jQuery('.tweet-slides').each(function() {
                var $slide = jQuery(this),
                    $this = jQuery(this).find('.twitter_module'),
                    $autoplayTime = Number($this.attr('data-autoplay')),
                    $autoplay = false,
                    $pagination = Number($this.attr('data-pagination')),
                    $number = $this.children('.tweet_list').length;
                if ($autoplayTime == 0) {
                    $autoplay = false;
                } else {
                    $autoplay = true;
                }
                if ($pagination == 0) {
                    $pagination = false;
                } else {
                    $pagination = true;
                }
                if ($number == 1) {
                    $slide.fadeIn();
                } else {
                    $this.owlCarousel({
                        items: 1,
                        autoHeight: true,
                        autoplay: $autoplay,
                        autoplayTimeout: $autoplayTime,
                        autoplaySpeed: 1000,
                        autoplayHoverPause: true,
                        navRewind: false,
                        loop: true,
                        dots: $pagination,
                        onInitialize: function() {
                            $slide.fadeIn();
                            $this.trigger('refresh.owl.carousel');
                        }
                    });
                }
            });
        }
        if (jQuery('.content-slider').length > 0) {
            jQuery('.content-slider').imagesLoaded(function() {
                jQuery('.content-slider').each(function() {
                    var $slide = jQuery(this),
                        $this = jQuery(this).find('.content_slider_module'),
                        $slideshow = Number($this.attr('data-slide-show')),
                        $slideshowspeed = 4000,
                        $item_number = $this.children('.content_slide').length;
                    if (0 == $slideshow) {
                        $slideshow = false;
                    } else {
                        $slideshow = true;
                        $slideshowspeed = $this.attr('data-slide-show-speed');
                    }
                    if ($item_number == 1) {
                        $slide.fadeIn();
                    } else {
                        $this.owlCarousel({
                            items: 1,
                            autoHeight: true,
                            autoplay: $slideshow,
                            autoplayTimeout: $slideshowspeed,
                            autoplaySpeed: 1000,
                            autoplayHoverPause: true,
                            navRewind: false,
                            loop: true,
                            dots: true,
                            onInitialize: function() {
                                $slide.fadeIn();
                                $this.trigger('refresh.owl.carousel');
                            }
                        });
                    }
                });
            });
        }
        if (jQuery('.skill_container.skill-vertical').length > 0) {
            jQuery('.skill_container.skill-vertical').each(function() {
                var $this = jQuery(this),
                    $width = (100 / $this.find('.skill-wrap').length) + '%';
                $this.find('.skill-wrap').css('width', $width).css('display', 'block');
            });
        }
        arrange_team();
        arrange_animate_icon();
        be_google_maps();
        be_custom_scroll_animation();
        be_countdown();
        be_lightbox();
        be_reset_colblock_height();
    }
    jQuery(document).on('update_content', function() {
        do_ajax_complete();
    });
    jQuery(document).ready(function() {
        do_ajax_complete();
        jQuery(document).on('click', '.be-lightbox-gallery', function(e) {
            e.preventDefault();
            jQuery(this).next('.popup-gallery').magnificPopup('open');
        });
        jQuery(document).on('click', '.be-notification .close', function(e) {
            e.preventDefault();
            jQuery(this).closest('.be-notification').slideUp(500);
        });
        jQuery(document).on('mouseenter', '.owl-carousel', function() {
            jQuery(this).find('.owl-buttons').css('opacity', 1);
        });
        jQuery(document).on('mouseleave', '.owl-carousel', function() {
            jQuery(this).find('.owl-buttons').css('opacity', 0);
        });
        jQuery(document).on('mouseenter', '.column-block', function() {
            var data_opacity = jQuery(this).find('.section-overlay.animate-hide').attr("data-opacity");
            jQuery(this).find('.section-overlay.animate-hide').css('opacity', data_opacity);
        });
        jQuery(document).on('mouseleave', '.column-block', function() {
            jQuery(this).find('.section-overlay.animate-hide').css('opacity', 0);
        });
        jQuery(document).on('mouseenter', '.column-block', function() {
            jQuery(this).find('.section-overlay.animate-show').css('opacity', 0);
        });
        jQuery(document).on('mouseleave', '.column-block', function() {
            var data_opacity = jQuery(this).find('.section-overlay.animate-show').attr("data-opacity");
            jQuery(this).find('.section-overlay.animate-show').css('opacity', data_opacity);
        });
        jQuery(document).on('mouseenter', '.portfolio-container .style1-hover .element-inner', function() {
            jQuery(this).find('.thumb-overlay').stop(true, true).fadeIn(400);
        });
        jQuery(document).on('mouseleave', '.portfolio-container  .style1-hover .element-inner', function() {
            jQuery(this).find('.thumb-overlay').stop(true, true).fadeOut(400);
        });
        jQuery(document).on('mouseenter', '.no-touch .justified-gallery .style1-hover .element-inner', function() {
            jQuery(this).find('.thumb-overlay').stop(true, true).fadeIn(400);
        });
        jQuery(document).on('mouseleave', '.no-touch .justified-gallery .style1-hover .element-inner', function() {
            jQuery(this).find('.thumb-overlay').stop(true, true).fadeOut(400);
        });
        jQuery(document).on('click', '.contact_submit', function() {
            var $this = jQuery(this),
                $contact_status = $this.closest('.contact_form').find(".contact_status"),
                $contact_loader = $this.closest('.contact_form').find(".contact_loader");
            $contact_loader.fadeIn();
            jQuery.ajax({
                type: "POST",
                url: ajax_url,
                dataType: 'json',
                data: "action=contact_authentication&" + jQuery(this).closest(".contact").serialize(),
                success: function(msg) {
                    $contact_loader.fadeOut();
                    if (msg.status === "error") {
                        $contact_status.removeClass("success").addClass("error");
                    } else {
                        $contact_status.addClass("success").removeClass("error");
                    }
                    $contact_status.html(msg.data).slideDown();
                },
                error: function() {
                    $contact_status.html("Please Try Again Later").slideDown();
                }
            });
            return false;
        });
        jQuery(document).on('click', '.mail-chimp-submit', function() {
            var $this = jQuery(this),
                $subscribe_status = $this.closest('.mail-chimp-wrap').find(".subscribe_status"),
                $subscribe_loader = $this.closest('.mail-chimp-wrap').find(".subscribe_loader");
            $subscribe_loader.fadeIn();
            jQuery.ajax({
                type: "POST",
                url: ajax_url,
                dataType: 'json',
                data: "action=mailchimp_subscription&" + jQuery(this).closest(".mail-chimp-form").serialize(),
                success: function(msg) {
                    $subscribe_loader.fadeOut();
                    if (msg.status === "error") {
                        $subscribe_status.removeClass("success").addClass("error");
                    } else {
                        $subscribe_status.addClass("success").removeClass("error");
                    }
                    $subscribe_status.html(msg.data).slideDown();
                },
                error: function() {
                    $subscribe_status.html("Please Try Again Later").slideDown();
                    $subscribe_loader.fadeOut();
                }
            });
            return false;
        });
        jQuery(document).on('mouseenter', '.be-button', function() {
            var $border_color = jQuery(this).attr("data-hover-border-color"),
                $bg_color = jQuery(this).attr("data-hover-bg-color"),
                $color = jQuery(this).attr("data-hover-color"),
                $icon_color = jQuery(this).attr("data-hover-icon-color");
            jQuery(this).css('border-color', $border_color);
            jQuery(this).css('color', $color);
            jQuery(this).find('i').css('color', $icon_color);
            if (!((jQuery('html').hasClass('cssgradients')) && (jQuery(this).hasClass('bg-animation-slide-top') || jQuery(this).hasClass('bg-animation-slide-left') || jQuery(this).hasClass('bg-animation-slide-bottom') || jQuery(this).hasClass('bg-animation-slide-right')))) {
                jQuery(this).css('background-color', $bg_color);
            }
        });
        jQuery(document).on('mouseleave', '.be-button', function() {
            var $border_color = jQuery(this).attr("data-border-color"),
                $bg_color = jQuery(this).attr("data-bg-color"),
                $color = jQuery(this).attr("data-color"),
                $icon_color = jQuery(this).attr("data-icon-color");
            jQuery(this).css('border-color', $border_color);
            jQuery(this).css('color', $color);
            jQuery(this).find('i').css('color', $icon_color);
            if (!((jQuery('html').hasClass('cssgradients')) && (jQuery(this).hasClass('bg-animation-slide-top') || jQuery(this).hasClass('bg-animation-slide-left') || jQuery(this).hasClass('bg-animation-slide-bottom') || jQuery(this).hasClass('bg-animation-slide-right')))) {
                jQuery(this).css('background-color', $bg_color);
            }
        });
        jQuery(document).on('mouseenter', '.animate-icon-module', function() {
            var $bg_color = jQuery(this).attr("data-hover-bg-color");
            jQuery(this).css('background-color', $bg_color);
        });
        jQuery(document).on('mouseleave', '.animate-icon-module', function() {
            var $bg_color = jQuery(this).attr("data-bg-color");
            jQuery(this).css('background-color', $bg_color);
        });
        jQuery(document).on('mouseenter', '.icon-shortcode .font-icon', function() {
            var $border_color = jQuery(this).attr("data-hover-border-color"),
                $bg_color = jQuery(this).attr("data-hover-bg-color"),
                $color = jQuery(this).attr("data-hover-color");
            jQuery(this).css('border-color', $border_color);
            jQuery(this).css('background-color', $bg_color);
            jQuery(this).css('color', $color);
        });
        jQuery(document).on('mouseleave', '.icon-shortcode .font-icon', function() {
            var $border_color = jQuery(this).attr("data-border-color"),
                $bg_color = jQuery(this).attr("data-bg-color"),
                $color = jQuery(this).attr("data-color");
            jQuery(this).css('border-color', $border_color);
            jQuery(this).css('background-color', $bg_color);
            jQuery(this).css('color', $color);
        });
        jQuery(document).on('mouseenter', '.service-wrap', function() {
            var $hover_bg_color = jQuery(this).attr("data-hover-bg-color"),
                $hover_color = jQuery(this).attr("data-hover-color");
            jQuery(this).find('.font-icon').css({
                "background-color": $hover_bg_color,
                "color": $hover_color
            });
        });
        jQuery(document).on('mouseleave', '.service-wrap', function() {
            var $default_bg_color = jQuery(this).attr("data-bg-color"),
                $default_color = jQuery(this).attr("data-color");
            jQuery(this).find('.font-icon').css({
                "background-color": $default_bg_color,
                "color": $default_color
            });
        });
        jQuery(document).on('click', '.custom-like-button', function(e) {
            var $this = jQuery(this),
                $post_id = $this.attr('data-post-id');
            $this.addClass('disable');
            jQuery.ajax({
                type: "POST",
                url: ajax_url,
                dataType: 'json',
                data: "action=post_like&post_id=" + $post_id,
                success: function(msg) {
                    if (msg.status === "success") {
                        $this.addClass('liked');
                        $this.removeClass('no-liked');
                        $this.find('span').text(msg.count);
                    }
                },
                error: function(msg) {
                    alert(msg);
                }
            });
            return false;
        });
        jQuery(document).on('mouseenter', '.element-inner', function(e) {
            jQuery(this).find('.animation-trigger').addClass(function() {
                return jQuery(this).attr('data-animation-type');
            });
        });
        jQuery(document).on('mouseleave', '.element-inner', function(e) {
            jQuery(this).find('.animation-trigger').removeClass(function() {
                return jQuery(this).attr('data-animation-type');
            });
        });
        jQuery(document).on('mouseenter', '.animate-icon-module-style2', function() {
            var $this = jQuery(this);
            $this.css('background-color', $this.attr('data-hover-bg-color'));
            $this.find('.animate-icon-title').css('color', $this.attr('data-hover-title-color'));
            $this.find('.animate-icon-icon').css('color', $this.attr('data-hover-icon-color'));
        });
        jQuery(document).on('mouseleave', '.animate-icon-module-style2', function() {
            var $this = jQuery(this);
            $this.css('background-color', $this.attr('data-bg-color'));
            $this.find('.animate-icon-title').css('color', $this.attr('data-title-color'));
            $this.find('.animate-icon-icon').css('color', $this.attr('data-icon-color'));
        });
        jQuery(document).on('mouseenter', '.animate-icon-module-style1.be-bg-overlay', function(e) {
            var $this = jQuery(this);
            $this.find('.section-overlay').css('background-color', $this.find('.section-overlay').attr('data-hover-bg-color'));
        });
        jQuery(document).on('mouseleave', '.animate-icon-module-style1.be-bg-overlay', function(e) {
            var $this = jQuery(this);
            $this.find('.section-overlay').css('background-color', $this.find('.section-overlay').attr('data-default-bg-color'));
        });
    });
    jQuery(window).smartresize(function() {
        arrange_animate_icon();
        be_custom_scroll_animation();
        be_reset_colblock_height();
    });
    jQuery(window).on('scroll', function() {
        be_custom_scroll_animation();
    });
}(jQuery));;;
(function(jQuery) {
    var ajax_url = jQuery('#ajax_url').val();

    function portfolioModule() {
        this.portfolioContainer = null, this.closest_portfolio = null, this.isotopeAction = null, this.init = function(element, actionParam) {
            this.portfolioContainer = element.find('.portfolio-container');
            this.closest_portfolio = element;
            this.setColumnWidth();
            this.isotopeAction = actionParam;
            var self = this;
        }, this.getContainerWidth = function() {
            return this.closest_portfolio.width();
        }, this.setContainerWidth = function(roundedWidthParam) {
            this.portfolioContainer.width(roundedWidthParam);
        }, this.gutter_width = function() {
            return Number(this.closest_portfolio.attr('data-gutter-width'));
        }, this.elementNormalHeight = function() {
            return this.portfolioContainer.find('.element.no-wide-width-height:visible').find('.flip-wrap').height();
        }, this.noOfColumns = function() {
            var windowTotalWidth = jQuery(window).width() + jQuery.getScrollbarWidth();
            if (windowTotalWidth < 1280 && windowTotalWidth >= 768) {
                switch (this.closest_portfolio.attr('data-col')) {
                    case 'two':
                        return 2;
                        break;
                    default:
                        return 3;
                        break;
                }
            } else if (windowTotalWidth < 768 && windowTotalWidth > 481) {
                return 2;
            } else if (windowTotalWidth <= 481) {
                return 1;
            } else {
                switch (this.closest_portfolio.attr('data-col')) {
                    case 'five':
                        return 5;
                        break;
                    case 'four':
                        return 4;
                        break;
                    case 'three':
                        return 3;
                        break;
                    case 'two':
                        return 2;
                        break;
                    default:
                        return 3;
                        break;
                }
            }
        }, this.getRoundedWidth = function() {
            var rounded_width = this.getContainerWidth();
            while ((rounded_width % this.noOfColumns()) !== 0) {
                rounded_width = rounded_width + 1;
            }
            this.setContainerWidth(rounded_width);
            return rounded_width;
        }, this.setColumnWidth = function() {
            this.columnWidth = this.getRoundedWidth() / this.noOfColumns();
        }, this.multiGridSetup = function() {
            var self = this;
            this.portfolioContainer.imagesLoaded(function() {
                var vNormalHeight = self.elementNormalHeight(),
                    vGutterWidth = self.gutter_width();
                if (self.closest_portfolio.hasClass('full-screen-gutter') && Number(self.closest_portfolio.attr('data-masonry')) != 1) {
                    self.portfolioContainer.find('.wide-width-height, .wide-height').find('.flip-img-wrap').height((vNormalHeight * 2) + vGutterWidth);
                    self.portfolioContainer.find('.wide-width').find('.flip-img-wrap').height(vNormalHeight);
                    self.portfolioContainer.find('.element.wide-width-height, .element.wide-height, .element.wide-width').find('.element-inner .flip-wrap .flip-img-wrap img').resizeToParent();
                }
                if (self.isotopeAction == 'initial') {
                    self.applyIsotope(1);
                } else {
                    self.portfolioContainer.isotope('layout');
                }
            });
        }, this.applyIsotope = function(flag) {
            var column_width = this.columnWidth;
            this.portfolioContainer.isotope({
                itemSelector: '.element',
                masonry: {
                    columnWidth: column_width
                }
            }).isotope('on', 'layoutComplete', function(laidOutItems) {
                Waypoint.refreshAll();
            });
            if (flag == 1) {
                this.delayLoad(this.portfolioContainer);
            }
        }, this.appendIsotope = function(newItemsParam) {
            var vnewItems = newItemsParam,
                self = this;
            this.portfolioContainer.append(vnewItems).isotope('appended', vnewItems).isotope('on', 'layoutComplete', function(laidOutItems) {
                Waypoint.refreshAll();
            });
            this.delayLoad(this.portfolioContainer);
        }, this.delayLoad = function(portfolioContainerParam) {
            if (portfolioContainerParam.hasClass('portfolio-shortcode')) {
                var delay = 1;
                portfolioContainerParam.find('.element').each(function() {
                    jQuery(this).find('img').one("load", function() {
                        jQuery(this).parent().delay(delay).addClass('img-loaded', 300);
                        jQuery(this).closest('.flip-wrap').next().delay(delay).addClass('img-loaded', 300);
                        delay += 200;
                    }).each(function() {
                        if (this.complete) {
                            jQuery(this).load();
                        }
                    });
                });
            }
        }, this.applyFilters = function(filteredItemParam, myClassParam) {
            filteredItemParam.closest(".filters").find(".sort").removeClass("current_choice");
            filteredItemParam.addClass("current_choice");
            this.portfolioContainer.isotope({
                filter: '.' + myClassParam
            });
            this.applyIsotope(0);
        }, this.portfolioParallaxSetup = function() {
            if (this.portfolioContainer.hasClass('portfolio-item-parallax')) {
                this.portfolioContainer.parentsUntil('.be-section').css('overflow', 'visible');
                this.portfolioContainer.closest('.be-section').css('overflow', 'visible');
                this.portfolioContainer.css('overflow', 'visible').find('.element').css('overflow', 'visible');
            }
        }
    }

    function portfolioMainModule(portfolioContainerParam) {
        var portfolioModuleInst = [],
            i = 0;
        portfolioContainerParam.each(function() {
            portfolioModuleInst[i] = new portfolioModule();
            portfolioModuleInst[i].init(jQuery(this), 'initial');
            portfolioModuleInst[i].multiGridSetup();
            portfolioModuleInst[i].portfolioParallaxSetup();
            i++;
        });
    }

    function paginationData(triggerParam, portfolioParam, elementParam) {
        var $portfolio = portfolioParam,
            $trigger = triggerParam,
            $ajaxData = '';
        switch (elementParam) {
            case 'portfolio':
                $action = $portfolio.attr("data-action"), $col = $portfolio.attr("data-col"), $data_gutter_width = Number($portfolio.attr("data-gutter-width")), $category = $portfolio.attr("data-category"), $masonry = $portfolio.attr("data-masonry"), $showposts = $portfolio.attr("data-showposts"), $gallery = $portfolio.attr("data-gallery"), $filter = $portfolio.attr("data-filter"), $show_filters = $portfolio.attr("data-show_filters"), $data_thumbnail_bg_color = $portfolio.attr("data-thumbnail-bg-color"), $data_title_style = $portfolio.attr("data-title-style"), $data_title_color = $portfolio.attr("data-title-color"), $data_cat_color = $portfolio.attr("data-cat-color"), $title_animation_type = $portfolio.attr("data-title-animation-type"), $cat_animation_type = $portfolio.attr("data-cat-animation-type"), $img_grayscale = $portfolio.attr("data-img-grayscale"), $image_effect = $portfolio.attr("data-image-effect"), $gradient_style_color = $portfolio.attr("data-gradient-style-color"), $data_hover_style = $portfolio.attr("data-hover-style"), $dat_cat_hide = $portfolio.attr("data-cat-hide"), $data_like_indicator = $portfolio.attr("data-like-indicator"), $ajaxData = "action=" + $action + "&category=" + $category + "&masonry=" + $masonry + "&showposts=" + $showposts + "&col=" + $col + "&gallery=" + $gallery + "&filter=" + $filter + "&show_filters=" + $show_filters + "&thumb_overlay_color=" + $data_thumbnail_bg_color + "&title_style=" + $data_title_style + "&title_color=" + $data_title_color + "&cat_color=" + $data_cat_color + "&title_animation_type=" + $title_animation_type + "&cat_animation_type=" + $cat_animation_type + "&gutter_width=" + $data_gutter_width + "&hover_style=" + $data_hover_style + "&img_grayscale=" + $img_grayscale + "&image_effect=" + $image_effect + "&gradient_style_color=" + $gradient_style_color + "&cat_hide=" + $dat_cat_hide + "&like_button=" + $data_like_indicator;
                return $ajaxData;
                break;
            case 'gallery':
                $action = $portfolio.attr("data-action"), $masonry = $portfolio.attr("data-masonry"), $source = $portfolio.attr("data-source"), $gutter_width = $portfolio.attr("data-gutter-width"), $col = $portfolio.attr("data-col"), $data_gutter_width = Number($portfolio.attr("data-gutter-width")), $images_arr = $portfolio.attr("data-images-array"), $items_per_load = $portfolio.attr("data-items-per-load"), $hover_style = $portfolio.attr("data-hover-style"), $img_grayscale = $portfolio.attr("data-image-grayscale"), $lightbox_type = $portfolio.attr("data-lightbox-type"), $image_source = $portfolio.attr("data-image-source"), $image_effect = $portfolio.attr("data-image-effect"), $thumb_overlay_color = $portfolio.attr("data-thumb-overlay-color"), $gradient_style_color = $portfolio.attr("data-grad-style-color"), $like_button = $portfolio.attr("data-like-button"), $ajaxData = "action=" + $action + "&masonry=" + $masonry + "&source=" + $source + "&gutter_width=" + $gutter_width + "&col=" + $col + "&data_gutter_width=" + $data_gutter_width + "&images_arr=" + $images_arr + "&items_per_load=" + $items_per_load + "&hover_style=" + $hover_style + "&img_grayscale=" + $img_grayscale + "&lightbox_type=" + $lightbox_type + "&image_source=" + $image_source + "&image_effect=" + $image_effect + "&thumb_overlay_color=" + $thumb_overlay_color + "&gradient_style_color=" + $gradient_style_color + "&like_button=" + $like_button;
                return $ajaxData;
                break;
            case 'blog':
                $total_items = $trigger.attr('data-total-items'), $action = $portfolio.attr("data-action"), $showposts = $portfolio.attr("data-showposts"), $data_gutter_width = Number($portfolio.attr("data-gutter-width")), $ajaxData = "action=" + $action + "&showposts=" + $showposts + "&gutter_width=" + $data_gutter_width + "&total_items=" + $total_items;
                return $ajaxData;
                break;
        }
    }

    function infiniteScroll(triggerParam, portfolioParam, pagedParam, elementTypeParam) {
        var $this = triggerParam,
            $portfolio = portfolioParam,
            $paged = pagedParam;
        var be_waypoint = new Waypoint({
            element: $this,
            handler: function(direction) {
                if (direction === 'down') {
                    var $this_waypoint = this,
                        $page_loader = jQuery('.page-loader');
                    $this_waypoint.disable();
                    $page_loader.fadeIn();
                    jQuery.ajax({
                        type: "POST",
                        url: ajax_url,
                        data: paginationData($this, $portfolio, elementTypeParam) + "&paged=" + $paged
                    }).done(function(data) {
                        if (data !== 0 && data !== '0' && data) {
                            var $newItems = jQuery(data);
                            $newItems.imagesLoaded(function() {
                                portfolioModuleInst = new portfolioModule();
                                portfolioModuleInst.init($portfolio, 'append');
                                portfolioModuleInst.appendIsotope($newItems);
                                portfolioModuleInst.multiGridSetup();
                                if (elementTypeParam == 'portfolio') {
                                    be_lightbox();
                                    jQuery('.element.style3-hover .element-inner').each(function() {
                                        jQuery(this).hoverdir();
                                    });
                                    jQuery('.element.style4-hover .element-inner').each(function() {
                                        jQuery(this).hoverdir({
                                            inverse: true
                                        });
                                    });
                                }
                                if (elementTypeParam == 'gallery') {
                                    be_lightbox();
                                }
                                if (elementTypeParam == 'blog') {
                                    be_lightbox();
                                    $newItems.find('.be_image_slider').each(function() {
                                        var $this = jQuery(this).find('.image_slider_module');
                                        be_blog_gallery($this);
                                    });
                                    $newItems.fitVids();
                                }
                                $this_waypoint.enable();
                                $paged = Number($paged) + 1;
                                $page_loader.fadeOut();
                            });
                        } else {
                            $this_waypoint.destroy();
                            $page_loader.fadeOut();
                        }
                    });
                }
            },
            offset: 'bottom-in-view'
        })
    }

    function loadmore(triggerParam, portfolioParam, pagedParam, elementTypeParam) {
        var $this = triggerParam,
            $portfolio = portfolioParam,
            $paged = pagedParam,
            $page_loader = jQuery('.page-loader');
        $page_loader.fadeIn();
        $this.addClass('disabled');
        jQuery.ajax({
            type: "POST",
            url: ajax_url,
            data: paginationData($this, $portfolio, elementTypeParam) + "&paged=" + $paged,
            success: function(data) {
                if (data !== 0 && data !== '0' && data) {
                    var $newItems = jQuery(data);
                    $newItems.imagesLoaded(function() {
                        portfolioModuleInst = new portfolioModule();
                        portfolioModuleInst.init($portfolio, 'append');
                        portfolioModuleInst.multiGridSetup();
                        portfolioModuleInst.appendIsotope($newItems);
                        if (elementTypeParam == 'portfolio') {
                            be_lightbox();
                            jQuery('.element.style3-hover .element-inner').each(function() {
                                jQuery(this).hoverdir();
                            });
                            jQuery('.element.style4-hover .element-inner').each(function() {
                                jQuery(this).hoverdir({
                                    inverse: true
                                });
                            });
                        }
                        if (elementTypeParam == 'gallery') {
                            be_lightbox();
                        }
                        if (elementTypeParam == 'blog') {
                            be_lightbox();
                            $newItems.find('.be_image_slider').each(function() {
                                var $this = jQuery(this).find('.image_slider_module');
                                be_blog_gallery($this);
                            });
                            $newItems.fitVids();
                        }
                        $portfolio.attr("data-paged", Number($paged) + 1);
                        $this.attr("data-total-items", function() {
                            return (Number(jQuery(this).attr('data-total-items')) - $newItems.find('.element-inner').length);
                        });
                        if ($this.attr("data-total-items") <= 0) {
                            $this.fadeOut(500, function() {
                                $this.remove();
                            });
                        }
                        $this.removeClass('disabled');
                        $page_loader.fadeOut();
                    });
                } else {
                    $this.addClass('disabled');
                    $page_loader.fadeOut();
                }
            }
        });
    }

    function be_blog_gallery(blog_gallery_post) {
        var $this = blog_gallery_post,
            $slideshow = $this.attr('data-auto-slide'),
            $slideshowspeed = 1000;
        if ('no' == $slideshow) {
            $slideshow = false;
        } else {
            $slideshow = true;
            $slideshowspeed = $this.attr('data-slide-interval');
        }
        $this.owlCarousel({
            items: 1,
            autoHeight: true,
            autoplay: $slideshow,
            autoplayTimeout: $slideshowspeed,
            autoplaySpeed: 1000,
            autoplayHoverPause: true,
            navRewind: false,
            nav: true,
            loop: true,
            navText: ['<i class="font-icon icon-arrow_carrot-left"></i>', '<i class="font-icon icon-arrow_carrot-right"></i>'],
            dots: false,
            onInitialize: function() {
                $this.fadeIn(500);
                $this.trigger('refresh.owl.carousel');
            }
        });
    }

    function be_lightbox() {
        if (jQuery('.image-popup-vertical-fit').length > 0) {
            jQuery('.image-popup-vertical-fit').magnificPopup({
                mainClass: 'mfp-img-mobile my-mfp-zoom-in',
                closeOnContentClick: true,
                gallery: {
                    enabled: true
                },
                image: {
                    verticalFit: true,
                    titleSrc: 'title'
                },
                zoom: {
                    enabled: true,
                    duration: 300
                },
                preloader: true,
                type: 'inline',
                overflowY: 'auto',
                removalDelay: 300,
                callbacks: {
                    afterClose: function() {
                        if (jQuery('body').hasClass('smooth-scroll')) {
                            jQuery('html').css('overflow-y', 'scroll');
                        }
                    },
                    open: function() {
                        jQuery('body').addClass('mfp-active-state');
                        if (jQuery('#main').hasClass('layout-border')) {
                            jQuery('.mfp-content').addClass('layout-border');
                        }
                    },
                    close: function() {
                        jQuery('body').removeClass('mfp-active-state');
                    }
                }
            });
        }
        if (jQuery('.mfp-iframe').length > 0) {
            jQuery('.mfp-iframe').magnificPopup({
                iframe: {
                    patterns: {
                        youtube: {
                            index: 'youtube.com/',
                            id: 'v=',
                            src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0&showinfo=0'
                        }
                    }
                }
            });
        }
        if (jQuery('.popup-gallery').length > 0) {
            jQuery('.popup-gallery').magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1]
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                },
                preloader: true,
                callbacks: {
                    afterClose: function() {
                        if (jQuery('body').hasClass('smooth-scroll')) {
                            jQuery('html').css('overflow-y', 'scroll');
                        }
                    },
                    open: function() {
                        jQuery('body').addClass('mfp-active-state');
                        if (jQuery('#main').hasClass('layout-border')) {
                            jQuery('.mfp-content').addClass('layout-border');
                        }
                    },
                    close: function() {
                        jQuery('body').removeClass('mfp-active-state');
                    }
                }
            });
        }
        if (jQuery('.popup-with-content').length > 0) {
            jQuery('.popup-with-content').magnificPopup({
                type: 'inline',
                preloader: false
            });
        }
    }

    function portfolioInfiniteScroll() {
        if (jQuery(".trigger_infinite_scroll.portfolio_infinite_scroll").length > 0) {
            jQuery(".trigger_infinite_scroll.portfolio_infinite_scroll").each(function() {
                var $this = jQuery(this),
                    $portfolio = $this.closest('.portfolio'),
                    $paged = Number($portfolio.attr("data-paged"));
                infiniteScroll($this, $portfolio, $paged, 'portfolio');
            });
        }
    }

    function galleryInfiniteScroll() {
        if (jQuery(".trigger_infinite_scroll.gallery_infinite_scroll").length > 0) {
            jQuery(".trigger_infinite_scroll.gallery_infinite_scroll").each(function() {
                var $this = jQuery(this),
                    $portfolio = $this.closest('.portfolio'),
                    $paged = Number($portfolio.attr("data-paged"));
                infiniteScroll($this, $portfolio, $paged, 'gallery');
            });
        }
    }

    function blogInfiniteScroll() {
        if (jQuery(".trigger_infinite_scroll.blog_infinite_scroll").length > 0) {
            jQuery(".trigger_infinite_scroll.blog_infinite_scroll").each(function() {
                var $this = jQuery(this),
                    $portfolio = $this.closest('.portfolio'),
                    $paged = Number($portfolio.attr("data-paged"));
                infiniteScroll($this, $portfolio, $paged, 'blog');
            });
        }
    }
    jQuery(document).ready(function() {
        if (jQuery('.portfolio').length > 0) {
            jQuery('html').addClass('show-overflow');
            var $portfolio_container = jQuery('.portfolio');
            portfolioMainModule($portfolio_container);
            portfolioInfiniteScroll();
            galleryInfiniteScroll();
            blogInfiniteScroll();
        }
        jQuery(document).on('click', '.sort', function() {
            portfolioModuleFilter = new portfolioModule();
            var filteredItem = jQuery(this),
                myClass = filteredItem.attr("data-id");
            portfolioModuleFilter.init(filteredItem.closest('.portfolio'));
            portfolioModuleFilter.applyFilters(filteredItem, myClass);
        });
        jQuery(document).on('click', '.trigger_load_more.portfolio_load_more:not(.disabled)', function() {
            var $this = jQuery(this),
                $portfolio = $this.closest('.portfolio'),
                $paged = Number($portfolio.attr("data-paged"));
            loadmore($this, $portfolio, $paged, 'portfolio');
        });
        jQuery(document).on('click', '.trigger_load_more.gallery_load_more:not(.disabled)', function() {
            var $this = jQuery(this),
                $portfolio = $this.closest('.portfolio'),
                $paged = Number($portfolio.attr("data-paged"));
            loadmore($this, $portfolio, $paged, 'gallery');
        });
        jQuery(document).on('click', '.trigger_load_more.blog_load_more:not(.disabled)', function() {
            var $this = jQuery(this),
                $portfolio = $this.closest('.portfolio'),
                $paged = Number($portfolio.attr("data-paged"));
            loadmore($this, $portfolio, $paged, 'blog');;
        });
    });
    jQuery(window).smartresize(function() {
        if (jQuery('.portfolio').length > 0) {
            var $portfolio_container = jQuery('.portfolio');
            portfolioMainModule($portfolio_container);
        }
    });
    jQuery(document).on('update_content', function() {
        if (jQuery('.portfolio').length > 0) {
            var $portfolio_container = jQuery('.portfolio');
            portfolioMainModule($portfolio_container);
            Waypoint.destroyAll();
            portfolioInfiniteScroll();
            galleryInfiniteScroll();
            blogInfiniteScroll();
        }
    });
}(jQuery));