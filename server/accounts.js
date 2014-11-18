ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "732547433082-6d8k4qfvu068q7lc24q9mn81j8no9tok.apps.googleusercontent.com",
  loginStyle: "popup",
  secret: "6MQ8L93gbu9xMUhPydHC7OlR"
});

function getCalendar(user){
    var gToken= String(user.profile.googleToken);
}

Accounts.validateNewUser(function (user) {
    var gToken = user.services.google.accessToken;
    user.profile.googleToken = gToken;

    return true;

    /*if (invitedUser) {
        var timestamp = (new Date()).getTime();
        InvitedUsers.update({_id: invitedUser._id},{$set:{joined: timestamp}});
        user.profile.role = invitedUser.role;
        user.profile.status = 'Active';
        return true;
    }
    throw new Meteor.Error(403, "Contact your Administrator to be given access.");*/
});
