module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Gesture = Nodal.require('app/models/gesture.js');

  class GesturesController extends Nodal.Controller {

    index() {

      Gesture.query()
        .where(this.params.query)
        .end((err, models) => {

          this.respond(err || models);

        });

    }

    show() {

      Gesture.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      Gesture.create(this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      Gesture.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      Gesture.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return GesturesController;

})();
