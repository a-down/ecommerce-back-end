const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const data = await Category.findAll( {include: [{model: Product}]} ).catch((err) => res.status(500).json(err))
  res.status(200).json(data)
});

router.get('/:id', async (req, res) => {
  const data = await Category.findByPk(req.params.id, {include: [{model: Product}]} ).catch((err) => res.status(500).json(err))
  res.status(200).json(data)
});

router.post('/', async (req, res) => {
  const data = await Category.create({category_name: req.body.category_name}).catch((err) => res.status(500).json(err))
  res.status(200).json({message: "Category Created", data})
});

router.put('/:id', async (req, res) => {
  const data = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      }
    })
    .catch((err) => res.status(500).json(err))

  const newData = await Category.findByPk(req.params.id, {include: [{model: Product}]} ).catch((err) => res.status(500).json(err))

  res.status(200).json({message: 'Category updated.', newData})
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
