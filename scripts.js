var pickerData;
var startInterval;
var blockLeft = 0;
var blockTop = 0;
var keys;
var line = false;
var left = true;
var topp = true;
var shift = false;
var random = false;
var cornerTouch = 0;
var moveLeft = 1;
var moveUp = 1;
var lineColor = "red";
var lineColorShift = false;
var down = false;
var first = true;
var ifirst = false;
var mouseColor;
var pick = false;
var strokeSize = 1;
var globalImg = 0;
var imageDropped = false;
var i = 0;
var j = 0;
var startY = window.innerHeight / 2;
var startX = window.innerWidth / 2;
var ratio;

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
function interval() {
  startInterval = setInterval(function () {
    if (imageDropped) {
      ctx = document.getElementById("myCanvas").getContext("2d");
      if (ifirst) {
        data = ctx.getImageData(0, 0, globalImg.width, globalImg.height).data;
        ctx.fillStyle = "#121212";
        ctx.fillRect(0, 0, globalImg.width, globalImg.height);
        startX = window.innerWidth / 2;
        startY = window.innerHeight / 2;
        j = 0;
        ifirst = false;
      }
      if (j < data.length) {
        block = document.getElementById("block");
        block.style.top = startY - globalImg.height / 2 + "px";
        block.style.left = startX - globalImg.width / 2 + "px";
        currentPixel = "rgb(" + data[j];
        j++;
        currentPixel += ", " + data[j];
        j++;
        currentPixel += ", " + data[j] + ")";
        j++;
        ctx.beginPath();
        ctx.moveTo(startX - globalImg.width / 2, startY - globalImg.height / 2);
        startX++;
        ctx.lineTo(startX - globalImg.width / 2, startY - globalImg.height / 2);
        ctx.strokeStyle = currentPixel;
        ctx.lineWidth = 1;
        ctx.stroke();
        j++;
      } else {
        clearInterval(startIntervals);
      }
      if (
        startX - globalImg.width / 2 ==
        globalImg.width + window.innerWidth / 2 - globalImg.width / 2
      ) {
        startY++;
        startX = window.innerWidth / 2;
      }
    }
    if (shift) {
      const rightMost = window.innerWidth - block.offsetWidth - 16;
      const leftMost = -8;
      const highest = -8;
      const lowest = window.innerHeight - block.offsetHeight - 14;
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
            moveLeft = getRandomIntInclusive(1, 5);
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
            moveLeft = getRandomIntInclusive(1, 5);
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
            moveUp = getRandomIntInclusive(1, 5);
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
            moveUp = getRandomIntInclusive(1, 5);
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
  }, 4);
}
window.addEventListener("resize", function () {
  var myCanvasEl = document.getElementById("myCanvas");
  myCanvasEl.style.width = window.innerWidth;
  myCanvasEl.style.height = window.innerHeight;
  myCanvasEl.height = window.innerHeight - 16;
  myCanvasEl.width = window.innerWidth - 16;
});
window.addEventListener("dragenter", function (e) {
  e.preventDefault();
  document.getElementById("dropZone").style.backgroundColor = "red";
});
window.addEventListener("dragleave", function (e) {
  e.preventDefault();
  document.getElementById("dropZone").style.backgroundColor = "black";
});
document.addEventListener("dragover", function (e) {
  e.preventDefault();
  document.getElementById("dropZone").style.backgroundColor = "red";
});
window.addEventListener("drop", function (ev) {
  ev.preventDefault();
  document.getElementById("dropZone").style.backgroundColor = "black";
  console.log("File(s) dropped");

  // Prevent default behavior (Prevent file from being opened)

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === "file") {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log("... file[" + i + "].name = " + file.name);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log(
        "... file[" + i + "].name = " + ev.dataTransfer.files[i].name
      );
    }
  }
  var ctx = document.getElementById("myCanvas").getContext("2d");
  var url = URL.createObjectURL(file);
  var img = new Image();
  img.onload = function () {
    ratio = img.width/img.height
    img.width = 250
    img.height = 250*ratio
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };
  img.src = url;
  startX = window.innerWidth / 2;
  startY = window.innerHeight / 2;
  j = 0;
  globalImg = img;
  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 0, img.width, img.height);
  imageDropped = true;
  ifirst = true;
  interval();
});
window.addEventListener("mousedown", function () {
  down = true;
  function draw(event) {
    if (first) {
      mousex = event.clientX;
      mousey = event.clientY;
      first = false;
    }
    if (down) {
      if (mousex != event.clientX || mousey != event.clientY) {
        var myCanvasEl = document.getElementById("myCanvas");
        var ctx = myCanvasEl.getContext("2d");
        ctx.beginPath();
        myCanvasEl.style.width = window.innerWidth;
        myCanvasEl.style.height = window.innerHeight;
        ctx.moveTo(mousex - 5, mousey - 5);
        mousex = event.clientX;
        mousey = event.clientY;
        ctx.lineTo(mousex + 1 - 5, mousey + 1 - 5);
        ctx.strokeStyle = mouseColor;
        ctx.lineWidth = strokeSize;
        ctx.stroke();
      }
    } else {
      first = true;
    }
  }
  window.addEventListener("mousemove", draw);
});
window.addEventListener("mouseup", function () {
  down = false;
});
window.addEventListener("wheel", function (event) {
  if (event.wheelDeltaY > 0) {
    strokeSize += 1;
  } else if (event.wheelDeltaY < 0 && strokeSize > 0) {
    strokeSize -= 1;
  }
});
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
  if (keys["e"]){
    mouseColor = "#121212"
  }
  if (keys["p"]) {
    img = document.getElementById("colorWheel");
    ctx.drawImage(img, 0, 0);
    function picker(event) {
      mousex = event.clientX;
      mousey = event.clientY;
      pickerData = ctx.getImageData(mousex, mousey, 1, 1).data;
      mouseColor = "rgb(" + pickerData[0] + ", " + pickerData[1] + ", " + pickerData[2] + ")";
      ctx.fillStyle = "#121212";
      ctx.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
      window.removeEventListener("mousedown", picker);
    }
    window.addEventListener("mousedown", picker );
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
      interval()
    } else {
      shift = false;
      clearTimeout(startInterval)
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
