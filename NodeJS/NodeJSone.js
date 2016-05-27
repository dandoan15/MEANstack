/*
	Go to this link to know how to use the built in packages of NodeJS and understand their interfaces

	https://nodejs.org/api
*/

// a pacakge to handle the connection, sockets, networking stuff....
//         taking prerequisite of Computing systems(3500) of the networking concept
var http = require('http');

// to redirect the link
var fs = require('fs');

// a package(library) to be able to parse the url
var url = require('url');

var message = [
	'Hello World',
	'From a basic Node.js server',
	'Take Luck'
];

/*
	http.createServer([requestListner]) = returns a new instance of http.Server
	The requestListner is a function which is automatically added to the 'request' event.	
*/
http.createServer( function (request, response) {

	/*
		This response.setHeader & response.writeHead established the connection with the browser and this server! 
		For more info about headers check out this link for more details.
		http://code.tutsplus.com/tutorials/http-headers-for-dummies--net-8039

	*/
	response.setHeader('Content-Type', "text/html");
	response.writeHead(200);

	console.log(message);

	/*
		The url package allow to parse the url from the browser
		pathname from 'url' package
		slice() from 'buffer' package
	*/
	var filename = url.parse(request.url).pathname.slice(1);

	/*
		Ignore the second request for website icon.

		Most browsers actually carry out a second query to retrieve the website icon (the "favicon" generally seen in the tabs). 
	*/
	if(filename != 'favicon.ico')
	{
		// localhost by default will display the AJSone.html
		if (filename === '') 
		{
			filename = '../AngularJS/AJSone.html';
		}
	
		//console.log('filename: ' + filename);
		
		/*
			fs.readFile(file[, option], callback)

			Asynchronously reads the entire contents of a file
			
			The callback is passed two agruments (err, data), where data is the contents of the file.
			If no encoding is specific, then the raw buffer is returned in the agrument for 'options'
		*/
		fs.readFile('../AngularJS/' + filename, 'utf8', function (err, data) 
		{
			  if (err) 
			  {
				return console.log(err);
			  }

			  // end() is to signify that you're done with the request
			  response.end(data);
		});
	}

// listening on a port, type localhost:80 in your url browser 
}).listen(80);