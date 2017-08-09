const fs = require('fs');

import { MSSQLHelper } from "../lib/database/mssql/execute-query-helper";

declare var __dirname;
var importString: string = '';
var args = process.argv.slice(2);
//console.dir(args);

var argv = require('minimist')(process.argv.slice(2));
//console.dir(argv.schema);
//console.dir(argv.table);
if  (
        argv.configpath == undefined
    ) {
        console.log("Usage: node multi-query-mssql --configpath connection.config.json")
} else {
    var config = JSON.parse(fs.readFileSync(argv.configpath, 'utf8'));
    console.log(config);

    var qh: MSSQLHelper.ExecuteQueryHelper = new MSSQLHelper.ExecuteQueryHelper();

    qh.connectToServer(config).then(result => {
        console.log(result);
        
        qh.close();
    });
}