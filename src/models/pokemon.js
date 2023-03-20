const validtypes = ["Feu" , "Plante" , "Poisson" , "Eau", "INsecte" , "Normal" , "Vol", "Electrik","Fée"]
console.log("model-----------------------------")
module.exports = (sequelize, DataTypes) => {  // export function with 2 args
  return sequelize.define('Pokemon', {
    id: {
		allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,                // key field
      autoIncrement: true               //  autoamtic generation    
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
	  unique:  {msg : 'errrrrrrror  doit unique'},
	  valide: {notEmpty: {
                    args: true,
                    msg: 'Remarks cannot be empty spaces!'
                } ,
	     notNull : { msg: "name  is null " }
	  }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false ,
	  validate: {  isInt: {
                        msg: "hp Must be an integer number "
                  }    
		  }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
	  validate: {  isInt: {
                        msg: "cp Must be an integer number "
                  }    
		  }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {  isUrl :  true }	  
	   
    },
    types: {   
      type: DataTypes.STRING,
      allowNull: false,
	       get()  {return  this.getDataValue('types').split(',')  } ,               //lors de lecture
    set(types)  {    this.setDataValue('types' , types.join() )             }   ,            // lors ecriture
    valide : { isTypesValid(value)  {  //  le nom isTypesvalid est arbitraire
	    console.log(value.toJSON() );
       // noter que value   recupere ici  n'a pas subie de   setter   donc  une chaine "xxx, yyy, zzz"
       if (!value) { throw new  Error("ce champs ne doit pas etre null/vide " ) }
       if (value.split(",").length > 3 ){   throw new Error("ce champe ne  doit pas avoir plus de 3 valeurs")    }
      value.split(",").forEach( v => { if  ( ! validTypes.includes(v))  {throw new Error(`type ${v} non compris ds liste`) }   }  )
      }
         }

    }
  }, { // this is optionnel ;  fields added automatically to each record
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}