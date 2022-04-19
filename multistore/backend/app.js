const express=require('express');
const app=express()

const cors=require('cors');
const routes=require('./routes/routes')
const sequelize=require('./untils/database');
const bodyparser=require('body-parser');
const path=require('path')

const City=require('./model/city');
const Images=require('./model/images');
const Products=require('./model/products');
const ProductDetail=require('./model/product-detail')
const ProductImages=require('./model/product-images');
const Employee = require('./model/empolyee');
const Category = require('./model/category');
const Suppliers = require('./model/suppliers');
const Store=require('./model/store');
const Units=require('./model/units');
const Carts = require('./model/carts');
const CartItems = require('./model/cart-items');
const Customers = require('./model/customers');
const Order = require('./model/order');
const OrderItems = require('./model/order-items');
const Invoice = require('./model/invoices');
const InvoiceDetails = require('./model/invoice-details');
const Stock=require('./model/stock');
// socket io

app.use(express.json());
app.use((req,res,next)=>{
  bodyparser.urlencoded({extended:false});
  bodyparser.json();
  next();
})
app.use(express.static(path.join(__dirname,'images')));
app.use(express.static(path.join(__dirname,'images','product-images')));
app.use(cors());

app.use('/',routes);

app.use((error,req,res,next)=>{
    console.log("aap."+ error.message);
    res.json({message:error.message,errors:error.data,errorflag:error.flag});
    next();
})






City.hasMany(Employee),
Employee.belongsTo(City);

Employee.hasOne(Images,{unique:true});
Images.belongsTo(Employee);

Products.hasOne(ProductDetail,{foreignKey:'productcode'});
ProductDetail.belongsTo(Products,{foreignKey:'productcode'});

Products.hasMany(ProductImages);
ProductImages.belongsTo(Products);

Category.hasMany(Products);
Products.belongsTo(Category);

Suppliers.hasMany(Products);
Products.belongsTo(Suppliers);

Store.hasMany(Products);
Products.belongsTo(Store);

Units.hasMany(ProductDetail);
City.hasMany(Customers);
ProductDetail.belongsTo(Units);

Employee.hasOne(Carts);

Products.hasMany(CartItems)
CartItems.belongsTo(Products)

Carts.hasMany(CartItems);
CartItems.belongsTo(Carts);

Customers.hasMany(Order);
Order.belongsTo(Customers);

Employee.hasMany(Order);
Order.belongsTo(Employee);

Order.hasMany(OrderItems);
OrderItems.belongsTo(Order);

Products.hasMany(OrderItems);
OrderItems.belongsTo(Products);

Invoice.hasOne(InvoiceDetails);
InvoiceDetails.belongsTo(Invoice)

Order.hasOne(Invoice);
Invoice.belongsTo(Order);

Customers.hasOne(Invoice);
Invoice.belongsTo(Customers);

Employee.hasMany(Invoice);
Invoice.belongsTo(Employee);

Products.hasMany(Stock);
Stock.belongsTo(Products);

sequelize.sync({alter:true}).then((result) => {
    
}).catch((err) => {
    console.log(err);    
});







app.listen(8000);