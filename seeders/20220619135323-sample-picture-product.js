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
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 1,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 1,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 1,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 2,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 3,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 4,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 5,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 6,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 7,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 8,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 9,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 10,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 11,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 12,
        picture: 'https://res.cloudinary.com/aribrilliantsyah/image/upload/v1656950933/product/default_rq1im8.png',
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
      {
        product_id: 6
      },
      {
        product_id: 7
      },
      {
        product_id: 8
      },
      {
        product_id: 9
      },
      {
        product_id: 10
      },
      {
        product_id: 11
      },
      {
        product_id: 12
      },
    ])
  }
};
