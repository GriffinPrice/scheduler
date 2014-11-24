Template.account.helpers({
    calendars: function(){
        return Meteor.user().profile.calendars;
    }
});
