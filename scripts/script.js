const orderForm = document.getElementById("orderForm");
const orderTableBody = document.querySelector("#orderTable tbody");

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const nim = document.getElementById("nim").value.trim();
  const mataKuliah = document.getElementById("mataKuliah").value;
  const jumlah = document.getElementById("jumlah").value.trim();

  if (!nama || !nim || !mataKuliah || jumlah <= 0) {
    showPopup("Pesanan berhasil disimpan!", "success");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${nama}</td>
    <td>${nim}</td>
    <td>${document.querySelector(`#mataKuliah option[value="${mataKuliah}"]`).textContent}</td>
    <td>${jumlah}</td>
    <td><button class="delete-btn">Hapus</button></td>
  `;

  orderTableBody.appendChild(row);

  showPopup("Pesanan berhasil ditambahkan!", "success");
  orderForm.reset();
});

orderTableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    showConfirm("Apakah Anda yakin ingin menghapus data ini?", (confirmed) => {
      if (confirmed) {
        e.target.parentElement.parentElement.remove();
        showPopup("Data berhasil dihapus", "success");
      }
    });
  }
});



function showConfirm(message, callback) {
  // Buat elemen popup
  const popup = document.createElement("div");
  popup.className = "confirm-popup";
  popup.innerHTML = `
    <div class="confirm-box">
      <h3>${message}</h3>
      <div class="confirm-buttons">
        <button class="confirm-btn confirm-yes">Ya</button>
        <button class="confirm-btn confirm-no">Batal</button>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  // Tombol Ya
  popup.querySelector(".confirm-yes").addEventListener("click", () => {
    callback(true);
    popup.remove();
  });

  // Tombol Batal
  popup.querySelector(".confirm-no").addEventListener("click", () => {
    callback(false);
    popup.remove();
  });
}


function showPopup(message, type = "success") {
  const popup = document.createElement("div");
  popup.className = `popup ${type}`;

  const icon =
    type === "success"
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#10b981"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#ef4444"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`;

  popup.innerHTML = `${icon}<span>${message}</span>`;
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 2600);
}