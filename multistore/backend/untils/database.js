const Sequelize=require('sequelize');

const sequelize= new Sequelize("pos","root","ahmad327",
{
    dialectOptions: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    },
    host:'localhost',
    dialect:'mysql'
});

module.exports=sequelize;