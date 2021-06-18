const basicHeaders = { Accept: "application/json", "Content-Type": "application/json" };

export const getAuthHeaders = () => {
    const storedState = JSON.parse(window.localStorage.getItem("teller-blog"));
    const accessToken = storedState?.userAuth?.accessToken;
    const authHeaders = { Authorization: `Bearer ${accessToken}` };
    return authHeaders;
};

export const getRefreshToken = () => {
    const storedState = window.localStorage.getItem("teller-blog");
    const refreshToken = storedState?.userAuth?.refreshToken;
    return refreshToken;
};

const client = {
    get: async function (endpoint, authHeaders = {}) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`, {
                method: "GET",
                headers: new Headers(
                    authHeaders ? { ...authHeaders, ...basicHeaders } : basicHeaders
                )
            });
            return response;
        } catch (error) {
            console.log("error", error);
            return error;
        }
    },
    post: async function (endpoint, body, authHeaders = {}) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`, {
                method: "POST",
                headers: new Headers(
                    authHeaders ? { ...authHeaders, ...basicHeaders } : basicHeaders
                ),
                body: JSON.stringify(body)
            });
            return response;
        } catch (error) {
            console.log("error", error);
            return error;
        }
    },
    put: async function (endpoint, body, authHeaders = {}) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`, {
                method: "PUT",
                headers: new Headers({ ...authHeaders, ...basicHeaders }),
                body: JSON.stringify(body)
            });
            return response;
        } catch (error) {
            console.log("error", error);
            return error;
        }
    },
    patch: async function (endpoint, body, authHeaders = {}) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`, {
                method: "PATCH",
                headers: new Headers({ ...authHeaders, ...basicHeaders }),
                body: JSON.stringify(body)
            });
            return response;
        } catch (error) {
            console.log("error", error);
            return error;
        }
    },
    delete: async function (endpoint, authHeaders = {}) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`, {
                method: "DELETE",
                headers: new Headers({ ...authHeaders, ...basicHeaders })
            });
            return response;
        } catch (error) {
            console.log("error", error);
            return error;
        }
    }
};

export default client;
