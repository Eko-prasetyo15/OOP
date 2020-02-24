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

function login() {
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
            console.log('Maaf Username dan Password Anda Salah, coba lagi !');
            login();
          }
        })
      })
    })
  })
}

function main() {
  console.log(`
=====================================================================
Silahkan pilih opsi dibawah ini:
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Keluar
=====================================================================
    `);

  rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
    switch (number) {
      case '1':
        menuMahasiswa();
        break;
      case '2':
        menuJurusan();
        break;
      case '3':
        menuDosen();
        break;
      case '4':
        menuMatakuliah();
        break;
      case '5':
        menuKontrak();
        break;
      case '6':
        console.log('=====================================================================')
        console.log('Anda telah keluar')
        login()
        break;
      default:
        console.log('Selection not selected');
        main();
        break;
    }
  });
}

login()

function menuMahasiswa() {
  console.log(`
=====================================================================
silahkan pilih opsi di bawah ini :
[1] Daftar Murid
[2] Cari murid
[3] Tambah Murid
[4] Hapus Murid
[5] Kembali
  `)
  rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
    switch (number) {
      case '1':
        DaftarMurid();
        break;
      case '2':
        CariMurid();
        break;
      case '3':
        TambahMurid();
        break;
      case '4':
        HapusMurid();
        break;
      case '5':
        console.log('=====================================================================')
        console.log('anda telah kembali')
        main()
        break;
      default:
        main();
        break;
    }
  });
}

function DaftarMurid() {
  db.serialize(() => {
    let sql = `SELECT id_nim,nama,alamat,namajurusan FROM mahasiswa , jurusan
    WHERE mahasiswa.jurusan = jurusan.id_jurusan;`;
    db.all(sql, (err, row) => {
      if (err) throw err;

      if (row) {
        // cetak isi row
        // console.log(`[${row.id_nim}, ${row.nama}, ${row.alamat},${row.namajurusan}]`)
        var table = new Table({
          head: ['Nim', 'Nama', 'Alamat', 'Jurusan'],
          colWidths: [10, 20, 30, 20]
        });
        row.forEach(row => { 
          table.push(
          [`${row.id_nim}`, `${row.nama}`, `${row.alamat}`, `${row.namajurusan}`] 
        );   
        })
        console.log(table.toString());
        main();
      } else {
        console.log("Tidak ada data/hasil");
      }
    });
  })
}

function CariMurid(){
  rl.question('Masukan NIM: ', (id_nim) => {
    console.log('=====================================================================');
      db.serialize(() => {
        let sql = `SELECT * FROM mahasiswa WHERE mahasiswa.id_nim ='${id_nim}'`;
        db.get(sql, (err, row) => {
          if (err) throw err;
          if (row) {
            // console.log(`Welcome, '${row.id_nim}'. Your access level is: '${row.user_role}'`);
            console.log(`Student Detail `);
            console.log(`
id      : ${row.id_nim},
nama    : ${row.nama},
Alamat  : ${row.alamat},
Jurusan : ${row.jurusan},`);
menuMahasiswa()
          } else {
            console.log('Maaf NIM yang anda masukan salah, coba lagi !');
            CariMurid();
          }
        })
      })
    })
}
function TambahMurid(){
  console.log('lengkapi data di bawah ini :')
  rl.question('NIM: ', (id_nim) =>{
    rl.question('Nama: ', (nama) =>{
      rl.question('Jurusan: ', (jurusan) =>{
        rl.question('Alamat: ', (alamat)=>{
          let sql = `INSERT INTO mahasiswa (id_nim, nama, jurusan, alamat) VALUES ('${id_nim}', '${nama}','${jurusan}','${alamat}')`;
  db.run(sql, (err) => {
      if(err) throw err;
      DaftarMurid()
        })
      })
    })
  })
  });
}

