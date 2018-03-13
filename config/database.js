if(process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb://kecman:1407988@ds111319.mlab.com:11319/vidjot-prod'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/vidjot-dev'
    }
}