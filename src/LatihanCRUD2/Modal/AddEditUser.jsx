import React, { Component, Fragment } from "react";
import Axios from "axios";
import swal from "sweetalert";

class AddEditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      name: '',
      email: '',
      jenis_kelamin: '',
      password: '',
      password_confirmation: '',
      isLoading: false,
      isProccess: false,
    }

  }
  componentDidUpdate(prevProps) {
    // console.log('prevProps', prevProps.userId)
    // console.log('props saat ini', this.props.userId)
    if (prevProps.userId !== this.props.userId) {
      // console.log('UserId', this.props.userId)
      if (this.props.status === 'Add') {
        this.setState({
          username: '',
          name: '',
          email: '',
          jenis_kelamin: '',
        })
      } else {
        const userId = this.props.userId
        const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/update/${userId}`
        // console.log(url)
        Axios
          .get(url)
          .then(response => {
            // console.log('response', response.data.data.username)
            this.setState({
              username: response.data.data.username,
              name: response.data.data.name,
              email: response.data.data.email,
              jenis_kelamin: response.data.data.jenis_kelamin,
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
  onInputHandle = (event) => {
    console.log('input ok')
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  onSubmitHandle = (event) => {
    event.preventDefault()
    this.setState({
      isLoading: true
    })
    console.log('form sudah disubmit')
    if (this.props.status === 'Update') {
      console.log('siap update')
      const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/update`
      const payload = {
        id: this.props.userId,
        username: this.state.username,
        name: this.state.name,
        email: this.state.email,
        jenis_kelamin: this.state.jenis_kelamin,
      }
      console.log(payload)
      Axios
        .put(url, payload)
        .then(response => {
          this.setState({
            isLoading: false
          })
          swal("Good job!", "Alhamdulillah update berhasil", "success");
          this.props.updateTable()
          console.log('berhasil', response)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      console.log('siap add')
      const url = 'https://belajar-react.smkmadinatulquran.sch.id/api/register'
      const payload = {
        username: this.state.username,
        name: this.state.name,
        email: this.state.email,
        jenis_kelamin: this.state.jenis_kelamin,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      }
      console.log(payload)
      Axios
        .post(url, payload)
        .then(response => {
          console.log('response', response)
          swal("Good job!", "Alhamdulillah registrasi berhasil", "success");
          this.setState({
            username: '',
            name: '',
            email: '',
            jenis_kelamin: '',
            password: '',
            password_confirmation: '',
            isLoading: false,
            isProccess: false
          })
        })
        .catch(error => {
          console.log(error)
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  render() {
    return (
      <Fragment>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">{this.props.formName}</h5>
          {/* <h6>User Id : {this.props.userId}</h6> */}
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <form action="" onSubmit={this.onSubmitHandle}>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={this.onInputHandle}
                value={this.state.name}
              />
            </div>
            <div className="form-row">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                onChange={this.onInputHandle}
                value={this.state.username}
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                onChange={this.onInputHandle}
                value={this.state.email}
              />
            </div>
            <div className="form-row mb-3">
              <input
                value="laki-laki"
                type="radio"
                name="jenis_kelamin"
                onChange={this.onInputHandle}
                checked={this.state.jenis_kelamin === 'laki-laki'}
                id=""
              />
              <label htmlFor="">laki-laki</label>
              <input
                value="perempuan"
                type="radio"
                name="jenis_kelamin"
                onChange={this.onInputHandle}
                checked={this.state.jenis_kelamin === 'perempuan'}
                id=""
              />
              <label htmlFor="">Perempuan</label>
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                onChange={this.onInputHandle}
                value={this.state.password}
              />
            </div>
            <div className="form-row">
              <label htmlFor="password2">Konfirmasi password</label>
              <input
                className="form-control"
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                onChange={this.onInputHandle}
                value={this.state.password_confirmation}
              />
            </div>
            <button className="form-control btn-success mt-2" type="submit">
              {/* {this.state.isLoading ? } kondisi benar : kondisi salah */}
              {this.state.isLoading ? ('Tersimpan...') : ('Submit')}
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default AddEditUser;