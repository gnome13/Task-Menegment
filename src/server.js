const express = require("express");
const app = express(),  PORT = 8080;
const mongodbBooks=require('./mongoDB_BuyingCenter');
const path = require("path");
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

// --- used for json in body
app.use(express.json());

let idsUsers = 3;
let idsItems=3;
let idCategoriot=3;
let idOrders=3;
let idStatus=3;

const users = [
    { userID: 1, userName: 'Gozman Valentina', password: '12345678',createDate:'12/11/2019',mail:'gozmanv@013.net',telefon:'+972544532852',boss:true },
    { userID: 2, userName: "Gozman Alisa", password: "87654321",createDate:"13/11/2019",mail:"kukue@013.net",telefon:"+972544882852",boss:false }
];
const userAdress = [
    { userID: 1, shipingYes: true, street: "ahad am",house:10,flat:10,town:"lod",postcode:"444444" },
    { userID: 1, shipingYes: false, street: "ahad am",house:10,flat:10,town:"lod",postcode:"444444" }
];
const userCardNo = [
    { userID: 1, cardNo: "12345678912345", validity: "10/10/2019", csv: "926" },
    { userID: 2, cardNo: "1234555512345", validity: "10/10/2019", csv: "226" }
];  
const categoriot = [
    { categoriot: 1, description: "dress" },
    { categoriot: 2, description: "shoes" }
];  
const items = [
    { itemID: 1, categoriotID: 1, description:"bbbbbbbbbbb", picture: 'dress1.jpg', price: 100 },
    { itemID: 2, categoriotID: 1, description:"bbbbbbbbbbb", picture: 'dress2.jpg', price: 150 }
];  
const shoppingCard = [
    { userID:1 , itemID: 1 },
    { userID:1 , itemID: 2  }
];  
const orders = [
{ orderID:1 , userID:1 , itemID: 1 ,date:"20/10/2019",status:1},
{  orderID:1 , userID:1 , itemID: 2 ,date:"20/10/2019",status:1 }
];  
const status = [
    { status: 1, description: "create" },
    { status: 2, description: "on fly" }
];  


  
  app.get('/users',(req,res)=>{

    mongodbBooks.handeGet(req,res);
})
app.delete('/books/:id',(req,res)=>{

    mongodbBooks.handeDelete(req,res);
})
app.post('/books',(req,res)=>{

    mongodbBooks.handePost(req,res);
})

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});

