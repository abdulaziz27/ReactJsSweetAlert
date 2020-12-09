import React, { Fragment } from "react";


const UseCallBack = () => {
  const [kelas, setKelas] = React.useState([]);
  const jumlahKelas = React.useCallback (()=> {
    return ["X TKJ", "X RPL", "XI TKJ", "XI RPL"];
  },[]);

  React.useEffect(() => {
    let data = jumlahKelas();
    setKelas(data);
    console.log('Effect di Panggil!');
  }, [jumlahKelas]);
  return (
    <Fragment>
      <h1>Banyak Kelas</h1>
      <ol>
        {kelas.map((kelas, index) => (
          <li key={index}>{kelas}</li>
        ))}
      </ol>
    </Fragment>
  );
};


export default UseCallBack;