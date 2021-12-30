import { Link } from "react-router-dom"
import "./home.scss"

function Home() {
    return(
        <>
            <h1>Sahifamizga xush kelibsiz!</h1>
            <h3>Siz bu yerda o'zingiz xohlagan uyni qulay topa olasiz.</h3>
            <Link className="order" to="/order">Order</Link>
        </>
    )
}

export default Home;