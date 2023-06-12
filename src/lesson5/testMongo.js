const MongoClient = require("mongodb").MongoClient;
    
const url = 'mongodb://localhost:27017/';
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

let users = [{name: "Bob", age: 34} , {name: "Alice", age: 21}, {name: "Tom", age: 45}];

async function run() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");
        console.log(`В коллекции users ${await collection.countDocuments()} документов`);
        /* Insert data */
        // await collection.insertOne(users[0]);
        // await collection.insertMany(users);
        
        /* Get data */
        // console.log(await collection.find().toArray());
        // console.log(await collection.find({name: "Tom"}).toArray());
        // console.log(await collection.find({name: "Tom", age: 23}).toArray());
        // console.log(await collection.findOne({name: "Tom", age: 23}));
        // console.log(await collection.find(
        //     {
        //         $and: [
        //             { age: { $gt: 20 } },
        //             { age: { $lt: 30 } }
        //         ]
        //     }).toArray()
        // );

        /* Delete data*/
        // console.log(await collection.deleteOne({name: "Tom", age: 23}));
        // console.log(await collection.deleteMany({name: "Tom", age: 23}));
        // console.log(await collection.findOneAndDelete({name: "Alice"}));

        /* Drop collection */
        // console.log(await collection.drop());

        /* Update document*/
        // await collection.insertMany(users);
        // return old document
        // console.log(await collection.findOneAndUpdate({age: 21}, { $set: {age: 25}}));
        // return new document
        // console.log(await collection.findOneAndUpdate({name: "Bob"}, { $set: {name: "Sam"}}, { returnDocument: "after" }));

        // console.log(await collection.updateMany({name: "Sam"}, { $set: {name: "Bob"}}));
        // console.log(await collection.updateOne({name: "Tom"}, { $set: {name: "Tom Junior", age:33}}));

        console.log(`В коллекции users ${await collection.countDocuments()} документов`);
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}

run();
