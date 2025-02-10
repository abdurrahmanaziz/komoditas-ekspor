// Pastikan Supabase SDK sudah dimuat lebih dulu di HTML
const { createClient } = supabase;

// Inisialisasi Supabase
const supabaseUrl = "https://tbhqdlrjymbskvdetujr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaHFkbHJqeW1ic2t2ZGV0dWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzI4NjAsImV4cCI6MjA1NDc0ODg2MH0.dbzFaxxU9DNsgZJg55sEldVBZKxwW-dY7hAa5x7qnw0";

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Supabase berhasil diinisialisasi:", supabase);

// Fungsi untuk mengambil data dari Supabase
async function fetchData() {
    try {
        const tableBody = document.getElementById("data-table");

        // Panggil data dari tabel "komoditas_ekspor"
        const { data, error } = await supabase.from("komoditas_ekspor").select("*");

        if (error) throw error;

        // Kosongkan isi tabel sebelum memasukkan data baru
        tableBody.innerHTML = "";

        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center p-4">Tidak ada data</td></tr>`;
            return;
        }

        // Loop data dan masukkan ke dalam tabel
        data.forEach((item, index) => {
            const row = `
                <tr>
                    <td class="border border-gray-300 p-2 text-center">${index + 1}</td>
                    <td class="border border-gray-300 p-2">${item.kabupaten || "-"}</td>
                    <td class="border border-gray-300 p-2">${item.kecamatan || "-"}</td>
                    <td class="border border-gray-300 p-2">${item.desa || "-"}</td>
                    <td class="border border-gray-300 p-2">${item.komoditas_pangan || "-"}</td>
                    <td class="border border-gray-300 p-2">${item.komoditas_non_pangan || "-"}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        console.log("✅ Data berhasil diambil:", data);

    } catch (err) {
        console.error("❌ Terjadi kesalahan saat mengambil data:", err);
        document.getElementById("data-table").innerHTML = `<tr><td colspan="6" class="text-center p-4 text-red-500">Gagal mengambil data</td></tr>`;
    }
}

// Jalankan fungsi fetchData setelah DOM selesai dimuat
document.addEventListener("DOMContentLoaded", fetchData);
