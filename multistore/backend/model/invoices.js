const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const Invoice=sequelize.define('invoice',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
});

module.exports=Invoice;