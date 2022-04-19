const Sequelize=require('sequelize');
const sequelize=require('../untils/database');
const Order=sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },

});
module.exports=Order;