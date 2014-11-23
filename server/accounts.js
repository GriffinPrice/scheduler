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
        'https://www.googleapis.com/auth/calendar' // New scope name
      ]
    });
});

function getCalendarList(user){
    var userID = user.profile.services.google.id;
    // Need to authenticate with Google first by sending an OAuth2 authentication request.
    var APIurl = 'https://www.googleapis.com/calendar/v3/users/' + userID + '/calendarList';
    var result = HTTPJWT.get(APIurl);
    var calArray = new Array();
    _.each(result.item,function(calendar){
        calArray.push(calendar.id);
    });
    user.profile.calendars = calArray;


}

/* valudateNewUser hook calls function every time it runs, and creates starting user profile info.
 * Objectives:
 * Retrieve useful google information.
 * Future: Prompt the user to do first-time set-up.
 */

Accounts.validateNewUser(function (user) {
    getCalendarList(user);

    //HTTP.get(
    /*
    HTTP.call(method, url, [options], [asyncCallback])
    var requestURL =

    return true;

    if (invitedUser) {
        var timestamp = (new Date()).getTime();
        InvitedUsers.update({_id: invitedUser._id},{$set:{joined: timestamp}});
        user.profile.role = invitedUser.role;
        user.profile.status = 'Active';
        return true;
    }
    throw new Meteor.Error(403, "Contact your Administrator to be given access.");*/
    return true;
});
