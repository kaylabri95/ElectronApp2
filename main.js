const path = require('path');
const url = require('url');
// const { on } = require('events');
const os = require('os');
const { WebSocket } =  require('ws');
const {app, BrowserWindow, Menu, ipcMain, webContents, } = require('electron');

process.env.NODE_ENV = 'development';

let mainWindow;

// Create menu template, perhaps useless for our purpose but wanted to simplify the look of the browser
const mainMenuTemplate =  [
  {
    label: 'File',
    submenu:[
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];
// Information about Electron window & app processes
// Listen for app to be ready
app.whenReady().then(() => {
  // Create new window
  mainWindow = new BrowserWindow({});
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
  
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// My Local Area Network Adapters Listing Logic
let interfaces = os.networkInterfaces();
let optionalIPAddress = [];
console.log(optionalIPAddress)

function populateDropDown() {
  for(key in interfaces){
      for(network in interfaces[key]){
          let n = interfaces[key][network];
          if(n.family === 4){
              optionalIPAddress.push(interfaces[key][network].address)
              };
          };
  };
          //  This is where the logic of the drop down would be placed, below is the code I will start with
           // DropDown is filled with local IP address options
          //   window.webContents.send( )
          
          //   const newOption = document.createElement('option');
          //   const optionText = document.createTextNode('Option Text');
          //   newOption.appendChild(optionText);
          //   newOption.setAttribute('value','Option Value');
          //   const select = document.querySelector('select'); 
          //   select.appendChild(newOption);
//            };
//         };
//     };
};
// populateDropDown();

// mainWindow.webContents.on('did-finish-load', ()=>{
//     mainWindow.webContents.send('ipa:add', optionalIPAddress);});

// My websocket logic
// Catches information from the Connect button
let selectedIPAddress;
ipcMain.on('gotSelectedIPAddress', (event, selectedIPAddress) =>{
    console.log('selectedIPAddress');
    console.log('connect button pressed');
    let webSocket = new WebSocket(`ws://${selectedIPAddress}:2121/`);
    webSocket.onopen = (event) => {
    console.log("Connection established");
    webSocket.send('WebSocket opened');
    };
});

// Catches information from the disconnect button
ipcMain.on('gotDiscon', (event, discon) => {
    console.log('disconnect button pressed')
    webSocket.close(1000, "Work complete");
});

// Catches information from the sendData button
ipcMain.on('gotData', (event, data) => {
    console.log('data');
    console.log('data send button pressed')
    let outgoingMessage = data.value;
    webSocket.send(outgoingMessage);
    return false;
});