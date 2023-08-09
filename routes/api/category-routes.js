const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories with associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET a single category by ID with associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT/update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = await Category.update(req.body, {
      where: { id: categoryId },
    });

    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.destroy({
      where: { id: categoryId },
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
