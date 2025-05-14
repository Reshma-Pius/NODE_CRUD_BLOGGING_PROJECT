'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const timestamp = new Date();
    return queryInterface.bulkInsert('categories', [
      {
        name: 'Category1',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        name: 'Category2',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        name: 'Category3',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        name: 'Category4',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        name: 'Category5',
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]);                   
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {})
  }
};
