let cond = 1;
$(".clicker#mode").data("i", 4);
$(function () {
  $(".clicker.round").click(function () {
    $(".clicker#mode").data("newMode", true);
    if ($(this).attr("data-states") == "2") {
      $(this).toggleClass("state1 state3");
    } else {
      if ($(this).hasClass("state1")) {
        $(this).toggleClass("state1 state2");
      } else if ($(this).hasClass("state2")) {
        if (cond == 0) {
          $(this).toggleClass("state2 state3");
          cond = 1;
        } else if (cond == 1) {
          $(this).toggleClass("state2 state1");
          cond = 0;
        }
      } else if ($(this).hasClass("state3")) {
        $(this).toggleClass("state3 state2");
      }
    }
  });
  $(".clicker#mode").click(function (e) {
    $(this).data("newMode", true);
    var i = typeof $(this).data("i") != "undefined" ? $(this).data("i") : 0;
    if (e.pageX != 0 && e.pageY != 0) {
      if (e.pageX - $(this).offset().left < $(this).width() / 2 && i > 0) {
        i--;
      } else if (
        e.pageX - $(this).offset().left > $(this).width() / 2 &&
        i < 4
      ) {
        i++;
      }
      $(this).data("i", i);
    }
    switch (i) {
      case 0:
        $("#panel").css("background-image", 'url("./img/panel_stby.bmp")');
        break;
      case 1:
        $("#panel").css("background-image", 'url("./img/panel_alt_off.bmp")');
        break;
      case 2:
        $("#panel").css("background-image", 'url("./img/panel_tr.bmp")');
        break;
      case 3:
        $("#panel").css("background-image", 'url("./img/panel_ta.bmp")');
        break;
      case 4:
        $("#panel").css("background-image", 'url("./img/panel_tara.bmp")');
        break;
      default:
        throw new RangeError("i out of range [0..4]");
    }
  });
  $(".clicker.bround").click(function (e) {
    var intr =
      typeof $("#miniscreen").data("intr") != "undefined"
        ? $("#miniscreen").data("intr")
        : 0;
    if (intr == 0) {
      intr = window.setInterval(function () {
        if ($(".clicker#test").data("test") != true) {
          if ($("#miniscreen").data("current") == "fid") {
            $(".bulb#fid").toggleClass("hidden");
          } else if ($("#miniscreen").data("current") == "atc") {
            $(".bulb#atc").toggleClass("hidden");
          }
        }
      }, 500);
      $("#miniscreen").data("intr", intr);
    }
    var i = typeof $(this).data("i") != "undefined" ? $(this).data("i") : 0;
    if ($("#miniscreen").data("current") == "fid") {
      // Для FID режима: большая ручка меняет сотни, маленькая - тысячи
      var targetKnob = $(this);
      var knobId = $(this).attr("id");
      
      // Меняем местами логику для FID режима
      if (knobId == "lbround") {
        // Большая левая ручка - меняет сотни (lsround)
        targetKnob = $("#lsround");
      } else if (knobId == "lsround") {
        // Маленькая левая ручка - меняет тысячи (lbround)
        targetKnob = $("#lbround");
      } else if (knobId == "rbround") {
        // Большая правая ручка - меняет единицы (rsround)
        targetKnob = $("#rsround");
      } else if (knobId == "rsround") {
        // Маленькая правая ручка - меняет десятки (rbround)
        targetKnob = $("#rbround");
      }
      
      i = typeof targetKnob.data("i") != "undefined" ? targetKnob.data("i") : 0;
      if (e.pageX - $(this).offset().left < $(this).width() / 2 && i >= 0) {
        i--;
        if (i == -1) i = 9;
      } else if (
        e.pageX - $(this).offset().left > $(this).width() / 2 &&
        i <= 9
      ) {
        i++;
        if (i == 10) i = 0;
      }
      targetKnob.data("i", i);
    } else if ($("#miniscreen").data("current") == "atc") {
      if (e.pageX - $(this).offset().left < $(this).width() / 2 && i >= 0) {
        i--;
        if (i == -1) i = 7;
      } else if (
        e.pageX - $(this).offset().left > $(this).width() / 2 &&
        i <= 7
      ) {
        i++;
        if (i == 8) i = 0;
      }
      $(this).data("i", i);
    }
  });
  var testPressStartTime = null;
  var testLongPressTimeout = null;
  var testShortPressTimeout = null;
  
  $(".clicker#test").on("mousedown touchstart", function () {
    if ($(this).data("test") == true) return;
    testPressStartTime = new Date().getTime();
    $(".clicker#mode").data("newMode", true);
    
    // Очищаем предыдущие таймеры если есть
    if (typeof $(this).data("tid") != "undefined") {
      window.clearTimeout($(this).data("tid"));
    }
    if (testLongPressTimeout) {
      window.clearTimeout(testLongPressTimeout);
    }
    if (testShortPressTimeout) {
      window.clearTimeout(testShortPressTimeout);
    }
    
    // Таймер для длительного нажатия (8-12 секунд)
    testLongPressTimeout = window.setTimeout(function () {
      // Длительное нажатие - показываем тестовый паттерн на левом экране
      $(".clicker#test").data("longPress", true);
      // Устанавливаем флаг для отображения тестового паттерна на экране Radar/VSI
      $("#screen").data("testPattern", true);
    }, 10000); // 10 секунд
    
    // Короткое нажатие - обычный тест ламп
    $("#tcastest")[0].play();
    $(".clicker#test").data("test", true);
    setupBulbs();
    
    var tid = window.setTimeout(function () {
      $(".clicker#test").data("test", false);
      $(".clicker#test").data("longPress", false);
      $("#screen").data("testPattern", false);
      $("#tcastestok")[0].play();
      setupBulbs();
      $(".clicker#mode").click();
    }, 8000);
    $(this).data("tid", tid);
  });
  
  $(".clicker#test").on("mouseup mouseleave touchend touchcancel", function () {
    var pressDuration = testPressStartTime ? new Date().getTime() - testPressStartTime : 0;
    
    // Если нажатие было меньше 8 секунд, отменяем длительное нажатие
    if (pressDuration < 8000 && testLongPressTimeout) {
      window.clearTimeout(testLongPressTimeout);
      testLongPressTimeout = null;
    }
    
    // Если нажатие было больше 8 секунд, но меньше 12, длительное нажатие уже сработало
    if (pressDuration >= 8000 && pressDuration < 12000) {
      // Длительное нажатие уже обработано
    }
    
    testPressStartTime = null;
  });

  $(".clicker#switch").click(function () {
    if ($("#miniscreen").data("current") == "fid") {
      $("#miniscreen").data("current", "atc");
      $("#lbround").data("i", $("#lbround").data("atc"));
      $("#lsround").data("i", $("#lsround").data("atc"));
      $("#rbround").data("i", $("#rbround").data("atc"));
      $("#rsround").data("i", $("#rsround").data("atc"));
    } else if ($("#miniscreen").data("current") == "atc") {
      $("#miniscreen").data("current", "fid");
      $("#lbround").data("i", $("#lbround").data("fid"));
      $("#lsround").data("i", $("#lsround").data("fid"));
      $("#rbround").data("i", $("#rbround").data("fid"));
      $("#rsround").data("i", $("#rsround").data("fid"));
    }
    window.clearInterval($("#miniscreen").data("intr"));
    $("#miniscreen").data("intr", 0);
    setupBulbs();
  });
  $(".clicker#ent").click(function () {
    window.clearInterval($("#miniscreen").data("intr"));
    $("#miniscreen").data("intr", 0);
    setupBulbs();
    if ($("#miniscreen").data("current") == "fid") {
      $("#lbround").data("fid", $("#lbround").data("i"));
      $("#lsround").data("fid", $("#lsround").data("i"));
      $("#rbround").data("fid", $("#rbround").data("i"));
      $("#rsround").data("fid", $("#rsround").data("i"));
    } else if ($("#miniscreen").data("current") == "atc") {
      $("#lbround").data("atc", $("#lbround").data("i"));
      $("#lsround").data("atc", $("#lsround").data("i"));
      $("#rbround").data("atc", $("#rbround").data("i"));
      $("#rsround").data("atc", $("#rsround").data("i"));
    }
  });
  function setupBulbs() {
    if ($(".clicker#test").data("test") != true) {
      if ($("#miniscreen").data("current") == "fid") {
        $(".bulb").removeClass("hidden");
        $(".bulb#fid").addClass("hidden");
        $(".bulb#xpndr").addClass("hidden");
      } else if ($("#miniscreen").data("current") == "atc") {
        $(".bulb").removeClass("hidden");
        $(".bulb#atc").addClass("hidden");
        $(".bulb#xpndr").addClass("hidden");
      }
    } else {
      $(".bulb").addClass("hidden");
      $(".bulb#xpndr").removeClass("hidden");
    }
  }

  // init miniscreen current data
  $("#miniscreen").data("current", "fid");
  setupBulbs();
  // init FID
  $("#lbround").data("fid", 3);
  $("#lsround").data("fid", 4);
  $("#rbround").data("fid", 1);
  $("#rsround").data("fid", 8);
  // init i
  $("#lbround").data("i", $("#lbround").data("fid"));
  $("#lsround").data("i", $("#lsround").data("fid"));
  $("#rbround").data("i", $("#rbround").data("fid"));
  $("#rsround").data("i", $("#rsround").data("fid"));
  // init ATC
  $("#lbround").data("atc", 1);
  $("#lsround").data("atc", 3);
  $("#rbround").data("atc", 5);
  $("#rsround").data("atc", 7);

  $(".eman button").click(changeSpeed);
});

function changeSpeed() {
  var p = Entity.list.head;
  const tp = Entity.getTarget();
  const ep = Entity.getEnemy();
  for (; typeof p != "undefined" && p.data.id != "enemy"; p = p.next);
  switch ($(this).prop("id")) {
    case "incvs":
      if (p.data.ra < 20 / 60) {
        p.data.ra += 1 / 60;
        if (ep.checkState() === 3 && tp.ra > 0) {
          $("#tcasincclimb")[0].play();
        }
      }
      break;
    case "decvs":
      if (p.data.ra > -29 / 60) {
        p.data.ra -= 1 / 60;
        if (ep.checkState() === 3 && tp.ra < 0) {
          $("#tcasincdescend")[0].play();
        }
      }
      break;
    default:
      break;
  }
}

/* document.addEventListener("keypress", (e) => {
  if (e.code === "Space") {
    var p = Entity.list.head;
    console.log(p.data.ra);
    for (; typeof p != "undefined" && p.data.id != "enemy"; p = p.next);
    if (!e.ctrlKey) {
      if (p.data.ra < 20 / 60) {
        p.data.ra += 1 / 60;
      }
    } else {
      if (p.data.ra > -29 / 60) p.data.ra -= 1 / 60;
    }
  }
}); */
