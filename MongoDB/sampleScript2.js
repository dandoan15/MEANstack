//get database name, if it can find then it will make a new database in mongoDB
var db = db.getSiblingDB('admin');
 
db.createCollection('peopleCollection');
 
collection = db.getCollection('peopleCollection');

//to clear out the documents store within the collection 
collection.remove({});
 
collection.insert(
{
	FirstName: "John",
	LastName: "Doe",
	Class: "Junior",
})

collection.insert(
{
	FirstName: "Jane",
	LastName: "Jones",
	Class: "Freshmen",
})

collection.insert(
{
	FirstName: "Jennifer",
	LastName: "Warren",
	Class: "Senior",
})

collection.insert(
{
	FirstName: "Jonathan",
	LastName: "Davis",
	Class: "Sophomore",
})

