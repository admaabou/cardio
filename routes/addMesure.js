const {Userm,Mesuresnm  } = require("../src/db/sequelize")
 
module.exports = (app) => {	
  app.post('/api/mesure', (req, res) => { 
	  var o={}
	  console.log('req body =', req.body)
	 Userm.findOne({where : {username :  req.body.name }   })
	 .then(user =>{
		 if (!user) {
			 console.log("------------------->  user  undefined ")
			 return null
		 }
		 console.log("------------------------->OKKK ", req.body)
		 req.body.uid = user.id
	// delete req.body["name"];
	   o ={uid:user.id , value1: req.body.value1,  value2:req.body.value2}
		   console.log("------------------------->",  req.body)
		   Mesuresnm.create( req.body)
		   .then(ms => {
			   console.log("ok ")
			 const message = `La mesure a bien été crée.`
			 res.json({ ret: 'OK',message, data: req.body })
		   }).catch (err => { throw err})

	 }).catch(err =>{console.log("------------------->", err)
    	 res.json({ ret: 'KO',message:'error occured', data: req.body })
	}	 )    
 
/*
	  Mesuresnm.create(o)
      .then(ms => {
		  console.log("ok ")
        const message = `La mesure a bien été crée.`
        res.json({ ret: 'ok',message, data: req.body })
      }).catch (err => {
		  console.log('-------------->  err.name', err.name, err);
		  //  if (err.name === 'SequelizeDatabaseError')
				  if (err.name === 'SequelizeValidationError')
		    {			   
                  return   res.status(400).json({ret:'ko', message: err.message, data: null })
			   }
		   const message = `la mesure n'a bien été crée.`
                  res.status(500).json({ret:'ko', message, data:  null })
		  } ) */
  }) // app.post
}
