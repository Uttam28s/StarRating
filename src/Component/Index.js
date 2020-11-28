import React, { Component } from "react";
import { AddNewUser } from "./AddNewUser";
import { UserList } from "./UserList";

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      userlist: [],
      radio: "high",
      rating: 0,
      hoverRating: 0,
    };
  }

  compare = (a, b) => {
    const ratingA = a.rating;
    const ratingB = b.rating;

    let comparison = 0;
    if (ratingA > ratingB) {
      comparison = -1;
    } else if (ratingA < ratingB) {
      comparison = 1;
    }
    return comparison;
  };

  lowerCompare = (a, b) => {
    const ratingA = a.rating;
    const ratingB = b.rating;

    let comparison = 0;
    if (ratingA > ratingB) {
      comparison = 1;
    } else if (ratingA < ratingB) {
      comparison = -1;
    }
    return comparison;
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData === null) {
      this.setState({
        userlist: [],
      });
    } else {
      userData.sort(this.compare);
      this.setState({
        userlist: userData,
      });
    }
  }

  handelOnClick = () => {
    this.setState({
      modal: true,
    });
  };

  handelClsoe = () => {
    this.setState({
      modal: false,
    });
  };

  handelAddUser = (e) => {
    this.state.userlist.push(e);
    this.handelClsoe();
  };

  handelOnChange = (e) => {
    this.setState({
      radio: e.target.value,
    });
    if (e.target.value === "low") {
      this.setState({
        userlist: this.state.userlist.sort(this.lowerCompare),
      });
    } else {
      this.setState({
        userlist: this.state.userlist.sort(this.compare),
      });
    }
  };

  updateRating = (id, rate) => {
    const data = this.state.userlist.map((data) => {
      if (data.id === id) {
        data["rating"] = rate;
        return data;
      } else {
        return data;
      }
    });
    this.setState({
      userlist: data,
    });
    localStorage.setItem("userData", JSON.stringify(data));
  };

  render() {
    return (
      <div className="main-wrapper">
        <div className="header-wrapper">
          <div className="sorting-title-wrapper">
            <h3>Sortby</h3>
            <div className="radio-btn-wrapper" onChange={this.handelOnChange}>
              <div class="radiobtn">
                <input
                  type="radio"
                  id="high"
                  name="dron"
                  value="high"
                  // onChange={this.handelOnChange}
                  checked={this.state.radio === "high"}
                />
                <label for="high">Heighest Rating First</label>
              </div>

              <div class="radiobtn">
                <input
                  type="radio"
                  id="low"
                  name="dron"
                  value="low"
                  checked={this.state.radio === "low"}
                />
                <label for="low">Lowest Rating First</label>
              </div>
            </div>
          </div>
          <button class="effect effect-5" onClick={this.handelOnClick}>
            Add User
          </button>
        </div>
        {this.state.modal ? (
          <AddNewUser close={this.handelClsoe} addUser={this.handelAddUser} />
        ) : (
          ""
        )}
        <div className="containt-wrapper">
          {this.state.userlist.map((data) => (
            <UserList
              userlist={data}
              userData={this.state.userlist}
              update={this.updateRating}
            />
          ))}
        </div>
      </div>
    );
  }
}
