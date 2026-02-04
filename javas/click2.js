"use strict";
let cond1 = 0;
let condition2 = 0;
let condition3 = 0;

let timer;
let timer2;
let timer3;
let height = 25.0;
let left = 21.0;

let left2 = 69.0;
let height2 = 21.0;

let left3 = 35.0;
let height3 = 55.0;

let left4 = 60.0;

let left5 = 22.0;
let height5 = 37.0;

let left6 = 71.0;
let height6 = 37.0;

let cond = 0;
let cond2 = 0;
let cond3 = 0;
function move1() {
  let x = document.getElementById("p1");
  let x2 = document.getElementById("p2");

  /*height=(height + 0.2);
	x.style.top = height + '%';*/

  if (left < 33) {
    left = left + 0.2;
    x.style.left = left + "%";

    left2 = left2 - 0.2;
    x2.style.left = left2 + "%";
  } else if (left > 33 && left < 33.2) {
    left = left + 0.2;
    x.style.left = left + "%";
    x.style.transform = "rotate(" + 30 + "deg)";

    left2 = left2 - 0.2;
    x2.style.left = left2 + "%";
    x2.style.transform = "rotate(" + -30 + "deg)";

    document.getElementById("audio").innerHTML =
      "<audio autoplay><source src='audio/descend.mp3' type='audio/mpeg'></audio>";
  } else if (left > 33.2 && left < 39) {
    left = left + 0.2;
    x.style.left = left + "%";
    height = height + 0.4;
    x.style.top = height + "%";

    left2 = left2 - 0.2;
    x2.style.left = left2 + "%";
    height2 = height2 + 0.4;
    x2.style.top = height2 + "%";
  } else if (left > 39 && left < 39.2) {
    x.style.transform = "rotate(" + 0 + "deg)";
    left = left + 0.2;
    x.style.left = left + "%";

    left2 = left2 - 0.2;
    x2.style.left = left2 + "%";
    height2 = height2 + 0.4;
    x2.style.top = height2 + "%";

    document.getElementById("audio").innerHTML =
      "<audio autoplay><source src='audio/climb.mp3' type='audio/mpeg'></audio>";
  } else if (left > 39.2 && left < 41) {
    left = left + 0.2;
    x.style.left = left + "%";

    left2 = left2 - 0.2;
    x2.style.left = left2 + "%";
    height2 = height2 + 0.4;
    x2.style.top = height2 + "%";
  } else if (left > 41 && left < 41.2) {
    x.style.transform = "rotate(" + -30 + "deg)";
    left = left + 0.2;
    x.style.left = left + "%";

    left2 = left2 - 0.2;
    x2.style.left = left2 + "%";
    height2 = height2 + 0.4;
    x2.style.top = height2 + "%";
  } else if (left > 41.2 && left < 46) {
    left = left + 0.2;
    x.style.left = left + "%";
    height = height - 0.4;
    x.style.top = height + "%";

    left2 = left2 - 0.2;
    x2.style.left = left2 + "%";
    height2 = height2 + 0.4;
    x2.style.top = height2 + "%";
  } else if (cond == 0) {
    document.getElementById("audio").innerHTML =
      "<audio autoplay><source src='audio/clear.mp3' type='audio/mpeg'></audio>";
    cond = 1;
  }
}

function move2() {
  let x3 = document.getElementById("p3");
  let x4 = document.getElementById("p4");

  if (left3 < 43) {
    left3 = left3 + 0.2;
    height3 = height3 - 0.3;
    x3.style.left = left3 + "%";
    x3.style.top = height3 + "%";

    left4 = left4 - 0.1;
    x4.style.left = left4 + "%";
  } else if (left3 > 43 && left3 < 43.2) {
    left3 = left3 + 0.2;
    x3.style.left = left3 + "%";
    height3 = height3 - 0.5;
    x3.style.top = height3 + "%";
    x3.style.transform = "rotate(" + 5 + "deg)";

    left4 = left4 - 0.2;
    x4.style.left = left4 + "%";

    document.getElementById("audio").innerHTML =
      "<audio autoplay><source src='audio/level.mp3' type='audio/mpeg'></audio>";
  } else if (left3 < 50) {
    left3 = left3 + 0.2;
    x3.style.left = left3 + "%";

    left4 = left4 - 0.2;
    x4.style.left = left4 + "%";
  } else if (cond2 == 0) {
    document.getElementById("audio").innerHTML =
      "<audio autoplay><source src='audio/clear.mp3' type='audio/mpeg'></audio>";
    cond2 = 1;
  }
}

