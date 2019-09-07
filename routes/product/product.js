const {Product,Category} = require('../../models');

const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('product/list');
})

router.get('/list',async(req,res)=>{
    try {
    let list =   await Product.find();
    res.render('product/list',{
        list
    });  
    } catch (error) {
    console.log(error);        
    }
});
router.get('/add',async(req,res)=>{
    let list =await Category.find();
    res.render('product/add',{
        list
    });
});

router.post('/add',(req,res)=>{
    console.log(req.body);
    let item = new Product(req.body);
    
    try {
      item.save();
      res.redirect('/product/list');
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/del',async(req,res)=>{
    try {
        await Product.findByIdAndRemove(req.body.id);
        res.json({
            code:1
        })
    } catch (error) {
        console.log("error");
    }
});
    router.get('/edit/:id',async(req,res)=>{
    // Wz.findOne({title:"云顶之弈"}).populate('_user').exec(function(err,doc){
    //     // console.log('作者:'+doc);
    //     if(err) {
    //         res.json(err)
    //     } else {
    //         res.json(doc)
    //     }
    // });
    // Wz.findOne({title:"云顶之弈"}).populate('_user').then(d=>{
    //     res.json(d)
    // })
    // .catch(err=>res.json(err))
    const item = await Product.findById(req.params.id).populate('_category');
    const list = await Category.find();
    res.render('product/edit',{
        item,
        list
    });
     });

     router.post('/upload/:id',async(req,res)=>{
   
        try {
            
            await Product.findByIdAndUpdate(req.params.id,req.body);
            res.redirect('/product/list');
        } catch (error) {
            console.log(error);
        }
    });     
module.exports=router;

