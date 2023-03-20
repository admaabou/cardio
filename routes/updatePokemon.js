const {Pokemonm} = require("../src/db/sequelize")
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemonm.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
     return  Pokemon.findByPk(id).then(pokemon => { // retiur de prom:esse
		  if (pokemon == null){
			    const message = `le pokémon  ${req.params.id}  non trouve `	
                 res.status(400).json({ message, data: makeEmpty() })				
 			   
		  } else    {
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon }) 
		  }
      })          // pas de catch  ert  retour  promesse catche a la sortie
    }).catch( (err) => { 
	        if  (err.name == "SequelizeValidationError") {			   
                  return   res.status(400).json({ message: err.message, data: makeEmpty() })
			   }
	         const message = `le pokémon  ${req.params.id}   non mis na jour ${err} `			 
	       res.status(500).json({ message, data: makeEmpty() })
			 }  )
  })
}
