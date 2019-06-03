const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;
const localConnectionString = 'postgres://pblkzvrgqobwvq:98d02ab88f4dd8e2528e659c9b0ecec7911348d23e3483411cf2124033149347@ec2-54-247-85-251.eu-west-1.compute.amazonaws.com:5432/dd30j36sa1dgt5';

const db = {}

db.runQuery = async function(sql){
  const client = new Client({
    connectionString: connectionString || localConnectionString,
    ssl: true,
  });

  let response = null;

  try {
    await client.connect();

    let res = await client.query(sql).then(function(res){
      return res;
    });

    response = res.rows;
    await client.end();

  } catch (error) {
    console.log(error);
  }

  return response;
}

module.exports = db;
