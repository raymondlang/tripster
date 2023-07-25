import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

import dotenv from "dotenv";
import User from "../../models/User.js";

import validateRegisterInput from "../validation/register.js";
import validateLoginInput from "../validation/login.js";

dotenv.config();
const router = express.Router();

const checkAuthToken = (req, res, next) => {
  const token = req.headers.authorization || localStorage.getItem("jwtToken");
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        // Invalid token or token expired, set isAuthenticated to false
        req.isAuthenticated = false;
      } else {
        // Token is valid, set isAuthenticated to true and attach user data to the request
        req.isAuthenticated = true;
        req.user = { id: decoded.id, email: decoded.email };
      }
      next();
    });
  } else {
    // Token not found in local storage, set isAuthenticated to false
    req.isAuthenticated = false;
    next();
  }
};

// Current user
router.get(
  "/current",
  checkAuthToken,
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    });
  }
);

// Post new user
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      // Throw error, this username is already taken.
      errors.username = "User already exists";
      return res.status(400).json(errors);
    } else {
      // Email not in use, create the user.
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
      });

      // Generate the password digest.
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, username: user.username };

              jwt.sign(
                payload,
                process.env.SECRET_KEY,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: `Bearer ${token}`, // Add session token to response.
                  });
                }
              );
            }) // Return the user if the creation was successful.
            .catch((err) => console.log(err)); // Log the errors to the console if failed.
        });
      });
    }
  });
});

// Post session
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      // Bad email, return error.
      errors.email = "This user does not exist";
      return res.status(404).json(errors);
    }

    // BCrypt hashes the incoming password, and then compares the hashed output with the one in the db.
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // Correct credentials, log user in.
        const payload = { id: user._id, email: user.email };
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          { expiresIn: 3600 }, // Key now expires in one hour.
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

export default router;
