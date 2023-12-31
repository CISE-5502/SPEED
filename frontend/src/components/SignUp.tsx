"use client";
import React, {FormEvent, MouseEvent, useState} from "react";
import style from "../styles/LoginPage.module.css";

interface SignUpProps {
  toggleLogInState: (isClicked: boolean, e?: MouseEvent<HTMLDivElement>) => void;
  backgroundPressed: (isClicked: boolean, e?: React.MouseEvent) => void;
}

export default function SignUp(props: SignUpProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  async function signup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const accountType = document.querySelector(
      'input[name="accountType"]:checked'
    )?.id;

    try {
      const response = await fetch("https://speed-backend-seven.vercel.app/users/signup", {
        method: "POST",
        body: JSON.stringify({
          uname: username,
          email: email,
          password: password,
          radioOption: accountType,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const authorization = await response.text();
      console.log(authorization);
      props.toggleLogInState(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div
      className={style.background}
      onClick={(e) => props.backgroundPressed(true, e)}
    >
      <div className={style.signInFormContainer}>
        <form
          className={style.signInForm}
          onSubmit={signup}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={style.heading}>SPEED</div>
          <div className={style.subheading}>Sign Up</div>
          <input
            className={style.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            className={style.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className={style.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <div>
              <input type="radio" id="moderator" name="accountType" /> Moderator
              <br></br>
              <input type="radio" id="analyst" name="accountType" /> Analyst
            </div>
            <br></br>
            <div
              className={style.signUpButton}
              onClick={(e) => props.toggleLogInState(true, e)}
            >
              Log In
            </div>
            <button className={style.submitButton}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
