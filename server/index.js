console.log("app is loading");
const express = require("express");
const app = express();
// const mongoDB_BuyingCenter = require('./mongoDB_BuyingCenter')
const routHelper = require('./routerHelper');
const path=require('path');

// const multer  = require('multer');
// const uploadDirectory = 'uploads/';
// const upload = multer({ dest: uploadDirectory});

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
app.get("/tasks", (req, res) => {
  routHelper.handeGet(req,res);
});
// app.get("/userAdress", (req, res) => {
//   param={ userID: Number(req.query.userID)}
//   mongoDB_BuyingCenter.handeGet(req,res,'userAdress',param);
// });
// app.get("/items", (req, res) => {
//   param={ categoriotID: Number(req.query.categoriotID)};
//   mongoDB_BuyingCenter.handeGet(req,res,'items',param);
// });

// app.get("/shoppingCard", (req, res) => {
//   param={ userID: Number(req.query.userID)};
//   mongoDB_BuyingCenter.handeGetshoppingCard(req,res,'shoppingCard',param);
// });
// app.get("/orders", (req, res) => {
//   param={ userID: Number(req.query.userID)};;
//   mongoDB_BuyingCenter.handeGetOrders(req,res,'orders',param);
// });
app.post("/users/register", (req, res) => {
  routHelper.register(req,res);
});
app.post("/users/login", (req, res) => {
  routHelper.login(req,res);
});
// app.post("/users/order", (req, res) => {
//   routHelper.addOrder(req,res,'orders');
// });
// app.post("/users/shoppingCard", (req, res) => {
//   routHelper.addshoppingCard(req,res,'shoppingCard');
// });
app.post("/users/userAdress", (req, res) => {
  routHelper.userAdress(req,res);
});
// app.post("/categoriot", (req, res) => {
//   routHelper.categoriotAdd(req,res,'categoriot');
// });
app.put("/categoriot", (req, res) => {
  routHelper.categoriotUpdate(req,res,'categoriot');
});
// app.put("/users/userAdress", (req, res) => {
//   console.log(req.body);
//   routHelper.userUpdate(req,res,'userAdress');
// });
app.put("/users/userUpdate", (req, res) => {
  console.log(req.body);
  routHelper.userUpdate(req,res,'users');
});
// app.put("/items", (req, res) => {
//   routHelper.itemsUpdate(req,res,'items');
// });
// app.post("/items", (req, res) => {
//   routHelper.itemsAdd(req,res,'items');
// });
// app.get('/images/:newFieName',(req, res) => {
//   const fullPathName = path.join(__dirname,uploadDirectory,req.params.newFieName);
//   res.sendfile(fullPathName);
// });
// app.post("/api",upload.single('someFile'),(req, res) => {
//   console.log("/api is accessed",req.body,req.file);
//   res.status(201).send({body:req.body,file:req.file});
// });

// app.delete("/shoppingCard", (req, res) => {
//   param={ userID: Number(req.query.userID),itemID: Number(req.query.itemID)};
//   mongoDB_BuyingCenter.handeDelete(req,res,'shoppingCard',param);
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
