import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from '@material-ui/core/styles';

import Home from './pages/HomePage';
import ContentPageTemplate from './templates/ContentPage';

import './style.css';

import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
        <ContentPageTemplate>
          <Home/>
        </ContentPageTemplate>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
