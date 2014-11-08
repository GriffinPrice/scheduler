var postsData = [
  {
    destination: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  }, 
  {
    destination: 'Meteor',
    url: 'http://meteor.com'
  }, 
  {
    destination: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  }
];
Template.navLinks.helpers({
  navs: postsData
});