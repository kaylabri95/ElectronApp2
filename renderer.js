const electron = require('electron');
const path = require('path');
const { mainModule } = require('process');
const {ipcRenderer, ipcMain, app, BrowserWindow, Menu} = electron;
const os = require('os');
const { on, EventEmitter } = require('events');


// My Local Area Network Adapters Listing Logic
const interfaces = os.networkInterfaces();
for(key in interfaces){
    for(network in interfaces[key]){
        const n = interfaces[key][network];
if(n.family === 4){
    const optionalIPAddress = []
    optionalIPAddress.push(interfaces[key][network].address);
    console.log(optionalIPAddress);

    // item addition to list
    ipcRenderer.on('ipa:add', function(e, ipa){
        const ipaddresses = document.getElementById('ipaddresses');  
        for(const value of optionalIPAddress) {
            console.log(value);
            let option = document.createElement("option");
            option.setAttribute(value, data[key]);

            let optionText = document.createTextNode(key);
            option.appendChild(optionText);

            ipaddresses.appendChild(option);
        }
    });
};
};
};



// moving the selectedIPAddress to the websocket creation under conBtn



// tutorial from stack overflow about ipc and button functions. sample code below and by version
// var ipc = require('electron').ipcRenderer;
// var authButton = document.getElementById('auth-button');
// authButton.addEventListener('click', function(){
//     ipc.once('actionReply', function(event, response){
//         processResponse(response);
//     })
//     ipc.send('invokeAction', 'someData');
// });
const ipc = require('electron').ipcRenderer;

// Connect Button Functionality - starts WebSocket Connection
const conBtn = document.getElementById('conBtn');
conBtn.addEventListener('click', function(){
    const webSocket = new WebSocket(`ws://${selectedIPAddress}:2121/`);
        webSocket.onopen = (event) => {
        console.log("Connection established");
        webSocket.send('WebSocket opened');
        }
        ipcRenderer.on('', function(event , response){
        processResponse(response);
    });
});



// Disconnect Button Functionality - Ends WebSocket Connection
const disconBtn = document.getElementById('disconBtn');
disconBtn.addEventListener('click', function(){
    ipcRenderer.on('', function(event , response){
        processResponse(response);
    });
});


// Send Button Functionality - Sends information over the WebSocket
const sendBtn = document.getElementById('sendBtn')
sendBtn.addEventListener('click', function(){
    ipcRenderer.on('', function(event , response){

        processResponse(response);
    });
ipcRenderer.send('data:send', data);

});

// from add window, adds item to the list on the main page from the text box
    document.querySelector('form').addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  const item = document.querySelector('#item').value;
  console.log(ipcRenderer);
  ipcRenderer.send('item:add', item);
}
