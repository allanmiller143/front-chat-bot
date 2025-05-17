import Chat from '../Pages/Chat/Chat'
import Home from '../Pages/Home/Home';
import NotFound from '../Pages/NotFound';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/" element={<Chat/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
