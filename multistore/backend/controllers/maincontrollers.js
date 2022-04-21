
const fs=require('fs')
const bcrypt=require('bcrypt')
const path=require('path');

const jwt=require('jsonwebtoken');
const { validationResult } = require('express-validator');
const City = require('../model/city');
const Images = require('../model/images');
const Employee = require('../model/empolyee');
const Category=require('../model/category');
const Units=require('../model/units');
const Store = require('../model/store');
const Suppliers = require('../model/suppliers');
const ProductDetail=require('../model/product-detail');
const Products = require('../model/products');
const ProductImages=require('../model/product-images');
const Sequelize=require('sequelize');
const Carts = require('../model/carts');
const CartItems = require('../model/cart-items');
const sequelize = require('../untils/database');
const Customers = require('../model/customers');
const Order = require('../model/order');
const OrderItems = require('../model/order-items');
const Invoice = require('../model/invoices');
const InvoiceDetails = require('../model/invoice-details');
const Stock = require('../model/stock');
const { Console } = require('console');
const Op=Sequelize.Op


exports.socketdashboard=(req,res,next)=>{

}
exports.login=(req,res,next)=>{
  

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Login issue')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    const email=req.body.email;
    const password=req.body.password;
    let userdata;
    Employee.findOne({where:{email:email}}).then((user)=>{
        if(user){
            userdata=user;
            return bcrypt.compare(password,user.password);
        }
       res.status(404).json({msg:"email not exists our database"});
    }).then(login=>{
        if(login){
            const token=jwt.sign({id:userdata.id,email:userdata.email},"authecatedapp",{expiresIn:'24h'});
            return res.status(200).json({msg:"Succefully login",name:userdata.name,flag:login,id:userdata.id,token:token});
        }
        return  res.json({msg:"Enter the valid password",flag:login});
    }).catch(err=>{
        console.log(err);
    });
}

exports.signup=(req,res,next)=>{
    // console.log(req.body.name);
    const name=req.body.name.toLowerCase();
    const password =req.body.password;
    const email=req.body.email;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('validation failed');
        err.statusCode=400;
        err.flag=true,
        err.data=errors.array();
        throw err;
    }   
    bcrypt.hash(password,15).then((passhash)=>{
        return Employee.create({
            name:name,
            password:passhash,
            email:email
        })
    }).then(resdb=>{
        if(resdb){
            const token=jwt.sign({id:resdb.id,email:resdb.email},"authecatedapp",{expiresIn:'24h'})
            console.log(token);
            res.status(201).json({msg:"user successfully created",name:resdb.name,token:{id:resdb.id,gentoken:token}})
        }
    }).catch(error=>{
        const err=new Error("hashing password issue");
        err.statusCode=400;
        err.flag=true,
        err.data=error;
        throw err;
    })
}

exports.insertcart=(req,res,next)=>{
  
  
  const  errors=validationResult(req);
  console.log('hit')
 const cartId=req.body.cartId;
 const productId=req.body.productId
 const quantity=req.body.quantity;
 const price=req.body.price
 const employeeid=req.body.EmployeeId;
 if(!errors.isEmpty()){
   const err=new Error("Insert cart error");
   err.statusCode=404;
   err.data=errors.array();
   throw err;
 }
 Products.findOne({where:{id:productId}}).then((product)=>{
   if(product.unitsinstock>0){
    if(!cartId){
           if(product.unitsinstock>0){
             Carts.create({
               EmployeeId:employeeid
             }).then(cart=>{
               CartItems.create({
                   quantity:quantity,
                   price:price,
                   cartId:cart.id,
                   productId:productId
                 }).then(cartitems=>{
                   product.unitsinstock=product.unitsinstock-1;
                   product.save();
                   res.status(201).json({msg:"Succefully create the cart",cartId:cart.id,flag:true})
                   });
                   }).catch();
           }                
     }else{
      CartItems.findAll({include:[{model:Products}],where:{cartId:cartId}}).then(cartitems=>{
             console.log(cartitems)
       console.log('else.')
       CartItems.findOne({where:{productId:productId,cartId:cartId}})
       .then((cartitem)=>{
         if(cartitem){
           console.log('helloen');
           product.unitsinstock=product.unitsinstock-1;
           product.save();
           cartitem.quantity+=quantity;
           cartitem.price+=(quantity*price);
           cartitem.save();
             res.json({msg:"Updated Succefully  the cart",flag:true,cartitems:cartitems})
            }
            else{
              CartItems.create({
                quantity:quantity,
                price:price,
                cartId:cartId,
                productId:productId
              }).then(cartitems=>{
                res.json({msg:"CartItem Succefully  the cart",flag:true,cartitems:cartitems})
              });
            }
          })
       })
       .catch()
     }   
   }else{

   } 
  })

}

