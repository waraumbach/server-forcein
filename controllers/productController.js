import CategoryModel from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";
import mongoose from "mongoose";


const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()
        if (products.length < 1) {
            return res.status(404).json({ error: 'No products found' })
        }
        const productsCount = await ProductModel.countDocuments()
        res.set('Content-Range', `products 0-${products.length}/${productsCount}`)
        return res.status(200).json(products)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const getProductById = async (req, res) => {
    const { productID } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(productID)) {
            return res.status(400).json({ error: 'Invalid product ID format' })
        }

        // We search in the ProductModel where we have an id that match the req.params.productID that we destructured before
        const product = await ProductModel.findById(productID)
        // If we dont find any id that match productID we return a 404 status code with an error message : Product not found
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        // We return the product that matchs
        return res.status(200).json(product)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const getProductByName = async (req, res) => {
    const { name } = req.query
    try {
        const product = await ProductModel.findOne({ name })
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        return res.status(200).json(product)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const createProduct = async (req, res) => {
    // We destructure the properties of the req.body object
    const { name, price, description, quantity, categoryId } = req.body
    try {
        // We create a new category by calling the create method on the Category model by passing the previous destructured properties
        const newProduct = await ProductModel.create({ name, price, description, quantity, categoryId })
        // We return the new category with a status code 201 (created data)
        return res.status(201).json(newProduct)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const createProducts = async (req, res) => {
    try {
        const products = await ProductModel.create(req.body)
        return res.status(201).json(products)
    }

    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const getProductsByCategory = async (req, res) => {
    const { categoryID } = req.params
    try {
        // Check if category exists before searching for the products
        const categoryExist = await CategoryModel.findById(categoryID)
        if (!categoryExist) {
            return res.status(404).json({ error: 'Category not found' })
        }
        const products = await ProductModel.find({ categoryId: categoryID }).populate('categoryId')
        res.status(200).json(products)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const deleteAllProducts = async (req, res) => {
    try {
        const deleteProducts = await ProductModel.deleteMany()
        return res.status(202).json('Products deleted')
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}




export { getProducts, createProduct, getProductByName, getProductsByCategory, getProductById, deleteAllProducts, createProducts }