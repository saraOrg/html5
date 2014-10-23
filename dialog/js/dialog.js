define(['jquery'], function($) {
	var Dialog = function() {

	}
	Dialog.prototype = {
		modalBlackout: function() {
			$('body').append('<div id="bremove" />');
		},
		close: function() {
			$('#bremove').remove();
			$('#dialog').remove();
		},
		fixPosition: function() {
			$('#dialog').css({'left':($(window).width()/2)-($('#dialog').width()+18)/2+'px','top':($(window).height()/2)-($('#dialog').height()+18)/2+'px'});
		},
		tips: function(message, type, timeout) {
			message = message || '非常好，你很棒';
			type = type || 'success';
			timeout = timeout || 1.5;
			var html = '<div id="dialog">';
				html += '<div class="tips tips-' + type + '"></div>';
				html += '<span class="tips-font">' + message + '</span>';
				html += '</div>', dialog = this;
			this.modalBlackout();
			$('body').append(html);
			this.fixPosition();
			setTimeout(function() {
				dialog.close();
			}, timeout * 1000);
		},
		success: function(message) {
			this.tips(message || '非常好，你很棒', 'success');
		},
		warning: function(message) {
			this.tips(message || '喂，你到底想干嘛', 'warning');
		},
		error: function(message) {
			this.tips(message || '咋搞的，出错了', 'error', 3);
		},
		loading: function(message) {
			this.tips(message || '玩命的加载中...', 'loading');
		}
	}
	var dialog = new Dialog();
	$(window).resize(function() {
		dialog.fixPosition();
	});
	return dialog;
});