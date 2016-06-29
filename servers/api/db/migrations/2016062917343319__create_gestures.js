module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateGestures extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016062917343319;
    }

    up() {

      return [
        this.createTable("gestures", [{"name":"name","type":"string"},{"name":"data","type":"json"}])
      ];

    }

    down() {

      return [
        this.dropTable("gestures")
      ];

    }

  }

  return CreateGestures;

})();
