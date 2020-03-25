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
[2] Dosen
[3] Mata Kuliah
[4] Kontrak
[5] Jurusan
[6] Keluar
=====================================================================
    `);

  rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
    switch (number) {
      case '1':
        menuMahasiswa();
        break;
      case '2':
        menuDosen();
        break;
      case '3':
        menuMatakuliah();
        break;
      case '4':
        menuKontrak();
        break;
      case '5':
        menuJurusan();
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
          1
        })
        console.log(table.toString());
        menuMahasiswa();
      } else {
        console.log("Tidak ada data/hasil");
      }
    });
  })
}

function CariMurid() {
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

function TambahMurid() {
  console.log('lengkapi data di bawah ini :')
  rl.question('NIM: ', (id_nim) => {
    rl.question('Nama: ', (nama) => {
      rl.question('Jurusan: ', (jurusan) => {
        rl.question('Alamat: ', (alamat) => {
          let sql = `INSERT INTO mahasiswa (id_nim, nama, jurusan, alamat) VALUES ('${id_nim}', '${nama}','${jurusan}','${alamat}')`;
          db.run(sql, (err) => {
            if (err) throw err;
            DaftarMurid()
          })
        })
      })
    })
  });
}

function HapusMurid() {
  const sql = 'DELETE FROM mahasiswa WHERE id_nim = ?';
  rl.question('Enter the Mahasiswa NIM to delete:', id_nim => {
    db.run(sql, [id_nim], (err, row) => {
      if (err) throw err;
      console.log('Deleted successfully');
      DaftarMurid();
    })
  })
};

function menuDosen() {
  console.log(`
=====================================================================
silahkan pilih opsi di bawah ini :
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali
    `)
  rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
    switch (number) {
      case '1':
        DaftarDosen();
        break;
      case '2':
        CariDosen();
        break;
      case '3':
        TambahDosen();
        break;
      case '4':
        HapusDosen();
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

function DaftarDosen() {
  db.serialize(() => {
    let sql = `SELECT id_dosen, nama_dosen FROM dosen`;
    db.all(sql, (err, row) => {
      if (err) throw err;

      if (row) {
        // cetak isi row
        // console.log(`[${row.id_nim}, ${row.nama}, ${row.alamat},${row.namajurusan}]`)
        var table = new Table({
          head: ['ID', 'Nama'],
          colWidths: [20, 20]
        });
        row.forEach(row => {
          table.push(
            [`${row.id_dosen}`, `${row.nama_dosen}`]
          );
          1
        })
        console.log(table.toString());
        menuDosen();
      } else {
        console.log("Tidak ada data/hasil");
      }
    });
  })
}

function CariDosen() {
  rl.question('Masukan NIM: ', (id_dosen) => {
    console.log('=====================================================================');
    db.serialize(() => {
      let sql = `SELECT * FROM dosen WHERE dosen.id_dosen ='${id_dosen}'`;
      db.get(sql, (err, row) => {
        if (err) throw err;
        if (row) {
          console.log(`Dosen Detail `);
          console.log(`
  id      : ${row.id_dosen}
  nama    : ${row.nama_dosen}`);
          menuDosen()
        } else {
          console.log('Maaf Dosen yang anda masukan tidak terdaftar, coba lagi !');
          CariDosen();
        }
      })
    })
  })
}

function TambahDosen() {
  console.log('lengkapi data di bawah ini :')
  rl.question('NIM: ', (id_dosen) => {
    rl.question('Nama: ', (nama_dosen) => {
      let sql = `INSERT INTO dosen (id_dosen, nama_dosen) VALUES ('${id_dosen}', '${nama_dosen}')`;
      db.run(sql, (err) => {
        if (err) throw err;
        DaftarDosen()
      })
    })
  })
}

function HapusDosen() {
  const sql = 'DELETE FROM dosen WHERE id_dosen = ?';
  rl.question('Enter the Id Dosen to delete:', id_dosen => {
    db.run(sql, [id_dosen], (err, row) => {
      if (err) throw err;
      console.log('Deleted successfully');
      DaftarDosen();
    })
  })
};

function menuMatakuliah() {
  console.log(`
