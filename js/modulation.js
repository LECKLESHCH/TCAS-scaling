$(function () {
  const { koo } = scaleView(1);
  var ctx = $("#modulation")[0].getContext("2d");
  // var p = new Plane();
  function draw() {
    var scale = 40;
    if ($(".clicker#range").hasClass("state1")) {
      scale = scale / 40;
    } else if ($(".clicker#range").hasClass("state2")) {
      scale = scale / 40;
    } else if ($(".clicker#range").hasClass("state3")) {
      scale = scale / 40;
    }
    ctx.clearRect(0, 0, 1737, 702);

    ctx.strokeStyle = "#777777";
    ctx.beginPath();
    ctx.moveTo(0, 351 * koo);
    ctx.lineTo(1737 * koo, 351 * koo);
    ctx.moveTo(868 * koo, 0);
    ctx.lineTo(868 * koo, 702 * koo);
    ctx.stroke();

    // ctx.scale(-1, 1);
    // ctx.drawImage($("#modulation-plane")[0], -496 - 50, 135 - 50, 100, 100);
    // ctx.resetTransform();
    Entity.draw(ctx);
    Entity.tick();
    ctx.resetTransform();
    // ctx.translate(350, 135);
    // ctx.scale(1 / scale, 1 / scale);
    window.requestAnimationFrame(draw);
  }
  //draw();
  window.requestAnimationFrame(draw);
});
