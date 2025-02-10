// Pastikan Supabase sudah dimuat sebelum digunakan
document.addEventListener("DOMContentLoaded", async function () {
    console.log("🚀 Halaman telah dimuat. Supabase siap digunakan!");

    // Inisialisasi Supabase
    const SUPABASE_URL = "https://tbhqdlrjymbskvdetujr.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaHFkbHJqeW1ic2t2ZGV0dWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzI4NjAsImV4cCI6MjA1NDc0ODg2MH0.dbzFaxxU9DNsgZJg55sEldVBZKxwW-dY7hAa5x7qnw0";

    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // Fungsi untuk mengambil data dari tabel komoditas_ekspor
    async function getData() {
        try {
            const { data, error } = await supabase.from("komoditas_ekspor").select('*');
            if (error) throw error;
            console.log("✅ Data dari tabel komoditas_ekspor:", data);
            return data;
        } catch (err) {
            console.error("❌ Error mengambil data:", err.message);
        }
    }

    // Fungsi untuk menambahkan data ke tabel komoditas_ekspor
    async function addData(newData) {
        try {
            const { data, error } = await supabase.from("komoditas_ekspor").insert([newData]);
            if (error) throw error;
            console.log("✅ Data berhasil ditambahkan ke tabel komoditas_ekspor:", data);
            return data;
        } catch (err) {
            console.error("❌ Error menambahkan data:", err.message);
        }
    }

    // Fungsi untuk memperbarui data berdasarkan ID di tabel komoditas_ekspor
    async function updateData(id, updatedData) {
        try {
            const { data, error } = await supabase.from("komoditas_ekspor").update(updatedData).eq("id", id);
            if (error) throw error;
            console.log("✅ Data di tabel komoditas_ekspor berhasil diperbarui:", data);
            return data;
        } catch (err) {
            console.error("❌ Error memperbarui data:", err.message);
        }
    }

    // Fungsi untuk menghapus data berdasarkan ID di tabel komoditas_ekspor
    async function deleteData(id) {
        try {
            const { data, error } = await supabase.from("komoditas_ekspor").delete().eq("id", id);
            if (error) throw error;
            console.log("✅ Data di tabel komoditas_ekspor berhasil dihapus:", data);
            return data;
        } catch (err) {
            console.error("❌ Error menghapus data:", err.message);
        }
    }

    // Contoh penggunaan:
    await getData(); // Ambil semua data dari tabel komoditas_ekspor
    
    await addData({ 
        nama_komoditas: "Kopi Arabika", 
        negara_tujuan: "Jepang", 
        volume: 500, 
        satuan: "Kg" 
    }); // Tambahkan data baru

    await updateData(1, { 
        volume: 600 
    }); // Update data dengan id = 1

    await deleteData(2); // Hapus data dengan id = 2
});
