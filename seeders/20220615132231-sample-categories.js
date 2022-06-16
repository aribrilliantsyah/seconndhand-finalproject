'use strict';

const { DATE } = require("sequelize");

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

    await queryInterface.bulkInsert('categories', [
      {
        category: "Makanan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: "Minuman",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: "Hiburan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: "Elektronik",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: "Hobi",
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

    await queryInterface.bulkDelete('categories', [
      {
        category: "Makanan",
      },
      {
        category: "Minuman",
      },
      {
        category: "Hiburan",
      },
      {
        category: "Elektronik",
      },
      {
        category: "Hobi",
      },
    ])
  }
};
