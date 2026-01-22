import React, { createContext, useContext, useState } from "react";
import * as fun from '../JS/FUNCTION/function';
import * as API from '../JS/API/API';
import * as ThongBao from '../JS/FUNCTION/ThongBao';
import { useNavigate } from 'react-router-dom';
const DangNhapContext = createContext();
export function AppDangNhapProvider({ children }) {
    const [GiaTri,setGT] = useState([]);
     const navigate = useNavigate();
    const handleLogin = async (login , url ) => {
        const kiemtra= fun.KiemTraRong(login);
        if(!kiemtra.Status){
            let errorsTemp = {};
            kiemtra.ErrorKeys.forEach(key => {
                errorsTemp[key] = 'Vui lòng nhập đầy đủ thông tin!';
            });
             return {
                validate : true,
                err: errorsTemp
             }
        }
        const formdata= fun.objectToFormData(login);
        try {
            const data = await API.CallAPI(formdata,{PhuongThuc:1, url: url});
            if(data.status===false){
                return {
                    status:false,
                    message: data.message
                }
            };
            if(data.validate){
                const obj = {};
                Object.keys(data.errors).forEach(key => {
                    obj[key] = data.errors[key][0]; 
                });
                return {
                    validate : true,
                    err: obj
                }
            }
            if(data.status){
                setGT(data.data)
                return {
                    status: true,
                    message:data.message
                }
            }

        } catch (error) {
            console.error('lỗi sãy ra:'+ error)
        }
    };
    const kiemtra_dangnhap= async(url)=>{
        try {
            const kiemtra= await API.CallAPI(undefined,{PhuongThuc:1,url:url});
            if(kiemtra.status){
                setGT(kiemtra.data)
            }
        } catch (error) {
            console.error('lỗi :' + error)
        }
    }
    const handleLogout = async () => {
        const logout = await ThongBao.ThongBao_XacNhanTT("Bạn có chắc muốn đăng xuất không?");
        if (!logout) return;
        try {
           const data= await API.CallAPI(undefined, {url: 'user/logout', PhuongThuc: 1 });
           alert(JSON.stringify(data))
           if(data.status){
                navigate('/DangNhap');
           }
           ThongBao.ThongBao_ThanhCong("Đăng xuất thành công!");
        } catch (error) {
            console.error("Lỗi logout:", error);
        } 
    };


    return (
        <DangNhapContext.Provider  value={{ GiaTri, setGT, handleLogin , kiemtra_dangnhap ,handleLogout }} >
            {children} 
        </DangNhapContext.Provider>
    );
}

export function useDangNhapContext() {
    return useContext(DangNhapContext);
}