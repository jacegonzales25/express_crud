const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultipleUsers(page = 1, searchQuery = ''){
  const offset = helper.getOffset(page, config.listPerPage);


  // Query for the search function SQL
  let query = `SELECT id, firstname, lastname, email FROM users`;

  // Checks if the search has a value, if not proceed.
  if (searchQuery) {
    query += ` WHERE firstname LIKE '%${searchQuery}%' OR lastname LIKE '%${searchQuery}%' OR email LIKE '%${searchQuery}%'`;
  }

  
  query += ` LIMIT ${offset},${config.listPerPage}`;

  const rows = await db.query(
    query
  );
  const users = helper.emptyOrRows(rows);

  
  const meta = {page,
    totalUsers: await db.query(`SELECT COUNT(*) FROM users`),
  };

  return {
    users,
    meta
  }
}
async function getUser(id){
  const row = await db.query(
    `SELECT id, firstname, lastname,email  
    FROM users 
    WHERE id= ${id}`
  );
  const user = helper.emptyOrRows(row);
  return user[0]
}

async function saveUser(newUser){
  const row = await db.query(
    `INSERT INTO users(lastname,firstname,email) 
     VALUES ('${newUser.lastname}','${newUser.firstname}','${newUser.email}')`
  );
}

async function updateUser(newUser){
  const row = await db.query(
    `UPDATE users
    SET lastname='${newUser.lastname}',
        firstname= '${newUser.firstname}',
        email='${newUser.email}' 
    WHERE id='${newUser.id}'`
  );
}
async function deleteUser(id){
  const row = await db.query(
    `DELETE FROM users
     WHERE id='${id}'`
  );
}

module.exports = {
  getMultipleUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser
}