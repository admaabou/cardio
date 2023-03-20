const jwt = require('jsonwebtoken')
const privateKey = require('../auth/key4jwt')
  
module.exports = (req, res, next) => {
	console.log("in  auth.js -----------------")
  const authorizationHeader = req.headers.authorization
  
  if(!authorizationHeader) {
	  console.log("in  auth.js ----------------- no head")
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }
    
    const token = authorizationHeader.split(' ')[1]   // enlever  le Bearer 
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if(error) {
		console.log("in  auth.js ----------------- token ")
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }
  
    const userId = decodedToken.userId
	
    if (req.body.userId && req.body.userId !== userId) {$
	console.log("in  auth.js ----------------- user ")
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
		console.log("quth  next ------------------" ,  req.body.userId)
      next()
    }
  })
}

