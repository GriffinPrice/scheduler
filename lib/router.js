Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'home',
    template: 'defaultView'
});

Router.route('/calendar', {
    name: 'defaultView'
});

Router.route('/account', {
    name: 'account'
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('noUser');
    }
  } else {
    this.next();
  }
};


Router.onBeforeAction('dataNotFound', {only: 'calendarPage'});
Router.onBeforeAction(requireLogin, {only: ['calendar', 'account']});
