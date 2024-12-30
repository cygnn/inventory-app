import pool from "./pool";

async function getAllCategoryNames(){
    const {rows} = await pool.query("SELECT * FROM categories")
    return rows;
}

async function addCategory(newCategory){
    await pool.query("INSERT INTO categories (categoryName) VALUES ($1)", [newCategory])
}

async function renameCategory(categoryId, newName){
    await pool.query("UPDATE categories SET categoryName = '$1' WHERE categoryId = $2", [newName, categoryId])
}

async function getAllItems(){
    const {rows} = await pool.query("SELECT * FROM items")
    return rows;
}

//NEED TO FINALISE THIS
async function editItem(data){
    await pool.query("UPDATE items SET itemName = '$1', categoryId = $2, description = '$3', price = $4, quantity = $5")
}

async function deleteItem(itemId){
    await pool.query("DELETE FROM items WHERE itemId = $1", [itemId])
}

export {
    getAllCategoryNames,
    addCategory,
    renameCategory,
    getAllItems,
    editItem,
    deleteItem
}