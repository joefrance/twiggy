const fs = require('fs');

import { MySQLHelper } from "../lib/database/mysql/execute-query-helper";

var args = process.argv.slice(2);

var argv = require('minimist')(process.argv.slice(2));
if  (
        argv.configpath == undefined
    ) {

        // See contents of:
        // mysql_example_connection_config_json
        // for example connection information

        console.log("Usage: node multi-query-mysql --configpath connection.config.json")
} else {
    var config = JSON.parse(fs.readFileSync(argv.configpath, 'utf8'));

    let qh: MySQLHelper.ExecuteQueryHelper = new MySQLHelper.ExecuteQueryHelper();

    callQueriesSync(config, qh);
}

// This function will run syncronously
// inside the async braces
// This simplifies "cascading" queries
async function callQueriesSync(config: any, qh: MySQLHelper.ExecuteQueryHelper): Promise<void> {

    let result = await qh.connectToServer(config);

    let tableSql = `SELECT TABLE_SCHEMA, TABLE_NAME FROM information_schema.TABLES where TABLE_SCHEMA = ?;`;

    let qr = await qh.executeQueryAndWait(tableSql, [ config.database ]);

    for(let ix=0; ix < qr.result.rows.length; ix++) {
        let sql = `select count(1) NumRows from ${qr.result.rows[ix].TABLE_SCHEMA}.${qr.result.rows[ix].TABLE_NAME}`;

        let qr2 = await qh.executeQueryAndWait(sql, null);

        console.log(`${qr.result.rows[ix].TABLE_SCHEMA}.${qr.result.rows[ix].TABLE_NAME}: ${qr2.result.rows[0].NumRows}`);
    }
        
    qh.close();
}