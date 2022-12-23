
// App
let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    path = require('path'),
    router = express.Router()

let routes = require('./api/routes/logRoutes')
routes(app)

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/', router);
app.listen(port)

console.log('Listening on: ' + port)