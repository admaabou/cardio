const { Pokemonm  }= require("../src/db/sequelize")
const {Op}  = require("sequelize")
console.dir(Object.keys(require('../src/db/sequelize')));

module.exports = (app) => {
  app.get('/api/fc_pokemons', (req, res) => {	 
		    
     if (req.query.name) {
			     
			  const name = req.query.name
			 // Pokemonm.findAll({where:{ name : name}})   // strict search
			 //---  find using  wild char
			  Pokemonm.findAndCountAll({ limit: 5,where:{ name : { [Op.like]: `%${req.query.name}%` 
      			  }}  
				  })
			  .then( (count ,pokemons) =>{
				const message = `il y ${count}  pokemons  avec name=${name}  dans la base `
				res.json( { message , data:pokemons})
			  })	 			  
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