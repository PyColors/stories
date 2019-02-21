const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('server:goodreadsService');
const apiKeys = require('../../src/config/apiKeys');

/**
 * Get books from API
 * @returns {{getBookById: (function(*): Promise<any>)}}
 */
function goodreadsService() {
  // By default 'xml2js' put an Array for everything
  const parser = xml2js.Parser({ explicitArray: false });

  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://www.goodreads.com/book/show/${id}.xml?key=${
            apiKeys.goodreadsKey
          }`
        )
        .then(response => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch(error => {
          reject(error);
          debug(error);
        });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();
