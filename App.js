import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Main from "./pages/Main"
import Register from "./pages/Registration";
import ModeToggle from "./components/ModeToggle";
import Login from "./pages/Login";
import  Layout from "./layout/Layout";


function App() {
//  const navigate = useNavigate();  
//     useEffect(() => {
//     navigate("/register");
//   }, [navigate]);

  return (
    <>


<Layout />
  
    <Routes>
    
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
    </Routes>
 

    </>
  );
}

export default App; 