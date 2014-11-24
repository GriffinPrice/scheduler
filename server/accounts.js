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
        'openID email https://www.googleapis.com/auth/calendar' // New scope name
      ]
    });
    console.log('JWT settings applied');
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
        'https://www.googleapis.com/auth/calendar'//,
        //'https://www.googleapis.com/auth/calendar.readonly'
      ],
      delegationEmail: user.services.google.email
    });
    console.log(accessToken);

    //var accessToken = user.services.google.accessToken;

    //console.log(APIurl);
    //var header = JSON.stringify('Authorization: Bearer '+accessToken);
    //console.log(header);
    var APIurlreq = APIurl + '?access_token=' + accessToken;
    console.log(APIurlreq);
    var result = HTTP.get(APIurlreq);

    /*result = HTTP.get(APIurl,{
        data:{
            headers: header
        }
    });
    */
    //var result = HTTPJWT.get(APIurl);

    console.log('this is the result: \n'+result.content);
    var json = result.content;
    var data = JSON.parse(json);
    console.log('this is the data: \n' + data);
    var calArray = [];
    /*_.each(result.items,function(calendar){  //Not working, probably because I don't know underscore very well.
        calArray.push(calendar.id);
    });*/
    console.log('this is data.items: \n'+ data.items);
    console.log('this is data.items.content: \n'+ JSON.stringify(data.items, null, 4));
    data['items'].forEach(function(element, index, array){
        var JSONstring = JSON.stringify(element, null, 4);

        //var Jdata = JSON.parse(JSONstring);
        console.log('here is an element summary at index '+index+': \n'+ element['summary']);
        console.log('here is an element id at index '+index+': \n'+ element['id']);
        calArray.push( {Summary: element['summary'], ID: element['id'] });
    });

    /*for(i = 0; i < data.items.length; i++ ){
        console.log('this is items[i] content for i = ' +String(i)+': \n'+data.items[i].content);
        //calArray[data.items[i].summary] = data.items[i].id;
    }*/
    user.profile.calendars = calArray;
    console.log('this is calArray: \n' +JSON.stringify(calArray, null, 4));

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
