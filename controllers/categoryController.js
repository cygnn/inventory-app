import queries from '../model/queries.js';

async function getCategories(req, res) {
    try {
        const categories = await queries.getAllCategoryNames();
        const items = await queries.getAllItems();
        console.log(categories);
        console.log(items);
        res.render('index', { categories, items });
    } catch (error) {
        console.error("Error fetching categories and items:", error);
        res.status(500).send("An error occurred while fetching categories and items.");
    }
}

async function categoryAddGet(req, res) {
    try {
        res.render('addCategory');
    } catch (error) {
        console.error("Error rendering addCategory page:", error);
        res.status(500).send("An error occurred while loading the page.");
    }
}

async function categoryAddPost(req, res) {
    try {
        const { categoryName } = req.body;
        await queries.addCategory(categoryName);
        res.redirect('/');
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).send("An error occurred while adding the category.");
    }
}

async function categoryEditGet(req, res) {
    try {
        const categoryDetails = await queries.getCategoryDetails(req.params.categoryid);
        res.render('categoryEdit', { category: categoryDetails });
    } catch (error) {
        console.error("Error fetching category details:", error);
        res.status(500).send("An error occurred while fetching category details.");
    }
}

async function categoryEditPost(req, res) {
    try {
        const { categoryName } = req.body;
        console.log('This is category name in category controller: ' + categoryName);
        await queries.renameCategory(categoryName, req.params.categoryid);
        res.redirect('/');
    } catch (error) {
        console.error("Error editing category:", error);
        res.status(500).send("An error occurred while editing the category.");
    }
}

async function deleteCategory(req, res) {
    try {
        await queries.deleteCategory(req.params.categoryid);
        res.redirect('/');
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).send("An error occurred while deleting the category.");
    }
}

export default {
    getCategories,
    categoryAddGet,
    categoryAddPost,
    categoryEditGet,
    categoryEditPost,
    deleteCategory,
};
