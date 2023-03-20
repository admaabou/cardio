 const sequelize =   require("../src/db/sequelize")
const bcrypt = require('bcrypt')
const {Op}  = require("sequelize")
console.log("login.js----------------")
 const  jwt = require("jsonwebtoken")
 const  key4jwt = require("../auth/key4jwt")
module.exports = {  postreg :
    (app) => {
  app.post("api/coco" , (req, res) => {
	  console.log("????????????????????????????")
	  console.log(req.bodty)
	  /*
	  addUser(req.body).then( () => {
        res.json({ret:'ok' , message:'registred ' , data:{}})
	  }).catch( err=>{
		res.json({ret:'ko' , message:'error  '+err , data:err})
	  }) */

     })  // end 
  },
     getRegister: 
   (app) => {
	  
  app.post("/api/register" , (req, res) => {
	  console.log("register get")
	  console.log("????????????????????????????")
	  console.log(req.body)
	  const p = req.body.password
	  const u = req.body.username
	  const m = req.body.email
	  const  salt =10          // as this is  big  as it's  hard  to     hack de pass
	  bcrypt.hash( p , salt).then( hash => {
	   const us = { username: u, password:hash, email:m}
	   sequelize.Userm.create(us).then(()=>{ 
		    console.log("user created ")
		res.json({ret:'ok' , message:'registred ' , data:{}})	   
	  }).catch(err=>{

               console.log("user  not created   ")
			   throw err	  })
	}).catch( err=>{
		console.log("user  not created   "+err)
		res.json({ret:'ko' , message:'error  '+err , data:err})
	})
 
     })  // end
  }
}
   