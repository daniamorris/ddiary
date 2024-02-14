import React from "react";
import LoggedOut from "./LoggedOut";
import { useAuth, AuthProvider } from "./use-auth-client";
import LoggedIn from "./LoggedIn";
import "../assets/main.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import _default from "@mui/material/styles/identifier";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#d9ed92ff',
    },
    primary: {
      light: '#b5e48c',
      main: '#76c893',
      dark: '#184e77',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffccd5',
      main: '#ff4d6d',
      dark: '#590d22',
      contrastText: '#000',
    },
    accent: {
      main: '#ff36ab',
    },
  },
});

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
    {/* <CssBaseline /> */}
    {/* <Container maxWidth="sm"> */}
      <header id="header">
        <section id="status" className="toast hidden">
          <span id="content"></span>
          <button className="close-button" type="button">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </section>
      </header>
      <main id="pageContent">
        {isAuthenticated ? <LoggedIn /> : <LoggedOut />}
      </main>
      {/* </Container> */}
    </>
  );
}

export default () => (
  <AuthProvider>
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </AuthProvider>
);
