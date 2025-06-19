document.addEventListener('DOMContentLoaded', function() {
    
    const heroBackground = document.querySelector('.hero-background');

    // Cek jika elemennya ada untuk menghindari error
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            let scrollPosition = window.scrollY;

            // Atur kecepatan zoom dengan mengubah angka pembagi (misal: 2000)
            // Semakin besar angkanya, semakin lambat efek zoom-nya.
            let scaleValue = 1 + scrollPosition / 2000;

            // Terapkan transform scale ke gambar background
            heroBackground.style.transform = `scale(${scaleValue})`;
        });
    }
});


// Kode JavaScript untuk mengirim data form ke Google Sheets
// Dibuat oleh Gemini untuk Rama

// GANTI DENGAN URL WEB APP KAMU YANG DIDAPAT DARI LANGKAH 1
// Hapus baris ini, karena kita tidak pakai div status lagi
// const formStatus = document.getElementById('form-status');

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbweEGUxqBckzGpMSGhn1hZKlLMjtKEKJmkJjUpIdKK8G1JhAdSPXVvsEsvavaXHv0A0AA/exec';
const form = document.getElementById('contact-form');
const submitButton = form.querySelector('input[type="submit"]');

form.addEventListener('submit', function(e) {
  e.preventDefault(); 
  
  // Matikan tombol dan ubah teksnya
  submitButton.disabled = true;
  submitButton.value = "SENDING...";

  fetch(SCRIPT_URL, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      // Tampilkan notifikasi SUKSES dengan SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Terkirim!',
        text: 'Pesanmu sudah berhasil diterima. Terima kasih!',
        showConfirmButton: false, // Tombol OK tidak perlu
        timer: 2500 // Notifikasi hilang setelah 2.5 detik
      });
      form.reset();
    } else {
      throw new Error(data.message || 'Terjadi kesalahan.');
    }
  })
  .catch(error => {
    // Tampilkan notifikasi ERROR dengan SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Terjadi kesalahan saat mengirim pesan. Coba lagi nanti.'
    });
    console.error('Error!', error.message);
  })
  .finally(() => {
    // Apapun hasilnya, kembalikan tombol ke kondisi semula
    submitButton.disabled = false;
    submitButton.value = "SUBMIT";
  });
});