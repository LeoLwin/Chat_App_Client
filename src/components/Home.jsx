import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from "axios";


const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({})

  const login = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        loginData
      );
      // console.log("user_Id", res.data.user.id)
      localStorage.setItem("user", res.data.user.name)
      localStorage.setItem("userid", res.data.user.id)
      socket.emit("joinRoom", { socketID: socket.id, data: res.data.user }); // Emit joinRoom event
      navigate("/chat");
    } catch (error) {
      return (error);
    }
  }


  const handleChange = (e) => {
    const data = {
      ...loginData,
      [e.target.name]: e.target.value,
    };
    console.log(data);
    setLoginData(data);
  };


  return (
    <form className="home__container" >
      <h2 className="home__header">Sign in to Open Chat</h2>

      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="name"
        id="username"
        className="username__input"
        onChange={handleChange}
      />
      <label htmlFor="username">Password</label>
      <input
        type="text"
        name="password"
        id="username"
        className="username__input"
        onChange={handleChange} />

      <button className="home__cta" onClick={login}>SIGN IN</button>
    </form>
  );
};
Home.propTypes = {
  socket: PropTypes.object.isRequired, // Define PropTypes for the socket prop
};
export default Home;
