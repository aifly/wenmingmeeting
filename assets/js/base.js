var imgs = {
	play: './assets/images/play.png',
	title: './assets/images/title.png',
	logo: './assets/images/logo.png',
	light1: './assets/images/light1.png',
	checked: './assets/images/checked.png',
	yqi: './assets/images/yqi.png',
	he: './assets/images/he.png',
	bg: './assets/images/bg.jpg',



}



var arr = [];
for (var attr in imgs) {
	arr.push(imgs[attr]);
}
var loading = function(arr, fn, fnEnd) {
	var len = arr.length;
	var count = 0;
	var i = 0;

	function loadimg() {
		if (i === len) {
			return;
		}
		var img = new Image();
		img.onload = img.onerror = function() {
			count++;
			if (i < len - 1) {
				i++;
				loadimg();
				fn && fn(i / (len - 1), img.src);
			} else {
				fnEnd && fnEnd(img.src);
			}
		};
		img.src = arr[i];
	}
	loadimg();
}