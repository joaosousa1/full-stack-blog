## Front-end Back-end blog template

Single page aplication.
Login via fecth, o http request retoma um cookie **http-only** que contém o token.
Por sua vez quando a pagina faz um request o cookie com o token garante acesso a API que esta protegida com autenticação através desse token.
Não é posível revogar tokens que ainda não expiraram.
Mas e possível através do midddleware verificar se o User registrado tem acesso ou não. Esse acesso fica definido na base de dados na collections Users.
Outra forma de revogar facilmente todos os tokens é alterar a palavra chave que é utilizada para gerar e verificar os tokens.

## MERN Blog

MongoDB Express.js React.js Node.js

## Instalar

cd back-end

npm install

cd ..

cd front-end

npm install

cd ..

## 

## Criar Front-end

cd front-end

npm run build

## Copiar o conteúdo da pasta front-end/build (opcional pode alojar static files em outro servidor)

cp -r build/* ../back-end/public/

## Iniciar Back-end

cd back-end

npm start

##Ver estado do Mongodb (Linux):

```
	sudo systemctl status mongodb.service
```
Iniciar Mongodb:

```
	sudo systemctl start mongodb.service
```
Iniciar Mongodb no arranque do sistema:

```
	sudo systemctl enable mongodb.service
```

[Tuxmind](https://tuxmind.blogspot.com)
