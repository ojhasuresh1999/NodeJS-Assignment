$(document).ready(function () {
    $("#username").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#connectBtn").click();
        }
    });

    $('#connectBtn').click(function () {
        $('#connectBtn, #username').attr('disabled', true);
        let socket = io.connect();

        socket.on('connect', function () {
            socket.emit('registeruser', $('#username').val());
        });

        socket.on('activeusers', (activeUserList) => {
            $('#activeUserList').empty();
            activeUserList.forEach(user => {
                $('#activeUserList').append(`<li class="list-group-item">${user}</li>`);
            })
        })

        $("#messagebox").keyup(function (event) {
            if (event.keyCode === 13) {
                $("#messageBtn").click();
            }
        });

        $('#messageBtn').click(function () {
            socket.emit('chat', $('#messagebox').val());
            $('#messagebox').val('');
        });

        socket.on('chat', (messageData) => {
            const username = messageData.username;
            const city = messageData.city;
            const message = messageData.message;
            const datetime = (new Date).toLocaleString();
            const formattedMessage = `(${datetime})|[${username}][${city}]: ${message}`;
            $('#chatbox').val($('#chatbox').val() + formattedMessage + '\n');
        })
    })
})