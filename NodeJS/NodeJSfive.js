var express = require('express');
var app = express();

var mongoose = require('mongoose');

var mongoDBConnection = 'mongodb://admin:test@localhost:27017';

// Global variable to have access to the connection of mongoDB
var Transport;


mongoose.connect(mongoDBConnection);

mongoose.connection.on('open', function()
{
	var Schema = mongoose.Schema;
	var transportationSchema = new Schema(
	{
		vehicle: String,
		speed: String
	}, {collection: 'carCollection'}
	);
	Transport = mongoose.model('Transport', transportationSchema);

	console.log("Schema has been created and connected to mongoDB!");
});


/*
	A function to query data from mongoDB
*/

function accessTransportation(respond, query)
{
	var collection = Transport.where(query);
	collection.exec(function (err, itemArray)
	{
		var list = "<h1>Request One</h1>";
		for (var i = 0; i < itemArray.length; i++)
		{
			list += "<h3>" + itemArray[i].vehicle + " : " + itemArray[i].speed + "</h3>";
		}
		respond.send(list);
	})
}

//////////////////////////////////////////////////////Routes////////////////////////////////////////////////////////////////
app.get('/speed/:sname', function (request, respond)
{
	var sname = request.param('sname');
	console.log("Query for a vehicle's speed " + sname);
	accessTransportation(respond, {speed: sname});
});

app.get('/vehicle/:vname', function (request, respond)
{
	var vname = request.param('vname');
	console.log("Query for vehicle name: " + vname);
	accessTransportation(respond, {vehicle: vname});
});


app.get('/all', function(request, respond)
{
	console.log("Getting all data from carCollection!");
	accessTransportation(respond, {});
});

app.use(express.static('../AngularJS'));

app.listen(80);