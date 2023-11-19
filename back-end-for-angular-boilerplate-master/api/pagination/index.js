const { pageable } = require('./pageable');
const { sort } = require('./sort');

exports.pagination = (pageNumber, pageSize) => {
    const totalPages = Math.round(75 / pageSize);
    const isFirstPage = pageNumber === 0 ? true : false;
    const isLastPage = pageNumber < totalPages ? false : true;

    return {
        content: [],
        pageable: pageable(pageNumber, pageSize),
        totalElements: 75,
        totalPages: totalPages,
        last: isLastPage,
        first: isFirstPage,
        size: pageSize || 25,
        number: 0,
        sort: sort,
        numberOfElements: pageSize || 25,
        empty: false
    }
}