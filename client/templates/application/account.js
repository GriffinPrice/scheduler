Template.account.helpers({
    calendars: function(){
        if(Meteor.user()){
            return Meteor.user().profile.calendars;
        }else{
            return null;
        }
    }
});
