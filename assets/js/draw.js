// Create canvas and add to DOM
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

// Set full screen canvas
// ##TEMPORARY##
document.body.style.margin = 0;
canvas.style.position = 'fixed';

// Set 2d context and temporary resize
var ctx = canvas.getContext('2d');
resize();

// Positions of the marker line
var pos1 = { x: 0, y: 0 };
var pos2 = { x: 0, y: 0 };

// Listeners for the canvas
window.addEventListener('resize', resize);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);

// Set pos1 and pos2 x,y positions based on canvas
function setPosition(e) {
  // Position 1 is set - Set position 2
  if(pos1.x !== 0 && pos1.y !== 0){
    pos2.x = e.clientX;
    pos2.y = e.clientY;
    console.log(`Position 2 set at ${pos2.x},${pos2.y}`);
    return;
  }

  // No position 1 set - Set position 1
  if(pos1.x == 0 && pos1.y == 0){
    pos1.x = e.clientX;
    pos1.y = e.clientY;
    console.log(`Position 1 set at ${pos1.x},${pos1.y}`);
    return;
  }
}

// Draw line when selecting pos2
function draw(e) {
  // Skip draw to preserve line if pos2 is set
  if (pos2.x !== 0 && pos2.y !== 0){
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw line from pos1 -> pos2 while pos1 is set
  // Pos2 logic handled above to stop drawing once set
  if ((pos1.x !== 0 && pos1.y !== 0)){
    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  }
}

// Reset points back to origin
function reset(){
  pos1.x = 0;
  pos1.y = 0;
  pos2.x = 0;
  pos2.y = 0;
}

// Fullscreen canvas
// ##TEMPORARY##
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}
