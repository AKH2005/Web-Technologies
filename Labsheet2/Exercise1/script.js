const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Filled Rectangle
ctx.fillStyle = "blue";
ctx.fillRect(20, 20, 120, 80);

// Filled Circle
ctx.beginPath();
ctx.arc(250, 150, 40, 0, 2 * Math.PI);
ctx.fillStyle = "green";
ctx.fill();

// Straight Line
ctx.beginPath();
ctx.moveTo(50, 250);
ctx.lineTo(450, 250);
ctx.strokeStyle = "red";
ctx.lineWidth = 3;
ctx.stroke();

// Text
ctx.font = "24px Arial";
ctx.fillStyle = "black";
ctx.fillText("HTML5 Canvas", 150, 50);
