'use strict';

const databaseManager = require('./databaseManager');
const algoliaManager = require('./algoliaManager');

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

module.exports.updateAlgoliaIndex = (event, context, callback) => {
  console.log('updateAlgoliaIndex was called');

  const eventData = event.Records[0];
  const person = eventData.dynamodb.NewImage;
  console.log(person);

  algoliaManager.addPerson(person).then(() => {
    callback(null, null);
  });
};

module.exports.searchAlgoliaIndex = (event, context, callback) => {
  console.log('searchAlgoliaIndex was callled');
  const searchParameters = event.queryStringParameters;
  console.log(searchParameters);

  algoliaManager.searchPerson(searchParameters).then(result => {
    callback(null, createResponse(200, result));
  });
};
