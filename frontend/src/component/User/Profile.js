import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import { useNavigate } from "react-router-dom";
import "./Profile.css";


const Profile = ({history}) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  // const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated, user]);
// console.log("printing user.avatar.url",user.avatar.url);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              {/* <img src={user.avatar ? user.avatar.url : "/Profile.png"} alt={user.name} /> */}
              <img src={user.avatar.url} alt={user.name} />
              <Link to="me/update">Edit Profile</Link>
            </div>

            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
