var React = require('react');
var MuiThemeProvider = require("material-ui/styles/MuiThemeProvider").default;
var getMuiTheme = require("material-ui/styles/getMuiTheme").default;
//import * as _colors from 'material-ui/styles/colors';
var theme = require("./Theme");


var Template =
    React.createClass({

        render: function() {
            return (
              
              <MuiThemeProvider muiTheme={theme.default}>
                <div>
                  {this.props.children}
                </div>
              </MuiThemeProvider>

            )
        }
    });

module.exports = Template;
