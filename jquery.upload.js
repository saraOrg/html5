+(function($, domain) {
    var xhr = new XMLHttpRequest();
    /**
     * 执行上传
     * @param {type} self       文件域对象
     * @param {type} options    上传参数对象
     * @returns {undefined}
     */
    function uploadFile(self, options) {
        var fd = new FormData();
        if (!/image/.test(self.files[0].type)) {
            fd.append('is_base64', 0);
            fd.append(self.id, document.getElementById(self.id).files[0]);
        }
        xhr.upload.addEventListener("progress", function(evt) {
            if ($.isFunction(options.onUploadProgress)) {
                options.onUploadProgress(evt.lengthComputable, evt.loaded, evt.total);
            } else {
                uploadProgress(self, evt);
            }
        }, false);
        //上传完成
        xhr.addEventListener("load", function(evt) {
            if ($.isFunction(options.onUploadComplete)) {
                options.onUploadComplete(evt);
            } else {
                //alert(evt.target.responseText);
                if ($('#default_process_bar').size()) {
                    setTimeout(function() {
                        $('#default_process_bar').hide();
                        self.value = '';
                    }, options.successTimeout * 1000);
                }
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
            if ($.isFunction(options.onUploadCancel)) {
                options.onUploadCancel(evt);
            } else {
                console.dir(evt);
            }
        }, false);
        if (/image/.test(self.files[0].type)) {
            compressUpload(self.files[0], options.url);
        } else {
            xhr.open("POST", options.url);
            xhr.send(fd);
        }
    }

    /**
     * 取消上传       
     * @param {type} self   文件域对象
     * @returns {undefined}
     */
    function cancel(self) {
        //是否终止了ajax提交
        if (!xhr.abort()) {
            //是否有回调要执行
            var cancel = $(self).data('onUploadCancel');
            if ($.isFunction(cancel)) {
                cancel();
            } else {
                //文件域内容清空
                self.value = '';
            }
        }
    }

    /**
     * 默认显示上传进度的操作
     * @param {type} self   文件域对象
     * @param {type} evt    上传队列对象
     * @returns {undefined}
     */
    function uploadProgress(self, evt) {
        var processBar = '';
        if (!$('#default_process_bar').size()) {
            processBar = $('<div id="default_process_bar"><progress max="100" value="0"></progress><span>0%</span></div>');
            $(self).before(processBar);
        } else {
            processBar = $('#default_process_bar').show();
        }
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            processBar.find('progress').val(percentComplete);
            processBar.find('span').text(percentComplete.toString() + '%');
        }
        else {
            processBar[0].innerHTML = 'unable to compute';
        }
    }

    /**
     * canvans压缩图片上传
     * @param {type} file
     * @param {type} action
     * @returns {undefined}
     */
    function compressUpload(file, action) {
        var $canvas = '';
        if ($('#js_canvas').size()) {
            $canvas = $('#js_canvas');
        } else {
            $canvas = $('<canvas id="js_canvas" hidden></canvas>');
            $('body').append($canvas);
        }
        var url = webkitURL.createObjectURL(file),
                image = new Image(),
                canvas = $canvas[0],
                ctx = canvas.getContext('2d');
        image.onload = function() {
            var width = image.width / 2, height = image.height / 2;
            $canvas.attr({width: width, height: height});
            ctx.drawImage(image, 0, 0, width, height);
            var base64 = canvas.toDataURL('image/jpeg', 0.5).substr(22);
            $.post(action, {data: base64.substr(22), is_base64: 1}, function(data) {
            });
        };
        image.src = url;
    }

    $.fn.extend({
        upload: function(options) {
            var defaults = {
                id: '',
                url: "",
                autoUpload: true,
                successTimeout: 3,
                uploadDiv: '',
                uploadButtonClass: '',
                uploadButtonText: '开始上传',
                cancelButtonText: '取消上传',
                cancelButtonClass: '',
                onSelected: '',
                onUploadComplete: '',
                onUploadFailed: '',
                onUploadCancel: ''
            },
            self = this[0];
            if ('string' === $.type(options)) {
                options = {"url": options};
            }
            options = $.extend(defaults, options);
            $(self).after('<div class="' + options.uploadDiv + '">\n\
            <button type="button" id="' + domain + '_start_upload" class="' + options.uploadButtonClass + '">' + options.uploadButtonText + '</button>\n\
            <button type="button" id="' + domain + '_cancel_upload" class="' + options.cancelButtonClass + '">' + options.cancelButtonText + '</button></div>');
            $(this).on('change', function() {
                //文件选择后回调
                if ($.isFunction(options.onSelected)) {
                    options.onSelected(self.files[0]);
                }
                //是否选择文件后自动上传
                if (options.autoUpload === true) {
                    uploadFile(self, options);
                } else {
                    $(self).data('onUploadCancel', options.onUploadCancel);
                    $('#' + domain + '_start_upload').on('click', function() {
                        uploadFile(self, options);
                    });
                    $('#' + domain + '_cancel_upload').on('click', function() {
                        cancel(self);
                    });
                }
            });
            return this;
        },
        cancel: function() {
            cancel(this[0]);
        }
    });
})(jQuery, 'yangbai');