import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import itemController from "../controllers/itemController.js";

const indexRouter = Router()

indexRouter.get('/', categoryController.getCategories)
indexRouter.get('/test', itemController.test)
indexRouter.get('/all-parts', itemController.allParts)
indexRouter.get('/add-parts', itemController.manageParts)

indexRouter.post('/add-category', categoryController.categoryAddPost)
indexRouter.get('/manage-categories', categoryController.manageCategoryGet)
indexRouter.post('/:categoryid/delete-category', categoryController.deleteCategory)
indexRouter.get('/:categoryid/edit-category', categoryController.categoryEditGet);
indexRouter.post('/:categoryid/edit-category', categoryController.categoryEditPost);
indexRouter.get('/categories/:categoryname&id=:id', categoryController.goToCategory);
indexRouter.post('/add-item', itemController.itemAddPost)
indexRouter.get('/:itemid/edit-item', itemController.itemEditGet)
indexRouter.post('/:itemid/edit-item', itemController.itemEditPost)
indexRouter.post('/:itemid/delete-item',itemController.itemDeletePost)

export default indexRouter