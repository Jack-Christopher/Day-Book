// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain  } = require('electron')
const path = require('path')


let mainWindow;
const createWindow = () => {
  // Create the browser window.
    mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    icon: path.join(__dirname, 'logo.png'),
    // autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  mainWindow.show();
}


function createChildWindow() {
    childWindow = new BrowserWindow({
      width: 600,
      height: 360,
      icon: path.join(__dirname, 'logo.png'),
      modal: true,
      show: false,
      parent: mainWindow, // Make sure to add parent window here
      autoHideMenuBar: true,
    
      // Make sure to add webPreferences with below configuration
      webPreferences: {
        preload: path.join(__dirname, 'settings.js'),
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    });
    
    // Child window loads settings.html file
    childWindow.loadFile("settings.html");
    
    childWindow.once("ready-to-show", () => {
      childWindow.show();
    });

    childWindow.on('closed', () => {
        mainWindow.reload()
    })
}


const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Show Notes',
                click: () => console.log('Show Notes')
            },
            {
                label: 'Exit',
                click: () => app.quit()
            }
        ]
    },
    {
       label: 'View',
       submenu: [
          {
             role: 'reload'
          },
          {
             role: 'toggledevtools'
          }
       ]
    },

    {
        label: 'Settings',
            submenu: [
                {
                    label: 'Settings',
                    click: () => createChildWindow()
                }
            ]
    }
 ]
 
 const menu = Menu.buildFromTemplate(template)
 Menu.setApplicationMenu(menu)



app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

