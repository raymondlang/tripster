# Overview

[Tripster](https://tripster-client.vercel.app/) is a single-page application designed to help travelers plan their voyages with more ease and organization. Born to solve the age-old problem of hassling over messy Google docs to plan itineraries for group trips. The original inspiration was to create an application that combines an interactive messenger alongside a running itinerary list that could store the key information from the group trip chat.

![tripster overview](https://github.com/raymondlang/tripster/assets/16345938/93274783-1136-4cce-b2fe-afcee817c6c0)

Tripster utilizes MongoDB and Express in the backend and React, Redux, and NodeJS in the frontend to achieve this, allowing users to utilize CRUD operations in both the comment and itinerary functionalities.

## Key Technologies

### Frontend:
![JavaScript](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/react-676E77?style=for-the-badge&logo=react&logoColor=#61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend:
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge)

### Deployment:
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

---

# Standout Features

## User authorization and dashboard

Users can sign up for a new account, login to an existing account, or access a demo user to access the site features. The session token for the current user persists until the user explicitly logs out, allowing users to close out of tabs with ease.

![tripster login](https://github.com/raymondlang/tripster/assets/16345938/75293e78-73a0-479a-98e6-9f76bbbe7b4f)

If the user enters invalid information, either in the signup form or the login form, specific error messages appear to highlight which input fields would need corrections.
Upon a successful login, the user lands on the user dashboard where a trip can be created, edited or deleted.

## Trip-specific Dashboard

Each user is able to create new trips with a destination, a start date, and an end date. Upon entering the trip-specific dashboard, the user is greeted with three key components: 1) the user list of who is on the trip, 2) all the comments from everybody who has access the trip, and 3) the running list of itinerary items for that specific trip. A challenge in the backend was nesting all of these data objects within specific trips themselves.

```
// Get a specific trip.
router.get("/:id",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Trip.findById(req.params.id)
            .populate({
                path: "users",
                model: "User",
                select: ["username", "_id"]
            })
            .populate({
                path: "comments",
                model: "Comment",
                select: ["author", "comment", "date"]
            })
            .populate({
                path: "itineraryItems",
                model: "ItineraryItem"
            })
            .then(trip => {
```

Users can only access trips that they own or are apart of.

```
                // ...Check if the current user is part of the trip.
                if (trip.users.some(user => (req.user.id === user.id))) {
                    return res.json({ [trip.id]: trip })
                } else {
                    // This user isn't authorized to view this trip.
                    return res.status(401).json({ unauthorized: "You are not authorized" });
                }
            })
            .catch(err => {
                return res.status(404).json({ notripfound: "This trip doesn't exist" })
            });
    });
```

## Adding friends to a trip

Friends can be also introduced to a trip simply by adding their email associated with their account. Once added to a trip, a user has access to the trip and all associated information on their dashboards. Users can only join if they aren't already part of the trip.

![tripster friend invite](https://github.com/raymondlang/tripster/assets/16345938/be106c57-aa65-4061-a234-2d1f06ef0ebc)

## Creating comments

Each trip has a private page where users who've been invited can chat with each other. Comments populate in the feed without having to refresh the page and of course, you can use your favorite emojis. Comments can only be deleted by their respective owner.

![tripster comments updated](https://github.com/raymondlang/tripster/assets/16345938/b5b679b1-c5cf-4893-b97a-38afca2a9beb)


## Itinerary items

All users on a trip can also add itinerary items with specific address, description, category, and name details. Itinerary items can also be deleted without refreshing the page.

![tripster add itinerary](https://github.com/raymondlang/tripster/assets/16345938/b068c412-150b-4cd9-b095-33413d862930)


# Future features

## Map API

In the original mockup plans, I had wanted to include the Google Maps API to include on the trip dashboard to allow users to access Google Maps while adding itinerary items and discussing with friends over travel details. This has been saved for a later date.

## Tabs for the Itinerary

The original mockup plans also included a tab functionality for the itinerary items, allowing better organization for essential travel details such as lodging, food, flights, etc.

## Location-based safety

I was hoping to integrate a resource for location-based links to resources for LGBTQ+ users to feel included and considered for in their travels.
