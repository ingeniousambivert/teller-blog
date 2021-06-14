import React from "react";
import { Meta, Header, Footer } from "../layouts";
import { SignInForm } from "../components";
function SignIn() {
    return (
        <div>
            <div className="space-y-5 space-x-2 md:space-x-0">
                <Meta />
                <div className="mx-5 md:mx-10">
                    <Header />
                    <SignInForm />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default SignIn;
