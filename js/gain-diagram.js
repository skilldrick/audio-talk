var canvas = document.getElementById('gain-diagram');
var c = canvas.getContext('2d');

//c.strokeRect(0, 0, canvas.width, canvas.height);

function node(left, width, nodeText, belowText, drawArrow) {
  var height = 80;
  c.fillStyle = "#3F3F3F";
  c.fillRect(left, 0, width, 80);

  c.fillStyle = "#DCDCDC";
  c.font = "22px Source Sans Pro";
  c.textBaseline = "middle";
  c.textAlign = "center";
  c.fillText(nodeText, left + width / 2, height / 2);

  c.font = "22px monospace";
  c.fillText(belowText, left + width / 2, height + 20);

  if (drawArrow) {
    var arrowLength = 70;
    var start = { x: left + width, y: height / 2 };
    var end = { x: start.x + arrowLength, y: start.y };

    c.fillStyle = "#3F3F3F";
    c.strokeStyle = "#3F3F3F";
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(start.x, start.y);
    c.lineTo(end.x - 5, end.y);
    c.stroke();

    c.beginPath();
    c.moveTo(end.x, end.y);
    c.lineTo(end.x - 20, end.y - 10);
    c.lineTo(end.x - 20, end.y + 10);
    c.lineTo(end.x, end.y);
    c.fill();
  }
}

node(0, 280, "AudioBufferSourceNode", "source", true);
node(350, 170, "GainNode", "gainNode", true);
node(590, 280, "AudioDestinationNode", "ctx.destination", false);
