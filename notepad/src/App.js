import "./App.css";
import Navbar from "./Components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ChakraProvider } from "@chakra-ui/react";
const theme = createTheme();

function App() {
  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <Navbar />
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;