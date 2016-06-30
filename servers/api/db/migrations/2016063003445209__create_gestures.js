module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateGestures extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016063003445209;
    }

    up() {

      return [
        this.createTable("gestures", [{"name":"name","type":"string"},{"name":"data","type":"json"},{"name":"user_id","type":"int"}])
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
