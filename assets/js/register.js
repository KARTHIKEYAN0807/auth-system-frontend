$(document).ready(function () {

    $('#registerBtn').click(function () {

        $('#errorMsg').addClass('d-none');
        $('#successMsg').addClass('d-none');

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        if (!email || !password) {
            $('#errorMsg').removeClass('d-none').text('Please fill all fields');
            return;
        }

        $.ajax({
            url: 'https://auth-backend-bizp.onrender.com/register.php',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json', // 🔥 IMPORTANT
            data: JSON.stringify({ email, password }),
            success: function (res) {

                if (res.status !== 'success') {
                    $('#errorMsg').removeClass('d-none').text(res.message);
                    return;
                }

                $('#successMsg')
                    .removeClass('d-none')
                    .text('Registration successful. You can login now.');

                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            },
            error: function () {
                $('#errorMsg').removeClass('d-none').text('Registration failed');
            }
        });
    });

});
