import React from "react";
import Space from "../../spaceData.json";
// import "./styleChangePass.css";
import { useState } from "react";
import { useSpaceContext } from '../../context/SpaceContext';
import ScrollToTopOnMount from "../../ScrollToTopOnMount";
function ReserveSpace() {

  const {toDate,fromDate,fromTime,toTime,selectedSpace,total}= useSpaceContext();
  

  let spaceComponent = (
    <div className="p4-space-wrapper-king">
                <ScrollToTopOnMount />
      <div className="space-wrape-sp">
        {" "}
        <h2>Reserve Space </h2>
      </div>

      <div className="space-wrapper-sp">
        {selectedSpace && (<>
          <div>
            <hr />
            <div className="p4-img-and-details-king" key={selectedSpace.spaceid}>
              <img src={selectedSpace.imgurl} alt="img"  className="p4-img-sp"/>
              <div className="p4-title-and-details-king">
          <div className="p4-title-and-details-king">

                <div className="p4-title">
                  <h4> {selectedSpace.title}</h4>
                </div>
                <div className="p4-address-city-country-king">
                  <img
                    src={require("../../icons/location-icon.png")}
                    alt="location-icon"
                    className="p4-location-icon-king"
                  />
                  {selectedSpace.address}
                  {","}
                  {selectedSpace.city}
                  {","}
                  {selectedSpace.counrty}
                </div>
              </div>
            </div>
            <hr />
          </div>
     
      </div> 
      <div className="show-date-time-sp">
        <div>
          <img
            src={require("../../icons/calendar-icon.png")}
            alt="calendar-icon"
            className="calendar-icon-ss"
          />
          <span className="show-date-sp">
            {fromDate.toDateString()}
            {" - "}
            {toDate.toDateString()}
          </span>
        </div>

        <div className="show-times-sp">
          <img
            src={require("../../icons/clock-icon.png")}
            alt="clock-icon"
            className="clock-icon"
          />
          {fromTime}
          {" - "}
          {toTime}
        </div>
        {/* {  console.log("to date ",fromDate.toDateString(),toDate) } */}
        {/* //console.log("total  ",Number((selectedSpace.toDate).toDateString-(selectedSpace.fromDate).toDateString)*Number(selectedSpace.costperday) */}
      </div>
      <div className="total-pay"><h2>Total{"  "}</h2>
      <h2>{total}</h2>
      </div> 
    </>

      )}
    </div>
    </div> 
  ); 

  return <div>{spaceComponent}</div>;
}

export default ReserveSpace;
