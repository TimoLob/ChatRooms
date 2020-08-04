'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("users",[{
      username: "Timo",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert("rooms",[{
      name: "SuperSecretRoom",
      passwort:"SuperSecretPassword",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert("messages",[{
      from:2,
      text: "<Insert Message here>",
      roomId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("messages",null,{});

    await queryInterface.bulkDelete("users",null,{});
    await queryInterface.bulkDelete("rooms",null,{});
  }
};
