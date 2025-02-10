// Inisialisasi Supabase sebelum digunakan
const { createClient } = supabase;

const supabaseUrl = "https://tbhqdlrjymbskvdetujr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaHFkbHJqeW1ic2t2ZGV0dWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzI4NjAsImV4cCI6MjA1NDc0ODg2MH0.dbzFaxxU9DNsgZJg55sEldVBZKxwW-dY7hAa5x7qnw0";

// Buat instance Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchData() {
    const tableBody = document.getElementById("table-body");
    const loadingMessage = document.getElementById("loading-message");

    try {
        const { data, error } = await supabase.from("komoditas_ekspor").select("*");

        console.log("Data dari Supabase:", data);
        console.log("Error jika ada:", error);

        if (error) {
            loadingMessage.textContent = "Gagal mengambil data.";
            return;
        }

        tableBody.innerHTML = "";
        data.forEach((row, index) => {
            tableBody.innerHTML += `
                <tr class="border">
                    <td class="border px-4 py-2 text-center">${index + 1}</td>
                    <td class="border px-4 py-2">${row.kabupaten || "-"}</td>
                    <td class="border px-4 py-2">${row.kecamatan}</td>
                    <td class="border px-4 py-2">${row.desa}</td>
                    <td class="border px-4 py-2 text-center">${row.komoditas_pangan}</td>
                    <td class="border px-4 py-2 text-center">${row.komoditas_non_pangan}</td>
                </tr>
            `;
        });

        loadingMessage.style.display = "none";
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        loadingMessage.textContent = "Terjadi kesalahan saat mengambil data.";
    }
}

// Panggil fungsi fetchData setelah halaman dimuat
document.addEventListener("DOMContentLoaded", fetchData);
