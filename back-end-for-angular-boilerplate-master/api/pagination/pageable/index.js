const sort = require('../sort');

exports.pageable = (pageNumber, pageSize) => {
    return {
        sort: sort,
        pageNumber: pageNumber || 0,
        pageSize: pageSize || 25,
        offset: 0,
        paged: true,
        unpaged: false
    }
}