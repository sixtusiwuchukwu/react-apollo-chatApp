import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";

import "../styles/group.css";
import Loader from "./loader";

const GetChat = gql`
  query getAllchat {
    getPost {
      username
      message
    }
  }
`;

const Postmessage = gql`
  mutation newMessage($username: String!, $message: String!) {
    addPost(data: { username: $username, message: $message }) {
      username
      message
      _id
    }
  }
`;

const NEW_POST_SUBSCRIBE = gql`
  subscription newusersub {
    newPost {
      username
      message
    }
  }
`;

function Group() {
  const { error, loading, data } = useQuery(GetChat);
  const [newMessage, { error1, loading1 }] = useMutation(Postmessage);

  const { data: newPost } = useSubscription(NEW_POST_SUBSCRIBE);

  const [message, Setmessage] = useState("");
  const [User, SetUser] = useState("");
  const [chat, Setchat] = useState([]);

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

    if (data) {
      if (data.getPost) {
        Setchat(data.getPost);
      }
    }
  }, [data]);
  // console.log(newUser);

  // const NewUser = () => {
  //   if (error) {
  //     console.log(error.message);
  //   }
  //   if (data && data.newUser) {
  //     // return <div>{data.newUser.username} just joined</div>;
  //     console.log(data.newUser.username);
  //   }
  // };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    Setchat([
      ...chat,
      {
        username: User,
        message: message,
        time: FormatDate(new Date()),
      },
    ]);
    await newMessage({
      variables: { username: User, message: message },
    });

    // let value = await newusersub;
    // console.log(value);
    // Setrealtime(true);

    Setmessage("");
    // if (newPost && newPost.newPost) {
    //   console.log(newPost.newPost, "first");
    // }

    // if (newPost) {
    console.log(newPost, "second");
    // }
    scrollToBottom();
  };

  const HandleChange = (e) => {
    e.preventDefault();
    Setmessage(e.target.value);
  };

  if (error) return <p>ERROR</p>;

  return (
    <div className="group-container">
      <div className="content-container">
        {loading ? (
          <Loader />
        ) : error1 ? (
          <h2>error</h2>
        ) : (
          chat &&
          chat.map((message, key) => (
            <div
              className={message.username === User ? "right" : "left"}
              key={key}
            >
              <span className="sender">{message.username}</span>
              <p className="message">{message.message}</p>
              <span className="time">{message.time}</span>
            </div>
          ))
        )}
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
