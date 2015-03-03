/**
 * 基于html5本地存储的jQuery草稿保存插件
 * @author yangbai
 */

/**
 * 
 * @param {type} $      jQuery对象
 * @param {type} domain 命名空间
 * @returns {undefined}
 */
;
(function($, domain) {
    var storage = null;
    if (!window.localStorage) {
        alert('浏览器不支持本地存储');
        return false;
    }
    storage = window.localStorage;
    $.fn.extend({
        filter: function(type) {
            this.filterTypes = ['hidden', 'password', 'submit', 'button', 'radio'];
            if (this.filterTypes.indexOf(type) !== 1) {
                return true;
            }
            return false;
        },
        save: function(options) {
            options = options || {};
            !!options.filterTypes && (this.filterTypes = this.filterTypes.push(options.filterTypes));
            var _this = this[0];
                len = _this.length;
            if (!storage) {
                return false;
            }
            for (var i = 0; i < len; i++) {
                if (this.filter(_this[i].type)) {
                    if (_this[i].type === 'checkbox' && _this[i].checked === true) {
                        storage.setItem(domain + '_' + _this[i].name, 'checked');
                        continue;
                    }
                    !!_this[i].name && storage.setItem(domain + '_' + _this[i].name, _this[i].value);
                }
            }
        },
        recovery: function() {
            var _this = this[0];
                len = _this.length;
            if (!storage) {
                return false;
            }
            for (var i = 0; i < len; i++) {
                if (this.filter(_this[i].type)) {
                    if (_this[i].type === 'checkbox' && storage.getItem(domain + '_' + _this[i].name) === 'checked') {
                        _this[i].checked = true;
                        continue;
                    }
                    !!_this[i].name && (_this[i].value = storage.getItem(domain + '_' + _this[i].name));
                }
            }
        }
    });
})(jQuery, 'yangbai6644.com');