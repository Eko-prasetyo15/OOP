create table mahasiswa(
   id_nim varchar(30) primary key,
   nama varchar (40),
   alamat varchar (90),
   jurusan varchar (30), 
   umur integer,
   foreign key (jurusan) references jurusan (id_jurusan)
);

insert into mahasiswa(id_nim,nama,alamat,jurusan,umur) values ('M001', 'Eko', 'bandung', 'J001',20);
insert into mahasiswa(id_nim,nama,alamat,jurusan,umur) values ('M002', 'Yasa', 'bandung', 'J002',19);
insert into mahasiswa(id_nim,nama,alamat,jurusan,umur) values ('M003', 'Romi', 'bandung', 'J003',18);
insert into mahasiswa(id_nim,nama,alamat,jurusan,umur) values ('M004', 'Asep', 'bandung', 'J004',22);
insert into mahasiswa(id_nim,nama,alamat,jurusan,umur) values ('M005', 'Rajan', 'bandung', 'J002',19);

create table jurusan(
    id_jurusan varchar (30) primary key,
    namajurusan varchar(30)
);
 insert into jurusan (id_jurusan, namajurusan) values ('J001', "informatika");
 insert into jurusan (id_jurusan, namajurusan) values ('J002', "komunikasi");
 insert into jurusan (id_jurusan, namajurusan) values ('J003', "Manajemen");
 insert into jurusan (id_jurusan, namajurusan) values ('J004', "Hukum");


create table dosen(
    id_dosen varchar(30) primary key,
    nama varchar(30)
);
 insert into dosen(id_dosen,nama) values ('DS001','rubi');
 insert into dosen(id_dosen,nama) values ('DS002','Krina');


create table matakuliah(
    id_matakuliah varchar (30) primary key,
    nama varchar (40)
);
 insert into matakuliah(id_matakuliah,nama) values ('MK001','HTML');
 insert into matakuliah(id_matakuliah,nama) values ('MK002','PHP');
 insert into matakuliah(id_matakuliah,nama) values ('MK003','C++');
 insert into matakuliah(id_matakuliah,nama) values ('MK004','javascript');
 insert into matakuliah(id_matakuliah,nama) values ('MK005','Phyton');


create table take(
    id varchar (30) primary key,
    nilai integer,
    id_dosen varchar (30),
    id_matakuliah varchar (30),
    id_nim varchar (30),
    foreign key (id_dosen) references dosen (id_dosen),
    foreign key (id_matakuliah) references matakuliah (id_matakuliah),
    foreign key (id_nim) references mahasiswa (id_nim)
);
 insert into take(id,nilai,id_dosen,id_matakuliah,id_nim) values ('N001',9,'DS002','MK003','0001');
 insert into take(id,nilai,id_dosen,id_matakuliah,id_nim) values ('N002',8,'DS001','MK004','0002');
 insert into take(id,nilai,id_dosen,id_matakuliah,id_nim) values ('N003',9,'DS002','MK002','0003');
 insert into take(id,nilai,id_dosen,id_matakuliah,id_nim) values ('N004',9,'DS001','MK001','0004');

CREATE TABLE login(
    id              INTEGER,         
    username        varchar(10),    
    password        varchar(20),    
    user_role        varchar(20),   
    PRIMARY KEY (id)           
);

 insert into login(id,username,password,user_role) values ('00001','Eko','M001','Admin');
 insert into login(id,username,password,user_role) values ('00002','Yasa','M002','Admin');
 insert into login(id,username,password,user_role) values ('00003','Romi','M003','Admin');
 insert into login(id,username,password,user_role) values ('00004','Asep','M004','Admin');
 insert into login(id,username,password,user_role) values ('00005','Rajan','M005','Admin');
-- menampilkan table nama jurusan
SELECT 
   id_nim,
   nama,
   alamat,
   namajurusan
FROM
   mahasiswa , jurusan
WHERE
   mahasiswa.jurusan = jurusan.id_jurusan;

-- menampilkan data umur di bawah 20th
SELECT 
   id_nim,
   nama,
   alamat,
   jurusan
FROM
   mahasiswa
WHERE
   umur < 20

-- menambah column baru 
ALTER TABLE MAHASISWA ADD UMUR INTEGER;
 
--  update nilai mahasiswa
UPDATE take SET nilai = 'A' WHERE ID ="N001";
UPDATE take SET nilai = 'B' WHERE ID ="N002";
UPDATE take SET nilai = 'A' WHERE ID ="N003";
UPDATE take SET nilai = 'C' WHERE ID ="N004";

-- menampilkan nilai di atas B
SELECT 
   id,
   nilai,
   id_dosen,
   id_matakuliah,
   id_nim
FROM
   take
WHERE
   nilai >= 'B'
 insert into login(id,username,password,user_role) values ('00001','Eko','M001','Admin');
 insert into login(id,username,password,user_role) values ('00002','Yasa','M002','Admin');
 insert into login(id,username,password,user_role) values ('00003','Romi','M003','Admin');
 insert into login(id,username,password,user_role) values ('00004','Asep','M004','Admin');
 insert into login(id,username,password,user_role) values ('00005','Rajan','M005','Admin');