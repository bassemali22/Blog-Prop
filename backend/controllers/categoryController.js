const asyncHandler = require("express-async-handler");
const { Catrgory, vaildataCreateCatrgory } = require("../models/Category");

/**

  @desc     Create New Category
  @router   /api/Category
  @method   POST
  @access   private (onley logged in user)
 */

module.exports.createCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = vaildataCreateCatrgory(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  // console.log("bassem", req.body.title);
  const category = await Catrgory.create({
    title: req.body.title,
    user: req.user.id,
  });
  res.status(201).json(category);
});

module.exports.getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const categories = await Catrgory.find();
  if (!categories) {
    res(404).json("categories not found ");
  }
  res.status(200).json(categories);
});

module.exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Catrgory.findById(req.params.id);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }
  await Catrgory.findByIdAndDelete(req.params.is);
  res
    .status(200)
    .json({ message: "Categoru has been deleted", category: category._id });
});
