import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import TouchAppIcon from 'material-ui/svg-icons/action/touch-app';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';

class Do extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueApp: "",
            valueTp: "",
            valueName: "",
            valueComment: "",
            valueCategories: "",
            valueTerminal: 0,
            valueExec: "",
            valueIcon: "",
            valueWMClass: "",
            generated: false,
            openSnack: false,
            messageSnack: ""
        };
        this.handleActionButton = this.handleActionButton.bind(this);

        this.handleChangeApp = this.handleChangeApp.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleChangeExec = this.handleChangeExec.bind(this);
        this.handleChangeIcon = this.handleChangeIcon.bind(this);
        this.handleChangeCategories = this.handleChangeCategories.bind(this);
        this.handleChangeTerminal = this.handleChangeTerminal.bind(this);
        this.handleChangeWMClass = this.handleChangeWMClass.bind(this);

        var self = this;
        window.ipcRenderer.removeAllListeners('asynchronous-reply');
        window.ipcRenderer.on('asynchronous-reply', (event, arg) => {
            console.log(arg); // prints "pong"
            if (arg.type === "execPath") {
                if (arg.noError == 1) {
                    this.setState({valueExec: arg.files[0]});
                }
            }

            if (arg.type === "iconPath") {
                if (arg.noError == 1) {
                    this.setState({valueIcon: arg.files[0]});
                }
            }

            if (arg.type === "createShortcut") {
                console.log(arg);
                if (arg.noError == 1) {
                    this.setState({openSnack: true, messageSnack: "Shortcut generated with success"});
                } else {
                    this.setState({openSnack: true, messageSnack: arg.error});
                }
            }

        });

    };

    handleRequestClose = () => {
        this.setState({openSnack: false});
    };

    handleActionButton() {
        //alert('onTouchTap triggered on the title component');
        var arg = {
            type: 'createFile',
            state: this.state
        }
        this.setState({generated: false})
        window.ipcRenderer.send('asynchronous-message', arg);
    };

    handleExecButton() {
        var arg = {
            type: 'loadExecutable'
        }
        //alert('onTouchTap triggered on the title component');

        window.ipcRenderer.send('asynchronous-message', arg);
    };

    handleIconButton() {
        var arg = {
            type: 'loadIcon'
        }
        //alert('onTouchTap triggered on the title component');
        window.ipcRenderer.send('asynchronous-message', arg);
    };

    handleChangeApp(event) {

        this.setState({valueApp: event.target.value});
    }
    handleChangeType(value) {
        console.log("trocou type = " + value);
        this.setState({valueTp: value});

    }
    handleChangeName(event) {
        console.log("trocou name = " + event.target.value);
        this.setState({valueName: event.target.value});
    }
    handleChangeComment(event) {
        this.setState({valueComment: event.target.value});
    }
    handleChangeCategories(event) {
        this.setState({valueCategories: event.target.value});
    }
    handleChangeExec(event) {
        this.setState({valueExec: event.target.value});
    }
    handleChangeIcon(event) {
        this.setState({valueIcon: event.target.value});
    }
    handleChangeTerminal = (event, index, value) => this.setState({valueTerminal: value});

    handleChangeWMClass(event) {
        this.setState({valueWMClass: event.target.value});
    }

    render() {

        const styles = {
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0
            },
            button: {
                margin: 12,
                width: 300
            },
            fullWidth: {
                width: "100%"
            },
            buttonComplement: {

                width: 400
            },
            title: {
                cursor: 'pointer'
            }
        };

        const fabholder = {
            width: '100%'

        };

        const ubuntu_warm_light_grey = "#DEDBD8"

        const appTypes = ['Application', 'Link', 'Directory'];

        return (
            <div>
                <AppBar title="Launcher Creator" iconElementLeft={< IconButton > <TouchAppIcon color={ubuntu_warm_light_grey}/> < /IconButton>}/>
                <br/>

                <Paper styles={fabholder}>

                    <AutoComplete onUpdateInput={this.handleChangeType} onNewRequest={this.handleChangeType} searchText={this.state.valueTp} floatingLabelText="App Type - Write for other values" filter={AutoComplete.noFilter} openOnFocus={true} fullWidth={true} dataSource={appTypes}/>
                    <br/>
                    <TextField onChange={this.handleChangeName} value={this.state.valueName} floatingLabelText="App Name" fullWidth={true}/>

                    <br/>
                    <TextField onChange={this.handleChangeComment} value={this.state.valueComment} floatingLabelText="App Comments" multiLine={true} rows={2} fullWidth={true}/>

                    <br/>
                    <TextField onChange={this.handleChangeCategories} value={this.state.valueCategories} floatingLabelText="App Categories - Write semi-colon separed categories" fullWidth={true}/>

                    <br/>

                    <SelectField value={this.state.valueTerminal} onChange={this.handleChangeTerminal} floatingLabelText="Runs on Teminal">
                        <MenuItem value={1} primaryText="Yes"/>
                        <MenuItem value={0} primaryText="No"/>
                    </SelectField>

                    <br/>
                    <br/> {/*<RaisedButton label="Choose the Executable" labelPosition="before" style={styles.button}>
                <input type="file" style={styles.exampleImageInput}/>
              </RaisedButton>*/}
                    <RaisedButton label="Choose the Executable" style={styles.button} onTouchTap={this.handleExecButton}/>
                    <TextField onChange={this.handleChangeExec} value={this.state.valueExec} floatingLabelText=" Or write path here" style={styles.buttonComplement}/>
                    <br/>
                    <br/> {/*<RaisedButton label="Choose the Icon" labelPosition="before" style={styles.button}>
              <input type="file" style={styles.exampleImageInput}/>
            </RaisedButton>*/}
                    <RaisedButton label="Choose the Icon" style={styles.button} onTouchTap={this.handleIconButton}/>
                    <TextField onChange={this.handleChangeIcon} value={this.state.valueIcon} floatingLabelText=" Or write path here" style={styles.buttonComplement}/>

                    <br/>
                    <TextField onChange={this.handleChangeWMClass} value={this.state.valueWMClass} floatingLabelText="StartupWMClass - if Needed" fullWidth={true}/>

                </Paper>

                <br/>

                <Paper styles={fabholder}>

                    <RaisedButton label="Create Launcher" secondary={true} style={styles.fullWidth} icon={< ThumbUp />} onTouchTap={this.handleActionButton}/>

                </Paper>

                <Snackbar open={this.state.openSnack} message={this.state.messageSnack} onRequestClose={this.handleRequestClose} autoHideDuration={4000}/>
            </div>
        )
    };
};

export default Do;
