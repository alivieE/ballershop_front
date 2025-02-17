// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalogue from './pages/Catalogue';
import ProductDetail from './pages/ProductDetail';
import Layout from './components/Layout';
import { ShopContextProvider } from './context/ShopContext';
import { FilterProvider } from './FilterContext';
import { AuthProvider } from './AuthContext';
import { SearchProvider } from './SearchContext';
import Help from './components/Help';
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';
import WorkWithUs from './components/WorkWithUs';

const App = () => {
  return (
    <ShopContextProvider>
      <SearchProvider>
       <FilterProvider>
       <AuthProvider>
      <Routes>
        
        <Route path="/" element={<Layout/>}>
        <Route index element={<Catalogue/>}></Route>
        <Route path="/catalogue" element={<Catalogue/>} ></Route>
        <Route path="/help" element={<Help/>} ></Route>
        <Route path="/about" element={<About/>} ></Route>
        <Route path="/privacy"  element={<PrivacyPolicy/>} exact></Route>
        <Route path="/work"  element={<WorkWithUs/>} exact></Route>
        <Route path="/product/:productName"  element={<ProductDetail/>} exact >
        
        </Route>
        </Route>
        
      </Routes>
      </AuthProvider>
      </FilterProvider>
      </SearchProvider>
      </ShopContextProvider>
      
  );
};

export default App;