exports.addquantity=(req,res,next)=>{
  console.log(req.body);
  const operator=req.body.label
  const cartitemId=req.body.cartitemId;
  if(operator==='plus'){
    CartItems
    .findOne({where:{id:cartitemId}})
    .then(cartitem=>{

      cartitem
      .getProduct()
      .then(product=>{
        if(product.unitsinstock>0){
             cartitem.quantity=cartitem.quantity+1;
             cartitem.save();
             product.unitsinstock=product.unitsinstock-1;
             product.save();

            res.json({msg:"quantity Increment succefully add"})
        }else{
          res.json({msg:"quantity  is not available"});
        }

      })

    }).then(cartitem=>{
    }).catch();
  }else{
    CartItems
    .findOne({where:{id:cartitemId}})
    .then(cartitem=>{
      if(cartitem.quantity>1){
        cartitem
        .getProduct().then(product=>{
            cartitem.quantity=cartitem.quantity-1;
            cartitem.save();       
            product.unitsinstock=product.unitsinstock+1;
            product.save();
            res.json({msg:"quantity decrement succefully "})
        }).catch()  
      }else{
        res.json({msg:"In cart there are not more quanity "})
      }
    }).catch();
  }
}

//get the cart

exports.getcart=async (req,res,next)=>{
  const errors=validationResult(req);
  console.log(req.body.cartId);
  if(!errors.isEmpty()){
    const error=Error('Error get cart')
     error.data=errors.array();
     throw new error;
  }

  const cartId=req.body.cartId
  console.log("req."+cartId)
 if(cartId){
  const products=await CartItems.findAll({
  
    include:[{
      model:Products,
       attributes: ['name'] 
    }],where:{cartId:cartId},attributes:[
      'id',
      'quantity',
      'price',
      'productId',
      [sequelize.literal('(quantity*price)'),'totalprice'],
    ],});
    let totalprice=0,quantity=0;
    products.forEach(value=>{
      totalprice+=parseInt(value.quantity)*parseFloat(value.price);
      quantity+=value.quantity;
      console.log(quantity);
    })
    let total=0;
      if(products){
        // io.getIO().emit('cartitem',{action:"create",cartitems:products});
        setTimeout(()=>{
          res.json({msg:'Get Cart',cart:products,totalprice:totalprice,quantity:quantity,flag:true});
        },300)
        console.log(products);
      }else{
         res.json({msg:'Products does not exist',flag:false});
      }
 }
  // .then((products)=>{
  //   // console.log('price..')

  //   // products.map(product=>{
  //   //   console.log(product);
  //   //   console.log(product.totalprice);
  //   //   total+=product.totalprice;
  //   // })

  //   if(products){
  //     res.json({msg:'Get Cart',cart:products,totalprice:total,flag:true});
  //     console.log(products);
  //   }else{
  //     res.json({msg:'Products does not exist',flag:false});
  //   }
  // })
}
exports.postOrder=(req,res,next)=>{
 const errors=validationResult(req);
 if(!errors.isEmpty()){
   const err=new Error('Insert Order issue');
   err.data=errors.array();
   err.flag=true;
   err.statusCode=501;
   throw err;
 }


 const cartId=req.body.cartId;
 const contactno=req.body.contactno;
 const customername=req.body.customername;
 const employeeid=req.body.employeeid;
 const paymentstatus=req.body.paymentstatus;
 const paymentmethod=req.body.paymentmethod;
 const totalprice=req.body.totalprice;
 const message=req.body.message;
 let orderid;
 let customerid;

 let cartitem=[];
 Customers.create({
   name:customername,
   contact:contactno
 })
 .then((customer)=>{
  customerid=customer.id
  return Order.create({
     customerId:customer.id,
     EmployeeId:employeeid
   })
 }).then(order=>{
   orderid=order.id;
 return  CartItems
    .findAll({where :{cartId:cartId}})
    .then(cartitems=>{
      cartitem=cartitems
     cartitems.forEach((cart)=>{
      OrderItems.create({
          quantity:cart.quantity,
          price:cart.price,
          totalprice:parseFloat(cart.price)*parseInt(cart.quantity),
          productId:cart.productId,
          orderId:order.id,
        })
      })
    }).catch()
 }).then(result=>{
return  CartItems.destroy({where:{cartId:cartId}})
})
.then(deletecart=>{
  Invoice.create({
    orderId:orderid,
    customerId:customerid,
    EmployeeId:employeeid,
  }).then(Invoice=>{
    InvoiceDetails.create({
      paymentmethod:paymentmethod,
      paymentstatus:paymentstatus,
      amount:totalprice,
      message:message || null,
      invoiceId:Invoice.id,
    }).then(invoicedetails=>{
        if(deletecart>0){
          res.json({msg:' deleted succesfully',flag:true});
        }else{
          res.json({msg:'not deleted',flag:false});
        }
      //   console.log("invoice")
    })
  });

})
.catch()

}



