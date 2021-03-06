import { BrowserRouter as Router, Route } from 'react-router-dom'

import Chat from './components/Chat/Chat';
import Home from './components/Home';
import { useDispatch } from 'react-redux';

import { User } from './components/domain/user/User';

type Props = {
  user: User|null;
}

const ChatPlug = ({ user }: Props) => {

  const dispatch = useDispatch();
  dispatch({type: user});

  return (
      <Router>
        <Route path='/' exact component={ Home } />
        <Route path='/chat/:roomName' component={ Chat } />
      </Router>
  );
}
export default ChatPlug;