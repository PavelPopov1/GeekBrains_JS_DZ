var canvas = document.getElementById("renderCanvas");
var ctx = canvas.getContext("2d");
var offset = 25;
var letters = "abcdefgh"
var color;

ctx.font = "20px Arial";
// Letters
// Borders
drawLine(offset * 9, offset, offset * 9, offset * 9); // Right border
drawLine(offset, offset, offset, offset * 9); // Left border
drawLine(offset, offset, offset * 9, offset); // Top border
drawLine(offset, offset*9, offset * 9, offset*9); // Top border



for (i = 0; i < 8; i++) {
	for (j = 0; j < 8; j++) {
	if (j%2 == 0) {
			color="white";
		} else {
			color="black";
		}
		if (i%2 == 0) {
			drawCell(offset * (j), offset * (i+1), color);
		} else {
			drawCell(offset * (j+1), offset * (i+1), color);
		}
	}
}

for (i = 0; i < 8; i++) {
	ctx.fillText(letters[i], offset * (i+1) + 5, offset / 2 + 5);
	ctx.fillText(i+1, offset / 2 - 5, offset * (i+2) - 5);
}


function drawCell(x, y, color)
{
	ctx.beginPath();
	ctx.rect(x, y, 25, 25);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawLine(x0, y0, x1, y1)
{
	ctx.beginPath(); // Start a new path
	ctx.strokeStyle = "green";
	ctx.moveTo(x0, y0); // Move the pen to (x0, y0)
	ctx.lineTo(x1, y1); // Draw a line to (x1, y1)
	ctx.stroke(); // Render the path
}