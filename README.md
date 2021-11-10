Foot2gether is a web application that will simulate the real-life experience of watching football games, with other fans, as participants watch, react and comment, via voice and video chat rooms.

Foot2gether was developed using React with Material UI for the frontend, Node.JS with Express.JS for the backend, and MySQL for the database.
Also, Foot2gether's frontend is deployed to GitHub pages, and for the server, it is deployed on AWS EC2.

\*The actual match is not broadcasted in the rooms due to copyright reasons.

- To be able to use Foot2gether, the user needs to create an account and then log in. The authentication is done using JWT Authentication.

- On the matches tab, the user can check for all games on that day: previous ones, games in progress, and upcoming ones.

- On the live tab, the user will have access to live matches to select from. The user can then access available rooms, to join and watch with other fans. When the users are in a room, they can chat via real-time video and audio, and share their experience virtually. The rooms were implemented using WebRTC with Firebase.

- The number of users in a room is connected to firebase, so it is dynamically updated once a user joins or leaves the room.

- As for the upcoming games, the user can find a countdown as a reminder for the starting time of the match.

- And finally, users can check the results of games that happened earlier that day on the finished tab.

- For better user experience, the user can directly access all live rooms, or search a room by its ID, instead of checking the rooms for each game.

- To add, once a user has more than 50 followers, they'll be able to create their own room by simply giving the room a name, and selecting the match this room is dedicated to.

- If the match selected is live, the room is directly created and accessible for the fans. However, if the match selected is upcoming, then the room is created, but it won't be accessible until the start of the match.

- Once the room is created, all of the user’s followers will receive a notification to be informed. The push notification was implemented using firebase.

- Moreover, the user can search for other users to follow, or to check their live rooms and blogs that are shown on their profile.

- Finally, users can share their thoughts with others by creating blogs or by checking other users' blog posts and commenting on them.

- Last but not least, on the admin panel, the admin has access to the data about all games and rooms via the dashboard. Furthermore, the admin can add new matches by simply selecting the league and match sides and other match settings.

- Also, the admin can edit the scores of today's matches, and manage all of the virtual rooms on the website.
