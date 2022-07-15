export type RoomContext = {
    room: Room;
    loadRoom: () => void;
    userShorts: UserShort[];
    roomLoading: boolean;
    voting: boolean;
    setVoting: (voting: boolean) => void;
}