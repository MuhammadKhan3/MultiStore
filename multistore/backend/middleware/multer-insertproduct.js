const multer=require('multer');

const diskstorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images/product-images');
    },
    filename:(req,file,cb)=>{
        const name=Date.now()+'-'+Math.round(Math.random()*100000);
        cb(null,name+file.originalname)
    }
});

const filefilter=(req,file,cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/gif'){
        cb(null,true);
    }else{
        cb(null,false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}
const MulterMultiple=multer({storage:diskstorage,fileFilter:filefilter});
module.exports=MulterMultiple;