import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import axios from "axios";

const ChatBody = ({ socket, messages }) => {
  const navigate = useNavigate();
  const [oMessage, setOMessage] = useState([]);

  useEffect(() => {
    getMessage();
  }, []);


  const getMessage = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/messageList`);
      setOMessage(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleLeaveChat = () => {
    const socket_Id = localStorage.getItem("socketId")
    console.log(socket_Id)
    socket.emit("userDisconnect ", socket_Id);
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  // console.log(oMessage)
  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>

        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        <div>
          {messages.map((message) => (
            <div className="message__chats" key={message.message_id}>
              {message.sender_id === localStorage.getItem("userid") ? (
                <div className="message__sender">
                  <p className="sender__name">You</p>
                  <br />
                  <p>{message.message}</p>
                </div>
              ) : (
                <div ><p>{message.name}</p>

                  <p className="message__recipient">{message.message}</p>
                  <br />
                </div>
              )}
            </div>
          ))}

        </div>

        <div className="message__status">
          {/* <p>{typingStatus}</p> */}
        </div>
      </div >

    </>
  );
};

ChatBody.propTypes = {
  messages: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired,
  // lastMessageRef: PropTypes.object.isRequired,
  // typingStatus: PropTypes.string.isRequired
};

export default ChatBody;
