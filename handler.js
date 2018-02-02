'use strict';

const databaseManager = require('./databaseManager');
const uuidv1 = require('uuid/v1');

function createResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

module.exports.savePerson = (event, context, callback) => {
  const person = JSON.parse(event.body);
  console.log(person);
  person.personId = uuidv1();

  databaseManager.savePerson(person).then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};
