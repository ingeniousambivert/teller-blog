import client, { getAuthHeaders, getRefreshToken } from "../../utils/client";

// use react query for posts

export const authenticateUser = async (body) => {
    const response = await client.post("/api/users/auth/signin", body);
    const status = response.status;
    const data = await response.json();
    return { status, data };
};

export const createUser = async (body) => {
    const response = await client.post("/api/users/auth/signup", body);
    const status = response.status;
    const data = await response.json();
    return { status, data };
};

export const revokeUserAccess = async () => {
    const authHeaders = getAuthHeaders();
    const refreshToken = getRefreshToken();
    const response = await client.delete("/api/users/auth/signout", authHeaders, { refreshToken });
    const status = response.status;
    return { status };
};

export const getUser = async (id) => {
    const authHeaders = getAuthHeaders();
    const response = await client.get(`/api/users/${id}`, authHeaders);
    const status = response.status;
    if (status === 401) {
        return { status };
    } else {
        const data = await response.json();
        return { status, data };
    }
};

export const updateData = async (id, body) => {
    const authHeaders = getAuthHeaders();
    const response = await client.patch(`/api/users/update/data/${id}`, body, authHeaders);
    const status = response.status;
    if (status === 401) {
        return { status };
    } else {
        const data = await response.json();
        return { status, data };
    }
};
export const updateEmail = async (id, body) => {
    const authHeaders = getAuthHeaders();
    const response = await client.patch(`/api/users/update/email/${id}`, body, authHeaders);
    const status = response.status;
    if (status === 401) {
        return { status };
    } else {
        const data = await response.json();
        return { status, data };
    }
};
export const updatePassword = async (id, body) => {
    const authHeaders = getAuthHeaders();
    const response = await client.patch(`/api/users/update/password/${id}`, body, authHeaders);
    const status = response.status;
    if (status === 401) {
        return { status };
    } else {
        const data = await response.json();
        return { status, data };
    }
};

export const manageAccount = async (type, body) => {
    const response = await client.post(`/api/users/account/${type}`, body);
    const status = response.status;
    const data = response.json();
    return { status, data };
};
