import { useSelector } from "react-redux";
import { RootState } from "../store";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const { currentUser } = useSelector((state: RootState) => state.user);

  if (currentUser)
    return (
      <>
        <DesktopNavbar />
        <MobileNavbar />
      </>
    );
  else return <></>;
}
