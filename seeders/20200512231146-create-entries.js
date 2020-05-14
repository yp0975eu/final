'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // init empty array for the year and fill with empty objects
    const entries = new Array(356)
    entries.fill({})
    

    // add dates for each object
    var date = new Date(`${(new Date()).getFullYear()}-01-01`)
    for(let entry in entries ) {
      const d = new Date(date.setDate(date.getDate() + 1))
      const mood =  Math.floor(Math.random()*(3-0+1)+0);
      entries[entry] = {
      date: new Date(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`),
      value: mood,
      createdAt: new Date(),
      updatedAt: new Date()
      }
    }
    return queryInterface.bulkInsert('Entries', entries, {})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Entries', null, {});
  }
};