exports.getprofile=(req,res,next)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        const err=new Error('Get Profile error');
        err.statusCode=404;
        err.data=errors.array();
        throw err;
    }
    req.user.getImage().then(image=>{
      console.log(image);
      const imageurl=image ? image.imageurl : ''; 
        return res.status(200).json({name:req.user.name, email:req.user.email ,city:req.user.cityId,imageurl:imageurl});
    }).catch(err=>{
        console.log(err);
    })
    // Images.findOne({where:{userId:req.user.id}}).then(imageurl=>{
    //     console.log(imageurl)
    // });
    // console.log(req.user);
    // return res.json("completed profile")
}

exports.putprofile=(req,res,next)=>{
  
  const name=req.body.name;
  const email=req.body.email;
  const cityid=req.body.city;
  const image=req.file;
  console.log("image",image);
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    const err=new Error("Update error");
    err.statusCode=500;
    err.data=errors.array();
    throw err;
  }

  Employee.findByPk(req.user.id).then(user=>{
        user.name=name;
        user.email=email;
        if(cityid !=="null"){
         user.cityId=cityid;
        }
        return user.save();
  }).then(user=>{
        
        if(image){
          req.user.createImage({
            imageurl:image.filename,
          })
        }
  })
}

const name=[
  {
    name:'kg'
  },
  {
    name:'dozen',
  },
  {
    name:'box',
  },
  {
    name:'grams',
  },
  {
    name:'packet'
  }
]
exports.getcities=(req,res,next)=>{
    

    City.findAll().then(cities=>{
        return res.status(200).json({cities:cities});
    }).catch(error=>{
        const err=new Error("Update error");
        err.statusCode=404;
        err.data=error;
        throw err;
    });
}

//.....insert cities in database api

