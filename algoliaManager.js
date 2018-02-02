'use strict';

const algoliasearch = require('algoliasearch');

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

module.exports.addPerson = streamPerson => {
  const person = preparePersonForAlgolia(streamPerson);
  console.log(person);

  return index.addObject(person);
};

function preparePersonForAlgolia(streamPerson) {
  console.log(streamPerson);
  return {
    personId: streamPerson.personId.S,
    name: streamPerson.name.S,
    country: streamPerson.country.S
  };
}
