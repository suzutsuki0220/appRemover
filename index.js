"use strct";

const electron = require("electron");
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
    },
    useContentSize: true
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

// menu
const menu_template = [
    {
        label: app.name,
        submenu: [
            //{role: 'about'},
            {
                role: 'close',
                accelerator: 'Command+Q'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {role: 'reload'},
            {
                label: 'DevTools',
                accelerator: 'Alt+Command+I',
                click: function() {
                    mainWindow.openDevTools();
                }
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(menu_template);
Menu.setApplicationMenu(menu);
