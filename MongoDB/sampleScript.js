//get database name, if it can find then it will make a new database in mongoDB
var db = db.getSiblingDB('admin');
 
db.createCollection('carCollection');
 
collection = db.getCollection('carCollection');

//to clear out the documents store within the collection 
collection.remove({});
 
collection.insert(
{
	vehicle: "mustang",
	speed: "150mph",
})

collection.insert(
{
	vehicle: "porsche",
	speed: "180mph",
})

collection.insert(
{
	vehicle: "bullet train",
	speed: "250mph",
})