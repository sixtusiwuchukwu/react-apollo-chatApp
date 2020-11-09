import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import "../styles/group.css";

const GetChat = gql`
  query getAllchat {
    getPost {
      username
      message
    }
  }
`;

function Group() {
  const [message, Setmessage] = useState("");
  const [User, SetUser] = useState("");
  const [chat, Setchat] = useState([
    {
      sender: "emeka",
      message: "how are you doing",
      time: "2020-07-18",
    },
    {
      sender: "sixtus",
      message: "how are you doing",
      time: "2020-07-18",
    },
  ]);

  // const GetChats = async () => {

  //   await Setchat([...chat, data]);
  //   console.log(chat, "from sever");
  // };

  const GetUser = () => {
    SetUser(JSON.parse(localStorage.getItem("user")));
  };

  function scrollToBottom() {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  const FormatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return day + "-" + month + "-" + year;
  };

  useEffect(() => {
    GetUser();
    GetChats();
  }, [message]);

  const HandleSubmit = (e) => {
    e.preventDefault();

    Setchat([
      ...chat,
      {
        sender: User,
        message: message,
        time: FormatDate(new Date()),
      },
    ]);
    Setmessage("");
    scrollToBottom();
  };

  const HandleChange = (e) => {
    e.preventDefault();
    Setmessage(e.target.value);
  };

  if (loading) return <h2>loading...</h2>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div className="group-container">
      <div className="content-container">
        {chat.map((message, key) => (
          <div className={message.sender === User ? "right" : "left"} key={key}>
            <span className="sender">{message.sender}</span>
            <p className="message">{message.message}</p>
            <span className="time">{message.time}</span>
          </div>
        ))}

        <div className="message-input">
          <input
            onChange={HandleChange}
            type="text"
            value={message}
            placeholder="Enter Message"
          />
          <button onClick={HandleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Group;
