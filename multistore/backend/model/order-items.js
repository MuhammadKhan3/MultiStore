const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const OrderItems=sequelize.define('orderitem',{
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
    },
    totalprice:{
        type:Sequelize.DECIMAL(10,2),
        allowNull:false,
    }
})
module.exports=OrderItems;