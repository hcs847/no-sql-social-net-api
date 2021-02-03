const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
// ==========
// recongnize incoming request object as a JSON object
app.use(express.json());
// recognize incoming request object as string or arrays
app.use(express.urlencoded({ extended: true }));
//  setup directory for serving static files
app.use(express.static("public"));

// app.use(require("./routes"));

// setup Mongoose to connect when we start the app
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-net-api", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// enable debug mode
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 running  on port:${PORT}`));
