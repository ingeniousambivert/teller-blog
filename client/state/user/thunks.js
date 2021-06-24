import client, { getAuthHeaders, getRefreshToken } from "../../utils/client";

// use react query for posts

export const authenticateUser = async (body) => {
    try {
        const response = await client.post("/api/users/auth/signin", body);
        const status = response.status;
        const data = await response.json();
        return { status, data };
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal Server Error" } };
    }
};

export const createUser = async (body) => {
    try {
        const response = await client.post("/api/users/auth/signup", body);
        const status = response.status;
        return { status };
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal Server Error" } };
    }
};

export const revokeUserAccess = async () => {
    try {
        const authHeaders = getAuthHeaders();
        const refreshToken = getRefreshToken();
        const response = await client.delete("/api/users/auth/signout", authHeaders, {
            refreshToken
        });
        const status = response.status;
        return { status };
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal Server Error" } };
    }
};

export const getUser = async (id) => {
    try {
        const authHeaders = getAuthHeaders();
        const response = await client.get(`/api/users/${id}`, authHeaders);
        const status = response.status;
        if (status === 401) {
            return { status };
        } else {
            const data = await response.json();
            return { status, data };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal Server Error" } };
    }
};

export const updateData = async (id, body) => {
    try {
        const authHeaders = getAuthHeaders();
        const response = await client.patch(`/api/users/update/data/${id}`, body, authHeaders);
        const status = response.status;
        if (status === 401) {
            return { status };
        } else {
            const data = await response.json();
            return { status, data };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal Server Error" } };
    }
};

export const updateMedia = async (id, body) => {
    try {
        const authHeaders = getAuthHeaders();
        const response = await client.patch(
            `/api/users/update/file/${id}`,
            body,
            authHeaders,
            true
        );
        const status = response.status;
        if (status === 401) {
            return { status };
        } else {
            const data = await response.json();
            return { status, data };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal Server Error" } };
    }
};

export const updateEmail = async (id, body) => {
    try {
        const authHeaders = getAuthHeaders();
        const response = await client.patch(`/api/users/update/email/${id}`, body, authHeaders);
        const status = response.status;
        if (status === 401) {
            return { status };
        } else {
            const data = await response.json();
            return { status, data };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal Server Error" } };
    }
};

export const updatePassword = async (id, body) => {
    try {
        const authHeaders = getAuthHeaders();
        const response = await client.patch(`/api/users/update/password/${id}`, body, authHeaders);
        const status = response.status;
        if (status === 401) {
            return { status };
        } else {
            const data = await response.json();
            return { status, data };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal Server Error" } };
    }
};

export const manageAccount = async (type, body) => {
    try {
        const response = await client.post(`/api/users/account/${type}`, body);
        const status = response.status;
        const data = await response.json();
        return { status, data };
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal Server Error" } };
    }
};
