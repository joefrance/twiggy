const mysql = require("mysql");

export namespace MySQLHelper
{
    export class QueryResult
    {
        result: any;
        exception: any;
    }

    export class ExecuteQueryHelper
    {
        isConnected: boolean = false;
        mysqlConnection: any = null;
        callResponse: any = null;
        
        close() {
            if(this.isConnected === true) {
                this.mysqlConnection.end();
            }
        }

        async connectToServer(connection: any): Promise<QueryResult> {

            var queryResult: QueryResult = new QueryResult();

            try
            {
                this.mysqlConnection = mysql.createConnection(connection);
                
                this.isConnected = false;
                this.callResponse = await this.mysqlConnection.connect();
                this.isConnected = true;

                queryResult.result = this.callResponse;
            }
            catch(ex)
            {
                queryResult.exception = ex;
                console.log(ex);
            }

            return queryResult;
        }

        async executeQueryAndWait(sqlQuery: string): Promise<QueryResult> {

            var queryResult: QueryResult = new QueryResult();

            try
            {
                queryResult.result = await this.mysqlConnection.query(sqlQuery);
            }
            catch(ex)
            {
                queryResult.exception = ex;
                console.log(ex);
            }

            return queryResult;
        }

        executeQueryAsync(
            connection: any,
            sql: string,
            callback: Function): void {

            var con = mysql.createConnection(connection);

            con.connect(function(err){

                if(err) {
                    callback(err);
                } else {
                    con.query(sql, function(err, rows) {
                        if(err) {
                            callback(err);
                        } else {
                            callback(null, rows);
                            con.end(function(err) {
                            // The connection is terminated gracefully
                            // Ensures all previously enqueued queries are still
                            // before sending a COM_QUIT packet to the MySQL server.
                            });                            
                        }

                    });
                }
            });            
        }

        executeQuery(
            connection: any,
            sql: string,
            callback: Function): void {
            var isConnected: any = false;
            try
            {
                var mysqlConnection: any = mysql.createConnection(connection);
                mysqlConnection.connect().then(() => {
                    isConnected = true;
                    mysqlConnection.query(sql, (err, result) => {
                        callback(err, result);
                        mysqlConnection.end();
                    })
                }).catch(function (err) {
                    callback(err, null);
                });

            }
            catch(ex)
            {
                if(isConnected === true) {
                    mysqlConnection.end();
                }
                //console.log("error caught");
                callback(ex, null);
            }
        }
    }
}