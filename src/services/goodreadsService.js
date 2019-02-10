function goodreadsService() {

    function getBookById() {
        return new Promise((resolve, reject) => {
            resolve({description: 'some description'});
        });
    }

    return {getBookById}
}

module.exports = goodreadsService();