function move3() {
  let x5 = document.getElementById("p5");
  let x6 = document.getElementById("p6");

  if (left5 < 30) {
    left5 = left5 + 0.2;
    x5.style.left = left5 + "%";

    left6 = left6 - 0.2;
    x6.style.left = left6 + "%";
  } else if (left5 > 30 && left5 < 30.2) {
    x5.style.transform = "rotate(" + -30 + "deg)";
    left5 = left5 + 0.2;
    x5.style.left = left5 + "%";

    x6.style.transform = "rotate(" + -30 + "deg)";
    left6 = left6 - 0.2;
    x6.style.left = left6 + "%";

    document.getElementById("audio").innerHTML =
      "<audio autoplay><source src='audio/descend.mp3' type='audio/mpeg'></audio>";
  } else if (left5 > 30.2 && left5 < 37) {
    left5 = left5 + 0.2;
    x5.style.left = left5 + "%";

    height5 = height5 - 0.3;
    x5.style.top = height5 + "%";

    left6 = left6 - 0.2;
    x6.style.left = left6 + "%";

    height6 = height6 + 0.3;
    x6.style.top = height6 + "%";
  } else if (left5 > 37 && left5 < 37.2) {
    x5.style.transform = "rotate(" + 0 + "deg)";
    left5 = left5 + 0.2;
    x5.style.left = left5 + "%";

    x6.style.transform = "rotate(" + 0 + "deg)";
    left6 = left6 - 0.2;
    x6.style.left = left6 + "%";

    document.getElementById("audio").innerHTML =
      "<audio autoplay><source src='audio/level.mp3' type='audio/mpeg'></audio>";
  } else if (left5 > 37.2 && left5 < 50) {
    if (cond3 == 6) {
      document.getElementById("audio").innerHTML =
        "<audio autoplay><source src='audio/clear.mp3' type='audio/mpeg'></audio>";
      cond3 = 7;
    } else {
      cond3 += 1;
    }
    x5.style.transform = "rotate(" + 15 + "deg)";
    left5 = left5 + 0.2;
    x5.style.left = left5 + "%";
    height5 = height5 + 0.1;
    x5.style.top = height5 + "%";

    x6.style.transform = "rotate(" + 10 + "deg)";
    left6 = left6 - 0.2;
    x6.style.left = left6 + "%";
    height6 = height6 - 0.1;
    x6.style.top = height6 + "%";
  }
}

