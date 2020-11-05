var express = require("express");
var path = require("path");
const fs = require("fs")
let i=1
var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.js"));
  });
 

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });



  app.delete("/api/notes/:id", function(req, res) {
      console.log("id received:",req.params.id)
      const ID=req.params.id
      fs.readFile('./db/db.json','utf8', function read(err, data) {
        if (err) {
            throw err;
        }

        var obj=[]
        obj=data.split(" ")
        var newObject = obj.filter(function (el) {
            return el != '';
          });
        var jsonObject=newObject.map(JSON.parse)
        const Index = jsonObject.findIndex(function(item, i) {
            return item.id == ID
          });
    
          if (Index > -1) {
            jsonObject.splice(Index, 1);
          }
          fs.writeFile('./db/db.json', ``, function read(err) {
            if (err) {
                throw err;
            }
           
            
        });
        for (i=0; i< jsonObject.length; i++)
        {
          fs.appendFile('./db/db.json', `${JSON.stringify(jsonObject[i])} `, function read(err) {
            if (err) {
                throw err;
            }
            
            
        });


    }


          res.send("completed")

  });
});

app.get("/api/notes", function(req, res) {
    fs.readFile('./db/db.json','utf8', function read(err, data) {
        if (err) {
            throw err;
        }
         if (data!= '') {
         const content = (data);
        console.log("content:",content)

        var obj=[]
        obj=data.split(" ")
        console.log(obj)

        var newObject = obj.filter(function (el) {
            return el != '';
          });
        console.log("removed empty",newObject)
        var jsonObject=newObject.map(JSON.parse)
        console.log(jsonObject)
        res.send(jsonObject)
        console.log("message sent...")
         }

         else {
          console.log("nothing sent")
            res.send("")
           
         }
    });
});
 
    app.post("/api/notes", function(req, res) {
        console.log("test API route")
        console.log(req.body)
        req.body.id=i
        i++
        var data=JSON.stringify(req.body)
        console.log("data",data)
        fs.appendFile('./db/db.json', `${data} `, function read(err) {
            if (err) {
                throw err;
            }
            console.log(data)
            res.send(JSON.stringify(data))
            
        });
});
    

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });