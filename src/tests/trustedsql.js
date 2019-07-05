const sql = require('mssql/msnodesqlv8')

const pool = new sql.ConnectionPool({
  database: 'yourdatabasename',
  server: 'localhost',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
})

//var sqlStr = "select * from INFORMATION_SCHEMA.COLUMNS c where TABLE_SCHEMA = 'dbo' and TABLE_NAME = 'Contacts'";
//var sqlStr = "select distinct TABLE_SCHEMA, TABLE_NAME from INFORMATION_SCHEMA.COLUMNS c order by TABLE_NAME";
var sqlStr = "select distinct DATA_TYPE from INFORMATION_SCHEMA.COLUMNS c order by DATA_TYPE";
//'select GroupName, GroupId from dbo.Groups order by GroupName'
pool.connect().then(() => {
  //simple query
  pool.request().query(sqlStr, (err, result) => {
	if(err)
		console.log(err);
	else
		console.log(result.recordsets[0]);
	pool.close();
    })
})