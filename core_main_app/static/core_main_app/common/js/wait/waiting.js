(function() {
    if (!document.getElementById('loading-overlay')) {
        var div = document.createElement('div');
        div.id = 'loading-overlay';
        div.innerHTML = `
            <div class="loading-box">
                <div class="loader">
                    <svg class="spin" width="40" height="40" viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20" stroke="#066" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="90 126" stroke-dashoffset="0"></circle>
                    </svg>
                </div>
                <div class="loading-text">
                    Downloading, please wait...
                </div>
            </div>`;
        document.body.insertBefore(div, document.body.firstChild);
    }
})();

window.showLoading = function(msg) {
   var overlay = document.getElementById('loading-overlay');
   overlay.style.display = 'flex';
   if (msg) overlay.querySelector('div > div:last-child').textContent = msg;
};
window.hideLoading = function() {
   document.getElementById('loading-overlay').style.display = 'none';
};
