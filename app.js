const express =  require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs =  require("ejs");

// -----------------------------------------------------------------------------setting express
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.static("public"));

// -----------------------------------------------------------------------------setting mongoose
mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true, useUnifiedTopology: true });
const articleSchema = {
  title:String,
  content:String
}

const Article = mongoose.model("Article",articleSchema);

// -----------------------------------------------------------------------------handling the API GET
app.route("/articles")
.get(function(req,res){
  Article.find({},function(err,foundArticles){
    if(err){
      res.send(err);
    }else{
      res.send(foundArticles);
    }

  });
})

// -----------------------------------------------------------------------------handling the API POST
.post(function(req,res){

  const newAtricle = new Article({
    title:req.body.title,
    content:req.body.title
  });

  newAtricle.save(function(err){
    if(!err){
      res.send("Hey I'm call back in 'res.send()' \nSucesfully saved in API database");
    }else{
      res.send(err);
    }

  });

})

// -----------------------------------------------------------------------------handling the API DELETE
.delete(function(req,res){
  Article.deleteMany({},function(err){
      if(err){
        res.send(err);
      }else{
        res.send("succesfully deleted all articles");
      }
  });

});

////////////////////////////////   Request targetting a specific route //////////////////////////////////////////
////////////////////////////////   Request targetting a specific route //////////////////////////////////////////
////////////////////////////////   Request targetting a specific route //////////////////////////////////////////
////////////////////////////////   Request targetting a specific route //////////////////////////////////////////

app.route("/articles/:articleTitle")

.get(function(req,res){
    Article.findOne({title:req.params.articleTitle},function(err,foundSingleArticle){
      if(err){
        res.send(err);
      }else{
        res.send(foundSingleArticle);
      }
    });
})
// -----------------------------------------------------------------------------handling the API DELETE

.put(function(req,res){
  Article.update({title:req.params.articleTitle},
    {title:req.body.title,content:request.body.content},
    {overide:true},function(err,result){
      if(err){
        res.send(err);
      }else{
        res.send("p : document updated succesfully");
      }

  });
})
// -----------------------------------------------------------------------------handling the API DELETE

.patch(function(req,res){
  Article.update({title:req.params.articleTitle},
                {$set:{content:req.body}},
                function(err,result){
                  if(!err){
                    res.send("P : succesfully updated articles")
                  }else{
                    res.send(err);
                  }

              });
})

.delete(function(req,res){
  Article.deleteOne({title:req.body.title},function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send("single article deleted succesfully")
    }

  });

});










// -----------------------------------------------------------------------------handling the Listenning

app.listen(3000,function(){
  console.log("server started succesfully");
});
