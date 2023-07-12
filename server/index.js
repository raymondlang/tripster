import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import passport from "passport";
import path from "path";
import dotenv from "dotenv";
// import users from "./routes/api/users";

dotenv.config();
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (res, req) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

// middleware
// app.use(passport.initialize());
// require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // routes
// app.use("/api/users", users);
// app.use("/api/trips", trips);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
