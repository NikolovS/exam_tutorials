const Course = require('../models/course');
 
const getAllCourses = async (callback) => { 
    const course = await Course.find().lean();    
    return course;
}
 
const getCourse = async (id)=> {
    try {
        const course = await Course.findById(id).lean();
        return course;
    } catch (e) {
        console.error(e)
        return null
    }
   
    
}

module.exports = {
    getAllCourses,
    getCourse,
    
 
}