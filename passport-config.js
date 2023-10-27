// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt')

// function initialize(passport , getUserByEmail , getUserByName) {
//      const authenticateUser = async (username , email , password , done) => {
//         const user = getUserByName(username)
//         const userEmail = getUserByEmail(email)
//         if((user == null) || (email == null)) {
//             return done(null , false , {message: 'User not found'})
//         }
        
//         try {
//             if (await bcrypt.compare(password, user.password)) {
//                 return done(null , user)
//             }
//         else {
//             return done(null , false , {message: 'Password Incorrect'})
//         }
//         } catch(e) {          
//             return done(e);
//         }
//      }
//      passport.use(new LocalStrategy({usernameField: 'usernameOremail'}), authenticateUser)
//      passport.serializeUser((user , done) => {      })
//      passport.deserializeUser((id , done) => {      })
// }

// module.exports = initialize;

const LocalStrategy = require("passport-local").Strategy;
const client = require('../../db');
const bcrypt = require("bcrypt");

function initialize(passport) {

    const authenticateUser = (username , password , done)=> {

        client.query(
            "SELECT * FROM users WHERE username = $1",
            [username],
            (err , results) => {
                if(err) {
                    throw err;
                }

                console.log(results.rows);

                if(results.rows.length > 0){
                     const user = results.rows[0];
                     bcrypt.compare[password , user.password , (err, isMatch) => {
                        if(err) {
                            throw err;
                        }
                        
                        if(isMatch){
                            return done(null , user);
                        } else {
                            return done(null , false , {message: "Password is not correct"})
                        }
                     }]
                }
                else {
                    return done(null , false , {message: "User does not exist"});
                }
            }
        )
    }

    passport.use(new LocalStrategy ( {
        usernameField: "email",
        passwordField: "password"
    },
    authenticateUser
        )
    );

    passport.serializeUser((user , done) => done(null , user.id));

    passport.deserializeUser((id , done) => {
        client.query(
            "SELECT * FROM users WHERE id = $1" , [id] , (err, results) => {
                if(err) {
                    throw err;
                }
                return done(null , results.rows[0]);
            }
        )
    })
}


module.exports = initialize;