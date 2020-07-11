const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName='TaskManagement', collectionName='users'
var idsUsers = 3,idsTasks=24;

function handeDelete(req,res,param){
  MongoClient.connect(url, function(err, db) {
      if (err)  {
          res.sendStatus(500);
          return;
      }
      const dbo = db.db(dbName);
      dbo.collection('tasks').find(param).toArray(function(err, result) {
          if (err)  {
              res.sendStatus(500);
              return;
          }
          if (result.length==0){
              res.sendStatus(404);
          }
          else {
              dbo.collection('tasks').deleteOne(param, function(err, result) {
                  if (err)  {
                      res.sendStatus(500);
                      return;
                  }
                  res.sendStatus(200);
                  });     
          }
      });
  });
}

function handeGet(req,res){
  MongoClient.connect(url,{useUnifiedTopology: true,useNewUrlParser: true,}, function(err, db) {
      if (err) {
          res.sendStatus(500);
          return;
      }
      const dbo = db.db(dbName);
      dbo.collection('tasks').find({}).toArray(function(err, tasks) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.status(200).send(tasks);
      });
    }
    );
}
function login(req,res){
  console.log("/users/login is accessed");
  MongoClient.connect(url, {useUnifiedTopology: true,useNewUrlParser: true,}, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    };
    const dbo = db.db(dbName);
    //espesting email, password
    const queryUser=req.body;
    
    dbo.collection(collectionName).findOne(queryUser, function(err, user) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      };
      if(user) {
        //this is post but no document is created 
        return res.status(200).send(user);
      }
      //user not found
      return res.sendStatus(404);
    });
  });  
}
function register(req,res){
    console.log("/users/register is accessed");
    MongoClient.connect(url,{useUnifiedTopology: true,useNewUrlParser: true,}, function(err, db) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      };
      const dbo = db.db(dbName);
      //espesting email, password
      const queryUser=req.body;
      dbo.collection(collectionName).findOne({email:queryUser.email}, function(err, userfound) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        };
        if(userfound) {
          //--email found 
          return res.sendStatus(400);
        }
        //no match insert user
        dbo.collection(collectionName).insertOne({email:queryUser.email,password:queryUser.password,userID:idsUsers}, function(err, result) {
          if (err) {
            console.log(err);
            return res.sendStatus(500);
          };
          idsUsers++;
          return res.status(201).send({email:queryUser.email,password:queryUser.password,userID:idsUsers-1});
        });      
      });
    });
}

function taskUpdate(req,res){
  console.log("/items is accessed");
  MongoClient.connect(url, {useUnifiedTopology: true,useNewUrlParser: true,},function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    };
    const dbo = db.db(dbName);
    const query=req.body;
    var myquery = { askID:query.taskID };
    var newvalues = { $set: {userID:Number(query.userID),clientName:query.clientName,telefon:query.telefon,email:(query.email),description:query.description} };
    dbo.collection("tasks").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    // ? db.close();
    });
  });
}

 function taskAdd(req,res){
  console.log("/tasks  is accessed");
  MongoClient.connect(url, {useUnifiedTopology: true,useNewUrlParser: true,},function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    };
    const dbo = db.db(dbName);
    const query=req.body;
    //no match insert 
    dbo.collection('tasks').insertOne({taskID:idsTasks,userID:Number(query.userID),clientName:query.clientName,telefon:query.telefon,email:(query.email),creationDate:new Date(),description:query.description}, function(err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      };
      idsTasks++;
      return res.status(201).send({taskID:idsTasks,userID:Number(query.userID),clientName:query.clientName,telefon:query.telefon,email:(query.email),creationDate:query.creationDate,description:query.description});
    });      
  });
}
module.exports.register = register;
module.exports.login = login;
module.exports.handeGet = handeGet;
module.exports.handeDelete = handeDelete;
module.exports.taskAdd = taskAdd;
module.exports.taskUpdate = taskUpdate;