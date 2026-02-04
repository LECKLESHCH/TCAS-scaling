$(function () {
  var ctx = $("#screen")[0].getContext("2d");
  var range = 6;
  var angle = 0;
  var lastFrame = 0;
  var showPos = 2;
  let rangeNum = 2;
  const { scaleSize, koo } = scaleView(1);
  const imgPos = {
    screenSize: [scaleSize, scaleSize],
    screenPosition: [0, 0],
    arrowSize: [150 * koo, 34 * koo],
    arrowPosition: [-(36 * koo), 98 * koo],
  };
  function draw() {
    // if ((new Date()).getTime() - lastFrame >= 1000 || $(".clicker#mode").data("newMode")) {
    $(".clicker#mode").data("newMode", false);
    ctx.clearRect(...[...imgPos.screenPosition, ...imgPos.screenSize]);
    
    // Проверяем длительное нажатие на TEST для отображения тестового паттерна
    var showTestPattern = typeof $("#screen").data("testPattern") != "undefined" && $("#screen").data("testPattern") == true;
    
    if ($(".clicker#test").data("test") != true && !showTestPattern) {
      switch ($(".clicker#mode").data("i")) {
        case 3:
          ctx.drawImage(
            $("#screen-black")[0],
            ...imgPos.screenPosition,
            ...imgPos.screenSize
          );
          drawPlanes();      
          drawAngle();
          drawRange();
          drawScale();
          ctx.drawImage(
            $("#screen-panel")[0],
            ...imgPos.screenPosition,
            ...imgPos.screenSize
          );
          ctx.drawImage($("#screen-ta-only")[0], 
            55 * koo,
            85 * koo,
            94 * koo,
            16 * koo);
          break;
        case 4:
          ctx.drawImage(
            $("#screen-black")[0],
            ...imgPos.screenPosition,
            ...imgPos.screenSize
          );
          drawPlanes();
          drawAngle();
          drawRange();
          drawScale();
          ctx.drawImage(
            $("#screen-panel")[0],
            ...imgPos.screenPosition,
            ...imgPos.screenSize
          );
          break;
        default:
          //ctx.drawImage($("#screen-off")[0], 0, 0);
          ctx.drawImage(
            $("#screen-black")[0],
            ...imgPos.screenPosition,
            ...imgPos.screenSize
          );
          ctx.drawImage(
            $("#screen-tcas-off")[0],
            75 * koo,
            75 * koo,
            70 * koo,
            36 * koo
          );
          drawScale();
      }
    } else if (showTestPattern) {
      // Отображаем тестовый паттерн для длительного нажатия
      ctx.drawImage(
        $("#screen-test")[0],
        ...imgPos.screenPosition,
        ...imgPos.screenSize
      );
      // Можно добавить дополнительный тестовый паттерн здесь, если нужно
    } else {
      ctx.drawImage(
        $("#screen-test")[0],
        ...imgPos.screenPosition,
        ...imgPos.screenSize
      );
    }
    // lastFrame = (new Date()).getTime();
    // }
    window.requestAnimationFrame(draw);
  }
  draw();
  function drawRange() {
    if ($(".clicker#range").hasClass("state1")) {
      ctx.drawImage(
        $("#screen-6")[0],
        390 * koo,
        405 * koo,
        36 * koo,
        24 * koo
      );
      ctx.drawImage(
        $("#screen-zone")[0],
        163 * koo,
        250 * koo,
        164 * koo,
        164 * koo
      );
      range = 6;
      rangeNum = 0;
    } else if ($(".clicker#range").hasClass("state2")) {
      ctx.drawImage(
        $("#screen-12")[0],
        390 * koo,
        405 * koo,
        36 * koo,
        24 * koo
      );
      ctx.drawImage(
        $("#screen-zone")[0],
        197 * koo,
        283 * koo,
        96 * koo,
        96 * koo
      );
      range = 12;
      rangeNum = 1;
    } else if ($(".clicker#range").hasClass("state3")) {
      ctx.drawImage(
        $("#screen-40")[0],
        390 * koo,
        405 * koo,
        36 * koo,
        24 * koo
      );
      range = 40;
      rangeNum = 2;
    }
    ctx.drawImage(
      $("#screen-plane")[0],
      236 * koo,
      318 * koo,
      18 * koo,
      28 * koo
    );
  }
  function drawAngle() {
    if ($(".clicker#angle").hasClass("state1")) {
      showPos = 1;
      ctx.drawImage(
        $("#screen-above")[0],
        70 * koo,
        405 * koo,
        56 * koo,
        20 * koo
      );
    } else if ($(".clicker#angle").hasClass("state2")) {
      showPos = 2;
    } else if ($(".clicker#angle").hasClass("state3")) {
      showPos = 3;
      ctx.drawImage(
        $("#screen-below")[0],
        70 * koo,
        405 * koo,
        58 * koo,
        20 * koo
      );
    }
  }
  function drawScale() {
    ctx.save();
    var ep = Entity.getTarget() || 0;
    angle =
      Math.abs(ep.vertSpeed) < 10
        ? ((ep.vertSpeed / (5 / 60)) * Math.PI) / 3
        : ((ep.vertSpeed / (15 / 50)) * 3 * Math.PI) / 4;
    var ra =
      Math.abs(ep.ra) < 10
        ? ((ep.ra / (5 / 60)) * Math.PI) / 3
        : ((ep.ra / (15 / 50)) * 3 * Math.PI) / 4;
    // angle = -Math.PI / 3;
    if ($(".clicker#mode").data("i") == 4 && ep.ra != 0) {
      ctx.strokeStyle = "#ff0000";
      ctx.fillStyle = "#ff0000";
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (ep.ra > 0) {
        console.log("RA: ", ra);
        //ctx.arc(245 * koo, 250 * koo, 160 * koo, 0, Math.PI + ra);
        //ctx.arc(245 * koo, 250 * koo, 175 * koo, Math.PI + ra, 0, true);
        ctx.arc(245 * koo, 250 * koo, 160 * koo, Math.PI, Math.PI + ra / 1.57);
        ctx.arc(
          245 * koo,
          250 * koo,
          175 * koo,
          Math.PI + ra / 1.57,
          Math.PI,
          true
        );
        ctx.fill();
        ctx.strokeStyle = ctx.fillStyle = "#00ff00";
        ctx.beginPath();
        ctx.arc(
          245 * koo,
          250 * koo,
          160 * koo,
          (Math.PI * 23) / 24 + ra / 1.57,
          ra / 1.57 + (Math.PI * 25) / 24
        );
        ctx.arc(
          245 * koo,
          250 * koo,
          175 * koo,
          ra / 1.57 + (Math.PI * 25) / 24,
          (Math.PI * 23) / 24 + ra / 1.57,
          true
        );
        ctx.fill();
      } else if (ep.ra < 0) {
        ctx.arc(245 * koo, 250 * koo, 160 * koo, Math.PI + ra / 1.57, Math.PI);
        ctx.arc(
          245 * koo,
          250 * koo,
          175 * koo,
          Math.PI,
          Math.PI + ra / 1.57,
          true
        );
        ctx.fill();
        ctx.strokeStyle = ctx.fillStyle = "#00ff00";
        ctx.beginPath();
        ctx.arc(
          245 * koo,
          250 * koo,
          160 * koo,
          (Math.PI * 23) / 24 + ra / 1.57,
          (Math.PI * 25) / 24 + ra / 1.57
        );
        ctx.arc(
          245 * koo,
          250 * koo,
          175 * koo,
          (Math.PI * 25) / 24 + ra / 1.57,
          (Math.PI * 23) / 24 + ra / 1.57,
          true
        );
        ctx.fill();
      }
    }
    ctx.drawImage(
      $("#screen-scale")[0],
      ...[...imgPos.screenPosition, ...imgPos.screenSize]
    );
    ctx.strokeStyle = "#777777";
    //ctx.beginPath();
    //ctx.arc(245, 250, 160, 0, 2 * Math.PI);
    //ctx.stroke();
    //console.log(angle, angle / 1.57);
    ctx.translate(245 * koo, 250 * koo);
    ctx.rotate(angle / 1.57); // 1.57
    ctx.drawImage(
      $("#screen-arrow")[0],
      -(170 * koo),
      -(16 * koo),
      ...imgPos.arrowSize
    ); //-85, -8
    ctx.resetTransform(1, 0, 0, 1, 0, 0);
    //ctx.translate(-135, -135);

    /* ctx.beginPath();
    ctx.moveTo(0, 250 * koo);
    ctx.lineTo(500 * koo, 250 * koo);
    ctx.moveTo(245 * koo, 0);
    ctx.lineTo(245 * koo, 500 * koo);
    ctx.stroke(); */

    ctx.restore();
  }
  function drawPlanes() {
    const scaleCONST = [35, 35, 35];
    const planesPars = {
      scale: scaleCONST[rangeNum] * koo,
      translate: [245 * koo, 250 * koo],
      fontScale: 20 * koo,
    };
    var scaling = planesPars.scale / range;
    var target = Entity.getTarget();
    // ctx.translate(135, 180);
    ctx.translate(...planesPars.translate);
    ctx.scale(scaling, scaling);
    ctx.font = planesPars.fontScale / scaling + "px sans-serif";
    // ctx.font = 15 / scaling + "px sans-serif";
    ctx.textAlign = "center";
    for (var c = Entity.list.head; typeof c != "undefined"; c = c.next) {
      if (c.data.id == "target") continue;
      if (showPos !== 1 && c.data.id === "above") continue;
      if (showPos !== 3 && c.data.id === "below") continue;
      var plane = c.data;
      var delta = Math.round(((plane.alt - target.alt) * 3.28084) / 100);
      var tdelta = "";
      var x = plane.x - target.x;
      var y = plane.y - target.y;
      var planeState = plane.checkState();
      if ($(".clicker#traffic").hasClass("state1") && planeState < 2) continue;
      if (Math.abs(delta) < 10) {
        tdelta = "0" + Math.abs(delta);
      } else {
        tdelta = Math.abs(delta);
      }
      if (Math.sign(delta) < 0) {
        tdelta = "-" + tdelta;
      }
      var px = (x / 74080) * 170 + 45 / scaling;
      // var px = x / 74080 * 170;
      var py = (y / 74080) * 170;
      if (Math.sqrt(Math.pow(px, 2) + Math.pow(py, 2)) * scaling + 19 / 2 > 85)
        continue;
      // if (Math.sqrt(Math.pow(px - 45, 2) + Math.pow(py, 2)) * scaling + 19 / 2 > 85) continue;
      // if (plane.id == "enemy") {
      // ctx.fillText("x:" + Math.round(x), 0, -10);
      // ctx.fillText("y:" + Math.round(y), 0, 0);
      // ctx.fillText("px:" + Math.round(px), 0, 10);
      // ctx.fillText("py:" + Math.round(py), 0, 20);
      // }
      switch (planeState) {
        case 0:
          ctx.drawImage(
            $("#screen-plane0")[0],
            py - 19 / 2 / scaling,
            px - 19 / 2 / scaling,
            19 / scaling,
            19 / scaling
          );
          ctx.fillStyle = "#74c3f2";
          ctx.fillText(
            tdelta,
            py,
            px - (delta >= 0 ? 10 / scaling : -19 / scaling)
          );
          break;
        case 1:
          ctx.drawImage(
            $("#screen-plane1")[0],
            py - 19 / 2 / scaling,
            px - 19 / 2 / scaling,
            19 / scaling,
            19 / scaling
          );
          ctx.fillStyle = "#74c3f2";
          ctx.fillText(
            tdelta,
            py,
            px - (delta >= 0 ? 10 / scaling : -19 / scaling)
          );
          break;
        case 2:
          ctx.drawImage(
            $("#screen-plane2")[0],
            py - 19 / 2 / scaling,
            px - 19 / 2 / scaling,
            19 / scaling,
            19 / scaling
          );
          ctx.fillStyle = "#f7c600";
          ctx.fillText(
            tdelta,
            py,
            px - (delta >= 0 ? 10 / scaling : -19 / scaling)
          );
          break;
        case 3:
          ctx.drawImage(
            $("#screen-plane3")[0],
            py - 19 / 2 / scaling,
            px - 19 / 2 / scaling,
            19 / scaling,
            19 / scaling
          );
          ctx.fillStyle = "#ff0000";
          ctx.fillText(
            tdelta,
            py,
            px - (delta >= 0 ? 10 / scaling : -19 / scaling)
          );
          break;
        case 4:
          ctx.drawImage(
            $("#screen-plane3")[0],
            py - 19 / 2 / scaling,
            px - 19 / 2 / scaling,
            19 / scaling,
            19 / scaling
          );
          ctx.fillStyle = "#ff0000";
          ctx.fillText(
            tdelta,
            py,
            px - (delta >= 0 ? 10 / scaling : -19 / scaling)
          );
          break;
      }
      if (plane.vertSpeed >= 2.5 / 60) {
        ctx.fillText("\u2191", py + (19 / 2 + 3) / scaling, px);
      } else if (plane.vertSpeed <= -2.5 / 60) {
        ctx.fillText("\u2193", py + (19 / 2 + 3) / scaling, px);
      }
    }
    ctx.resetTransform();
  }
});
