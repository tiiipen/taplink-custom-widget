document.addEventListener("DOMContentLoaded", function () {
    // 1. Hide Menu Page
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
        document.head.appendChild(style);
    }

    // 2. Custom Widget Resizer
    (function() {
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
    })();
});
