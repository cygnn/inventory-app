import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import itemController from "../controllers/itemController.js";

const indexRouter = Router()

indexRouter.get('/', categoryController.getCategories)

indexRouter.get('/add-category', categoryController.categoryAddGet)
indexRouter.post('/add-category', categoryController.categoryAddPost)
indexRouter.post('/:categoryid/delete-category', categoryController.deleteCategory)
indexRouter.get('/:categoryid/edit-category', categoryController.categoryEditGet);
indexRouter.post('/:categoryid/edit-category', categoryController.categoryEditPost);
indexRouter.get('/add-item', itemController.itemAddGet)
indexRouter.post('/add-item', itemController.itemAddPost)
indexRouter.get('/:itemid/edit-item', itemController.itemEditGet)
indexRouter.post('/:itemid/edit-item', itemController.itemEditPost)
indexRouter.post('/:itemid/delete-item',itemController.itemDeletePost)

export default indexRouter