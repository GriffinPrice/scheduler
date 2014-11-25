ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "732547433082-6d8k4qfvu068q7lc24q9mn81j8no9tok.apps.googleusercontent.com",
  loginStyle: "popup",
  secret: "6MQ8L93gbu9xMUhPydHC7OlR"
});

Meteor.startup(function(){
    HTTPJWT.setJWTOptions({ // Just call this once to set JWT
      email: '732547433082-lbs4a1ktib49b34muh9bg2bjm93791lo@developer.gserviceaccount.com',
      key: Assets.getText('googlekey.pem'), // Get key file from assets
      scopes: [
        'openID email https://www.googleapis.com/auth/calendar' // Scope names. Unclear if this needs to be the same as the scopes in config.js
      ]
    });
    console.log('JWT settings applied');                   //Started as debugging, now informs me when the server has been restarted.
});

/* Function: getCalendarList(user)
 * ----------------------------------------------------------------------------------------
 * function takes user information and generates access token from google. Makes request for
 * list of calendars using 'GET' with access token in URL.
 * TODO: Migrate accessToken to header of GET request, practice safe net citizenship.
 */

function getCalendarList(user){
    var userID = user.services.google.id;
    var APIurl = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
    // Need to authenticate with Google first by sending an OAuth2 authentication request.
    var accessToken = GoogleOAuthJWT.authenticate({
      email: '732547433082-lbs4a1ktib49b34muh9bg2bjm93791lo@developer.gserviceaccount.com',
      key: Assets.getText('googlekey.pem'),
      scopes: [
        'https://www.googleapis.com/auth/calendar'
      ],
      delegationEmail: user.services.google.email //Gogole uses 'sub' in lieu of 'delegationEmail'
    });
    var APIurlreq = APIurl + '?access_token=' + accessToken;
    var result = HTTP.get(APIurlreq);
    var json = result.content;
    var data = JSON.parse(json);
    var calArray = [];

    data['items'].forEach(function(element, index, array){
        calArray.push( {Summary: element['summary'], ID: element['id'] });
    });
    user.profile.calendars = calArray;
    user.profile.preferredCalendar = user.services.google.email;
    console.log('this is calArray for user '+ user.profile.name + ': \n' +JSON.stringify(calArray, null, 4));

}

/* valudateNewUser hook calls function every time it runs, and creates starting user profile info.
 * Objectives: Creates starting point for user account by acting as a wrapper for other functions that populate
 * user information.
 * Retrieve useful google information.
 * Make assumptions about user preferences
 * TODO: Prompt the user to do first-time set-up.
 * Pre-req: Have 'accounts' fleshed out.
 *          Pretty much learn CSS + HTML
 */

Accounts.validateNewUser(function (user) {
    getCalendarList(user);
    return true;
});
