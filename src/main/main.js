const electron = require('electron');
const dialog = require('electron').dialog;
const fs = require('fs');

// Module to control application life.
const app = electron.app
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 870,
        resizable: false
    })

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    //if (process.platform !== 'darwin') {
        app.quit()
    //}
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

const {
    ipcMain
} = require('electron');
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg); // prints "ping"

    if (arg.type == "loadExecutable") {
        var res = {
            type: "execPath",
            path: "xablau",
            noError: 1
        }
        dialog.showOpenDialog({
            properties: ['openFile']
        }, function(files) {
            if (files) {
                res.files = files;
            } else {
                res.noError = 0;
            }
            event.sender.send('asynchronous-reply', res)
        });

    }

    if (arg.type == "loadIcon") {
        var res = {
            type: "iconPath",
            path: "xablonga",
            noError: 1
        }
        dialog.showOpenDialog({
            properties: ['openFile']
        }, function(files) {
            if (files) {
                res.files = files;
            } else {
                res.noError = 0;
            }
            event.sender.send('asynchronous-reply', res)
        });

    }


    if (arg.type == "createFile") {
        var res = {
            type: "createShortcut",
            response: "xablau",
            noError: 1,
            error: ""
        }

        generateFile(event, res, arg);
    }

    if (arg.type == "log") {
      console.log(arg);
    }

});



/*

res =

{ state:
   { generated: false,
     messageSnack: 'Shortcut generated with success',
     openSnack: true,
     valueApp: '',
     valueCategories: '',
     valueComment: '',
     valueExec: '',
     valueIcon: '',
     valueName: '',
     valueTerminal: 0,
     valueType: '',
     valueWMClass: '' },
  type: 'createFile' }

*/

function generateFile(event, res, arg) {
    var homeDir = app.getPath('home');
    var menuDir = homeDir + "/.local/share/applications/"
    //console.log();

    var fileContents = "#!/usr/bin/env xdg-open";
    fileContents += "\n" + "[Desktop Entry]";
    fileContents += "\n" + "Version=" + "1.0";
    //fileContents += "\n" + "Type=" + "Application";
    fileContents += "\n" + "Type=" + arg.state.valueTp;
    //fileContents += "\n" + "Name=" + "Simple Note";
    fileContents += "\n" + "Name=" + arg.state.valueName;
    //fileContents += "\n" + "Icon=" + "/home/brunno/Install/simplenote/Simplenote.png";valueIcon
    fileContents += "\n" + "Icon=" + arg.state.valueIcon;
    //fileContents += "\n" + "Icon=" + "/home/brunno/Install/simplenote/Simplenote.png";
    fileContents += "\n" + "Exec=" + arg.state.valueExec;
    //fileContents += "\n" + "Exec=" + "/home/brunno/Install/simplenote/Simplenote";
    fileContents += "\n" + "Comment=" + arg.state.valueComment;
    //fileContents += "\n" + "Comment=" + "note notepad fast write text";
    //fileContents += "\n" + "Categories=" + "IDE;Development;";
    fileContents += "\n" + "Categories=" + arg.state.valueCategories;
    var tpTerminal='';
    if (arg.state.valueTerminal===1){
      tpTerminal='true';
    }
    else{
      tpTerminal='false';
    }
    fileContents += "\n" + "Terminal=" + tpTerminal;
    if (arg.state.valueWMClass!=''){
      fileContents += "\n" + "StartupWMClass=" + arg.state.valueWMClass;
    }

    //event.sender.send('asynchronous-reply', res);

    //var fileName = "SimpleNote.desktop";
    var fileName = (arg.state.valueName + ".desktop").replace(' ', '');
    fileName = menuDir + fileName;

    console.log("Creating File " + fileName);

    fs.writeFile(fileName, fileContents, function(err) {
        if (err) {
            res.noError=0;
            res.error = err;

            //return console.log(err);
            console.log("The file was NOT saved!");
            console.log(res);
        } else {

            res.error="";
            res.noError=1;
            console.log("The file was saved!");
            console.log("Contents" + fileContents);
            console.log("Name" + arg.state.valueName);

        }
        event.sender.send('asynchronous-reply', res);


    });

    /*#!/usr/bin/env xdg-open
[Desktop Entry]
Version=1.0
Type=Application
Name=IntelliJ IDEA Community Edition
Icon=/home/brunno/Install/idea-ic/bin/idea.png
Exec="/home/brunno/Install/idea-ic/bin/idea.sh" %f
Comment=Develop with pleasure!
Categories=Development;IDE;
Terminal=false
StartupWMClass=jetbrains-idea-ce*/



}
