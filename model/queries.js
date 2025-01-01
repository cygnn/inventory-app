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

async function addCategory(newCategory) {
    try {
        await pool.query("INSERT INTO categories (categoryName) VALUES ($1)", [newCategory]);
    } catch (error) {
        console.error("Error adding new category:", error);
        throw new Error("Failed to add new category.");
    }
}

async function renameCategory(newName, categoryId) {
    try {
        console.log('New name: ' + newName);
        console.log('Category id : ' + categoryId);
        const { rows } = await pool.query(
            "UPDATE categories SET categoryName = $1 WHERE categoryId = $2",
            [newName, categoryId]
        );
        console.log('This is in rename category' + rows);
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

async function addItem(itemName, categoryId, partnum, description, price, quantity) {
    try {
        const query = `
            INSERT INTO items (itemname, categoryid, partnum, description, price, quantity)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        var newCategoryId = categoryId
        if (newCategoryId === ''){
            newCategoryId = null;
        }
        const values = [itemName, newCategoryId, partnum, description, price, quantity];
        await pool.query(query, values);
    } catch (error) {
        console.error("Error adding new item:", error);
        throw new Error("Failed to add item.");
    }
}

async function getItemDetails(itemid) {
    try {
        console.log('this is item id in queries ' + itemid);
        const { rows } = await pool.query("SELECT * FROM items WHERE itemid = $1", [itemid]);
        return rows[0];
    } catch (error) {
        console.error("Error fetching item details:", error);
        throw new Error("Failed to fetch item details.");
    }
}

async function editItem(itemName, categoryId, partNum, description, price, quantity, itemid) {
    try {
        const query = `
            UPDATE items SET itemName = $1, categoryId = $2, partnum = $3, description = $4, price = $5, quantity = $6 
            WHERE itemid = $7
        `;
        const values = [itemName, categoryId, partNum, description, price, quantity, itemid];
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

export default {
    getAllCategoryNames,
    addCategory,
    getCategoryDetails,
    deleteCategory,
    renameCategory,
    getAllItems,
    getItemDetails,
    addItem,
    editItem,
    deleteItem,
};
