import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     socket.on('userJoined', ({ userId, name }) => {
    //         setUsers(prevUsers => [...prevUsers, { userId, name }]);
    //     });
    // }, [socket,]);

    useEffect(() => {
        socket.on("userJoined", data => setUsers(data))
        return () => {
            socket.off("userJoined");
        };

    }, [socket])

    console.log(users);
    return (
        <div className="chat__sidebar">
            <h2>Open Chat</h2>
            <div>
                <h4 className="chat__header">ACTIVE USERS</h4>
                <div className="chat__users">
                    {users.map(user => <p key={user.socketID}>
                        {user.data.name}</p>)}
                </div>
            </div>
        </div>
    );
};

ChatBar.propTypes = {
    socket: PropTypes.object.isRequired, // Define PropTypes for the socket prop
};

export default ChatBar;












// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';

// const ChatBar = ({ socket }) => {
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         socket.on('newUserResponse', (data) => setUsers(data));
//     }, [socket, users]);


//     return (
//         <div className="chat__sidebar">
//             <h2>Open Chat</h2>
//             <div>
//                 <h4 className="chat__header">ACTIVE USERS</h4>
//                 <div className="chat__users">
//                     {users.map((user) => (
//                         <p key={user.socketID}>{user.userName}</p>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };
// ChatBar.propTypes = {
//     socket: PropTypes.object.isRequired, // Define PropTypes for the socket prop
//     // messages: PropTypes.object.isRequired
// };

// export default ChatBar;

