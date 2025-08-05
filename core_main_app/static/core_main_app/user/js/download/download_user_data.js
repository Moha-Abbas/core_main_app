    document.addEventListener('DOMContentLoaded', function() {
        const user_id = 1;
    document.querySelector('#downloaduserdata').addEventListener('click', function(event) {
        alert("clicked");
        event.preventDefault();
        if (!user_id) {
            alert("Error in extraction, please reload the page.");
            return;
        }
        const table = document.getElementById('data_table');
        if (!table) {
            alert("No Data to download.");
            return;
        }
        const tbody = table.querySelector('tbody');
        if (!tbody) {
            alert("No Data to download.");
            return;
        }
        const rows = tbody.querySelectorAll('tr[objectid]');
        if (rows.length === 0) {
            alert("No Data to download.");
            return;
        }
        const payload = { 
              user_id: user_id
          };
        showLoading();
        fetch('/download-from-user-data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                 hideLoading();
                return response.text().then(text => {
                    throw new Error(text || 'Network response was not ok');
                });
            }
             hideLoading();
            return response.blob().then(blob => {
                const disposition = response.headers.get('Content-Disposition');
                let filename = 'downloaded_file';
                if (disposition && disposition.indexOf('filename=') !== -1) {
                    filename = disposition.split('filename=')[1].split(';')[0].replace(/"/g, '');
                }

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            });
        })
        .catch(error => {
             hideLoading();
            alert("Internal Error");
            console.log("Download failed:", error.message);
        });
    });
});

