import pool from './pool.js'

//FOR CATEGORIES
async function getAllCategoryNames(){
    const {rows} = await pool.query("SELECT * FROM categories")
    return rows;
}

async function addCategory(newCategory){
    await pool.query("INSERT INTO categories (categoryName) VALUES ($1)", [newCategory])
}

async function renameCategory(newName, categoryId){
    console.log('New name: ' + newName)
    console.log('Category id : '+ categoryId)
    const {rows} = await pool.query("UPDATE categories SET categoryName = $1 WHERE categoryId = $2", [newName, categoryId])
    console.log('This is in rename category' + rows)
}

async function getCategoryDetails(categoryId){
    const {rows} = await pool.query("SELECT * FROM categories WHERE categoryid = $1", [categoryId])
    const categoryDetails = rows[0]
    return categoryDetails
}

async function deleteCategory(categoryId){
    await pool.query("DELETE FROM categories WHERE categoryid = $1", [categoryId])
    await pool.query("UPDATE items SET categoryid = NULL WHERE categoryid = $1", [categoryId])
}
//FOR ITEMS

async function getAllItems(){
    const {rows} = await pool.query("SELECT * FROM items")
    return rows;
}

async function addItem(itemName, categoryId, partnum, description, price, quantity){
    const query = `
        INSERT INTO items (itemname, categoryid, partnum, description, price, quantity)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const values = [itemName, categoryId, partnum, description, price, quantity];
    await pool.query(query, values)
}

async function getItemDetails(itemid){
    console.log('this is item id in queries ' + itemid)
    const {rows} = await pool.query("SELECT * FROM items WHERE itemid = $1", [itemid])
    const itemDetails = rows[0]
    return itemDetails;
}

async function editItem(itemName, categoryId, partNum, description, price, quantity, itemid){
    const query = `
        UPDATE items SET itemName = $1, categoryId = $2, partnum = $3,description = $4, price = $5, quantity = $6 WHERE itemid = $7
    `;
    const values = [itemName, categoryId, partNum, description, price, quantity, itemid];
    await pool.query(query, values)
}

async function deleteItem(itemId){
    await pool.query("DELETE FROM items WHERE itemId = $1", [itemId])
}

export default{
    getAllCategoryNames,
    addCategory,
    getCategoryDetails,
    deleteCategory,
    renameCategory,
    getAllItems,
    getItemDetails,
    addItem,
    editItem,
    deleteItem
}