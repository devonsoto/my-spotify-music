import React from "react";

console.log("test1");


const UserInfo = props => {
  console.log('test') 
  return (
    <div>
      Name: {props.name}, followers: {props.followers}
    </div>
  );
};

export default UserInfo;