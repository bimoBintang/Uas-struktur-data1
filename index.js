// Import input menggunakan readline
const readline = require('readline');

// Deklarasi katagori motor
class Motor {
  constructor(jenis, qty, harga) {
    this.jenis = jenis;
    this.qty = qty;
    this.harga = harga;
  }
}

// Deklarasi katagori pembeli 
class Pembeli {
  constructor(nik, nama, ttl, jenisKelamin, alamat, agama, statusNikah, pekerjaan, kewarganegaraan) {
    this.nik = nik;
    this.nama = nama;
    this.ttl = ttl;
    this.jenisKelamin = jenisKelamin;
    this.alamat = alamat;
    this.agama = agama;
    this.statusNikah = statusNikah;
    this.pekerjaan = pekerjaan;
    this.kewarganegaraan = kewarganegaraan;
  }
}

// Deklarasi katagori penjualan 
class Penjualan {
  constructor() {
    this.modal = 400000000;
    this.motors = [
      new Motor('Revo FI 110', 30, 12500000),
      new Motor('New Supra X 125 FI', 30, 18500000),
      new Motor('New Beat FI', 20, 12000000),
      new Motor('Vega ZR', 10, 13500000),
      new Motor('Jupiter Z', 20, 14000000),
      new Motor('Jupiter MX', 15, 17000000),
      new Motor('Satria FU 150', 10, 19500000),
      new Motor('Shogun R 125', 5, 14000000)
    ];
    this.penjualan = [];
  }

  // Function penjualan 
  tambahPenjualan(pembeli, tglPembelian, jenisMotor, qty) {
    const motor = this.motors.find(m => m.jenis === jenisMotor);
    if (motor && motor.qty >= qty) {
      const totalHarga = motor.harga * qty;
      const totalKembali = this.modal + totalHarga;
      motor.qty -= qty;
      this.modal += totalHarga;
      this.penjualan.push({
        pembeli,
        tglPembelian,
        jenisMotor,
        qty,
        harga: totalHarga,
        totalKembali: totalKembali
      });
    } else {
      console.log('Motor tidak tersedia atau jumlah tidak mencukupi');
    }
  }

  tampilkanPenjualan() {
    console.log('--------------------------------------------------------------------');
    console.log('| No | Pembeli | Tgl Pembelian | Jenis Motor | Qty | Harga | Total |');
    console.log('--------------------------------------------------------------------');
    this.penjualan.forEach((penjualan, index) => {
      console.log(`| ${index + 1}  | ${penjualan.pembeli.nama}    | ${penjualan.tglPembelian} | ${penjualan.jenisMotor} | ${penjualan.qty} | ${penjualan.harga} | ${penjualan.totalKembali}`);
    });
    console.log('------------------------------------------------------------');
  }
}

// Fungsi untuk meminta input pengguna menggunakan readline
function RequestData(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

async function main() {
  const ptOtomotif = new Penjualan();
  // Buat objek Pembeli berdasarkan input
  const pembeli1 = new Pembeli(nik, nama, ttl, jenisKelamin, alamat, agama, statusNikah, pekerjaan, kewarganegaraan);
  // Input data pembeli
  const nik = await RequestData('Masukkan NIK: ');
  const nama = await RequestData('Masukkan Nama: ');
  const ttl = await RequestData('Masukkan Tanggal Lahir (YYYY-MM-DD): ');
  const jenisKelamin = await RequestData('Masukkan Jenis Kelamin: ');
  const alamat = await RequestData('Masukkan Alamat: ');
  const agama = await RequestData('Masukkan Agama: ');
  const statusNikah = await RequestData('Masukkan Status Pernikahan: ');
  const pekerjaan = await RequestData('Masukkan Pekerjaan: ');
  const kewarganegaraan = await RequestData('Masukkan Kewarganegaraan: ');

  while (true) {
    // Input data penjualan
    const tglPembelian = await RequestData('Masukkan Tanggal Pembelian (YYYY-MM-DD): ');
    const jenisMotor = await RequestData('Masukkan Jenis Motor: ');
    const qty = parseInt(await RequestData('Masukkan Jumlah Motor: '), 10);

    ptOtomotif.tambahPenjualan(pembeli1, tglPembelian, jenisMotor, qty);
    ptOtomotif.tampilkanPenjualan();

    const byk= await RequestData(" Apakah ada mau membeli motor lagi? (Yes/No) :");
    if(byk.toLowerCase() === "No") {
      break;
    } else {
      if(byk.toLowerCase() === "Yes") {
        false;
      }
    }
    break;
  }
}

main();
