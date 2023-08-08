const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// get all products
router.get('/', async (req, res) => {
  const data = await Product.findAll( {
    include: [
      { model: Category },
      { model: Tag, 
        through: ProductTag,
        as: 'products_tags' // WORKS
      },
    ]})
  .catch((err) => res.status(500).json(err))

  res.status(200).json(data)
});


// get product by id
router.get('/:id', async (req, res) => {
  try {
    const data = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, 
          through: ProductTag,
          as: 'products_tags' // WORKS
        },
      ]})
    if (!data) {
      res.status(404).json({ message: "No product with this id."})
      return;
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});


// post new product
router.post('/', async (req, res) => {
  const newData = Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(newData);
    })
    .then((productTagIds) => res.status(200).json({message: 'New product created.'}))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


// update product by id
router.put('/:id', async (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


// delete product by id
router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
