const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

const Schema = mongoose.Schema;

const CreateUser = new Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 50,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    confirm_password: {
      type: String,
      required: true,
      minlength: 6,
    },
    admin: {
      type: Boolean,
      default: false,
    },

    slug: { type: String, slug: "username", unique: true },
  },
  {
    // _id: false,
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);

module.exports = mongoose.model("CreateUser", CreateUser);
