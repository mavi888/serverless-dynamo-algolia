'use strict';

const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.PERSONS_DYNAMODB_TABLE;

module.exports.savePerson = person => {
  const params = {
    TableName: TABLE_NAME,
    Item: person
  };

  return dynamo.put(params).promise().then(() => {
    return person.personId;
  });
};