exports.insertfeature=(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    const err=new Error('Insert '+req.body.state+"issue");
    err.data=errors.array();
    err.flag=true;
    throw err;
  }
  const state=req.body.state;
  if(state==='category'){
    console.log('category.')

    Category.create({
      name:req.body.name,
      uname:req.body.urduname,
    }).then(category=>{
      res.json({msg:"Category Succefully Created",flag:true})
      console.log(category);
    }).catch(err=>{

    });
  }else if(state==='unit'){
    Units.create({
      name:req.body.name,
    }).then(unit=>{
      res.json({msg:"Unit Succefully Created",flag:true});
    }).catch(error=>{
      // const err=new Error("unit create error");
      // err.statusCode=500;
      console.log("next......");
      console.log(error.errors);
      // err.data=error
      // throw err;
      // res.json({msg:"Unit Succefully Created",flag:true})
    })
  }else{
    console.log('store.')
    Store.create({
      name:req.body.name,
      uname:req.body.urduname,
    }).then(store=>{
      res.json({msg:"Store Succefully Created",flag:true})
    })
  }
}


exports.insertcity=(req,res,next)=>{
    console.log('insert');
    data.forEach(x=>{
        console.log(x)
        City.create({
            city:x.city,
            latitude:x.lat,
            longitude:x.lng,
            country:x.country,
            iso2:x.iso2,
            admin_name:x.admin_name,
            capital:x.capital,
            population:x.population,
            population_proper:x.population_proper,
        })
    })
}

exports.getunit=(req,res,next)=>{
  Units.findAll().then(unit=>{
    return res.json({msg:'unit fetch succesfully',units:unit});
  }).catch(error=>{
    const err=new Error("units fetch error");
    err.statusCode=404;
    err.data=error;
    throw err;
  })
}

exports.searchproduct=(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    const err= new Error('Validation message')
    err.data=errors.array();
    console.log('sea.');
    err.statusCode=501;
    throw err;
  }
  const search=req.body.search;
  Products.findAll({attributes:['id','name'],where:{name:{
    [Op.like]:'%'+search+'%',
  }}}).then((products)=>{
    res.json({msg:'autocomplete filed',products:products || []});
  })
}

exports.searchproducts=(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    const err=new Error('Search products validation');
    err.statusCode=500;
    err.data=errors.array();
    err.flag=true;
    throw err;
  }
  Products.findAll({
    include:[{
      model:Suppliers,
      as :'Supplier'
      }
    ],
    where:{
    [Op.or]:[{    name:{
      [Op.like]:'%'+req.body.key+'%',
    }},
    {description:{
      [Op.like]:'%'+req.body.key+'%',
    }},
    {productcode:{
      [Op.like]:'%'+req.body.key+'%',
    }},
    {'$Supplier.address$':{
      [Op.like]:'%'+req.body.key+'%',}
    }
    // {'$Supplier.address$':{
    //   [Op.like]:'%'+req.body.key+'%',
    // }}
  //  {suppliers.address:{
  //     [Op.like]:'%'+req.body.key+'%',
  //   },
  //    }

    ],
  },

  distinct:true,
limit:7,
offset:0,
   }).then((products)=>{
    console.log('len.'+products.length)
    if(products.length>0){
      res.status(200).json({msg:'Search Products Succefully', products:products, flag:true });
    }else{
      res.status(200).json({msg:'Search Products Succefully', products:products, flag:false });
    }
    console.log(products);
  }).catch(error=>{
    const err=new Error('Search product error');
    err.statusCode=500;
    err.data=error;
    throw err;
  });
}


exports.getgenderpopulations=(req,res,next)=>{
  
}

exports.searchcartproducts=(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    const err=new Error('search erros');
    err.data=errors.array()
    err.statusCode=404;
    throw err;
  }
  const product=req.body.product;
  Products.findAll({where:{
    [Op.or]:{
     name:{
       [Op.like]:`%${product}%`,
      },
     productcode:{
       [Op.like]:`%${product}%`,
     }
    }
  },
  include:{
    model:ProductDetail,
    required:true,
  }
}).then(products=>{
    if(products.length>0){
      console.log('one')
       res.json({msg:"successfully search the products",products:products,flag:true})
    }else{
      res.json({msg:"Products not found",products:products,flag:false})
    }
  }).catch(error=>{
    const err=new Error('search issue');
    err.data=errors.array()
    err.statusCode=404;
    throw err;
  });
}
//.............
exports.getstores=(req,res,next)=>{
  Store.findAll().then(store=>{
    res.json({msg:'Fetch the stores',stores:store});
  }).catch(error=>{
    const err=new Error('Fetched Stores');
    err.statusCode=404;
    err.data=error;
    throw err;
  })
}

