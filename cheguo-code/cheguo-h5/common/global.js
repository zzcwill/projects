var common, newCommon;
common = (function() {
    var a;
    a = function(args) {
        return console.log("");
    };
    a.Ajax = function(opt) {
        if (opt != null ? opt.url : void 0) {
            a.dialog('show', {
                icon: 'loading',
                text: '正在加载中...'
            });
            return $.ajax({
                url: "/" + 'api/'+opt.url,
                //url: "/" + opt.url,
                type: opt.type || "POST",
                timeout: 6000000,
                dataType: opt.dataType || "json",
                async: opt.async || false,
                data: opt.data || {},
                headers: {
                    "Auth-Id": a.getArgs()['Auth-Id']
                },
                success: function(data, textStatus, jqXHR) {
                    if (typeof data === "string") {
                        data = JSON.parse(data);
                    }
                    if (typeof opt.success === "function") {
                        opt.success(data.data, data);
                    }
                    return a.delay(function() {
                        return a.dialog('hide');
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    a.dialog('show', {
                        icon: 'fail',
                        text: '请求错误！'
                    });
                    return a.delay(function() {
                        return a.dialog('hide');
                    });
                }
            });
        }
    };
    a.compile = function(obj) {
        return this.replace(/{([\w \d]+)}/g, function(k0, k1) {
            return (obj != null ? obj[k1.trim()] : void 0) || "";
        });
    };
    a.delay = function(callback, t) {
        return setTimeout(callback, t || 500);
    };
    a.dialog = function(method, callback, argu) {
        var $page, $toast, o, ref, ref1;
        $toast = $("#toast");
        $page = $("#page");
        o = {
            toastTpl: '<div id="toast" class="am-toast"><div class="am-toast-text"><span am-mode="toast-{icon}" class="am-toast-icon am-icon"> </span>{text}</div></div>'
        };
        o.show = function(obj) {
            $page.css('overflow', 'hidden');
            if (this.length === 0) {
                if (obj) {
                    o.toastTpl = a.compile.call(o.toastTpl, obj);
                }
                return $page.append(o.toastTpl);
            } else {
                this.removeClass("fn-hide");
                if (obj) {
                    return this.find(".am-toast-text").html(a.compile.call('<span am-mode="toast-{icon}" class="am-toast-icon am-icon"> </span>{text}', obj));
                }
            }
        };
        o.hide = function() {
            $page.css('overflow', 'auto');
            if (this.length > 0) {
                return this.addClass("fn-hide");
            }
        };
        if (typeof callback === 'function') {
            if ((ref = o[method]) != null) {
                ref.call($toast, argu);
            }
        } else {
            if ((ref1 = o[method]) != null) {
                ref1.call($toast, callback);
            }
        }
        return typeof callback === "function" ? callback($toast) : void 0;
    };
    a.getArgs = function() {
        var args, i, item, items, name, qs, value;
        qs = (location.search.length > 0 ? location.search.substring(1) : "");
        items = (qs.length ? qs.split("&") : []);
        args = {};
        i = 0;
        while (i < items.length) {
            item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                args[name] = value;
            }
            i++;
        }
        return args;
    };
    return a;
})();
newCommon = (function() {
    var a;
    a = function(args) {
        return console.log("");
    };
    a.Ajax = function(opt) {
        if (opt != null ? opt.url : void 0) {
            a.dialog('show', {
                icon: 'loading',
                text: '正在加载中...'
            });
            return $.ajax({
                url: "/" + 'api/'+opt.url,
                //url: "/" +opt.url,
                type: opt.type || "POST",
                timeout: 6000000,
                dataType: opt.dataType || "json",
                async: opt.async || true,
                data: opt.data || {},
                headers: {
                    "Auth-Id": a.getArgs()['Auth-Id']
                },
                success: function(data, textStatus, jqXHR) {
                    if (typeof data === "string") {
                        data = JSON.parse(data);
                    }
                    if (typeof opt.success === "function") {
                        opt.success(data, data);
                    }
                    return a.delay(function() {
                        return a.dialog('hide');
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    a.dialog('show', {
                        icon: 'fail',
                        text: '请求错误！'
                    });
                    return a.delay(function() {
                        return a.dialog('hide');
                    });
                }
            });
        }
    };
    a.compile = function(obj) {
        return this.replace(/{([\w \d]+)}/g, function(k0, k1) {
            return (obj != null ? obj[k1.trim()] : void 0) || "";
        });
    };
    a.delay = function(callback, t) {
        return setTimeout(callback, t || 500);
    };
    a.dialog = function(method, callback, argu) {
        var $page, $toast, o, ref, ref1;
        $toast = $("#toast");
        $page = $("#page");
        o = {
            toastTpl: '<div id="toast" class="am-toast"><div class="am-toast-text"><span am-mode="toast-{icon}" class="am-toast-icon am-icon"> </span>{text}</div></div>'
        };
        o.show = function(obj) {
            $page.css('overflow', 'hidden');
            if (this.length === 0) {
                if (obj) {
                    o.toastTpl = a.compile.call(o.toastTpl, obj);
                }
                return $page.append(o.toastTpl);
            } else {
                this.removeClass("fn-hide");
                if (obj) {
                    return this.find(".am-toast-text").html(a.compile.call('<span am-mode="toast-{icon}" class="am-toast-icon am-icon"> </span>{text}', obj));
                }
            }
        };
        o.hide = function() {
            $page.css('overflow', 'auto');
            if (this.length > 0) {
                return this.addClass("fn-hide");
            }
        };
        if (typeof callback === 'function') {
            if ((ref = o[method]) != null) {
                ref.call($toast, argu);
            }
        } else {
            if ((ref1 = o[method]) != null) {
                ref1.call($toast, callback);
            }
        }
        return typeof callback === "function" ? callback($toast) : void 0;
    };
    a.getArgs = function() {
        var args, i, item, items, name, qs, value;
        qs = (location.search.length > 0 ? location.search.substring(1) : "");
        items = (qs.length ? qs.split("&") : []);
        args = {};
        i = 0;
        while (i < items.length) {
            item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                args[name] = value;
            }
            i++;
        }
        return args;
    };
    return a;
})();

$.fn.nameValues = function() {
    var arg;
    arg = arguments[0];
    return $(this).find("[data-name]").each(function(index, item) {
        var key, keySwitch, value;
        key = $(this).data("name");
        keySwitch = $(this).data("formatter");
        if (keySwitch) {
            value = window[keySwitch](arg[key]) || "";
        }
        if (key) {
            return $(item).html(value || (arg[key] !== undefined ? arg[key] : "")); //arg[key] !== undefined 产品需要把0 也显示；
        }
    });
};

$(function() {
    common.delay(function() {
        return common.dialog('hide');
    });
    return $(".am-header-left").click(function() {
        return location.href = history.go(-1);
    });
});
