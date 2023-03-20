import './useracess.css'
import { Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../../../serviceFirebase'
import { signInWithEmailAndPassword} from 'firebase/auth'

export default function Login(){

    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const navigate = useNavigate()

    async function loginUser(){
        if(email !== '' &&  password !== ''){
            await signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            setEmail('')
            setPassword('')
            navigate('/list', {replace: true})
        })
        .catch((error) =>{
            alert('Senha/Email inválida!')
            console.log(error)
        })
        }else{
            alert('Digite seus dados corretamente!')
        }

    }

    return(
        <div className="container">
            <h1>Listas</h1>
            <h3>Adicione e exclua suas tarefas</h3>
            <div className="container_login">
                <h4>Login</h4>
                <span>Email:</span>
                <input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span>Senha:</span>
                <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={loginUser}>Entrar</button>
                <p><Link to="/cadastro">Não tem uma conta ? Cadastre-se</Link></p>
            </div>
        </div>
    )
}