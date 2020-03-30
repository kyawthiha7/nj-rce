const express = require('express');
const router = express.Router();
var serialize = require('node-serialize');

router.get('/', function(req,resp){
    resp.render('Welcome');
})

router.get('/login', function(req,resp){
    resp.render('login');
})

router.post('/login', function(req,resp){
    if(req.body.username == 'admin' && req.body.password == 'admin'){
        var obj = {
            username : req.body.username,
            language : "English",
            server : "Nodejs",
            admin : true
        }
        data = serialize.serialize(obj)
        ser =  Buffer.from(data);
        b64 = ser.toString('base64');
        //console.log(b64)
        resp.cookie("user", b64)
    }
    else {
        var obj = {
            username : req.body.username,
            language : "English",
            server : "Nodejs"
        }
        data = serialize.serialize(obj)
        ser =  Buffer.from(data);
        b64 = ser.toString('base64');
        //console.log(b64)
        resp.cookie("user", b64)
    }
    resp.redirect('/redirects');
})

router.get('/redirects', function(req,resp){
    if(req.cookies.user){
        buf = new Buffer(req.cookies.user,'base64');
        str = buf.toString('ascii');
        obj2 = serialize.unserialize(str);
        console.log(obj2)
        if (!obj2.admin) {
            resp.render('unauthorize');
        }
        else {
            resp.render('dashboard')
        }
    } else {
        resp.end('Unknow user !!! ')
    }

})

router.get('/logout', function(req,resp){
    resp.clearCookie("user");
    resp.redirect('login');
})


module.exports = router;
