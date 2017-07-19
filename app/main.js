const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ show: false });
  let contents = mainWindow.webContents;

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // getFileFromUserSelection();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

const getFileFromUserSelection = module.exports.getFileFromUserSelection = () => {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: [ 'openFile' ],
    filters: [
      { name: 'Text Files', extensions: [ 'txt', 'text' ] },
      { name: 'Markdown Files', extensions: [ 'md', 'markdown' ] }
    ]
  });
  if(!files) return;
  return files[0];
};

const openFile = exports.openFile = filePath => {
  const file = filePath || getFileFromUserSelection();
  const content = fs.readFileSync(file).toString();
  mainWindow.webContents.send('file-opened', file, content);
};

