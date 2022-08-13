export const Form = (props) => {    
    const GetFloatOnly = (e) => {
        if ((e.which !== 46 || e.target.value.indexOf('.') !== -1) && (e.which < 48 || e.which > 57) && e.which !== 13) {
            e.preventDefault()
        }
    }

    const GetIntegerOnly = (e) => {
        if ((e.which < 48 || e.which > 57) && e.which !== 13) {
            e.preventDefault()
        }
    }

    const HandleSubmit = (e) => {
        e.preventDefault()

        props.onSubmit()
    }

    const HandleSubmitTip = (e) => {
        e.preventDefault()

        document.querySelectorAll("li button").forEach((e) => {
            e.classList.remove("active");
        })

        props.onSubmitTip()
    }

    if (props.formType === "bill") {
        return (
            <form onSubmit={HandleSubmit}>
                <label htmlFor="bill">Bill</label>
                <input id="bill" placeholder="0" type="text" onKeyPress={GetFloatOnly} />
                <span></span>
            </form>
        )
    }
    else if (props.formType === "number-of-people") {
        return (
            <form onSubmit={HandleSubmit}>
                <label htmlFor="number-of-people">Number of people</label>
                <input id="number-of-people" className={props.error === true ? "error" : ""} placeholder="0" type="text" onKeyPress={GetFloatOnly} />
                <span></span>
            </form>
        )
    }
    else {
        return (
            <form onSubmit={HandleSubmitTip}>
                <input id="tip" placeholder="Custom" type="text" onKeyPress={GetIntegerOnly} />
            </form>
        )
    }
}