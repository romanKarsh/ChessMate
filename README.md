# team29

Only added commits to README.md after deadline. No code was added, deleted or updated. 

## Instructions on Usage

https://chessmate-api.herokuapp.com/

## Credentials

### Standard User
```
username: user
password: user
```
### Administrator
```
username: admin
password: admin
```

## Brief 

**Homepage:** The application starts at the home page. Functionally the home page does not do much other than serve as a landing page for the app and highlighting some of the features of the application to the user. The home page also has a breakdown for the technology stack utilized in building the application - including the languages, libraries and frameworks used. 

**Sign up:** Users are required to sign up to use our chess application. Thus, the users can sign up using the signup page which can be found at the ‘/signup’ route or by clicking the signup button in the top right of the navigation bar when not signed in. The signup page consists of a simple registration form where basic information about the user is collected such as a username and password. If all the fields are entered correctly, it displays a successful registration message and will login the user while as if there is an error in any of the fields, it displays the appropriate error in red.  

**Log in:** The users need to be logged in to use our application. Thus, once signed up, users can log in by entering their username and password in order to use it. The credentials for the standard user and standard admin can be found at the top of the README page. If the correct user/admin credentials are entered, then the appropriate user or admin account is logged in and the functionality of the Lobby page, Profile page and any other page becomes available (e.g. in the lobby page the correct user details are loaded and correct game list is loaded). Once logged in, the user can visit his/her profile page by clicking on his/her username in the top right - next to the logout button. 

**Lobby page:** Once the user is logged in, the lobby page shows the user a summary of his game history details, a list of the multiplayer games in progress or available to join and the functionality to create a new game. If the user wants to join any of the available multiplayer games, he can simply select join next to the respective game join button and it should redirect/join the player to the game. The user has the option to sort and filter the list of available multiplayer games. The functionality for sorting and filtering is functional and can be tested once the user is logged in. The user can filter by available games or hostname and sort by either game id or hostname or availability status. On the other hand, if the user does not want to join an existing game, he can create his own new multiplayer game which other users can join. When creating a new game, the user must select the time mode and color selection, otherwise the app shows an error. 

**Game page:** This page shows the current mulitplayer game. This page can be reached through the lobby page by creating a new game there. The game works using socket.io to create realtime changes to the board and timers in order for 2 players to play the game together. The frontend game board UI uses chessboard.js and the game rules are set by chess.js.

**Profile page:**
Here the user can view their own profile, which includes their game statistics, friends list, match history (not implemented) and badges.
Badges are symbolic rewards for completing certain tasks on the site. For example, the user gets a gold crown badge for changing their name.
There are a few interactive options available to the user on the profile page. At the top right corner, they can add friends to their friendlist by entering their name in the text field and clicking the 'add friend' buttton or challenge that user to a game (not implemented)
NOTE: The app will not allow the user to add a user that doesn't exist, a user already in their friendlist or themselves. If friend to add is valid (by above), that friends name will appear below in the frienlist. 
At the bottom of the page there are more options. Here the user can change their username. 
NOTE: the user willl not be allowed to change their name to an already taken user name. If name is not taken, the users name will change accordingly.
Also if a player is to change their username, any other user that has this player in their friendlist will see that players username change to the new one right away.
Lastly the user can reset their game statistics as well as toggle between seeing or not seeing their match history. Giving the user an option to start a new or perhaps avoid looking at a recent lost streak.


**Leaderboard page:** Statistics of every user is shown on this page, and ranked based on their performance. The leaderboard can be sorted by a set of filters.

**Admin page:** An admin can access everything a regular user is able to use, moreover, admin has a special page to control regular users through banning them and unbanning. A banned user is unable to log in. Admin also can see the statistics of the website like the number of users online and number of games that are in progress. 
To view the admin page, you follow the same steps as reaching the profile page while logged into an admin account, click on the username in the top right and you will be brought to the admin page. On that page you will be able to ban and unban people with the buttons and the list of users. You can filter the users by typing in the search bar at the top of the list of users.
Admins can only be created by changing a flag under a user in the database, there are no UI elements that allow for adding of new admins. Admins can also not ban themselves but can still ban other admins.


**Footer:** In the footer we have developers information which is linked to our respective Github's. accounts.


**SOME ROUTES:**
/player: takes id of a user, finds that user, updates that users friendlist (user on friendlist might have changed their name) and returns the new updated user.
Something goes wrong, sends appropriate messages.

/addFriend: takes a string user name, looks for a user with that name. If found, adds this user to the friend list of user issuing the request. Something goes wrong (no such user, user name belongs to sender or this user is already in the friendlist of the sender), sends appropriate messages.

/addBadge: takes a string (badge image) and adds it to the badges list of the user issuing the request.

/matchHist: updates senders 'matchHistoryView' if it is false, the game history for player is hidden

/changeName: takes a string username and sets the senders username to it. If name is too short or the name is already taken by some other user in the system, the request sends an appropriate message.

/resetStats: resets the game statistics of user issuing request

/increaseStats: increases a specified game statistic of user issuing request
