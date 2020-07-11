const mongodb=require('mongodb')
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/";
const my_db='buyingCenter';
// const bookCollection='books';

function handeGet(req,res,collectionName){
    console.log(1111);
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        const dbo = db.db(my_db);
        dbo.collection(collectionName).find({}).toArray(function(err, items) {
          if (err) {
              res.sendStatus(500);
              return;
          }
          res.send(items);
          console.log(111);
        //   db.close();
        });
      }
      );
}








function handeDelete(req,res){
    
    MongoClient.connect(url, function(err, db) {
        if (err)  {
            res.sendStatus(500);
            return;
        }
        var dbo = db.db(my_db);
        var myquery = { _id: new mongodb.ObjectID(req.params.id) };
console.log(myquery);
        dbo.collection(bookCollection).find(myquery).toArray(function(err, result) {
            if (err)  {
                res.sendStatus(500);
                return;
            }
            console.log(result);
            if (result.length==0){
                res.sendStatus(404);
            }
            else {
                dbo.collection(bookCollection).deleteOne(myquery, function(err, result) {
                    if (err)  {
                        res.sendStatus(500);
                        return;
                    }
                    console.log(result);
                    res.sendStatus(200);
                    // db.close();
                    });     
            }
            db.close();
        });
    });
}
function handePost(req,res){
    var result;
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var dbo = db.db(my_db);
        // expected to name,pages.isNew
        var bookobj = req.body;
        dbo.collection(bookCollection).insertOne(bookobj, function(err, result) {
          if (err) {
            res.sendStatus(500);
            return;
        }
          console.log(result);
          res.status(201).send(bookobj);
          res.se
          db.close();
        });
      });
}



module.exports.handeGet =handeGet;
module.exports.handePost=handePost;
module.exports.handeDelete=handeDelete;


