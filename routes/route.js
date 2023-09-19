var express = require('express');
var router = express.Router();
const users = require('../services/users')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    data = await users.getMultiple(req.query.page);
    var userData = data.users
    console.log(userData)
    res.render('userlist', {userList: userData});
  } catch (err) {
    console.error(`Error getting users `, err.message);
    next(err);
  }
    
});

// Insert user
router.get('/insertuser', async function(req, res, next) {
  res.render('userForm')
});
// save user
router.post('/saveuser', async function(req, res, next) {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    usertype: 'USER',
  }

  res.redirect('/')
  
});

//update user
router.get('/edituser/:id', async function(req, res, next) {
  const id = req.params.id
  const user = await prisma.users.findFirst({
    where: {
            id: id
        }
      }
  )
  res.render('editForm',{user: user})
});
//update user
router.post('/updateuser', async function(req, res, next) {
  const id = req.body.id
  const user = {
    email: req.body.email,
    password: req.body.password,
    usertype: 'USER',
  }
  
   
  res.redirect('/')
  
});


router.get('/deleteuser/:id', async function(req, res, next) {
  const id = req.params.id
     
  res.redirect('/')
  
});
module.exports = router;
