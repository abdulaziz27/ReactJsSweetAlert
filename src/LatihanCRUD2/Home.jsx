import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import AddEditUser from './Modal/AddEditUser';
import swal from "sweetalert";
import { config } from '../config';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datas: [],
      per_page: '3',
      // total_page
      total: '',
      current_page: '',
      last_page: '',
      formName: '',
      cari : '',
      userId: '',
      status: ''
    }
  }
  
  handlerAdd = () => {
    const url = `${config.api_host}/users/${this.state.per_page}?page=1`
    this.onGet(url);
  }

  onGet(url){
    Axios
    .get(url)
    .then(response => {
        console.log('data berhasil didapatkan', response.data.data)
        this.setState({
          datas: response.data.data,
          per_page: response.data.meta.per_page,
          total: response.data.meta.total_page,
          current_page: response.data.meta.current_page,
          last_page : response.data.meta.last_page
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  onPost(url, payload){
    Axios
    .post(url, payload)
    .then(response => {
      // console.log('response', response.data.data.username)
      this.setState({
        datas: response.data.data,
        per_page: response.data.meta.per_page,
        total: response.data.meta.total_page,
        current_page: response.data.meta.current_page,
        last_page : response.data.meta.last_page
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  onChangeSearchHandle =(event) => {
    this.setState({[event.target.name] : event.target.value})
  }
  
  onSubmitSearchHandle = (event) => {
    event.preventDefault()
    console.log('Submit')
    const url = `${config.api_host}/users/cari`
    const payload = {
      cari : this.state.cari
    }
    this.onPost(url,payload)
  }

  onPage = (e) => {
    console.log('page')
    const page = e.target.value
    const url = `${config.api_host}/users/${this.state.per_page}?page=${page}`
    this.onGet(url);
  }

  onPreviosHandle = () => {
    console.log('tombol sudah diklik')
    const url = `${config.api_host}/users/${this.state.per_page}?page=${this.state.current_page - 1}`
    this.onGet(url);
  }

  onNextHandle = () => {
    console.log('tombol sudah diklik')
    const url = `${config.api_host}/users/${this.state.per_page}?page=${this.state.current_page + 1}`
    this.onGet(url);
  }
  onSelectItem = (event) => {
    console.log("value", event.target.value)
    const url = `${config.api_host}/users/${event.target.value}`
    this.onGet(url);
  }

  onDelete = (event) => {
    event.preventDefault()
    const hapus_id = event.target.value
    const url = `${config.api_host}/users/hapus/${hapus_id}`
    Axios
    .get(url)
    .then(response => {
      this.handlerAdd()
      swal("Success", "Data Deleted Successfully", "success")
    })
    .catch(error => {
      console.log('Failed', error);
    })
  }    

  updateTable = () => {
    console.log('event sudah dijalankan')
    this.componentDidMount()
  }

  componentDidMount() {
    console.log('componentDidMount')
    const url = `${config.api_host}/users/${this.state.per_page}`
    this.onGet(url);
  }

  render() {
    const numbers = [];
    for (var i = 1; i <= this.state.last_page; i++) {
      numbers.push(<li key={i} className="page-item"><button name="button" value={i} onClick={this.onPage} className="page-link">{i}</button></li>)
    }
    return (
      <Fragment>
        <div className="container mt-4">
          <h1 className="text-center">Latihan CRUD</h1>
          <div className="row">
            <div className="col-3">
              <button onClick={() => {
                this.setState({
                  formName: 'Form Registrasi',
                  status: 'Add',
                  userId: ''
                })
              }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Create New User
                </button>
            </div>
          </div>
          <div className="row d-flex justify-content-end mb-3">
            <div className="col-1 col-sm-1 col-md-1 col-lg-1">
              <select onChange={this.onSelectItem} className="btn border">
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="col-md-2 col-sm-12">
              <form onSubmit={this.onSubmitSearchHandle}>
                <input onChange={this.onChangeSearchHandle}
                name="cari"
                placeholder="Cari"
                className="btn border"
                autoComplete="off"
                type="text"/>
              </form>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Username</th>
                <th>Email</th>
                <th>Stored at</th>
                <th width="280px" class="text-md-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.datas.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>{data.stored_at}</td>
                  <td class="text-md-center">
                    <button onClick={() => {
                    this.setState({
                      formName: 'Form Update',
                      userId: data.id,
                      status: 'Update'
                    })
                  }} className="btn-primary btn-sm mr-1" type="submit" data-toggle="modal" data-target="#exampleModal">Update</button>
                  <button className="btn-info btn-sm mr-1" type="submit">Detail</button>
                  <button value={data.id} onClick={this.onDelete} className="btn-danger btn-sm mr-1" type="button">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <h2>Page saat ini : {this.state.current_page}</h2> */}
          <div className="d-flex justify-content-end">
            <nav>
              <ul className="pagination">
                <li className="page-item"><button onClick={this.onPreviosHandle} className="page-link">Previous</button></li>
                {numbers}
                <li className="page-item"><button onClick={this.onNextHandle} className="page-link">Next</button></li>
              </ul>
            </nav>
          </div>
        </div>
        {/*Modal*/}
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <AddEditUser updateTable={this.updateTable} status={this.state.status} userId={this.state.userId} formName={this.state.formName} />
            </div>
          </div>
        </div>
        {/*Modal*/}
      </Fragment>
    )
  }
}
export default Home;