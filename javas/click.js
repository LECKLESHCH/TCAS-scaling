"use strict";
let timer, timer2, timer3, timer4;
let turn = 0;
let cond = 0;
let pos = 0;
function turnUp() {
  let x = document.getElementById("dn1");
  if (turn < 70 && cond == 0) {
    turn += 5;
    x.style.transform = "rotate(" + (turn % 360) + "deg)";
  } else if (turn == 70 && cond == 0) {
    turn += 5;
    cond = 1;
    x.style.transform = "rotate(" + (turn % 360) + "deg)";
  } else if (turn > -70 && cond == 1) {
    turn -= 5;
    x.style.transform = "rotate(" + (turn % 360) + "deg)";
  } else if (turn == -70 && cond == 1) {
    turn -= 5;
    cond = 0;
    x.style.transform = "rotate(" + (turn % 360) + "deg)";
  }
}
function turnUp2() {
  let x = document.getElementById("dn2");
  if (turn < 70 && cond == 0) {
    turn += 5;
    x.style.transform = "rotate(" + (turn % 360) + "deg)";
  } else if (turn == 70 && cond == 0) {
    turn += 5;
    cond = 1;
    x.style.transform = "rotate(" + (turn % 360) + "deg)";
  } else if (turn > -70 && cond == 1) {
    turn -= 5;
    x.style.transform = "rotate(" + (turn % 360) + "deg)";
  } else if (turn == -70 && cond == 1) {
    turn -= 5;
    cond = 0;
    x.style.transform = "rotate(" + (turn % 360) + "deg)";
  }
}

function turn2() {
  let x = document.getElementById("dn3");
  if (pos == 0) {
    x.style.top = "0px";
    pos = 1;
  } else if (pos == 1) {
    x.style.top = "50px";
    pos = 2;
  } else if (pos == 2) {
    x.style.top = "100px";
    pos = 3;
  } else {
    x.style.top = "150px";
    pos = 0;
  }
}

function up2() {
  let x = document.getElementById("dn4");
  if (pos == 0) {
    x.style.top = "-50px";
    pos = 1;
  } else if (pos == 1) {
    x.style.top = "-100px";
    pos = 2;
  } else if (pos == 2) {
    x.style.top = "-150px";
    pos = 3;
  } else {
    x.style.top = "-200px";
    pos = 0;
  }
}

$(".button").bind("click", function () {
  var id = this.getAttribute("id");
  if (id == "up") {
    if (document.getElementById("dn1").getAttribute("value") == "0") {
      document.getElementById("dn1").style.visibility = "visible";
      document.getElementById("dn1").setAttribute("value", "1");

      timer = setInterval(turnUp, 200);
    } else {
      document.getElementById("dn1").style.visibility = "hidden";
      document.getElementById("dn1").setAttribute("value", "0");
      clearInterval(timer);
    }

    /*if(document.getElementById('a1').getAttribute('value')=='0')
			{
				document.getElementById('a1').style.color='red';
				document.getElementById('antena').style.color='red';
			
				document.getElementById('a1').setAttribute('value','1');
			}
			else
			{
				document.getElementById('a1').style.color='white';
				document.getElementById('antena').style.color='white';
				document.getElementById('a1').style.fontWeight='normal';
				document.getElementById('a1').setAttribute('value','0');
			}*/
  } else if (id == "up2") {
    if (document.getElementById("dn4").getAttribute("value") == "0") {
      document.getElementById("dn4").style.visibility = "visible";
      document.getElementById("dn4").setAttribute("value", "1");

      timer3 = setInterval(up2, 600);
    } else {
      document.getElementById("dn4").style.visibility = "hidden";
      document.getElementById("dn4").setAttribute("value", "0");
      clearInterval(timer3);
    }
  } else if (id == "down") {
    if (document.getElementById("dn3").getAttribute("value") == "0") {
      document.getElementById("dn3").style.visibility = "visible";
      document.getElementById("dn3").setAttribute("value", "1");

      timer2 = setInterval(turn2, 600);
    } else {
      document.getElementById("dn3").style.visibility = "hidden";
      document.getElementById("dn3").setAttribute("value", "0");
      clearInterval(timer2);
    }

    /*if(document.getElementById('a2').getAttribute('value')=='0')
			{
				document.getElementById('a2').style.color='red';
				document.getElementById('antena').style.color='red';
			
				document.getElementById('a2').setAttribute('value','1');
			}
			else
			{
				document.getElementById('a2').style.color='white';
				document.getElementById('antena').style.color='white';
				document.getElementById('a2').style.fontWeight='normal';
				document.getElementById('a2').setAttribute('value','0');
			}*/
  } else if (id == "down2") {
    if (document.getElementById("dn2").getAttribute("value") == "0") {
      document.getElementById("dn2").style.visibility = "visible";
      document.getElementById("dn2").setAttribute("value", "1");

      timer4 = setInterval(turnUp2, 200);
    } else {
      document.getElementById("dn2").style.visibility = "hidden";
      document.getElementById("dn2").setAttribute("value", "0");
      clearInterval(timer4);
    }

    /*if(document.getElementById('a2').getAttribute('value')=='0')
			{
				document.getElementById('a2').style.color='red';
				document.getElementById('antena').style.color='red';
			
				document.getElementById('a2').setAttribute('value','1');
			}
			else
			{
				document.getElementById('a2').style.color='white';
				document.getElementById('antena').style.color='white';
				document.getElementById('a2').style.fontWeight='normal';
				document.getElementById('a2').setAttribute('value','0');
			}*/
  } else if ((id = "light")) {
    if (document.getElementById("pc").getAttribute("value") == "0") {
      document.getElementById("pc").style.color = "red";
      document.getElementById("pc").setAttribute("value", "1");
    } else {
      document.getElementById("pc").style.color = "white";
      document.getElementById("pc").style.fontWeight = "normal";
      document.getElementById("pc").setAttribute("value", "0");
    }
  }
});