=====================================================================
silahkan pilih opsi di bawah ini :
[1] Daftar Matakuliah
[2] Cari Matakuliah
[3] Tambah Matakuliah
[4] Hapus Matakuliah
[5] Kembali
        `)
  rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
    switch (number) {
      case '1':
        DaftarMatakuliah();
        break;
      case '2':
        CariMatakuliah();
        break;
      case '3':
        TambahMatakuliah();
        break;
      case '4':
        HapusMatakuliah();
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

function DaftarMatakuliah() {
  db.serialize(() => {
    let sql = `SELECT id_matakuliah, nama, sks FROM matakuliah`;
    db.all(sql, (err, row) => {
      if (err) throw err;

      if (row) {
        // cetak isi row
        // console.log(`[${row.id_nim}, ${row.nama}, ${row.alamat},${row.namajurusan}]`)
        var table = new Table({
          head: ['ID', 'Nama Matakuliah', 'SKS'],
          colWidths: [20, 20, 10]
        });
        row.forEach(row => {
          table.push(
            [`${row.id_matakuliah}`, `${row.nama}`, `${row.sks}`]
          );
        })
        console.log(table.toString());
        menuMatakuliah();
      } else {
        console.log("Tidak ada data/hasil");
      }
    });
  })
}

function CariMatakuliah() {
  rl.question('Masukan Id Matakuliah: ', (id_matakuliah) => {
    console.log('=====================================================================');
    db.serialize(() => {
      let sql = `SELECT * FROM matakuliah WHERE matakuliah.id_matakuliah ='${id_matakuliah}'`;
      db.get(sql, (err, row) => {
        if (err) throw err;
        if (row) {
          console.log(`Matakuliah Detail `);
          console.log(`
      id matakuliah    : ${row.id_matakuliah}
      nama matakuliah   : ${row.nama}`);
          menuMatakuliah()
        } else {
          console.log('Maaf Matakuliah yang anda masukan tidak valid, coba lagi !');
          CariMatakuliah();
        }
      })
    })
  })
}

function TambahMatakuliah() {
  console.log('lengkapi data di bawah ini :')
  rl.question('Id Matakuliah: ', (id_matakuliah) => {
    rl.question('Nama Matakuliah: ', (nama) => {
      let sql = `INSERT INTO matakuliah (id_matakuliah, nama) VALUES ('${id_matakuliah}', '${nama}')`;
      db.run(sql, (err) => {
        if (err) throw err;
        DaftarMatakuliah()
      })
    })
  })
}

function HapusMatakuliah() {
  const sql = 'DELETE FROM matakuliah WHERE id_matakuliah = ?';
  rl.question('Enter the Id Matakuliah to delete:', id_matakuliah => {
    db.run(sql, [id_matakuliah], (err, row) => {
      if (err) throw err;
      console.log('Deleted successfully');
      DaftarKontrak();
    })
  })
};

function menuKontrak() {
  console.log(`
=====================================================================
silahkan pilih opsi di bawah ini :
[1] Daftar Kontrak
[2] Cari Kontrak
[3] Tambah Kontrak
[4] Hapus Kontrak
[5] Kembali `)
  rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
    switch (number) {
      case '1':
        DaftarKontrak()
        break;

      case '2':
        CariKontrak()
        break;

      case '3':
        TambahKontrak()
        break;

      case '4':
        HapusKontrak()
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
  })
}

function DaftarKontrak() {
  db.serialize(() => {
    let sql = `SELECT id, nilai, id_dosen, id_matakuliah, id_nim FROM kontrak`;
    db.all(sql, (err, row) => {
      if (err) throw err;

      if (row) {
        // cetak isi row
        // console.log(`[${row.id_nim}, ${row.nama}, ${row.alamat},${row.namajurusan}]`)
        var table = new Table({
          head: ['ID', 'NILAI', 'ID DOSEN', 'ID MATAKULIAH', 'ID NIM'],
          colWidths: [10, 10, 10, 10, 10]
        });
        row.forEach(row => {
          table.push(
            [`${row.id}`, `${row.nilai}`, `${row.id_dosen}`, `${row.id_matakuliah}`, `${row.id_nim}`]
          );
        })
        console.log(table.toString());
        menuKontrak();
      } else {
        console.log("Tidak ada data/hasil");
      }
    });
  })
}

function CariKontrak() {
  rl.question('Masukan Id Kontrak: ', (id) => {
    console.log('=====================================================================');
    db.serialize(() => {
      let sql = `SELECT * FROM kontrak WHERE kontrak.id ='${id}'`;
      db.get(sql, (err, row) => {
        if (err) throw err;
        if (row) {
          console.log(`Kontrak Detail `);
          console.log(`
