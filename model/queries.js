import pool from './pool.js';

//FOR CATEGORIES
async function getAllCategoryNames() {
    try {
        const { rows } = await pool.query("SELECT * FROM categories");
        return rows;
    } catch (error) {
        console.error("Error fetching all category names:", error);
        throw new Error("Failed to fetch category names.");
    }
}

async function addCategory(newCategory, img) {
    try {
        console.log("length is " + newCategory.length)
        console.log(newCategory === null)
        let categoryname = newCategory
        if(categoryname.length === 0){
            categoryname = null
        }
        await pool.query("INSERT INTO categories (categoryName, img) VALUES ($1, $2)", [categoryname, img]);
    } catch (error) {
        console.error("Error adding new category:", error);
        throw new Error("Failed to add new category.");
    }
}

async function renameCategory(newName, categoryId) {
    try {
        const { rows } = await pool.query(
            "UPDATE categories SET categoryName = $1 WHERE categoryId = $2",
            [newName, categoryId]
        );
    } catch (error) {
        console.error("Error renaming category:", error);
        throw new Error("Failed to rename category.");
    }
}

async function getCategoryDetails(categoryId) {
    try {
        const { rows } = await pool.query("SELECT * FROM categories WHERE categoryid = $1", [categoryId]);
        return rows[0];
    } catch (error) {
        console.error("Error fetching category details:", error);
        throw new Error("Failed to fetch category details.");
    }
}

async function deleteCategory(categoryId) {
    try {
        await pool.query("DELETE FROM categories WHERE categoryid = $1", [categoryId]);
        await pool.query("UPDATE items SET categoryid = NULL WHERE categoryid = $1", [categoryId]);
    } catch (error) {
        console.error("Error deleting category:", error);
        throw new Error("Failed to delete category.");
    }
}

//FOR ITEMS
async function getAllItems() {
    try {
        const { rows } = await pool.query("SELECT * FROM items");
        return rows;
    } catch (error) {
        console.error("Error fetching all items:", error);
        throw new Error("Failed to fetch items.");
    }
}

async function getItemsIn(categoryId){
    try {
        const { rows } = await pool.query("SELECT * FROM items WHERE categoryid = $1", [categoryId])
        return rows;
    } catch (error) {
        console.error("Error fetching in all ites:", error)
        throw new Error("Failed to fetch items.");
    }
}

async function addItem(itemName, brand,categoryId, partnum, description, price, quantity) {
    try {
        const query = `
            INSERT INTO items (itemname, brand, categoryid, partnum, description, price, quantity)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        var newCategoryId = categoryId
        if (newCategoryId === ''){
            newCategoryId = null;
        }
        const values = [itemName, brand, newCategoryId, partnum, description, price, quantity];
        await pool.query(query, values);
    } catch (error) {
        console.error("Error adding new item:", error);
        throw new Error("Failed to add item.");
    }
}

async function getItemDetails(itemid) {
    try {
        const { rows } = await pool.query("SELECT * FROM items WHERE itemid = $1", [itemid]);
        return rows[0];
    } catch (error) {
        console.error("Error fetching item details:", error);
        throw new Error("Failed to fetch item details.");
    }
}

async function editItem(itemName, brand,categoryId, partNum, description, price, quantity, itemid) {
    try {
        const query = `
            UPDATE items SET itemName = $1, brand = $2 ,categoryId = $3, partnum = $4, description = $5, price = $6, quantity = $7 
            WHERE itemid = $8
        `;
        const values = [itemName, brand, categoryId, partNum, description, price, quantity, itemid];
        await pool.query(query, values);
    } catch (error) {
        console.error("Error editing item:", error);
        throw new Error("Failed to edit item.");
    }
}

async function deleteItem(itemId) {
    try {
        await pool.query("DELETE FROM items WHERE itemId = $1", [itemId]);
    } catch (error) {
        console.error("Error deleting item:", error);
        throw new Error("Failed to delete item.");
    }
}

// FOR BOTH

async function getPartsWithCategoryNames(){
    try {
        const { rows } = await pool.query("SELECT i.itemid, i.itemname, i.brand, c.categoryid, c.categoryname, c.img, i.partnum, i.description, i.price, i.quantity FROM items i LEFT JOIN categories c ON i.categoryid = c.categoryid ORDER BY c.categoryname")
        console.log(rows)
        return rows;
    } catch (error) {
        
    }
}

export default {
    getAllCategoryNames,
    addCategory,
    getCategoryDetails,
    deleteCategory,
    renameCategory,
    getAllItems,
    getItemsIn,
    getItemDetails,
    addItem,
    editItem,
    deleteItem,
    getPartsWithCategoryNames,
};
