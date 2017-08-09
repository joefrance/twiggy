const sql = require('mssql');
const ConnectionPool = require('mssql');

import { QueryResult } from '../query-result.model';

export namespace MSSQLHelper
{
    export class ExecuteQueryHelper
    {
        pool: any = null;
        isConnected: boolean = false;

        close() {
            sql.close();
        }

        async connectToServer(config: any): Promise<QueryResult> {

            var queryResult: QueryResult = new QueryResult();

            try
            {
                this.isConnected = false;
                this.pool = await sql.connect(config);
                this.isConnected = true;

                queryResult.result = this.pool;
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
                queryResult.result = await this.pool.request().query(sqlQuery);
            }
            catch(ex)
            {
                queryResult.exception = ex;
                console.log(ex);
            }

            return queryResult;
        }

        executeQuery(
            pool: any,
            sql: string,
            callback: Function): void {
            try
            {

                //console.dir(this.callBack);
                //console.dir(pool);
                pool.connect().then(() => {
                    //console.log("connected");
                    //simple query
                    pool.request().query(sql, (err, result) => {
                        callback(err, result);
                        //if(err)
                        //    console.log(err);
                        //else {
                        //    this.callBack(err, result);
                            //console.log("after callback");
                        //}
                        //console.log(result.recordsets[0]);
                        pool.close();
                    })
                }).catch(function (err) {
                    //console.log("Promise Rejected" + err);
                    callback(err, null);
                });

            }
            catch(ex)
            {
                //console.log("error caught");
                callback(ex, null);
            }
        }
    }
}