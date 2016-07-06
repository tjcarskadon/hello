module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const AccessToken = Nodal.require('app/models/access_token.js');

  class AccessTokensController extends Nodal.Controller {

    get() {
      AccessToken.logout(this.params, (err, accessToken) => {
        this.respond(err || accessToken);
      });
    }

    create() {
      AccessToken.login(this.params, (err, accessToken) => {
        this.respond(err || accessToken);
      })
    }
    
    destroy() {
      AccessToken.logout(this.params, (err, accessToken) => {
        this.respond(err || accessToken);
      });
    }
  }
  return AccessTokensController;

})();
