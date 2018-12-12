import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash'

import TableRow from './TableRow';
import CreateComponent from './CreateComponent';

export default class IndexComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users : []  
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    tabRow(){
        return this.state.users.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
    }

    countUsersFromKiev() {
      let count = 0;
      let arr = this.state.users.filter(e => {
        let reg = /ne kiev/i;
        return reg.test(e.location) == false;
      });

      arr.map(e => {
        let reg = /kiev/i;
        if (reg.test(e.location) == true) count++;
      });
      return count;
    }

    sumOfAges() {
      let sum = 0;
      let arr = this.state.users.map(e => {
        let now = moment();  
        let dob = moment(e.dob, "DD-MM-YYYY").toDate();
        return now.diff(dob, "year");
      });

      let sort = arr.sort((a, b) => a - b);
      for (let i = sort.length - 3; i < sort.length; i++) {
        sum += sort[i];
      } 
      return sum;
    }

    longestString() {
      let arr = [];
      let strLen = this.state.users.map(e => {
        return (e.first_name + e.last_name).length;
      });
      let max = _.max(strLen);
      this.state.users.forEach(e => {
        if ((e.first_name + e.last_name).length == max) arr.push(`${e.first_name} ${e.last_name}  `)
      });
      return arr;
    }

    render() {
      console.log(_.max([4,5,6,7,]))
      return (
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <td><b>First Name</b></td>
                <td><b>Last Name</b></td>
                <td><b>Date of birth  </b></td>
                <td><b>Location</b></td>
              </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
          </table>
          <div>
            <h2>Summury</h2>
            <dl>
              <dt>Number of users from 'Kiev' or 'kiev': {this.countUsersFromKiev()}</dt>
              <dt>Sum of three olders users: {this.sumOfAges()}</dt>
              <dt>Longest string of first name + last name: {this.longestString()}</dt>

            </dl>
          </div>
          <CreateComponent />
    </div>
    );
  }
}
            


    