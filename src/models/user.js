const mongoose  = require("mongoose"),
      validator = require('validator'),
      bcrypt    = require('bcryptjs'),
      jwt       = require('jsonwebtoken'),
      Task      = require('./task');


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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});


UserSchema.virtual('tasks', {
   ref: 'Task',
   localField: '_id',
   foreignField: 'owner'
});


//Generate web token
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse');
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

//Override JSON function to hide data
UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

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


//bind this (document)/ removing all task middleware
UserSchema.pre('remove', async function(next) {
    const user = this;
    //console.log(user);
    await Task.deleteMany({owner: user._id});

    next();
});


const User = mongoose.model('User', UserSchema);

module.exports = User;