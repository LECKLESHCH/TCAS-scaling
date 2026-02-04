var Entity = {
  list: new LinkedList(),
  tick: function () {
    for (var c = this.list.head; typeof c != "undefined"; c = c.next) {
      if (c.data.ended()) {
        c.delete();
        window.location.reload();
        switch (c.data.id) {
          case "above":
            this.spawnAbv();
            break;
          case "below":
            this.spawnBlw();
            break;
          case "enemy":
            this.spawnEnemy();
            var t;
            for (
              t = this.list.head;
              typeof t != "undefined" && t.data.id != "target";
              t = t.next
            );
            t.delete();
            this.spawnTarget();
            break;
          case "target":
            this.spawnTarget();
            var t;
            for (
              t = this.list.head;
              typeof t != "undefined" && t.data.id != "enemy";
              t = t.next
            );
            t.delete();
            this.spawnEnemy();
            break;
        }
      }
    }
    for (var c = this.list.head; typeof c != "undefined"; c = c.next) {
      c.data.tick();
    }
  },
  draw: function (ctx) {
    for (var c = this.list.head; typeof c != "undefined"; c = c.next) {
      c.data.draw(ctx);
    }
  },
  getTarget: function () {
    var ret;
    for (
      ret = this.list.head;
      typeof ret != "undefined" && ret.data.id != "target";
      ret = ret.next
    );
    if (typeof ret != "undefined") return ret.data;
  },
  getEnemy: function () {
    var ret;
    for (
      ret = this.list.head;
      typeof ret != "undefined" && ret.data.id != "enemy";
      ret = ret.next
    );
    if (typeof ret != "undefined") return ret.data;
  },
  spawnAbv: function () {
    var abvp = new Plane();
    abvp.id = "above";
    abvp.alt = 1828; //1828
    abvp.y = 37040 * Math.random() - 18520;
    abvp.vectorY = (37040 * Math.random() - 18520 - abvp.y) / (80000 / 16);
    if (Math.random() > 0.5) {
      abvp.x = 37040;
      abvp.vectorX = -840 / 3.6 / 60;
    } else {
      abvp.x = 0;
      abvp.vectorX = 840 / 3.6 / 60;
    }
    this.list.push(abvp);
  },
  spawnBlw: function () {
    var blwp = new Plane();
    blwp.id = "below";
    blwp.alt = 0;
    blwp.y = 37040 * Math.random() - 18520;
    blwp.vectorY = (37040 * Math.random() - 18520 - blwp.y) / (80000 / 16);
    if (Math.random() > 0.5) {
      blwp.x = 37040;
      blwp.vectorX = -840 / 3.6 / 60;
    } else {
      blwp.x = 0;
      blwp.vectorX = 840 / 3.6 / 60;
    }
    Entity.list.push(blwp);
  },
  spawnEnemy: function () {
    var ep = new Plane();
    ep.id = "enemy";
    ep.alt = 1050; // + (Math.random() - 0.5) * 200;
    ep.y = 0;
    ep.vectorY = 0;
    ep.x = 0;
    ep.vectorX = 840 / 3.6 / 60;
    // ep.vectorX = 840 * 5 / 3.6 / 60;
    Entity.list.push(ep);
  },
  spawnTarget: function () {
    var tp = new Plane();
    tp.id = "target";
    tp.alt = 1050; // + (Math.random() - 0.5) * 200;
    tp.y = 0;
    tp.vectorY = 0;
    tp.x = 37040;
    tp.vectorX = -840 / 3.6 / 60;
    // tp.vectorX = -840 * 5 / 3.6 / 60;
    // tp.ra = -8;
    Entity.list.push(tp);
  },
};

$(function () {
  Entity.spawnAbv();
  Entity.spawnBlw();
  Entity.spawnTarget();
  Entity.spawnEnemy();
});
