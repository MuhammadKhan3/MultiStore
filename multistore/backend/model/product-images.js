const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const ProductImages=sequelize.define('productimages',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,        
        primaryKey:true,
    },
    imageurl:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});
module.exports=ProductImages;