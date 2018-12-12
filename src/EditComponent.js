import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom'
import axios from 'axios';

export default class EditComponent extends Component {

    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);

        this.state = {
            first_name : '',
            last_name : '', 
            dob : '',
            location: '',
            error: ''
        }    
    }

        onChangeFirstName = e => {
            this.setState({
                first_name: e.target.value
            });        
        }
    
        onChangeLastName = e =>  {
            this.setState({
                last_name: e.target.value
            });        
        }
    
        onChangeDob = e => {
            this.setState({
                dob: e.target.value
            });        
        }
    
        onChangeLocation = e =>  {
            this.setState({
                location: e.target.value
            });        
        }

        onSubmit = e => {
            e.preventDefault();
          
           if (this.validateForm()) {
            const user = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                dob: this.state.dob,
                location: this.state.location
            }
            
            axios.post('http://localhost:3001/users', user)
                .then(res => console.log(res.data));
    
            this.setState({
                first_name: '',
                last_name: '',
                dob: '',
                location: ''
            });
            this.props.history.push("/") 
            window.location.reload()
            }
        } 

        validateForm() {

            let first_name = this.state.first_name;
            let last_name = this.state.last_name;
            let dob = this.state.dob;
            let location = this.state.location;
            let errors = '';
            let formIsValid = true;
            let regExp = /([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/;
        
            if (!first_name || !last_name || !location || !regExp.test(dob)) {
                formIsValid = false;
                errors = "*Please enter valid value";
            } 
            this.setState({
                errors: errors
                });
            return formIsValid;
        }  

    render() {
        return (
            <div style={{marginTop: 50}}>
            <h2>Edit User</h2>
            <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>First Name:  </label>
                    <input type="text" value={this.state.first_name}  required="required"  className="form-control" onChange={this.onChangeFirstName}/>
                    <div className="errorMsg">{this.state.errors}</div>
                </div>
                <div className="form-group">
                    <label>Last Name: </label>
                    <input type="text" value={this.state.last_name}  className="form-control" onChange={this.onChangeLastName}/>
                    <div className="errorMsg">{this.state.errors}</div>
                </div>
                <div className="form-group">
                    <label>Date of birth: </label>
                    <input type="text" value={this.state.dob} className="form-control" onChange={this.onChangeDob} />
                    <div className="errorMsg">{this.state.errors}</div>
                </div>
                <div className="form-group">
                    <label>Location: </label>
                    <input type="text" value={this.state.location} className="form-control" onChange={this.onChangeLocation}/>
                    <div className="errorMsg">{this.state.errors}</div>
                </div>
                <div className="form-group">
               
                     <input type="submit" value="Edit" className="btn btn-primary"/> 
                
                </div>
            </form>
        </div>
        )
    }
}
