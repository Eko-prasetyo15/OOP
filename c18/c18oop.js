const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let db = new sqlite3.Database('university.db', err => {
  if (err) {
    return console.error(err.message);
  }
});
let username;
  console.log(`
=====================================================
  Welcome to Universitas Pendidikan Indonesia
  Jl. Setiabudhi No.255
===================================================== `);
  rl.question('username: ', (username) => {
    console.log('=====================================================================');
    rl.question('password: ', (password) => {
        console.log('=====================================================================');
        db.serialize(() => {
            let sql = `SELECT * FROM login WHERE login.username='${username}' AND login.password='${password}'`;
            db.get(sql, (err, row) => {
                if (err) {
                    throw err;
                }
                if (row) {
                    console.log(`Welcome, '${row.username}'. Your access level is: '${row.user_role}'`);
                    console.log('=====================================================================');
                   main()
                } else {
                    console.log('Sorry you are not registered to use this service or wrong username and password');
                    login();
                }
            })
        })
    })
})
function main() {
  console.log(`
=====================================================================
Please choose the option below:
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Log out
=====================================================================
    `)};