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

app.use('/node_modules/', express.static( path.join( __dirname, "/node_modules/")));
app.use('/js/', express.static( path.join( __dirname, "/view/js")));
app.use('/js5/', express.static( path.join( __dirname, "/view/js5")));
app.use('/css/', express.static( path.join( __dirname, "/view/css")));

app.post('/user', (req, res) =>{
    
    res.json({
        'code' : req.session.already ?'1' : '0',
        'message' : req.session.uid
    });
});

app.post('/login', (req, res) =>{

    if ( User[req.body.id] && User[req.body.id] == req.body.pass){
        req.session.already = true;
        req.session.uid = req.body.id;
        res.json({
            'code':1
        });
    } else{

        res.json({
            'code':0
        });
    }
});

app.post('/regist', (req, res) =>{

    if (!User[req.body.id]) {

        User[req.body.id] = req.body.pass;
        req.session.already = true;
        req.session.uid = req.body.id;
        res.json({
            'code':1
        });
    }
    else {
        res.json({
            'code':0
        })
    }
});

app.post('/search', (req, res) =>{

   let key = req.body.key;
   
   if (key && KeyVal[key]){

       res.json({
           'code' :1,
           'message' :KeyVal[key]
       });
    } else{

        res.json({
            'code' :0,
            'message' : undefined
        });
    }
});

app.post('/addkv', (req, res) =>{

   let key = req.body.key;
   let val = req.body.value;
    if (key){
        KeyVal[key] = val;
        res.json({
            'code' :1
        });
    }else {

        res.json({
            'code' :0
        });
    }
});

/*
 * 登录与注册
 */
app.use('/lar', (req, res) =>{
    res.sendFile(
        path.join(__dirname, "/view/html/login_regist_nothing.html")
    );
});


/*
 * 查找与设置
 */
app.use('/sas', (req, res) =>{
    res.sendFile(
        path.join(__dirname, "/view/html/search_set_nothing.html")
    );
});

// 收藏图标
app.get('/favicon.ico', (req, res) =>{
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

/*
 * 主页
 */
app.get('/', (req, res) =>{
    // res.sendFile(path.join(__dirname, "/view/html/index.html"));
    res.sendFile(path.join(__dirname, "/view/html/index_nothing.html"));
});

app.listen(port, ()=>{
    console.log('now run at port' + port);
});