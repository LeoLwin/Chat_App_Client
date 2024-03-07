import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState('');


    const handleTyping = () =>
        socket.emit('typing', `${localStorage.getItem('user')} is typing`);

    

    const saveMessage = async (newMessage) => {
        try {
            // Save the message to the database
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/saveMessage`, newMessage);
            console.log('Message saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving message:', error);
            // Handle error
            return error;
        }
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        const user = localStorage.getItem('user');
        const userId = localStorage.getItem('userid');

        if (message.trim() && user && userId) {
            const newMessage = {
                message_id: uuidv4(),
                sender_id: userId,
                receiver_id: 1,
                message: message,
                timestamp: new Date().toISOString(),
                group_id: 1,
                name: user,
                group_type: "group"
            };
            // Emit the message to the server
            socket.emit('message', newMessage);

            saveMessage(newMessage)
            // console.log({ userName: localStorage.getItem('user', 'userid'), message });
            setMessage('');
        }
    };
    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
};

ChatFooter.propTypes = {
    socket: PropTypes.object.isRequired, // Define PropTypes for the socket prop
};
export default ChatFooter;