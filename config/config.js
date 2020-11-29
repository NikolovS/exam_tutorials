module.exports = {
    development: {
        port: process.env.PORT || 5004,
        privateKey: 'SOFT-UNI-WORKSHOP',
        databaseUrl: 'mongodb://localhost:27017/ExamTutorials'
    },
    production: {}
};