import "./App.scss";
import logo from "../assets/images/logo.svg";
import { useState } from "react";
import { Form } from "./Form";

export const App = () => {
    const [result, setResult] = useState({
        tipAmount: 0,
        total: 0
    })

    const [error, setError] = useState(false)
    
    const [tip, setTip] = useState(0);

    const Calculation = (tip) => {
        const bill = document.querySelector("#bill").value
        const numberOfPeople = document.querySelector("#number-of-people").value

        if (numberOfPeople !== "") {
            setError(false)
            setResult({
                tipAmount: Math.floor(100 * (bill * (tip / 100) / numberOfPeople)) / 100,
                total: Math.floor(100 * (bill * (tip / 100) / numberOfPeople + bill / numberOfPeople)) / 100
            })
        }
        else {
            setError(true)
        }
    }

    const GetResultOnClick = (e) => {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active")

            const temp = document.querySelector("#tip").value === "" ? 0 : document.querySelector("#tip").value

            setTip(temp)

            Calculation(temp)
        }
        else {
            document.querySelectorAll("li button").forEach((e) => {
                e.classList.remove("active")
            })
            e.target.classList.add("active")

            const temp = e.target.getAttribute("amount")
            
            setTip(temp)

            Calculation(temp)
        }
    }

    const GetResult = () => {
        Calculation(tip)
    }

    const GetResultOnTip = () => {
        const temp = document.querySelector("#tip").value

        Calculation(temp)
    }

    return (
        <>
            <img src={logo} alt="Logo" />
            <div className="container">
                <div className="input-content">
                    <Form formType={"bill"} onSubmit={GetResult} />
                    <div className="select-tip">
                        <h1>Select Tip %</h1>
                        <ul>
                            <li>
                                <button type="button" aria-label="5% tip" amount="5" onClick={GetResultOnClick}>5%</button>
                            </li>
                            <li>
                                <button type="button" aria-label="10% tip" amount="10" onClick={GetResultOnClick}>10%</button>
                            </li>
                            <li>
                                <button type="button" aria-label="15% tip" amount="15" onClick={GetResultOnClick}>15%</button>
                            </li>
                            <li>
                                <button type="button" aria-label="25% tip" amount="25" onClick={GetResultOnClick}>25%</button>
                            </li>
                            <li>
                                <button type="button" aria-label="50% tip" amount="50" onClick={GetResultOnClick}>50%</button>
                            </li>
                            <li>
                                <Form onSubmitTip={GetResultOnTip} />
                            </li>
                        </ul>
                    </div>
                    <Form formType={"number-of-people"} error={error} onSubmit={GetResult} />
                </div>
                <div className="result">
                    <div className="tip-amount">
                        <h2>{result.tipAmount + "$"}</h2>
                        <p className="title">Tip amount</p>
                        <p className="note">/ person</p>
                    </div>
                    <div className="total">
                        <h2>{result.total + "$"}</h2>
                        <p className="title">Total</p>
                        <p className="note">/ person</p>
                    </div>
                    <button type="reset" aria-label="Reset input">Reset</button>
                </div>
            </div>
        </>
    )
}