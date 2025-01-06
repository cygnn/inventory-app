import queries from '../model/queries.js';
import {body, validationResult} from 'express-validator';

const validateItem = [
    body("price").isNumeric().isInt({min:0}).withMessage(`Please enter a valid price`),
    body("quantity").isInt({min:0}).withMessage(`Please enter a number.`),
]

async function itemAddGet(req, res) {
    try {
        const categories = await queries.getAllCategoryNames();
        res.render('addItem', { categories , referer: req.get('Referer') || '/' });
    } catch (error) {
        console.error("Error fetching categories for item addition:", error);
        res.status(500).send("An error occurred while preparing the item addition form.");
    }
}

async function itemAddPost(req, res) {
    try {
        const { itemName, brand,categoryId, partNum, description, price, quantity } = req.body;
        await queries.addItem(itemName, brand, categoryId, partNum, description, price, quantity);
        res.redirect('/');
    } catch (error) {
        console.error("Error adding item in POST:", error);
        res.status(500).render('error');
    }
}

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

async function itemEditPost(req, res) {
    try {
        const { itemName, brand,categoryId, partNum, description, price, quantity, referer } = req.body;
        await queries.editItem(itemName, brand, categoryId, partNum, description, price, quantity, req.params.itemid);
        res.redirect(referer);
    } catch (error) {
        console.error("Error editing item:", error);
        res.status(500).send("An error occurred while updating the item. Please try again.");
    }
}

async function itemDeletePost(req, res) {
    try {
        console.log('the referrer is' + req.get('Referrer'))
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
