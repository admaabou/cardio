const { Pokemonm  }= require("../src/db/sequelize")
const {Op}  = require("sequelize")
console.dir(Object.keys(require('../src/db/sequelize')));
	    console.log(" ?????????????? ici coint all  -------------")   
module.exports = (app) => {
  app.get('/api/fcpokemons', (req, res) => {	 
		    console.log("?????????????????????  ici -------------")
     if (req.query.name) {
			     
			  const name = req.query.name
			 
			  Pokemonm.findAndCountAll({  limit : 5  , order :[ ['cp' , 'DESC'] ], where : {
				     name : { [Op.like] : `%${name}%`}
			     }				  
			  }
			  ) 
			  .then( (r) =>{ console.log("countall-----------------------") ;
				const message = ` number of records in db           ${r.count} `
				res.json( { message , data:r.rows})
			  }).catch(err =>  console.log(err) )	
 			 
		  }		  
	     else {        
   Pokemonm.findAll()
      .then(pokemons => {
        const message = 'LA liste des pokémons a bien été récupérée.'
	//*	if (Object.keys(pokemons).length === 0) {
		//	    res.status(400).json({message:"liste Vide" , data: {} })
		//} else { 
        res.json({ message, data: pokemons })
		//}
      }).catch( err =>{
		     const message = "impossible de lister tous les pokemons ressayer apres "
 		  res.status(400).json({message , data: err})
		  } )
     }	// end if req.query	  
  })
  
}