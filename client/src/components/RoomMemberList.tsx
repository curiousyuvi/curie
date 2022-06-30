import { UserShort } from "../interfaces/UserShort";
import RoomMemberListTile from "./RoomMemberListTile";

const RoomMemberList = ({
  userShorts,
  admins,
}: {
  userShorts: UserShort[];
  admins: string[];
}) => {
  return (
    <div>
      {userShorts.map((userShort) => {
        return (
          <RoomMemberListTile
            key={userShort.uid}
            user={userShort}
          ></RoomMemberListTile>
        );
      })}
    </div>
  );
};

export default RoomMemberList;
