console.log("app is loading");
const express = require("express");
const app = express();
const routHelper = require('./routerHelper');
const path=require('path');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

// --- used for json in body
app.use(express.json());

const users = [
  {email:'gozmanv@013.net',password: '12345678',userID: 1, boss:false},
  {email:"val",password: "123",userID: 2,boss:true}
];
const tasks=[
  {taskID:1,userID:1,clientName:'aaaaaaa',telefon: '12345678',email: 'kuku1@com', creationDate:'2020-07-09T21:00:00.000+00:00',description:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
  {taskID:2,userID:1,clientName:'aaaaaaa',telefon: '87654321',email: 'kuku2@com', creationDate:'2020-07-10T21:00:00.000+00:00',description:'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'}
];
let param='';

app.post("/users/register", (req, res) => {
  routHelper.register(req,res);
});
app.post("/users/login", (req, res) => {
  routHelper.login(req,res);
});
app.get("/tasks", (req, res) => {
  routHelper.handeGet(req,res);
});
app.put("/tasks", (req, res) => {
  routHelper.taskUpdate(req,res);
});
app.post("/tasks", (req, res) => {
  routHelper.taskAdd(req,res);
});
app.delete("/tasks/:taskID", (req, res) => {
  param={ taskID: Number(req.params.taskID)};
  routHelper.handeDelete(req,res,param);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
