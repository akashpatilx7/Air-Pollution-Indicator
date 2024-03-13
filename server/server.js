const express = require("express");
const neo4j = require("neo4j-driver");
const cors = require('cors')
 
const driver = neo4j.driver(
  "neo4j+s://c0d8e37c.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "e_9ksn9LIXZZHkZmq3KjbLdGA6unVRY-FwLF2uWzqtQ")
);
 
//Create a Neo4j driver instance
// const driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
 
// Create an Express application
const app = express();
app.use(cors());
const port = 3004;
 
// Define a route to retrieve data from Neo4j
app.get('/getdata', async (req, res) => {
  const session = driver.session();
 
  try {
    const cypherQuery = 'MATCH (n) RETURN n LIMIT 10';
 
    console.log("above session")
    const result = await session.run(cypherQuery);
 
   console.log("below session")
    const data = result.records.map(record => record.get(0).properties);
    console.log("data is ",data);
    res.json({ data });
  } catch (error) {
    console.error('Error executing Cypher query:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await session.close();
  }
});
 

 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
