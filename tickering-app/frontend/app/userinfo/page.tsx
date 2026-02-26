"use client";

import React, { useEffect, useState } from "react";

type User = {
  userid: number;
  username: string;
  email: string;
};

function UserInfo() {
  const [userData, setData] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/user")
      .then(res => res.json())
      .then(userData => setData(userData))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((d) => (
            <tr key={d.userid}>
              <td>{d.userid}</td>
              <td>{d.username}</td>
              <td>{d.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserInfo;
