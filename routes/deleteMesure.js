const {Mesuresnm} = require("../src/db/sequelize")
module.exports = (app) => {
  app.delete('/api/mesure/:id', (req, res) => {
    Mesuresnm.findByPk(req.params.id).then(m => {
      const mDeleted = m;
      Mesuresnm.destroy({
        where: { id: m.id }
      })      .then(_ => {
        console.log("ok deleted")
        const message = `La mesure avec l'identifiant n°${mDeleted.id} a bien été supprimé.`
        res.json({ret:'ok', message, data: mDeleted })
      }).catch(err=> {throw err})
    }).catch(err=>{
      console.log("ko ", err)
      const message = `La mesure avec l'identifiant n°${mDeleted.id} n'a pas  été supprimé.`
      res.json({ret:'ko', message, data: mDeleted })
    })
  })
}
