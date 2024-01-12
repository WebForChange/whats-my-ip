import Home from "./components/Home";
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  return <Home API_KEY={API_KEY} />;
}

export default App;
