import queries from '../model/queries.js'

async function itemAddGet(req,res){
    const categories = await queries.getAllCategoryNames();
    res.render('addItem', {categories: categories})
}

async function itemAddPost(req,res){
    const {itemName, categoryId, partNum, description, price, quantity} = req.body
    console.log(req.body)
    await queries.addItem(itemName, categoryId, partNum, description, price, quantity)
    res.redirect('/')
}


async function itemEditGet(req,res){
    const itemDetails = await queries.getItemDetails(req.params.itemid)
    const categories = await queries.getAllCategoryNames();
    console.log(itemDetails)
    res.render('itemEdit', {item:itemDetails, categories:categories})
}

async function itemEditPost(req,res){
    const {itemName, categoryId, partNum, description, price, quantity} = req.body
    console.log('This is itemname : ' + itemName)
    await queries.editItem(itemName, categoryId, partNum, description, price, quantity, req.params.itemid)
    res.redirect('/')
}

async function itemDeletePost(req,res){ 
    await queries.deleteItem(req.params.itemid)
    res.redirect('/')
}

export default {
    itemAddGet,
    itemAddPost,
    itemDeletePost,
    itemEditGet,
    itemEditPost,
}