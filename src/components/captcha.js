import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha"; // Component necessary, install by: yarn add react-google-recaptcha

const TEST_SITE_KEY = "6Lc2lr0UAAAAAMruAzoBXNfqCcUze3e__BStR9hW"; // SiteKey
const DELAY = 1500; // Set the time before show the captcha in the render.


class Captcha extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            callback: "not fired",
            value: "[empty]",
            load: false,
            expired: "false"
        };
        this._reCaptchaRef = React.createRef();
      }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ load: true });
        }, DELAY); // Count the time set before to show.
        console.log("_reCaptchaRef", this._reCaptchaRef);
    }

    handleChange = value => {
        console.log("Captcha value:", value);
        this.setState({ value });
        // if value is null recaptcha expired
        value ? this.setState({ expired: "false" }) : this.setState({ expired: "true" });
        if (value === null) ;
    };

    asyncScriptOnLoad = () => {
        this.setState({ callback: "called!" });
        console.log("_reCaptchaRef", this._reCaptchaRef);
    };

    render() {
        const { value, callback, load, expired } = this.state || {};
        return (
            <div className="App">
                <h2>
                    NOTE: initial load delayed <em>{DELAY / 1000}sec</em> to demonstrate
                    callback
        </h2>
                <h3>Recaptcha loaded callback: {callback}</h3>
                <h5>Recaptcha value: {value}</h5>
                <h5>Expired: {expired}</h5>
                {load &&(
                    <ReCAPTCHA
                        style={{ display: "inline-block" }}
                        theme="light" // You can change the theme color between dark or light.
                        ref={this._reCaptchaRef}
                        sitekey={TEST_SITE_KEY} // Key of the SiteKey.
                        onChange={this.handleChange}
                        asyncScriptOnLoad={this.asyncScriptOnLoad}
                    />
                )}
            </div>
        );
    }
};
export default Captcha;
