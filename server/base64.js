/*
 * base64.js: An extremely simple implementation of base64 encoding / decoding using node.js Buffers
 *
 * (C) 2010, Nodejitsu Inc.
 * (C) 2011, Cull TV, Inc.
 *
 * Found in Moritz Walker's response at http://stackoverflow.com/a/18550085/4259653
 * 'Adapted' by Walker from John Hurliman's Gist at https://gist.github.com/jhurliman/1250118
 *
 */

if (Meteor.isServer) {
  Meteor.methods({
    'base64Encode':function(unencoded) {
      return new Buffer(unencoded || '').toString('base64');
    },
    'base64Decode':function(encoded) {
      return new Buffer(encoded || '', 'base64').toString('utf8');
    },
    'base64UrlEncode':function(unencoded) {
      var encoded = Meteor.call('base64Encode',unencoded);
      return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    },
    'base64UrlDecode':function(encoded) {
      encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
      while (encoded.length % 4)
        encoded += '=';
      return Meteor.call('base64Decode',encoded);
    }
    //console.log(Meteor.call('base64Encode','abc'));
});
}
