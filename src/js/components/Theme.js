import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as _colors from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
//tabela de cores em http://www.material-ui.com/#/customization/colors

/*
datePicker: {
color: palette.primary1Color,
textColor: palette.alternateTextColor,
calendarTextColor: palette.textColor,
selectColor: palette.primary2Color,
selectTextColor: palette.alternateTextColor,
calendarYearBackgroundColor: _colors.white
}
*/

const ubuntu_orange = "#E95420";
const ubuntu_light_orange = "#ED764D";
const ubuntu_warm_grey = "#BEB8B2";
const ubuntu_warm_dark_grey = "#AEA79F";
const ubuntu_warm_light_grey = "#DEDBD8";


const theme = getMuiTheme({
    palette: {
        primary1Color: ubuntu_orange,
        primary2Color: ubuntu_light_orange,
        primary3Color: ubuntu_warm_grey,
        accent1Color: ubuntu_orange,
        accent2Color: ubuntu_warm_light_grey,
        accent3Color: ubuntu_warm_dark_grey,
        textColor: _colors.darkBlack,
        alternateTextColor: _colors.white,
        canvasColor: _colors.white,
        borderColor: ubuntu_warm_light_grey,
        disabledColor: fade(_colors.darkBlack, 0.3),
        pickerHeaderColor: ubuntu_orange,
        clockCircleColor: fade(_colors.darkBlack, 0.07),
        shadowColor: _colors.fullBlack,
    },
    dialog: {
        className: "teste"
    },
});

export default theme;
