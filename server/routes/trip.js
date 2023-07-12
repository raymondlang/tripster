import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import passport from "passport";

import Trip from "../../models/Trip";
import Comment from "../../models/Comment";
import User from "../../models/User";
import ItineraryItem from "../../models/ItineraryItem";
import FlightItineraryItem from "../../models/FlightItineraryItem";
import LodgingItineraryItem from "../../models/LodgingItineraryItem";
import FoodItineraryItem from "../../models/FoodItineraryItem";

import ValidateTripInput from "../../validation/trip";
import ValidateCommentInput from "../../validation/comment";
import validateItineraryItemInput from "../../validation/itineraryItem";
import validText from "../../validation/valid-text";

// Get the trips for a specific user.
router.get(
  "/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.id !== req.params.user_id) {
      return res.status(401).json({ unauthorized: "You are not authorized" });
    }

    // Finds all of the trips that have :user_id in their "users" array.
    Trip.find({ users: { $all: [req.params.user_id] } })
      .sort({ dat: -1 })
      .then((trips) => res.json(trips))
      .catch((err) => {
        return res.status(404).json({
          notripsfound: "This user doesn't have any trips",
        });
      });
  }
);
