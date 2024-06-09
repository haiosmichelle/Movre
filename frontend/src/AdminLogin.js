import React, { useState } from "react";

export default function AdminLogin({ updateLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Extract token from response

        // Save token in localStorage
        localStorage.setItem("adminToken", token);
        console.log(token);

        // Update login state and set admin status
        updateLogin(true, true);
        setShowPopup(false); // Close the pop-up on successful login
      } else {
        console.error("Autentificarea admin a eșuat!");
      }
    } catch (error) {
      console.error("Eroare de rețea:", error);
    }
  };

  return (
    <div>
      <button
        className="btn-add"
        style={{ marginTop: "5px" }}
        onClick={() => setShowPopup(true)}
      >
        Admin Login
      </button>

      {showPopup && (
        <div style={popupStyle}>
          <div style={overlayStyle} onClick={() => setShowPopup(false)} />
          <div style={popupInnerStyle}>
            <h2>Admin Login</h2>
            <form onSubmit={handleAdminLogin}>
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
                Admin Login
              </button>
              <button
                type="button"
                style={{ marginTop: "5px" }}
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

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
