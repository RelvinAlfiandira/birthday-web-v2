// data target ucapan
const nama = "Silfa Dewi Aryanti";
const umur = 22;

// konten surat ucapan
const surat = {
  judul: `Happy Birthday, ${nama}!`,
  isi: "Selamat ulang tahun! Semoga di usia baru ini makin sukses, sehat selalu, dan semua impianmu tercapai. Tetap jadi pribadi yang ceria dan menginspirasi!",
  footer: "I wish you all the best on your special day!"
};

// galeri foto 
const foto = [
"https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
"https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
];

// export utama
export const ucapanData = {
    nama,
    umur,
    // TARGET DATE DENGAN FORMAT YYYY/MM/DDTH/MM/SS
    targetDate: "2027-08-26T12:27:00",
    pin: "080808",

    surat,
    foto,
    musikUrl: "/music/Bruno_Mars-Risk_It_All.mp3",
};