import React, { useState } from "react";
import "../App.css";
import { db } from "../firebase";
// import firebase from "firebase";
// import "firebase/auth";


const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    // let number = phone;
    // firebase.auth.signInWithPhonenumber(number, recaptcha).then((e) => {
    //   let code = prompt("Enter the otp");
    //   if (code == null) return;
    //   e.confirm(code)
    //     .then((result) => {
    //       console.log(result.user, "user");
    //       document.querySelector(
    //         "button"
    //       ).textContent = `${result.user}Number verified`;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }).catch(error=> {
    //     console.log(error)
    // });
    setLoader(true);

    db.collection("contacts")
      .add({
        name: name,
        email: email,
        phone: phone,
        message: message,
        address: address,
      })
      .then(() => {
        alert("Message has been submited");
        setLoader(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setAddress("");
  };

  return (
    <div className="dir">
      <form className="form" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Contact Form </h1>

        <label>Name</label>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <lable>Email</lable>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phone</label>
        <input
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Message</label>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <lable>Address</lable>
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <lable></lable>
        <button
          type="submit"
          style={{ background: loader ? "#ccc" : "rgb(2,2,110)" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
