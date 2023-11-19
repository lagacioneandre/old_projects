const Chance = require('chance');
const chance = new Chance();


exports.calcTotalItems = (pageNumber, pageSize) => {
    const totalPages = Math.round(75 / pageSize);
    const totalItems = pageSize || 25;

    if (pageNumber === totalPages) {
        const totalItemsShowed = totalPages * pageSize;
        totalItems = 75 - totalItemsShowed;
    }

    return totalItems;
}

exports.cpfGenerator = () => {
    const cpf = chance.cpf();
    return cpf.replace(/[.-]/gi, '');
}