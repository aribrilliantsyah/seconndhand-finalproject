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
        seller_id: 2,
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
      {
        product: "Product 6",
        price: 10000,
        category_id: 1,
        status: 1,
        description: "Ini merupakan Product 6",
        seller_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product: "Product 7",
        price: 10000,
        category_id: 2,
        status: 1,
        description: "Ini merupakan Product 7",
        seller_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product: "Product 8",
        price: 10000,
        category_id: 3,
        status: 1,
        description: "Ini merupakan Product 8",
        seller_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product: "Product 9",
        price: 10000,
        category_id: 4,
        status: 1,
        description: "Ini merupakan Product 9",
        seller_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product: "Product 10",
        price: 10000,
        category_id: 5,
        status: 1,
        description: "Ini merupakan Product 10",
        seller_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product: "Product 11",
        price: 10000,
        category_id: 5,
        status: 1,
        description: "Ini merupakan Product 11",
        seller_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product: "Product 12",
        price: 10000,
        category_id: 5,
        status: 1,
        description: "Ini merupakan Product 12",
        seller_id: 4,
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
      {
        product: 'Product 6'
      },
      {
        product: 'Product 7'
      },
      {
        product: 'Product 8'
      },
      {
        product: 'Product 9'
      },
      {
        product: 'Product 10'
      },
      {
        product: 'Product 11'
      },
      {
        product: 'Product 12'
      },
    ])
  }
};
