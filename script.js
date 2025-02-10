// Pastikan Supabase tersedia sebelum digunakan
document.addEventListener("DOMContentLoaded", async function () {
    // Impor Supabase
    const { createClient } = supabase;

    // Inisialisasi Supabase
    const SUPABASE_URL = "https://tbhqdlrjymbskvdetujr.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaHFkbHJqeW1ic2t2ZGV0dWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzI4NjAsImV4cCI6MjA1NDc0ODg2MH0.dbzFaxxU9DNsgZJg55sEldVBZKxwW-dY7hAa5x7qnw0";
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Fungsi untuk mengambil data komoditas ekspor
    async function fetchData() {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">Mengambil data...</td></tr>`;

        try {
            let { data, error } = await supabase.from("komoditas_ekspor").select("*");

            if (error) {
                console.error("Error mengambil data:", error.message);
                tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-red-500">Gagal mengambil data.</td></tr>`;
                return;
            }

            if (data.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">Tidak ada data.</td></tr>`;
                return;
            }

            tableBody.innerHTML = "";
            data.forEach((item, index) => {
                tableBody.innerHTML += `
                    <tr>
                        <td class="border px-4 py-2">${index + 1}</td>
                        <td class="border px-4 py-2">${item.kabupaten || "-"}</td>
                        <td class="border px-4 py-2">${item.kecamatan || "-"}</td>
                        <td class="border px-4 py-2">${item.desa || "-"}</td>
                        <td class="border px-4 py-2">${item.komoditas_pangan || "-"}</td>
                        <td class="border px-4 py-2">${item.komoditas_non_pangan || "-"}</td>
                    </tr>
                `;
            });

        } catch (err) {
            console.error("Terjadi kesalahan:", err);
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-red-500">Kesalahan dalam mengambil data.</td></tr>`;
        }
    }

    // Panggil fungsi saat halaman dimuat
    fetchData();
});
