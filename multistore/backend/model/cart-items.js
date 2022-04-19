const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const CartItems=sequelize.define('cartitem',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    quantity:{
         type:Sequelize.BIGINT,
         allowNull:false,
    },
    price:{
        type:Sequelize.DECIMAL(10,2),
        allowNull:false,
    }
})

module.exports=CartItems;