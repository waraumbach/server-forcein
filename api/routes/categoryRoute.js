import { Router } from "express";
import categoryModel from "../models/categoryModel.js";
import { createCategories } from "../controllers/categoryController.js";


//we create the category Router
const categoryRouter = Router()


//we defined the different routes 
categoryRouter.get('/categories', async (req,res) =>{
    //we want to get all the categories
    try{
        const categories = await categoryModel.find()
        if(!categories){
            return res.status(500).json({error :'No categories'})
        }res.status(200).json(categories)
    }
    catch(err){
        console.log( `Internal server error`,err);
        res.status(500).json({error :`${err.message}`})
    }

})


categoryRouter.post('/category', async (req,res ) => {
    // We destructure the properties of the req.body object
    const { name, description } = req.body
    try {
        // We create a new category by calling the create method on the Category model by passing the previous destructured properties
        const newCategory = await categoryModel.create({ name, description })
        // We return the new category with a status code 201 (created data)
        return res.status(201).json(newCategory)
    }
    catch (err) {
        console.error('Internal server error :red_circle:', err)
        res.status(500).json({ error: `${err.message} :red_circle:` })
    }
  })

categoryRouter.post('/categories', createCategories)

  export default categoryRouter

 