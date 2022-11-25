const path = require('path');
const { mainModule } = require('process');
const {ipcRenderer, ipcMain, app, BrowserWindow, Menu} = electron;
const os = require('os');
const { on, EventEmitter } = require('events');
const ipc = require('electron').ipcRenderer;


// Connect Button Functionality - starts WebSocket Connection
conBtn = document.querySelector('#conBtn');
conBtn.addEventListener('click', (event, arg) => {
    console.log('connect button pressed');

    let selectedIPAddress = document.querySelector("#ipaddresses").value;

    window.Bridge.sendConnect(selectedIPAddress);

    alert('clicked');
});

// Disconnect Button Functionality - Ends WebSocket Connection
disconBtn = document.querySelector('#disconBtn');
disconBtn.addEventListener('click', (event, arg) => {
    console.log('disconnect button pressed')
    window.Bridge.sendDisconnect(discon)

    alert('clicked');
});

// Send Button Functionality - Sends information over the WebSocket
sendBtn = document.querySelector('#sendBtn')
sendBtn.addEventListener('click', (event, arg) => {
    console.log('data send button pressed')

    let data = document.querySelector('#datainput').value

    // window.Bridge.sendSubmit(data)

    // alert('clicked');
});