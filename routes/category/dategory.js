const {Category} = require('../../models');

const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('category/list');
})

router.get('/list',async(req,res)=>{
    try {
    let list =   await Category.find();
    res.render('category/list',{
        list
    });  
    } catch (error) {
    console.log(error);        
    }
});

router.get('/add',(req,res)=>{
    res.render('category/add');
});

router.post('/add',async(req,res)=>{
    let item = new Category(req.body);
    try {
        await item.save();
        res.redirect('/category/list');
    } catch (error) {
        console.log(error);
    }
});

router.post('/del',async(req,res)=>{
    try {
        await Category.findByIdAndRemove(req.body.id);
        res.json({
            code:1
        })
    } catch (error) {
        console.log("error");
    }
});


router.get('/edit/:id',async(req,res)=>{
    try {
        let item = await Category.findById(req.params.id);
        res.render('category/edit',{
            item
        });
    } catch (error) {
        
    }
});


router.post('/upload/:id',async(req,res)=>{
   
    try {
        
        await Category.findByIdAndUpdate(req.params.id,req.body);
        res.redirect('/category/list');
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;