//get database name, if it can find then it will make a new database in mongoDB
var db = db.getSiblingDB('admin');
 
db.createCollection('placeCollection');
 
collection = db.getCollection('placeCollection');

//to clear out the documents store within the collection 
collection.remove({});
 
collection.insert(
{
	Destination: "Space Needle",
	City: "Seattle",
	State: "Washington",
})

collection.insert(
{
	Destination: "Disney World",
	City: "Orlando",
	State: "Florida",
})


collection.insert(
{
	Destination: "Empire State Building",
	City: "New York City",
	State: "New York",
})


