
console.log("model mesures-----------------------------")
module.exports = (sequelize, DataTypes) => {  // export function with 2 args
  return sequelize.define('Mesure', {
    id: {
		allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,                // key field
      autoIncrement: true               //  autoamtic generation    
    },
    value1 :{
       type:DataTypes.DECIMAL(5,2),  
       allowNull : true,
       validate: {
              }
    },    
    value2 :{
        type:DataTypes.DECIMAL(5,2),  
        allowNull : true,
        validate: {
               }
     },    
     uid: {
		allowNull: false,
      type: DataTypes.INTEGER,                   
    },
  }, { // this is optionnel ;  fields added automatically to each record
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}