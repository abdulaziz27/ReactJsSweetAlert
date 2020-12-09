import React, { Fragment } from 'react';


const BelajarUseState = () => { // Huruf pertama sebuah komponen harus h.besar BelajarUseState
    const [counter, setCounter] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [array, setArray] = React.useState(["Ayam", "Ikan", "Tikus"]);
    const [text, setText] = React.useState("");
    const [seconds, setSeconds] = React.useState(0);
    const [friend, setFriend] = React.useState(null);

    //Effect 1
    React.useEffect(
    function () {
        if (text.length) localStorage.setItem("text", text);
        console.log("effect berjalan");
        },
        [text] // text didalam array berarti effect akan dijalankan jika text berubah
    );

    // Effect 2
    React.useEffect(function () {
        setText(localStorage.getItem("text"));
        let Interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        }, 1000); // increment second setiap 1 detik

        // CLEAN UP Function
        //fungsi ini hanya akan dipanggil saat komponen unmounted
        return function () {
        clearInterval(Interval);
        };
        //panggil clearInterval
    }, []);

    React.useEffect(
        function () {
          if (!friend) return;
          console.log("effect di jalankan");
          return function () {
            console.log("component di bersihkan");
          };
        },
        [friend]
      );

    const HandlePlus = () => {
        setCounter((counter) => counter + 1);
        setLoading(true);
        setArray([...array, "Kijang"]);
        // setCounter((c) => c + 1);
        // setCounter((counter + 1);
    };
    const HandleMinus = () => {
        setCounter((counter) => counter - 1);
        setLoading(false);
        // setCounter((c) => c + 1);
        // setCounter((counter + 1);
    };
    return (
        <Fragment>
            <div className="container text-center">
                <h1>{counter}</h1>
                <button className="btn btn-primary mr-3" onClick={HandlePlus}>{loading ? "Loading" : "Plus"}</button>
                <button className="btn btn-danger" onClick={HandleMinus}>Minus</button>
            </div>
            <h4>Nama-Nama Hewan</h4>
            <ol>
                {array.map((hewan) => (
                    <li>{hewan}</li>
                ))}
            </ol>

            <textarea
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
             <h2>
                Waktu : {Math.floor(seconds / 60)} menit {seconds % 60} detik
            </h2>

            <h2>Urutan Eksekusi</h2>
            <button onClick={(e) => setFriend("ihsan")}>ihsan</button>
            <button onClick={(e) => setFriend("arief")}>Arief</button>
            <br />
            {friend ? `friend ${friend}` : "tidak ada chat"}

        </Fragment>
    );
};

export default BelajarUseState;