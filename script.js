// Pastikan Supabase sudah dimuat sebelum digunakan
document.addEventListener("DOMContentLoaded", async function () {
    console.log("🚀 Halaman telah dimuat. Supabase siap digunakan!");

    // Inisialisasi Supabase
    const SUPABASE_URL = "https://tbhqdlrjymbskvdetujr.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaHFkbHJqeW1ic2t2ZGV0dWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzI4NjAsImV4cCI6MjA1NDc0ODg2MH0.dbzFaxxU9DNsgZJg55sEldVBZKxwW-dY7hAa5x7qnw0";

    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // Fungsi untuk mengambil data dari tabel tertentu
    async function getData(tableName) {
        try {
            const { data, error } = await supabase.from(tableName).select('*');
            if (error) throw error;
            console.log(`✅ Data dari tabel ${tableName}:`, data);
            return data;
        } catch (err) {
            console.error("❌ Error mengambil data:", err.message);
        }
    }

    // Fungsi untuk menambahkan data ke tabel tertentu
    async function addData(tableName, newData) {
        try {
            const { data, error } = await supabase.from(tableName).insert([newData]);
            if (error) throw error;
            console.log(`✅ Data berhasil ditambahkan ke tabel ${tableName}:`, data);
            return data;
        } catch (err) {
            console.error("❌ Error menambahkan data:", err.message);
        }
    }

    // Fungsi untuk memperbarui data berdasarkan ID
    async function updateData(tableName, id, updatedData) {
        try {
            const { data, error } = await supabase.from(tableName).update(updatedData).eq("id", id);
            if (error) throw error;
            console.log(`✅ Data di tabel ${tableName} berhasil diperbarui:`, data);
            return data;
        } catch (err) {
            console.error("❌ Error memperbarui data:", err.message);
        }
    }

    // Fungsi untuk menghapus data berdasarkan ID
    async function deleteData(tableName, id) {
        try {
            const { data, error } = await supabase.from(tableName).delete().eq("id", id);
            if (error) throw error;
            console.log(`✅ Data di tabel ${tableName} berhasil dihapus:`, data);
            return data;
        } catch (err) {
            console.error("❌ Error menghapus data:", err.message);
        }
    }

    // Contoh penggunaan:
    await getData("users"); // Ambil semua data dari tabel "users"
    
    await addData("users", { 
        name: "John Doe", 
        email: "johndoe@example.com" 
    }); // Tambahkan user baru

    await updateData("users", 1, { 
        name: "Updated Name" 
    }); // Update user dengan id = 1

    await deleteData("users", 2); // Hapus user dengan id = 2
});
