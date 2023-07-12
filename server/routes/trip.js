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

// Get a specific trip.
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Trip.findById(req.params.id)
      .populate({
        path: "users",
        model: "User",
        select: ["username", "_id"],
      })
      .populate({
        path: "comments",
        model: "Comment",
        select: ["author", "comment", "date"],
      })
      .populate({
        path: "itineraryItems",
        model: "ItineraryItem",
      })
      .populate({
        path: "flightItineraryItems",
        model: "FlightItineraryItem",
      })
      .populate({
        path: "lodgingItineraryItems",
        model: "LodgingItineraryItem",
      })
      .populate({
        path: "foodItineraryItems",
        model: "FoodItineraryItem",
      })
      .then((trip) => {
        // Check if the current user is part of the trip.
        if (trip.users.some((user) => req.user.id === user.id)) {
          return res.json({ [trip.id]: trip });
        } else {
          // This user isn't authorized to view this trip.
          return res
            .status(401)
            .json({ unauthorized: "You are not authorized" });
        }
      })
      .catch((err) => {
        return res.status(404).json({ notripfound: "This trip doesn't exist" });
      });
  }
);
