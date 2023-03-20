const {Pokemonm , makeEmpty} = require("../src/db/sequelize")
module.exports = (app) => {
	
  app.post('/api/pokemons', (req, res) => {
	 
	  console.log("createpokemlon.j--------------------- biilld a validate")
	   var user = Pokemonm.build(req.body      );
	  user.validate().catch(err=>  console.log("---------> "+ err) );
	 	  console.log("createpokemon.js eof -------------------- biilld")
	 
	  if (!( req.body.name) ) console.log("cratepokemlon.js conard................")
    Pokemonm.create(req.body)
      .then(pokemon => {
		  console.log("ok ")
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      }).catch (err => {
		  console.log('err.name', err.name);
		  //  if (err.name === 'SequelizeDatabaseError')
				  if (err.name === 'SequelizeValidationError')
		    {			   
                  return   res.status(400).json({ message: err.message, data: makeEmpty() })
			   }
		   const message = `Le pokémon ${req.body.name} n'a bien été crée.`
                  res.status(500).json({ message, data: makeEmpty() })
		  } )
  })
}
