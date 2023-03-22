const { Mesuresnm , sequelize }= require("../src/db/sequelize")
const moment = require("moment")
const {Op}  = require("sequelize")
console.dir(Object.keys(require('../src/db/sequelize')));
                        console.log("findall alllllllllllllllllll ")
//const  auth = require("../auth/authh.js")	
 
 upd_obj = (ar) =>ar.map(obj => {
	 var d= obj.dataValues.created  //.toString() 
	// console.log(typeof   d , moment(d).format("DD/MM/YYYY"))
	obj.dataValues.created = moment(d).format("DD/MM/YYYY")
		return obj;
   })	
   upd_obj_q = (ar) =>ar.map(obj => {
	var d= obj.created  //.toString() 
   // console.log(typeof   d , moment(d).format("DD/MM/YYYY"))
   obj.created = moment(d).format("DD/MM/YYYY")
	   return obj;
  })					
module.exports = (app) => {
  app.get('/api/mesures', (req, res) => {  
	 console.log(' query ', req.query)
		  var   x = 10
		 if (req.query.limit)   x = parseInt( req.query.limit )
		//  console.log("findall alllllllllllllllllll " , x)
     if (req.query.name) {			    
			  const name = req.query.name
		const sql= `select * from  Mesures JOIN  Users  on Users.id=Mesures.uid where  username='${name}'  `
		//console.log("sql =" , sql )	
		//  Mesuresnm.findAll({where:{ name : name}})   // strict search
		 sequelize.query(`select Mesures.* from  Mesures JOIN Users on Users.id=Mesures.uid   where  username='${name}'  `)
			 //---  find using  wild char
			 // Pokemonm.findAll({ limit: x,where:{ name : { [Op.like]: `%${req.query.name}%`	  }} 	  })
			  .then( ms  =>{
				 
				upd_obj_q(ms[0])
				const message = `il y ${ms.length}  records  avec name=${name}`
				res.json( { message , data:ms[0]})
			  }).catch(err =>  console.log(err) )	 			  
		  }		  
	     else {       
			 console.log("in findall without  name") 
   Mesuresnm.findAll()
      .then(ms => {
        const message = 'LA liste des mesures a bien été récupérée.'
	//*	if (Object.keys(pokemons).length === 0) {
		//	    res.status(400).json({message:"liste Vide" , data: {} })
		//} else { 
			//console.log(ms)
			 
	  upd_obj(ms)
 
 
        res.json({ ret:"ok", message, data: ms })
		//}
      }).catch( err =>{
		     const message = "impossible de lister tous les mesures ressayer apres "
 		  res.status(400).json({ret:"ko",message , data: err})
		  } )
     }	// end if req.query	  
  })
  
}
