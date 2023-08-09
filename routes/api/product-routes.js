const router = require('express').Router();
const { Product, ProductTag, Tag } = require('../../models');

// POST create new product
router.post('/', async (req, res) => {
  try {
    const { product_name, price, stock, category_id, tagIds } = req.body;

    // Validate that required fields are provided
    if (!product_name || !price) {
      return res.status(400).json({ message: 'Product name and price are required' });
    }

    // Create the new product
    const newProduct = await Product.create({
      product_name,
      price,
      stock,
      category_id,
    });

    // If tagIds are provided, associate tags with the new product
    if (tagIds && tagIds.length) {
      const productTags = tagIds.map((tag_id) => ({
        product_id: newProduct.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTags);
    }

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});



module.exports = router;
