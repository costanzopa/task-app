const mongoose  = require("mongoose"),
      validator = require('validator'),
      bcrypt    = require('bcrypt');


var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0 ) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        toLowerCase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    }
});

//Check credentials
UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email});
    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
};

//bind this (document)
UserSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    //end middleware return to the previous stepnpm
    next();
});

const User = mongoose.model('User', UserSchema)

module.exports = User;


