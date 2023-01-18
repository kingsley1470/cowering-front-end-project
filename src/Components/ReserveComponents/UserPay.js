import React from "react";
import { useState} from "react";
import { useForm } from "react-hook-form";
import { Link,useNavigate} from "react-router-dom";
import axios from "axios";

import { FieldSet, InputField } from "fannypack";
import { usePaymentInputs } from "react-payment-inputs";
import { useBookContext } from '../../context/BookContext';
import { useSpaceContext } from '../../context/SpaceContext';

import emailjs from 'emailjs-com';

const UserPay = () => {
  const userId=localStorage.getItem('userId');
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();
  const { erroredInputs, touchedInputs } = meta;

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const navigate=useNavigate();

  const {formDetails}= useBookContext();
  const {selectedSpace,fromDate,toDate,fromTime,toTime,dateDiff}= useSpaceContext();

  const serviceId=process.env.REACT_APP_Mail_Service_Id;
  const templateId=process.env.REACT_APP_Mail_Template_Id;
  const mailUser=process.env.REACT_APP_Mail_User;
  const REACT_APP_API_BACKEND=process.env.REACT_APP_API_BACKEND;


  const handleSendEmail = () => {
    saveBooking(); 
    emailjs.send(serviceId, templateId, {
     to_email:formDetails.email, 
     to_name:formDetails.fullname,
     subject: 'Confirmation Mail', 
    message: ` Your booking has confirmed. \n You have booked ${selectedSpace.title} from ${fromDate} to ${toDate}\n Thanks for booking with CoWo Team.\n\n   `}, 
    mailUser)
   .then((result) => {
       console.log(result.text);
     }, (error) => {
       console.log(error.text);
     });
   }

  const saveBooking = async() =>{
    try {
      const { data } = await axios.post('http://localhost:3100/booking',{
     spaceId:selectedSpace.spaceid,  
     userId:userId,
     fromDate:fromDate,
     toDate:toDate,
     fromTime:fromTime,
     toTime:toTime,
     dateDiff:dateDiff
      });
       console.log(data) 
    }catch(err){
      console.log(err)
    }  
  }


  return (
    <div className="paymentSelection-payM">
      <div>
        <Link className="back-link" onClick={() => navigate(-1)}>
          <img
            alt="back-arrow-icon"
            src={require("../../icons/orange-arrow.png")}
          />
          <span>Go back</span>
        </Link>
      </div>
      <div className="payM-wrapper">
        <div className="inputForm">
          <div className="payM">
            {" "}
            <h1>Payment selection</h1>
          </div>
          <div className="input-wrape">
            <form
              onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
            >
              <h6>Payment method</h6>
              <input
              required
                className="form-2"
                style={{
                  height: "44px",
                  width: "450px",
                }}
                {...register("payment method")}
                placeholder="Visa"
              />
              <br></br>
              <h6>Name</h6>
              <input
                required
                className="form-2"
                style={{
                  height: "44px",
                  width: "450px",
                }}
                {...register("name")}
                placeholder="name    surname"
              />

              <div className="visa-card">
                <FieldSet>
                  <h6>Card number</h6>
                  <InputField
                    // Here is where React Payment Inputs injects itself into the input element.
                    {...getCardNumberProps()}
                    placeholder="xxxx xxxx xxxx xxxx"
                    // label="Card number"
                    inputRef={getCardNumberProps().ref}
                    // You can retrieve error state by making use of the error & touched attributes in `meta`.
                    state={
                      erroredInputs.cardNumber && touchedInputs.cardNumber
                        ? "danger"
                        : undefined
                    }
                    validationText={
                      touchedInputs.cardNumber && erroredInputs.cardNumber
                    }
                    maxWidth="750px" background="#FFFFFF"
                  />

        

                  <div className="expiry-cvc">
                   
                    <InputField
                    required
                      {...getExpiryDateProps()}
                      label="Expiry"
                      inputRef={getExpiryDateProps().ref}
                      state={
                        erroredInputs.expiryDate && touchedInputs.expiryDate
                          ? "danger"
                          : undefined
                      }
                      validationText={
                        touchedInputs.expiryDate && erroredInputs.expiryDate
                      }
                      maxWidth="8rem" 
                    />

                    <div className="cvv">
                      <InputField
                        {...getCVCProps()}
                        required
                        placeholder="123"
                        label="CVC"
                        inputRef={getCVCProps().ref}
                        state={
                          erroredInputs.cvc && touchedInputs.cvc
                            ? "danger"
                            : undefined
                        }
                        validationText={touchedInputs.cvc && erroredInputs.cvc}
                        maxWidth="5rem" 
                      />
                    </div>
                  </div>
                </FieldSet>
              </div>
<div className="form-sub">
              <button
                className="form-2"
                style={{
                  height: "44px",
                  width: "200px",
                  background: "#FF7848",
                }}
                type="submit"
              >
                <Link to="/thank-you" onClick={handleSendEmail}>Complete</Link>
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPay;
