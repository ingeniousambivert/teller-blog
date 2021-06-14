import React from "react";
import { Meta, Header, Footer } from "../layouts";
import { SignUpForm } from "../components";
function SignUp() {
    return (
        <div>
            <div className="space-y-5 space-x-2 md:space-x-0">
                <Meta />
                <div className="mx-5 md:mx-10">
                    <Header />
                    <SignUpForm />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default SignUp;
