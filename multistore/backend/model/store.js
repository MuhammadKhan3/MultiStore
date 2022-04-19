const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const Store=sequelize.define('store',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    uname:{
        type:Sequelize.STRING,
    }
},{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

module.exports=Store;