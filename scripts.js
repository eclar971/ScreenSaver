var blockLeft = 0;
var blockTop = 0;
var keys;
var line = false;
var left = true;
var topp = true;
var shift = false;
var random = false;
var cornerTouch = 0;
var interval = 2;
var moveLeft = 1
var moveUp = 1

window.addEventListener("resize", function () {
	var myCanvasEl = document.getElementById("myCanvas");
	myCanvasEl.height = window.innerHeight - 16;
	myCanvasEl.width = window.innerWidth - 16;
});
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function getRandomColor() {
	var letters = "012356789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
setInterval(function () {
	const rightMost = window.innerWidth - block.offsetWidth - 16;
	const leftMost = -8;
	const highest = -8;
	const lowest = window.innerHeight - block.offsetHeight - 14;
	if (shift) {
		l = blockLeft;
		t = blockTop;
		if (line) {
			var myCanvasEl = document.getElementById("myCanvas");
			var ctx = myCanvasEl.getContext("2d");
			myCanvasEl.height / window.devicePixelRatio + "px";
			myCanvasEl.style.width =
				myCanvasEl.width / window.devicePixelRatio + "px";
			ctx.moveTo(l + block.offsetWidth / 2, t + block.offsetHeight / 2);
		}
		if (left) {
			if (blockLeft <= rightMost) {
				blockLeft += moveLeft;
				block.style.left = blockLeft + "px";
			} else {
				left = false;
				block.style.color = getRandomColor();
				if (random){
					moveLeft = getRandomIntInclusive(1,5)
				}
			}
		}
		if (!left) {
			if (blockLeft >= leftMost) {
				blockLeft -= moveLeft;
				block.style.left = blockLeft + "px";
			} else {
				left = true;
				block.style.color = getRandomColor();
				if (random){
					moveLeft = getRandomIntInclusive(1,5)
				}
			}
		}
		if (topp) {
			if (blockTop <= lowest) {
				blockTop += moveUp;
				block.style.top = blockTop + "px";
			} else {
				topp = false;
				block.style.color = getRandomColor();
				if (random){
					moveUp = getRandomIntInclusive(1,5)
				}
			}
		}
		if (!topp) {
			if (blockTop >= highest) {
				blockTop -= moveUp
				block.style.top = blockTop + "px";
			} else {
				topp = true;
				block.style.color = getRandomColor();
				if (random){
					moveUp = getRandomIntInclusive(1,5)
				}
			}
		}
		if (line) {
			ctx.lineTo(
				blockLeft + block.offsetWidth / 2,
				blockTop + block.offsetHeight / 2
			);
			ctx.strokeStyle = "red";
			ctx.stroke();
		}
	}
}, interval);
window.addEventListener("keydown", function movement(obj) {
	keys = keys || [];
	keys[obj.key] = true;
	var block = document.getElementById("block");
	l = blockLeft;
	t = blockTop;
	var myCanvasEl = document.getElementById("myCanvas");
	var ctx = myCanvasEl.getContext("2d");
	myCanvasEl.height / window.devicePixelRatio + "px";
	myCanvasEl.style.width = myCanvasEl.width / window.devicePixelRatio + "px";
	ctx.moveTo(l + block.offsetWidth / 2, t + block.offsetHeight / 2);
	if (keys["d"]) {
		if (blockLeft <= window.innerWidth - block.offsetWidth - 16) {
			blockLeft += 5;
			block.style.left = blockLeft + "px";
		}
	}
	if (keys["w"]) {
		if (blockTop >= -8) {
			blockTop -= 5;
			block.style.top = blockTop + "px";
		}
	}
	if (keys["a"]) {
		if (blockLeft >= -8) {
			blockLeft -= 5;
			block.style.left = blockLeft + "px";
		}
	}
	if (keys["s"]) {
		if (blockTop <= window.innerHeight - block.offsetHeight - 14) {
			blockTop += 5;
			block.style.top = blockTop + "px";
		}
	}
	if (keys["ArrowRight"]) {
		moveLeft += 1
	}
	if (keys["ArrowDown"]) {
		moveUp -= 1
	}
	if (keys["ArrowUp"]) {
		moveUp += 1
	}
	if (keys["ArrowLeft"]) {
		moveLeft -= 1
	}
	if (keys[" "]) {
		let color = getRandomColor();
		block.style.color = color;
	}
	if (keys["Shift"]) {
		if (!shift) {
			shift = true;
		} else {
			shift = false;
		}
	}
	if (keys["l"]) {
		if (!line) {
			line = true;
		} else {
			line = false;
		}
	}
	if (keys["r"]) {
		if (!random) {
			random = true;
		} else {
			random = false;
		}
	}
	ctx.lineTo(
		blockLeft + block.offsetWidth / 2,
		blockTop + block.offsetHeight / 2
	);
	ctx.strokeStyle = "red";
	ctx.stroke();
});
document.addEventListener(
	"keyup",
	function movement(obj) {
		keys[obj.key] = false;
		stop();
	},
	false
);
window.onload = function () {
	var myCanvasEl = document.getElementById("myCanvas");
	myCanvasEl.height = window.innerHeight - 16;
	myCanvasEl.width = window.innerWidth - 16;
};
