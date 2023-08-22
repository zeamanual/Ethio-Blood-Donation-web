import { createTheme } from "@mui/material";

export let theme = createTheme({
  typography: {
    h1: {
      color: '#00022e'
    },
    h2: {
      color: '#00022e'
    },
    h3: {
      color: '#00022e'
    },
    h4: {
      color: '#00022e'
    },
    h5: {
      color: '#00022e'
    },
    h6: {
      color:'#00022e'
    },
    p: {
      color: '#00022e'
    },
    span: {
      color: '#00022e'
    }
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
            borderColor: 'secondary.main',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'secondary.main',
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