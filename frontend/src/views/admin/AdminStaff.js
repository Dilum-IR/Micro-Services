import React, { useEffect, useState } from "react";
import "../../css/admin/admin.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Axios_user } from "../../api/Axios";
import * as API_ENDPOINTS from "../../api/ApiEndpoints";

export default function AdminStaff() {
  const [details, setDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactno] = useState("");
  const [type] = useState("Staff");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "15px",
    p: 4,
    minWidth: "320px",
    maxWidth: "500px",
    background: "linear-gradient(135deg, #ffffff, #e8f5e9)",
  };

  const handleSubmit = () => {
    Axios_user.post(API_ENDPOINTS.ADD_STAFF_URL, {
      name,
      email,
      contactNo,
      type,
    })
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding staff:", error);
      });
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setName("");
    setEmail("");
    setContactno("");
  };

  useEffect(() => {
    async function getStaffDetails() {
      const res = await Axios_user.get(API_ENDPOINTS.GET_STAFF_URL);
      setDetails(res.data);
    }
    getStaffDetails();
  }, []);

  return (
    <div
      className="adminPackages"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        className="adminPackagesTopRow"
        style={{
          width: "90%",
          height: "12%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#45a049",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "8px 16px",
            "&:hover": {
              backgroundColor: "#388E3C",
            },
          }}
          onClick={() => setIsModalVisible(true)}
        >
          Add Staff
        </Button>
      </div>

      <Modal
        open={isModalVisible}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              color: "#45a049",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            Staff Registration Form
          </Typography>

          <TextField
            label="Name*"
            fullWidth
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
          <TextField
            label="Email*"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
          <TextField
            label="Contact No*"
            fullWidth
            margin="normal"
            variant="outlined"
            value={contactNo}
            onChange={(event) => setContactno(event.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              sx={{
                borderRadius: "10px",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#d32f2f",
                  color: "white",
                },
              }}
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: "#45a049",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#388E3C",
                },
              }}
              onClick={handleSubmit}
            >
              Add Staff
            </Button>
          </Box>
        </Box>
      </Modal>

      <div
        className="adminPackagesBottomRow"
        style={{
          width: "90%",
          height: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "hidden",
          tableLayout: "fixed",
        }}
      >
        <table className="admin-styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No</th>
            </tr>
          </thead>
          <tbody>
            {details.map((d) => (
              <tr key={d.staff_id}>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.contact_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
