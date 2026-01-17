$(document).ready(function () {

    const sessionId = localStorage.getItem('session_id');

    if (!sessionId) {
        window.location.href = 'login.html';
        return;
    }

    /* ======================
       HELPER: LOCK / UNLOCK FIELDS
    ====================== */
    function setEditable(editable) {
        $('#name, #phone, #age, #city, #bio').prop('disabled', !editable);
        $('#saveBtn').prop('disabled', !editable);
    }

    // Default state → view only
    setEditable(false);
    $('#successMsg').addClass('d-none');

    /* ======================
       LOAD PROFILE
    ====================== */
    $.ajax({
        url: 'https://auth-backend-bizp.onrender.com/profile.php',
        method: 'GET',
        headers: {
            'Session-Id': sessionId
        },
        dataType: 'json',
        success: function (res) {

            if (res.status !== 'success') {
                window.location.href = 'login.html';
                return;
            }

            $('#name').val(res.profile.name || '');
            $('#email').val(res.profile.email).prop('disabled', true);
            $('#phone').val(res.profile.phone || '');
            $('#age').val(res.profile.age || '');
            $('#city').val(res.profile.city || '');
            $('#bio').val(res.profile.bio || '');
        },
        error: function () {
            alert('Failed to load profile');
        }
    });

    /* ======================
       EDIT PROFILE
    ====================== */
    $('#editBtn').click(function () {
        setEditable(true);
        $('#successMsg').addClass('d-none');
    });

    /* ======================
       SAVE PROFILE
    ====================== */
    $('#saveBtn').click(function () {

        const data = {
            name: $('#name').val(),
            phone: $('#phone').val(),
            age: $('#age').val(),
            city: $('#city').val(),
            bio: $('#bio').val()
        };

        $.ajax({
            url: '../backend/profile.php',
            method: 'POST',
            headers: {
                'Session-Id': sessionId
            },
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function () {

                // Show success message
                $('#successMsg')
                    .removeClass('d-none')
                    .text('Profile updated successfully');

                // Lock fields again
                setEditable(false);

                // Auto-hide message
                setTimeout(function () {
                    $('#successMsg').addClass('d-none');
                }, 3000);
            },
            error: function () {
                alert('Profile update failed');
            }
        });
    });

    /* ======================
       LOGOUT
    ====================== */
    $('#logoutBtn').click(function () {
        localStorage.removeItem('session_id');
        window.location.href = 'login.html';
    });

});
