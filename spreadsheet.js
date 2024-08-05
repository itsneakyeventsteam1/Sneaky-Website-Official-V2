const scriptURL = 'https://script.google.com/macros/s/AKfycby_yLGqeuo3EmPMADNMOEpiswsoW2KhfdDIxs8qKTGN2fCXMkBmCGsBJ1X3BGCO9dE/exec';
const ticketURL = 'https://script.google.com/macros/s/AKfycbxAQPF8rrAikYrEmTchYxk32BB1vGSbNvwwtTNkKG0J4gqyxAlLRL-Vyl4-jqcaZ8K3/exec';

const valorantForm = document.forms['reg-form'];
const mlbbForm = document.forms['reg-form-2'];
const ticketForm = document.forms['ticket-form'];

const loadingOverlay1 = document.getElementById('loader-1');
const loadingOverlay2 = document.getElementById('loader-2');
const loadingOverlay3 = document.getElementById('loader-3');

valorantForm.addEventListener('submit', e => handleSubmit(e, valorantForm, loadingOverlay1));
mlbbForm.addEventListener('submit', e => handleSubmit(e, mlbbForm, loadingOverlay2));
ticketForm.addEventListener('submit', e => handleSubmit(e, ticketForm, loadingOverlay3));

function handleSubmit(event, form, loadingOverlay) {
    event.preventDefault();
    loadingOverlay.style.display = 'block';
    submitForm(form.getAttribute('action'), form, loadingOverlay);
}

function submitForm(scriptURL, form, loadingOverlay) {
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        if (scriptURL === ticketURL) {
            return { success: true }; 
        }
        return response.json();
    })
    .then(data => {
        loadingOverlay.style.display = 'none';
        if (scriptURL === ticketURL) {
            Swal.fire({
                icon: 'success',
                title: 'Check Your Email',
                text: 'Thank you for submitting the form. Please take a screenshot as you submit the form for proof that you have availed the ticket, and do check the confirmation email.',
                confirmButtonColor: '#db4d4d'
            }).then(() => {
                window.location.reload();
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Check Your Email',
                text: 'Thank you for submitting the form. Please take a screenshot as you submit the form for proof that you have submitted a registration, and do check the confirmation email.'
            }).then(() => {
                window.location.reload();
            });
        }
        console.log(data);
    })
    .catch(error => {
        loadingOverlay.style.display = 'none';
        if (scriptURL === ticketURL) {
            console.error('Error with ticket submission!', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Take A Screenshot',
                text: 'If there\'s a problem submitting the form, please check your internet connection or contact us.'
            }).then(() => {
                window.location.reload();
            });
        } else {
            console.error('Error with form submission!', error.message);
            Swal.fire({
                icon: 'success',
                title: 'Check Your Email',
                text: 'Thank you for submitting the form. Please take a screenshot as you submit the form for proof that you have submitted a registration, and do check the confirmation email.'
            }).then(() => {
                window.location.reload();
            });
        }
    });
}