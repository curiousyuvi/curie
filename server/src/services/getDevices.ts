import axios from "axios";

const getDevices = async (token: string) => {
    try {
        const requestConfig = {
            url: "https://api.spotify.com/v1/me/player/devices",
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios(requestConfig);
        if (response.status === 200) {
            const devices = response.data.devices.map((device) => {
                return {
                    id: device.id,
                    name: device.name,
                    isActive: device.is_active,
                };
            });

            return devices;
        } else return null;
    } catch (err) {
        console.error("Error in getting devices: ", err.response.data);
        return null;
    }
};

export default getDevices;