exports.updateproduct=(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    const err=new Error('Edit product issue');
    err.statusCode=500;
    err.flag=true;
    err.data=errors.array();
    throw err;
  }
  const productcode=req.body.productcode;
  const productname=req.body.productname;
  const quantity=req.body.quantity;
  const contactno=req.body.contactno;
  const storeid=req.body.storeid;
  const categoryid=req.body.categoryid;
  const unitid=req.body.unitid;
  const description=req.body.description;
  const supplier=req.body.supplier;
  const barcode=req.body.barcode;
  const saleprice=req.body.saleprice;
  const purchaseprice=req.body.purchaseprice;
  const address=req.body.address;
  const companyname=req.body.companyname;
  const deleteimage=req.body.deleteimage || [];
  const image=req.files;
  console.log('req.',req);

  console.log('file.',image);
  let products;

  Products.findOne({where:{id:req.body.id}})
  .then(product=>{
      products=product;
    product.productcode=productcode;
    product.name=productname;
    product.description=description;
    product.unitsinstock=quantity;
    product.barcode=barcode;
    product.storeId=storeid;
    product.categoryId=categoryid;
    return product.save();
  }).then(product=>{
  return  products.getProductdetail().then(pdetail=>{
      pdetail.buyunitprice=purchaseprice;
      pdetail.saleunitprice=saleprice;
      console.log('unit.'+unitid);
      pdetail.unitId=unitid;
      return pdetail.save();
    }).catch(error=>{
      const err=new Error('Update Product details error');
      err.statusCode=500;
      err.data=error;
      throw err;
    })
  }).then(prod=>{
    return products.getSupplier().then(suppliers=>{
       suppliers.name=supplier;
       suppliers.contactno=contactno;
       suppliers.companyname=companyname;
       suppliers.address=address;
       return suppliers.save();
    }).catch(error=>{
      const err=new Error('Update Supplier error');
      err.statusCode=500;
      err.data=error.ar;
      throw err;
    })
  }).then((prod)=>{
    if(image){
      for(var i=0; i<image.length; i++){
        ProductImages.create({
          imageurl:image[i].filename,
          productId:products.id,
        });
      }
    }
    if(deleteimage.length>0){
      let images;
      return ProductImages.findAll({where:{id:deleteimage}}).then(productimage=>{
        productimage.forEach(un_image => {
          const filepath=path.join(__dirname,'..','images','product-images',un_image.imageurl)
            fs.unlink(filepath,err=>{
              if(err){
                console.log(err);
              }else{
                console.log('succefully delete');
              }
            });
        });
      }).then(response=>{
        ProductImages.destroy({where:{id:deleteimage}}).then(()=>{
        })
        .catch((error)=>{
          const err=new Error('delete Product error');
          err.statusCode=500;
          err.data=error;
          throw err;
        })
        console.log("hollo.")
      }).catch(err=>{
        console.log(err);
      })
      // ProductImages.destroy({where:{id:deleteimage}}).then(res=>{
        //   console.log("res."+res);
        // })
        // fs.unlinkSync();
      }
      res.json({title:'Update  product ',msg:[{msg:"Succefully update the product"}],flag:true})
  })
  .catch(error=>{
    const err=new Error('Update Product  product error');
    err.statusCode=500;
    err.data=error;
    throw err;
  })
}


exports.getproduct=(req,res,next)=>{

  const errors=validationResult(req);
  if(!errors.isEmpty()){
    const err= new Error('Get Product');
    err.statusCode=404;
    err.data=errors.array();
    throw err;
  }
  Products.findOne({where:{id:req.body.id},include:{all:true},})
  .then((product)=>{
    res.status(200).json({msg:'Succefully Fetched',product:product,flag:product!==null ? true :false});
  }).catch((error)=>{
    const err=new Error('Fetched error');
    err.statusCode=404;
    err.data=error;
    throw err;
  })
}



