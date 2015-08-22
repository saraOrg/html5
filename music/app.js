$(function() {
	var oAudio = document.getElementById('audio');
	$('body').delegate('.mod_song_list__play', 'click', function() {
		var $this = $(this), src = $this.data('src'), isPlay = $this.data('isPlay');
		if (isPlay) {
			if (oAudio.paused) {
				oAudio.play();
			} else {
				oAudio.pause();
			}
		} else {
			oAudio.src = $this.data("src");
			$('.mod_song_list__play').not(this).data('isPlay', 0);
			$this.data('isPlay', 1);
		}
		$('.mod_song_list__play').not(this).removeClass('mod_song_list__play--pause');
		$(this).toggleClass('mod_song_list__play--pause');
	});
	oAudio.onend = function() {
		$('.mod_song_list__play').removeClass('mod_song_list__play--pause');
	}
	//loadMusic('./media/记得我爱你.mp3');
//	$.get('./media/111.mp3', function(data) {
//		console.dir(data);
//	}, 'arraybuffer');
});

var pos = {startX: 0, startY: 0, endX: 0, endY: 0};

/**
 * 触摸方向的识别 
 */
document.addEventListener('touchstart', function(event) {
	var o = event.touches[0];
	pos.startX = o.pageX;
	pos.startY = o.pageY;
});

document.addEventListener('touchend', function(event) {
	var o = event.changedTouches[0];
	pos.endX = o.pageX;
	pos.endY = o.pageY;
	var deltax = pos.endX - pos.startX;
	var deltay = pos.endY -pos.startY;
	if (Math.max(Math.abs(deltax), Math.abs(deltay)) < 10) {
		return;
	}
	if (Math.abs(deltax) >= Math.abs(deltay)) {
		if (deltax > 0) {
			console.dir('right');
		} else {
			console.dir("left");
		}
	} else {
		if (deltay > 0) {
			console.dir('down');
		} else {
			console.dir("up");
		}
	}
});

var myAudio = {};
myAudio.ac = new (window.AudioContext || window.webkitAudioContext)();
myAudio.bufferSource = myAudio.ac.createBufferSource();

/**
 * 加载音乐数据 
 */
function loadMusic(url) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.responseType = "arraybuffer";
	xhr.onload = function() {
		play(xhr.response);
	}
	xhr.send();
}

/**
 * 播放音乐
 * @param {Object} data 歌曲二进制文件
 */
function play(data) {
	myAudio.ac.decodeAudioData(data, function(buffer) {
		myAudio.bufferSource.buffer = buffer;
		myAudio.bufferSource.connect(myAudio.ac.destination);
		myAudio.bufferSource.start();
//		bufferSource[bufferSource.start ? "start" : "noteOn"](0);
	}, function(error) {
		console.dir(error);
	});
}
