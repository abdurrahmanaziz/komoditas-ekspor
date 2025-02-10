// 1. Hubungkan ke Supabase
const SUPABASE_URL = "https://tbhqdlrjymbskvdetujr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaHFkbHJqeW1ic2t2ZGV0dWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzI4NjAsImV4cCI6MjA1NDc0ODg2MH0.dbzFaxxU9DNsgZJg55sEldVBZKxwW-dY7hAa5x7qnw0";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Ambil data dari tabel "komoditas_ekspor"
async function fetchData() {
    try {
        let { data, error } = await supabase.from("komoditas_ekspor").select("*");

        if (error) {
            console.error("Gagal mengambil data:", error);
            return;
        }

        console.log("Data berhasil diambil:", data);
        displayData(data);
    } catch (err) {
        console.error("Terjadi kesalahan:", err);
    }
}

// 3. Tampilkan data ke dalam tabel HTML
function displayData(data) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Kosongkan tabel sebelum menambahkan data baru

    data.forEach((item, index) => {
        let row = `
            <tr>
                <td class="border px-4 py-2">${index + 1}</td>
                <td class="border px-4 py-2">${item.kabupaten_kota}</td>
                <td class="border px-4 py-2">${item.kecamatan}</td>
                <td class="border px-4 py-2">${item.desa}</td>
                <td class="border px-4 py-2">${item.komoditas_pangan ? "ADA" : "TIDAK ADA"}</td>
                <td class="border px-4 py-2">${item.komoditas_non_pangan ? "ADA" : "TIDAK ADA"}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 4. Panggil fetchData() saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchData);