exports.getProducts=(req,res,next)=>{  
  const currentpage=Number(req.body.pagination) || 1;

  const errors=validationResult(req);
  if(!errors.isEmpty()){
    const err=new Error('Fetch products in edit error');
    err.statusCode=500;
    err.data=errors;
    throw err;
  }
  Products.findAndCountAll({offset:(currentpage-1) * 7,limit:7,distinct:true,include:[{all:true,}],order:[
    ['id','asc'], 
    ['createdAt','desc'],
  ]}).then((products)=>{
    console.log(products);
    const totalitems=products.count;    
    console.log("cr."+totalitems+"  ");
    console.log(7*currentpage)
    const data={
      currentpage:currentpage,
      hasnextpage:currentpage+1,
      haspreviouspage:currentpage-1,
      nextpage: 7*currentpage <totalitems,
      prevpage:currentpage > 1
    }
    res.status(200).json({msg:"Succefully Fetched",products:products.rows,flag:true,pagination:data})
  },).catch()
}

exports.getcategory=(req,res,next)=>{
  // insert the category
  // category.forEach((element)=>{
  //   Category.create({
  //     name:element.name,
  //   });  
  // })
    Category.findAll()
  .then(category=>{
    return     res.json({msg:'succefully fetch',category:category})
  })
  .catch(error=>{
    const err=new Error("Category error");
    err.statusCode=404;
    err.data=error;
    throw err;
  })
}
exports.insertproduct=(req,res,next)=>{
  
  const productname=req.body.productname;
  const productcode=req.body.productcode;
  const quantity=req.body.quantity;
  const categoryid=req.body.categoryid;
  const unit=req.body.unit;
  const store=req.body.stores;
  const saleprice=req.body.saleprice;
  const purchaseprice=req.body.purchaseprice;
  const barcode=req.body.barcode;
  const supplier=req.body.supplier;
  const contact=req.body.contact;
  const address=req.body.address;
  const description=req.body.description;
  const company=req.body.company;
  const images=req.files
  console.log(images)

  const  errors=validationResult(req);
  if(!errors.isEmpty()){
    const err=new Error("Insert product error");
    err.statusCode=404;
    err.data=errors.array();
    throw err;
  }
  let productid;
  let supid;
  console.log(store);
  Suppliers.create({
    name:supplier,
    contactno:contact,
    companyname:company,
    address:address,
  }).then((supplier)=>{
    console.log(supplier);
     return Products.create({
       name:productname,
       productcode:productcode,
       description:description,
       barcode:barcode,
       unitsinstock:quantity,
       suggestedunitprice:saleprice,
       categoryId:categoryid,
       SupplierId:supplier.id,
       storeId:store,
     }).then(product=>{
       console.log('prod.',product);
       console.log('prodid',product.id);
          productid=product.id;
         return product.createProductdetail({
             saleunitprice:saleprice,
             buyunitprice:purchaseprice,
             unitId:unit,
         })
     });
  }).then(product=>{
     console.log("productcode."+productid);
    //  console
    if(images){
      images.forEach(image=>{
      ProductImages.create({
        imageurl:image.filename,
        productId:productid,
      });
      });
      res.json({title:'create product',msg:[{msg:"Succefully create"}],flag:true})
    }
  }).catch((error)=>{
    const err=new Error('Product insert Error');
    err.statusCode=406;
    err.data=error;
    throw err;
    console.log(err)
  });
}


const units=[
{unit:'kg'}, {unit:'box'}, {unit:'packet'}, {unit:'grams'}
];
const category=[
{  name:'costmetics'},{name:'jolleries'},{name:'fruits'},{name:'Dairy'},{name:'Breads'}
];
const stores=[
{  name:'quickcheck'},{name:'cakes & bakes'},{name:'Hyperstar'},{name:'Packages'},{name:'metro'}
];

