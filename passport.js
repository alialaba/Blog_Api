const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("./models/userModel");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;


passport.use(
    new JWTstrategy(
        {
            secretOrKey:process.env.JWT_SECRET || "something_secret",
            // jwtFromRequest:ExtractJWT.fromUrlQueryParameter("secret_token"),

            jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken() //use if only using bearer token
        },


        async (token,done)=>{
            try {
                return done(null, token.user)
            } catch (error) {
                done(error)
            }
        }
    )
    
);



// This middleware saves the information provided by the user to the database,
// and then sends the user information to the next middleware if successful.
// Otherwise, it reports an error.



passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback:true,
            
        },
        async ( req, email, password, done) => {
            try {
                const firstname = req.body.firstname
                const lastname = req.body.lastname
                const user = await UserModel.create({ email, password , firstname, lastname});

                return done(null, user, { message: 'User created successfully'});
            } catch (error) {
                console.log(error)
                done(error);
            }
        }
    )
);


// This middleware authenticates the user based on the username and password provided.
// If the user is found, it sends the user information to the next middleware.
// Otherwise, it reports an error.

passport.use(
    "login",
    new localStrategy({
        usernameField:"email",
        passwordField:"password",
        passReqToCallback: true
    },
     async(req, email, password, done)=>{

        try {
            const user = await UserModel.findOne({email});
            
            if(!user){
              return   done(null, false, {message: "Email or password is incorrect"});
            }

            const validate = await user.isValidPassword(password);

            if(!validate){
                return done(null, false, {message:"Wrong password"})
            }


            return done(null, user, {message:"Logged In Successfully"})
            
        } catch (error) {
            return done(error)
        }

     }

    )
)