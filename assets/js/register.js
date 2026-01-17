$(document).ready(function () {

  console.log("register.js loaded");

  $('#registerBtn').on('click', function () {

    $('#errorMsg').addClass('d-none');
    $('#successMsg').addClass('d-none');

    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    if (!email || !password) {
      $('#errorMsg')
        .removeClass('d-none')
        .text('Please fill all fields');
      return;
    }

    $.ajax({
      url: 'https://auth-backend-bizp.onrender.com/register.php',
      method: 'POST',
      contentType: 'application/json',   // ✅ REQUIRED
      dataType: 'json',                  // ✅ EXPECT JSON
      data: JSON.stringify({
        email: email,
        password: password
      }),
      success: function (res) {
        console.log(res);

        if (res.status !== 'success') {
          $('#errorMsg')
            .removeClass('d-none')
            .text(res.message || 'Registration failed');
          return;
        }

        $('#successMsg')
          .removeClass('d-none')
          .text(res.message);

        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      },
      error: function () {
        $('#errorMsg')
          .removeClass('d-none')
          .text('Server error. Try again.');
      }
    });

  });

});
