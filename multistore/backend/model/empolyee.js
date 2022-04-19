const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const Employee=sequelize.define('Employee',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    jobtitle:{
        type:Sequelize.STRING,
    },
    reportsto:{
        type:Sequelize.STRING,
    },
    imageurl:{
        type:Sequelize.STRING,
    },
    address:{
        type:Sequelize.STRING,
    },
    password:{
      type:Sequelize.STRING,
      allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    verified:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.DATE,
        defaultValue:null  
    }
});

module.exports=Employee;