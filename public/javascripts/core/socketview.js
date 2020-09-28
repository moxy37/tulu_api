var signageSwitchSocket;


function connect() {
    openSocket(function createSocket(socket) {
        signageSwitchSocket = socket;
    });
}

function disconnect() {
    signageSwitchSocket.close();
}

function send(data) {
    if (signageSwitchSocket !== undefined) {
        var text = JSON.stringify(data);
        signageSwitchSocket.send(text);
    }
}

function openSocket(callback) {
    var tempText = window.location.host;
    var tempArray = tempText.split(':');
    var text = "ws://" + tempArray[0] + ":1015";
    // alert(text);
    var socket = new WebSocket(text);

    socket.onerror = function connectionError(event) {
        console.log(event);

        //alert("Failed to connect to the controller. Please ensure the IP address is correct, or check the controller.");
    };

    socket.onopen = function connectionSuccess(event) {
        //socket.send(initData);
    }

    socket.onclose = function closeConnection(event) {
        console.log(event);
    }

    callback(socket);

    socket.onmessage = function onMessageCallback(event) {
        var dataString = event.data
        handleMessage(dataString);
    }
}

function handleMessage(data) {
    if (data !== undefined) {
        var d = JSON.parse(data);

    } else {
        console.log("Data not defined");
    }

}

function closeSocket() {
    signageSwitchSocket.close();
}



connect();