window.onload = function() {
	var doc = document;
	var oDiv1 = doc.getElementById('div1');
	var oDiv2 = doc.getElementById('div2');
	var oDiv3 = doc.getElementById('div3');
	var oImg = doc.getElementById('img');
	var oBody = document.body;
	
	oDiv1.ondragover = dragOverHandler;
	oDiv2.ondragover = dragOverHandler;
	oDiv3.ondragover = dragOverHandler;
	oImg.ondragstart = dragStartHandler;
	oDiv1.ondrop = dragDropHandler;
	oDiv2.ondrop = dragDropHandler;
	oDiv3.ondrop = dragDropHandler;
}

function dragOverHandler(e) {
	e.preventDefault();
	$('.box').removeClass('enter');
	$(this).addClass('enter');
}

function dragStartHandler(e) {
	e.dataTransfer.setData('id', this.id);
}

function dragDropHandler(e) {
	$(this).removeClass('enter');
	e.preventDefault();
	//$(this).append($('#' + e.dataTransfer.getData('id')));
	this.appendChild(document.getElementById(e.dataTransfer.getData('id')));
}
