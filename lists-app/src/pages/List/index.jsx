import './list.css'
import { useEffect, useState } from 'react'
import {AiOutlineCheck, AiOutlineEdit} from 'react-icons/ai'
import {MdOutlineBallot} from 'react-icons/md'
import { signOut } from 'firebase/auth'
import { auth , db } from '../../../serviceFirebase'
import { addDoc , collection, onSnapshot, query, orderBy, where, deleteDoc, doc, updateDoc } from 'firebase/firestore'


export default function List(){
    const [textInput, setTextInput] = useState('')
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])
    const [edit, setEdit] = useState({})

    useEffect(()=>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem('@dataUser')
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);

                const tarefasRef = collection(db, "tarefas");
                const q = query(tarefasRef, orderBy("created", "desc"), where("userID", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot)=> {
                    let lists = [];

                    snapshot.forEach((doc) => {
                        lists.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userID: doc.data.userID
                        })
                        setTarefas(lists);


                    })
                })
            }
        }
        loadTarefas();
    },[])

    async function registerForm(e){
        e.preventDefault()
      
        if(textInput === ''){
            alert('Digite sua tarefa!')
            return;
            
        }else if(edit?.id){
            handleUpdate();
            return;
        }else{
            await addDoc(collection(db, "tarefas"),{
                tarefa: textInput,
                created: new Date(),
                userID: user?.uid
            })
            .then(()=>{
                console.log('Tarefa Registrada')
                setTextInput('')
            })
            .catch((error)=>{
                console.log(error)
            })
        }  
    }
    async function deleteItem(id){
        const postRef = doc(db, "tarefas", id)
        await deleteDoc(postRef)
        .then(()=>{
            console.log('Item Delete')
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    async function editItem(item){
        setTextInput(item.tarefa)
        setEdit(item);
    }
    async function handleUpdate(){
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef,{
            tarefa: textInput
        })
        .then(()=>{
            setTextInput('')
            setEdit({})
        })
        .catch((error)=>{
            console.log(error)
            setTextInput('')
            setEdit({})
        })
    }

    async function signout(){
        await signOut(auth)
    }

    return(

        <div className="container_list">
            <h1>Minhas Tarefas</h1>
            <h3>Registre sua atividade</h3>
            <form className='form' onSubmit={registerForm}>
            <textarea placeholder='Digite sua atividade' value={textInput} onChange={(e) => setTextInput(e.target.value)} />
            {Object.keys(edit).length > 0 ? (
                <button className='btn_register' type='submit'>Atualizar</button>
            ) : (<button className='btn_register' type='submit'>Registrar</button>)}
            </form>
            <h3>Tarefas Pendentes</h3>
            {tarefas.map((item) => (
                <article className='article_tarefas' key={item.id}>
                    <p><MdOutlineBallot/> {item.tarefa}</p>
                    <div className='buttons'>
                        <button onClick={()=> editItem(item)} ><AiOutlineEdit/> Editar</button>
                        <button className='btn_delete' onClick={()=> deleteItem(item.id)}> <AiOutlineCheck/> Concluir</button>
                    </div>
                </article>
  
            ))}
            

            <button className='btn_logout' onClick={signout} >Sair</button>
            
        </div>
    )
}