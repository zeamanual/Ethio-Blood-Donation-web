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
      main: "#e0193d",
      light: '#be000080',
      // dark:"#c91637"
      //   main: "#4DA8DA",
      // main: '#1b447a',
      // main: "rgba(27, 68, 122, 1)"
      // main: "#ed7966",
      //   main: "#303179",
      //   main: "rgb(176, 201, 12)",
    },
    secondary: {
      // main: "#303179",
      main: '#00022e'
      //   main: "rgb(95, 211, 237)",
    },
  },
  // typography: {
  //   fontFamily: [
  //     'Alfa Slab One',
  //      'cursive',
  //   ].join(','),
  // }
  components: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme => 'yellow',

    },
    MuiOutlinedInput: {
      styleOverrides: {

        root: {
          '&:hover fieldset': {
            borderColor: 'yellow',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'yellow',
          },
        },
        // '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':{
        //   borderColor: theme => 'yellow',

        // },
        // "root": {
        //    '&.Mui-active .MuiOutlinedInput-notchedOutline': {
        //   borderColor: theme => 'yellow',
        //   color:"green"

        //   }
        // },
        // focused: {
        //   borderColor: theme => theme.palette.secondary.main,
        // },
      },
    },
  },
})