
const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const Suppliers=sequelize.define('Supplier',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    companyname:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    phoneno:{
        type:Sequelize.STRING,
    },
    contactno:{
        type:Sequelize.STRING,
    },
    address:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    homepage:{
        type:Sequelize.STRING,
    }
});
module.exports=Suppliers;