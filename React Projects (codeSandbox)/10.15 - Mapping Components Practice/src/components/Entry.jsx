import React from "react";

function Entry(props) {
  return (
    <div>
      <dt>
        <span className="emoji" role="img" aria-label={props.emojiName}>
          {props.emojiPicture}
        </span>
        <span>{props.emojiName}</span>
      </dt>
      <dd>{props.detail}</dd>
    </div>
  );
}

export default Entry;
