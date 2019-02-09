import React, { Component } from "react";
import { hot } from "react-hot-loader";
import BrowserRouter from "react-router-dom/BrowserRouter";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import configureStore from "../store/index.store";
import theme from "../config/theme.config";

import Root from "./Root";

const store = configureStore();

const NewRoot = hot(module)(Root);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline />
                        <NewRoot />
                    </MuiThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;