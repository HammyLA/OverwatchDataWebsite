import Header from "./components/Header";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Data from "./pages/Data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Data />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
