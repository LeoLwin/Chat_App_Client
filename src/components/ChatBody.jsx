import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import axios from "axios";

const ChatBody = ({ messages, socket }) => {
  const navigate = useNavigate();
  const [oMessage, setOMessage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMessage(currentPage);
  }, [currentPage]);


  const getMessage = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/messageList/1`);
      console.log(`This is Data ${result.data}`);
      setOMessage(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };



  const handleLeaveChat = () => {
    localStorage.clear();
    socket.disconnect();
    navigate("/");
    window.location.reload();
  };


  console.log(messages)
  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>

        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {/* {oMessage.map((message) =>
          message.name === localStorage.getItem("user") ? (
            < div className="message__chats" key={message.id} >
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p >{message.name}</p> <br />
              <div className="message__recipient">
                <p>{message.text}</p>

              </div>
              <div ref={lastMessageRef} />
            </div>
          )
        )} */}
        <p>{localStorage.getItem("userId")}</p>


        {oMessage.map((message) => {
          message.sender_id === localStorage.getItem("userId") ? (< div className="message__chats" key={message.message_id} >
            <p className="sender__name">You</p>
            <div className="message__sender">
              <p>{message.sender_id}</p>
            </div>
          </div>) : (<div className="message__chats" key={message.id}>
            <p >{message.name}</p> <br />
            <div className="message__recipient">
              <p>{message.message}</p>

            </div>
          </div>)
        })}


        {/* {oMessage.map((message) => {
          const isCurrentUser = message.sender_id === localStorage.getItem("userId");
          const key = isCurrentUser ? message.message_id : message.id;
          const senderName = isCurrentUser ? "You" : message.name;

          return (
            <div className="message__chats" key={key}>
              <p className="sender__name">{senderName}</p>
              <div className={isCurrentUser ? "message__sender" : "message__recipient"}>
                <p>{message.message}</p>
              </div>
            </div>
          );
        })} */}


        {/* <ul>
          {oMessage.map(message => (
            <li key={message.id}>{message.message}</li>

          ))}
        </ul> */}

        {/* Pagination controls */}
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage}>Next</button>

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
