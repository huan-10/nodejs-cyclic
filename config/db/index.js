// import mongoose from "mongoose";
const mongoose = require("mongoose");
// const connect = async () => {
// mongodb+srv://hoangvanhuan2k1:QDrmnza2xIm9upcX@cluster0.usc9ot5.mongodb.net/?retryWrites=true&w=majority

require("dotenv").config();

// await mongoose.connect("mongodb://127.0.0.1/H8_education_dev");
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hoangvanhuan2k1:QDrmnza2xIm9upcX@cluster0.usc9ot5.mongodb.net/?retryWrites=true&w=majority"
    );

    // await mongoose.connect("mongodb://127.0.0.1/H8_education_dev");

    console.log("successfully nhé em");
  } catch (error) {
    console.log("fail");
  }
};

module.exports = { connect };
