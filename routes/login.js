const { Userm  }= require("../src/db/sequelize")
const bcrypt = require('bcrypt')
const {Op}  = require("sequelize")
console.log("login.js----------------")
 const  jwt = require("jsonwebtoken")
 const  key4jwt = require("../auth/key4jwt")
const plogin= function(app)   {
	app.post("/api/login" , (req, res) => {

		console.log("req body login", req.body)
	 
		Userm.findOne({where : {username :  req.body.username }   })
		.then( user => {
			if (!user) {
				  return  res.status(404).json({rte:"ko",message:"user not found" , data:req.body    })
			  }
			   bcrypt.compare(req.body.password , user.password )
				  .then(isok =>{ 
				   if(! isok) {
					 return  res.status(401).json({message:"not authentified" , data:req.query    })
				   }		 
				   //--------------- jwt
				   const token  = jwt.sign( {userid: user.id}, key4jwt , {expiresIn: '24h' }            )
				   
				   //----------
						const message = 'user  connecte '
					return     res.json({ret:"ok", message ,  data:req.body , token  })
				 } ).catch(err => {res.status(500).json({ret:"ko", message:"pas connecte" ,  data:req.body   })
				 })   
		}).catch (err =>  res.status(500).json( {ret:"ko",message:"error " ,  data:req.body} ) )
	  
	   }	   ) 

}
const  glogin = function(app) {  
  app.get("/api/login" , (req, res) => {
	console.log("get -----------login xxxxxxxxxxx"  , req.query.username, req.query.password)
 Userm.findOne({where : {username :  req.query.username }   })	 
	.then( user => { console.log("ok" , user.password) 
		  if (!user) {
			  return  res.status(404).json({message:"user not found" , data:req.query    })
		  }
		   bcrypt.compare(req.query.password , user.password)
		   .then( isok => {  console.log("okkkkkkk") 
			 if(! isok) {
				 return  res.status(401).json({message:"not authentified" , data:req.query    })
			 }		
//---------------generate token   jwt
			   const token  = jwt.sign( {userid: user.id}, key4jwt , {expiresIn: '24h' }            )
			   
			   //----------			   
		   return res.json({message:"login ok" , data:user.username , token      })
		   }).catch(err => {  console.log("kooo")
			 res.status(500).json({message:"login ko" , data:req.query       })
			
		   })			   
	}).			   
	catch (err =>{  console.log("5")  ,  res.status(500).json({message:"login ko" , data:req.query       })  } )
		
   }) 
}
module.exports ={glogin , plogin}
/*
module.exports = {  ulogin :
    (app) => {
  app.post("api/login" , (req, res) => {
	  console.log("req body login", req.body)
	  Userm.findOne({where : {username :  req.body.username }   })
	  .then( user => {
		  if (!user) {
				return  res.status(404).json({rte:"ko",message:"user not found" , data:req.body    })
			}
		     bcrypt.compare(req.body.password , user.password )
 			   .then(isok =>{ 
			     if(! isok) {
				   return  res.status(401).json({message:"not authentified" , data:req.query    })
			     }		 
				 //--------------- jwt
				 const token  = jwt.sign( {userid: user.id}, key4jwt , {expiresIn: '24h' }            )
				 
				 //----------
			          const message = 'user  connecte '
			      return     res.json({ret:"ok", message ,  data:req.body , token  })
			   } ).catch(err => {res.status(500).json({ret:"ko", message:"pas connecte" ,  data:req.body   })
			   })   
	  }).catch (err =>  res.status(500).json( {ret:"ko",message:"error " ,  data:req.body} ) )
  
     }) 
  },
     getConnect: 
   (app) => {
	  
  app.get("/api/login" , (req, res) => {
	  console.log("get -----------login xxxxxxxxxxx"  , req.query.username, req.query.password)
   Userm.findOne({where : {username :  req.query.username }   })	 
	  .then( user => { console.log("ok" , user.password) 
	        if (!user) {
				return  res.status(404).json({message:"user not found" , data:req.query    })
			}
		     bcrypt.compare(req.query.password , user.password)
			 .then( isok => {  console.log("okkkkkkk") 
			   if(! isok) {
				   return  res.status(401).json({message:"not authentified" , data:req.query    })
			   }		
//---------------generate token   jwt
				 const token  = jwt.sign( {userid: user.id}, key4jwt , {expiresIn: '24h' }            )
				 
				 //----------			   
			 return res.json({message:"login ok" , data:user.username , token      })
			 }).catch(err => {  console.log("kooo")
			   res.status(500).json({message:"login ko" , data:req.query       })
			  
			 })			   
	  }).			   
	  catch (err =>{  console.log("5")  ,  res.status(500).json({message:"login ko" , data:req.query       })  } )
          
     }) 
  }
   }
*/