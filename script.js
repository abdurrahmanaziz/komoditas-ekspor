// Koneksi ke Supabase
const SUPABASE_URL = "https://tbhqdlrjymbskvdetujr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaHFkbHJqeW1ic2t2ZGV0dWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzI4NjAsImV4cCI6MjA1NDc0ODg2MH0.dbzFaxxU9DNsgZJg55sEldVBZKxwW-dY7hAa5x7qnw0";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Ambil data dari tabel `komoditas_ekspor`
async function fetchData() {
    let { data, error } = await supabase.from('komoditas_ekspor').select('*');
    if (error) {
        console.error("Gagal mengambil data:", error);
        return;
    }
    displayData(data);
}

// Tampilkan data dalam tabel
function displayData(data) {
    const tableBody = document.getElementById("dataContainer");
    tableBody.innerHTML = "";
    
    data.forEach(item => {
        let row = `<tr>
            <td class="py-2 px-6 border">${item.kabupaten}</td>
            <td class="py-2 px-6 border">${item.kecamatan}</td>
            <td class="py-2 px-6 border">${item.desa}</td>
            <td class="py-2 px-6 border">${item.komoditas_pangan}</td>
            <td class="py-2 px-6 border">${item.komoditas_non_pangan}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Fitur pencarian data
document.getElementById("searchInput").addEventListener("input", function() {
    let searchValue = this.value.toLowerCase();
    let rows = document.querySelectorAll("#dataContainer tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(searchValue) ? "" : "none";
    });
});

// Form Tambah Data ke tabel `komoditas_ekspor`
document.getElementById("addDataForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let newData = {
        kabupaten: document.getElementById("kabupaten").value,
        kecamatan: document.getElementById("kecamatan").value,
        desa: document.getElementById("desa").value,
        komoditas_pangan: document.getElementById("komoditasPangan").value,
        komoditas_non_pangan: document.getElementById("komoditasNonPangan").value
    };

    let { data, error } = await supabase.from('komoditas_ekspor').insert([newData]);

    if (error) {
        console.error("Gagal menambahkan data:", error);
        alert("Gagal menambahkan data!");
    } else {
        alert("Data berhasil ditambahkan!");
        fetchData();
    }

    this.reset();
});

// Panggil fetchData saat halaman dimuat
fetchData();
