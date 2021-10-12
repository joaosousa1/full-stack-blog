const express = require('express')
//var compression = require('compression')
const middleware = require('./middleware/auth')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser'); //ler campos no body da pagina
const config = require('./config'); // get our config file
const mongoose = require('mongoose'); //database
const cors = require('cors')

const path = require('path');
const fs = require('fs')
const https = require('https');

mongoose.connect(config.database); // connect to database
const Posts = require('./models/posts'); // get our mongoose model
const Users = require('./models/users'); // get our mongoose model

//port 3000
const port = 5000;
//port https
const port2 = 8080;

const app = express();

// Redirect from http port 3000 to https 8080
if (config.useHttps) {

  var http = require('http');
  var app2 = express();
  http.createServer(app2).listen(port2);
  app2.use(function (req, res, next) {
    if (!req.secure) {
      //redireciona no mesmo porto
      //return res.redirect('https://' + req.headers.host + req.url);
      //em cima linha a usar em produção
      return res.redirect('https://' + 'localhost:' + port2 + req.url);
    }
    next();
  });

}

//app.use(compression());
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//############ CORS ########################################
//Caso pretenda usar outro servidor para hospedar o front-end
app.use(
  cors({
    origin: "http://localhost:3000", //front-end port
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
)

//############ Public folder ( opcional )##################################
//Coloque os ficheiros criados pelo front-end dentro da pasta public do back-end
//Caso pretenda que sejam disponibilizados pelo express 

//app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send("indique o endpoint");
});

//Endpoints
app.post('/login', function (req, res) {
  middleware.login(req, res);
});

app.get('/logout', function (req, res) {

  //res.clearCookie('token', {domain: 'http://localhost:3000', path: '/'});
  res.clearCookie('token');
  res.redirect('http://localhost:3000');

});

app.get('/posts', function (req, res) {
  Posts.find({}, function (err, posts) {
    res.json(posts);
  });
});

//pagination
app.get('/posts/:p/:l', paginatedResults(Posts), (req, res) => {
  res.json(res.paginatedResults)
})

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.params.p)
    let limit = parseInt(req.params.l)

    //não permite mais que 10
    if (limit > 10) { limit = 10 }

    const startIndex = (page - 1) * limit

    const results = {}

    results.total = await model.countDocuments().exec()

    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ success: false, message: e.message })
    }
  }
}

app.post('/posts', middleware.autenticar, function (req, res) {
  //app.post('/posts' , function (req, res) {
  var p = new Posts({
    title: req.body.title,
    body: req.body.body,
    author: res.user //autor vem do midleware
  });
  p.save(function (err, posts) {
    res.json({ success: true, message: 'Post criado co sucesso' })
  });
});

app.get('/posts/:id', function (req, res) {
  Posts.find({ _id: req.params.id }, function (err, post) {
    res.json(post);
  });

});

//ultimo documento
app.get('/lastPost', function (req, res) {
  Posts.find({}, function (err, post) {
    res.json(post);
  }).sort({_id: -1}).limit(1);
});

//pega o documento seguinte ao indicado na id se existir
//db.posts.find({_id: {$gt: ObjectId("615d6e31e753c85e1d7bcee1") }}).limit(1)
// app.get('/next/:id', function (req, res) {

//   try {
//     Posts.find({ _id: { $gt: req.params.id } }, function (err, post) {
//       res.json(post);
//     }).limit(1);
//   } catch (error) { //se da erro porque já era o ultimo, então retoma o primeiro
//     Posts.find({}, function (err, post) {
//       res.json(post);
//     }).sort({_id: 1}).limit(1);  
//   }
// });

app.delete('/posts/:id', middleware.autenticar, function (req, res) {
  //app.delete('/posts/:id' , function (req, res) {
  Posts.findOneAndRemove({ _id: req.params.id }).exec();
  res.json({ success: true, message: `Post ${req.params.id} apagado com sucesso` })
});

//update posts
app.put('/posts/:id', middleware.autenticar, function (req, res) {
  Posts.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        body: req.body.body
      }
    }).exec();
  res.json({ success: true, message: `Post ${req.params.id} atualizado com sucesso` })
});

app.post('/regist', function (req, res) {
  middleware.registrar(req, res);
});

//end point para o front-end checar se está logado
app.get('/status', middleware.autenticar, function (req, res) {
  res.json({ success: true, userName: res.user });
});

if (config.useHttps) {

  // com https self signed certificate
  https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'certificate', 'server.key')),
    //key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync(path.join(__dirname, 'certificate', 'server.crt')),
    //cert: fs.readFileSync('cert.pem')
    passphrase: 'lamePass' // certificate passphrase
  }, app).listen(port2);
  console.log('server at https://localhost:' + port2 + ' with self signed certificate.');
  console.log("check mongodb: sudo systemctl status mongodb.service");

} else {

  app.listen(port)
  console.log('server at http://localhost:' + port);
  console.log("check mongodb: sudo systemctl status mongodb.service");

}