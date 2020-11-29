const { Router } = require('express');
const { saveUser, verifyUser, checkGestAccess, getUserStatus } = require('../controllers/user'); 
const { validationResult } = require('express-validator');
const validationRegister = require('../controllers/validationRegister');
const validationLogin = require('../controllers/validationLogin');

const router = Router();

router.get('/login', checkGestAccess, getUserStatus, (req,res) => {
    res.render('login', { isLoggedIn: req.isLoggedIn })
}) 

router.get('/register',checkGestAccess, getUserStatus, (req,res) => {
    res.render('register', { isLoggedIn: req.isLoggedIn })
}) 
 
router.post('/register',validationRegister, async (req,res)=>{
   const errors= validationResult(req);
   
   if(!errors.isEmpty()){
      return res.render('register',{
           message: errors.array()[0].msg
       })
   }

try {
  await saveUser(req,res);
  return  res.redirect('/login')
} catch (e) {
    console.error(e)
  return  res.render('register',{
      message: e
  })
}

})

router.post('/login',validationLogin, async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
       return res.render('login',{
            message: errors.array()[0].msg
        })
    }
 
  const status = await verifyUser(req,res);
  console.log(status);
  if (status) {
      return res.redirect('/');
  }
  res.render('login',{message: 'Wrong username or password!'})

})

router.get('/logout',(req,res)=>{
    res.clearCookie('aid')
    res.redirect('/')
})

module.exports = router;