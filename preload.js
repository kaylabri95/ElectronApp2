const { contextBridge, ipcMain, ipcRenderer } = require('electron')
const fs = require('fs')
const path = require('path')
const { contextIsolated, send } = require('process')

// connect button
let sendConnect = (selectedIPAddress) => {
    console.log('selectedIPAddress');
    console.log('connect button pressed')
    ipcRenderer.send('gotSelectedIPAddress', selectedIPAddress)
}

// disconnect button
let sendDisconnect = (discon) => {
    console.log('disconnect button pressed')
    ipcRenderer.send('gotDiscon', discon)
}

// send data button
let sendSubmit = (data) => {
    console.log('data');
    console.log('data send button pressed')
    ipcRenderer.send('gotData', data);
}

let indexBridge = {
    sendSubmit: sendSubmit,
    sendConnect: sendConnect,
    sendDisconnect: sendDisconnect,
    // dropDownpopulation: (callback) => ipcRenderer.on('dropDownpopulation', (callback))

}

contextBridge.exposeInMainWorld('Bridge', indexBridge);