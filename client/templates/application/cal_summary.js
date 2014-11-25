Template.calSummary.helpers({
    preferred: function(){
        if(this.ID == Meteor.user().profile.preferredCalendar){
            //console.log(this.ID + ': :' + Meteor.user().profile.preferredCalendar); //For debugging
            return true;
        }else{
            return false;
        }
    }
});
