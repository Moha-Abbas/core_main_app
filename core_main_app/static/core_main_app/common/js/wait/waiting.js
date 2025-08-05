window.showLoading = function(msg) {
   var overlay = document.getElementById('loading-overlay');
   overlay.style.display = 'flex';
   if (msg) overlay.querySelector('div > div:last-child').textContent = msg;
};
window.hideLoading = function() {
   document.getElementById('loading-overlay').style.display = 'none';
};
