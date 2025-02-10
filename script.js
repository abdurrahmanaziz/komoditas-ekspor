// Konfigurasi Supabase
const SUPABASE_URL = "https://tbhqdlrjymbskvdetujr.supabase.co";  // Ganti dengan Project URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaHFkbHJqeW1ic2t2ZGV0dWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzI4NjAsImV4cCI6MjA1NDc0ODg2MH0.dbzFaxxU9DNsgZJg55sEldVBZKxwW-dY7hAa5x7qnw0"; // Ganti dengan API Key
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fungsi untuk mengambil data dari Supabase
async function fetchKomoditas() {
    let { data, error } = await supabase
        .from('komoditas')  // Nama tabel di Supabase
        .select('*');

    if (error) {
        console.error("Error fetching data:", error);
        return;
    }

    displayData(data);
}

// Fungsi untuk menampilkan data di tabel
function displayData(data) {
    const dataContainer = document.getElementById("dataContainer");
    dataContainer.innerHTML = "";

    data.forEach(item => {
        const row = `<tr class="border-b">
                        <td class="py-2 px-6">${item.kabupaten}</td>
                        <td class="py-2 px-6">${item.kecamatan}</td>
                        <td class="py-2 px-6">${item.desa}</td>
                        <td class="py-2 px-6">${item.pangan}</td>
                        <td class="py-2 px-6">${item.non_pangan}</td>
                    </tr>`;
        dataContainer.innerHTML += row;
    });
}

// Jalankan fungsi fetch saat halaman dimuat
fetchKomoditas();
