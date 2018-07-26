import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {


  constructor() {
    super();
    this.state = {
      selectedFile: '',
      fileToShow: null
    };
  }

  onChange = (e) => {
    switch (e.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmit = (e) => {
    console.log("selected file is ", this.state.selectedFile);
    e.preventDefault();
    const { selectedFile } = this.state;
    let formData = new FormData();

    formData.append('selectedFile', selectedFile);

    axios.post('http://localhost:3000/upload', formData)
      .then((result) => {
        console.log("result is", result);
        this.setState({fileToShow: result.data.file});
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="center-align">Materialize File Input</h2>
          <form onSubmit={this.onSubmit}>
            <div className="file-field input-field">
              <div className="btn">
                <span>Browse</span>
                <input type="file" name="selectedFile" onChange={this.onChange}/>
              </div>

              <div className="file-path-wrapper">
                <input className="file-path validate" type = "text"
                       placeholder = "Upload file" />
              </div>
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
        <br/>
        {this.state.fileToShow !== null &&
        <img src={this.state.fileToShow} alt="" className="responsive-img"/>
        }
      </div>
    );
  }
}

export default App;
