$(document).ready(function () {

    const API_BASE = 'https://auth-system-backend-production-4178.up.railway.app';
    const sessionId = localStorage.getItem('session_id');

    // If not logged in → redirect
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

    // Default: view-only
    setEditable(false);
    $('#successMsg').addClass('d-none');

    /* ======================
       LOAD PROFILE (GET)
    ====================== */
    $.ajax({
        url: `${API_BASE}/profile.php`,
        method: 'GET',
        headers: {
            'Session-Id': sessionId
        },
        dataType: 'json',
        success: function (res) {

            if (res.status !== 'success') {
                localStorage.removeItem('session_id');
                window.location.href = 'login.html';
                return;
            }

            $('#name').val(res.profile.name || '');
            $('#email').val(res.profile.email || '').prop('disabled', true);
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
       SAVE PROFILE (POST)
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
            url: `${API_BASE}/profile.php`,
            method: 'POST',
            headers: {
                'Session-Id': sessionId
            },
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (res) {

                if (res.status !== 'success') {
                    alert('Profile update failed');
                    return;
                }

                $('#successMsg')
                    .removeClass('d-none')
                    .text('Profile updated successfully');

                setEditable(false);

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
