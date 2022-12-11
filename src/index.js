const { app, BrowserWindow } = require("electron");
const os = require("os");
const path = require("path");

// reload
require("electron-reload")(__dirname);

let window;

const main = async () => {
  // platform specific
  const isMac = os.platform() === "darwin";

  window = new BrowserWindow({
    icon: isMac
      ? path.join(__dirname, "logo.ico")
      : path.join(__dirname, "logo.icns"),
    width: 800,
    height: 600,
    resizable: true,
    maximizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      // devTools:false
    },
    show: false, // wait ready-to-show event
    // frameless
    // frame: false,
  });

  // show window (avoid flickering)
  window.on("ready-to-show", window.show);

  // show dev tools
  window.webContents.openDevTools();

  const indexPath = path.join(__dirname, "index.html");
  window.loadFile(indexPath);

  window.on("resize", _e => {
    console.log(window.getBounds());
  });

  const version = app.getVersion();
  console.log("App version:", version);

  const { isPackaged } = app;
  console.log(isPackaged);

  const userData = app.getPath("userData");
  console.log("Desktop path:", userData);

  const countryCode = app.getLocaleCountryCode();
  console.log("Country code", countryCode);

  // close app
  // app.quit();
};

app
  .whenReady()
  .then(main)
  .catch(ex => console.error(ex));
