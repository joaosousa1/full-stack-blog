var mongoose = require('mongoose'); //database
var bcrypt = require('bcryptjs'); //cria hash para password
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('./../models/users'); // get our mongoose model
var config = require('./../config'); // get our config file

//mongoose.connect(config.database); // connect to database
//add fix to DeprecationWarning
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }); // connect to database

var login = function (req, res) {

  // find the user
  User.findOne({
    name: req.body.user
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(403);
      res.json({ success: false, message: 'Erro! Utilizador inválido.' });

    } else if (user) {

      // check if password matches bcrypt
      if (!bcrypt.compareSync(req.body.pass, user.password)) {
        res.status(401);
        res.json({ success: false, message: 'Erro! Password incorreta!.' });
      } else {

        // if user is found and password is right, create a token
        var payload = {
          'name': user.name
        };

        var token = jwt.sign(payload, config.secret, { expiresIn: config.tokenDuration / 1000 });

        if (config.useHttps) {

          // guardar cookie e direcionar para a pagina segura
          //cookie sem maxage e apagado quando fecha a sessão
          res.status(200);
          //res.cookie('token', token, { maxAge: (config.tokenDuration + config.tokenRenovationTime), httpOnly: true, sameSite: 'Strict', secure: true });
          res.cookie('token', token, { httpOnly: true, sameSite: 'Strict', secure: true });
          return res.json({ success: true, message: 'Login com sucesso', userName: user.name });
        } else {
          res.status(200);
          //res.cookie('token', token, { maxAge: (config.tokenDuration + config.tokenRenovationTime), httpOnly: true, sameSite: 'Strict' });
          res.cookie('token', token, { httpOnly: true, sameSite: 'Strict' });
          return res.json({ success: true, message: 'Login com sucesso', userName: user.name })
          //Cookies.set('access_token', response.headers['x-access-token'])
        }

      }
    }
  });

}
module.exports.login = login

var autenticar = function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {

        res.status(401);
        return res.json({ success: false, message: 'Token não é válido ou expirou.' });

      } else {

        // find the user permission
        // não e possivel revogar tokens mas pode se tirar permição ao user que esta na tokem :P no mongodb
        // para revogar todas as tokens mudar a key secret in config.js
        User.findOne({
          name: decoded.name
        }, function (err, user) {
          if (user.permission == true) {

            //Renovar tokem
            //ver default em config file
            //em default o tokem dura 5 minutos e é renovado caso ainda falta dois minutos para expirar
            if ( new Date().getTime() > ( (decoded.exp * 1000) - config.tokenRenovationTime) ) {
              var payload = {
                'name': decoded.name
              };
              //new token
              var token = jwt.sign( payload, config.secret, { expiresIn: config.tokenDuration / 1000 });
              // new tokem
              res.cookie('token',token, { maxAge: ( config.tokenDuration + config.tokenRenovationTime), httpOnly: true, sameSite: 'Strict'});
            }
            //em testes

            //com tokem usa json da api :)
            res.status(200);
            res.user = decoded.name;
            next();
          } else {
            res.status(401);
            res.json({ success: false, userName: 'bot', message: 'Erro! Utilizador sem acesso.'});

          }
        })
      }

    });

  } else {

    //(res.redirect('/login#erro');
    res.status(401);
    return res.json({ success: false, userName: "", message: 'Erro. Sem permissão de acesso' });
  }
}

module.exports.autenticar = autenticar

var registrar = function (req, res) {

  if (config.registar) {
    // find the user
    User.findOne({
      name: req.body.newUser
    }, function (err, newuser) {

      if (err) throw err;

      if (!newuser) {
        //console.log('ok user não existe');
        var user = req.body.newUser;
        var pss = req.body.newUserPass;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pss, salt);
        // create a sample user
        var nick = new User({
          name: user,
          password: hash,
          admin: false,
          permission: true
        });
        // save the sample user
        nick.save(function (err) {
          if (err) throw err;
          console.log('User saved successfully');
          res.status(200);
          res.json({ success: true, message: 'Utilizador registrado com sucesso.' });
          //res.redirect('/login');
        });

      } else if (newuser) {
        console.log('erro user já existe');
        //res.redirect('/registar#erro1');
        res.status(401);
        res.json({ success: false, message: 'Erro o utilizador já existe.' });
      }
    });
  } else {
    //res.redirect('/registar?#erro3');
    res.json({ success: false, message: 'Erro Não é possível registrar novos utilizadores.' });
  }

}

module.exports.registrar = registrar
