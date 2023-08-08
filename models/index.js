// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: null,
})

Product.belongsTo(Category, {
  foreignKey: 'category_id',
})

// Products belongToMany Tags (through ProductTag)
Products.belongToMany(Tags, {
  through: {
    model: 'product_tags',
    unique: false
  },
  as: 'products_tags'
})

// Tags belongToMany Products (through ProductTag)
Tags.belongToMany(Products, {
  through: {
    model: 'product_tags',
    unique: false
  },
  as: 'tags_products'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
