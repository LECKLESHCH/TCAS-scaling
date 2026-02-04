$(function () {
  const { koo } = scaleView(1);
  var ctx = $("#miniscreen")[0].getContext("2d");
  const numPos = {
    pos: [55 * koo, 75 * koo],
  };
  function draw() {
    ctx.clearRect(0, 0, 385 * koo, 75 * koo);
    if ($(".clicker#test").data("test") != true) {
      if ($("#miniscreen").data("current") == "fid") {
        // FID
        var fid1 = $("#lbround").data("i");
        var fid2 = $("#lsround").data("i");
        var fid3 = $("#rbround").data("i");
        var fid4 = $("#rsround").data("i");
        ctx.drawImage($("#chr-v")[0], numPos.pos[0] * 0, 0, ...numPos.pos);
        ctx.drawImage($("#chr-d")[0], numPos.pos[0] * 1, 0, ...numPos.pos);
        ctx.drawImage($("#chr-a")[0], numPos.pos[0] * 2, 0, ...numPos.pos);
        ctx.drawImage(
          $("#chr-" + fid1)[0],
          numPos.pos[0] * 3,
          0,
          ...numPos.pos
        );
        ctx.drawImage(
          $("#chr-" + fid2)[0],
          numPos.pos[0] * 4,
          0,
          ...numPos.pos
        );
        ctx.drawImage(
          $("#chr-" + fid3)[0],
          numPos.pos[0] * 5,
          0,
          ...numPos.pos
        );
        ctx.drawImage(
          $("#chr-" + fid4)[0],
          numPos.pos[0] * 6,
          0,
          ...numPos.pos
        );
      } else if ($("#miniscreen").data("current") == "atc") {
        // ATC
        var atc1 = $("#lbround").data("i");
        var atc2 = $("#lsround").data("i");
        var atc3 = $("#rbround").data("i");
        var atc4 = $("#rsround").data("i");
        ctx.drawImage(
          $("#chr-" + atc1)[0],
          numPos.pos[0] * 2,
          0,
          ...numPos.pos
        );
        ctx.drawImage(
          $("#chr-" + atc2)[0],
          numPos.pos[0] * 3,
          0,
          ...numPos.pos
        );
        ctx.drawImage(
          $("#chr-" + atc3)[0],
          numPos.pos[0] * 4,
          0,
          ...numPos.pos
        );
        ctx.drawImage(
          $("#chr-" + atc4)[0],
          numPos.pos[0] * 5,
          0,
          ...numPos.pos
        );
      }
    } else {
      ctx.drawImage($("#miniscreen-test")[0], 0, 0, 385 * koo, 75 * koo);
    }
    window.requestAnimationFrame(draw);
  }
  draw();
});
