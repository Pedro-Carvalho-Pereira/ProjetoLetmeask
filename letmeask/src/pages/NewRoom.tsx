import illustrationImg from '../assets/images/illustration.svg';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { Button } from '../Components/Button';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { userInfo } from 'os';
import { useAuth } from '../hooks/useAuth';
//  import { useContext } from 'react';
//  import { AuthContext } from '../contexts/AuthContext';




export function NewRoom() {

    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();

    const { user } = useAuth();
    
    async function handleCreateRoom(event :FormEvent){
        event.preventDefault();
        if(newRoom.trim() === ''){
            return ;
        }
        

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`);
    }
    
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração" />
                <strong>Crie Salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom} >
                        <input onChange={event => setNewRoom(event.target.value)} value={newRoom} type="text" placeholder="Nome da sala" />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente?<Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    );
}