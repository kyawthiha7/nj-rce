const express = require('express');
const router = express.Router();

router.get('/', function(req,resp){
    resp.render('Welcome');
})

router.get('/login', function(req,resp){
    resp.render('login');
})

router.post('/ping', function(req,resp){
    exec('ping -c 2 ' + req.body.address, function(err,stdout,stderr){
        output = stdout+stderr
        resp.render('dashboard',{
                output: output
        })
})
})

router.post('/login', function(req,resp){
    const payload = {
                username : req.body.username,
                langauge : "English",
                server   : "Nodejs",
                admin    : "False" }

    if(req.body.username == 'node-admin' && req.body.password == 'zLFdieOig6Hio4s1BhzB'){
        payload.admin = "True"
        var token = jwt.sign({payload}, 'thisissecretkey');
        resp.cookie("token", token)
        console.log(token);
    }
    if(req.body.username == 'user' && req.body.password == 'user'){
        var token = jwt.sign({payload}, 'thisissecretkey');
        resp.cookie("token", token)
    }
    else {
        payload.user = "unknown"
        var token = jwt.sign({payload}, 'thisissecretkey');
        resp.cookie("token", token)
    }
    resp.redirect('/dashboard');
})

router.get('/dashboard', function(req,resp){
    if(req.cookies.token){
        decoded = jwt.verify(req.cookies.token, 'thisissecretkey');
        console.log(decoded);                                                                                                                                                                                                                        if(decoded.payload.username == "user"){
                resp.render('user')
                //resp.send("user login")
        }

        if(decoded.payload.username == "admin"){
                resp.render('dashboard',{output:null})
                //resp.send("admin login")
        }

    } else {
        resp.end('Unauthorize User !!! ')
    }

})

router.get('/logout', function(req,resp){
    resp.clearCookie("user");
    resp.redirect('login');
})


module.exports = router;
