import React, { Component, Fragment } from 'react'
import axios, { post } from 'axios';

class SimpleReactFileUpload extends Component {

  constructor(props) {
    super(props);
    // this.state ={
    //   file:null
    // }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  state = {
    file: null
  }

  componentDidMount() { }

  onFormSubmit(e) {
    e.preventDefault() // Stop form submit    
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
    })
  }

  onChange(e) {    
    this.setState({ file: e.target.files[0] })
    console.log(e.target.files[0]);
  }

  fileUpload(file) {   
    const url = 'http://localhost:8080/file-upload';
    const formData = new FormData();
    formData.append('file', file, file.name)
    // formData.append('file[]', files[0])
    // formData.append('file[]', files[1])
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return axios.post(url, formData, config)
  }

  fileData = () => {
    if (this.state.file) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.file.name}</p>
          <p>File Type: {this.state.file.type}</p>
          <p>Last Modified:{" "}{this.state.file.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <Fragment>
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
      { this.fileData() }
      </Fragment>
   )
  }

}

export default SimpleReactFileUpload