Id Kontrak    : ${row.id}
Nilai         : ${row.nilai}
Id Dosen      : ${row.id_dosen}
Id Matakuliah : ${row.id_matakuliah}
Id Nim        : ${row.id_nim}`);
          menuKontrak()
        } else {
          console.log('Maaf Kontrak yang anda masukan tidak valid, coba lagi !');
          CariKontrak();
        }
      })
    })
  })
}

function TambahKontrak() {
  console.log('lengkapi data di bawah ini :')
  rl.question('Id Kontrak: ', (id) => {
    rl.question('Nilai:', (nilai) => {
      rl.question('Id Dosen :', (id_dosen) => {
        rl.question('Id Matakuliah :', (id_matakuliah) => {
          rl.question('Id Nim:', (id_nim) => {
            let sql = `INSERT INTO kontrak (id, nilai, id_dosen, id_matakuliah, id_nim) VALUES ('${id}','${nilai}','${id_dosen}','${id_matakuliah}', '${id_nim}')`;
            db.run(sql, (err) => {
              if (err) throw err;
              DaftarKontrak();
            })
          })
        })
      })
    })
  })
}

function HapusKontrak() {
  const sql = 'DELETE FROM kontrak WHERE id = ?';
  rl.question('Enter the Id Kontrak to delete:', id => {
    db.run(sql, [id], (err, row) => {
      if (err) throw err;
      console.log('Deleted successfully');
      DaftarKontrak();
    })
  })
};

function menuJurusan() {
  console.log(`
=====================================================================
silahkan pilih opsi di bawah ini :
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jurusan
[4] Hapus Jurusan
[5] Kembali
    `)
  rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
    switch (number) {
      case '1':
        DaftarJurusan();
        break;
      case '2':
        CariJurusan();
        break;
      case '3':
        TambahJurusan();
        break;
      case '4':
        HapusJurusan();
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

function DaftarJurusan() {
  db.serialize(() => {
    let sql = `SELECT id_jurusan, namajurusan FROM jurusan`;
    db.all(sql, (err, row) => {
      if (err) throw err;

      if (row) {
        var table = new Table({
          head: ['ID JURUSAN', 'NAMA JURUSAN'],
          colWidths: [10, 20]
        });
        row.forEach(row => {
          table.push(
            [`${row.id_jurusan}`, `${row.namajurusan}`]
          );
        })
        console.log(table.toString());
        menuJurusan();
      } else {
        console.log("Tidak ada data/hasil");
      }
    });
  })
}

function CariJurusan() {
  rl.question('Masukan Id Jurusan: ', (id_jurusan) => {
    console.log('=====================================================================');
    db.serialize(() => {
      let sql = `SELECT * FROM jurusan WHERE jurusan.id_jurusan ='${id_jurusan}'`;
      db.get(sql, (err, row) => {
        if (err) throw err;
        if (row) {
          console.log(`Jurusan Detail `);
          console.log(`
  id jurusan    : ${row.id_jurusan}
  nama jurusan   : ${row.namajurusan}`);
          menuJurusan()
        } else {
          console.log('Maaf Jurusan yang anda masukan tidak ada, coba lagi !');
          CariJurusan();
        }
      })
    })
  })
}

function TambahJurusan() {
  console.log('lengkapi data di bawah ini :')
  rl.question('Id Jurusan: ', (id_jurusan) => {
    rl.question('Nama Jurusan: ', (namajurusan) => {
      let sql = `INSERT INTO jurusan (id_jurusan, namajurusan) VALUES ('${id_jurusan}', '${namajurusan}')`;
      db.run(sql, (err) => {
        if (err) throw err;
        DaftarJurusan()
      })
    })
  })
}

function HapusJurusan() {
  const sql = 'DELETE FROM jurusan WHERE id_jurusan = ?';
  rl.question('Enter the Id Jurusan to delete:', id_jurusan => {
    db.run(sql, [id_jurusan], (err, row) => {
      if (err) throw err;
      console.log('Deleted successfully');
      DaftarJurusan();
    })
  })
};