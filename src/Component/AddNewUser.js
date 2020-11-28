import React, { useState } from "react";
import { RatingIcon } from "./StarRating";

export const AddNewUser = (props) => {
  const [userName, setuserName] = useState("");
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index) => {
    setRating(index);
  };

  const handleInput = (e) => {
    setuserName(e.target.value);
  };

  const handelOnClick = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData === null) {
      const value = [
        {
          id: 1,
          userName,
          rating,
        },
      ];
      localStorage.setItem("userData", JSON.stringify(value));
      props.addUser(value[0]);
    } else {
      const value = {
        id: userData.length + 1,
        userName,
        rating,
      };
      userData.push(value);
      localStorage.setItem("userData", JSON.stringify(userData));
      props.addUser(value);
    }
  };

  const handelClose = () => {
    props.close();
  };

  return (
    <div>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={props.close}>
            &times;
          </span>
          <h2>Add New User</h2>
          <div className="form-wrapper">
            <label for="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={handleInput}
            />
            <div className="user-rating">
              <label>User Rating</label>
              <div className="box flex">
                {[1, 2, 3, 4, 5].map((index) => {
                  return (
                    <RatingIcon
                      index={index}
                      rating={rating}
                      hoverRating={hoverRating}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      onSaveRating={onSaveRating}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="button-wrapper">
            <button class="effect effect-5" onClick={handelClose}>
              Close
            </button>
            <button
              class="effect effect-5 close-button"
              onClick={handelOnClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
