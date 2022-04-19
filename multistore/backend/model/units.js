const Sequelize=require("sequelize");
const sequelize=require("../untils/database");

const Units=sequelize.define('unit',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,

    }
});

module.exports=Units;