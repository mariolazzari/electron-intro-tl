const { app, BrowserWindow } = require("electron");
const os = require("os");
const path = require("path");

let window;

const main = async () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    maximizable: false,
    autoHideMenuBar: true,
  });

  const indexPath = path.join(__dirname, "index.html");
  window.loadFile(indexPath);

  window.on("resize", e => {
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

  // platform specific
  if (os.platform() === "darwin") {
    console.log(app.isInApplicationsFolder());
  }

  // close app
  // app.quit();
};

app.whenReady().then(main);
