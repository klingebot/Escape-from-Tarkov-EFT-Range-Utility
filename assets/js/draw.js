// Create canvas and add to DOM
var canvas = document.getElementById('canvas');

// Canvas styling
document.body.style.margin = 0;
canvas.style.position = 'fixed';
canvas.style.border = '1px solid black';

// Set 2d context and temporary resize
var ctx = canvas.getContext('2d');

// 2d Styling
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = 600;

// Add image underneath canvas
var img = document.getElementById('imgMap');
img.src = "./assets/img/maps/customs.png";
img.width = canvas.width;
img.height = canvas.height;
document.body.appendChild(img);

// Positions of the marker line
var pos1 = { x: 0, y: 0 };
var pos2 = { x: 0, y: 0 };

// Listeners for the canvas
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('contextmenu', reset);

// Set pos1 and pos2 x,y positions based on canvas
function setPosition(e) {
  // Position 2 is set, do nothing until reset
  if(pos2.x !== 0 && pos2.y !== 0){
    return;
  }

  // Position 1 is set - Set position 2
  if(pos1.x !== 0 && pos1.y !== 0){
    // Check mouse y position is within the canvas
    pos2.x = e.clientX;
    if (e.clientY < canvas.height){
      pos2.y = e.clientY;
    }else{
      // pos2.x already set, reset to 0
      pos2.x = 0;
      return;
    }
    return;
  }

  // No position 1 set - Set position 1
  if(pos1.x == 0 && pos1.y == 0){
    // Check mouse y position is within the canvas
    pos1.x = e.clientX;
    if (e.clientY < canvas.height){
      pos1.y = e.clientY;
    }else{
      // pos1.x already set, reset to 0
      pos1.x = 0;
      return;
    }
    return;
  }
}

// Draw line when selecting pos2
function draw(e) {
  // Skip draw to preserve line if pos2 is set
  if (pos2.x !== 0 && pos2.y !== 0){
    return;
  }

  // Reset canvas drawing to give single line appearance
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw line from pos1 -> pos2 while pos1 is set
  // Pos2 logic handled above to stop drawing once set
  if ((pos1.x !== 0 && pos1.y !== 0)){
    //Circle drawing for point 1
    ctx.beginPath();
    ctx.arc(pos1.x, pos1.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Line drawing
    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
    ctx.closePath();

    // Circle drawing for point 2
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Distance above second circle drawing
    // Move text if too close to top or right
    if(e.clientX > 950 || e.clientY < 50){
      console.log("1");
      ctx.beginPath();
      ctx.font = '24px serif';
      ctx.fillText(distance(pos1.x, e.clientX, pos1.y, e.clientY, 1150, 600), e.clientX-75, e.clientY+30);
      ctx.closePath();
    }else{
      console.log("3");
      ctx.beginPath();
      ctx.font = '24px serif';
      ctx.fillText(distance(pos1.x, e.clientX, pos1.y, e.clientY, 1150, 600), e.clientX+10, e.clientY-10);
      ctx.closePath();
    }

  }
}

// Reset points back to origin
function reset(){
  pos1.x = 0;
  pos1.y = 0;
  pos2.x = 0;
  pos2.y = 0;
}

function distance(x1, x2, y1, y2, mapX, mapY){
  // Find distance between pos1 and potential pos2
  // Subtract out map differential for m (not sure if this works but it does for testcase Customs map)
  var dist = Math.floor((Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2))) - (mapX/mapY*10));

  // Differential causes negatives - set to 0 (too close for users to distance anyway)
  if (dist < 0){
    dist = 0;
  }
  return `${dist}m`;
}
