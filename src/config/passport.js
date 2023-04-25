const passport = require('passport');    
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne( { email: email } );
    
    if(!user) {
        return done( null, false, { message: 'Not User found' } )
    } else {
        const match = await user.matchPassword(password);

        if(match) {
            return done (null, user)
        } else {
            return done(null, false, { message: 'Incorrect Password' });
        }
    }
}));

passport.serializeUser( ( user, done ) => {
    done( null, user.id );
});

// passport.deserializeUser( function (id, done) {
//     User.findById(id, function (err, user) {
//         return done(err, user)
//     })
// });

// passport.deserializeUser(function(user, cb) {
//     process.nextTick(function() {
//       return cb(null, user);
//     });
//   });

  passport.deserializeUser((id, done) => {
    User.findOne({_id : id})
      .then(user => done(null, user))
      .catch(err => done(err));
  });
