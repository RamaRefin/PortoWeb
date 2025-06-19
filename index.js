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