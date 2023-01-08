//-Функция управления размерами Canvas
//-Set canvas size function
function canvas_size(width, height) {
  canvas.width = width;
  canvas.height = height;
}

//-Функция очистки Canvas
//-Clear canvas function
function canvas_clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//-Фукция управления цвета фона Canvas (используй формат строки для цвета)
//-Set background color function (use string format for "color")
function background(color) {
  ctx.beginPath();
  ctx.resetTransform();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}
