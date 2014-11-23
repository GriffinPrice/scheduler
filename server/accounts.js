ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "732547433082-6d8k4qfvu068q7lc24q9mn81j8no9tok.apps.googleusercontent.com",
  loginStyle: "popup",
  secret: "6MQ8L93gbu9xMUhPydHC7OlR"
});

/* THIS CODE WAS A PREVIOUS START TO IMPLEMENTING JWT BEFORE I FOUND A PACKAGE FOR IT
function getGoogleAccessToken(user){

    //Standard Google Header. RSA SHA-256 algorithm and JWT token format
    var googleJWTHeader = {"alg":"RS256","typ":"JWT"}

    //var base64header= JWTHeader();
    var d = new Date;
    var currentTimeMS = d.getUTCMilliseconds;
    var expyMinutes = 15;                                   //We are creating an access token that will last for 15 minutes.
    var expTimeMS = currentTime + (expyMinutes * 60 * 1000)                         //I don't know the benefits/drawbacks of using the max time of 1hour.
    var claims = {
        "iss":"732547433082-lbs4a1ktib49b34muh9bg2bjm93791lo@developer.gserviceaccount.com", //Application google service account e-mail
        "scope": "https://www.googleapis.com/auth/calendar",                    //Application requests access to user calendar
        "aud": "https://accounts.google.com/o/oauth2/token",                                 //We're requesting an authentication token.
        "exp": expTimeMS,
        "iat": currentTimeMS
    }
    //var base64claims= JWTClaimset(claims);

    var base64signature = JWTSignature(user.profile.services.google.accessToken);

    var JWTrequest = base64header + "." + base64claims + "." + base64signature;
}


//Wrapper to encode the google JWT header. In the future, this may need to be mroe robust.
function JWTHeader(){
    return Meteor.call('base64UrlEncode',googleJWTHeader);
}

//Wrapper to encode claims. It is separate from encoding the header because I believe I may change the structure later.
function JWTClaimset(claims){
    return Meteor.call('base64UrlEncode',claims);
}


//Generates the signature from the users accessToken.
function JWTSignature(accessToken){

}
*/


function getCalendarList(user){
    var gToken= user.profile.googleToken;
    // Need to authenticate with Google first by sending an OAuth2 authentication request.
    //To this end,
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
