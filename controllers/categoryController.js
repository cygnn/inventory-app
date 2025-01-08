import queries from '../model/queries.js';
import {body, validationResult} from 'express-validator';

const validateCategory = [
    body("categoryName")
      .trim()
      .notEmpty().withMessage("Category Name is required.")
      .isLength({ max: 100 }).withMessage("Category Name must be 100 characters or fewer.")
      .matches(/^[a-zA-Z0-9\s'-]+$/).withMessage("Category Name can only contain letters, numbers, spaces, apostrophes, and hyphens."),
    body("categoryImg")
      .trim()
      .isURL().withMessage("Please provide a valid URL for the image."),
  ];
  

async function getCategories(req, res) {
    try {
        const categories = await queries.getAllCategoryNames();
        const items = await queries.getAllItems();
        res.render('home', { categories, items });
    } catch (error) {
        console.error("Error fetching categories and items:", error);
        res.status(500).send("An error occurred while fetching categories and items.");
    }
}

async function goToCategory(req,res){
    const { id, categoryname } = req.params
    const items = await queries.getItemsIn(id)
    res.render('categoryWithItems', {categoryname: categoryname, items:items, referer: req.get('Referer') || '/' })
}

async function categoryAddGet(req, res) {
    try {
        res.render('addCategory');
    } catch (error) {
        console.error("Error rendering addCategory page:", error);
        res.status(500).send("An error occurred while loading the page.");
    }
}

 const categoryAddPost = [ validateCategory ,async(req, res) => {
    try {
        const { categoryName, categoryImg } = req.body;
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const categories = await queries.getAllCategoryNames();
            return res.status(400).render('manageCategories', { categories: categories, errors: errors.array() });
        }
        await queries.addCategory(categoryName, categoryImg);
        console.log('category name is : ' + categoryName)
        console.log('category img: ' + categoryImg)
        res.redirect('/');
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).render('error');
    }
}]

async function categoryEditGet(req, res) {
    try {
        const categoryDetails = await queries.getCategoryDetails(req.params.categoryid);
        res.render('categoryEdit', { category: categoryDetails });
    } catch (error) {
        console.error("Error fetching category details:", error);
        res.status(500).send("An error occurred while fetching category details.");
    }
}

const categoryEditPost = [ validateCategory, async(req, res) =>{
    try {
        const { categoryName } = req.body;
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const categoryDetails = await queries.getCategoryDetails(req.params.categoryid);
            return res.status(400).render('categoryEdit', { category: categoryDetails, errors:errors.array() });
        }
        await queries.renameCategory(categoryName, req.params.categoryid);
        res.redirect('/');
    } catch (error) {
        console.error("Error editing category:", error);
        res.status(500).send("An error occurred while editing the category.");
    }
}]

async function deleteCategory(req, res) {
    try {
        await queries.deleteCategory(req.params.categoryid);
        res.redirect('/manage-categories');
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).send("An error occurred while deleting the category.");
    }
}

async function manageCategoryGet(req,res){
    try {
        const categories = await queries.getAllCategoryNames();
        res.render('manageCategories', { categories: categories });
    } catch (error) {
        console.error("Error fetching category details:", error);
        res.status(500).send("An error occurred while fetching category details.");
    }
}

export default {
    getCategories,
    goToCategory,
    categoryAddGet,
    categoryAddPost,
    categoryEditGet,
    categoryEditPost,
    deleteCategory,
    manageCategoryGet,
};
