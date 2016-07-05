var express = require('express');
var app = express();

var passport = require('passport');
var GoogleStrat = require('passport-google-oauth').OAuth2Strategy;


var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 8080;
var googleCB = 'http://'+host+':'+port+'/auth/google/callback';

var GOOGLE_CLIENT_ID = require('./auth.config.js').CLIENT_ID;

var GOOGLE_CLIENT_SECRET = require('./auth.config.js').CLIENT_SECRET;


passport.use(new GoogleStrat({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: googleCB
},
function(accessToken, refreshToken, profile, done) {
  console.log(accessToken, refreshToken, profile);
  done();
  }
));

app.use(passport.initialize());


app.get('/auth/google', passport.authenticate('google', {scope: 'profile email'}));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/spell'}),
  function(req, res) {
    //sucess redirect
    res.redirect('http://localhost:3000/profile');
  }
);



app.listen(8080, () => { console.log('connected to 8080...')});
