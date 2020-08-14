var express = require('express');
var router = express.Router();
var Author = require('../models/author');

//All authors route
router.get('/', async function(req, res){
  let searchOptions = {}
  if(req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name , 'i');
  }
  try{
    var authors = await Author.find(searchOptions);
    res.render('authors/index',{
      authors: authors,
      searchOptions : req.query
     });
  }catch{
    res.redirect('/');
  }

});

//new authors
router.get('/new',function (req, res){
  res.render('authors/new', {author : new Author()});
});

//create author
router.post('/',async function (req,res){
var author = new Author({
  name : req.body.name
});
  try{
    var newAuthor = await author.save();
    //  res.redirect('authors/$(newAuthor.id)');
    res.redirect('authors/');

  }catch(error){
    res.render('authors/new',{
      author : author,
      errorMessage : 'error creating author'
    })
  }


/*author.save(function(err,newAuthor){
  if (err){
    res.render('authors/new',{
      author : author,
      errorMessage : err.message
    });
  }else{
  //  res.redirect('authors/$(newAuthor.id)');
  res.redirect('authors/');
  }
});*/
});

module.exports = router;
