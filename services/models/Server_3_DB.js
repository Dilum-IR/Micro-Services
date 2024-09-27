const mysql = require('mysql2');
const pool = mysql.createPool({
	// Adjust this value based on your requirements
	host: 'localhost',
	user: 'root',
	password: 'Dilu123',
	database: 'sritel_bill',
});
async function INSERT(table, columns, values) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
				return;
			}

			// Execute the query using the connection
			connection.query('INSERT INTO ' + table + ' ' + columns + ' VALUES ' + values, (err, result, fields) => {
				connection.release(); // Release the connection back to the pool

				if (err) {
					reject(err);
					return;
				}
				console.log(result);
				resolve(JSON.parse(JSON.stringify(results)));
			});
		});
	});
}
const UPDATE = function (data) {
	console.log(data);
};
const DELETE = function (data) {
	console.log(data);
};
async function SELECT(table) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
				return;
			}

			// Execute the query using the connection
			connection.query('SELECT * FROM ' + table, (err, result, fields) => {
				connection.release(); // Release the connection back to the pool

				if (err) {
					reject(err);
					return;
				}
				//console.log(result);
				resolve(JSON.parse(JSON.stringify(result)));
			});
		});
	});
}
async function SELECT_WHERE(table, column, value) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
				return;
			}
			connection.query('SELECT * FROM ' + table + ' WHERE ' + column + "='" + value + "'", (err, result, fields) => {
				connection.release();
				if (err) {
					reject(err);
					return;
				}
				resolve(JSON.parse(JSON.stringify(result)));
			});
		});
	});
}
async function QUERY(query) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
				return;
			}
			connection.query(query, (err, result, fields) => {
				connection.release();
				if (err) {
					console.log(err);
					resolve('error');
				} else {
					resolve(JSON.parse(JSON.stringify(result)));
				}
			});
		});
	});
}
module.exports = {INSERT, UPDATE, SELECT, DELETE, QUERY, SELECT_WHERE};
