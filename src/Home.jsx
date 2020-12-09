import React from 'react';
import Siswa from './Components/Siswa';
import LogoImage from './img/logo.jpg';
import SiswaRPL from './Components/SiswaRPL';
import LifeCycle from './Components/LifeCycle';

class Home extends React.Component {
    render(){
        return (
            <div className="container">
                <div className="text-center">Daftar Siswa</div>
                <h4 className="text-center">SMK Madinatulquran </h4>
                <img className="d-block mx-auto h-50" src={LogoImage} alt="Logo SMK Madinatulquran"/>
                <div>
                    {/* <Siswa nama={"Ihsan"} nisn={"12345678"} jurusan={"TKJ"} />
                    <Siswa nama={"Dulziz"} nisn={"12345678"} jurusan={"RPL"} />
                    <Siswa nama={"Awal"} nisn={"12345678"} jurusan={"RPL"} />
                    <Siswa nama={"Haikal"} nisn={"12345678"} jurusan={"RPL"} /> */}
                    <LifeCycle />
                </div>
            </div>
        )
    }
}

export default Home;