exports.home=(req,res,next)=>{
    console.log('home');

  // //   //city insert
  //   data.forEach(x=>{
  // //     console.log(x)
  //     City.create({
  //         city:x.city,
  //         latitude:x.lat,
  //         longitude:x.lng,
  //         country:x.country,
  //         iso2:x.iso2,
  //         admin_name:x.admin_name,
  //         capital:x.capital,
  //         population:x.population,
  //         population_proper:x.population_proper,
  //     })
  // })
  // //   // // store insert
    stores.forEach(store=>{
      Store.create({
        name:store.name,
      });
    })


  //   // // category insert
    category.forEach(category=>{
      Category.create({
        name:category.name,
      });
    })
  //   // // unit insert 
    units.forEach(element => {
      console.log(element);
      Units.create({
        name:element.unit
      })
    });
}

exports.salerecord=(req,res,next)=>{
  let products,todaysale=0,customers,quantity=[];
  Products.findAll({
    attributes:[[sequelize.fn('sum',sequelize.col('unitsinstock')),'totalitems']],
  })
  .then(quantity=>{
    console.log('quantity.',quantity);
    quantity=quantity;
    InvoiceDetails
    .findAll({
      attributes:{
        include:[
          [sequelize.literal(`(select SUM(amount) from InvoiceDetails)`),'totalprice']
        ]
      },
      where:{
      [Op.and]:[
      {
      createdAt:{
        [Op.gte]:new Date(new Date()-(24*60*60*1000)),
        [Op.lte]:new Date(),
      }},
      {
        paymentstatus:'verified'
      }
    ]
      },
    include:[{
      model:Invoice,
      required:true,
      attributes:{exclude:['id','createdAt','updatedAt','customerId','EmployeeId']},
      include:[{
        model:Order,
        required:true,
        attributes:{exclude:['id','createdAt','updatedAt','customerId']},
        include:[{
          model:OrderItems,
         attributes:[[sequelize.fn('sum',sequelize.col('quantity')),'saleitems']],
         required:true,
         where:{
            createdAt:{
              [Op.gte]:new Date(new Date()-(24*60*60*1000)),
              [Op.lte]:new Date(),
            }
          }
        }]
      }]
    }],
  
    })
    .then((totalprice)=>{
      console.log('tot.',totalprice);
        Customers.count({where:{
          createdAt:{
          [Op.gte]:new Date(new Date()-(24*60*60*1000)),
          [Op.lte]:new Date(),
        }}}).then(customercount=>{
          // console.log('qua.',totalprice[0].dataValues.invoice.order.orderitems[0].dataValues.saleitems);
          // let saleitems;
          if(customercount && totalprice){
            res.json({customers:customercount || 0,totalsale:totalprice[0].dataValues.totalprice || 0,totalsaleitems:totalprice[0].dataValues.invoice.order.orderitems[0].dataValues.saleitems || 0,availableitems:quantity[0].dataValues.totalitems || 0})
          }
          // const saleitems=totalprice[0].dataValues.invoice.order.orderitems[0].dataValues.saleitems;
        }).catch()        
     });
  }).then(()=>{
    // InvoiceDetails
    // .findAll({
    //   include:[{
    //     model:OrderItems
    //   }]
    // })
    // .then((order)=>{
    //  res.json(order)
    // })
    // .catch()
  })
}


exports.deletecart=(req,res,next)=>{
  const cartId=req.body.cartid;
  const productId=req.body.productid;
  const quantity=req.body.quantity;
  console.log(cartId,productId);
  Products
  .findOne({where:{id:productId}})
  .then((product)=>{
    CartItems.destroy({
      where:{
        id:cartId
      }
    })
    .then(cartitem=>{
      product.unitsinstock+=quantity;
      product.save();
      res.json({msg:'delete succefully'});
      // res.json({msg:'deleted succefully',flag:true});
    })
    .catch()
  })
  .catch()
}

