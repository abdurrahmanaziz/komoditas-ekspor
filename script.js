// 1. Inisialisasi Supabase
const { createClient } = supabase;

const SUPABASE_URL = "https://tbhqdlrjymbskvdetujr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaHFkbHJqeW1ic2t2ZGV0dWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzI4NjAsImV4cCI6MjA1NDc0ODg2MH0.dbzFaxxU9DNsgZJg55sEldVBZKxwW-dY7hAa5x7qnw0";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Fungsi untuk mengambil data dari Supabase
async function fetchData() {
    try {
        const { data, error } = await supabaseClient.from("komoditas_ekspor").select("*");

        if (error) {
            console.error("Gagal mengambil data:", error);
            document.getElementById("loading-message").innerText = "Gagal mengambil data.";
            return;
        }

        console.log("Data berhasil diambil:", data);
        displayData(data);
    } catch (err) {
        console.error("Terjadi kesalahan:", err);
        document.getElementById("loading-message").innerText = "Terjadi kesalahan saat mengambil data.";
    }
}

// 3. Fungsi untuk menampilkan data di tabel
function displayData(data) {
    const tableBody = document.getElementById("table-body");
    const loadingMessage = document.getElementById("loading-message");

    tableBody.innerHTML = ""; // Kosongkan tabel sebelum menambahkan data baru
    loadingMessage.style.display = "none"; // Sembunyikan pesan loading

    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-gray-500">Tidak ada data.</td></tr>`;
        return;
    }

    data.forEach((item, index) => {
        let row = `
            <tr>
                <td class="border px-4 py-2">${index + 1}</td>
                <td class="border px-4 py-2">${item.kabupaten_kota || "-"}</td>
                <td class="border px-4 py-2">${item.kecamatan || "-"}</td>
                <td class="border px-4 py-2">${item.desa || "-"}</td>
                <td class="border px-4 py-2">${item.komoditas_pangan ? "ADA" : "TIDAK ADA"}</td>
                <td class="border px-4 py-2">${item.komoditas_non_pangan ? "ADA" : "TIDAK ADA"}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 4. Panggil fetchData() saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchData);
