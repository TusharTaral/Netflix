import React from 'react'
import styles from "./Home.module.css"

import { Link } from "react-router-dom"
export default function Home() {
    return (
        <>
            <div className={styles.background}>

                {/* <img  src="https://assets.nflxext.com/ffe/siteui/vlv3/71cfa010-f8dd-4298-a94d-1ae5034a857c/5f9ac3ff-b5c5-49ae-bd22-bc3349bb6b80/IN-en-20210425-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="netflix background"></img> */}
                <div className={styles.title}>
                    <h2 >Unlimited movies, TV <br />shows and more.</h2>
                    <h3 >Watch anywhere. Cancel anytime.</h3>
                    <h5>Ready to watch? Enter your email to create or restart your membership.</h5>
                    <input className={styles.input} placeHolder="Enter Email"></input>
                    <Link to="/app"><button className={styles.btn}>Get Started  </button></Link>
                </div>

            </div>

        </>

    )
}
