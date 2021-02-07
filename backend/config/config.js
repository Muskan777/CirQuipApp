const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
// const db = config.get('localMongoURI');
const AWS = require("aws-sdk");

//configuring the AWS environment
AWS.config.update({
  accessKeyId: config.get("awsAcccessKey"),
  secretAccessKey: config.get("awsSecretAccessKey"),
});
const s3 = new AWS.S3();
const connectDB = async () => {
  try {
    // mongoose.set("debug", true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected.");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, s3 };
