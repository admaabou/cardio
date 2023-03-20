//--------------------
// see this video  and it's ressources: https://www.youtube.com/watch?v=NRxzvpdduvQ
//  use   ORM  sequelize  with  mariadb
//  the  mysql  server  / mariadb server  must be active   or launch   wamp 
//------------------
const express = require("express")
 
//const helper = require("./helper.js")
const bodyParser = require("body-parser")
const sequelize = require("./src/db/sequelize") 
 
const login = require("./routes/login.js")
const wregister = require("./routes/register.js")
//-----------list exports of sequelize
//console.dir(Object.keys(require('sequelize')));
 const cors = require("cors")
const { application } = require("express")
const PORT = 3000 ||  process.env.PORT
const app = express()
//  ---  parse  req  to  json
app.use(cors())
app.use ( (req, res, next) => {	
  console.log(  "hostoooooooooooo =>"  , req.host , req.body ) 
		  next()
})
// parse application/x-www-form-urlencoded
 
app.use(bodyParser.urlencoded({ extended: false }))
  app.use( bodyParser.json() )

  app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
 
// Add headers before the routes are defined  
app.use(function (req, res, next) {
  
    // Website you wish to allow to connect
  // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
}); 
 //---------------------- register    with   get        api/register
 wregister.getRegister(app) 
//---------------------- login    with   get        api/login
login.glogin(app)
 //------------------  create tables if  not  exist
 sequelize.sync().then(()=>{console.log("ok")}).catch(err=>{ console.log(err)   }) 
 //---------------------- login  with     post          api/login
 login.plogin(app)
 
 //-------list all mesures for name or all     /api/mesures or  search by name api/mesures?name=xx
 require("./routes/findAllrecords") (app)      
//-------------- query one pokemon                 /api/pokemons/:id
 require("./routes/findBypk") (app) 
//----------- add pokemon                 POST  to  /api/pokemons
 require("./routes/addMesure") (app)
//----- modify   record              PUT   /api/pokemons/:id 
require("./routes/updatePokemon") (app)
//-------- remove record          delete   api/mesure/id
require("./routes/deleteMesure") (app)
//----  add  all pokemons from  the  json  file
app.get('/p', (req, res)  =>  {
 console.log("11111111111111111111111111111111111111111111111111")
})
app.get("/init" , function(req , res) { 
  
	if  (req.host != 'localhost' &  req.host != '127.0.0.1') {
		 res.send("this is not allowed   from   this host");
		 exit()
}
console.log("helloooooooooozzzzzzzzoooaaaaaaaaoo");    
sequelize.sync(false).then(()=>{console.log("oko")}).then( () =>{ console.log("--------------->create  users");
sequelize.addUser("moi" , "moi", 'solomon30@hotmail.com')})
.catch(err=>{ console.log(err)   })  
})
app.post('/api/connard' , (req, res)=>{
  console.log(req.body)
  res.json({ret:'ooooooooooo', feedback:'ooooooo'})
})
app.get('/' , (req, res)=>{
  console.log(req.body)
  res.send("okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
})
//---------------- error  404 
app.use ( (req,res, next) => {		 
		   res.status(404).json("impossible d'acceder a la ressource demandee")
})
//---
app.listen(PORT, function() { console.log(`server started on http://localhost:${PORT}`) }    )