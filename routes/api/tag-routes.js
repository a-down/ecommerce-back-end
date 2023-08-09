const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// get all tags
router.get('/', async (req, res) => {
  const data = await Tag.findAll( {
    include: [{
      model: Product,
      through: ProductTag,
      as: 'tags_products' // ex 2 did work
     },
    ]})
  .catch((err) => res.status(500).json(err))

  res.status(200).json(data)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
