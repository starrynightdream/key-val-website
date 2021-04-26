const fs = require('fs');
const path = require('path');

const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

const User = {
    'admin':'pass'
}

const KeyVal = {
    'key':'value'
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'and secret in there',
    resave: false,
    saveUninitialized: true,
}));

app.post('/login', (req, res) =>{

    if ( User[req.body.id])
    {
        if (User[req.body.id] == req.body.pass)
        {
            req.session.already = true;
            req.session.id = req.body.id;
            res.json({
                'code':1
            });
        }
    }
    else{
        res.json({
            'code':0
        });
    }
});

app.post('/regist', (req, res) =>{

    if (!User[req.body.id])
    {
        User[req.body.id] = req.body.pass;
        req.session.already = true;
        req.session.id = req.body.id;
        res.json({
            'code':1
        });
    }
    else{
        res.json({
            'code':0
        })
    }
});

app.post('/search', (req, rse) =>{

});

app.post('/addkv', (req, rse) =>{

});

app.use(express.static(path.join(__dirname, "/node_modules/")));

/*
 * 登录与注册
 */
app.use('/lar', (req, res) =>{
    res.sendFile(
        path.join(__dirname, "/view/html/login_regist.html")
    );
});


/*
 * 查找与设置
 */
app.use('/sas', (req, res) =>{
    res.sendFile(
        path.join(__dirname, "/view/html/search_set.html")
    );
});

/*
 * 主页
 */

app.use('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "/view/html/index.html"));
});

app.listen(port, ()=>{
    console.log('now run at port' + port);
});