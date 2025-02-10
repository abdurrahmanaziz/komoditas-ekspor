// Data Dummy (Nanti bisa diganti dengan data dari database)
const komoditas = [
    { kabupaten: "Malang", kecamatan: "Dau", desa: "Landungsari", pangan: "Kopi", nonPangan: "Kayu Manis" },
    { kabupaten: "Surabaya", kecamatan: "Gubeng", desa: "Kertajaya", pangan: "Padi", nonPangan: "Rotan" },
    { kabupaten: "Bandung", kecamatan: "Cidadap", desa: "Sukajadi", pangan: "Teh", nonPangan: "Karet" }
];

const searchInput = document.getElementById("searchInput");
const dataContainer = document.getElementById("dataContainer");

// Fungsi untuk menampilkan data di tabel
function displayData(data) {
    dataContainer.innerHTML = "";
    data.forEach(item => {
        const row = `<tr class="border-b">
                        <td class="py-2 px-6">${item.kabupaten}</td>
                        <td class="py-2 px-6">${item.kecamatan}</td>
                        <td class="py-2 px-6">${item.desa}</td>
                        <td class="py-2 px-6">${item.pangan}</td>
                        <td class="py-2 px-6">${item.nonPangan}</td>
                    </tr>`;
        dataContainer.innerHTML += row;
    });
}

// Menampilkan semua data saat halaman dimuat
displayData(komoditas);

// Fungsi pencarian
searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filteredData = komoditas.filter(item =>
        item.kabupaten.toLowerCase().includes(query)
    );
    displayData(filteredData);
});
