import { BrowserRouter as Router, Route } from 'react-router-dom'

import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import { useDispatch } from 'react-redux';

import { User } from './components/domain/User';

type Props = {
  user: User|null;
}

const ChatPlug = ({ user }: Props) => {

  const dispatch = useDispatch();
  dispatch({type: user});

  return (
    <div
      className="h-screen w-screen bg-latte"
    >
      <Router>
        <Route path='/' exact component={ HomePage } />
        <Route path='/chat/:roomName' component={ ChatPage } />
      </Router>
    </div>
  );
}
export default ChatPlug;