import React, { useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import "../../css/customer/customerpackages.css";
import PackageCard from "../../componets/PackageCard";
import { Axios_packages, Axios_bill } from "../../api/Axios";
import * as API_ENDPOINTS from "../../api/ApiEndpoints";
import StripeCard from "../../componets/StripeCard";
import * as ToastMessages from "../../componets/ToastMessages";
import Toast from "../../componets/Toast";
import { useSelector } from "react-redux";
export default function CustomerPackages() {
  const userid = localStorage.getItem("user_id");
  // const userid = useSelector((state) => state.UserReducer.id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checked, setChecked] = useState("All");
  const [packages, setPackages] = useState("");
  const [allPackages, setAllPackages] = useState("");
  const [amount, setAmount] = useState();
  const [id, setId] = useState();
  const package_names = [
    {
      name: "All",
    },
    {
      name: "Voice",
    },
    {
      name: "Data",
    },
  ];
  useEffect(() => {
    try {
      Axios_packages.get(API_ENDPOINTS.GET_ALL_PACKAGES).then((response) => {
        // console.log(response.data);
        setPackages(response.data);
        setAllPackages(response.data);
      });
    } catch (error) {
      console.error("Error executing query:", error);
    }
  }, []);

  const activate = () => {
    console.log("Hello");
  };
  const handleSubmit = (name) => {
    if (name == "All") {
      const newArr = allPackages.filter((item) => item);
      setPackages(newArr);
    } else if (name == "Data") {
      const newArr = allPackages.filter((item) => item.type == "data");
      setPackages(newArr);
    } else if (name == "Voice") {
      const newArr = allPackages.filter((item) => item.type == "voice");
      setPackages(newArr);
    }
    //console.log(name);
    setChecked(name);
  };
  const openModal = (id, price) => {
    setId(id);
    setAmount(price);
    setIsModalVisible(!isModalVisible);
  };
  const addToBill = (id, price) => {
    Axios_packages.post(API_ENDPOINTS.ACTIVATE_PACKAGE, {
      user: userid,
      id: id,
    }).then((response_2) => {
      Axios_bill.post(API_ENDPOINTS.ADD_TO_BILL, {
        user: userid,
        amount: price,
      }).then((response) => {

        if (response.data == "success") {
          ToastMessages.success("Package added to bill");
        }
      });
    });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "45vw",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <div className="radioButtonRow">
        {package_names.map((item) => (
          <div
            key={item.name}
            style={
              checked == item.name
                ? {
                    backgroundImage:
                      "linear-gradient(90deg, #3229d4 20%, #0096c7 100%)",
                    borderColor: "#3229d4",
                    borderStyle: "solid",
                    borderWidth: "1px",
                  }
                : { backgroundColor: "#3229d4" }
            }
            className="RadioButton"
            onClick={() => handleSubmit(item.name)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="packageContainer">
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
              <tr style={{ padding: "20px" }}>
                <th>Name</th>
                <th>Description</th>
                <th>Data limit</th>
                <th>Voice limit</th>
                <th>SMS limit</th>
                <th>Price</th>
                <th>State</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {packages.length > 0 ? (
                packages &&
                packages.map((item) => (
                  <tr key={item.package_id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.data_limit ? item.data_limit : "-"}</td>
                    <td>{item.voice_limit ? item.voice_limit : "-"}</td>
                    <td>{item.sms_limit ? item.sms_limit : "-"}</td>
                    <td>{item.price}</td>
                    <td>
                      <div
                        onClick={() => openModal(item.package_id, item.price)}
                        className="packageBuyButton"
                      >
                        Activate
                      </div>
                    </td>
                    <td>
                      <div
                        onClick={() => addToBill(item.package_id, item.price)}
                        className="packageBuyButton"
                        style={{ backgroundColor: "tomato" }}
                      >
                        Add to bill
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr style={{ fontSize: "18px", height: "370px" }}>
                  <td></td>
                  <td></td>
                  <td>No Packages Available</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Modal
          onClose={() => setIsModalVisible(!isModalVisible)}
          open={isModalVisible}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                backgroundColor: "white",
                width: "40vw",
                height: "17vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div className="processingtext">
                Processing <span className="rstext">RS.{amount}</span>
              </div>
              <StripeCard amount={amount} id={id} />
            </div>
          </Box>
        </Modal>
        {/* {checked == 'All' ? (
					<>
						<PackageCard type='type8' title='Work and learn' data={work_and_learn_packages} fun={activate} />
						<PackageCard type='type28' title='Unlimited' data={unlimited_packages} fun={activate} />
					</>
				) : checked == 'Work and learn' ? (
					<PackageCard type='type2' title='Work and learn' data={work_and_learn_packages} fun={activate} />
				) : checked == 'Unlimited' ? (
					<PackageCard type='type2' title='Unlimited' data={unlimited_packages} fun={activate} />
				) : (
					<></>
				)} */}
      </div>
      <Toast duration={3000} />
    </div>
  );
}
