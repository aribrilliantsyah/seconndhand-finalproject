'use strict';
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

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

    let defaultPass = bcrypt.hashSync('rahasia', salt);

    await queryInterface.bulkInsert('cities', [
      {
        'city': 'Kota',
        'createdBy': null,
        'updatedBy': null,
        'createdAt': new Date(),
        'updatedAt': new Date()
      }
    ]);

    await queryInterface.bulkInsert('users', [
      {
        'uuid': uuidv4(),
        'email': 'ariardiansyah101@gmail.com',
        'password': defaultPass,
        'oauth2': null,
        'otp': null,
        'token': null,
        'createdBy': null,
        'updatedBy': null,
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        'uuid': uuidv4(),
        'email': 'anangbagus666@gmail.com',
        'password': defaultPass,
        'oauth2': null,
        'otp': null,
        'token': null,
        'createdBy': null,
        'updatedBy': null,
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        'uuid': uuidv4(),
        'email': 'ester.yuliana11@gmail.com',
        'password': defaultPass,
        'oauth2': null,
        'otp': null,
        'token': null,
        'createdBy': null,
        'updatedBy': null,
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        'uuid': uuidv4(),
        'email': 'aapriliani819@gmail.com',
        'password': defaultPass,
        'oauth2': null,
        'otp': null,
        'token': null,
        'createdBy': null,
        'updatedBy': null,
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
    ]);

    await queryInterface.bulkInsert('biodata', [
      {
        'user_id': 1,
        'fullname': 'Ari Ardiansyah',
        'profile_picture': 'uploads/profile/default.png',
        'city_id': 1,
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        'user_id': 2,
        'fullname': 'Anang Bagus',
        'profile_picture': 'uploads/profile/default.png',
        'city_id': 1,
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        'user_id': 3,
        'fullname': 'Ester',
        'profile_picture': 'uploads/profile/default.png',
        'city_id': 1,
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        'user_id': 4,
        'fullname': 'Anisa',
        'profile_picture': 'uploads/profile/default.png',
        'city_id': 1,
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('users', [
      {
        'username': 'ariardiansyah101@gmail.com',
      },
      {
        'username': 'anangbagus666@gmail.com',
      }
     ]);
  }
};
