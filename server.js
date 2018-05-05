const express = require('express');
const path = require('path');
const bp = require('body-parser');
var session = require('express-session');

let app = express();

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

// render page with a form
app.set('views', path.join(__dirname,'/views'))
app.set('view engine', 'ejs');

app.use(bp.urlencoded({extended:true}));

app.get('/', function(request, response){
    console.log('you hit the root route!');
    response.render('index');
});

app.post('/result', function(request, response){
    console.log('you tried to submit something!');
    console.log(request.body);

    request.session.name = request.body.name
    request.session.comment = request.body.comment

    response.redirect('/page');
});

app.get('/page', function(request, response){
    console.log('you hit the page route! WOO!');
    // look up user obj by user id in session.userid
    var info = {
        name: request.session.name,
        comment: request.session.comment
    }
    response.render('result', {results: info});
});

app.listen(8900, function(errs){
    console.log('look mom, no hands!')
})
