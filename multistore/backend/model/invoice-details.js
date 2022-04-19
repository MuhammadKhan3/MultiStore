const Sequelize=require('sequelize');
const sequelize=require('../untils/database');

const InvoiceDetails=sequelize.define('invoicedetail',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    paymentmethod:{
        type:Sequelize.ENUM("cash","jazzcash","creditcard","other")
    },
    paymentstatus:{
        type:Sequelize.ENUM("verified","pending","draft","other")
    },
    message:{
        type:Sequelize.STRING,
    },
    amount:{
        type:Sequelize.DECIMAL(10,2),
    }
});

module.exports=InvoiceDetails;