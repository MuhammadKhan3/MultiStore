const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const Carts=sequelize.define('cart',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
});

module.exports=Carts;