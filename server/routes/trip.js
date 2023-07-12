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
