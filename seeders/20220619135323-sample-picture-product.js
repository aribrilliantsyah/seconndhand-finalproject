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

     await queryInterface.bulkInsert('product_pictures', [
      {
        product_id: 1,
        picture: 'uploads/product/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 1,
        picture: 'uploads/product/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 1,
        picture: 'uploads/product/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 1,
        picture: 'uploads/product/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 2,
        picture: 'uploads/product/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 3,
        picture: 'uploads/product/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 4,
        picture: 'uploads/product/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 5,
        picture: 'uploads/product/default.png',
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

     await queryInterface.bulkDelete('product_pictures', [
      {
        product_id: 1
      },
      {
        product_id: 2
      },
      {
        product_id: 3
      },
      {
        product_id: 4
      },
      {
        product_id: 5
      },
    ])
  }
};
