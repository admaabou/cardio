
console.log("model user-----------------------------")
module.exports = (sequelize, DataTypes) => {  // export function with 2 args
  return sequelize.define('User', {
    id: {
		allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,                // key field
      autoIncrement: true               //  autoamtic generation    
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
	  unique:  {msg : 'username   doit unique'},
	  valide: {notEmpty: {
                    args: true,
                    msg: 'Remarks cannot be empty spaces!'
                } ,
	     notNull : { msg: "user name  is null " }
	  }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false ,
	  validate: {  notNull: {
                        msg: "pwd  Must be not be null "
                  }    
		  }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false ,
	  validate: {  notNull: {
                        msg: "mail  Must be not be null "
                  }  ,
               isEmail: {
                    msg: "Must be a valid email address",
              }  
		  }
    }
     
     
  }, { // this is optionnel ;  fields added automatically to each record
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}