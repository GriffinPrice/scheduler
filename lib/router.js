Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {
    name: 'home',
    template: 'calendar'
});

Router.route('/calendar', {
    name: 'calendar'
});
