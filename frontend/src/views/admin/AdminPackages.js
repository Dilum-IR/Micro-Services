import React, { useEffect, useState } from "react";
import "../../css/admin/admin.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import * as API_ENDPOINTS from "../../api/ApiEndpoints";

export default function AdminPackages() {
  const [details, setDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dataLimit, setDataLimit] = useState("");
  const [voiceLimit, setVoiceLimit] = useState("");
  const [smsLimit, setSmsLimit] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("all");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const handleSubmit = () => {
    Axios_packages.post(API_ENDPOINTS.ADD_PACKAGE_URL, {
      name,
      description,
      data: dataLimit,
      voice: voiceLimit,
      sms: smsLimit,
      type,
      price,
    }).then((res) => {
        closeModal();
        Axios_notifications.post(API_ENDPOINTS.ADD_NOTIFICATION, {
          name,
          description,
          type:"New Package",
        });
        getPackageDetails();
      })
      .catch((error) => {
        console.error("Error adding package:", error);
      });
  };
  const closeModal = () => {
    setIsModalVisible(false);
    setName("");
    setDescription("");
    setDataLimit("");
    setVoiceLimit("");
    setSmsLimit("");
    setPrice("");
  };

  async function getPackageDetails() {
    const res = await Axios_packages.get(API_ENDPOINTS.GET_PACKAGE_URL);
    setDetails(res.data);
  }
  useEffect(() => {
    getPackageDetails();
  }, []);

  console.log(details);

  // setName('');
  // setPrice('');
  // setDataLimit('');
  // setDescription('');
  // setVoiceLimit('');
  // setSmsLimit('');

  const setOption = (value) => {
    if (value == "data") {
      setVoiceLimit("");
      setSmsLimit("");
      setType(value);
    } else if (value == "voice") {
      setDataLimit("");
      setType(value);
    } else if (value == "all") {
      setType(value);
    }
  };

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
        <div
          className="adminPackageAddButton"
          style={{ backgroundColor: "#45a049", color: "white" }}
          onClick={() => setIsModalVisible(!isModalVisible)}
        >
          Add
        </div>
      </div>
      <Modal
        onClose={closeModal}
        open={isModalVisible}
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
            Add New Package
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Package Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Type of Package</Typography>
              <RadioGroup
                row
                value={type}
                onChange={(event) => setOption(event.target.value)}
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel
                  value="data"
                  control={<Radio />}
                  label="Data"
                />
                <FormControlLabel
                  value="voice"
                  control={<Radio />}
                  label="Voice"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Data Limit"
                value={dataLimit}
                onChange={(event) => setDataLimit(event.target.value)}
                disabled={type === "voice"}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Voice Limit"
                value={voiceLimit}
                onChange={(event) => setVoiceLimit(event.target.value)}
                disabled={type === "data"}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="SMS Limit"
                value={smsLimit}
                onChange={(event) => setSmsLimit(event.target.value)}
                disabled={type === "data"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#45a049",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#388E3C",
                  },
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "#d32f2f",
                  color: "#d32f2f",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                    color: "white",
                  },
                  ml: 2,
                }}
                onClick={closeModal}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
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
        <table class="admin-styled-table">
          <thead>
            <tr>
              <th style={{ backgroundColor: "#009879", color: "white" }}>
                Name
              </th>
              <th style={{ backgroundColor: "#009879", color: "white" }}>
                Description
              </th>
              <th style={{ backgroundColor: "#009879", color: "white" }}>
                Data limit
              </th>
              <th style={{ backgroundColor: "#009879", color: "white" }}>
                Voice limit
              </th>
              <th style={{ backgroundColor: "#009879", color: "white" }}>
                SMS limit
              </th>
              <th style={{ backgroundColor: "#009879", color: "white" }}>
                Price
              </th>
            </tr>
          </thead>

          <tbody>
            {details.map((d) => (
              <tr key={d.package_id}>
                <td>{d.name}</td>
                <td>{d.description}</td>
                <td>
                  {d.data_limit === null ? <p>-</p> : <p>{d.data_limit}</p>}
                </td>
                <td>
                  {d.voice_limit === null ? <p>-</p> : <p>{d.voice_limit}</p>}
                </td>
                <td>
                  {d.sms_limit === null ? <p>-</p> : <p>{d.sms_limit}</p>}
                </td>
                <td>{d.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
