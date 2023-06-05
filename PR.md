# PR

## Backend
* Add Notification types and message to notification model and serializer.
* Modify list method to filter accounts by account id
* Add method retrieve, destroy, update, and create to notification viewsets file.

## Frontend
* Create notificationCard component
* Add NOTIFICATIONS action to redux (notificationPayload). Add selector, endopoint, etc.
* Modify home page to connect to redux and to show notification for the account logged in.
* Split setUserSession method from the sagas folder in two, to save new notifications whenever a user logs in or signs up.


## TODO

### Backend
* Tests for backend endpoints
* Validate data

### Frontend
* Replace the dummy function to set a notification as seen to a function that communicates with the backend.
* Choose better icons for the notification cards.

