import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from "socket.io-client";
const socket = io.connect('http://localhost:2000');
import './App.css'
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import ChatBar from './components/ChatBar';

function App() {

  return (
    <>
      {/* <div><h1>Hello </h1></div> */}
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket} />}></Route>
            <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
            <Route path="/chatBar" element={<ChatBar socket={socket} />}></Route>

          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
