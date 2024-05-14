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

app.use(helmet.noSniff())
/*MIME type sniffing is an operation conducted by many browsers. Each browser behaves differently on that matter, but overall, MIME sniffing 
is an action where they determine a page content type depending on that page content. This is can be dangerous as it could allow attackers to 
hide HTML code into a .jpg file, and have the visitor's browser interpret the page and execute client code (XSS) because the browser determined 
the file was HTML code instead of a JPG image.*/

app.use(helmet.ieNoOpen()) /*Some web applications will serve untrusted HTML for download. Some versions of Internet Explorer by default open 
those HTML files in the context of your site. This means that an untrusted HTML page could start doing bad things in the context of your pages. 
This middleware sets the X-Download-Options header to noopen. This will prevent IE users from executing downloads in the trusted site's context.*/

const ninetyDaysInSeconds = 90*24*60*60
app.use(helmet.hsts({maxAge: timeInSecods=ninetyDaysInSeconds, force: true}) )
/*HTTP Strict Transport Security (HSTS) is a web security policy which helps to protect websites against protocol downgrade attacks and cookie 
hijacking. If your website can be accessed via HTTPS you can ask user’s browsers to avoid using insecure HTTP. By setting the header 
Strict-Transport-Security, you tell the browsers to use HTTPS for the future requests in a specified amount of time. This will work for the 
requests coming after the initial request.*/

app.use(helmet.dnsPrefetchControl())
/*To improve performance, most browsers prefetch DNS records for the links in a page. In that way the destination ip is already known when the user clicks
on a link. This may lead to over-use of the DNS service (if you own a big website, visited by millions people…), privacy issues (one eavesdropper
could infer that you are on a certain page), or page statistics alteration (some links may appear visited even if they are not). If you have
high security needs you can disable DNS prefetching, at the cost of a performance penalty.*/


app.use(helmet.noCache()) // evita que la página web guarde caché en el navegador




































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
