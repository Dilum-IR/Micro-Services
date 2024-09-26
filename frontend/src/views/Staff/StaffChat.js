import React from 'react';
import sendImg from "../../assets/images/send.svg";

export default function StaffChat() {
  return (
    <div
      style={{
        width: "70%",
        height: "85%",
        margin: "auto",
        marginTop: "3%",
        backgroundColor: "#e0f7fa", // Lighter background for a clean look
        borderRadius: "15px", // Smoother corners
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        display: "flex",
        flexDirection: "column", // Allows vertical stacking
        justifyContent: "flex-end",
        padding: "20px", // Added padding inside
      }}
    >
      {/* Chat input box */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff", // White input box
          borderRadius: "30px", // Rounded edges for input box
          padding: "10px 20px", // More padding inside the box
          width: "95%",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        {/* Input field */}
        <input
          placeholder="Type a message..."
          type="text"
          style={{
            flex: 1, // Takes full width of available space
            height: "40px", // Taller input box
            border: "none", // Remove default input border
            outline: "none", // Remove focus outline
            fontSize: "18px", // Smaller font size for readability
            paddingLeft: "10px", // Padding for text inside input
            color: "#333", // Darker text color
            borderRadius: "20px",
          }}
        />

        {/* Send icon */}
        <img
          src={sendImg}
          alt="Send"
          style={{
            width: "30px", // Smaller, proportional size
            height: "30px",
            cursor: "pointer",
            marginLeft: "10px", // Spacing between input and icon
            transition: "transform 0.2s", // Smooth hover effect
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")} // Slight zoom on hover
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")} // Back to normal
        />
      </div>
    </div>
  );
}

