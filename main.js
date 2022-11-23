const electron = require('electron');
const path = require('path');
const url = require('url');
const {ipcRenderer} = electron;
const { on } = require('events');
const os = require('os');
const { WebSocketServer } =  require('ws');
const {app, BrowserWindow, Menu, ipcMain} = electron;
const ipc = require('electron').ipcMain;

process.env.NODE_ENV = 'development';

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
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

// Catch item:add
ipcMain.on('ipa:add', function(e, item){
  mainWindow.webContents.send('ipa:add', item);
});


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


// tutorial from stack overflow about ipc and button functions. sample code below and by version
ipc.on('invokeAction', function(event, data){
    var result = processData(data);
    event.sender.send('actionReply', result);
});


// My websocket logic



