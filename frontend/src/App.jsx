import Navbar from './landing_page/Navbar';
import Footer from "./landing_page/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home_page from './landing_page/home/Home_page';
import AboutSection from './landing_page/about/About';
import Support from './landing_page/support/support';
import SignUp from './landing_page/signup/SignUp';
import Product from './landing_page/products/products';
import Pricing from './landing_page/pricing/Pricing';
import NotFound from './NotFound';
import Login from './landing_page/login/Login'
import Register from './landing_page/register/Register';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home_page />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
