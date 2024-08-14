import mongoose from "mongoose";
import CategoryModel from "../models/categoryModel.js";

const getCategories = async (req, res) => {
  // We want to get all the categories
  // We use the CategoryModel and we call the find method on it
  // The find method allows to retreive all the data from the CategoryModel
  // If there is no categories we send an error message
  // We also catch the error in the catch(err) and return it
  try {
    const categories = await CategoryModel.find();
    if (categories.length < 1) {
      return res.status(404).json({ error: "No categories found" });
    }
    const categoriesCount = await CategoryModel.countDocuments();
    res.set(
      "Content-Range",
      `categories 0-${categories.length}/${categoriesCount}`
    );
    return res.status(200).json(categories);
  } catch (err) {
    console.error("Internal server error 🔴", err);
    res.status(500).json({ error: `${err.message} 🔴` });
  }
};

const createCategory = async (req, res) => {
  // We destructure the properties of the req.body object
  const { name, description } = req.body;
  try {
    // We create a new category by calling the create method on the Category model by passing the previous destructured properties
    const newCategory = await CategoryModel.create({ name, description });
    // We return the new category with a status code 201 (created data)
    return res.status(201).json(newCategory);
  } catch (err) {
    console.error("Internal server error 🔴", err);
    res.status(500).json({ error: `${err.message} 🔴` });
  }
};

const getCategoryById = async (req, res) => {
  // We destructure the id in the req.params object
  const { categoryID } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(categoryID)) {
      return res.status(400).json({ error: "Invalid category ID format" });
    }

    // We search in the CategoryModel where we have an id that match the req.params.categoryID that we destructured before
    const category = await CategoryModel.findById(categoryID);
    // If we dont find any id that match categoryID we return a 404 status code with an error message : Category not found
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    // We return the category that matchs
    return res.status(200).json(category);
  } catch (err) {
    console.error("Internal server error 🔴", err);
    res.status(500).json({ error: `${err.message} 🔴` });
  }
};

const getCategoryByName = async (req, res) => {
  // We destructure the name in our req.query object, req.query being used for searching
  const { name } = req.query;
  try {
    // We search for the a category name that match req.query.name using the findOne method
    const category = await CategoryModel.findOne({ name });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    // We return the category that matchs the name
    return res.status(200).json(category);
  } catch (err) {
    console.error("Internal server error 🔴", err);
    res.status(500).json({ error: `${err.message} 🔴` });
  }
};

const createCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.create(req.body);
    res.status(201).json(categories);
  } catch (err) {
    console.error("Internal server error 🔴", err);
    res.status(500).json({ error: `${err.message} 🔴` });
  }
};

const deleteAllCategories = async (req, res) => {
  try {
    const deleteCategories = await CategoryModel.deleteMany();
    return res.status(202).json("Categories deleted");
  } catch (err) {
    console.error("Internal server error 🔴", err);
    res.status(500).json({ error: `${err.message} 🔴` });
  }
};

const searchCategoryByName = async (req, res) => {
  try {
    const { name } = req.query;

    const categories = await CategoryModel.find({
      name: { $regex: name, $options: "i" },
    });

    return res.status(200).json(categories);
  } catch (err) {
    console.error("Internal server error 🔴", err);
    res.status(500).json({ error: `${err.message} 🔴` });
  }
};

const getCategorySearchSuggestions = async (req, res) => {
    try {
      const { name } = req.query;
  
      const suggestions = await CategoryModel.find(
        { name: { $regex: name, $options: "i" } },
        "name"
      );
  
      return res.status(200).json(suggestions);
    } catch (err) {
      console.error("Internal server error 🔴", err);
      res.status(500).json({ error: `${err.message} 🔴` });
    }
  };

export {
  getCategories,
  getCategoryById,
  getCategoryByName,
  createCategory,
  createCategories,
  deleteAllCategories,
  searchCategoryByName,
  getCategorySearchSuggestions
};
