import React, {useEffect, useState} from 'react';
import '../../css/staff/staff.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Axios_packages, Axios_user} from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
export default function AdminPackages() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [name, setName] = useState('');
	const [contact, setContact] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [users, setUsers] = useState('');
    const [state, setState]  = useState('');
    const [dataToView, setDataToView] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const [needReRender, setNeedReRender] = useState(false);
    

    const [isViewModelVisible, setIsViewModelVisible] = useState(false);
    const [showCustomerIndex, setShowCustomerIndex] = useState(0);

	let index = 0;

      useEffect(() => {
        Axios_user.get(API_ENDPOINTS.GET_CUSTOMERS_URL).then((response) => {
          setUsers(response.data);
          console.log(response.data);
        });
      }, [needReRender]);

      useEffect(() => {
        setName(dataToView?.name);
        setContact(dataToView?.contact_no);
        setEmail(dataToView?.email);
        setState(dataToView?.state);
        setCustomerId(dataToView?.id);
      }, [dataToView]);

	const handleSubmit = () => {
        Axios_user.post(API_ENDPOINTS.ADD_CUSTOMER_URL, {
            name: name,
            email: email,
            password: password,
            contact_no: contact,
        }).then((response) => {
			console.log(response);
			closeModal();
        });
    };

    const handleUpdateSubmit = () => {
        Axios_user.post(API_ENDPOINTS.UPDATE_CUSTOMER_URL, {
            name: name,
            email: email,
            contact_no: contact,
            state: state,
            id: customerId,
        }).then((response) => {
            console.log(response);
            closeViewModel();
        });
    };

	const style = {
		position: 'absolute',
		top: '50%',
		left: '45vw',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		boxShadow: 24,
	};
	const closeModal = () => {
		setIsModalVisible(!setIsModalVisible);
		setName('');
		setContact("");
		setEmail("");
		setPassword("");
        setNeedReRender(!needReRender);
	};
    const closeViewModel = () => {
        setIsViewModelVisible(!setIsViewModelVisible);
        setName('');
		setContact("");
		setEmail("");
        setState("");
        setDataToView(null);
        setCustomerId(null);
        setNeedReRender(!needReRender);
    };
	return (
        <div
            className="adminPackages"
            style={{
                width: "100%",
                paddingTop: "18px",
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
                    <div
                        style={{
                            backgroundColor: "white",
                            width: "40vw",
                            height: "40vw",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: "50px",
                        }}
                    >
                        <div
                            className="addNewPackageTitle"
                            style={{
                                display: "flex",
                                height: "7%",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                                paddingBottom: "25px",
                            }}
                        >
                            Customer registration form
                        </div>
                        <div
                            className="adminPackagerow"
                            style={{
                                marginTop: "-20px",
                            }}
                        >
                            <input
                                placeholder="Name*"
                                className="adminPackageInput"
                                type="text"
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                value={name}
                                required
                            ></input>
                            {/* <label className='adminPackagePlaceholder'>User name*</label> */}
                        </div>

                        <div className="adminPackagerow">
                            <input
                                placeholder="Email*"
                                className="adminPackageInput"
                                type="email"
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                value={email}
                                required
                            ></input>
                            {/* <label className='adminPackagePlaceholder'>Price*</label> */}
                        </div>

                        <div className="adminPackagerow">
                            <input
                                placeholder="Contact Number*"
                                className="adminPackageInput"
                                type="text"
                                onChange={(event) =>
                                    setContact(event.target.value)
                                }
                                value={contact}
                                required
                            ></input>
                            {/* <label className='adminPackagePlaceholder'>Price*</label> */}
                        </div>

                        <div className="adminPackagerow">
                            <input
                                placeholder="Password*"
                                className="adminPackageInput"
                                type="password"
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                value={password}
                                required
                            ></input>
                            {/* <label className='adminPackagePlaceholder'>Price*</label> */}
                        </div>

                        <div
                            className="adminPackageAddButton"
                            style={{
                                height: "10%",
                                width: "40%",
                                color: "white",
                                marginTop: "40px",
                            }}
                            onClick={handleSubmit}
                        >
                            Add
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal
                onClose={closeViewModel}
                open={isViewModelVisible}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div
                        style={{
                            backgroundColor: "white",
                            width: "40vw",
                            height: "40vw",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: "50px",
                        }}
                    >
                        <div
                            className="addNewPackageTitle"
                            style={{
                                display: "flex",
                                height: "7%",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                                paddingBottom: "25px",
                            }}
                        >
                            Customer Details Form
                        </div>
                        <div
                            className="adminPackagerow"
                            style={{
                                marginTop: "-20px",
                            }}
                        >
                            <input
                                placeholder="Name*"
                                className="adminPackageInput"
                                type="text"
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                value={name}
                                required
                            ></input>
                            {/* <label className='adminPackagePlaceholder'>User name*</label> */}
                        </div>

                        <div className="adminPackagerow">
                            <input
                                placeholder="Email*"
                                className="adminPackageInput"
                                type="email"
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                value={email}
                                required
                            ></input>
                            {/* <label className='adminPackagePlaceholder'>Price*</label> */}
                        </div>

                        <div className="adminPackagerow">
                            <input
                                placeholder="Contact Number*"
                                className="adminPackageInput"
                                type="text"
                                onChange={(event) =>
                                    setContact(event.target.value)
                                }
                                value={contact}
                                required
                            ></input>
                            {/* <label className='adminPackagePlaceholder'>Price*</label> */}
                        </div>

                        <div className="adminPackagerow">
                        <select
                            style={{width: "100%"}}
                            className="adminPackageInput"
                            onChange={(event) => setState(event.target.value)}
                            value={state}
                            required
                        >
                            <option value="verified">verified</option>
                            <option value="unverified">unverified</option>
                        </select>
                            {/* <label className='adminPackagePlaceholder'>Price*</label> */}
                        </div>

                        <div
                            className="adminPackageAddButton"
                            style={{
                                height: "10%",
                                width: "40%",
                                color: "white",
                                marginTop: "40px",
                            }}
                            onClick={handleUpdateSubmit}
                        >
                            Update
                        </div>
                    </div>
                </Box>
            </Modal>

            {/* ====================================================================== */}
            {/* ====================================================================== */}
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
                    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                    paddingTop: "10px",
                }}
            >
                <table class="admin-styled-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map((element) => (
                                
                                <tr class="active-row">
                                    
                                    <td>{element.name}</td>
                                    <td>
                                        {element.contact_no
                                            ? element.contact_no
                                            : "----------"}
                                    </td>
                                    <td>{element.email}</td>
                                    <td>
                                        {element.state === "verified"
                                            ? "verified"
                                            : "unverified"}
                                    </td>
                                    <td>
                                        <center>
                                            <button
                                                style={{
                                                    height: "40px",
                                                    width: "150px",
                                                    backgroundColor: "#f0c14b", // Softer yellow background
                                                    border: "1px solid #a88734", // Subtle border for contrast
                                                    borderRadius: "7px",
                                                    cursor: "pointer",
                                                    fontSize: "16px", // Larger font size for readability
                                                    color: "#333", // Darker text for contrast
                                                    
                                                    transition: "background-color 0.3s ease, transform 0.2s ease", // Smooth hover transition
                                                  }}
                                                  onMouseOver={(e) => {
                                                    e.target.style.backgroundColor = "#ddb347"; // Darker yellow on hover
                                                    e.target.style.transform = "translateY(-3px)"; // Slight lift on hover
                                                    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Add shadow on hover
                                                  }}
                                                  onMouseOut={(e) => {
                                                    e.target.style.backgroundColor = "#f0c14b"; // Revert to original color
                                                    e.target.style.transform = "translateY(0px)"; // Remove lift
                                                    e.target.style.boxShadow = "none"; // Remove shadow
                                                  }}
                                                  onMouseDown={(e) => {
                                                    e.target.style.backgroundColor = "#c2922b"; // Darker yellow when clicked
                                                    e.target.style.transform = "translateY(1px)"; // Pressed effect
                                                  }}
                                                  onMouseUp={(e) => {
                                                    e.target.style.backgroundColor = "#ddb347"; // Revert hover color on mouse release
                                                    e.target.style.transform = "translateY(-3px)"; // Back to hover lift
                                                  }}
                                                  onClick={() => {
                                                    setIsViewModelVisible(!isViewModelVisible); // Toggle modal visibility
                                                    console.log("Selected element:", element); // Log the selected element
                                                    setDataToView(element); // Set the clicked element into state
                                                }}
                                            >
                                                View
                                            </button>
                                        </center>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
