const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const Images=sequelize.define('image',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    imageurl:{
        type:Sequelize.STRING,
    }
});

module.exports=Images;