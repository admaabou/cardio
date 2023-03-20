const { Sequelize, DataTypes } = require('sequelize')
const MesuresnModel = require('../models/Mesures')
const UserModel = require('../models/User') 
 const  bcrypt  = require("bcrypt")
 /*
 const sequelize = new Sequelize('Mydb', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mariadb',   // driver
port: '3307', //-------------> mariadb is using  3307

  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
}) */
const sequelize = new Sequelize('railway', 'root', 'Ar1vbhrDRY32G81e6lIo', {
  host: 'containers-us-west-202.railway.app',
  dialect: 'mariadb',   // driver
port: '7026', //-------------> mariadb is using  3307

  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
//==================railway
//mysql://root:R42JN4ivoj0gemaPS44g@containers-us-west-190.railway.app:7021/railway
//mysql://root:Ar1vbhrDRY32G81e6lIo@containers-us-west-202.railway.app:7026/railway
//=====================
  
const Mesuresnm = MesuresnModel(sequelize, DataTypes)
const Userm = UserModel(sequelize, DataTypes)
 const  sync= (bol=false)=>{
	return   sequelize.authenticate().then(sequelize.sync({force: bol}))
 }
var addUser =(u,p, m) =>{
	console.log("ooooooooooouuuuuuuuuuuuuuuuuuuuuuu")
    const  salt =10          // as this is  big  as it's  hard  to     hack de pass
   bcrypt.hash( p , salt).then( hash => {
	const us = { username: u, password:hash, email:m}
	return Userm.create(us) 
      }).catch( err=>{throw err})	
} 

var findUserByPk = (uid)=> {
    Userm.findOne( uid).then( u =>{
       if (! u) {
         return null
       }
       return  u
    }
    ).catch(err=>{return  null});
}
var findUserByName =async  function(name ) {
  var u = await   Userm.findOne( {
    where: {      username: name    }}
  )  
}
var addMesure =(v1,v2 , uid) =>{
	console.log(" adding  mesure")   
	const ms = { value1: v1, value2:v2 , uid: uid}
	return Mesuresnm.create(ms)     
} 
module.exports = {  sequelize,
   Mesuresnm ,   sync , addUser , Userm, addMesure, findUserByPk,findUserByName
}