import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Grader from "./components/grader";
import './App.css';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "html, body": {
        fontSize: "sm",
        color: props.colorMode === "dark" ? "white" : "#00466f",
        lineHeight: "tall",
        backgroundColor: "#e5e5e5",
      },
      a: {
        color: props.colorMode === "dark" ? "teal.300" : "teal.500",
      },
    }),
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
    <div className="App">
      <Grader />
    </div>
    </ChakraProvider>
  );
}

export default App;
