# WB

Angular, NodeJS, ExpressJS and MongoDB RESTful API Tutorial.
See [Creating a RESTful API Tutorial](http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/) post for more details.

# Git
https://github.com/kero31/wb_nodejs

## Commit
```bash
git commit -am "First commit"
```
## Push
```bash
git push
```

# Installation
## MongoDB
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

## PHPmongoDB
https://github.com/phpmongodb/phpmongodb
### Driver mongo
```bash
sudo apt-get install php5-dev php5-cli php-pear
sudo pecl install mongodb
```
* Aller dans le répertoire : /etc/php5/mods-available
* Créer le fichier :
```bash
; configuration for php Mongod by module
extension=mongo.so
```
* Aller dans le répertoire : /etc/php5/apache2/conf.d
* Créer un lien symbolique
```bash
sudo ln -s ../../mods-available/mongo.ini 20-mongodb.ini
```

## Node JS
You just need to install dependencies:

```bash
npm install
```

# Launch
## MongoDB
Launch mongodb
```bash
mongod
```
or
```bash
mongod --smallfiles
```
## Node JS
Start the program

```bash
npm start
```

## PHPmongoDB
* Créer un runner "Apache & PHP"
* Le démarrer (MongoDB doit être démarré) (ne peut pas être démarré en même temps que NodeJS)
* Aller sur la page : https://webbati-kero31.c9users.io/apache/phpmongodb
* Login : admin / Password : admin

# Check web page
https://webbati-kero31.c9users.io

# Help
https://docs.angularjs.org/api/ngResource/service/$resource

# Test
http://tech.m6web.fr/introduction-qualite-logicielle-avec-node-js