var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var mongoDBConnection = 'mongodb://admin:test@localhost:27017';

// Global variable to have access to the connection of mongoDB
var dbHandle;

/*
	This function establishes the connection between Node.JS and MongoDB

	DB object
		-Provides access to databases
		-Enables db connections, user authentication, users to be added, manage databases, and acces to collections
*/
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
	/*
		Collection object
			-Provides access to the collections in the currently selected database
			-Enables access to items in the collection, the ability to add documents, query documents, update documents, and delete documents
			-Sample usage
				-var db.collection()
				-var collection = new Collection(db, "myCollection")
				-db.createCollection("newCollection", callback)
	*/
	myDB.collection('carCollection', function (err, nCollection)
	{
		nCollection.find(query, function (err, cursor) 
		{
			/*
				Cursor object
					-Provides access to a list of documents that can be iterated through
					-The cursor object is used to read individual items on a result
					-After accessing a document you can add, modify, and delete it
			*/
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


app.get('/all', function(request, respond)
{
	console.log("Getting all data from carCollection!");
	accessTransportation(respond, {});
})

app.use(express.static('../AngularJS'));

app.listen(80);