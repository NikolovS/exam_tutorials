const { check } = require('express-validator');
 
module.exports = [
    
    check('username', 'The username should be at least 5 characters long and should consist only english letters and digits')
    .custom((value) => {
        const regex = new RegExp(/^[A-Za-z0-9]*$/g) 
       const check= regex.test(value)
        if( (value.length < 5) || (!check)) {
         throw new Error (`The username should be at least 5 characters long and should consist only english letters and digits`)
        }
        return true;

    }),
     
    check('password', 'The password should be at least 5 characters long and should consist only english letters and digits')
    .custom((value) => {
        const regex = new RegExp(/^[A-Za-z0-9]*$/g) 
        const check= regex.test(value)
        if( (value.length < 5) || (!check)) {
            throw new Error (`The password should be at least 5 characters long and should consist only english letters and digits`)
        }
        return true;

    }),
     
    check('rePassword', 'The repeat Password should be equal to the password')
    .custom((value, {req}) => {
        if(value!==req.body.password){
            throw new Error ('The repeat Password should be equal to the password')
        }
        return true;

    }),
   


     
]