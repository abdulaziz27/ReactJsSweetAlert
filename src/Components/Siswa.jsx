import React from 'react';

// Props preoperti yg ga bisa diubah kecuali dg react hook
// State data private yg disimpan di dlm componen, digunakan di class base componen, digunakan digunakan componen itu sendiri
// event = sesuatu yg terjadi pd elemen spt > onCLick, onChange
const Siswa = (props) => {
    return (
    <div className="mb-4">
        <table className="">
            <thead className="mb-3">
                <tr>
                    <th>Nama</th>
                    <td>:</td>
                    <td>{props.nama}</td>
                </tr>
                <tr>
                    <th>Nisn</th>
                    <td>:</td>
                    <td>{props.nisn}</td>
                </tr>
                <tr>
                    <th>Jurusan</th>
                    <td>:</td>
                    <td>{props.jurusan}</td>
                </tr>
            </thead>
        </table>
    </div>
    )
}

export default Siswa;