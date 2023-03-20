import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../pages/Login/login";
import Cadastro from "../../pages/Cadastro";
import List  from "../../pages/List";
import Private from "./private";


export default function Nav(){
    return(
        <div>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Login/>}/>  
            <Route path="/cadastro" element={<Cadastro/>}/> 
            <Route path="/list" element={ <Private> <List/> </Private> }/>
            </Routes>
        </BrowserRouter>
        </div>
    )
}