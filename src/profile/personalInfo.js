import axios from 'axios';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile.css';

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_num: '',
      phone_id: 0,
    };
  }

  updatePhoneNum = (e) => {
    this.setState({
      phone_num: e.target.value,
    });
  }
  addPhoneNumber() {
    const curState = this.state;
    const staff = localStorage.getItem('user');
    const staffObj = JSON.parse(staff);
    if(curState.phone === ''){
      alert("Please check your input!");
      return;
    }
    axios.get(`/max-phone-id`).then((res) => {
        console.log(res.data[0].max_phone_id);
        this.setState({
            phone_id: res.data[0].max_phone_id + 1
        });
        const phone_id = res.data[0].max_phone_id + 1;
        axios.post(`/add-phone/${phone_id}/${staffObj.username}/${curState.phone_num}`).then((res1) => {
          console.log(res1.data);
        })
      })
  }
 
  render() {
    const loggedInUser = localStorage.getItem('userType');
    if (loggedInUser) {
      console.log(loggedInUser);
      if (loggedInUser === 'staff') {
        return (
          <div style={{'color': '#ffffff'}}>
              <p>Add a Phone Number:</p>
              <form>
                <label style={{'marginBottom': '7px'}}>New Number: </label>
                <input
                type="text"
                placeholder="###-###-####"
                size="25"
                onChange={this.updatePhoneNum}
                style={{'color': 'black', 'fontSize': '18px'}}
                />
                <br/><br/>
                <Button
                    variant='primary'
                    onClick={() => this.addPhoneNumber()}
                    className='button'>
                        Add Phone Number
                    </Button>
            </form>
            
          </div>
        )
      }
    }
  }
}

export default PersonalInfo;
