import React from "react";
import { RatingIcon } from "./StarRating";

export const UserList = (props) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index) => {
    props.update(props.userlist.id, index);
  };

  return (
    <div className="row-wrapper">
      <div className="list-view-row">
        <h4>{props.userlist.userName}</h4>
        <div className="box flex">
          {[1, 2, 3, 4, 5].map((index) => {
            return (
              <RatingIcon
                index={index}
                rating={props.userlist.rating}
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
  );
};
