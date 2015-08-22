window.onload = function() {
	var canvas = document.getElementById("canvas");
	canvas.load = function() {
		alert();
	}
	var stage = new createjs.Stage(canvas);
	var text = new createjs.Text("number: " + count, "20px Arial", "#ff7700");
	var count = 0;
	stage.addChild(text);
	createjs.Ticker.setFPS(10);
	createjs.Ticker.addEventListener("tick", tick);
	function tick(e) {
		count++;
		text.text = "number: " + count;
		stage.update();
	}
}
