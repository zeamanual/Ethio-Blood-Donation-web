import { createTheme } from "@mui/material";

export let theme = createTheme({
  typography: {
    h1: {
      color: 'black'
    },
    h2: {
      color: 'black'
    },
    h3: {
      color: 'black'
    },
    h4: {
      color: 'black'
    },
    h5: {
      color: 'black'
    },
    h6: {
      color: 'black'
    },
    // allVariants: {
    //   color: 'primary.main'
    // }
  },
  palette: {
    primary: {
      main:"#e0193d",
      light:'#be000080'
      //   main: "#4DA8DA",
      // main: '#1b447a',
      // main: "rgba(27, 68, 122, 1)"
        // main: "#ed7966",
      //   main: "#303179",
      //   main: "rgb(176, 201, 12)",
    },
    secondary: {
      main: "#303179",
      //   main: "rgb(95, 211, 237)",
    },
  },
  // typography: {
  //   fontFamily: [
  //     'Alfa Slab One',
  //      'cursive',
  //   ].join(','),
  // }

})