$(".butsit").bind("click", function () {
  if (this.getAttribute("id") == "sit1" && cond1 == 0) {
    timer = setInterval(move1, 200);
    document.getElementById("p1").style.visibility = "visible";
    document.getElementById("p2").style.visibility = "visible";
    document.getElementById("pic1").style.visibility = "visible";

    clearInterval(timer2);
    document.getElementById("p3").style.visibility = "hidden";
    document.getElementById("p4").style.visibility = "hidden";
    document.getElementById("pic2").style.visibility = "hidden";

    height3 = 55.0;
    left3 = 35.0;

    left4 = 60.0;
    document.getElementById("p3").style.transform = "rotate(" + -30 + "deg)";

    cond2 = 0;
    condition2 = 0;
    clearInterval(timer3);
    document.getElementById("p5").style.visibility = "hidden";
    document.getElementById("p5").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("p6").style.visibility = "hidden";
    document.getElementById("p6").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("pic3").style.visibility = "hidden";

    height5 = 37.0;
    left5 = 22.0;

    height6 = 37.0;
    left6 = 71.0;

    cond3 = 0;
    condition3 = 0;

    cond1 = 1;
  } else if (this.getAttribute("id") == "sit1" && cond1 == 1) {
    clearInterval(timer);
    document.getElementById("p1").style.visibility = "hidden";
    document.getElementById("p1").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("p2").style.visibility = "hidden";
    document.getElementById("p2").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("pic1").style.visibility = "hidden";
    height = 25.0;
    left = 21.0;
    left2 = 69.0;
    height2 = 21.0;

    cond = 0;
    cond1 = 0;
  } else if (this.getAttribute("id") == "sit2" && condition2 == 0) {
    timer2 = setInterval(move2, 200);

    document.getElementById("p3").style.visibility = "visible";
    document.getElementById("p4").style.visibility = "visible";
    document.getElementById("pic2").style.visibility = "visible";

    clearInterval(timer);
    document.getElementById("p1").style.visibility = "hidden";
    document.getElementById("p1").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("p2").style.visibility = "hidden";
    document.getElementById("p2").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("pic1").style.visibility = "hidden";

    height = 25.0;
    left = 21.0;
    left2 = 69.0;
    height2 = 21.0;

    cond = 0;
    cond1 = 0;
    clearInterval(timer3);
    document.getElementById("p5").style.visibility = "hidden";
    document.getElementById("p5").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("p6").style.visibility = "hidden";
    document.getElementById("p6").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("pic3").style.visibility = "hidden";

    height5 = 37.0;
    left5 = 22.0;

    height6 = 37.0;
    left6 = 71.0;

    cond3 = 0;
    condition3 = 0;

    condition2 = 1;
  } else if (this.getAttribute("id") == "sit2" && condition2 == 1) {
    clearInterval(timer2);

    document.getElementById("p3").style.visibility = "hidden";
    document.getElementById("p4").style.visibility = "hidden";
    document.getElementById("pic2").style.visibility = "hidden";

    height3 = 55.0;
    left3 = 35.0;

    left4 = 60.0;
    document.getElementById("p3").style.transform = "rotate(" + -30 + "deg)";

    cond2 = 0;
    condition2 = 0;
  } else if (this.getAttribute("id") == "sit3" && condition3 == 0) {
    timer3 = setInterval(move3, 200);

    document.getElementById("p5").style.visibility = "visible";
    document.getElementById("p6").style.visibility = "visible";
    document.getElementById("pic3").style.visibility = "visible";

    clearInterval(timer);
    document.getElementById("p1").style.visibility = "hidden";
    document.getElementById("p1").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("p2").style.visibility = "hidden";
    document.getElementById("p2").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("pic1").style.visibility = "hidden";

    height = 25.0;
    left = 21.0;
    left2 = 69.0;
    height2 = 21.0;

    cond = 0;
    cond1 = 0;

    clearInterval(timer2);
    document.getElementById("p3").style.visibility = "hidden";
    document.getElementById("p4").style.visibility = "hidden";
    document.getElementById("pic2").style.visibility = "hidden";

    height3 = 55.0;
    left3 = 35.0;

    left4 = 60.0;
    document.getElementById("p3").style.transform = "rotate(" + -30 + "deg)";

    cond2 = 0;
    condition2 = 0;

    condition3 = 1;
  } else if (this.getAttribute("id") == "sit3" && condition3 == 1) {
    clearInterval(timer3);

    document.getElementById("p5").style.visibility = "hidden";
    document.getElementById("p5").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("p6").style.visibility = "hidden";
    document.getElementById("p6").style.transform = "rotate(" + 0 + "deg)";
    document.getElementById("pic3").style.visibility = "hidden";

    height5 = 37.0;
    left5 = 22.0;

    height6 = 37.0;
    left6 = 71.0;

    cond3 = 0;
    condition3 = 0;
  }
});
