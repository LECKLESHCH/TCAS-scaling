function LinkedListNode(list, prev, next, data) {
  this.list = list;
  this.prev = prev;
  this.next = next;
  this.data = data;
  this.delete = function () {
    if (typeof this.prev != "undefined") {
      if (typeof this.next != "undefined") {
        this.prev.next = this.next;
        this.next.prev = this.prev;
      } else {
        this.prev.next = undefined;
      }
    } else {
      if (typeof this.next != "undefined") {
        this.next.prev = undefined;
        // this.next.list = this.list;
        this.list.head = this.next;
      } else {
        this.list.head = undefined;
      }
    }
  };
}

function LinkedList() {
  this.head = undefined;
  this.push = function (data) {
    if (typeof this.head == "undefined") {
      this.head = new LinkedListNode(this, undefined, undefined, data);
      // this.head.list = this;
    } else {
      var cur = this.head;
      for (; typeof cur.next != "undefined"; cur = cur.next);
      cur.next = new LinkedListNode(this, cur, undefined, data);
    }
  };
}
