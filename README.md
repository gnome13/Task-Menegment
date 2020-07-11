database name TaskManagement mongDB,collections users,tasks.
const users = [
  {email:'gozmanv@013.net',password: '12345678',userID: 1, boss:false},
  {email:"val",password: "123",userID: 2,boss:true}
];
{"_id":{"$oid":"5f05c6244fa772c808be05b4"},"email":"gozmanv@013.net","password":"12345678","userID":1,"boss":false}
{"_id":{"$oid":"5f05c6534fa772c808be05b5"},"email":"val","password":"123","userID":2,"boss":true}
const tasks=[
  {taskID:1,userID:1,clientName:'aaaaaaa',telefon: '12345678',email: 'kuku1@com', creationDate:'2020-07-09T21:00:00.000+00:00',description:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
  {taskID:2,userID:1,clientName:'aaaaaaa',telefon: '87654321',email: 'kuku2@com', creationDate:'2020-07-10T21:00:00.000+00:00',description:'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'}
];
{"_id":{"$oid":"5f0987451093a7261c026801"},"taskID":1,"userID":1,"clientName":"aaaaaaa","telefon":"12345678","email":"kuku1@com","creationDate":{"$date":"2020-07-09T21:00:00.000Z"},"description":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}

{"_id":{"$oid":"5f09876f1a30f11ca023f6b6"},"taskID":2,"userID":1,"clientName":"ddddd","telefon":"12345678","email":"kuku1@com","creationDate":{"$date":"2020-07-10T21:00:00.000Z"},"description":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}



