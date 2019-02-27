import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// https://material.io/tools/color/#!/?view.left=0&view.right=0 for changing colors in material ui
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#ffdcbd',
//       main: '#f0aa8d',
//       dark: '#bb7b5f',
//       contrastText: '#000'
//     },
//     secondary: {
//       light: '#503073',
//       main: '#240747',
//       dark: '#050021',
//       contrastText: '#fff'
//     }
//   },
//   typography: {
//     useNextVariants: true,
//   },
// });

//put inside MuiThemeProvider
// theme={theme}

ReactDOM.render(<BrowserRouter><MuiThemeProvider><App /> </MuiThemeProvider></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
