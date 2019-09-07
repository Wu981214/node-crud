const router = require('express').Router();
const {Category,Product} = require('../../models');

router.get('/',async(req,res)=>{
    let list = await Category.find();
    res.render('show/index',{
        list
    });
});

router.get('/list/:id',async(req,res)=>{
    let list = await Product.find({_category:req.params.id}).populate("_category");
    console.log(list);
    res.render('show/list',{
        list
    });
})

module.exports=router;