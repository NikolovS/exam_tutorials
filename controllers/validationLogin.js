const { body } = require('express-validator');

module.exports = [
    
    body('username', 'The username should be at least 5 characters long and should consist only english letters and digits')
    .custom((value) => {
        const regex = new RegExp(/^[A-Za-z0-9]*$/g) 
        const check= regex.test(value)
        if( (value.length < 5) || (!check)) {
            throw new Error (`The username should be at least 5 characters long and should consist only english letters and digits`)
        }
        return true;

    }),
    body('password', 'The password should be at least 5 characters long and should consist only english letters and digits')
    .custom((value) => {
        const regex = new RegExp(/^[A-Za-z0-9]*$/g) 
        const check= regex.test(value)
        if( (value.length < 5) || (!check)) {
            throw new Error (`The password should be at least 5 characters long and should consist only english letters and digits`)
        }
        return true;

    })
     
]