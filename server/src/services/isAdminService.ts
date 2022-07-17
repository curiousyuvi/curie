import Room from "../models/Room";

const isAdminService = async (rid, uid) => {

    const room = await Room.findById(rid);
    try {
        if (room) {
            if (room.admins)
                if (room.admins.find(admin => admin === uid))
                    return true
        }

        return false;
    } catch (err) {
        console.error('Error in getting room: ', err)
        return false
    }
}
export default isAdminService