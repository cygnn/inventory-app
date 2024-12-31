import queries from '../model/queries.js'

async function getCategories(req,res) {
    const categories = await queries.getAllCategoryNames();
    const items = await queries.getAllItems();
    console.log(categories)
    console.log(items);
    res.render('index',{categories: categories, items: items})
}

async function categoryAddGet(req,res){
    res.render('addCategory')
}

async function categoryAddPost(req,res){
    const { categoryName } = req.body;
    await queries.addCategory(categoryName)
    res.redirect('/');
}

async function categoryEditGet(req,res){
    const categoryDetails = await queries.getCategoryDetails(req.params.categoryid)
    res.render('categoryEdit', {category: categoryDetails})
}

async function categoryEditPost(req,res){
    const {categoryName} = req.body
    console.log('This is category name in category controller: ' + categoryName)
    await queries.renameCategory(categoryName, req.params.categoryid)
    res.redirect('/')
}

async function deleteCategory(req,res) {
    await queries.deleteCategory(req.params.categoryid)
    res.redirect('/')
}

export default{
    getCategories,
    categoryAddGet,
    categoryAddPost,
    categoryEditGet,
    categoryEditPost,
    deleteCategory
}