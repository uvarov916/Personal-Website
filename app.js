var Hapi = require('hapi');
var Path = require('path');

var port = process.env.PORT || 8080;
var server = new Hapi.Server();
server.connection({port: port});

server.views({
  engines: {
    html: require('handlebars')
  },
  relativeTo: __dirname,
  path: './views'
});

server.route({    // Other assets If you have
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
          path: './public',
          listing: false,
          index: true
      }
    }
});


server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply.view('index');
  }
});

server.route({
  method: '*',
  path: '/{p*}',
  handler: function(request, reply) {
    reply('Page not found').code(404);
  }
});

server.start(function () {
  console.log('Server running at: ', server.info.uri);
});
