const { Router } = require('express');
const { validationResult } = require('express-validator');
const { getUserStatus, checkAuthentication } = require('../controllers/user'); 
const validation = require('../controllers/validation'); 
const Course = require('../models/course');
 
const router = Router();

router.get('/',getUserStatus,async (req, res) => {  

let courses=[]
if (req.isLoggedIn) {
     courses = await Course.find({}).sort({createdAt:'asc'}).lean()
}else{
      courses = await Course.find({}).sort({usersEnrolled:'desc'}).limit(3).lean() 
}

   
    res.render('home', { 
        isLoggedIn:  req.isLoggedIn,
        user: req.user ,
        courses
     });    
 
   
})

router.get('/create',getUserStatus,async(req,res)=>{
  if(!req.user){
   return  res.redirect('/login')
  }
   res.render('create',{
             isLoggedIn:  req.isLoggedIn, 
               user: req.user 
         })
})

router.post('/create',getUserStatus,validation, async(req,res)=>{
    const errors= validationResult(req);
   
    if(!errors.isEmpty()){
       return res.render('create',{
        isLoggedIn:  req.isLoggedIn,
        user: req.user,
            course: req.body,
            message: errors.array()[0].msg
        })
    }
   const {title,description,imageUrl,duration} = req.body;
   const data= {title,description,imageUrl,duration,createdAt:Date.now(),author: req.user.userID,usersEnrolled:[]}
   try{
           await (new Course(data)).save();
              res.redirect("/")
          }catch(e){
            
              res.render('create',{
                  isLoggedIn:  req.isLoggedIn, 
                  user: req.user,
                  message : e
              })
          }
})

router.get('/details/:id',getUserStatus,async(req,res)=>{
   const id=req.params.id
   
   const course = await Course.findOne({_id: id}).lean()
   const isEnrolled = course.usersEnrolled.filter(x=>x.toString()===req.user.userID.toString())
 
          if (!course) {
          return    res.redirect('/')
          }
               res.render('details', { 
               isLoggedIn:  req.isLoggedIn,
               user: req.user,
               course,
               isAuthor:req.user.userID== course.author,
                isEnrolled
             });   
})

router.get('/edit/:id',getUserStatus,async(req,res)=>{
 
   const id=req.params.id
   const course = await Course.findOne({_id: id}).lean()
   console.log(course);
          if (!course) {
          return    res.redirect('/')
          }
               res.render('edit', { 
               isLoggedIn:  req.isLoggedIn,
               user: req.user,
               course
             });   
})

router.post('/edit/:id',getUserStatus,validation,async(req,res)=>{
    const errors= validationResult(req);
   
    if(!errors.isEmpty()){
     return   res.render('edit', { 
            isLoggedIn:  req.isLoggedIn,
            user: req.user,
            course: req.body,
            message: errors.array()[0].msg
          })   
    }

   const id=req.params.id
  
   
   const course = await Course.updateOne({_id: id},
    {
      $set: {title:req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
    } }
   ).lean()
           
            return   res.redirect('/');   
})

router.get('/delete/:id',getUserStatus, async(req,res)=>{
    
    const id = req.params.id
   await Course.deleteOne({_id: id}) 
        res.redirect('/')   
 })

router.get('/enroll/:id',checkAuthentication, async (req,res)=>{
    const playId = req.params.id;
    const {_id} = req.user;
    await Course.findByIdAndUpdate(playId,{
        $addToSet: {
            usersEnrolled: [_id]
        }
    })
    res.redirect(`/details/${playId}`)
    })

router.get('/search',getUserStatus,async(req,res)=>{
  
   const courses = await  Course.find({title:{$regex: new RegExp(req.query.search,'i')}}).lean()
    res.render('home', { 
         isLoggedIn:  req.isLoggedIn,
         user: req.user ,
         courses,
         search: req.query.search
      });   
})
 

module.exports = router;