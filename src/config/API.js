import axios from "axios";
var BaseUrl = "";
// API User
export const getUser = async () => {

    const res = await axios.get(`/users`);

    return await res.data;
};


export const addtUser = async (user) => {

    const res = await axios.post(`/users`, user);

    return await res.data;
};

export const updateUser = async (user) => {

    const res = await axios.put(`/users`, user);

    return await res.data;
};

export const deleteUser = async (id) => {

    const res = await axios.delete(`/users/${id}`);

    return await res.data;
};




//API pekerjaan
export const pekerjaan = async () => {

    const res = await axios.get(`/pekerjaan`);

    return await res.data;
};

//API Pendidikan
export const pendidikan = async () => {

    const res = await axios.get(`/pendidikan`);

    return await res.data;
};


/// API Login

export const loginAdmin = async (login) => {

    const res = await axios.post(`/login`, login);

    return await res.data;
};

export const register = async (user) => {

    const res = await axios.post(`/register`, user);

    return await res.data;
};