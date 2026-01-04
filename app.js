function login() {
  const user = username.value;
  const pass = password.value;
  if (!user || !pass) return alert('Isi semua field');
  if (user === 'marcello888' && pass === 'cello888') {
    localStorage.setItem('login', true);
    location.href = 'index.html';
  } else alert('Login gagal');
}

function logout() {
  localStorage.removeItem('login');
  location.href = 'login.html';
}

function tambahTransaksi() {
  const mobil = document.getElementById('mobil').value;
  const harga = document.getElementById('harga').value;
  const hari = document.getElementById('hari').value;
  if (!mobil || !harga || !hari) return alert('Lengkapi data');
  const total = harga * hari;
  const data = JSON.parse(localStorage.getItem('transaksi')) || [];
  data.push({ mobil, harga, hari, total });
  localStorage.setItem('transaksi', JSON.stringify(data));
  location.href = 'daftar_transaksi.html';
}

window.onload = () => {
  if (!localStorage.getItem('login') && !location.pathname.includes('login')) {
    location.href = 'login.html';
  }
  const list = document.getElementById('list');
  if (list) {
    (JSON.parse(localStorage.getItem('transaksi')) || []).forEach(t => {
      list.innerHTML += `<tr>
        <td>${t.mobil}</td>
        <td>Rp ${t.harga}</td>
        <td>${t.hari}</td>
        <td>Rp ${t.total}</td>
      </tr>`;
    });
  }
};
/* ===== FORMAT RUPIAH SAAT DIKETIK ===== */
function formatRupiah(input) {
  let value = input.value.replace(/[^,\d]/g, "");
  let split = value.split(",");
  let sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  input.value = rupiah ? "Rp " + rupiah : "";
}

/* ===== SIMPAN TRANSAKSI ===== */
function tambahTransaksi() {
  const mobil = document.getElementById("mobil").value;
  const hargaInput = document.getElementById("harga").value;
  const hari = document.getElementById("hari").value;

  if (!mobil || !hargaInput || !hari) {
    alert("Semua data wajib diisi!");
    return;
  }

  // Ambil angka asli (hapus Rp dan titik)
  const harga = parseInt(hargaInput.replace(/[^0-9]/g, ""));
  const total = harga * hari;

  let data = JSON.parse(localStorage.getItem("transaksi")) || [];
  data.push({ mobil, harga, hari, total });
  localStorage.setItem("transaksi", JSON.stringify(data));

  window.location.href = "daftar_transaksi.html";
}

/* ===== LOGOUT ===== */
function logout() {
  localStorage.removeItem("login");
  window.location.href = "login.html";
}

/* ===== FORMAT RUPIAH UNTUK TABEL ===== */
function rupiah(angka) {
  return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* ===== TAMPILKAN DAFTAR TRANSAKSI ===== */
window.onload = function () {
  const list = document.getElementById("list");
  if (list) {
    const data = JSON.parse(localStorage.getItem("transaksi")) || [];
    data.forEach(t => {
      list.innerHTML += `
        <tr>
          <td>${t.mobil}</td>
          <td>${rupiah(t.harga)}</td>
          <td>${t.hari}</td>
          <td>${rupiah(t.total)}</td>
        </tr>
      `;
    });
  }
};
