module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const AccesToken = Nodal.require('app/models/access_token.js');

  class AuthController extends Nodal.Controller {

    authorize(callback) {

      this.setHeader('Cache-Control', 'no-store');
      this.setHeader('Pragma', 'no-cache');
      AccesToken.verify(this.params, callback);

    }

  }

  return AuthController;

})();
