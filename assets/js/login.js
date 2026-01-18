$(document).ready(function () {

    $('#loginBtn').click(function () {

        $('#errorMsg').addClass('d-none');

        const email = $('#email').val();
        const password = $('#password').val();

        if (!email || !password) {
            $('#errorMsg').removeClass('d-none').text('Please fill all fields');
            return;
        }

        $.ajax({
            url: 'https://auth-system-backend-production-4178.up.railway.app/login.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function (res) {

                if (res.status !== 'success') {
                    $('#errorMsg').removeClass('d-none').text(res.message);
                    return;
                }

                // Save session
                localStorage.setItem('session_id', res.session_id);

                // Redirect
                window.location.href = 'profile.html';
            },
            error: function () {
                $('#errorMsg').removeClass('d-none').text('Login failed');
            }
        });
    });

});
