//filename -App.js
 
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Events from "./pages/events";
import AnnualReport from "./pages/annual";
import Teams from "./pages/team";
import Blogs from "./pages/blogs";
import SignUp from "./pages/signup";

import {Services,ServicesOne,ServicesTwo,ServicesThree} from "./pages/Services";
import Contact from "./pages/ContactUs";
import Support from "./pages/Support";
 



 
function App() {
    return (
        <Router>
            <Navbar />
            <Sidebar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/annual" element={<AnnualReport />} />
                <Route path="/team" element={<Teams />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/services1" element={<ServicesOne />} />
                <Route path="/services/services2" element={<ServicesTwo />} />
                <Route path="/services/services3" element={<ServicesThree />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="/support" element={<Support />} />


            </Routes>
        </Router>
    );
}
 
export default App;