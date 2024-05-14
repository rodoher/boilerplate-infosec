const express = require('express');
const app = express();

const helmet = require("helmet"); // helmet se encuentra en el documento package.json

app.use(helmet.hidePoweredBy()) // evita que se vea si utilizas php, node.js o con qué te conectas al servidor

app.use(helmet.frameguard({action: 'deny'})) // evita que se puedan crear frames 
/*Your page could be put in a <frame> or <iframe> without your consent. This can result in clickjacking attacks, 
among other things. Clickjacking is a technique of tricking a user into interacting with a page different from what 
the user thinks it is. This can be obtained by executing your page in a malicious context, by means of iframing. In 
that context, a hacker can put a hidden layer over your page. Hidden buttons can be used to run bad scripts. This middleware 
sets the X-Frame-Options header. It restricts who can put your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM.*/


app.use(helmet.xssFilter()) // evita que se mande código para hackear el sistema en los inputs 












































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
