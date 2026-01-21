import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import TrangChu from './pages/Website/TrangChu';
import KeHoachAnUong from './pages/Website/KeHoachAnUong';
import { AppProvider } from './context/QuanLiModal';
import { AppDangNhapProvider } from './context/QuanLiDangNhap_NguoiDung';
import DangNhap from './pages/Website/DangNhap';
import DangNhapAD from './pages/Admin/DangNhapAdmin';
import TrangChuAD from './pages/Admin/TrangChuAdmin';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AppDangNhapProvider>
     <AppProvider>
      <Routes>
          <Route path='/*' element={<TrangChu/>} />
          <Route path='/KeHoachAnUong' element={<KeHoachAnUong/>} />
          <Route path='/DangNhap' element={<DangNhap/>} />
          <Route path='/DangNhap_AD' element={<DangNhapAD/>} />
          <Route path='/admin/*' element={<TrangChuAD/>} />
      </Routes>
      </AppProvider>
      </AppDangNhapProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
