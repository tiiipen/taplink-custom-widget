(function() {
    // Kita bungkus semua logic dalam satu fungsi "main"
    function runMainScript() {
        console.log("Taplink Custom Script Loaded & Running..."); // Debugging marker

        // --- 1. Logic Hide Menu Page ---
        const path = window.location.pathname;
        if (path.includes("/p/masterclass")) {
            const style = document.createElement("style");
            style.innerHTML = `
                .menu-block-container,
                .menu-block-container.is-fixed,
                .menu-placement-widget {
                    display: none !important;
                }
            `;
            // Pastikan head ada, kalau tidak append ke body
            (document.head || document.body).appendChild(style);
        }

        // --- 2. Logic Custom Widget Resizer ---
        var WIDGET_IDS = [
            'marketplace-calculator-widget',
            'jastip-calculator-widget'
        ];
        var HEIGHT_BUFFER = 5;

        window.addEventListener('message', function(event) {
            var data = event.data;
            if (!data || !data.frameId || !data.height) return;

            if (WIDGET_IDS.indexOf(data.frameId) !== -1) {
                var iframe = document.getElementById(data.frameId);
                if (iframe) {
                    var newHeight = (parseInt(data.height) + HEIGHT_BUFFER) + 'px';
                    if (iframe.style.height !== newHeight) {
                        iframe.style.height = newHeight;
                    }
                }
            }
        });
    }

    // --- FIX TIMING DISINI ---
    // Cek status dokumen saat script ini sampai
    if (document.readyState === "loading") {
        // Jika script sampai DULUAN sebelum website siap, kita tunggu.
        document.addEventListener("DOMContentLoaded", runMainScript);
    } else {
        // Jika script sampai TERLAMBAT (website sudah siap), langsung jalankan!
        runMainScript();
    }
})();
