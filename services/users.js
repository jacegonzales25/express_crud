const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultipleUsers(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, firstname, lastname,email  FROM users LIMIT ${offset},${config.listPerPage}`
  );
  const users = helper.emptyOrRows(rows);
  const meta = {page};

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

module.exports = {
  getMultipleUsers,
  getUser,
  saveUser
}