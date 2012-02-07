/*1327995863,176820666*/

if (window.CavalryLogger) {
    CavalryLogger.start_js(["udSUJ"]);
}

function scribe_log(a, b) {
    new AsyncSignal('/ajax/scribe_log.php', {
        category: a,
        message: b
    }).send();
}
function textLimit(b, a) {
    var c = ge(b);
    if (c.value.length > a) {
        c.value = c.value.substring(0, a);
        if (arguments.length > 2) $(arguments[2]).style.display = 'block';
    }
}
function textLimitStrict(h, d, e, a, f) {
    var g = ge(h);
    if (g) {
        var c = g.value.length;
        var b = c - d;
        if (b > 0) {
            if (b > 25000) {
                g.value = g.value.substring(0, d + 25000);
                b = 25000;
            }
            $(e).style.display = 'block';
            $(a).innerHTML = b;
            $(f).disabled = true;
        } else if (c == 0) {
            $(e).style.display = 'none';
            $(f).disabled = true;
            $(a).innerHTML = 1;
        } else if ($(a).innerHTML != 0) {
            $(a).innerHTML = 0;
            $(e).style.display = 'none';
            $(f).disabled = false;
        }
    }
}

function typeahead_source() {}
typeahead_source.prototype.cache_results = false;
typeahead_source.prototype.enumerable = false;
typeahead_source.prototype.allow_fake_results = false;
typeahead_source.prototype.escape_results = false;
typeahead_source.prototype.search_limit = 10;
typeahead_source.prototype.check_limit = 10;
typeahead_source.prototype.bootstrap = bagofholding;
typeahead_source.check_match = function(f, g) {
    g = typeahead_source.tokenize(g);
    for (var b = 0, c = f.length; b < c; b++) if (f[b].length) {
        var a = false;
        for (var d = 0, e = g.length; d < e; d++) if (g[d].length >= f[b].length && g[d].substring(0, f[b].length) == f[b]) {
            a = true;
            g[d] = '';
            break;
        }
        if (!a) return false;
    }
    return true;
};
typeahead_source.tokenize = function(c, a, b) {
    return (b ? c : typeahead_source.flatten_string(c)).split(a ? typeahead_source.normalizer_regex_capture : typeahead_source.normalizer_regex);
};
typeahead_source.normalizer_regex_str = '(?:(?:^| +)["\'.\\-]+ *)|(?: *[\'".\\-]+(?: +|$)|[@_]| +)';
typeahead_source.normalizer_regex = new RegExp(typeahead_source.normalizer_regex_str, 'g');
typeahead_source.normalizer_regex_capture = new RegExp('(' + typeahead_source.normalizer_regex_str + ')', 'g');
typeahead_source.flatten_string = function(b) {
    if (!typeahead_source.accents) typeahead_source.accents = {
        a: /\u0430|\u00e0|\u00e1|\u00e2|\u00e3|\u00e4|\u00e5/g,
        b: /\u0431/g,
        c: /\u0446|\u00e7/g,
        d: /\u0434|\u00f0/g,
        e: /\u044d|\u0435|\u00e8|\u00e9|\u00ea|\u00eb/g,
        f: /\u0444/g,
        g: /\u0433/g,
        h: /\u0445/g,
        i: /\u0438|\u00ec|\u00ed|\u00ee|\u00ef/g,
        j: /\u0439/g,
        k: /\u043a/g,
        l: /\u043b/g,
        m: /\u043c/g,
        n: /\u043d|\u00f1/g,
        o: /\u043e|\u00f8|\u00f6|\u00f5|\u00f4|\u00f3|\u00f2/g,
        p: /\u043f/g,
        r: /\u0440/g,
        s: /\u0441/g,
        t: /\u0442/g,
        u: /\u0443|\u044e|\u00fc|\u00fb|\u00fa|\u00f9/g,
        v: /\u0432/g,
        y: /\u044b|\u00ff|\u00fd/g,
        z: /\u0437/g,
        ae: /\u00e6/g,
        oe: /\u0153/g,
        ts: /\u0446/g,
        ch: /\u0447/g,
        sh: /\u0448/g,
        ya: /\u044f/g
    };
    b = b.toLowerCase();
    for (var a in typeahead_source.accents) b = b.replace(typeahead_source.accents[a], a);
    return b;
};
typeahead_source.prototype.set_owner = function(a) {
    this.owner = a;
    if (this.is_ready) this.owner.update_status(0);
};
typeahead_source.prototype.ready = function() {
    if (this.owner && !this.is_ready) {
        this.is_ready = true;
        this.owner.update_status(0);
    } else this.is_ready = true;
};
typeahead_source.highlight_found = function(g, h) {
    var b = [];
    resultv = typeahead_source.tokenize(g, true, true);
    g = typeahead_source.tokenize(g, true);
    h = typeahead_source.tokenize(h);
    h.sort(typeahead_source._sort);
    for (var c = 0, d = resultv.length; c < d; c++) {
        var a = false;
        for (var e = 0, f = h.length; e < f; e++) if (h[e] && g[c].lastIndexOf(h[e], 0) != -1) {
            b.push('<em>', htmlspecialchars(resultv[c].substring(0, h[e].length)), '</em>', htmlspecialchars(resultv[c].substring(h[e].length, resultv[c].length)));
            a = true;
            break;
        }
        if (!a) b.push(htmlspecialchars(resultv[c]));
    }
    return b.join('');
};
typeahead_source._sort = function(a, b) {
    return b.length - a.length;
};
typeahead_source.prototype.gen_nomatch = function() {
    return this.text_nomatch != null ? this.text_nomatch : "No matches found";
};
typeahead_source.prototype.gen_loading = function() {
    return this.text_loading != null ? this.text_loading : "Loading...";
};
typeahead_source.prototype.gen_placeholder = function() {
    return this.text_placeholder != null ? this.text_placeholder : "Start typing...";
};
typeahead_source.prototype.gen_noinput = function() {
    return this.text_noinput != null ? this.text_noinput : "Start typing...";
};
typeahead_source.prototype.onselect_not_found = function() {
    if (typeof this.tokenizer._ontokennotfound != 'undefined') this.tokenizer._ontokennotfound(this.obj.value);
    if (typeof this.tokenizer.onselect != 'undefined') return this.tokenizer.onselect();
};
typeahead_source.prototype.gen_html = function(d, a) {
    var e = d.t || d;
    var b = ['<div>', typeahead_source.highlight_found(e, a), '</div>'];
    if (d.s) {
        var c = (this.escape_results ? htmlspecialchars(d.s) : d.s);
        b.push('<div class="sub_result"><small>', c, '</small></div>');
    }
    return b.join('');
};
__e("IntlDateFormats", [], function(d, f, g, h, e, c) {
    var b = {};
    var a = {
        setFormats: function(j, i) {
            b = i;
        },
        getFormat: function(i) {
            if (!(i in b)) return i;
            return b[i];
        }
    };
    e.exports = a;
});
// This is an automatically generated invocation.
require('IntlDateFormats').setFormats("ca_ES", {
    "l, F j, Y": "l j F Y",
    "D M d, Y": "l j F Y",
    "l, F d, Y": "l j F Y",
    "l, M j, Y": "l j F Y",
    "D M j, y": "l j F Y",
    "F j, Y": "j F Y",
    "F jS, Y": "j F Y",
    "M j, Y": "j F Y",
    "M. d, Y": "j F Y",
    "F d, Y": "j F Y",
    "M d, Y": "j F Y",
    "D M d": "l j F",
    "l, F jS": "l j F",
    "l, M j": "l j F",
    "D M j": "l j F",
    "l, F j": "l j F",
    "l, F jS, g:ia": "l j F Y H:i",
    "g:iA, l M jS": "l j F Y H:i",
    "g:iA l, F jS": "l j F Y H:i",
    "l, M j, Y g:ia": "l j F Y H:i",
    "F j, Y \u0040 g:i A": "j F Y H:i",
    "M j, Y g:i A": "j F Y H:i",
    "F j, Y g:i a": "j F Y H:i",
    "M d, Y g:ia": "j F Y H:i",
    "g:ia F jS, Y": "j F Y H:i",
    "H:I - M d, Y": "j F Y H:i",
    "M j, Y g:ia": "j F Y H:i",
    "M d, Y ga": "j F Y H",
    "g:ia, F jS": "j F H:i",
    "g:ia M jS": "j F H:i",
    "g:ia M j": "j F H:i",
    "F jS, g:ia": "j F H:i",
    "M jS, g:ia": "j F H:i",
    "F j": "j F",
    "F jS": "j F",
    "F g": "j F",
    "M j": "j F",
    "M d": "j F",
    "M. d": "j F",
    "M y": "j F",
    "F d": "j F",
    "F Y": "F Y",
    "M Y": "F Y",
    "D g:ia": "D H:i",
    "l g:ia": "l H:i",
    "Y-m-d": "d\/m\/Y",
    "y\/m\/d": "d\/m\/Y",
    "m\/d\/y": "d\/m\/Y",
    "m-d-y": "d\/m\/Y",
    "m\/d\/Y": "d\/m\/Y",
    "Y\/m\/d": "d\/m\/Y",
    "n\/j\/y": "d\/m\/Y",
    "m.d.y": "d\/m\/Y",
    "n\/j": "d\/m",
    "n": "d\/m",
    "m\/d": "d\/m",
    "n\/j, g:ia": "d\/m\/Y H:i",
    "m\/d\/Y g:ia": "d\/m\/Y H:i",
    "m\/d\/y H:i:s": "d\/m\/Y H:i:s",
    "h:m:s m\/d\/Y": "d\/m\/Y H:i:s",
    "m\/d\/Y h:m": "d\/m\/Y H:i:s",
    "g:ia": "H:i",
    "g:i a": "H:i",
    "g A": "H:i",
    "h:i a": "H:i",
    "g:i A": "H:i",
    "g:sa": "H:i",
    "g:iA": "H:i",
    "g:i": "H:i",
    "Y": "Y",
    "j": "j",
    "D": "D"
});
__e("date-extensions", ["IntlDateFormats", "copyProperties", "tx"], function(i, k, l, m, j, h) {
    var a = k('IntlDateFormats');
    var g = k('copyProperties');
    i.tx = k('tx');
    var f = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var e = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var c = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function b(o, n) {
        n = n || 2;
        o = '' + o;
        while (o.length < n) o = '0' + o;
        return o;
    }
    Date.format = function(o, p, q) {
        var n = p ? new Date(p * 1000) : new Date();
        return n.format(o, q);
    };
    g(Date.prototype, {
        format: function(x, z) {
            if (!x) return '';
            var w = [],
                za = null,
                n = null;
            var q = (z ? 'getUTC' : 'get'),
                o = this[q + 'Date'](),
                p = this[q + 'Day'](),
                u = this[q + 'Month'](),
                zb = this[q + 'FullYear'](),
                r = this[q + 'Hours'](),
                t = this[q + 'Minutes'](),
                y = this[q + 'Seconds'](),
                v = this[q + 'Milliseconds']();
            for (var s = 0; s < x.length; s++) {
                n = x.charAt(s);
                if (n == '\\') {
                    s++;
                    w.push(x.charAt(s));
                    continue;
                }
                switch (n) {
                case 'd':
                    za = b(o);
                    break;
                case 'D':
                    za = f[p];
                    break;
                case 'j':
                    za = o;
                    break;
                case 'l':
                    za = d[p];
                    break;
                case 'F':
                    za = c[u];
                    break;
                case 'm':
                    za = b(u + 1);
                    break;
                case 'M':
                    za = e[u];
                    break;
                case 'n':
                    za = u + 1;
                    break;
                case 'Y':
                    za = zb;
                    break;
                case 'y':
                    za = ('' + zb).slice(2);
                    break;
                case 'a':
                    za = r < 12 ? 'am' : 'pm';
                    break;
                case 'A':
                    za = r < 12 ? 'AM' : 'PM';
                    break;
                case 'g':
                    za = (r == 0 || r == 12) ? 12 : r % 12;
                    break;
                case 'G':
                    za = r;
                    break;
                case 'h':
                    za = (r == 0 || r == 12) ? 12 : b(r % 12);
                    break;
                case 'H':
                    za = b(r);
                    break;
                case 'i':
                    za = b(t);
                    break;
                case 's':
                    za = b(y);
                    break;
                case 'S':
                    za = b(v, 3);
                    break;
                default:
                    za = n;
                }
                w.push(za);
            }
            return w.join('');
        }
    });
    i.IntlDateFormats = a;
}, 3);
__e("legacy:fbjs-prototypes", ["array-extensions", "date-extensions", "string-extensions", "Arbiter"], function(b, c, d, e) {
    c('array-extensions');
    c('date-extensions');
    c('string-extensions');
    var a = c('Arbiter');
    a.inform('fbjs/prototypes');
}, 3);
!
function() {
    if (Object.prototype.eval) {
        window.eval = Object.prototype.eval;
        delete Object.prototype.eval;
    }
    delete Object.prototype.valueOf;
    var dgSandbox = window.__defineGetter__ ? 1 : 0;
    var nativeApply = Function.prototype.apply;
    nativeApply.nativeCall = Function.prototype.call;

    function fbjs_add_wrappers() {
        var allowWrite = {
            'toString': 1,
            'extend': 1,
            'constructor': 1
        };
        var allNames = ['__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'abs', 'acos', 'anchor', 'apply', 'arguments', 'asin', 'atan', 'atan2', 'big', 'bind', 'blink', 'bold', 'call', 'caller', 'ceil', 'charAt', 'charCodeAt', 'clone', 'compile', 'concat', 'constructor', 'contains', 'cos', 'curry', 'defer', 'deferUntil', 'each', 'endsWith', 'every', 'exec', 'exp', 'extend', 'filter', 'fixed', 'floor', 'fontcolor', 'fontsize', 'forEach', 'getDate', 'getDay', 'getFullYear', 'getHours', 'getMilliseconds', 'getMinutes', 'getMonth', 'getSeconds', 'getTime', 'getTimezoneOffset', 'getUTCDate', 'getUTCDay', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'getYear', 'global', 'hasOwnProperty', 'hash32', 'ignoreCase', 'indexOf', 'isPrototypeOf', 'italics', 'join', 'lastIndex', 'lastIndexOf', 'length', 'link', 'localeCompare', 'log', 'map', 'match', 'max', 'min', 'mixin', 'multiline', 'name', 'pop', 'postpone', 'pow', 'propertyIsEnumerable', 'pull', 'push', 'random', 'recur', 'reduce', 'reduceRight', 'remove', 'replace', 'reverse', 'round', 'search', 'setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds', 'setYear', 'shield', 'shift', 'sin', 'slice', 'small', 'some', 'sort', 'source', 'splice', 'split', 'sqrt', 'startsWith', 'strike', 'sub', 'substr', 'substring', 'sup', 'tan', 'test', 'toDateString', 'toExponential', 'toFixed', 'toGMTString', 'toISOString', 'toJSON', 'toLocaleDateString', 'toLocaleLowerCase', 'toLocaleString', 'toLocaleTimeString', 'toLocaleUpperCase', 'toLowerCase', 'toPrecision', 'toString', 'toTimeString', 'toUTCString', 'toUpperCase', 'trim', 'trimLeft', 'trimRight', 'unshift', 'valueOf'];

        function wrap(proto, Kind, hard) {
            var name = Object.prototype.toString.call(proto);

            function fix(k) {
                var old = proto[k];
                if (typeof old === 'function') {
                    if (old.$immutable) return;
                    var val = proto[k] = function() {
                            if (this !== window && (this instanceof Kind || this === proto || Kind === Object)) {
                                return nativeApply.nativeCall(old, this, arguments);
                            } else {
                                if (k != '__lookupGetter__') fbjs_console.error('Function ' + k + ' originally defined on ' + name + ' applied to wrong type');
                                return nativeApply.nativeCall(old, new Kind(), arguments);
                            }
                        };
                    proto[k].$immutable = 1;
                    if (hard && dgSandbox && allowWrite[k] !== 1) {
                        proto.__defineGetter__(k, function() {
                            return val;
                        });
                        proto.__defineSetter__(k, function() {
                            var m = 'Overriding ' + k + ' not supported for ' + name;
                            fbjs_console.error(m);
                        });
                    }
                }
            }
            var names = Object.getOwnPropertyNames ? Object.getOwnPropertyNames(proto) : allNames;
            for (var i = 0; i < names.length; i++) if (proto.hasOwnProperty(names[i])) fix(names[i]);
            for (var k in proto) fix(k);
        }
        var rex = /./;
        rex.exec('x');
        try {
            if (rex.exec() == 'x')[[String.prototype, 'match'], [RegExp.prototype, 'exec'], [RegExp.prototype, 'test']].map(function(v) {
                var proto = v[0],
                    k = v[1];
                var old = proto[k];
                if (old) proto[k] = function() {
                    RegExp.$_ = 'undefined';
                    return old.apply(this, arguments);
                };
            });
        } catch (_) {}
        if (Env.fbjsNameHook) eval(Env.fbjsNameHook);
        try {
            wrap(Function.prototype, Function, 1);
            wrap(RegExp.prototype, RegExp, 1);
            wrap(Date.prototype, Date, 1);
            wrap(Array.prototype, Object, 0);
            wrap(Object.prototype, Object, 0);
            wrap(Number.prototype, Object, 1);
            wrap(Boolean.prototype, Object, 1);
            wrap(String.prototype, Object, 1);
        } catch (e) {
            fbjs_sandbox = 0;
            fbjs_console.error("FBJS failed to initialize; shutting down");
            throw e;
        }
    }
    function fbjs_sandbox(appid, strict, trace) {
        if (Env.fbjsHook) eval(Env.fbjsHook);
        if (strict) {
            fbjs_add_wrappers();
            Arbiter.subscribe('fbjs/prototypes', fbjs_add_wrappers, Arbiter.SUBSCRIBE_NEW);
        }
        if (fbjs_sandbox.instances['a' + appid]) return fbjs_sandbox.instances['a' + appid];
        this.appid = appid;
        this.pending_bootstraps = [];
        this.bootstrapped = false;
        fbjs_sandbox.instances['a' + appid] = this;
        if (Env.afterFbjsHook) eval(Env.afterFbjsHook);
    }
    fbjs_sandbox.instances = {};
    fbjs_sandbox.prototype.bootstrap = function() {
        if (!this.bootstrapped) {
            var builtins = {
                'Math': new fbjs_math(),
                'Date': fbjs_date(),
                'String': new fbjs_string(),
                'RegExp': new fbjs_regexp(),
                'Ajax': fbjs_ajax(this.appid),
                'Dialog': fbjs_dialog(this.appid),
                'Facebook': new fbjs_facebook(this.appid),
                'Animation': new fbjs_animation(),
                'LiveMessage': new fbjs_livemessage(this.appid),
                'document': new fbjs_main(this.appid),
                'undefined': undefined,
                'console': new fbjs_console(),
                'setTimeout': fbjs_sandbox.set_timeout,
                'setInterval': fbjs_sandbox.set_interval
            };
            var funcs = {
                'escape': encodeURIComponent,
                'unescape': decodeURIComponent,
                'clearTimeout': clearTimeout,
                'clearInterval': clearInterval,
                'parseFloat': parseFloat,
                'parseInt': parseInt,
                'isNaN': isNaN,
                'isFinite': isFinite
            };
            for (var k in funcs) builtins[k] = function(f) {
                return function() {
                    return f.apply(this, arguments);
                };
            }(funcs[k]);
            for (var k in builtins) window['a' + this.appid + '_' + k] = builtins[k];
            Env.rawnames || Event.listen(document.body, 'submit', function(e) {
                e = $E(e);
                if (e._prevented) return false;
                e._prevented = true;
                var targ = e.getTarget();
                if (targ && (targ.fbjsDynamic || targ.getAttribute('nsform'))) {
                    e.prevent();
                    fbjs_dom.submitNamespacedForm(targ, window.fbjsLast);
                    return false;
                }
            });
            Env.rawnames || Event.listen(document.body, 'click', function(e) {
                e = $E(e);
                window.fbjsLast = {
                    target: e.getTarget(),
                    x: e.offsetX,
                    y: e.offsetY
                };
            });
        }
        try {
            for (var i = 0, il = this.pending_bootstraps.length; i < il; i++) eval_global(this.pending_bootstraps[i]);
        } finally {
            fbjs_sandbox.clean_mess();
        }
        if (!this.bootstrapped) {
            this.bootstrapped = true;
            window['fbox' + this.appid] = 1;
            Arbiter.registerCallback(bind(this, function() {
                Arbiter.subscribe('fbjs/delayedsubmit/' + this.appid, function(_, msg) {
                    var element = msg[0],
                        eventO = msg[1],
                        onsubmit = msg[2],
                        eventS = msg[3];
                    bagofholding('Submitting the delayed form now.');
                    if (onsubmit) {
                        var f = new Function('event', onsubmit);
                        var res;
                        window.fbjsOnsubmit = function() {
                            res = f.call(element, eventO);
                        };
                        eval_global('fbjsOnsubmit()');
                        if (res === false) return false;
                    }
                    fbjs_dom.submitNamespacedForm(element, eventS);
                });
            }), [OnloadEvent.ONLOAD]);
        }
        this.pending_bootstraps = [];
    };
    fbjs_sandbox.prototype.setBridgeHash = function(bridgeHash) {
        this.bridgeHash = bridgeHash;
        return this;
    };
    fbjs_sandbox.getSandbox = function(app_id) {
        return fbjs_sandbox.instances['a' + app_id];
    };

    function loadExternalJavascript(urls, callback, body) {
        if (urls instanceof Array) {
            var url = urls.shift(0);
            if (url) {
                loadExternalJavascript(url, function() {
                    if (urls.length) {
                        loadExternalJavascript(urls, callback, body);
                    } else callback && callback();
                }, body);
            } else if (callback) callback();
        } else {
            var node = body ? document.body : document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = urls;
            if (callback) {
                script.onerror = script.onload = callback;
                script.onreadystatechange = function() {
                    if (this.readyState == "complete" || this.readyState == "loaded") callback();
                };
            }
            node.appendChild(script);
            return script;
        }
    }
    fbjs_sandbox.loadScripts = function(sanitized_scripts) {
        script = sanitized_scripts.shift(0);
        if (!script) return false;
        if (script['inline']) {
            eval_global(script['inline']);
            fbjs_sandbox.loadScripts(sanitized_scripts);
        } else loadExternalJavascript(script['src'], fbjs_sandbox.loadScripts.bind(null, sanitized_scripts));
    };
    window.$FBJS = (function() {
        function ref(that) {
            if (that == window) {
                return null;
            } else if (that.ownerDocument === document) {
                fbjs_console.error('ref called with a DOM object!');
                return fbjs_dom.get_instance(that);
            } else {
                if (ua.safari() < 528.16 && (typeof that == 'object') && !(that instanceof Object)) return null;
                return that;
            }
        }
        function idx(b) {
            return (b instanceof Object || blacklist_props[b]) ? '__unknown__' : b;
        }
        var blacklist_props = {
            'caller': true,
            '__html': true,
            '$FBJS': true,
            '$immutable': true,
            'toString': false,
            'valueOf': false,
            'hasOwnProperty': false
        };
        var ieHackMarker = {};
        var oldIPO = Object.prototype.isPrototypeOf;
        if (dgSandbox) {
            Object.prototype.isPrototypeOf = function(token, key) {
                if (token !== ieHackMarker) return oldIPO.apply(this, arguments);
                key = idx(key);
                $FBJS._ = key;
                return this;
            };
        } else {
            var traceQ = [];
            Object.prototype.isPrototypeOf = function(token, key) {
                if (token !== ieHackMarker) return oldIPO.apply(this, arguments);
                key = idx(key);
                $FBJS._ = key;
                var val = this[key];
                if (this.$immutable || (val && val.$immutable)) {
                    var obj = this;
                    var ret = {};
                    ret[key] = val;
                    if (typeof val === 'function') {
                        ret[key] = function() {
                            return val.apply(this === ret ? obj : this, arguments);
                        };
                        ret[key].toString = function() {
                            return 'copy of ' + val.toString();
                        };
                    }
                    if (0) {
                        if (!traceQ.length) setTimeout(function() {
                            var q = traceQ;
                            traceQ = [];
                            for (var i = 0; i < q.length; i++) {
                                var el = q[i];
                                if (el[0][el[1]] !== el[2]) bagofholding("Blocked write to '" + key + "' property");
                            }
                        }, 10);
                        traceQ.push([ret, key, ret[key]]);
                    }
                    return ret;
                } else return this;
            };
        }
        function arg(args) {
            var new_args = [];
            for (var i = 0; i < args.length; i++) new_args.push(args[i]);
            return new_args;
        }
        return ({
            arg: arg,
            idx: idx,
            ref: ref,
            tok: ieHackMarker,
            id: function(x) {
                return x;
            }
        });
    })();
    fbjs_sandbox.safe_string = function(str) {
        return '' + str;
    };
    fbjs_sandbox.clean_mess = function() {
        delete Function.prototype.bind.call;
        delete Function.prototype.bind.apply;
    };
    fbjs_sandbox.set_timeout = function(js, timeout) {
        if (typeof js != 'function') {
            fbjs_console.error('setTimeout may not be used with a string. Please enclose your event in an anonymous function.');
        } else return setTimeout(function() {
            try {
                js();
            } finally {
                fbjs_sandbox.clean_mess();
            }
        }, timeout);
    };
    fbjs_sandbox.set_interval = function(js, interval) {
        if (typeof js != 'function') {
            fbjs_console.error('setInterval may not be used with a string. Please enclose your event in an anonymous function.');
        } else return setInterval(function() {
            try {
                js();
            } finally {
                fbjs_sandbox.clean_mess();
            }
        }, interval);
    };

    function fbjs_main(appid) {
        fbjs_private.get(this).appid = appid;
    }
    fbjs_main.allowed_elements = {
        a: true,
        abbr: true,
        acronym: true,
        address: true,
        b: true,
        br: true,
        bdo: true,
        big: true,
        blockquote: true,
        caption: true,
        center: true,
        cite: true,
        code: true,
        del: true,
        dfn: true,
        div: true,
        dl: true,
        dd: true,
        dt: true,
        em: true,
        fieldset: true,
        font: true,
        form: true,
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        h6: true,
        hr: true,
        i: true,
        img: true,
        input: true,
        ins: true,
        iframe: true,
        kbd: true,
        label: true,
        legend: true,
        li: true,
        ol: true,
        option: true,
        optgroup: true,
        p: true,
        pre: true,
        q: true,
        s: true,
        samp: true,
        select: true,
        small: true,
        span: true,
        strike: true,
        strong: true,
        sub: true,
        sup: true,
        table: true,
        textarea: true,
        tbody: true,
        td: true,
        tfoot: true,
        th: true,
        thead: true,
        tr: true,
        tt: true,
        u: true,
        ul: true,
        'fb:swf': true
    };
    fbjs_main.allowed_editable = {
        embed: true,
        object: true
    };
    fbjs_main.allowed_events = {
        focus: true,
        click: true,
        mousedown: true,
        mouseup: true,
        dblclick: true,
        change: true,
        reset: true,
        select: true,
        submit: true,
        keydown: true,
        keypress: true,
        keyup: true,
        blur: true,
        load: true,
        mouseover: true,
        mouseout: true,
        mousemove: true,
        selectstart: true
    };
    fbjs_main.prototype.getElementById = function(id) {
        var appid = fbjs_private.get(this).appid;
        return fbjs_dom.get_instance(document.getElementById('app' + appid + '_' + id), appid);
    };
    fbjs_main.prototype.getRootElement = function() {
        var appid = fbjs_private.get(this).appid;
        var nodes = document.getElementById('app_content_' + appid).childNodes;
        for (var i in nodes) {
            var node = nodes[i];
            if (node.nodeType == 1) return fbjs_dom.get_instance(node, appid);
        }
    };
    fbjs_main.prototype.createElement = function(element) {
        var mix = fbjs_sandbox.safe_string(element.toLowerCase());
        if (!fbjs_main.allowed_elements[mix]) {
            fbjs_console.error(mix + ' is not an allowed DOM element');
            return;
        }
        if (mix == 'fb:swf') return new fbjs_fbml_dom('fb:swf', fbjs_private.get(this).appid);
        var el = document.createElement(mix);
        if (mix == 'form' && !Env.rawnames) {
            el.fbjsDynamic = 1;
            el.onsubmit = function(event) {
                return Event.__inlineSubmit(this, event);
            };
        }
        return fbjs_dom.get_instance(el, fbjs_private.get(this).appid);
    };
    fbjs_main.prototype.setLocation = function(url) {
        if (FBML.isServerFBML && FBML.serverFBMLParams.disable_fbjs_setlocation) {
            fbjs_console.error('setLocation not allowed in serverfbml');
            return;
        }
        url = fbjs_sandbox.safe_string(url);
        if (fbjs_dom.href_regex.test(url)) {
            document.location.href = url;
            return this === window ? null : this;
        } else fbjs_console.error(url + ' is not a valid location');
    };

    function fbjs_facebook(appid) {
        var priv = fbjs_private.get(this);
        priv.appid = appid;
        priv.sandbox = fbjs_sandbox.instances['a' + appid];
        this.appid = appid;
    }
    fbjs_facebook.prototype.getUser = function() {
        var priv = fbjs_private.get(this);
        if (priv.sandbox.data.installed) {
            return priv.sandbox.data.user;
        } else return null;
    };
    fbjs_facebook.prototype.isApplicationAdded = function() {
        return fbjs_private.get(this).sandbox.data.installed;
    };
    fbjs_facebook.prototype.isLoggedIn = function() {
        return fbjs_private.get(this).sandbox.data.installed;
    };
    fbjs_facebook.prototype.trackPageview = function(text) {
        if (_gaq) {
            _gaq.push(["_trackPageview", text]);
        } else fbjs_console.error('There is no fb:google-analytics tag on this page!');
    };
    fbjs_facebook.prototype.urchinTracker = fbjs_facebook.prototype.trackPageview;
    fbjs_facebook.prototype.trackEvent = function(category, action, opt_label, opt_value) {
        if (_gaq) {
            _gaq.push(["_trackEvent", category, action, opt_label, opt_value]);
        } else fbjs_console.error('There is no fb:google-analytics tag on this page!');
    };
    fbjs_facebook.prototype.showFeedDialog = function(template_bundle_id, template_data, body_general, target_id, continuation, user_message_prompt, user_message) {
        FBML.showFeedDialog(this.appid, template_bundle_id, template_data, body_general, target_id, continuation, user_message_prompt, user_message);
    };
    fbjs_facebook.prototype.streamPublish = function(user_message, attachment, action_links, target_id, user_message_prompt, callback, auto_publish, actor_id) {
        FBML.streamPublish(this.appid, user_message, attachment, action_links, target_id, user_message_prompt, callback, auto_publish, actor_id);
    };
    fbjs_facebook.prototype.promptPermission = function(perms, callback) {
        FBML.promptPermissionPro(this.appid, perms, callback);
    };
    fbjs_facebook.prototype.showPermissionDialog = function(perms, callback, enableProfileSelector, profileSelectorIds) {
        FBML.showPermissionDialog(this.appid, perms, callback, enableProfileSelector, profileSelectorIds);
    };
    fbjs_facebook.prototype.showBookmarkDialog = function(callback, force_old) {
        FBML.showBookmarkDialog(this.appid, callback, force_old);
    };
    fbjs_facebook.prototype.showProfileTabDialog = function(callback) {
        FBML.showProfileTabDialog(this.appid, callback);
    };
    fbjs_facebook.prototype.showAddFriendDialog = function(target_id, callback) {
        FBML.showAddFriendDialog(this.appid, target_id, callback);
    };
    fbjs_facebook.prototype.createApplication = function(application_name, callback) {
        FBML.createApplication(application_name, callback);
    };
    fbjs_facebook.prototype.setPublishStatus = function(on) {
        var publish = ge(this.appid + '_publish_button');
        if (publish) {
            publish.disabled = !on;
            CSS.conditionClass(publish, 'disabled_button', !on);
        }
        var node = ge('app_content_' + this.appid);
        if (node) {
            var attachment = DataStore.get(node, 'attachment');
            if (attachment) attachment.setEnabled(on);
        }
    };
    fbjs_facebook.prototype.requireLogin = function(continuation, cancellation) {
        if (!continuation) {
            fbjs_console.error('Continuation is a required parameter for requireLogin');
            return false;
        }
        var priv = fbjs_private.get(this);
        if (!priv.sandbox.data.installed) {
            FBML.requireLogin(this.appid, function() {
                priv.sandbox.data.installed = true;
                try {
                    continuation();
                } finally {
                    fbjs_sandbox.clean_mess();
                }
            }, (cancellation || bagofholding));
        } else try {
            continuation();
        } finally {
            fbjs_sandbox.clean_mess();
        }
    };
    fbjs_facebook.prototype.submitOrder = function(order) {
        var app_id = fbjs_private.get(this).appid;
        var receiver = order.receiver;
        var order_info = order.order_info;
        var next_js = order.next_js;
        var next_url = order.next_url;
        var valid_shortcut = {
            'cc': '',
            'mobile': '',
            'paypal_ba': '',
            'offer': ''
        };
        if (order.shortcut in valid_shortcut) {
            var shortcut = order.shortcut;
        } else var shortcut = null;
        var dev_purchase_params = {
            oscif: order.oscif,
            shortcut: shortcut
        };
        GiftCredits.getPrompt(app_id, receiver, order_info, next_url, next_js, GiftCredits.PLACE_APP, null, null, 'BuyItem', dev_purchase_params);
    };

    function fbjs_dom(obj, appid) {
        this.__instance = fbjs_dom.len;
        try {
            obj.fbjs_instance = fbjs_dom.len;
        } catch (e) {}
        fbjs_dom[fbjs_dom.len] = {
            instance: this,
            obj: obj,
            events: {},
            appid: appid
        };
        fbjs_dom.len++;
    }
    fbjs_dom.len = 0;
    fbjs_dom.attr_setters = {
        'href': 'setHref',
        'id': 'setId',
        'dir': 'setDir',
        'checked': 'setChecked',
        'action': 'setAction',
        'value': 'setValue',
        'method': 'setMethod',
        'target': 'setTarget',
        'src': 'setSrc',
        'class': 'setClassName',
        'dir': 'setDir',
        'title': 'setTitle',
        'tabIndex': 'setTabIndex',
        'name': 'setName',
        'cols': 'setCols',
        'rows': 'setRows',
        'accessKey': 'setAccessKey',
        'disabled': 'setDisabled',
        'readOnly': 'setReadOnly',
        'type': 'setType',
        'selectedIndex': 'setSelectedIndex',
        'selected': 'setSelected'
    };
    fbjs_dom.factory = function(obj, appid) {
        if (!obj.tagName || ((!fbjs_main.allowed_elements[obj.tagName.toLowerCase()] && !fbjs_main.allowed_editable[obj.tagName.toLowerCase()]) || CSS.hasClass(obj, '__fbml_tag') || obj.id === 'so_swf_fbjs' || (obj.tagName == 'INPUT' && (obj.name.substring(0, 2) == 'fb' || obj.name == 'post_form_id')))) {
            return null;
        } else {
            var walk_elem = obj;
            while (walk_elem && walk_elem.tagName) {
                if (walk_elem.getAttribute('fb_protected') == 'true') return null;
                walk_elem = walk_elem.parentNode;
            }
            return new this(obj, appid);
        }
    };
    fbjs_dom.get_data = function(handle) {
        if (handle.__instance instanceof Object) {
            return null;
        } else {
            var data = fbjs_dom[handle.__instance];
            return data.instance == handle ? data : null;
        }
    };
    fbjs_dom.get_obj = function(handle) {
        if (handle instanceof fbjs_fbml_dom) {
            return fbjs_fbml_dom.get_obj(handle);
        } else if (typeof handle.__instance == 'number') {
            var data = fbjs_dom[handle.__instance];
            if (data && data.instance == handle) {
                return data.obj;
            } else throw ('This DOM node is no longer valid.');
        } else throw ('This DOM node is no longer valid.');
    };
    fbjs_dom.render = function(handle) {
        if (handle instanceof fbjs_fbml_dom) fbjs_fbml_dom.render(handle);
    };
    fbjs_dom.get_instance = function(obj, appid) {
        if (!obj) return null;
        if (typeof obj.fbjs_instance == 'undefined') {
            return fbjs_dom.factory(obj, appid);
        } else return fbjs_dom[obj.fbjs_instance].instance;
    };
    fbjs_dom.submitNamespacedForm = function(root, cause) {
        if (Env.rawnames) return root.submit();
        var submitter = cause && cause.target;
        var cleanup = [],
            errors = [];
        var newForm = document.createElement('form');
        var submitFunction = newForm.submit;

        function copyAttrs(targ, src, attrs) {
            attrs.map(function(k) {
                try {
                    if (targ[k] != src[k]) targ[k] = src[k];
                } catch (ie) {
                    errors.push("Can't assign " + k + " property for " + targ.nodeName);
                }
            });
        }
        newForm.style.display = 'none';
        copyAttrs(newForm, root, ['target', 'action', 'method', 'enctype']);
        var okNodes = {
            INPUT: 1,
            SELECT: 1,
            TEXTAREA: 1,
            OPTION: 1,
            OPTGROUP: 1
        };
        var okAttrs = ['value', 'selected', 'checked'];
        try {
            try {
                function hidden(base, n, v) {
                    base.appendChild($N('input', {
                        name: n,
                        value: v,
                        type: 'hidden'
                    }));
                }
                function traverse(n, targetNode) {
                    while (n) {
                        if (n.nodeType === 3) targetNode.appendChild(document.createTextNode(n.data));
                        if (okNodes[n.nodeName] === 1) {
                            var newNode;
                            if (/input/i.test(n.nodeName) && /file/i.test(n.type)) {
                                cleanup.push(function(node, orgParent, orgNext, orgName) {
                                    return function() {
                                        node.parentNode.removeChild(node);
                                        node.name = orgName;
                                        if (orgNext) {
                                            orgParent.insertBefore(node, orgNext);
                                        } else orgParent.appendChild(node);
                                    };
                                }(n, n.parentNode, n.nextSibling, n.name));
                                n.parentNode.removeChild(n);
                                newNode = n;
                                targetNode.appendChild(newNode);
                            } else {
                                newNode = document.createElement(n.nodeName);
                                newNode.type = n.type;
                                targetNode.appendChild(newNode);
                                copyAttrs(newNode, n, okAttrs);
                                traverse(n.firstChild, newNode);
                            }
                            newNode.name = stripNS(n.name);
                        } else traverse(n.firstChild, targetNode);
                        if (submitter === n) if (/image/i.test(n.type)) {
                            var baseName = n.name ? stripNS(n.name) + '.' : '';
                            hidden(targetNode, baseName + 'x', cause.x);
                            hidden(targetNode, baseName + 'y', cause.y);
                        } else hidden(targetNode, stripNS(n.name), n.value);
                        n = n.nextSibling;
                    }
                }
                document.body.appendChild(newForm);
                cleanup.push(function() {
                    document.body.removeChild(newForm);
                });
                traverse(root.firstChild, newForm);
                if (document.all) {
                    var x = 'fb_ie_workaround';
                    if (x in newForm) throw 'Shenanigans!';
                    newForm[x] = submitFunction;
                    newForm[x]();
                } else submitFunction.call(newForm);
            } finally {
                for (var i = cleanup.length; i-- > 0;) try {
                    cleanup[i]();
                } catch (e) {
                    errors.push([e, 'in', cleanup[i]]);
                }
            }
        } catch (e_) {
            errors.push(e_);
        }
        if (errors.length) fbjs_console.error('Errors during form submit', fbjsErrors = errors);
    };
    fbjs_dom.get_instance_list = function(list, appid) {
        var objs = [];
        for (var i = 0; i < list.length; i++) {
            var obj = fbjs_dom.get_instance(list[i], appid);
            if (obj) objs.push(obj);
        }
        return objs;
    };
    fbjs_dom.get_first_valid_instance = function(obj, next, appid) {
        var ret = null;
        if (obj && ((obj.id && obj.id.indexOf('app_content') != -1) || (obj.tagName && obj.tagName.toLowerCase() == 'body'))) return null;
        while (obj && (!(ret = fbjs_dom.factory(obj, appid)))) {
            if ((obj.id && obj.id.indexOf('app_content') != -1) || (obj.tagName && obj.tagName.toLowerCase() == 'body')) return null;
            obj = obj[next];
        }
        return ret;
    };
    fbjs_dom.clear_instances = function(obj, include) {
        if (include && obj.fbjs_instance) {
            delete fbjs_dom[obj.fbjs_instance].obj;
            delete fbjs_dom[obj.fbjs_instance].events;
            delete fbjs_dom[obj.fbjs_instance].instance;
            delete fbjs_dom[obj.fbjs_instance];
            obj.fbjs_instance = undefined;
        }
        var cn = obj.childNodes;
        for (var i = 0; i < cn.length; i++) fbjs_dom.clear_instances(cn[i], true);
    };
    fbjs_dom.canInsertIn = function(o) {
        for (; o && o.tagName; o = o.parentNode) if (/textarea|option/i.test(o.tagName)) {
            fbjs_console.error("Use getValue()/setValue() to access the contents of <" + o.tagName + "> tags");
            return false;
        }
        return true;
    };
    fbjs_dom.prototype.appendChild = function(child) {
        if (!fbjs_dom.canInsertIn(fbjs_dom.get_obj(this))) return;
        fbjs_dom.get_obj(this).appendChild(fbjs_dom.get_obj(child));
        fbjs_dom.render(child);
        return child;
    };
    fbjs_dom.prototype.insertBefore = function(child, caret) {
        if (!fbjs_dom.canInsertIn(fbjs_dom.get_obj(this))) return;
        if (caret) {
            fbjs_dom.get_obj(this).insertBefore(fbjs_dom.get_obj(child), fbjs_dom.get_obj(caret));
        } else fbjs_dom.get_obj(this).appendChild(fbjs_dom.get_obj(child));
        fbjs_dom.render(child);
        return child;
    };
    fbjs_dom.prototype.removeChild = function(child) {
        var child = fbjs_dom.get_obj(child);
        fbjs_dom.clear_instances(child, true);
        fbjs_dom.get_obj(this).removeChild(child);
        return this;
    };
    fbjs_dom.prototype.replaceChild = function(newchild, oldchild) {
        if (!fbjs_dom.canInsertIn(fbjs_dom.get_obj(this))) return;
        fbjs_dom.clear_instances(oldchild, true);
        fbjs_dom.get_obj(this).replaceChild(fbjs_dom.get_obj(newchild), fbjs_dom.get_obj(oldchild));
        return this;
    };
    fbjs_dom.prototype.cloneNode = function(tree) {
        var data = fbjs_dom.get_data(this);
        var obj = data.obj.cloneNode(tree);
        obj.fbjs_instance = undefined;
        return fbjs_dom.get_instance(obj, data.appid);
    };
    fbjs_dom.prototype.getParentNode = function() {
        var data = fbjs_dom.get_data(this);
        return fbjs_dom.get_first_valid_instance(data.obj.parentNode, 'parentNode', data.appid);
    };
    fbjs_dom.prototype.getNextSibling = function() {
        var data = fbjs_dom.get_data(this);
        return fbjs_dom.get_first_valid_instance(data.obj.nextSibling, 'nextSibling', data.appid);
    };
    fbjs_dom.prototype.getPreviousSibling = function() {
        var data = fbjs_dom.get_data(this);
        return fbjs_dom.get_first_valid_instance(data.obj.previousSibling, 'previousSibling', data.appid);
    };
    fbjs_dom.prototype.getFirstChild = function() {
        var data = fbjs_dom.get_data(this);
        return fbjs_dom.get_first_valid_instance(data.obj.firstChild, 'nextSibling', data.appid);
    };
    fbjs_dom.prototype.getLastChild = function() {
        var data = fbjs_dom.get_data(this);
        return fbjs_dom.get_first_valid_instance(data.obj.lastChild, 'previousSibling', data.appid);
    };
    fbjs_dom.prototype.getChildNodes = function() {
        var data = fbjs_dom.get_data(this);
        return fbjs_dom.get_instance_list(data.obj.childNodes, data.appid);
    };
    fbjs_dom.prototype.getElementsByTagName = function(tag) {
        var data = fbjs_dom.get_data(this);
        return fbjs_dom.get_instance_list(data.obj.getElementsByTagName(tag), data.appid);
    };
    fbjs_dom.prototype.getOptions = function() {
        var data = fbjs_dom.get_data(this);
        return fbjs_dom.get_instance_list(data.obj.options, data.appid);
    };
    fbjs_dom.prototype.getForm = function() {
        var data = fbjs_dom.get_data(this);
        return fbjs_dom.get_instance(data.obj.form, data.appid);
    };
    fbjs_dom.prototype.serialize = function() {
        var elements = fbjs_dom.get_data(this).obj.elements;
        var data = {};
        for (var i = elements.length - 1; i >= 0; i--) if (elements[i].name && elements[i].name.substring(0, 2) != 'fb' && elements[i].name != 'post_form_id' && !elements[i].disabled) if (elements[i].tagName == 'SELECT') {
            var name = elements[i].multiple ? elements[i].name + '[]' : elements[i].name;
            for (var j = 0, jl = elements[i].options.length; j < jl; j++) if (elements[i].options[j].selected) Form._serializeHelper(data, name, (elements[i].options[j].getAttribute('value') == null) ? undefined : elements[i].options[j].value);
        } else if (!(elements[i].type == 'radio' || elements[i].type == 'checkbox') || elements[i].checked || (!elements[i].type || elements[i].type == 'text' || elements[i].type == 'password' || elements[i].type == 'hidden' || elements[i].tagName == 'TEXTAREA')) Form._serializeHelper(data, elements[i].name, elements[i].value);
        return data;
    };
    fbjs_dom.prototype.setInnerXHTML = function(html) {
        var data = fbjs_dom.get_data(this);
        var sanitizer = new fbjs_fbml_sanitize(data.appid);
        var htmlElem = sanitizer.parseFBML(html);
        if (!htmlElem) return this;
        var obj = fbjs_dom.get_obj(this);
        if (!fbjs_dom.canInsertIn(obj)) return;
        switch (obj.tagName) {
        case 'COL':
        case 'COLGROUP':
        case 'TABLE':
        case 'TBODY':
        case 'TFOOT':
        case 'THEAD':
        case 'TR':
            fbjs_console.error('setInnerXHTML is not supported on this node.');
            break;
        default:
            fbjs_dom.clear_instances(obj, false);
            DOM.empty(obj);
            this.appendChild(htmlElem);
            break;
        }
        return this;
    };
    fbjs_dom.prototype.setInnerFBML = function(fbml_ref) {
        var html = fbjs_private.get(fbml_ref).htmlstring;
        var obj = fbjs_dom.get_obj(this);
        if (!fbjs_dom.canInsertIn(obj)) return;
        switch (obj.tagName) {
        case 'COL':
        case 'COLGROUP':
        case 'TABLE':
        case 'TBODY':
        case 'TFOOT':
        case 'THEAD':
        case 'TR':
            fbjs_console.error('setInnerFBML is not supported on this node.');
            break;
        default:
            DOM.setContent(obj, html);
            break;
        }
        return this;
    };
    fbjs_dom.prototype.setTextValue = function(text) {
        var obj = fbjs_dom.get_obj(this);
        fbjs_dom.clear_instances(obj, false);
        DOM.setContent(obj, fbjs_sandbox.safe_string(text));
        return this;
    };
    fbjs_dom.prototype.setValue = function(value) {
        fbjs_dom.get_obj(this).value = value;
        return this;
    };
    fbjs_dom.prototype.getValue = function() {
        var obj = fbjs_dom.get_obj(this);
        if (obj.tagName == 'SELECT') {
            var si = obj.selectedIndex;
            if (si == -1) {
                return null;
            } else if (obj.options[si].getAttribute('value') == null) {
                return undefined;
            } else return obj.value;
        } else return fbjs_dom.get_obj(this).value;
    };
    fbjs_dom.prototype.getSelectedIndex = function() {
        return fbjs_dom.get_obj(this).selectedIndex;
    };
    fbjs_dom.prototype.setSelectedIndex = function(si) {
        fbjs_dom.get_obj(this).selectedIndex = si;
        return this;
    };
    fbjs_dom.prototype.getChecked = function() {
        return fbjs_dom.get_obj(this).checked;
    };
    fbjs_dom.prototype.setChecked = function(c) {
        fbjs_dom.get_obj(this).checked = c;
        return this;
    };
    fbjs_dom.prototype.getSelected = function() {
        return fbjs_dom.get_obj(this).selected;
    };
    fbjs_dom.prototype.setSelected = function(s) {
        fbjs_dom.get_obj(this).selected = s;
        return this;
    };
    fbjs_dom.set_style = function(obj, style, value) {
        if (typeof style == 'string') {
            if (style == 'opacity') {
                CSS.setStyle(obj, 'opacity', parseFloat(value, 10));
            } else {
                value = fbjs_sandbox.safe_string(value);
                if (fbjs_dom.css_regex.test(value)) {
                    obj.style[style] = value;
                } else fbjs_console.error(style + ': ' + value + ' is not a valid CSS style');
            }
        } else for (var i in style) fbjs_dom.set_style(obj, i, style[i]);
    };
    fbjs_dom.css_regex = /^(?:[\w\-#%+ ]|rgb\(\d+ *, *\d+, *\d+\)|url\((\'?)http[!#-&*-;=?-[\]^_-}~]+\1\))*$/i;
    fbjs_dom.prototype.setStyle = function(style, value) {
        fbjs_dom.set_style(fbjs_dom.get_obj(this), style, value);
        return this;
    };
    fbjs_dom.prototype.getStyle = function(style_str) {
        return fbjs_dom.get_obj(this).style[$FBJS.idx(style_str)];
    };
    fbjs_dom.prototype.setHref = function(href) {
        href = fbjs_sandbox.safe_string(href);
        if (fbjs_dom.href_regex.test(href)) {
            fbjs_dom.get_obj(this).href = href;
            return this;
        } else fbjs_console.error(href + ' is not a valid hyperlink');
    };
    fbjs_dom.href_regex = /^(?:https?|mailto|ftp|aim|irc|itms|gopher|\/|#)/;
    fbjs_dom.sanitizeUri = function(href) {
        var uri = new URI().parse(href);
        for (var key in uri.getQueryData()) if (key.startsWith("_fb")) uri.removeQueryData(key);
        return uri.toString();
    };
    fbjs_dom.prototype.getHref = function() {
        return fbjs_dom.sanitizeUri(fbjs_dom.get_obj(this).href);
    };
    fbjs_dom.prototype.setAction = function(a) {
        if (FBML.isServerFBML && FBML.serverFBMLParams.disable_fbjs_setaction) {
            fbjs_console.error('setAction not allowed in serverfbml');
            return;
        }
        a = fbjs_sandbox.safe_string(a);
        if (fbjs_dom.href_regex.test(a)) {
            fbjs_dom.get_obj(this).action = a;
            return this;
        } else fbjs_console.error(a + ' is not a valid hyperlink');
    };
    fbjs_dom.prototype.getAction = function() {
        return fbjs_dom.get_obj(this).action;
    };
    fbjs_dom.prototype.setMethod = function(m) {
        m = fbjs_sandbox.safe_string(m);
        fbjs_dom.get_obj(this).method = m.toLowerCase() == 'get' ? 'get' : 'post';
        return this;
    };
    fbjs_dom.prototype.getMethod = function() {
        return fbjs_dom.get_obj(this).method;
    };
    fbjs_dom.prototype.setSrc = function(src) {
        src = fbjs_sandbox.safe_string(src);
        if (fbjs_dom.href_regex.test(src)) {
            fbjs_dom.get_obj(this).src = src;
            return this;
        } else fbjs_console.error(src + ' is not a valid hyperlink');
    };
    fbjs_dom.prototype.getSrc = function() {
        return fbjs_dom.get_obj(this).src;
    };
    fbjs_dom.prototype.setTarget = function(target) {
        return setNS(this, 'target', target, /^_(blank|self|top|parent)$/.test(target) || Env.rawnames);
    };
    fbjs_dom.prototype.getTarget = function() {
        return getNS(this, 'target');
    };
    fbjs_dom.prototype.setClassName = function(classname) {
        fbjs_dom.get_obj(this).className = classname;
        return this;
    };
    fbjs_dom.prototype.getClassName = function() {
        return fbjs_dom.get_obj(this).className;
    };
    fbjs_dom.prototype.hasClassName = function(classname) {
        return CSS.hasClass(fbjs_dom.get_obj(this), classname);
    };
    fbjs_dom.prototype.addClassName = function(classname) {
        CSS.addClass(fbjs_dom.get_obj(this), classname);
        return this;
    };
    fbjs_dom.prototype.removeClassName = function(classname) {
        CSS.removeClass(fbjs_dom.get_obj(this), classname);
        return this;
    };
    fbjs_dom.prototype.toggleClassName = function(classname) {
        this.hasClassName(classname) ? this.removeClassName(classname) : this.addClassName(classname);
        return $FBJS.ref(this);
    };
    fbjs_dom.prototype.getTagName = function() {
        return fbjs_dom.get_obj(this).tagName;
    };
    fbjs_dom.prototype.getNodeType = function() {
        return fbjs_dom.get_obj(this).nodeType;
    };

    function getNS(o, attr) {
        var v = fbjs_dom.get_obj(o)[attr];
        return stripNS(v);
    }
    function stripNS(v) {
        return v && v.replace(/^app\d+_/, '');
    }
    function setNS(o, attr, v, raw) {
        var dom = fbjs_dom.get_obj(o);
        dom[attr] = raw ? v : 'app' + fbjs_dom.get_data(o).appid + '_' + v;
        return o;
    }
    fbjs_dom.prototype.getId = function() {
        return getNS(this, 'id');
    };
    fbjs_dom.prototype.setId = function(v) {
        return setNS(this, 'id', v);
    };
    fbjs_dom.prototype.setDir = function(dir) {
        fbjs_dom.get_obj(this).dir = dir;
        return this;
    };
    fbjs_dom.prototype.getDir = function(dir) {
        return fbjs_dom.get_obj(this).dir;
    };
    fbjs_dom.prototype.getdir = function(dir) {
        return fbjs_dom.get_obj(this).dir;
    };
    fbjs_dom.prototype.getClientWidth = function() {
        return fbjs_dom.get_obj(this).clientWidth;
    };
    fbjs_dom.prototype.getClientHeight = function() {
        return fbjs_dom.get_obj(this).clientHeight;
    };
    fbjs_dom.prototype.getOffsetWidth = function() {
        return fbjs_dom.get_obj(this).offsetWidth;
    };
    fbjs_dom.prototype.getOffsetHeight = function() {
        return fbjs_dom.get_obj(this).offsetHeight;
    };
    fbjs_dom.prototype.getAbsoluteLeft = function() {
        return Vector2.getElementPosition(fbjs_dom.get_obj(this), 'document').x;
    };
    fbjs_dom.prototype.getAbsoluteTop = function() {
        return Vector2.getElementPosition(fbjs_dom.get_obj(this), 'document').y;
    };
    fbjs_dom.prototype.getScrollHeight = function() {
        return fbjs_dom.get_obj(this).scrollHeight;
    };
    fbjs_dom.prototype.getScrollWidth = function(val) {
        return fbjs_dom.get_obj(this).scrollWidth;
    };
    fbjs_dom.prototype.getScrollTop = function() {
        return fbjs_dom.get_obj(this).scrollTop;
    };
    fbjs_dom.prototype.setScrollTop = function(val) {
        fbjs_dom.get_obj(this).scrollTop = val;
        return this;
    };
    fbjs_dom.prototype.getScrollLeft = function() {
        return fbjs_dom.get_obj(this).scrollLeft;
    };
    fbjs_dom.prototype.setScrollLeft = function(val) {
        fbjs_dom.get_obj(this).scrollLeft = val;
        return this;
    };
    fbjs_dom.prototype.getTabIndex = function() {
        return fbjs_dom.get_obj(this).tabIndex;
    };
    fbjs_dom.prototype.setTabIndex = function(tabindex) {
        fbjs_dom.get_obj(this).tabIndex = tabindex;
        return this;
    };
    fbjs_dom.prototype.getTitle = function() {
        return fbjs_dom.get_obj(this).title;
    };
    fbjs_dom.prototype.setTitle = function(title) {
        fbjs_dom.get_obj(this).title = title;
        return this;
    };
    fbjs_dom.prototype.getRowSpan = function() {
        return fbjs_dom.get_obj(this).rowSpan;
    };
    fbjs_dom.prototype.setRowSpan = function(rowSpan) {
        fbjs_dom.get_obj(this).rowSpan = rowSpan;
        return this;
    };
    fbjs_dom.prototype.getColSpan = function() {
        return fbjs_dom.get_obj(this).colSpan;
    };
    fbjs_dom.prototype.setColSpan = function(colSpan) {
        fbjs_dom.get_obj(this).colSpan = colSpan;
        return this;
    };
    fbjs_dom.prototype.getName = function() {
        return getNS(this, 'name');
    };
    fbjs_dom.prototype._getName = function() {
        return "" + fbjs_dom.get_obj(this).name;
    };
    fbjs_dom.prototype.setName = function(v) {
        return setNS(this, 'name', v, Env.rawnames);
    };
    fbjs_dom.prototype.getCols = function() {
        return fbjs_dom.get_obj(this).cols;
    };
    fbjs_dom.prototype.setCols = function(cols) {
        fbjs_dom.get_obj(this).cols = cols;
        return this;
    };
    fbjs_dom.prototype.getRows = function() {
        return fbjs_dom.get_obj(this).rows;
    };
    fbjs_dom.prototype.setRows = function(rows) {
        fbjs_dom.get_obj(this).rows = rows;
        return this;
    };
    fbjs_dom.prototype.getAccessKey = function() {
        return fbjs_dom.get_obj(this).accessKey;
    };
    fbjs_dom.prototype.setAccessKey = function(accesskey) {
        fbjs_dom.get_obj(this).accessKey = accesskey;
        return this;
    };
    fbjs_dom.prototype.setDisabled = function(disabled) {
        fbjs_dom.get_obj(this).disabled = disabled;
        return this;
    };
    fbjs_dom.prototype.getDisabled = function() {
        return fbjs_dom.get_obj(this).disabled;
    };
    fbjs_dom.prototype.setMaxLength = function(length) {
        fbjs_dom.get_obj(this).maxLength = length;
        return this;
    };
    fbjs_dom.prototype.getMaxLength = function() {
        return fbjs_dom.get_obj(this).maxLength;
    };
    fbjs_dom.prototype.setReadOnly = function(readonly) {
        fbjs_dom.get_obj(this).readOnly = readonly;
        return this;
    };
    fbjs_dom.prototype.getReadOnly = function() {
        return fbjs_dom.get_obj(this).readOnly;
    };
    fbjs_dom.prototype.setType = function(type) {
        type = fbjs_sandbox.safe_string(type);
        fbjs_dom.get_obj(this).type = type;
        return this;
    };
    fbjs_dom.prototype.getType = function() {
        return fbjs_dom.get_obj(this).type;
    };
    fbjs_dom.prototype.getSelection = function() {
        var obj = fbjs_dom.get_obj(this);
        return Input.getSelection(obj);
    };
    fbjs_dom.prototype.setSelection = function(start, end) {
        var obj = fbjs_dom.get_obj(this);
        Input.setSelection(obj, start, end);
        return this;
    };
    fbjs_dom.prototype.submit = function() {
        if (Env.rawnames) {
            fbjs_dom.get_obj(this).submit();
        } else fbjs_dom.submitNamespacedForm(fbjs_dom.get_obj(this), null);
        return this;
    };
    fbjs_dom.prototype.focus = function() {
        fbjs_dom.get_obj(this).focus();
        return this;
    };
    fbjs_dom.prototype.select = function() {
        fbjs_dom.get_obj(this).select();
        return this;
    };
    fbjs_dom.eventHandler = function(event) {
        var e = (event instanceof fbjs_event) ? event : new fbjs_event(event ? event : window.event, this[2]);
        if (e.ignore) return;
        try {
            var r = this[1].call(this[0], e);
        } finally {
            fbjs_sandbox.clean_mess();
        }
        if (r === false) e.preventDefault();
        return fbjs_event.destroy(e);
    };
    fbjs_dom.prototype.addEventListener = function(type, func) {
        type = fbjs_sandbox.safe_string(type.toLowerCase());
        if (!fbjs_main.allowed_events[type]) {
            fbjs_console.error(type + ' is not an allowed event');
            return false;
        }
        var data = fbjs_dom.get_data(this);
        var obj = data.obj;
        if (!data.events[type]) data.events[type] = [];
        var handler = null;
        var listener = null;
        if (obj.addEventListener) {
            obj.addEventListener(type, handler = fbjs_dom.eventHandler.bind([this, func, data.appid]), false);
        } else if (obj.attachEvent) obj.attachEvent('on' + type, handler = fbjs_dom.eventHandler.bind([this, func, data.appid]));
        data.events[type].push({
            func: func,
            handler: handler,
            listener: listener
        });
        return $FBJS.ref(this);
    };
    fbjs_dom.prototype.removeEventListener = function(type, func) {
        type = type.toLowerCase();
        var data = fbjs_dom.get_data(this);
        var obj = data.obj;
        if (data.events[type]) for (var i = 0, il = data.events[type].length; i < il; i++) if (data.events[type][i].func == func) {
            if (obj.removeEventListener) {
                obj.removeEventListener(type, data.events[type][i].handler, false);
            } else if (obj.detachEvent) obj.detachEvent('on' + type, data.events[type][i].handler);
            data.events[type].splice(i, 1);
        }
        return this;
    };
    fbjs_dom.prototype.listEventListeners = function(type) {
        type = type.toLowerCase();
        var data = fbjs_dom.get_data(this);
        var events = [];
        if (data.events[type]) for (var i = 0, il = data.events[type].length; i < il; i++) events.push(data.events[type].func);
        var f = data.obj['on' + type];
        if (f) events.push(function() {
            f.apply(this, arguments);
        });
        return events;
    };
    fbjs_dom.prototype.purgeEventListeners = function(type) {
        type = type.toLowerCase();
        var data = fbjs_dom.get_data(this);
        var obj = data.obj;
        if (data.events[type]) for (var i = 0, il = data.events[type].length; i < il; i++) if (obj.removeEventListener) {
            obj.removeEventListener(type, data.events[type][i].handler, false);
        } else if (obj.detachEvent) obj.detachEvent('on' + type, data.events[type][i].handler);
        return this;
    };
    fbjs_dom.prototype.callSWF = function(method) {
        var obj = fbjs_dom.get_data(this).obj;
        var args = new Array(arguments.length - 1);
        var id = 0;
        var fbjsBridge = null;
        for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
        id = obj.getAttribute("fbjs");
        fbjsBridge = document.so_swf_fbjs;
        if (fbjsBridge.length !== undefined) fbjsBridge = fbjsBridge[0];
        return fbjsBridge.callFlash(id, method, args);
    };

    function fbjs_fbml_dom(type, appid) {
        var data = fbjs_private.get(this);
        data.type = type;
        data.appid = appid;
    }
    fbjs_fbml_dom.get_obj = function(instance) {
        var data = fbjs_private.get(instance);
        if (!data.obj) {
            data.obj = document.createElement('div');
            data.obj.className = '__fbml_tag';
        }
        return data.obj;
    };
    fbjs_fbml_dom.render = function(instance) {
        var data = fbjs_private.get(instance);
        if (data.rendered) return;
        if (!data.id) data.id = 'swf' + parseInt(Math.random() * 999999);
        switch (data.type) {
        case 'fb:swf':
            var flash_obj = new SWFObject(data.swf_src, data.id, data.width, data.height, ['5.0.0'], data.bg_color ? data.bg_color : '000000');
            var flash_params = {
                loop: true,
                quality: true,
                scale: true,
                align: true,
                salign: true
            };
            for (i in flash_params) if (data[i]) flash_obj.addParam(i, data[i]);
            flash_obj.addParam('wmode', 'transparent');
            flash_obj.addParam('allowScriptAccess', 'never');
            if (data.flash_vars) for (var i in data.flash_vars) flash_obj.addVariable(i, data.flash_vars[i]);
            var sandbox = fbjs_sandbox.instances['a' + data.appid];
            if (sandbox.validation_vars) for (var i in sandbox.validation_vars) flash_obj.addVariable(i, sandbox.validation_vars[i]);
            flash_obj.addVariable('fb_local_connection', sandbox.bridgeHash);
            var fbjs_conn = '_' + 'swf' + parseInt(Math.random() * 999999);
            flash_obj.addVariable('fb_fbjs_connection', fbjs_conn);
            flash_obj.addParam('fbjs', fbjs_conn);
            if (data.wait_for_click) {
                var img = document.createElement('img');
                img.src = data.img_src;
                if (data.width) img.width = data.width;
                if (data.height) img.height = data.height;
                if (data.img_style) fbjs_dom.set_style(img, data.img_style);
                if (data.img_class) img.className = data.img_class;
                var anchor = document.createElement('a');
                anchor.href = '#';
                anchor.onclick = function() {
                    flash_obj.write(data.obj);
                    return false;
                };
                anchor.appendChild(img);
                data.obj.appendChild(anchor);
            } else flash_obj.write(data.obj);
            break;
        }
    };
    fbjs_fbml_dom.prototype.setId = function(id) {
        var data = fbjs_private.get(this);
        data.id = ['app', data.appid, '_', id].join('');
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setSWFSrc = function(swf) {
        var data = fbjs_private.get(this);
        swf = fbjs_sandbox.safe_string(swf);
        if (fbjs_dom.href_regex.test(swf)) {
            data.swf_src = swf;
        } else fbjs_console.error(swf + ' is not a valid swf');
    };
    fbjs_fbml_dom.prototype.setImgSrc = function(img) {
        var data = fbjs_private.get(this);
        img = fbjs_sandbox.safe_string(img);
        if (fbjs_dom.href_regex.test(img)) {
            data.img_src = img;
        } else fbjs_console.error(img + ' is not a valid src');
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setWidth = function(width) {
        var data = fbjs_private.get(this);
        data.width = (/\d+%?/.exec(width) || []).pop();
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setHeight = function(height) {
        var data = fbjs_private.get(this);
        data.height = (/\d+%?/.exec(height) || []).pop();
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setImgStyle = function(style, value) {
        var data = fbjs_private.get(this);
        var style_obj = data.img_style ? data.img_style : data.img_style = {};
        if (typeof style == 'string') {
            style_obj[style] = value;
        } else for (var i in style) this.setImgStyle(i, style[i]);
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setImgClass = function(img_class) {
        var data = fbjs_private.get(this);
        data.img_class = img_class;
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setFlashVar = function(key, val) {
        var data = fbjs_private.get(this);
        var flash_vars = data.flash_vars ? data.flash_vars : data.flash_vars = {};
        flash_vars[key] = val;
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setWaitForClick = function(wait) {
        var data = fbjs_private.get(this);
        data.wait_for_click = wait;
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setLoop = function(val) {
        var data = fbjs_private.get(this);
        data.loop = val;
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setQuality = function(val) {
        var data = fbjs_private.get(this);
        data.quality = val;
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setScale = function(val) {
        var data = fbjs_private.get(this);
        data.scale = val;
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setAlign = function(val) {
        var data = fbjs_private.get(this);
        data.align = val;
        return $FBJS.ref(this);
    };
    fbjs_fbml_dom.prototype.setSAlign = function(val) {
        var data = fbjs_private.get(this);
        data.salign = val;
        return $FBJS.ref(this);
    };

    function fbjs_event(event, appid) {
        if (!fbjs_event.hacks) {
            fbjs_event.hacks = true;
            fbjs_event.should_check_double_arrows = ua.safari() && (ua.safari() < 500);
            fbjs_event.arrow_toggle = {};
        }
        for (var i in fbjs_event.allowed_properties) this[i] = event[i];
        this.keyCode = this.keyCode || event.charCode;
        var target = null;
        if (event.target) {
            target = event.target;
        } else if (event.srcElement) target = event.srcElement;
        if (target && target.nodeType == 3) target = target.parentNode;
        this.target = fbjs_dom.get_instance(target, appid);
        var event_pos = Vector2.getEventPosition(event);
        this.pageX = event_pos.x;
        this.pageY = event_pos.y;
        if (fbjs_event.should_check_double_arrows && this.keyCode >= 37 && this.keyCode <= 40) {
            fbjs_event.arrow_toggle[this.type] = !fbjs_event.arrow_toggle[this.type];
            if (fbjs_event.arrow_toggle[this.type]) this.ignore = true;
        }
        fbjs_private.get(this).event = event;
    }
    fbjs_event.allowed_properties = {
        type: true,
        ctrlKey: true,
        keyCode: true,
        metaKey: true,
        shiftKey: true
    };
    fbjs_event.prototype.preventDefault = function() {
        var data = fbjs_private.get(this);
        if (!data.prevented && data.event.preventDefault) {
            data.event.preventDefault();
            data.event._prevented = true;
            data.prevented = true;
        }
        data.return_value = false;
    };
    fbjs_event.prototype.stopPropagation = function() {
        var event = fbjs_private.get(this).event;
        if (event.stopPropagation) {
            event.stopPropagation();
        } else event.cancelBubble = true;
    };
    fbjs_event.destroy = function(obj) {
        var return_value = fbjs_private.get(obj).return_value;
        fbjs_private.remove(obj);
        delete obj.target;
        return return_value == undefined ? true : return_value;
    };

    function fbjs_math() {}
    fbjs_math.prototype.abs = Math.abs;
    fbjs_math.prototype.acos = Math.acos;
    fbjs_math.prototype.asin = Math.asin;
    fbjs_math.prototype.atan = Math.atan;
    fbjs_math.prototype.atan2 = Math.atan2;
    fbjs_math.prototype.ceil = Math.ceil;
    fbjs_math.prototype.cos = Math.cos;
    fbjs_math.prototype.exp = Math.exp;
    fbjs_math.prototype.floor = Math.floor;
    fbjs_math.prototype.log = Math.log;
    fbjs_math.prototype.max = Math.max;
    fbjs_math.prototype.min = Math.min;
    fbjs_math.prototype.pow = Math.pow;
    fbjs_math.prototype.random = Math.random;
    fbjs_math.prototype.round = Math.round;
    fbjs_math.prototype.sin = Math.sin;
    fbjs_math.prototype.sqrt = Math.sqrt;
    fbjs_math.prototype.tan = Math.tan;
    fbjs_math.prototype.E = Math.E;
    fbjs_math.prototype.LN2 = Math.LN2;
    fbjs_math.prototype.LN10 = Math.LN10;
    fbjs_math.prototype.LOG2E = Math.LOG2E;
    fbjs_math.prototype.PI = Math.PI;
    fbjs_math.prototype.SQRT1_2 = Math.SQRT1_2;
    fbjs_math.prototype.SQRT2 = Math.SQRT2;

    function fbjs_string() {}
    fbjs_string.prototype.fromCharCode = String.fromCharCode;

    function fbjs_date() {
        var date = function() {
                var ret = new Date();
                if (arguments.length) ret.setFullYear.apply(ret, arguments);
                return ret;
            };
        date.parse = Date.parse;
        return date;
    }
    function fbjs_regexp() {
        var regexp = function() {
                var ret = arguments.length ? new RegExp(arguments[0], arguments[1]) : new RegExp();
                return ret;
            };
        return regexp;
    }
    function fbjs_console() {}
    fbjs_console.error = function(text) {
        if (typeof console != 'undefined' && console.error) console.error(text);
    };
    fbjs_console.render = function(obj) {
        if (obj && typeof obj.__priv != 'undefined') {
            var new_obj = {};
            for (var i in obj) new_obj[i] = obj[i];
            delete new_obj.__priv;
            delete new_obj.__private;
            for (var i in new_obj) new_obj[i] = fbjs_console.render(new_obj[i]);
            var priv = fbjs_private.get(obj);
            for (var i in priv) new_obj['PRIV_' + i] = priv[i];
            if (obj.__private) {
                var priv = fbjs_private.get(obj.__private);
                for (var i in priv) new_obj['PRIV_' + i] = priv[i];
            }
            return new_obj;
        } else if (obj && typeof obj.__instance != 'undefined' && obj.setInnerFBML) {
            var new_obj = {};
            for (var i in obj) new_obj[i] = obj[i];
            delete new_obj.__instance;
            new_obj.PRIV_obj = fbjs_dom.get_obj(obj);
            return new_obj;
        } else if (obj && typeof obj == 'object' && obj.ownerDocument != document) {
            var new_obj = obj instanceof Array ? [] : {};
            var changed = false;
            for (var i in obj) {
                obj instanceof Array ? new_obj.push(fbjs_console.render(obj[i])) : new_obj[i] = fbjs_console.render(obj[i]);
                if (new_obj[i] != obj[i]) changed = true;
            }
            return changed ? new_obj : obj;
        } else return obj;
    };
    fbjs_console.render_args = function(args) {
        var new_args = [];
        for (var i = 0; i < args.length; i++) new_args[i] = fbjs_console.render(args[i]);
        return new_args;
    };
    if (typeof console != 'undefined') for (var i in console) fbjs_console.prototype[i] = console[i];
    ['debug', 'log', 'warn', 'error', 'assert', 'dir', 'group', 'dirxml'].map(function(s) {
        fbjs_console.prototype[s] = function() {
            if (typeof console != 'undefined' && console[s]) {
                var args = fbjs_console.render_args(arguments);
                if (console[s].apply) {
                    console[s].apply(console, args);
                } else console[s](args.length == 1 ? args[0] : args);
            }
        };
    });

    function fbjs_ajax(appid) {
        var proto = function() {};
        for (var i in fbjs_ajax.prototype) proto.prototype[i] = fbjs_ajax.prototype[i];
        var priv = fbjs_private.get(proto.prototype.__private = {});
        priv.appid = appid;
        priv.sandbox = fbjs_sandbox.instances['a' + appid];
        priv.request = null;
        proto.JSON = fbjs_ajax.JSON;
        proto.FBML = fbjs_ajax.FBML;
        proto.RAW = fbjs_ajax.RAW;
        return proto;
    }
    fbjs_ajax.proxy_url = '/fbml/fbjs_ajax_proxy.php';
    fbjs_ajax.RAW = 0;
    fbjs_ajax.JSON = 1;
    fbjs_ajax.FBML = 2;
    fbjs_ajax.STATUS_WAITING_FOR_USER = 1;
    fbjs_ajax.STATUS_WAITING_FOR_SERVER = 2;
    fbjs_ajax.STATUS_IDLE = 0;
    fbjs_ajax.prototype.responseType = 0;
    fbjs_ajax.prototype.useLocalProxy = false;
    fbjs_ajax.prototype.requireLogin = false;
    fbjs_ajax.prototype.status = fbjs_ajax.STATUS_IDLE;
    fbjs_ajax.tokencount = 0;
    fbjs_ajax.tokens = new Object();
    fbjs_ajax.flash_success = function(res, t) {
        fbjs_ajax.tokens[t].success(res);
    };
    fbjs_ajax.flash_fail = function(t) {
        fbjs_ajax.tokens[t].fail();
    };
    fbjs_ajax.prototype.post = function(url, query) {
        var priv = fbjs_private.get(this.__private);
        var appid = priv.appid;
        var post_form_id = ge('post_form_id');
        if (!priv.sandbox.data.installed && this.requireLogin) {
            this.status = fbjs_ajax.STATUS_WAITING_FOR_USER;
            FBML.requireLogin(appid, function() {
                this.status = fbjs_ajax.STATUS_READY;
                priv.sandbox.data.installed = true;
                this.post(url, query);
            }.bind(this), fbjs_ajax.errorHandler.bind(this));
            return;
        }
        if (this.useLocalProxy && window.localProxy.callUrl && this.responseType != fbjs_ajax.FBML) {
            fbjs_ajax.tokencount++;
            fbjs_ajax.tokens[fbjs_ajax.tokencount] = {
                "success": function(e) {
                    this.status = fbjs_ajax.STATUS_READY;
                    this.ondone(e);
                }.bind(this),
                "fail": fbjs_ajax.errorHandler.bind(this)
            };
            var usejson = (this.responseType == fbjs_ajax.JSON);
            var callUrl = localProxy.callUrl(url + '?query=' + query, usejson, "fbjs_ajax.flash_success", "fbjs_ajax.flash_fail", fbjs_ajax.tokencount);
            if (!callUrl)(fbjs_ajax.errorHandler.bind(this))();
        } else {
            var data = {
                url: url,
                query: query,
                type: this.responseType,
                require_login: this.requireLogin,
                fb_mockajax_context: fbjs_sandbox.instances['a' + appid].contextd,
                fb_mockajax_context_hash: fbjs_sandbox.instances['a' + appid].context,
                appid: appid
            };
            this.status = fbjs_ajax.STATUS_WAITING_FOR_SERVER;
            priv.request = new AsyncRequest();
            priv.request.setURI(fbjs_ajax.proxy_url).setData(data).setHandler(fbjs_ajax.doneHandler.bind(this)).setErrorHandler(fbjs_ajax.errorHandler.bind(this));
            if (!this.requireLogin) {
                priv.request.setReadOnly(true);
                priv.request.specifiesWriteRequiredParams();
            }
            priv.request.send();
        }
    };
    fbjs_ajax.prototype.abort = function() {
        var priv = fbjs_private.get(this.__private);
        if (priv.request) priv.request.setHandler(bagofholding).setErrorHandler(bagofholding);
        this.status = fbjs_ajax.STATUS_READY;
    };
    fbjs_ajax.doneHandler = function(response) {
        if (!(this.ondone instanceof Function)) this.ondone = function() {};
        this.status = fbjs_ajax.STATUS_READY;
        var payload = response.getPayload();
        var data = payload.data;
        try {
            switch (payload.type) {
            case fbjs_ajax.RAW:
                this.ondone(data);
                break;
            case fbjs_ajax.JSON:
                fbjs_ajax.make_fbjs_recursive(data);
                this.ondone(data);
                break;
            case fbjs_ajax.FBML:
                this.ondone(new fbjs_fbml_string(data));
                break;
            }
        } finally {
            fbjs_sandbox.clean_mess();
        }
    };
    fbjs_ajax.errorHandler = function() {
        this.status = fbjs_ajax.STATUS_READY;
        if (this.onerror) {
            try {
                this.onerror();
            } finally {
                fbjs_sandbox.clean_mess();
            }
        } else fbjs_console.error('There was an uncaught Ajax error. Please attach on onerror handler to properly handle failures.');
    };
    fbjs_ajax.make_fbjs_recursive = function(obj) {
        for (var i in obj) if (i.substring(0, 5) == 'fbml_') {
            obj[i] = new fbjs_fbml_string(obj[i]);
        } else if (typeof obj[i] == 'object') fbjs_ajax.make_fbjs_recursive(obj[i]);
    };

    function fbjs_dialog(appid) {
        var proto = function(type) {
                var priv = fbjs_private.get(this);
                priv.dialog = new Dialog();
                priv.dialog.setClassName('app_content_' + appid).setStackable(true);
                priv.type = fbjs_dialog.DIALOG_POP;
                priv.ready = false;
            };
        for (var i in fbjs_dialog.prototype) proto.prototype[i] = fbjs_dialog.prototype[i];
        proto.DIALOG_POP = fbjs_dialog.DIALOG_POP;
        proto.DIALOG_CONTEXTUAL = fbjs_dialog.DIALOG_CONTEXTUAL;
        return proto;
    }
    fbjs_dialog.DIALOG_POP = 1;
    fbjs_dialog.DIALOG_CONTEXTUAL = 2;
    fbjs_dialog.onconfirm = function() {
        var hide = true;
        try {
            if (this.onconfirm) if (this.onconfirm() === false) hide = false;
        } finally {
            fbjs_sandbox.clean_mess();
        }
        if (hide) this.hide();
        return false;
    };
    fbjs_dialog.oncancel = function() {
        var hide = true;
        try {
            if (this.oncancel) if (this.oncancel() === false) hide = false;
        } finally {
            fbjs_sandbox.clean_mess();
        }
        if (hide) this.hide();
        return false;
    };
    fbjs_dialog.build_dialog = function() {
        var priv = fbjs_private.get(this);
        if (!priv.ready) {
            priv.dialog._buildDialog();
            priv.ready = true;
        }
    };
    fbjs_dialog.prototype.setStyle = function(style, value) {
        var priv = fbjs_private.get(this);
        fbjs_dialog.build_dialog.call(this);
        var obj = null;
        if (style == 'width' || style == 'height') {
            obj = priv.dialog._frame.parentNode;
        } else obj = priv.dialog._content;
        fbjs_dom.set_style(obj, style, value);
        return $FBJS.ref(this);
    };
    fbjs_dialog.prototype.showMessage = function(title, content, button1) {
        this.showChoice(title, content, button1, false);
        return $FBJS.ref(this);
    };
    fbjs_dialog.prototype.showChoice = function(title, content, button1, button2) {
        var dialog = fbjs_private.get(this).dialog;
        fbjs_dialog.build_dialog.call(this);
        var buttons = [];
        var button1label = button1 ? fbjs_fbml_string.get(button1) : "Okay";
        buttons.push({
            label: button1label,
            name: 'button1',
            handler: bind(this, fbjs_dialog.onconfirm)
        });
        if (button2 || button2 === undefined) {
            var button2label = button2 ? fbjs_fbml_string.get(button2) : "Cancel";
            buttons.push({
                label: button2label,
                name: 'button2',
                handler: bind(this, fbjs_dialog.oncancel)
            });
        }
        dialog.setTitle(fbjs_fbml_string.get(title)).setBody(fbjs_fbml_string.get(content)).setButtons(buttons).show();
        dialog._content.id = 'app_content_' + (+new Date());
        return $FBJS.ref(this);
    };
    fbjs_dialog.prototype.setContext = function(node) {
        return;
    };
    fbjs_dialog.prototype.hide = function() {
        var dialog = fbjs_private.get(this).dialog;
        dialog.hide();
        return $FBJS.ref(this);
    };

    function fbjs_animation() {
        var proto = function(obj) {
                if (this == window) {
                    return new arguments.callee(fbjs_dom.get_obj(obj));
                } else {
                    fbjs_private.get(this).animation = new animation(obj);
                    fbjs_private.get(this).animation._show = function() {
                        this.obj.style.display = 'block';
                    };
                    fbjs_private.get(this).animation._hide = function() {
                        this.obj.style.display = 'none';
                    };
                }
            };
        for (var i in fbjs_animation.prototype) proto.prototype[i] = fbjs_animation.prototype[i];
        proto.ease = {
            begin: animation.ease.begin,
            end: animation.ease.end,
            both: animation.ease.both
        };
        return proto;
    }
    fbjs_animation.prototype.stop = function() {
        fbjs_private.get(this).animation.stop();
        return this;
    };
    fbjs_animation.prototype.to = function(attr, val) {
        fbjs_private.get(this).animation.to(attr, val);
        return this;
    };
    fbjs_animation.prototype.by = function(attr, val) {
        fbjs_private.get(this).animation.by(attr, val);
        return this;
    };
    fbjs_animation.prototype.from = function(attr, val) {
        fbjs_private.get(this).animation.from(attr, val);
        return this;
    };
    fbjs_animation.prototype.duration = function(duration) {
        fbjs_private.get(this).animation.duration(duration);
        return this;
    };
    fbjs_animation.prototype.checkpoint = function(length, callback) {
        var that = this;
        fbjs_private.get(this).animation.checkpoint(length, typeof callback == 'function' ?
        function() {
            try {
                callback.call(that);
            } finally {
                fbjs_sandbox.clean_mess();
            }
        } : null);
        return this;
    };
    fbjs_animation.prototype.ondone = function(callback) {
        var that = this;
        if (typeof callback == 'function') {
            fbjs_private.get(this).animation.checkpoint(function() {
                try {
                    callback.call(that);
                } finally {
                    fbjs_sandbox.clean_mess();
                }
            });
            return this;
        }
    };
    fbjs_animation.prototype.blind = function() {
        fbjs_private.get(this).animation.blind();
        return this;
    };
    fbjs_animation.prototype.show = function() {
        fbjs_private.get(this).animation.show();
        return this;
    };
    fbjs_animation.prototype.hide = function() {
        fbjs_private.get(this).animation.hide();
        return this;
    };
    fbjs_animation.prototype.ease = function(callback) {
        fbjs_private.get(this).animation.ease(callback);
        return this;
    };
    fbjs_animation.prototype.go = function() {
        fbjs_private.get(this).animation.go();
        return this;
    };

    function fbjs_livemessage(appid) {
        var proto = function(event_name, callback_fn) {
                if (!event_name) throw ('Parameter "event_name" must be non-empty.');
                var priv = fbjs_private.get(this);
                priv.appid = appid;
                priv.event_name = event_name;
                priv.send_success_handler = null;
                priv.send_error_handler = null;
                priv.livemessage = new LiveMessageReceiver(event_name).setAppId(appid).setHandler(callback_fn).register();
            };
        for (var i in fbjs_livemessage.prototype) proto.prototype[i] = fbjs_livemessage.prototype[i];
        return proto;
    }
    fbjs_livemessage.prototype.send = function(recipient, message) {
        if (!recipient) throw ('Parameter "recipient" must be non-empty.');
        var priv = fbjs_private.get(this);
        new AsyncRequest().setURI('/fbml/ajax/livemessage_send.php').setData({
            app_id: priv.appid,
            recipient: recipient,
            event_name: priv.event_name,
            message: JSON.stringify(message)
        }).setMethod('POST').setHandler(function(response) {
            payload = response.getPayload();
            if (payload.error_code) {
                var error_handler = priv.send_error_handler;
                if (error_handler) try {
                    error_handler(payload.error_code, payload.error_msg, recipient, message);
                } finally {
                    fbjs_sandbox.clean_mess();
                }
            } else {
                var success_handler = priv.send_success_handler;
                if (success_handler) try {
                    success_handler(recipient, message);
                } finally {
                    fbjs_sandbox.clean_mess();
                }
            }
        }).setErrorHandler(function(response) {
            var error_handler = priv.send_error_handler;
            if (error_handler) try {
                error_handler(response.getError(), response.getErrorSummary(), recipient, message);
            } finally {
                fbjs_sandbox.clean_mess();
            }
        }).send();
    };
    fbjs_livemessage.prototype.setSendSuccessHandler = function(callback_fn) {
        var priv = fbjs_private.get(this);
        priv.send_success_handler = callback_fn;
        return $FBJS.ref(this);
    };
    fbjs_livemessage.prototype.setSendErrorHandler = function(callback_fn) {
        var priv = fbjs_private.get(this);
        priv.send_error_handler = callback_fn;
        return $FBJS.ref(this);
    };
    fbjs_livemessage.prototype.setShutdownHandler = function(callback_fn) {
        var priv = fbjs_private.get(this);
        priv.livemessage.setShutdownHandler(callback_fn);
        return $FBJS.ref(this);
    };
    fbjs_livemessage.prototype.setRestartHandler = function(callback_fn) {
        var priv = fbjs_private.get(this);
        priv.livemessage.setRestartHandler(callback_fn);
        return $FBJS.ref(this);
    };

    function fbjs_fbml_string(html, js) {
        html = HTML(html);
        if (js) html.setAction(js);
        fbjs_private.get(this).htmlstring = html;
    }
    fbjs_fbml_string.get = function(html) {
        if (html instanceof fbjs_fbml_string) {
            return fbjs_private.get(html).htmlstring.toString();
        } else return htmlspecialchars(fbjs_sandbox.safe_string(html));
    };
    var fbjs_private = {};
    fbjs_private.len = 0;
    fbjs_private.get = function(instance) {
        if (typeof instance != 'object') return null;
        if (instance == window) throw ('Invalid object supplied');
        if (instance.__priv == undefined) {
            var priv = {
                data: {},
                instance: instance
            };
            instance.__priv = fbjs_private.len;
            fbjs_private.len++;
            priv.instance = instance;
            fbjs_private[instance.__priv] = priv;
            return priv.data;
        } else if (typeof instance.__priv == 'number') {
            var priv = fbjs_private[instance.__priv];
            if (priv.instance == instance) {
                return priv.data;
            } else throw ('Invalid object supplied to fbjs_private.get');
        } else throw ('Invalid object supplied to fbjs_private.get');
    };
    fbjs_private.remove = function(instance) {
        if (instance.__priv != undefined) if (fbjs_private[instance.__priv].instance == instance) {
            delete fbjs_private[instance.__priv];
            delete instance.__priv;
        }
    };

    function fbjs_fbml_sanitize(appid) {
        this.appid = appid;
        this.main = window['a' + appid + '_document'];
        return this;
    }
    fbjs_fbml_sanitize.prototype.parseFBML = function(text) {
        if (window.ActiveXObject) {
            var doc = new ActiveXObject("Microsoft.XMLDOM");
            doc.async = "false";
            doc.loadXML(text);
            if (doc.parseError.reason) {
                fbjs_console.error(doc.parseError.reason);
                return null;
            }
        } else {
            var parser = new DOMParser();
            var doc = parser.parseFromString(text, "text/xml");
            if (doc.documentElement.nodeName == 'parsererror') {
                fbjs_console.error(doc.documentElement.textContent);
                return null;
            }
        }
        var x = doc.documentElement;
        return this.processElement(x);
    };
    fbjs_fbml_sanitize.prototype.processElement = function(node) {
        if (node.nodeType == 3) {
            return new fbjs_dom(document.createTextNode(node.nodeValue), this.appid);
        } else if (node.nodeType != 1) return null;
        var domElement = this.main.createElement(node.nodeName);
        if (!domElement) return null;
        for (var x = 0; x < node.attributes.length; x++) {
            var attr = node.attributes[x];
            var aname = attr.nodeName;
            if (aname == 'style') {
                var elems = attr.nodeValue.split(";");
                for (var i = 0; i < elems.length; i++) if (elems[i] != '') {
                    var props = elems[i].split(":");
                    domElement.setStyle(props[0], props[1].replace(/^\s+|\s+$/g, ''));
                }
            } else {
                setter = fbjs_dom.attr_setters[aname];
                if (domElement[setter]) domElement[setter](attr.nodeValue);
            }
        }
        for (var x = 0; x < node.childNodes.length; x++) {
            var child = node.childNodes[x];
            var ch = this.processElement(child);
            if (ch) domElement.appendChild(ch);
        }
        return domElement;
    };
    window.fbjs_helper = {
        disable_element: function(element) {
            delete fbjs_main.allowed_elements[element];
        }
    };
    Array.prototype.pull = function(callback) {
        if (this === window) throw new TypeError();
        if (typeof callback == 'string') return this.map(function(obj) {
            return obj[$FBJS.idx(callback)];
        });
        if (typeof callback == 'function') {
            var args = [].slice.call(arguments, 1);
            return this.map(function(obj) {
                obj._;
                return callback.apply(obj, args);
            });
        }
        throw new TypeError();
    };
    window.fbjs_sandbox = fbjs_sandbox;
    window.fbjs_dom = fbjs_dom;
    window.fbjs_fbml_dom = fbjs_fbml_dom;
    window.fbjs_event = fbjs_event;
    window.fbjs_sandbox = fbjs_sandbox;
    window.fbjs_fbml_string = fbjs_fbml_string;
    Arbiter.inform('fbjs_initialized', null, Arbiter.BEHAVIOR_STATE);
}();

function multifriend_selector(c, b, f, h, g, j, i, a, e) {
    this.num_rows = h;
    this.friend_info = c;
    this.form = ge(b);
    this.max = f;
    this.paginate = ua.ie() < 8;
    this.page = 0;
    this.total_items = 0;
    this.num_per_page = this.num_rows * g;
    this.cur_view = 'all';
    this.num_selected = 0;
    this.selected_ids = {};
    this.num_recommended = 0;
    this.recommended_ids = {};
    this.colored_ids = a || {};
    this.disabled_ids = {};
    this.disabled_reason = null;
    this.last_clicked = null;
    this.cur_network = 0;
    this.cur_network_name = '';
    this.cur_list = 0;
    this.cur_list_name = '';
    this.cur_list_members = {};
    this.notice_id = 'fb_multi_friend_selector_notice';
    this.remove_select_all_network = false;
    this.isPageSelector = e;
    this.set_view(this.cur_view);
    this.update_counters(0);
    if (j) for (var d = 0; d < j.length; ++d) this.select(j[d]);
    if (i) for (var d = 0; d < i.length; ++d) {
        this.num_recommended++;
        this.recommended_ids[i[d]] = true;
    }
    this.force_reset();
}
multifriend_selector.prototype.set_typeahead = function(a) {
    this.fsth = a;
};
multifriend_selector.prototype.set_disabled = function(a) {
    if (a) for (var b = 0; b < a.length; b++) this.disabled_ids[String(a[b])] = true;
};
multifriend_selector.prototype.set_disabled_reason = function(a) {
    this.disabled_reason = a;
};
multifriend_selector.prototype.force_reset = function() {
    this.dirty = true;
    setTimeout(this.reset.bind(this), 0);
};
multifriend_selector.prototype.force_reset_now = function() {
    this.dirty = true;
    this.reset();
};
multifriend_selector.prototype.show_recommended_friends = function() {
    return this.num_recommended && this.cur_view == 'all' && !this.cur_list && !this.search_filter && !this.cur_network;
};
multifriend_selector.prototype.reset = function() {
    if (!this.dirty) return;
    this.filters = [];
    if (this.cur_view == 'unselected') {
        this.filters.push(function(a, b) {
            return !this.selected_ids[a];
        }.bind(this));
    } else if (this.cur_view == 'selected') this.filters.push(function(a, b) {
        return this.selected_ids[a];
    }.bind(this));
    if (this.cur_network) this.filters.push(function(a, b) {
        return b.networks && b.networks[this.cur_network];
    }.bind(this));
    if (this.cur_list) this.filters.push(function(a, b) {
        return this.cur_list_members[a];
    }.bind(this));
    if (this.search_filter) this.filters.push(this.search_filter);
    if (this.show_recommended_friends()) {
        show($('recommended'));
        if (this.paginate) hide($('all_friends_text'));
    } else if (ge('recommended')) hide($('recommended'));
    this.page = 0;
    this.update_boxes();
    this.dirty = false;
};
multifriend_selector.prototype.set_search_filter = function(a) {
    this.search_filter = a;
    this.force_reset();
};
multifriend_selector.prototype.get_matching_friends = function() {
    var a = function(i, j) {
            return i.order - j.order;
        };
    var e = [];
    for (var d in this.friend_info) {
        var h = ('order' in this.friend_info[d]) ? this.friend_info[d].order : d;
        e.push({
            id: d,
            order: h
        });
    }
    e.sort(a);
    var b = [];
    for (var f = 0, g = e.length; f < g; f++) {
        d = '' + e[f].id;
        for (var c = 0; c < this.filters.length; c++) if (!this.filters[c](d, this.friend_info[d])) break;
        if (c == this.filters.length) b.push(d);
    }
    this.total_items = b.length;
    return b;
};
multifriend_selector.prototype.update_boxes = function() {
    var a = this.get_matching_friends();
    var c = [];
    var e = [];
    var f = this.show_recommended_friends();
    var d = f ? this.page - 1 : this.page;
    for (var b = 0; b < a.length; b++) if (f && this.recommended_ids[a[b]] && (!this.paginate || d === -1)) {
        e.push(this.render_friend_box(a[b]));
    } else if (!this.paginate || (b >= this.num_per_page * d && b < this.num_per_page * (d + 1))) c.push(this.render_friend_box(a[b]));
    if (e.length) DOM.setContent($('recommended_friends'), HTML(e.join('')));
    DOM.setContent($('all_friends'), HTML(c.join('')));
    if (this.paginate) DOM.setContent($('mfs_pag_nav_links'), HTML(this.render_paginator()));
    if (this.total_items == 0 && this.cur_view != 'all') if (this.cur_view == 'unselected') {
        this.notice_show("You have no unselected friends.", true);
    } else if (this.cur_view == 'selected') this.notice_show("You have no selected friends.", true);
};
multifriend_selector.prototype.render_friend_box = function(e) {
    var c = this.friend_info[e];
    var d = htmlize(c.name || c.sname);
    if (this.fsth && this.fsth.cur_str) {
        var f = typeahead_source.highlight_found(c.sname, this.fsth.cur_str);
    } else var f = d;
    var a = '';
    var g = 'fs.click(this.parentNode); return false;';
    var b = null;
    if (this.selected_ids[e]) {
        a = 'class="selected"';
    } else if (this.disabled_ids[e]) {
        a = 'class="disabled"';
        g = 'return false;';
        if (this.disabled_reason) b = this.disabled_reason;
    } else if (this.colored_ids[e]) a = 'class="' + this.colored_ids[e] + '"';
    var h = ['<li userid="', e, '" ', a, '>', '<a href="#" title="', d, '" onclick="', g, '">', '<span class="square" style="background-image: url(', c.pic, ');"><span></span></span>', '<strong>', f, '</strong>'];
    if ((this.isPageSelector || f.split(' ').length < 4) && c.pr_net) h.push('<br><span class="network">', c.pr_net, '</span>');
    if (b) h.push('<br><span class="disabled_reason">', b, '</span>');
    h.push('</a></li>');
    return h.join('');
};
multifriend_selector.prototype.render_paginator = function() {
    var c = [];
    var b = parseInt(this.total_items / this.num_per_page + .999, 10);
    if (this.show_recommended_friends()) b++;
    if (this.page > 0) c.push('<li class="pagerpro_li">' + '<a href="#" class="pagerpro_a" onclick="return fs.prev_page();">' + 'Prev' + '</a>' + '</li>');
    for (var a = Math.max(0, this.page - 2); a <= Math.min(b - 1, this.page + 2); a++) {
        c.push('<li class="pagerpro_li');
        c.push(a == this.page ? ' current' : '');
        c.push('">');
        c.push('<a href="#" class="pagerpro_a" onclick="return fs.goto_page(');
        c.push(a);
        c.push(');">');
        c.push(a + 1);
        c.push('</a>');
        c.push('</li>');
    }
    if (this.page < b - 1) {
        c.push('<li class="pagerpro_li">');
        c.push('<a class="pagerpro_a" href="#"');
        c.push(' onclick="return fs.next_page();">Next</a>');
        c.push('</li>');
    }
    return c.join('');
};
multifriend_selector.prototype.goto_page = function(a) {
    this.page = a;
    if (this.page < 0) {
        this.page = 0;
    } else if (this.page * this.num_per_page >= this.total_items) this.page = parseInt(this.total_items / this.num_per_page + .999, 10);
    if (this.show_recommended_friends() && this.page == 0) {
        show($('recommended'));
    } else if (ge('recommended')) hide($('recommended'));
    this.update_boxes();
    return false;
};
multifriend_selector.prototype.prev_page = function() {
    return this.goto_page(this.page - 1);
};
multifriend_selector.prototype.next_page = function() {
    return this.goto_page(this.page + 1);
};
multifriend_selector.prototype.set_view = function(a) {
    this.filter_reset();
    if (ge('view_' + a)) CSS.setClass($('view_' + a), 'view_on');
    CSS.removeClass($('_view_' + this.cur_view), 'Tabset_selected');
    CSS.addClass($('_view_' + a), 'Tabset_selected');
    this.cur_view = a;
    if (this.fsth) this.fsth.reset_search(true);
    this.force_reset();
};
multifriend_selector.prototype.click = function(a) {
    var b = a.getAttribute('userid');
    if (this.cur_view.indexOf('selected') >= 0 && b == this.last_clicked) {
        CSS.setStyle(a, 'opacity', 1);
        window.clearTimeout(fx.timer_id);
    }
    this.last_clicked = b;
    if (!this.selected_ids[b]) {
        if (this.max < 0 || this.num_selected < this.max) {
            CSS.setClass(a, 'selected');
            this.select(b);
            if (this.cur_view == 'unselected') fx.doFadeOut(a, true);
        } else if (this.max >= 0) if (this.max == 1) {
            this.notice_show(_tx("You have already selected 1 person.", {
                maximum: this.max
            }), true);
        } else this.notice_show(_tx("You may only select {maximum} friends.", {
            maximum: this.max
        }), true);
    } else {
        CSS.setClass(a, this.colored_ids[b] || '');
        this.unselect(b);
        this.delete_email_token(b);
        if (this.cur_view == 'selected') fx.doFadeOut(a, true);
    }
    if (this.cur_view == 'selected' && this.num_selected <= 0) this.notice_show("You have no selected friends.", false);
    this.display_limit();
};
multifriend_selector.prototype.select = function(b) {
    var a = document.createElement('input');
    a.setAttribute('fb_protected', 'true');
    a.type = 'hidden';
    if (this.friend_info[b] && this.friend_info[b].is_email) {
        a.name = 'emails[]';
    } else a.name = 'ids[]';
    a.value = b;
    this.form.appendChild(a);
    this.selected_ids[b] = a;
    this.update_counters(1);
};
multifriend_selector.prototype.get_selected = function() {
    var b = [];
    for (var a in this.selected_ids) b.push(parseInt(a, 10));
    return b;
};
multifriend_selector.prototype.unselect = function(a) {
    if (this.selected_ids[a]) {
        this.selected_ids[a].parentNode.removeChild(this.selected_ids[a]);
        delete this.selected_ids[a];
        this.update_counters(-1);
    }
};
multifriend_selector.prototype.update_counters = function(a) {
    this.num_selected += a;
    this.num_unselected -= a;
    DOM.setContent($('view_selected_count'), this.num_selected);
};
multifriend_selector.prototype.display_limit = function() {
    var a = this.max - this.num_selected;
    show('max_limit_notice');
    if (a > 0 && a <= 3) {
        $('max_limit_notice').style.color = '#f60';
        DOM.setContent($('max_limit_notice'), _tx("Only {remaining-friends} more", {
            'remaining-friends': a
        }));
    } else if (this.max >= 0 && a <= 0) {
        $('max_limit_notice').style.color = '#C90000';
        DOM.setContent($('max_limit_notice'), _tx("Limit is {limit}", {
            limit: this.max
        }));
    } else DOM.setContent($('max_limit_notice'), '');
};
multifriend_selector.prototype.view = function(a) {
    this.set_view(a);
    this.notice_hide();
    if (this.cur_network > 0) {
        this.network_filter(this.cur_network, this.cur_network_name);
        return;
    }
    this.force_reset();
};
multifriend_selector.prototype.network_filter = function(b, c) {
    this.set_view('all');
    this.filter_reset();
    this.cur_network = b;
    this.cur_network_name = c;
    if (this.fsth) this.fsth.reset_search(true);
    this.force_reset_now();
    var a = [];
    if (this.max < 0 || this.total_items + this.num_selected <= this.max) if (!this.remove_select_all_network) {
        a.push('<a href="#" onClick="fs.select_all();return false;"');
        a.push(' class="select">' + "Select All" + '</a>');
    }
    a.push('<a href="#" class="hide"');
    a.push(' onClick="fs.network_clear(); return false;"></a> ');
    if (this.total_items == 1) {
        a.push(_tx("You are viewing 1 friend in {network}", {
            network: c
        }));
    } else a.push(_tx("You are viewing {count} friends in {network}", {
        count: this.total_items,
        network: c
    }));
    this.display_filter(a.join(''));
};
multifriend_selector.prototype.display_filter = function(a) {
    show('fs_current_filter');
    DOM.setContent($('fs_current_filter'), HTML(a));
};
multifriend_selector.prototype.filter_reset = function() {
    hide('fs_current_filter');
    DOM.setContent($('fs_current_filter'), '');
    this.cur_network = 0;
    this.cur_network_name = '';
    this.cur_list = 0;
    this.cur_list_name = '';
    this.cur_list_members = {};
    this.force_reset();
};
multifriend_selector.prototype.network_clear = function() {
    this.filter_reset();
    this.view('all');
};
multifriend_selector.prototype.list_filter = function(b, f, e) {
    this.set_view('all');
    this.filter_reset();
    this.cur_list = b;
    this.cur_list_name = f;
    var d = e.length;
    for (var c = 0; c < d; ++c) this.cur_list_members[e[c]] = 1;
    if (this.fsth) this.fsth.reset_search(true);
    this.force_reset_now();
    var a = [];
    if (this.max < 0 || this.total_items + this.num_selected <= this.max) {
        a.push('<a href="#" onClick="fs.select_all();return false;"');
        a.push(' class="select">');
        a.push("Select All");
        a.push('</a>');
    }
    a.push('<a href="#" class="hide"');
    a.push(' onClick="fs.network_clear(); return false;"></a> ');
    if (this.total_items == 1) {
        a.push(_tx("You are viewing 1 friend on {list}", {
            list: htmlize(f)
        }));
    } else a.push(_tx("You are viewing {count} friends from {list}", {
        count: this.total_items,
        list: htmlize(f)
    }));
    this.display_filter(a.join(''));
};
multifriend_selector.prototype.select_all = function() {
    var a = this.get_matching_friends();
    if (a.length <= this.max) for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if (!this.selected_ids[c] && !this.disabled_ids[c]) this.select(c);
    }
    this.update_boxes();
};
multifriend_selector.prototype.unselect_all = function() {
    var a = this.get_matching_friends();
    if (a.length <= this.max) for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if (this.selected_ids[c]) this.unselect(c);
    }
    this.update_boxes();
};
multifriend_selector.prototype.notice_show = function(c, a) {
    DOM.setContent($(this.notice_id), c);
    show(this.notice_id);
    CSS.setStyle(ge(this.notice_id), 'opacity', 1);
    if (a == true) var b = setTimeout(function() {
        fx.doFadeOut('fb_multi_friend_selector_notice', false);
    }, 2500);
};
multifriend_selector.prototype.notice_hide = function() {
    hide(this.notice_id);
};
multifriend_selector.prototype.skip = function(e) {
    var a = new URI(Form.getAttribute(this.form, 'action'));
    var d = a.getQueryData();
    var b = a.setQueryData({}).toString();
    var c = $N('form', {
        action: b,
        method: 'GET',
        target: e
    });
    DOM.getRootElement().appendChild(c);
    Form.createHiddenInputs(d, c);
    c.submit();
};
multifriend_selector.prototype.show_force_invite_dialog = function(a, c) {
    this.dialog = new Dialog().setStackable(true).setShowLoading(true);
    var b;
    if (c) {
        b = "Leave Application";
    } else b = "Remove Application";
    this.onResponse = function(d) {
        var f = d.getPayload();
        if (f.status) {
            var e = this.dialog;
            this.dialog.setTitle(f.dialog_title).setBody(f.dialog_contents).setButtons([Dialog.newButton('mfs-button', b, '', function() {
                this.onResponsePost = function(g) {
                    var h = g.getPayload();
                    e.setTitle(h.dialog_title).setBody(h.dialog_contents).setButtons([Dialog.OK]).clearHandler().show();
                    if (h.status) goURI('/home.php');
                };
                new AsyncRequest().setURI('/fbml/ajax/force_invite.php').setData({
                    app_id: a,
                    remove: 1
                }).setHandler(bind(this, 'onResponsePost')).send();
            }), Dialog.newButton('continue', "Continue Anyway", '', function() {
                new AsyncRequest().setURI('/fbml/ajax/force_invite.php').setData({
                    app_id: a,
                    'continue': 1
                }).setHandler(bagofholding).send();
                if (Dialog.getCurrent()) Dialog.getCurrent().hide();
            })]).show();
        } else this.dialog.setTitle(f.dialog_title).setBody(f.dialog_contents).setButtons([Dialog.OK]).show();
    };
    new AsyncRequest().setURI('/fbml/ajax/force_invite.php').setData({
        app_id: a
    }).setHandler(bind(this, 'onResponse')).send();
    return false;
};
multifriend_selector.prototype.filter_menu_open = function() {
    setTimeout(function() {
        $('friends').style.overflow = 'hidden';
    }.bind(this), 1);
};
multifriend_selector.prototype.filter_menu_close = function() {
    $('friends').style.overflow = 'auto';
};
multifriend_selector.prototype.setRemoveSelectAllNetwork = function(a) {
    this.remove_select_all_network = a;
};

function multifriend_selector_typeahead(e, c, a) {
    this.cur_str = '';
    this.clear_div = null;
    this.focused = false;
    this.obj = e;
    this.obj.typeahead = this;
    this.items = c;
    this.fs = a;
    this.fs.set_typeahead(this);
    this.placeholder = this.obj.getAttribute('placeholder');
    Event.listen(this.obj, 'focus', this._onfocus.bind(this));
    Event.listen(this.obj, 'blur', this._onblur.bind(this));
    Event.listen(this.obj, 'keyup', function(event) {
        var g = event ? event : window.event;
        var h = g ? g.keyCode : -1;
        setTimeout(function() {
            return this._onkeyup(h);
        }.bind(this), 0);
    }.bind(this));
    this.capture_submit();
    this.first_letter_index = {};
    for (var b in c) {
        var d = typeahead_source.tokenize(c[b].name);
        for (var f = 0; f < d.length; f++) {
            if (!this.first_letter_index[d[f][0]]) this.first_letter_index[d[f][0]] = {};
            this.first_letter_index[d[f][0]][b] = true;
        }
    }
}
multifriend_selector_typeahead.prototype = {
    _onfocus: function(a) {
        if (this.obj.value == this.placeholder) this.obj.value = '';
        this.focused = true;
        this.capture_submit();
        if (this.fs && this.fs.cur_view != 'all') this.fs.view('all');
    },
    _onblur: function(a) {
        this.focused = false;
        if (this.cur_str == '') {
            this.hide_clear();
            this.obj.value = this.placeholder;
        }
    },
    _onkeyup: function(a) {
        switch (a) {
        case 27:
            return false;
            break;
        case undefined:
        case 37:
        case 38:
        case 39:
        case 40:
            return false;
            break;
        case 13:
            this.select();
            break;
        case 8:
        case 0:
        default:
            if (this.search()) {
                this.reset_search(false, false);
            } else if (this.obj.value && this.fs) this.fs.filter_reset();
            break;
        }
    },
    capture_submit: function() {
        if ((!this.captured_form || this.captured_substitute != this.captured_form.onsubmit) && this.obj.form) {
            this.captured_form = this.obj.form;
            this.captured_event = this.obj.form.onsubmit;
            this.captured_substitute = this.obj.form.onsubmit = function() {
                return false;
            }.bind(this.obj.form);
        }
    },
    reset_search: function(a, c) {
        if (this.obj) {
            var d = Input.getValue(this.obj);
            if (!d || a) {
                this.cur_str = '';
                if (d) {
                    Input.reset(this.obj);
                    this._onblur();
                }
            }
        }
        if (c == true) {
            var b = fx.timer_delay * 10;
            window.setTimeout("fsth.show_all()", b);
        } else this.show_all();
    },
    show_all: function() {
        this.fs.set_search_filter(null);
    },
    search: function() {
        var b = typeahead_source.flatten_string(this.obj.value);
        if (b == this.cur_str) return false;
        this.cur_str = b;
        var c = typeahead_source.tokenize(b).sort(typeahead_source._sort);
        if (!c[0]) return true;
        var a = this.first_letter_index[c[0][0]];
        this.show_clear();
        this.fs.set_search_filter(function(d, e) {
            if (a != null) {
                return a[d] && typeahead_source.check_match(c, e.name);
            } else return null;
        });
        return false;
    },
    show_clear: function() {
        if (this.clear_div == null) {
            this.clear_div = document.createElement('div');
            this.clear_div.setAttribute('id', 'clear_finder');
            DOM.setContent(this.clear_div, HTML('<a href="#" onClick="fsth.reset_search(true);return false;" class="hide"></a>'));
            $('finder_friend_typeahead').appendChild(this.clear_div);
        }
    },
    hide_clear: function() {
        var a = ge('clear_finder');
        if (a) {
            this.clear_div = null;
            a.parentNode.removeChild(a);
        }
    },
    select: function() {
        if (this.obj.value != '' && this.obj.value != this.placeholder && this.fs.total_items == 1) if (this.fs.click($('friends').firstChild)) {
            this.obj.value = '';
            this.reset_search(true, this.fs.cur_view != 'all');
        }
    }
};

function condensed_multifriend_selector(b, a, c, e, d) {
    this.parent.construct(this, b, a, c, 0, []);
    this.paginate = false;
    this.unselected_rows = e;
    this.selected_rows = d;
}
Class.extend(condensed_multifriend_selector, 'multifriend_selector');
condensed_multifriend_selector.prototype.set_typeahead = function(c) {
    this.parent.set_typeahead(c);
    this.unselected_list = c.obj.parentNode.nextSibling;
    if (this.selected_rows == 0) {
        this.onebox = true;
    } else {
        this.selected_list = this.unselected_list.nextSibling;
        this.onebox = false;
    }
    this.total_items = 0;
    for (var b = 0; b < this.unselected_list.childNodes.length; b++) {
        var a = this.unselected_list.childNodes[b];
        a.cb = a.firstChild;
        a.cb.checked = false;
        a.name_span = a.lastChild;
        a.onclick = function() {
            this.parentNode.parentNode.cmfs.toggle(this.cb.value);
        };
        this.friend_info[a.cb.value].unselected = a;
        this.total_items++;
    }
    if (!this.onebox) {
        for (var b = 0; b < this.selected_list.childNodes.length; b++) {
            var a = this.selected_list.childNodes[b];
            a.cb = a.firstChild;
            a.cb.checked = false;
            a.name_span = a.lastChild;
            a.onclick = function() {
                this.parentNode.parentNode.cmfs.toggle(this.cb.value);
            };
            this.friend_info[a.cb.value].selected = a;
            this.total_items++;
        }
        this.nobody = document.createElement('div');
        CSS.setClass(this.nobody, 'nobody_selected');
        DOM.setContent(this.nobody, "You haven't selected anyone.");
        this.selected_list.appendChild(this.nobody);
    }
    this.container = c.obj.parentNode.parentNode;
    this.container.cmfs = this;
    this.toomany = document.createElement('div');
    CSS.setClass(this.toomany, 'toomany_selected');
    if (this.max == 1) {
        DOM.setContent(this.toomany, _tx("You may only select 1 friend.", {
            maximum: this.max
        }));
    } else DOM.setContent(this.toomany, _tx("You have already selected {maximum} people.", {
        maximum: this.max
    }));
    this.container.appendChild(this.toomany);
    hide(this.toomany);
    this.check_sizes();
    window.setInterval(this.check_sizes.bind(this), 100);
    this.container.style.visibility = 'visible';
    this.force_reset();
};
condensed_multifriend_selector.prototype.check_sizes = function() {
    if (this.container.offsetWidth == this.container_width) return;
    this.container_width = this.container.offsetWidth;
    var a = this.unselected_list.firstChild;
    var b = a && a.offsetHeight ? a.offsetHeight : 19;
    this.unselected_list.style.height = b * this.unselected_rows + 'px';
    if (!this.onebox) {
        var d = 15;
        this.selected_list.style.height = d * this.selected_rows + 'px';
    }
    if (ua.safari() < 500) {
        var c = 0;
    } else var c = 6;
    this.fsth.obj.style.width = Math.max((this.container.offsetWidth - c - 2), 0) + 'px';
    show(this.toomany);
    this.toomany.style.top = parseInt(this.unselected_list.offsetTop + (this.unselected_list.offsetHeight - this.toomany.offsetHeight) / 2, 10) + 'px';
    hide(this.toomany);
};
condensed_multifriend_selector.prototype.check_match = function(c, a) {
    for (var b = 0; b < this.filters.length; b++) if (!this.filters[b](c, a)) return false;
    return true;
};
condensed_multifriend_selector.prototype.update_match = function(a) {
    this.total_items++;
    if (this.fsth && this.fsth.cur_str) {
        var b = typeahead_source.highlight_found(a.name, this.fsth.cur_str);
    } else var b = htmlize(a.name);
    DOM.setContent(a.unselected.name_span, HTML(b));
    this.show(a.unselected);
};
condensed_multifriend_selector.prototype.update_boxes = function() {
    if (typeof this.onebox == 'undefined') return;
    this.total_items = 0;
    this.last_showing = null;
    for (var b in this.friend_info) {
        var a = this.friend_info[b];
        if (a.checked && !this.onebox) continue;
        if (this.check_match(b, a)) {
            this.update_match(a);
        } else hide(a.unselected);
    }
};
condensed_multifriend_selector.prototype.show = function(a) {
    show(a);
    this.last_showing = a;
};
condensed_multifriend_selector.prototype.toggle = function(b) {
    var a = this.friend_info[b];
    if (this.onebox) {
        if (!a.checked && !a.unselected.cb.checked || a.checked && a.unselected.cb.checked) return;
    } else {
        if (!a.checked && !a.unselected.cb.checked) return;
        if (ua.firefox() && a.checked && a.selected.cb.checked) return;
    }
    a.checked = !a.checked;
    if (a.checked) {
        if (this.num_selected == this.max) {
            show(this.toomany);
            CSS.setStyle(this.toomany, 'opacity', 1);
            setTimeout(function() {
                fx.doFadeOut(this.toomany, false);
            }.bind(this), 2500);
            a.checked = false;
            a.unselected.cb.checked = false;
            return false;
        }
        this.num_selected++;
    } else this.num_selected--;
    if (this.onebox) {
        CSS.toggleClass(a.unselected, 'selected');
    } else if (a.checked) {
        this.total_items--;
        hide(this.nobody);
        hide(a.unselected);
        a.unselected.cb.checked = false;
        a.selected.cb.checked = true;
        show(a.selected);
    } else {
        if (!this.num_selected) show(this.nobody);
        hide(a.selected);
        if (!ua.opera() && !(ua.safari() >= 500)) a.selected.cb.checked = false;
        if (this.check_match(b, a)) this.update_match(a);
    }
};
condensed_multifriend_selector.prototype.filter_reset = function() {};
condensed_multifriend_selector.prototype.set_view = function() {};
condensed_multifriend_selector.prototype.update_counters = function() {};

function condensed_mfs_typeahead(c, b, a) {
    this.parent.construct(this, c, b, a);
    this.clear_div = document.createElement('div');
    CSS.setClass(this.clear_div, 'hide');
    this.clear_div.onclick = function() {
        this.reset_search(true, false);
        return false;
    }.bind(this);
    hide(this.clear_div);
    this.obj.parentNode.insertBefore(this.clear_div, this.obj);
}
Class.extend(condensed_mfs_typeahead, 'multifriend_selector_typeahead');
condensed_mfs_typeahead.prototype.show_clear = function() {
    show(this.clear_div);
};
condensed_mfs_typeahead.prototype.hide_clear = function() {
    hide(this.clear_div);
};
condensed_mfs_typeahead.prototype.select = function() {
    if (this.fs.total_items == 1 && !this.disabled_ids[this.fs.last_showing.cb.value]) {
        this.fs.last_showing.cb.click();
        this.obj.value = '';
        this.reset_search(true, false);
    }
};
multifriend_selector.prototype.addEmailTokenHandler = function(a) {
    if (a.i) {
        uid = a.i;
        if (!this.selected_ids[uid]) if (this.num_selected < this.max) {
            click_li = DOM.scry($('friends'), 'li[userid="' + uid + '"]');
            if (click_li.length == 1) {
                fs.click(click_li[0]);
            } else {
                this.select(uid);
                if (this.friend_info[uid]) this.set_view('selected');
                this.display_limit();
            }
        } else {
            this.notice_show(_tx("You may only select {maximum} friends.", {
                maximum: this.max
            }), true);
            this.delete_email_token(uid);
        }
    }
};
multifriend_selector.prototype.removeEmailTokenHandler = function(a) {
    if (a.i) {
        uid = a.i;
        if (this.selected_ids[uid]) {
            click_li = DOM.scry($('friends'), 'li[userid="' + uid + '"]');
            if (click_li.length == 1) {
                fs.click(click_li[0]);
            } else this.unselect(uid);
        }
    }
};
multifriend_selector.prototype.delete_email_token = function(b) {
    email_sections = DOM.scry($('fb_multi_friend_selector_wrapper'), '#email_section_id');
    if (email_sections.length > 0) {
        friend_inputs = DOM.scry(email_sections[0], 'input[value="' + b + '"]');
        for (var a = 0; a < friend_inputs.length; a++) {
            delete_token = friend_inputs[a].parentNode.parentNode.parentNode.parentNode.parentNode;
            if (delete_token) DOM.remove(delete_token);
        }
    }
};
var fx = {
    timer_id: '',
    timer_delay: 25,
    timer_clearout: false,
    delta: .1,
    doFadeIn: function(a) {
        if (ua.ie() < 8) {
            this.timer_delay = 0;
            this.delta = .5;
        }
        if (this.timer_clearout && this.timer_id) window.clearTimeout(this.timer_id);
        CSS.setStyle(ge(a), 'opacity', 0);
        $(a).style.visibility = "visible";
        this.fadeIn(a, 0);
    },
    fadeIn: function(a, b) {
        obj = ge(a);
        if (b <= 1) {
            CSS.setStyle(obj, 'opacity', b);
            b += this.delta;
            this.timer_id = setTimeout(function() {
                fx.fadeIn(a, b);
            }, this.timer_delay);
        }
    },
    doFadeOut: function(a, b) {
        if (ua.ie() < 8) {
            this.timer_delay = 0;
            this.delta = .5;
        }
        if (this.timer_clearout && this.timer_id) window.clearTimeout(this.timer_id);
        CSS.setStyle(ge(a), 'opacity', 1);
        $(a).style.visibility = "visible";
        this.fadeOut(a, 1, b);
    },
    fadeOut: function(a, b, c) {
        obj = ge(a);
        if (b >= 0) {
            CSS.setStyle(obj, 'opacity', b);
            b -= this.delta;
            this.timer_id = setTimeout(function() {
                fx.fadeOut(a, b, c);
            }, this.timer_delay);
        } else if (window.fs && fs.paginate && a != fs.notice_id) {
            fs.update_boxes();
        } else if (c) {
            obj.parentNode.removeChild(obj);
        } else obj.style.display = 'none';
    }
};
var details_shown = false;

function toggle_stored_cc(a) {
    if (a.checked == true) {
        show('csc_div');
        hide_new_cc();
    } else {
        hide('csc_div');
        show_new_cc();
    }
}
function hide_cc_payment() {
    hide('card_payment');
    hide('csc_div');
    hide_new_cc();
    var a = ge('cc_id');
    if (a) a.checked = false;
}
function show_cc_payment() {
    show('card_payment');
}
function hide_new_cc() {
    hide('cc_input');
    hide('enter_new_card');
}
function show_new_cc() {
    show('cc_input');
    show('enter_new_card');
    if (details_shown) toggleStoredCreditCardDetails();
}
function toggleStoredCreditCardDetails() {
    var a = ge('toggle_stored_credit_card_details_link');
    if (!details_shown) {
        show('stored_credit_card_details');
        a.innerHTML = "hide details";
        details_shown = true;
    } else {
        hide('stored_credit_card_details');
        a.innerHTML = "show details";
        details_shown = false;
    }
}
function show_csc_info(b) {
    var c = "A Card Security Code (CSC) is a security feature of debit and credit cards that helps fight credit card fraud.  The following graphic illustrates where to find the CSC code on your credit card.";
    var d = 'float: left;';
    var g = 'text-align: center; margin: 5px 0;';
    var a = '';
    a += '<div style="' + d + '">';
    a += '<img src="/images/cvv2_types/amex_csc.gif" alt="" />';
    a += '<p style="' + g + '">' + "American Express" + '</p>';
    a += '</div>';
    var f = '';
    f += '<div style="margin-right: 8px;' + d + '">';
    f += '<img src="/images/cvv2_types/backofcard.gif" alt="" />';
    f += '<p style="' + g + '">' + "Visa, Mastercard, JCB" + '</p>';
    f += '</div>';
    var e = '';
    e += '<div class="clearfix">';
    e += '<p>' + c + '</p>';
    if (b == null) {
        e += f;
        e += a;
    } else if (b == 65) {
        e += a;
    } else e += f;
    e += '</div>';
    new Dialog().setClassName('csc_type').setTitle("What's a CSC?").setBody(e).setButtons([Dialog.OK]).show();
}
function show_csc_validation_info() {
    var a = '';
    a += '<div class="clearfix">';
    a += '<div style="float: left">';
    a += '<p style="text-align: left; margin: 5px 0;">';
    a += "In order to fight credit card fraud, we have started to enforce CSC code validation in credit card payments.  For credit cards we have stored before, this means they will need to be CSC validated once for later uses.  You will not be prompted in the future once the card gets validated.";
    a += '</p>';
    a += '</div>';
    a += '</div>';
    new Dialog().setClassName('validation').setTitle("Why is CSC validation required?").setBody(a).setButtons([Dialog.OK]).show();
}
function get_selected_cc_type(a, b) {
    if (b) {
        cc_type = Form.getSelectValue(get_dialog_pro_elem(a));
    } else cc_type = Form.getSelectValue(ge(a));
    return cc_type;
}
function validate_csc(a, d) {
    if (d) {
        var c = get_dialog_pro_elem('cc_csc');
    } else var c = ge('cc_csc');
    var b = get_selected_cc_type(a, d);
    if (b == 65) {
        if (c.value.length != 4) {
            c.style.border = "1px solid red;";
        } else c.style.border = "";
    } else if (c.value.length != 3) {
        c.style.border = "1px solid red;";
    } else c.style.border = "";
}
function get_dialog_pro_elem(c) {
    var b = document.getElementsByName(c);
    var d;
    var e = null;
    for (d = 0; d < b.length; d++) {
        var a = b[d];
        if (DOM.contains('pop_content', a)) e = a;
    }
    return e;
}
var PlatformInvite = new function() {
        this._getRequestData = function(l, a, m, f, k, h, j, g, o, n) {
            var i = '';
            if (!k) i = ge('message') ? $('message').value : '';
            if (j) {
                var d = [];
                d.push(j);
            } else {
                var e = this._getSelectedIdsAndEmails(l);
                var d = e[0];
                var c = e[1];
            }
            var b = {
                app_id: a,
                to_ids: o ? o : d,
                to_emails: n ? n : c,
                request_type: m,
                invite: f,
                content: l.getAttribute('content'),
                preview: k,
                is_multi: h,
                is_in_canvas: g,
                form_id: l.id,
                prefill: (j > 0),
                message: i,
                donot_send: ge('donotsend') ? $('donotsend').checked : false
            };
            return b;
        };
        this._getSelectedIdsAndEmails = function(e) {
            var d = e.getElementsByTagName('input');
            var c = [];
            var a = [];
            for (var b = 0; b < d.length; b++) if (d[b].getAttribute('fb_protected') == 'true' && (d[b].name == 'ids[]' || d[b].name == 'friend_selector_id') && (d[b].type != 'checkbox' || d[b].checked)) {
                c.push(d[b].value);
            } else if (d[b].getAttribute('fb_protected') == 'true' && d[b].name == 'emails[]') a.push(d[b].value);
            return [c, a];
        };
        this.sendInvitation = function(i, h, d, f, e) {
            var g = $(e.request_form);
            var b = this._getRequestData(g, e.app_id, e.request_type, e.invite, f, e.is_multi, e.prefill, e.is_in_canvas, i, h);
            if (d) b.message = d;
            b.include_ci = Boolean(e.include_ci);
            var a = new AsyncRequest().setURI('/fbml/ajax/prompt_send.php').setData(b);
            if (f) {
                new Dialog().setClassName('req_dialog').setAsync(a).setModal(true).show();
            } else {
                var c = function(n) {
                        var k = n.payload.email_converted_values;
                        if (k) {
                            var j = n.payload.email_attribute_name;
                            for (var l = 0; l < k.length; ++l) {
                                var m = $N('input', {
                                    type: 'hidden',
                                    name: j,
                                    value: k[l]
                                });
                                m.setAttribute('fb_protected', 'true');
                                g.appendChild(m);
                            }
                        }
                        if (window.fbjs_dom) {
                            fbjs_dom.submitNamespacedForm(g);
                        } else g.submit();
                    };
                a.setHandler(c);
                new Dialog().setAsync(a);
            }
            return false;
        };
        this.runPlatformCI = function(j, i, d, g, f) {
            var h = $(f.request_form);
            var c = this._getSelectedIdsAndEmails(h);
            var e = f.prefill ? 1 : c[0].length;
            var b = {
                message: d,
                form_id: f.request_form,
                app_id: f.app_id,
                request_type: f.request_type,
                invite: f.invite,
                is_in_canvas: f.is_in_canvas,
                is_multi: f.is_multi,
                prefill: f.prefill,
                num_invites_sent: e
            };
            var a = new AsyncRequest().setURI('/fbml/ajax/ci_login_render.php').setData(b);
            new Dialog().setModal(true).setAsync(a).show();
        };
    }();
