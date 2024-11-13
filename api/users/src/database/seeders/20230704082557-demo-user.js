'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Herman Melville',
      email: 'guido@lizard.global',
      st_id: 'da5a3931-dcb6-4a2f-af4e-e2d5ac6fb73f',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Mark Twain',
      email: 'guido+mail@lizard.global',
      st_id: '9fb99b85-df8b-4adb-a5eb-cff79f9002bd',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Scott Fitzgerald',
      email: 'guido@+testlizard.global',
      st_id: '50aefe5c-985a-4cf8-90e0-5c62a8b8fa31',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};