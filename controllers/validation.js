const { body } = require('express-validator');
 
module.exports = [
    body('title', 'The title should be at least 4 characters long')
    .custom((value) => {
       if( value.length < 4) {
            throw new Error ('The title should be at least 4 characters long')
  }
        return true;

    }),
    body('description', 'The description should at least 20 characters long')
    .custom((value) => {
       if( value.length < 20) {
            throw new Error ('The description should at least 20 characters long')
  }
        return true;

    }),
    body('imageUrl', 'The imageUrl should starts with http or https')
    .custom((value) => {
        const startsWithHttp= value.slice(0,4)
        const startsWithHttps= value.slice(0,5)

       if( startsWithHttp !== "http" || startsWithHttps !=='https' ) {
            throw new Error ('The imageUrl should starts with http or https')
  }
        return true;

    })
     
]