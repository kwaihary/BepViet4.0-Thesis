import './App.css';
import TrangChu from './pages/Website/TrangChu';
import DangNhap from './pages/Website/DangNhap';
function App() {
  return (
 <BrowserRouter>
      <Routes>
        <Route path="/DangNhap" element={<DangNhap />} />
        <Route path="/" element={<TrangChu/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
