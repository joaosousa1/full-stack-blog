module.exports = {

    'secret': 'lamePassword',
    'useHttps': false, //if true dont forget to add certficates in folder certificate.
    'database': 'mongodb://localhost:27017/blog',
    'registar': false, //enable new users regist
    'tokenDuration':  5 * 60 * 1000, //time variable for session duration (token and cookies)
    'tokenRenovationTime' : 2 * 60 * 1000 //janela de tempo em que o token pode ser "renovado"
};
