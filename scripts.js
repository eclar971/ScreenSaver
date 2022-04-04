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
var moveLeft = 1;
var moveUp = 1;
var lineColor = "red";
var lineColorShift = false;
var down = false;
var first = true;
var mouseColor;
var pick = false;
var strokeSize = 1;

window.addEventListener("resize", function () {
	var myCanvasEl = document.getElementById("myCanvas");
	myCanvasEl.style.width = window.innerWidth;
	myCanvasEl.style.height = window.innerHeight;
	myCanvasEl.height = window.innerHeight - 16;
	myCanvasEl.width = window.innerWidth - 16;
});
window.addEventListener("mousemove", function (event) {
	if (first){
		mousex = event.clientX;
		mousey = event.clientY;
		first = false
	}
	if (down){
		if (mousex != event.clientX || mousey != event.clientY){
			var myCanvasEl = document.getElementById("myCanvas");
			var ctx = myCanvasEl.getContext("2d");
			ctx.beginPath();
			myCanvasEl.style.width = window.innerWidth;
			myCanvasEl.style.height = window.innerHeight;
			ctx.moveTo(mousex-5, mousey-5);
			mousex = event.clientX;
			mousey = event.clientY;
			ctx.lineTo(mousex+1-5, mousey+1-5);
			ctx.strokeStyle = mouseColor;
			ctx.lineWidth = strokeSize
			ctx.stroke();
		}
	}else{
		first = true
	}
});
window.addEventListener("mousedown", function () {
	down = true
});
window.addEventListener('mouseup', function(){
	down = false
})
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
			ctx.beginPath();
			myCanvasEl.style.width = window.innerWidth;
			myCanvasEl.style.height = window.innerHeight;
			ctx.moveTo(l + block.offsetWidth / 2, t + block.offsetHeight / 2);
		}
		if (left) {
			if (blockLeft <= rightMost) {
				blockLeft += moveLeft;
				block.style.left = blockLeft + "px";
			} else {
				left = false;
				color = getRandomColor();
				block.style.color = color;
				if (lineColorShift) {
					lineColor = color;
				}
				if (random) {
					moveLeft = getRandomIntInclusive(1, 500);
				}
			}
		}
		if (!left) {
			if (blockLeft >= leftMost) {
				blockLeft -= moveLeft;
				block.style.left = blockLeft + "px";
			} else {
				left = true;
				color = getRandomColor();
				block.style.color = color;
				if (lineColorShift) {
					lineColor = color;
				}
				if (random) {
					moveLeft = getRandomIntInclusive(1, 500);
				}
			}
		}
		if (topp) {
			if (blockTop <= lowest) {
				blockTop += moveUp;
				block.style.top = blockTop + "px";
			} else {
				topp = false;
				color = getRandomColor();
				block.style.color = color;
				if (lineColorShift) {
					lineColor = color;
				}
				if (random) {
					moveUp = getRandomIntInclusive(1, 500);
				}
			}
		}
		if (!topp) {
			if (blockTop >= highest) {
				blockTop -= moveUp;
				block.style.top = blockTop + "px";
			} else {
				topp = true;
				color = getRandomColor();
				block.style.color = color;
				if (lineColorShift) {
					lineColor = color;
				}
				if (random) {
					moveUp = getRandomIntInclusive(1, 500);
				}
			}
		}
		if (line) {
			ctx.lineTo(
				blockLeft + block.offsetWidth / 2,
				blockTop + block.offsetHeight / 2
			);
			ctx.strokeStyle = lineColor;
			ctx.stroke();
		}
	}
}, interval);
window.addEventListener('wheel', function(event){
	if (event.wheelDeltaY > 0){
		strokeSize += 1
	}else if (event.wheelDeltaY < 0 && strokeSize > 0){
		strokeSize -= 1
	}
})
window.addEventListener("keydown", function movement(obj) {
	keys = keys || [];
	keys[obj.key] = true;
	var block = document.getElementById("block");
	l = blockLeft;
	t = blockTop;
	var myCanvasEl = document.getElementById("myCanvas");
	var ctx = myCanvasEl.getContext("2d");
	if (keys["d"]) {
		if (blockLeft <= window.innerWidth - block.offsetWidth - 16) {
			blockLeft += 5;
			block.style.left = blockLeft + "px";
		}
	}
	if (keys["p"]) {
		img = document.getElementById('colorWheel')
		ctx.drawImage(img, 0, 0)
		function picker(event){
			mousex = event.clientX;
			mousey = event.clientY;
			data = ctx.getImageData(mousex, mousey, 1, 1).data
			mouseColor = "rgb("+data[0]+", "+data[1]+", "+data[2]+")"
			ctx.fillStyle ="#121212";
			ctx.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
			window.removeEventListener('mousedown', picker)
		}
		window.addEventListener('mousedown', picker)
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
		moveLeft += 1;
	}
	if (keys["ArrowDown"]) {
		if (moveUp >= 1) {
			moveUp -= 1;
		}
	}
	if (keys["ArrowUp"]) {
		moveUp += 1;
	}
	if (keys["ArrowLeft"]) {
		if (moveLeft >= 1) {
			moveLeft -= 1;
		}
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
	if (keys["]"]) {
		if (!lineColorShift) {
			lineColorShift = true;
		} else {
			lineColorShift = false;
		}
	}
	if (keys["l"]) {
		if (!line) {
			line = true;
		} else {
			line = false;
		}
	}
	if (line && !shift && keys["l"]) {
		myCanvasEl.style.width = window.innerWidth;
		myCanvasEl.style.height = window.innerHeight;
		ctx.beginPath();
		ctx.moveTo(l + block.offsetWidth / 2, t + block.offsetHeight / 2);
	}
	if (keys["r"]) {
		if (!random) {
			random = true;
		} else {
			random = false;
		}
	}
	if (keys["c"]) {
		lineColor = getRandomColor();
	}
	if (line && !shift) {
		ctx.lineTo(
			blockLeft + block.offsetWidth / 2,
			blockTop + block.offsetHeight / 2
		);
		ctx.strokeStyle = lineColor;
		ctx.stroke();
	}
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
	myCanvasEl.style.width = window.innerWidth;
	myCanvasEl.style.height = window.innerHeight;
	myCanvasEl.height = window.innerHeight - 16;
	myCanvasEl.width = window.innerWidth - 16;
};
