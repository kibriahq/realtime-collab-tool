import { getToken } from "@/utils/token";
import axios from "axios";

export const userSearch = async (search: string, docId: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/docs/permissions/user-search`, {
        search,
        docId,
    }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return res.data;
}

export const addPermission = async (docId: string, userId: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/docs/permissions/add`, {
        docId,
        userId,
    }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return res.data;
}

export const removePermission = async (docId: string, userId: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/docs/permissions/remove`, {
        docId,
        userId,
    }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return res.data;
}