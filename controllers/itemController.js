import queries from '../model/queries.js';
import {body, validationResult} from 'express-validator';

const validateItem = [
    body("itemName")
      .trim()
      .notEmpty().withMessage("Item Name is required.")
      .isLength({ max: 100 }).withMessage("Item Name must be 100 characters or fewer."),
    body("brand")
      .trim()
      .notEmpty().withMessage("Brand is required.")
      .isLength({ max: 50 }).withMessage("Brand must be 50 characters or fewer."),
    body("categoryId")
      .isInt().withMessage("Category ID must be a valid integer."),
    body("partNum")
      .trim()
      .notEmpty().withMessage("Part Number is required.")
      .isLength({ max: 50 }).withMessage("Part Number must be 50 characters or fewer."),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage("Description must be 500 characters or fewer."),
    body("price")
      .notEmpty().withMessage("Price is required.")
      .isFloat({ min: 0 }).withMessage("Price must be a positive number."),
    body("quantity")
      .notEmpty().withMessage("Quantity is required.")
      .isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer."),
  ];
  

async function itemAddGet(req, res) {
    try {
        const categories = await queries.getAllCategoryNames();
        res.render('addItem', { categories , referer: req.get('Referrer') || '/' });
    } catch (error) {
        console.error("Error fetching categories for item addition:", error);
        res.status(500).send("An error occurred while preparing the item addition form.");
    }
}

const itemAddPost = [validateItem, async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const categories = await queries.getAllCategoryNames();
            return res.status(400).render('manageParts', {categories, errors: errors.array(), referer: req.get('Referrer') || '/'  })
        }
        const { itemName, brand,categoryId, partNum, description, price, quantity } = req.body;
        await queries.addItem(itemName, brand, categoryId, partNum, description, price, quantity);
        res.redirect('/');
    } catch (error) {
        console.error("Error adding item in POST:", error);
        res.status(500).render('error');
    }
}]

async function itemEditGet(req, res) {
    try {
        const itemDetails = await queries.getItemDetails(req.params.itemid);
        const categories = await queries.getAllCategoryNames();
        
        res.render('itemEdit', { item: itemDetails, categories , referer: req.get('Referrer') || '/' });
    } catch (error) {
        console.error("Error fetching item details or categories for editing:", error);
        res.status(500).send("An error occurred while preparing the item edit form.");
    }
}

 const itemEditPost = [ validateItem ,async(req, res) => {
    try {
        const { itemName, brand,categoryId, partNum, description, price, quantity, referer } = req.body;
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const itemDetails = await queries.getItemDetails(req.params.itemid);
            const categories = await queries.getAllCategoryNames();
            return res.status(400).render('itemEdit', {categories, errors: errors.array(), referer: referer || '/', item:itemDetails })
        }
        await queries.editItem(itemName, brand, categoryId, partNum, description, price, quantity, req.params.itemid);
        res.redirect(referer);
    } catch (error) {
        console.error("Error editing item:", error);
        res.status(500).send("An error occurred while updating the item. Please try again.");
    }
}]

async function itemDeletePost(req, res) {
    try {
        console.log('the referrer is' + req.get('Referrer'))
        const back = req.get('Referrer')
        await queries.deleteItem(req.params.itemid);
        res.redirect(back);
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).send("An error occurred while deleting the item. Please try again.");
    }
}

async function allParts(req,res){
    try {
        const rows = await queries.getPartsWithCategoryNames();
        res.render('allParts.ejs', {items: rows})
    } catch (error) {
        console.error("Error fetching parts", error);
        res.status(500).send("An error occurred while preparing the all parts.");
    }
}

async function test(req,res){
    await queries.getPartsWithCategoryNames();
    res.send('hi')
}

async function manageParts(req,res){
    try {
        const categories = await queries.getAllCategoryNames();
        res.render('manageParts', {categories: categories})    
    } catch (error) {
        
    }
}
export default {
    itemAddGet,
    itemAddPost,
    itemDeletePost,
    itemEditGet,
    itemEditPost,
    test,
    allParts,
    manageParts
};
