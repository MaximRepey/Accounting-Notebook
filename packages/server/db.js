const dbUtils = require('./utils/db');

let db;

const initialDB = {
    meta: {
        locked: false
    },
    data: {
        transactions: []
    }
};

const init = () => {
    if(db) {
        console.log('DB is already initialized');
        return Promise.reject();
    }

    db = initialDB;
    console.log('Init DB success');

    return Promise.resolve();
};

const getEntity = entity => {
    if(!db) {
        return Promise.reject('DB is not initialized');
    }
    if (dbUtils.checkDbIsLocked(db)) {
        return Promise.reject('DB is Locked');
    }

    return Promise.resolve(db.data[entity]);
};

const createEntityRecord = (entity, data) => {
    if(!db) {
        return Promise.reject('DB is not initialized');
    }
    if (dbUtils.checkDbIsLocked(db)) {
        return Promise.reject('DB is Locked');
    }

    db.meta.locked = true;
    db.data[entity].push({ ...data, createdAt: new Date() });
    db.meta.locked = false;

    return Promise.resolve();
};

module.exports = {
    init,
    getEntity,
    createEntityRecord,
};
