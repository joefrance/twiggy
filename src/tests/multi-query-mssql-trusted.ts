const fs = require('fs');

import { MSSQLHelperTrusted } from "../lib/database/mssql/execute-query-helper-trusted-windows-only";

var args = process.argv.slice(2);

var argv = require('minimist')(process.argv.slice(2));
if  (
        argv.configpath == undefined
    ) {

        // See contents of:
        // mssql_example_connection_config_json
        // for example connection information
        // It may be possible to use this with
        // windows with the addition of the
        // mssql/msnodesqlv8 driver
        // and setting trustedConnection: true

        console.log("Usage: node multi-query-mssql --configpath connection.config.json")
} else {
    var config = JSON.parse(fs.readFileSync(argv.configpath, 'utf8'));

    var qh: MSSQLHelperTrusted.ExecuteQueryHelper = new MSSQLHelperTrusted.ExecuteQueryHelper();

    callQueriesSync(config);

}

// This function will run syncronously
// inside the async braces
// This simplifies "cascading" queries
async function callQueriesSync(config: any): Promise<void> {

    let result = await qh.connectToServer(config);

    console.dir(result.result.connect);

    if(result.exception != null) {
        console.log(result.exception);
        return;
    }

    // Get the table list from the database
    // in the config
    //let qr = await qh.executeQueryAndWait("select [name] from sysobjects where xtype = 'U' and [name] not like '%_shadow'");
    //console.dir(qr);
    // for(let ix=0; ix < qr.result.recordsets.length; ix++) {

    //     // Loop through each
    //     // table and count the rows
    //     let sql = `select count(1) NumRows from [${qr.result.recordsets[ix].name}]`;
        
    //     let qr2 = await qh.executeQueryAndWait(sql);

    //     console.log(`${qr.result.recordset[ix].name}: ${qr2.result.recordset[0].NumRows}`);
    // }
        
    qh.close();
}