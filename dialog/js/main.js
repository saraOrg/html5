require(['jquery', 'dialog'], function($, dialog) {
	$('#js_btn_tips_success').on('click', function() {
		dialog.success();
	});
	$('#js_btn_tips_warning').on('click', function() {
		dialog.warning();
	});
	$('#js_btn_tips_error').on('click', function() {
		dialog.error();
	});
	$('#js_btn_tips_loading').on('click', function() {
		dialog.loading();
	});
	$('#js_btn_dialog_alert').on('click', function() {
		dialog.alert('至少说点什么吧', function() {alert();});
	});
});