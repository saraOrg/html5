+(function($) {
    var xhr = new XMLHttpRequest();
    /**
     * 执行上传
     * @param {type} self       文件域对象
     * @param {type} options    上传参数对象
     * @returns {undefined}
     */
    function uploadFile(self, options) {
        var fd = new FormData();
        fd.append(self.id, document.getElementById(self.id).files[0]);
        xhr.upload.addEventListener("progress", function(evt) {
            if ($.isFunction(options.onUploadProgress)) {
                options.onUploadProgress(evt);
            } else {
                uploadProgress(self, evt);
            }
        }, false);
        //上传成功
        xhr.addEventListener("load", function(evt) {
            if ($.isFunction(options.onUploadComplete)) {
                options.onUploadComplete(evt);
            } else {
                alert(evt.target.responseText);
            }
        }, false);
        //上传出错
        xhr.addEventListener("error", function(evt) {
            if ($.isFunction(options.onUploadFailed)) {
                options.onUploadFailed(evt);
            } else {
                console.dir(evt);
            }
        }, false);
        //上传终止【一般不会，可能是异常导致】
        xhr.addEventListener("abort", function(evt) {
            if ($.isFunction(options.onUploadCanceled)) {
                options.onUploadCanceled(evt);
            } else {
                console.dir(evt);
            }
        }, false);
        xhr.open("POST", options.url);
        xhr.send(fd);
    }

    /**
     * 取消上传
     * @returns {undefined}
     */
    function cancel() {
        xhr.abort();
    }

    /**
     * 默认显示上传进度的操作
     * @param {type} self   文件域对象
     * @param {type} evt    上传队列对象
     * @returns {undefined}
     */
    function uploadProgress(self, evt) {
        var processBar = ''
        if (!$('#default_process_bar').size()) {
            processBar = $('<div id="default_process_bar"></div>');
            $(self).after(processBar);
        } else {
            processBar = $('#default_process_bar');
        }
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            processBar[0].innerHTML = percentComplete.toString() + '%';
        }
        else {
            processBar[0].innerHTML = 'unable to compute';
        }
    }
    $.fn.extend({
        upload: function(options) {
            var defaults = {
                id: '',
                url: "",
                onUploadComplete: '',
                onUploadFailed: '',
                onUploadCancel: ''
            },
            self = this[0];
            if ('string' === $.type(options)) {
                options = {"url": options};
            }
            options = $.extend(defaults, options);
            $(this).on('change', function() {
                uploadFile(self, options);
            });
            return $(this);
        },
        cancel: function() {
            cancel();
        }
    });
})(jQuery);