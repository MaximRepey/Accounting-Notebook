const db = require('../db');

const getAll = () => {
    return db.getEntity('transactions');
};

const commit = (type, amount) => {
    return db
        .getEntity('transactions')
        .then(transactions => transactions.reduce((acc, val) => val.type === 'Credit' ? acc + val.amount : acc - val.amount, 0))
        .then(typeAmount => {
            if(type === 'Debet' && typeAmount < amount) {
                return Promise.reject('Not enough money, brof');
            }

            return db.createEntityRecord('transactions', { type, amount });
        });
};

module.exports = {
    getAll,
    commit,
}