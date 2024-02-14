//import express
const express=require('express')

const userController= require('../Controllers/userController')
 const projectController=require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
//import multer middle ware
const multerConfig =require('../Middlewares/multerMiddleware')

//create ar router object of express to define routes(paths)

const router = new express.Router()
//using router object to define paths

//1 Register API routes
router.post('/register',userController.register)

//2 login API routes
router.post('/login',userController.login)

//3 add user project - api routes- localhost:4000/project/add
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'), projectController.addUserProject)

//4 get userproject API routes localhost:4000/projects/all-user-projects //to get projects of logged in user
router.get('/project/all-user-projects',jwtMiddleware,projectController.getUserProject)


//5 get dashboard button viewallprojects page routes - localhost:4000/projects/home-projects --for search purpose
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

//6 get home page routes - to show projects in home page
router.get('/project/home-projects',projectController.getHomeProject)


//7)update project routes localhost:4000/projects/update-project/7869909876755
router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

//8) delete project 
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)

module.exports=router