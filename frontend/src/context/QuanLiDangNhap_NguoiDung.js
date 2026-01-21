import React, { createContext, useContext, useState } from "react";
import * as fun from '../JS/FUNCTION/function';
import * as tb from '../JS/FUNCTION/ThongBao';
import * as API from '../JS/API/API';
const DangNhapContext = createContext();
export function AppDangNhapProvider({ children }) {
    const [GiaTri,setGT] = useState({
        id:'',
        rule:''
    });
    const handleLogin = async (login) => {
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
            const data = await API.CallAPI(formdata,{PhuongThuc:1, url: 'user/login'});
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
                setGT({
                    id:data.id,
                    rule:data.rule
                })
                return {
                    status: true,
                    message:data.message
                }
            }

        } catch (error) {
            console.error('lỗi sãy ra:'+ error)
        }
    }


    return (
        <DangNhapContext.Provider  value={{ GiaTri, setGT, handleLogin }} >
            {children}
            
        </DangNhapContext.Provider>
    );
}

export function useDangNhapContext() {
    return useContext(DangNhapContext);
}