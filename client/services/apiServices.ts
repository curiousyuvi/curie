import axios from "axios";
import { RoomShort } from "../interfaces/RoomShort";

export const apiInstance = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? '/api' : 'http://localhost:5000/api',
});

export const createRoomAPI = (newRoom: RoomShort) => {
    return apiInstance({ url: '/room', method: 'POST', data: newRoom })
}

export const getRoomAPI = ({ queryKey }: { queryKey: any }) => {
    const [, rid] = queryKey
    return apiInstance({ url: `/room/${rid}`, method: 'GET' })
}

export const deleteRoomAPI = (rid: string) => {
    return apiInstance({ url: `/room/${rid}`, method: 'DELETE' })
}