function Plane() {
  const { koo } = scaleView(1);
  this.id = "UNNAMED";
  // this.alt = Math.random() * 220 + 25;
  this.alt = 914; //914
  // this.startY = -135 + Math.random() * 270; // [-135 .. 135]
  // this.vectorY = -135 + Math.random() * 270;
  // this.startY = 0; // [-135 .. 135]
  this.vectorY = 0;
  // this.startX = 0;
  this.vectorX = 840 / 60; // 840 / 60
  this.x = 0;
  this.y = 0;
  this.vertSpeed = 0;
  this.ra = 0;
  this.trig3 = false;
  this.playedNorm = false;
  this.playedInc = false;
  this.playedNow = false;
  this.playedTr = false;
  this.playedClr = false;
  this.countRA = 0;
  this.crashed = false;
  this.crashedTimer = 0;

  this.distance;
  this.flag = true;
  this.flagY = true;
  this.dist = 0;
  this.distY = 0;

  this.draw = function (ctx) {
    ctx.save();
    var s;
    if ($(".clicker#range").hasClass("state1")) {
      s = 40 / 40;
    } else if ($(".clicker#range").hasClass("state2")) {
      s = 40 / 40;
    } else if ($(".clicker#range").hasClass("state3")) {
      s = 40 / 40;
    }
    //ctx.translate((this.x - 50 * this.scaling()) / this.scaling(), (this.alt - 50 * this.scaling()) / this.scaling());
    ctx.translate(868 * koo, 351 * koo);
    ctx.scale(s, s);
    ctx.translate(-(868 * koo), -(351 * koo));
    ctx.translate(
      (this.x / 37040) * (1737 * koo),
      650 * koo - (this.alt / 1828) * 600 * koo
    );
    // ------------>>>>>>>
    /* var et = Entity.getTarget();
    this.dist = this.flag ? et.x - this.x : this.dist;
    this.distY = this.flagY ? et.alt - this.alt : this.distY;
    this.flag = this.checkState() === 3 ? false : true;
    this.flagY = this.checkState() === 2 ? false : true;
    ctx.fillStyle = "#FFFFFF";
    const fsize = 13;
    ctx.font = `${fsize}px Arial`;
    const { id, dist, distY, x, alt, ra } = this;
    const tabloArr = [
      { n: "id", v: id },
      { n: "dist", v: Math.round(dist) },
      { n: "distY", v: distY },
      { n: "x", v: Math.round(x) },
      { n: "alt", v: alt },
      { n: "ra", v: ra },
      { n: "st", v: null },
    ];

    tabloArr.forEach((v, i) => {
      ctx.fillText(
        `${v.n}: ${v.n === "st" ? this.checkState() : v.v}`,
        50,
        i * (fsize + 1) * -1 + 10
      );
    }); */
    /* ctx.scale(
      this.startX > this.vectorX ? -1 / this.scaling() : 1 / this.scaling(),
      1 / this.scaling()
    ); */
    // ------------>>>>>>>
    ctx.scale(
      this.vectorX < 0 && this.id != "target"
        ? -1 / this.scaling()
        : 1 / this.scaling(),
      1 / this.scaling()
    );
    // ctx.scale(1 / this.scaling(), 1 / this.scaling()); //else {
    if (this.id == "target") {
      if (Math.abs(this.vertSpeed) > 0.001) {
        ctx.rotate(-((60 * -this.vertSpeed * Math.PI) / 180));
      }
      ctx.drawImage(
        $("#modulation-plane-t")[0],
        -(18 * koo),
        -(15 * koo),
        200 * koo,
        90 * koo
      );
    } else {
      if (this.id === "enemy") {
        const tp = Entity.getTarget();

        if (Math.abs(this.vertSpeed) > 0.001) {
          ctx.rotate(-((60 * this.vertSpeed * Math.PI) / 180));
        }
        /* if (Math.abs(tp.vertSpeed) > 0.001) {
          ctx.rotate((60 * tp.vertSpeed * Math.PI) / 180);
        } */
      }

      ctx.drawImage(
        $("#modulation-plane")[0],
        -(150 * koo),
        0,
        172 * koo,
        80 * koo
      );
    }
    // }
    if (this.crashed) {
      ctx.drawImage(
        $("#modulation-explosion")[0],
        -(110 * koo),
        -(30 * koo),
        200 * koo,
        200 * koo
      ); // -30, -30, 200, 200
    }
    //ctx.fillRect(0, 0, 10, 10);
    ctx.restore();
    ctx.resetTransform();
    /*         ctx.fillText(this.x, 5, 15);
        ctx.fillText(this.startX, 5, 25);
        ctx.fillText(this.vectorX, 5, 35);
        ctx.fillText(this.y, 5, 45);
        ctx.fillText(this.startY, 5, 55);
        ctx.fillText(this.vectorY, 5, 65);
        ctx.fillText(this.scaling(), 5, 75); */
  };
  this.tick = function () {
    var e = Entity.getEnemy();
    const te = Entity.getTarget();
    var dy = e.alt - this.alt;
    if (e.checkState() == 4 || this.crashed) {
      // CRASHED
      if (this.id == "target" || this.id == "enemy") {
        this.crashed = true;
        e.crashed = true;
        if (this.crashedTimer == 0) this.crashedTimer = new Date().getTime();
        if (new Date().getTime() - this.crashedTimer >= 1000) {
          // DELETE
          this.x = -100;
          this.alt = -100;
        }
      }
    } else {
      // NOT CRASHED
      if (e.checkState() == 3) this.trig3 = true;
      if (e.checkState() == 3 && $(".clicker#mode").data("i") == 4) {
        // TA/RA && GREY ZONE

        if (this.id == "target") {
          const unn = 36;
          const ratioRa = [13 / unn, 5 / unn, 8 / unn];
          if (Math.abs(e.vertSpeed) > 10 / 60) {
            if (
              Math.sign(e.alt - this.alt) ==
                -Math.sign(e.vertSpeed - this.vertSpeed) ||
              this.playedNow
            ) {
              // C/D NOW
              if (e.vertSpeed > 0) {
                this.ra = -ratioRa[0];
                if (!this.playedNow && this.id == "target") {
                  this.playedNow = true;
                  $("#tcasnowdescend")[0].play();
                }
              } else {
                this.ra = ratioRa[0];
                if (!this.playedNow && this.id == "target") {
                  this.playedNow = true;
                  $("#tcasnowclimb")[0].play();
                }
              }
            } else if (Math.sign(e.vertSpeed) == Math.sign(this.vertSpeed)) {
              //INC C/D
              this.ra = ratioRa[0];
              if (this.alt < e.alt) this.ra = -this.ra;
              if (!this.playedInc && this.id == "target") {
                this.playedInc = true;
                if (this.ra > 0) {
                  setTimeout(() => {
                    $("#tcasincclimb")[0].play();
                  }, 1000);
                } else {
                  setTimeout(() => {
                    $("#tcasincdescend")[0].play();
                  }, 1000);
                }
              }
            }
          } else {
            if (
              Math.abs(e.vertSpeed) > ratioRa[1] &&
              Math.sign(e.vertSpeed) == Math.sign(this.vertSpeed)
            ) {
              // INC C/D
              this.ra = ratioRa[0];
              if (this.alt < e.alt) this.ra = -this.ra;
              if (!this.playedInc && this.id == "target") {
                this.playedInc = true;
                if (this.ra > 0) {
                  setTimeout(() => {
                    $("#tcasincclimb")[0].play();
                  }, 1000);
                } else {
                  setTimeout(() => {
                    $("#tcasincdescend")[0].play();
                  }, 1000);
                }
              }
            } else if (
              Math.abs(e.vertSpeed) >=
              0 /*   && Math.sign(e.vertSpeed) == Math.sign(this.vertSpeed) */
            ) {
              // C/D
              this.ra = ratioRa[2];
              if (this.alt < e.alt) this.ra = -this.ra;
              if (!this.playedNorm && this.id == "target") {
                this.playedNorm = true;
                if (this.ra > 0) {
                  $("#tcasclimb")[0].play();
                  if (e.ra > 0) {
                    setTimeout(() => {
                      $("#tcasincclimb")[0].play();
                    }, 1000);
                  }
                } else {
                  $("#tcasdescend")[0].play();
                  if (e.ra < 0) {
                    setTimeout(() => {
                      $("#tcasincdescend")[0].play();
                    }, 1000);
                  }
                }
              }
            }
            // if (this.alt < e.alt) this.ra = - this.ra;
          }
        }
        if (this.id == "enemy" && this.ra === 0) {
          const unn = 36;
          const ratioRa = [13 / unn, 5 / unn, 8 / unn];
          if (Math.abs(te.vertSpeed) > 10 / 60) {
            if (
              Math.sign(te.alt - this.alt) ==
                -Math.sign(te.vertSpeed - this.vertSpeed) ||
              this.playedNow
            ) {
              // C/D NOW
              if (te.vertSpeed > 0) {
                this.ra = -ratioRa[0];
                if (!this.playedNow && this.id == "target") {
                  this.playedNow = true;
                  $("#tcasnowdescend")[0].play();
                }
              } else {
                this.ra = ratioRa[0];
                if (!this.playedNow && this.id == "target") {
                  this.playedNow = true;
                  $("#tcasnowclimb")[0].play();
                }
              }
            } else if (Math.sign(te.vertSpeed) == Math.sign(this.vertSpeed)) {
              //INC C/D
              this.ra = ratioRa[0];
              if (this.alt < te.alt) this.ra = -this.ra;
              if (!this.playedInc && this.id == "target") {
                this.playedInc = true;
                if (this.ra > 0) {
                  $("#tcasincclimb")[0].play();
                } else {
                  $("#tcasincdescend")[0].play();
                }
              }
            }
          } else {
            if (
              Math.abs(te.vertSpeed) > ratioRa[1] &&
              Math.sign(te.vertSpeed) == Math.sign(this.vertSpeed)
            ) {
              // INC C/D
              this.ra = ratioRa[0];
              if (this.alt < te.alt) this.ra = -this.ra;
              if (!this.playedInc && this.id == "target") {
                this.playedInc = true;
                if (this.ra > 0) {
                  $("#tcasincclimb")[0].play();
                } else {
                  $("#tcasincdescend")[0].play();
                }
              }
            } else if (
              Math.abs(te.vertSpeed) >=
              0 /*   && Math.sign(e.vertSpeed) == Math.sign(this.vertSpeed) */
            ) {
              // C/D
              this.ra = ratioRa[2];
              if (this.alt < te.alt) this.ra = -this.ra;
              if (!this.playedNorm && this.id == "target") {
                this.playedNorm = true;
                if (this.ra > 0) {
                  $("#tcasclimb")[0].play();
                  if (te.ra > 0) {
                    setTimeout(() => {
                      $("#tcasincclimb")[0].play();
                    }, 1000);
                  }
                } else {
                  $("#tcasdescend")[0].play();
                  if (te.ra < 0) {
                    setTimeout(() => {
                      $("#tcasincdescend")[0].play();
                    }, 1000);
                  }
                }
              }
            }
            // if (this.alt < e.alt) this.ra = - this.ra;
          }
        }
      } else if (e.checkState() == 2) {
        if (this.trig3) this.ra = 0;
        if ($(".clicker#mode").data("i") >= 3) {
          if (!this.playedClr && this.trig3) {
            setTimeout(() => {
              $("#tcasclear")[0].play();
            }, 3500);
            this.playedClr = true;
          }
          if (!this.playedTr && !this.trig3) {
            $("#tcastraffic")[0].play();
            this.playedTr = true;
          }
        }
      }
      if (this.ra >= this.vertSpeed) {
        this.vertSpeed = Math.min(this.ra, this.vertSpeed + 1 / 5 / 60);
      } else {
        this.vertSpeed = Math.max(this.ra, this.vertSpeed - 1 / 5 / 60);
      }
      // this.vertSpeed = Math.sign(this.vertSpeed) * Math.min(Math.abs(this.ra), Math.abs(this.vertSpeed + 1 / 2 / 60));
      // if (this.id == "enemy") {
      // if
      // }
      // if (this.id == "target") {
      // if ($(".eman #auto").prop("checked")) {
      // this.vertSpeed = -e.vertSpeed;
      // } else {
      // if (Math.abs(this.vertSpeed - e.vertSpeed) < 8/60) {
      // this.vertSpeed = 8/60 * Math.sign(e.vertSpeed) + e.vertSpeed;
      // if (this.vertSpeed > 0) {
      // if ($("#tcas-inc-climb").data)
      // } else {

      // }
      // } else if (Math.abs) {
      // }
      // }
      // }
      // if ($(".eman #auto").prop("checked")) {
      // if (this.checkState() >= 3) {
      // if (this.alt > 135) {
      // this.vertSpeed = Math.min(5 / 60, this.vertSpeed + 5 / 60);
      // this.alt += this.vertSpeed;
      // } else {
      // this.vertSpeed = Math.max(-5 / 60, this.vertSpeed - 5 / 60);
      // this.alt += this.vertSpeed;
      // }
      // } else if (this.vertSpeed != 0) {
      // if (this.vertSpeed > 0) {
      // this.vertSpeed = Math.max(0, this.vertSpeed - 5 / 60);
      // this.alt += this.vertSpeed;
      // } else {
      // this.vertSpeed = Math.min(0, this.vertSpeed + 5 / 60);
      // this.alt += this.vertSpeed;
      // }
      // }
      // }
      const ee = Entity.getEnemy();
      const et = Entity.getTarget();
      this.distance = et.x - ee.x;
      const acelList = [5, 4, 2, 1];
      //let acel = this.distance > 10000 ? 5 : 1;
      let acel = acelList[ee.checkState()];
      this.x += this.vectorX * acel;
      // Для Situation 1: убеждаемся, что самолет target следует строго горизонтальной траектории по y
      if (this.id == "target") {
        // Сохраняем y = 0 для горизонтального движения
        this.y = 0;
        this.vectorY = 0;
      } else {
        this.y += this.vectorY;
      }
      this.alt += this.vertSpeed * 8;
    }
    if (this.id == "enemy")
      $(".mrow-a #vsval").text(Math.round(this.vertSpeed * 60));

    /* console.log({
      id: this.id,
      vertSpeed: this.vertSpeed,
      alt: this.alt,
      ra: this.ra,
      distance: this.distance,
    }); */
  };
  this.scaling = function () {
    //return (0.5 + this.y / 270);
    return Math.pow(2, this.y / 18520);
  };
  // this.onScreen = function() {
  // return !(this.x > (770 + 50 * this.scaling()) || this.x < (0 - 50 * this.scaling()) ||
  // this.y > 135 || this.y < -135 ||
  // this.alt > (270 + 50 * this.scaling()) || this.alt < (0 - 50 * this.scaling()));
  // if (this.startX < this.vectorX || this.startY < this.vectorY) {
  // if (this.x > this.vectorX || this.y > this.vectorY) {
  // return false;
  // }
  // } else {
  // if (this.x < this.vectorX || this.y < this.vectorY) {
  // return false;
  // }
  // }
  // return true;
  // return (this.x >= -100 && this.x <= 870)
  // }
  this.ended = function () {
    /* console.log(Math.abs(this.x - 18520), 18520);
    console.log(Math.abs(this.y), 18520);
    console.log(Math.abs(this.alt - 914), 914); */
    if (
      Math.abs(this.x - 18520) > 18520 ||
      Math.abs(this.y) > 18520 ||
      Math.abs(this.alt - 914) > 914 ||
      isNaN(Math.abs(this.x - 18520))
    ) {
      window.location.reload();
      return true;
    }
    return false;
  };
  this.checkState = function () {
    var e = Entity.getTarget();
    if (!(e instanceof Plane)) throw "no enemy aircraft in entities";
    var x = e.x - this.x;
    var y = e.y - this.y;
    var z = e.alt - this.alt;
    // if (Math.pow(x, 2)/Math.pow(20, 2) + Math.pow(y, 2)/Math.pow(18, 2) + Math.pow(z, 2)/Math.pow(6, 2) <= 1)
    if (
      Math.pow(x, 2) / Math.pow(20, 2) +
        Math.pow(y, 2) / Math.pow(18, 2) +
        Math.pow(z, 2) / Math.pow(18, 2) <=
      1
    )
      return 4;
    if (
      Math.pow(x - 1458, 2) / Math.pow(4375, 2) +
        Math.pow(y, 2) / Math.pow(1750, 2) +
        Math.pow(z, 2) / Math.pow(4000, 2) <=
        1 &&
      Math.abs(z) <= 213
    )
      return 3;
    if (
      Math.pow(x - 2333, 2) / Math.pow(7000, 2) +
        Math.pow(y, 2) / Math.pow(2800, 2) + // 2800
        Math.pow(z, 2) / Math.pow(4000, 2) <=
        1 &&
      Math.abs(z) <= 259
    )
      return 2;
    if (
      Math.pow(x - 4666, 2) / Math.pow(14000, 2) +
        Math.pow(y, 2) / Math.pow(5600, 2) +
        Math.pow(z, 2) / Math.pow(4000, 2) <=
        1 &&
      Math.abs(z) <= 365
    )
      return 1;
    if (
      Math.pow(x - 12346, 2) / Math.pow(37040, 2) +
        Math.pow(y, 2) / Math.pow(37040, 2) +
        Math.pow(z, 2) / Math.pow(4000, 2) <=
        1 &&
      (Math.abs(z) <= 822 ||
        ($(".clicker#angle").hasClass("state3") && z >= -822 && z <= 2123) ||
        ($(".clicker#angle").hasClass("state1") && z >= -2123 && z <= 822))
    )
      return 0;
    return -1;
  };
}
