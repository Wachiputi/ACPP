//filename -App.js
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar/Sidebar";
import {About,AboutUsOne,AboutUsTwo} from "./pages/about";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages";
import Events from "./pages/events";
import AnnualReport from "./pages/index";
import Teams from "./pages/team";
// import SignUp from "./pages/signup";
import {Services,ServicesOne,ServicesTwo,ServicesThree} from "./pages/Services";
import Contact from "./pages/ContactUs";
import Support from "./pages/Support";
// import Signin from "./pages/Signin";
function App() {
    return (
        <Router>
            <Navbar />
            {/* <Sidebar /> */}
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/about-us" element={<About/>} />
                <Route path="/about-us/aim" element={<AboutUsOne/>} />
                <Route path="/about-us/vision" element={<AboutUsTwo/>} />
                <Route path="/events" element={<Events />} />
                <Route path="/annual" element={<AnnualReport />} />
                <Route path="/team" element={<Teams />} />
                {/* <Route path="/sign-up" element={<SignUp />} /> */}
                <Route path="/services" element={<Services />} />
                <Route path="/services/prediction" element={<ServicesOne />} />
                <Route path="/services/analysis" element={<ServicesTwo />} />
                <Route path="/services/recommendations" element={<ServicesThree />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/support" element={<Support />} />
                {/* <Route path="/signin" element={<Signin />} /> */}
            </Routes>
        </Router>
    );
} 
export default App;