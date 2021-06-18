import React, { useState } from "react";
import { useRouter } from "next/router";
import { manageAccount } from "../../../state/user/thunks";
function VerifyUser() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { query } = router;

    const verifyUserEmail = async (email, token) => {
        const response = await manageAccount("verify-user", { email, token });
        console.log(response);
    };

    if (typeof window !== "undefined") {
        if (query) {
            setLoading(true);
            verifyUserEmail(query.email, query.token);
            setLoading(false);
        } else {
            router.push("/");
        }
    }

    return <div className="container mx-auto">verify user</div>;
}

export default VerifyUser;
