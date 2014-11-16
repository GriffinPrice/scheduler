var postsData = [
  {
    destination: 'Calendar',
    url: '/calendar'
  }, 
  {
    destination: 'Account',
    url: '/account'
  }, 
  {
    destination: 'Sign out',
    url: '/signout'
  }
];
Template.navLinks.helpers({
  navs: postsData
});
