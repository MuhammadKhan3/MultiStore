const Sequelize=require('sequelize');

const sequelize=require('../untils/database');

const City=sequelize.define('city',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    city:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    latitude:{
        type:Sequelize.DECIMAL,
        allowNull:false,
    },
    longitude:{
        type:Sequelize.DECIMAL,
        allowNull:false,
    },
    country:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    iso2:{
        type:Sequelize.STRING,
    },
    admin_name:{
        type:Sequelize.JSON,
    },
    capital:{
        type:Sequelize.STRING,

    },
    population:{
        type:Sequelize.STRING,
    },
    population_proper:{
        type:Sequelize.STRING,
    }
})
module.exports=City;