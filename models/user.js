const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pkg = require("passport-local-mongoose");
const passportLocalMongoose = pkg.default || pkg;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);