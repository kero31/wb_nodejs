var express = require('express');
var router = express.Router();

var Todo = require('../models/Todo.js');
var User = require('../models/User.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /todos */
router.post('/', function(req, res, next) {
  var todo = req.body;
  
  var todoName = todo.name;
  var user =  new User({ name: 'name'+todoName, firstname: 'firstname'+todoName,  age:10 });
  console.log(user);
  User.create(user, function (err, post) {
    if (err) return next(err);
  });
  todo.userId = user._id;
  
  Todo.create(todo, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
  
  
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  console.log(req.params.id);
  
  Todo.findById(req.params.id, function (err, todo) {
    if (err) return next(err);
    
    console.log(todo.id);
    User.findById(todo.userId, function (err, user) {
      if (err) return next(err);
      
      console.log(user.id);
      user.age = user.age + 10;

      user.save(function (err, updatedUser) {
        if (err) return next(err);
        todo.save(function (err, updatedTodo) {
          if (err) return next(err);
          res.json(updatedTodo);
        });
      });
      
      /*
      User.findByIdAndUpdate(user._id, user, function (err, post) {
        if (err) return next(err);
      });
      Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });*/
    });
  });
  
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
