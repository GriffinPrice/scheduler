Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'home',
    template: 'calendar'
});

Router.route('/calendar', {
    name: 'calendar'
});

Router.onBeforeAction('dataNotFound', {only: 'calendarPage'});