exports.addstock=(req,res,next)=>{
  const id=req.body.id;
  const quantity=req.body.quantity;
  Products
  .findOne({where:{id:id}})
  .then(product=>{
    Stock.create({
      quantity:quantity,
      productId:id,
    }).then((stock)=>{
      product.unitsinstock+=quantity;
      product.save();
    })
  })
  .catch()
}


exports.getstock=(req,res,next)=>{
  Stock.findAll({include:[{
    model:Products,
    attributes:['id','name']
  }]})
  .then(stock=>{
    res.json({msg:'Fetch the stock',stock:stock,flag:true});
  })
  .catch()
}

exports.deletestock=(req,res,next)=>{
  const id=req.body.id;
  const pid=req.body.pid;
  Stock.findOne()
  .then((stock)=>{
      Products.findOne({where:{id:pid}})
      .then(product=>{
        product.unitsinstock-=stock.qduantity;
         return product.save();
        }).then(product=>{
          Stock.destroy({where:{id:id}})
          .then((deletestock)=>{
               res.json({msg:'succefully delete',flag:true,deletestock:deletestock}); 
           })
          .catch()      
        })
        .catch();
    })
    .catch()
}

exports.getreport=(req,res,next)=>{
  console.log('hell.');
  const label=req.body.label;
  if(label==='day')
  {
    InvoiceDetails.findAll({
      attributes:['createdAt',[sequelize.fn('SUM',sequelize.col('amount')),'sale'],[sequelize.fn('DATE',sequelize.col('createdAt')),'date']],
      group:['date'],
      // where:{
      // createdAt:{
      //   [Op.and]:{
      //        [Op.gte]:new Date(new Date()-(60*60*24*1000)),
      //        [Op.lte]:new Date(),
      //     }
      // }
    // }
    }).then(invoice=>{
      console.log('in.',invoice);
      let amount=[];
      console.log('el.');
      invoice.forEach(element => {
        console.log(element.dataValues)
        const date=new Date(element.dataValues.createdAt);
        const day=date.toLocaleString('en-us',{weekday:'short'})
        amount.push({sale:element.dataValues.sale,day:day,createdAt:date});
      });
      res.json({msg:'fetched succefully weekand',sale:amount});
      console.log(amount);
    })
  }else if(label==='month'){
    InvoiceDetails.findAll({
      attributes:['createdAt',[sequelize.fn('SUM',sequelize.col('amount')),'sale'],[sequelize.fn('month',sequelize.col('createdAt')),'date']],
      group:['date'],
      // where:{
      // createdAt:{
      //   [Op.and]:{
      //        [Op.gte]:new Date(new Date()-(60*60*24*1000)),
      //        [Op.lte]:new Date(),
      //     }
      // }
    // }
    }).then(invoice=>{
      console.log('in.',invoice);
      let amount=[];
      console.log('el.');
      invoice.forEach(element => {
        // console.log(element.dataValues)
        const date=new Date(element.dataValues.createdAt);
        const day=date.toLocaleString('en-us',{month:'short'})
        amount.push({sale:element.dataValues.sale,day:day,createdAt:date});
      });
      res.json({msg:'fetched succefully monthly',sale:amount});
      console.log(amount);
    })
  }else{
    InvoiceDetails.findAll({
      attributes:['createdAt',[sequelize.fn('SUM',sequelize.col('amount')),'sale'],[sequelize.fn('year',sequelize.col('createdAt')),'date']],
      group:['date'],
      // where:{
      // createdAt:{
      //   [Op.and]:{
      //        [Op.gte]:new Date(new Date()-(60*60*24*1000)),
      //        [Op.lte]:new Date(),
      //     }
      // }
    // }
    }).then(invoice=>{
      console.log('in.',invoice);
      let amount=[];
      console.log('el.');
      invoice.forEach(element => {
        const date=new Date(element.dataValues.createdAt);
        const day=date.toLocaleString('en-us',{year:'numeric'})
        amount.push({sale:element.dataValues.sale,day:day,createdAt:date});
      });
      res.json({msg:'fetched succefully monthly',sale:amount});
      console.log(amount);
    })
  }

}