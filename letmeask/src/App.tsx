import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';
import { AdminRoom } from "./pages/AdminRoom";



type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}



function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>

    </BrowserRouter >
  );
}

export default App;
