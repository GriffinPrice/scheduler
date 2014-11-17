var postsData = [
  {
    destination: 'Calendar',
    url: '/calendar'
  }, 
  {
    destination: 'Account',
    url: '/account'
  }, 
];
Template.navLinks.helpers({
  navs: postsData
});
