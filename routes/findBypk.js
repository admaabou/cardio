const {Mesuresnm  } = require("../src/db/sequelize")
 
module.exports = (app) => {	
	
  app.get('/api/mesure/:id', (req, res) => {
	     const id= req.params.id
    Mesuresnm.findByPk(parseInt(req.params.id))
      .then(ms => {
		  if (ms == null){
			    const message = `la mesure     non trouve `	
                 res.status(400).json({ message, data:  null })				
 			   
		  } else    {
        const message = 'Une mesure a bien été trouvé.' ;
        res.json({ message, data: ms }) ;
		  }
      }).catch( (err) => { 
	         const message = `la mesure      non trouve ${err} `			 
	       res.status(500).json({ message, data: null })
			 }  )
  })
}
