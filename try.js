const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  
    host: "localhost",
  
    port: 3001,
  
    user: "root",
  
    password: "localpass",
    database: "greatbay_DB"
  });


 
   inquirer.prompt([
         {
            type: "list",
            message: "Do you want to post or bid?",
            name: "postBid",
            choices: [
            "Post",
            "Bid"
                    ]
       }   
    ]).then((answer) => {
    console.log(answer)
 if (data === "Post"){
     postItem();
 } else if (data === "Bid"){
     bidItem();
 }      
 else {
   console.error("error")
 }

    })

// function postItem(){
//     inquirer.prompt([
//         {
//           type:"list",
//           name:"post",
//           message:"What would you like to post?",
//           choice: [
//               "item",
//               "task",
//               "job",
//               "project"
//           ]  
//         }
//     ]).then(function postSelect(data){
//         if (data.post === "item"){
//             item(input);
//         } else if(data.post === "task"){
//             task();
//         } else if(data.post === "job"){
//             job();
//         } else if(data.post === "project"){
//             project();
//         }
//     }).catch(error => {
//         console.log(error);
//     })
// };

// function item(){
//   inquirer.prompt([  
  
//     {
//     type: "input",
//     name: "itemName",
//     message:"What is your item called?",
//   },

//   {
//     type: "input",
//     name: "itemValue",
//     message: "What is the item's value?"
//   },
// ]).then(function(input){
  
//   let itemName = input.itemName;
//   let itemValue = input.itemValue;
  
//   let query = connection.query("INSERT INTO item SET ?",
//   {
//     item_name: itemName,
//     item_value: itemValue,
//   },
//   function(err, res) {
//     if (err) throw err;
//     console.log(res.affectedrows + "item uploaded!\n");
//     startApp();
//   });  
// })
// };

// let itemArray = []


// function bidItem(){
//   inquirer.prompt([
//     {
//         type:"list",
//         name:"",
//         message:"What would you like to bid on?",
//         choice: [
//             "item",
//             "task",
//             "job",
//             "project"
//         ]  
//     }
//   ])
// }



function test () {

  connection.connect(function(r) {
    if (r) throw r;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });
  
  function afterConnection(){
    connection.query("SELECT * FROM item", function(err, res){
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  };
}