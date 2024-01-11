

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');
let time = 0;
let x = 0
let pos = []
let length = 60
let translate = 150 
function draw (fpm) {
  requestAnimationFrame(draw)


  if (fpm < time + 60) return
      time = fpm

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  
  ctx.save();
  ctx.translate(translate, translate)
  let px = 0;
  let py = 0;
  for (let i = 1; i < 4; i++) {
    const impar = i
    let memox = px;
    let memoy = py;
    const radius = (length *2) / (Math.PI * impar * (Math.pow(-1, i)))
    
    py += radius * Math.sin(-x * impar * Math.pow(-1, i))
    px += radius * Math.cos(-x * impar * Math.pow(-1, i))
    
    ctx.beginPath();
    ctx.arc(memox, memoy, Math.abs(radius), 0, 2 * Math.PI)
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(px, py, 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.moveTo(memox, memoy)
    ctx.lineTo(px, py)
    ctx.stroke();
  }
  
  pos.push(py)


  ctx.translate(translate, 0)
  for (let i = pos.length - 1, j = 1; i > 0; i--, j++) {

    ctx.moveTo(j-1, pos[i])
    ctx.lineTo(j, pos[i-1])
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.strokeStyle = "red"
  ctx.moveTo(px-translate, py)
  ctx.lineTo(0, pos[pos.length -1])
  ctx.stroke();


  if (pos.length > 200) pos.shift();

  ctx.restore();
  
  x += 0.05
}


requestAnimationFrame(draw)