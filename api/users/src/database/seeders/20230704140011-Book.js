'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [{
      title: 'Moby Dick',
      userId: 1,
      bookId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Huckelberry Finn',
      userId: 1,
      bookId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'The Great Gatsby',
      userId: 2,
      bookId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Moby Dick',
      userId: 2,
      bookId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Huckelberry Finn',
      userId: 3,
      bookId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'The Great Gatsby',
      userId: 3,
      bookId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
