const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const Products=sequelize.define('products',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    productcode:{
      type:Sequelize.STRING,
      allowNull:false,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    suggestedunitprice:{
        type:Sequelize.INTEGER,
    },
    unitsinstock:{
        type:Sequelize.INTEGER,
    },
    reorderlevel:{
        type:Sequelize.STRING,
    },
    barcode:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})

module.exports=Products;