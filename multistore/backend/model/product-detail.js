const Sequelize=require('sequelize');
const sequelize=require('../untils/database');


const ProductDetail=sequelize.define('productdetail',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    moredescription:{
        type:Sequelize.TEXT,
    },
    comment:{
        type:Sequelize.TEXT,
    },
    buyunitprice:{
        type:Sequelize.DOUBLE,
    }
    ,
    saleunitprice:{
        type:Sequelize.DOUBLE,
        allowNull:false,
    },
});

module.exports=ProductDetail;