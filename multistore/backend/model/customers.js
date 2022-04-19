const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const Customers=sequelize.define('customer',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    contact:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING,
    },
})
module.exports=Customers;