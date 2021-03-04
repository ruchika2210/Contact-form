import React, { useState } from "react";
import "../App.css";
import { db } from "../firebase";
import firebase from "firebase";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    firebase.auth().settings.appVerificationDisabledForTesting = true;

    var phoneNumber = setPhone;
    var testVerificationCode = "123456";

    // This will render a fake reCAPTCHA as appVerificationDisabledForTesting is true.
    // This will resolve after rendering without app verification.
    var appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    // signInWithPhoneNumber will call appVerifier.verify() which will resolve with a fake
    // reCAPTCHA response.
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        return confirmationResult.confirm(testVerificationCode);
      })
      .catch(function (error) {
        console.log("error occured");
      });

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
        <h1>Contact Form </h1>

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
