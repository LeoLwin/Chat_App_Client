import { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import PropTypes from 'prop-types';


const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    // const [typingStatus, setTypingStatus] = useState('');
    // const lastMessageRef = useRef(null);
    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    // useEffect(() => {
    //     // 👇️ scroll to bottom every time messages change    
    //     lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);

    // useEffect(() => {
    //     socket.on('typingResponse', (data) => setTypingStatus(data));
    // }, [socket]);

    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody messages={messages} socket={socket} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    );
};
ChatPage.propTypes = {
    socket: PropTypes.object.isRequired, // Define PropTypes for the socket prop
};


export default ChatPage;