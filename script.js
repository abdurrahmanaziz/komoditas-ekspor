import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Inisialisasi Supabase
const SUPABASE_URL = "https://YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fungsi pencarian
async function cariKomoditas() {
    const kabupaten = document.getElementById("kabupaten").value;
    const kecamatan = document.getElementById("kecamatan").value;
    const desa = document.getElementById("desa").value;

    let query = supabase.from("komoditas_ekspor").select("*");

    if (kabupaten) query = query.eq("kabupaten", kabupaten);
    if (kecamatan) query = query.eq("kecamatan", kecamatan);
    if (desa) query = query.eq("desa", desa);

    const { data, error } = await query;
    
    if (error) {
        console.error("Gagal mengambil data:", error);
        return;
    }

    const hasil = document.getElementById("hasil");
    hasil.innerHTML = ""; // Kosongkan tabel sebelum isi ulang

    data.forEach(item => {
        const row = `
            <tr>
                <td>${item.kabupaten}</td>
                <td>${item.kecamatan}</td>
                <td>${item.desa}</td>
                <td>${item.komoditas_pangan}</td>
                <td>${item.komoditas_non_pangan}</td>
            </tr>
        `;
        hasil.innerHTML += row;
    });
}
