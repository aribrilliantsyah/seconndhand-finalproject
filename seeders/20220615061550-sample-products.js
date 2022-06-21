'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('products', [
      {
        product: "Product 1",
        price: 10000,
        category_id: 1,
        status: 1,
        description: "Ini merupakan Product 1",
        seller_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product: "Product 2",
        price: 10000,
        category_id: 2,
        status: 1,
        description: "Ini merupakan Product 2",
        seller_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product: "Product 3",
        price: 10000,
        category_id: 3,
        status: 1,
        description: "Ini merupakan Product 3",
        seller_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product: "Product 4",
        price: 10000,
        category_id: 4,
        status: 1,
        description: "Ini merupakan Product 4",
        seller_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product: "Product 5",
        price: 10000,
        category_id: 5,
        status: 1,
        description: "Ini merupakan Product 5",
        seller_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('products', [
      {
        product: 'Product 1'
      },
      {
        product: 'Product 2'
      },
      {
        product: 'Product 3'
      },
      {
        product: 'Product 4'
      },
      {
        product: 'Product 5'
      },
    ])
  }
};