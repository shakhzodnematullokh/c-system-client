import { useRef, useState } from "react";

import "./order.scss"

function Order() {
    const complexRef = useRef()
    const complexLabelRef = useRef()
    const roomRef = useRef()
    const roomLabelRef = useRef()
    const bankRef = useRef()
    const bankLabelRef = useRef()
    const emailRef = useRef()
    const priceRef = useRef()
    const msgRef = useRef()
    const submitRef = useRef()

    const [data, setData] = useState(null)
    const [dev, setDev ] = useState()
    const [complex, setComplex ] = useState()
    const [room, setRoom ] = useState()
    const [rooms, setRooms ] = useState()
    const [bank, setBank ] = useState()
    const [banks, setBanks ] = useState()
    const [devs, setDevs ] = useState([])
    const [alldevs, setAllDevs ] = useState([])
    const [price, setPrice] = useState()
    const [developer, setDeveloper] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()

		const email = document.querySelectorAll(".email");

        const devID = dev
        const complexName = complex
        const rooms = room
        const bankName = bank
        const user_email = email[0].value

        const newOrder = {
            devID,
            complexName,
            rooms,
            price,
            bankName,
            user_email
        }

        fetch("https://c-system.herokuapp.com/orders", {
            method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newOrder),
        })
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))

        fetch("https://c-system.herokuapp.com/bank", {
            method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newOrder),
        })
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
    }

    return(
        <>
            <div ref={msgRef} style={{display: "none"}}>
                <div className="complex-box">
                    {
                        alldevs ? alldevs.map(d => {
                            if(d.complex_name == complex && d.room == room) {
                                return(
                                    <>
                                        <h2 key={d.developer_name}>{d.developer_name} kompaniyasi {d.complex_name} kompleksida {room} xonali kvartirani {d.price} so'mga 15 yilga bo'lib to'lash sharti bilan bera oladi</h2>

                                        <a className="order" href={d.link} target="_blank" rel="noopener noreferrer" key={d.link}>Batafsil</a>
                                    </>
                                )
                            }
                        }) : null
                    }
                </div>

                {
                    banks? banks.map(b => {
                        if(b.bank_name == bank) {
                            return <h2 className="bank" key={b.bank_name}>{b.bank_name} banki {b.money_limit} so'mgacha bo'lgan mablag'ni {b.time} yilga ajrata oladi.</h2>
                        };
                    }) : null
                }
            </div>

            <h1 className="order-form">Order</h1>
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <div>

                        <label>Developer nomi</label>
                        <select value={dev} onChange={e => {
                            setDev(e.target.value)
                            
                            const value = {
                                id: e.target.value
                            }
                            
                            fetch("https://c-system.herokuapp.com/developers", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(value),
                            })
                            .then(res => res.json())
                            .then(data => {
                                setDeveloper(data)
                                setAllDevs(data)
                                setDevs()
                                setRooms()
                                setBanks()

                                roomRef.current.style.display = "none"
                                roomLabelRef.current.style.display = "none"
                                bankRef.current.style.display = "none"
                                bankLabelRef.current.style.display = "none"
                                priceRef.current.style.display = "none"
                                emailRef.current.style.display = "none"

                                let arr = []

                                for (let i = 0; i < data.length; i++) {
                                    if(!arr.includes(data[i].complex_name)) {
                                        arr.push(data[i].complex_name)
                                    }
                                }
                                setDevs(arr)
                                if(data) {
                                    complexRef.current.style.display = "inline-block"
                                    complexLabelRef.current.style.display = "inline-block"
                                }
                            })
                            .catch(err => console.log(err))
                        }}>
                            <option></option>
                            <option className="option" value="1">Golden House</option>
                            <option className="option" value="2">Murad Buildings</option>
                            <option className="option" value="3">Bizning Uylar Development</option>
                        </select>
                    </div>

                    <div>
                        <label ref={complexLabelRef} style={{display: "none"}} >Kompleks nomi</label>
                        <select ref={complexRef} style={{display: "none"}} value={complex} onChange={e => {
                            setComplex(e.target.value)

                            if(devs) {
                                let a = []
                                for (let i = 0; i < alldevs.length; i++) {
                                    if(alldevs[i].complex_name === e.target.value) {
                                        a.push(alldevs[i])
                                    }
                                }
                                
                                setRooms(a)

                                roomRef.current.style.display = "inline-block"
                                roomLabelRef.current.style.display = "inline-block"
                            }

                        } }>
                            <option></option>
                            {
                                devs ? devs.map(complex => {
                                    return(
                                        <option value={complex} key={complex}>{complex}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>

                    <div>
                        <label ref={roomLabelRef} style={{display: "none"}} >Xonalar soni</label>
                        <select ref={roomRef} style={{display: "none"}} value={room} onChange={e => {
                            const value = e.target.value

                            setRoom(value)

                            const foundPrice = rooms.find(r => r.room == value)

                            setPrice(foundPrice.price)

                            if(price !== "undefined") {
                                fetch("https://c-system.herokuapp.com/bankData", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({price: foundPrice.price}),
                                })
                                .then(res => res.json())
                                .then(data => {
                                    setBanks()
                                    setBanks(data)
                                    if(data) {
                                        bankRef.current.style.display = "inline-block"
                                        bankLabelRef.current.style.display = "inline-block"
                                        priceRef.current.style.display = "inline-block"
                                    }
                                })
                                .catch(err => console.log(err))
                            }
                        }}>
                            <option key={10}></option>

                            {
                                rooms ? rooms.map(r => {
                                    return(
                                        <option value={r.room} key={r.room} >{r.room}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>

                    <h1 className="price-text" ref={priceRef} style={{display: "none"}}>Uy narxi {price} so'm</h1>

                    <div>
                        <label ref={bankLabelRef} style={{display: "none"}}>Bank</label>
                        <select ref={bankRef} style={{display: "none"}} value={bank} onChange={e => {
                            setBank(e.target.value)

                            if(devs) {
                                emailRef.current.style.display = "inline-block"
                                msgRef.current.style.display = "inline-block"
                            }

                        }}>
                            <option key={11}></option>

                            {
                                banks ? banks.map(b => {
                                    return(
                                        <option value={b.bank_name} key={b.bank_name}>{b.bank_name}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>

                    <input ref={emailRef} style={{display: "none"}} className="email" type="email" placeholder="email" onChange={e => submitRef.current.style.display = "inline-block"} required/>

                    <button ref={submitRef} style={{display: "none"}} className="order" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Order;