const knex = require('knex')({
    client: 'mssql',
    connection: {
        host: "localhost",
        user: "SA",
        password: "JeSuis1SupetStrongMDP",
        database: "",
        options: {
            enableArithAbort: false
        }
    },
    pool: { min: 0, max: 5, idleTimeoutMillis: 10000 },
    acquireConnectionTimeout: 30000,
    debug: 'debug',
    postProcessResponse: (result) => {
        result && result.forEach(row => Object.keys(row).forEach(key => row[key] = typeof row[key] == 'string' ? row[key].trim() : row[key]));
        return result;
    }
});

knex.arrayParam = (stringList, type) => {
    return stringList.split(',').map(p => type(p)).join(',')
}

exports.knex = knex;