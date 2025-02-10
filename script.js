// Koneksi ke Supabase
const SUPABASE_URL = "https://tbhqdlrjymbskvdetujr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaHFkbHJqeW1ic2t2ZGV0dWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzI4NjAsImV4cCI6MjA1NDc0ODg2MH0.dbzFaxxU9DNsgZJg55sEldVBZKxwW-dY7hAa5x7qnw0";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fungsi untuk mengambil data dari Supabase
async function fetchData() {
  const { data, error } = await supabase
    .from('komoditas_ekspor')
    .select('kabupaten, kecamatan, desa, komoditas_pangan, komoditas_non_pangan');

  if (error) {
    console.error('Error mengambil data:', error);
    return;
  }

  // Ambil elemen tabel di HTML
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = ''; // Kosongkan sebelum menambah data baru

  // Looping data dan tambahkan ke tabel
  data.forEach((row, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${row.kabupaten || '-'}</td>
        <td>${row.kecamatan}</td>
        <td>${row.desa}</td>
        <td>${row.komoditas_pangan}</td>
        <td>${row.komoditas_non_pangan}</td>
      </tr>
    `;
  });
}

// Panggil fungsi fetchData() saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchData);
