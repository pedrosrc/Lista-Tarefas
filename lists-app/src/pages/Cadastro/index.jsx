import '../Login/useracess.css'
import { Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../../../serviceFirebase'
import { createUserWithEmailAndPassword} from 'firebase/auth'

export default function Cadastro(){

    
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const navigate = useNavigate();

    async function registerUser(){
        if(email !== '' && password !== ''){
            await createUserWithEmailAndPassword(auth, email, password)
        .then(()=>{
            console.log('User Sucess')
            navigate('/', {replace: true})
        })
        .catch((error)=>{
            console.log(error)
        })
        }else{
            alert('Preencha os campos corretamente!')
        }
        
    }

    return(   
    <div className="container">
            <h1>Listas</h1>
            <h3>Adicione e exclua suas tarefas</h3>
            <div className="container_login">
                <h4>Cadastro</h4>
                <span>Email:</span>
                <input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span>Senha:</span>
                <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={registerUser}>Cadastre</button>
                <p><Link to="/">Já tem uma conta? Conecte-se</Link></p>
            </div>
        </div>
    )
}