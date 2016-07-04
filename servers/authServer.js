var express = require('express');
var app = express();

var passport = require('passport');
var GoogleStrat = require('passport-google-oauth').OAuth2Strategy;


var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 8080;
var googleCB = 'http://'+host+':'+port+'/auth/google/callback';

var GOOGLE_CLIENT_ID = '1072649245876-1k3snsueieqli6n4k4jrbbgdb4d0mah8.apps.googleusercontent.com';

var GOOGLE_CLIENT_SECRET = '9o3r_FKDUewLK-NHVLDi4WA5';


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
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/welcome'}),
  function(req, res) {
    //sucess redirect
    res.redirect('http://localhost:3000/profile');
  }
);



app.listen(8080, () => { console.log('connected to 8080...')});
