jQuery.fn.rotate = function() {
	var angle = arguments[0] || 90, whence = arguments[1];
	(arguments[0] !== undefined && arguments[0] === false) && (angle = -angle);
	(arguments[0] !== true && arguments[0]) && (angle = arguments[0]);
	var p = this.get(0);
	$('body').data('width') ||  $('body').data('width', p.width);
	$('body').data('height') ||  $('body').data('height', p.height);
	if (!whence) {
		p.angle = ((p.angle == undefined ? 0 : p.angle) + angle) % 360;
	} else {
		p.angle = angle;
	}
	if (p.angle >= 0) {
		var rotation = Math.PI * p.angle / 180;
	} else {
		var rotation = Math.PI * (360 + p.angle) / 180;
	}
	var costheta = Math.round(Math.cos(rotation) * 1000) / 1000;
	var sintheta = Math.round(Math.sin(rotation) * 1000) / 1000;
	if (document.all && !window.opera) {
		var canvas = document.createElement('img');
		canvas.src = p.src;
		canvas.height = p.height;
		canvas.width = p.width;
		canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + costheta + ",M12=" + (-sintheta) + ",M21=" + sintheta + ",M22=" + costheta + ",SizingMethod='auto expand')";
	} else {
		var canvas = document.createElement('canvas');
		if (!p.oImage) {
			canvas.oImage = new Image();
			canvas.oImage.src = p.src;
		} else {
			canvas.oImage = p.oImage;
		}

		if ($('body').data('index')) {
			$('body').data('index', $('body').data('index') + 1);
		} else {
			$('body').data('index', 1);
		}

		if ($('body').data('index') % 2 !== 0) {
			canvas.oImage.height = $('body').data('width');
			var scale = $('body').data('height') / $('body').data('width');
			canvas.oImage.width = Math.round(canvas.oImage.height / scale);
		} else {
			canvas.oImage.width = $('body').data('width');
			canvas.oImage.height = $('body').data('height');
		}

		canvas.style.width = canvas.width = Math.abs(costheta * canvas.oImage.width) + Math.abs(sintheta * canvas.oImage.height);
		canvas.style.height = canvas.height = Math.abs(costheta * canvas.oImage.height) + Math.abs(sintheta * canvas.oImage.width);

		var context = canvas.getContext('2d');
		context.save();
		if (rotation <= Math.PI / 2) {
			context.translate(sintheta * canvas.oImage.height, 0);
		} else if (rotation <= Math.PI) {
			context.translate(canvas.width, -costheta * canvas.oImage.height);
		} else if (rotation <= 1.5 * Math.PI) {
			context.translate(-costheta * canvas.oImage.width, canvas.height);
		} else {
			context.translate(0, -sintheta * canvas.oImage.width);
		}
		context.rotate(rotation);
		context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height);
		context.restore();
	}
	canvas.id = p.id;
	canvas.angle = p.angle;
	p.parentNode.replaceChild(canvas, p);
}