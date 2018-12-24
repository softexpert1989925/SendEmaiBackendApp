var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
})
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// CREATES A NEW USER
router.post('/add_user', function (req, res) {

 
    
    User.create({
             firstname: req.body.firstname,
            lastname : req.body.lastname,
            password : req.body.password,
            telnumber:req.body.telnumber,
            email:req.body.email
        }, 
        function (err, user) {
            user={};
            if (err) {
                user.result='failed';
                return res.status(500).send(user);
            }
            user.result='ok';            
            res.status(200).send(user);
        });
});

// RETURNS THE USER IN THE DATABASE
router.post('/', function (req, res) {   
   console.log(req.body.password);
    User.findOne({'email':req.body.email}, 
          function (err, user) {
        //console.log(user);
        var data={};
        if (err){ 
            //console.log(err);
            data.result="error";
            return res.status(500).send(data);
        } 

            
        if(user==null)
             data.result="failed";
        else
             data.result="success";

        data.doc=user;
        console.log(data);
        res.status(200).send(data);        
    }); 
    
});
 //return all user in the database
router.get('/all', function (req, res) {   
    //  console.log(req.params.username);
      User.find({}, function (err, users) {
        var data={};
        if (err){ 
            //console.log(err);
            data.result="error";
            return res.status(500).send(data);
        } 

        data.result="success";
        data.users=users;        
        res.status(200).send(data);          
      });
    
      console.log(__dirname);
  });

// // GETS A SINGLE USER FROM THE DATABASE
// router.get('/:id', function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//         res.status(200).send(user);
//     });
// });

 //DELETES all USER FROM THE DATABASE
 router.delete('/all', function (req, res) {
    
    User.remove({}, function (err, user) {
         if (err) return res.status(500).send("There was a problem deleting the user.");
         res.status(200).send("");
     });
 });

// // UPDATES A SINGLE USER IN THE DATABASE
// router.put('/:id', function (req, res) {
//     User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
//         if (err) return res.status(500).send("There was a problem updating the user.");
//         res.status(200).send(user);
//     });
// });


module.exports = router;