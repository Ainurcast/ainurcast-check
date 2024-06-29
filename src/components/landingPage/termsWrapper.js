import React from "react";
import Header from "../home/header";

export default function TermsWrapper({children}) {
    return (
        <div>
            <Header hideLogo />
            {children}
        </div>
    );
}
