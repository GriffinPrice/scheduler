
//Copied from SO question here: http://stackoverflow.com/questions/25532754/meteor-user-profile-returns-profile-undefined
//to solve issue of user calendars not displaying in accounts page.
Meteor.publish("userData", function() {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
      {fields: {'profile.isActive': 1}});
  } else {
    this.ready();
  }
});
