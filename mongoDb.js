const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:3000/";
const mongoClient = new MongoClient(url);

async function run(err, client) {
  try {
    await mongoClient.connect();
    //request to DB
    const db = client.db("admin");

    db.command({ ping: 1 }, (err, result) => {
      if (!err) {
        console.log("server connect done!");
        console.log(result);
      }
      client.close();
      console.log("connection close!");
    });
  } catch (err) {
    return console.log("error ", err);
  } finally {
    await mongoClient.close();
  }
}
run();

//module.exports = run();
