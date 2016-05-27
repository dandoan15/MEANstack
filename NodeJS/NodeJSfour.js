var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var mongoDBConnection = 'mongodb://admin:test@localhost:27017';

// Global variable to have access to the connection of mongoDB
var dbHandle;

MongoClient.connect(mongoDBConnection, function (err, db) 
{
	if(err)
	{
		console.log(err);
	}
	console.log("Connect your local machine mongoDB successfully!")
	dbHandle = db;
});

/*
	A function to query data from mongoDB
*/
function accessTransportation(respond, query)
{
	var myDB = dbHandle.db('admin');
	myDB.collection('carCollection', function (err, nCollection)
	{
		nCollection.find(query, function (err, cursor) 
		{
			cursor.toArray(function (err, itemArray)
			{
				// store html format into a variable
				var list = "<h1> Request One </h1>";
				for (var i = 0; i < itemArray.length; i++)
				{
					// extract the data like a struct 
					list += "<h3>" + itemArray[i].vehicle + " : " + itemArray[i].speed + "</h3>";
				}
				// send the data back the client!
				respond.send(list);
			})
		})
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