var express = require('express');
var app = express();

var mongoose = require('mongoose');

var mongoDBConnection = 'mongodb://admin:test@localhost:27017';

// Global variable to have access to the connection of mongoDB
var Transport;
var People;
var Places;


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

	var peopleSchema = new Schema(
	{
		FirstName: String,
		LastName: String,
		Class : String
	}, { collection: 'peopleCollection'}
	);
	People = mongoose.model('People', peopleSchema);

	var placesSchema = new Schema(
	{
		Destionation: String,
		City: String,
		State: String,
	}, { collection: 'placeCollection'}
	);
	Places = mongoose.model('Places', placesSchema);

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
		if (err)
		{
			console.log("An error occured: ", err);
		}
		else
		{
			console.log(itemArray);
			respond.send(itemArray);
		}
	})
}

function accessPeople(respond, query)
{
	var collection = People.where(query);
	collection.exec(function (err, itemArray)
	{
		if (err)
		{
			console.log("An error occured: ", err);
		}
		else
		{
			console.log(itemArray);
			respond.send(itemArray);
		}
	})
}

function accessPlaces(respond, query)
{
	var collection = Places.where(query);
	collection.exec(function (err, itemArray)
	{
		if (err)
		{
			console.log("An error occured: ", err);
		}
		else
		{
			console.log(itemArray);
			respond.send(itemArray);
		}
	})
}
//////////////////////////////////////////////////////Routes////////////////////////////////////////////////////////////////
/*
	To do these routes with angularJS??
	Just add the the url into the $http.get(url) and make it match to the route
		app.get('/speed/:sname') ROUTES ==  $http.get('/speed/' + $scope.sname OR (variable) sname)

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
*/

app.get('/allCars', function(request, respond)
{
	console.log("Getting all data from carCollection!");
	accessTransportation(respond, {});
});

app.get('/allPeople', function(request, respond)
{
	console.log("Getting all data from peopleCollection!");
	accessPeople(respond, {});
});

app.get('/allPlaces', function(request, respond)
{
	console.log("Getting all data from placesCollection!");
	accessPlaces(respond, {});
});

app.use(express.static('../AngularJS'));

app.listen(80);