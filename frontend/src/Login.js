import React, { useState } from "react";

const App = ({ updateLogin }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerBirthDate, setRegisterBirthDate] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login request with:", { email, password });
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);
      if (!response.ok) {
        console.error("Response not OK:", response.statusText);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.token) {
        const token = data.token; // Extract token from response
        const userId = data.userId; // Extract userId from response

        // Save token in localStorage
        localStorage.setItem("token", token);
        console.log("Token saved:", token);
        console.log("User ID:", userId);

        // Update login state and navigate to chat
        updateLogin(true);
        setIsLoggedIn(true); // Set the logged-in state to true
        setShowLoginPopup(false); // Close the login popup
      } else {
        console.error("Autentificarea a eșuat!"); // Romanian message for failed login
      }
    } catch (error) {
      console.error("Eroare de rețea:", error); // Romanian message for network error
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      console.log("Sending register request with:", {
        name: registerUsername,
        password: registerPassword,
        email: registerEmail,
        birth_date: registerBirthDate,
      });
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerUsername,
          password: registerPassword,
          email: registerEmail,
          birth_date: registerBirthDate,
        }),
      });

      console.log("Response status:", response.status);
      if (!response.ok) {
        console.error("Response not OK:", response.statusText);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.token) {
        const token = data.token; // Extract token from response
        const userId = data.userId; // Extract userId from response

        // Save token in localStorage
        localStorage.setItem("token", token);
        console.log("Token saved:", token);
        console.log("User ID:", userId);

        // Update login state and navigate to chat
        updateLogin(true);
        setIsLoggedIn(true); // Set the logged-in state to true
        setShowRegisterPopup(false); // Close the register popup
      } else {
        console.error("Înregistrarea a eșuat!"); // Romanian message for failed registration
      }
    } catch (error) {
      console.error("Eroare de rețea:", error); // Romanian message for network error
    }
  };

  return (
    <div>
      {!isLoggedIn && (
        <>
          <button
            className="btn-add"
            style={{ marginTop: "5px" }}
            onClick={() => setShowLoginPopup(true)}
          >
            Login
          </button>
          <button
            className="btn-add"
            style={{ marginTop: "5px" }}
            onClick={() => setShowRegisterPopup(true)}
          >
            Register
          </button>
        </>
      )}

      {showLoginPopup && (
        <div style={popupStyle}>
          <div style={overlayStyle} onClick={() => setShowLoginPopup(false)} />
          <div style={popupInnerStyle}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label>
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              </div>
              <button type="submit" style={{ marginTop: "5px" }}>
                Login
              </button>
              <button
                type="button"
                style={{ marginTop: "5px" }}
                onClick={() => setShowLoginPopup(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showRegisterPopup && (
        <div style={popupStyle}>
          <div
            style={overlayStyle}
            onClick={() => setShowRegisterPopup(false)}
          />
          <div style={popupInnerStyle}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <div>
                <label>
                  Username:
                  <input
                    type="text"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Email:
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Birth Date:
                  <input
                    type="date"
                    value={registerBirthDate}
                    onChange={(e) => setRegisterBirthDate(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Password:
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Confirm Password:
                  <input
                    type="password"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    required
                  />
                </label>
              </div>
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
              <button type="submit" style={{ marginTop: "5px" }}>
                Register
              </button>
              <button
                type="button"
                style={{ marginTop: "5px" }}
                onClick={() => setShowRegisterPopup(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const popupStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
};

const popupInnerStyle = {
  position: "relative",
  padding: "20px",
  background: "white",
  borderRadius: "10px",
  zIndex: 1001,
};

export default App;
