const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const Stock=sequelize.define('stock',{
    id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
});

module.exports=Stock;