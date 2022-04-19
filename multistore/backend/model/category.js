const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const Category=sequelize.define('category',{
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        Unique:true,
        allowNull:false,
    },
    uname:{
      type:Sequelize.STRING  ,
    }
},{
  charset: 'utf8',
  collate: 'utf8_general_ci'
});
module.exports=Category;