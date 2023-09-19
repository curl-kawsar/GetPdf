document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const fileLabel = document.querySelector('.file-label');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('assignment', fileInput.files[0]);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageDiv.textContent = 'Assignment uploaded successfully.';
                messageDiv.style.color = '#28a745';
            } else {
                messageDiv.textContent = 'Error uploading assignment.';
                messageDiv.style.color = '#dc3545';
            }
            messageDiv.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'An error occurred: ' + error.message;
            messageDiv.style.color = '#dc3545';
            messageDiv.classList.remove('hidden');
        });
    });

    
    fileInput.addEventListener('change', function () {
        if (fileInput.files.length > 0) {
            fileLabel.textContent = fileInput.files[0].name;
        } else {
            fileLabel.textContent = 'Choose a PDF file';
        }
    });
});
