const mysql = require('async-mysql');
 export namespace MySQLHelper
{
    export class QueryResult
    {
        result: any;
        exception: any;
    }

    export class ExecuteQueryHelper
    {
        async executeQuery(connection: any, query: string): Promise<QueryResult>
        {

            var queryResult: QueryResult = new QueryResult();

            // try
            // { 
            //     var cn = await mysql.connect(connection);
            //     console.log("Connected");
            
            //     queryResult.result = await cn.query(query);
            // }
            // catch(ex)
            // {
            //     queryResult.exception = ex;
            //     //console.log(ex);
            // }

            return queryResult;
        }
    }
}
