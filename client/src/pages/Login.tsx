import Lottie from "react-lottie";
import PrimaryButton from "../components/PrimaryButton";
import useAuth from "../hooks/useAuth";
import loader from "../assets/bounce_loader_lottie_w.json";

export default function Login() {
  const { authLoading } = useAuth();
  if (authLoading)
    return (
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: loader,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={300}
        width={300}
      />
    );
  return (
    <div className="w-96 bg-indigo-700/50 p-8 rounded-lg flex flex-col items-center">
      <img
        src={require("../assets/logo.png")}
        alt="curie-logo"
        className="w-44 mb-4"
      />
      <img
        src={require("../assets/heading.png")}
        alt="CURIE"
        className="w-32 mb-8"
      />
      <p className="text-xl mb-4">{"🤗 "}Welcome to Curie</p>
      <a
        href={process.env.REACT_APP_API_ENDPOINT + "/api/auth/login"}
        className="w-full"
      >
        <PrimaryButton onClick={() => {}}>LOG IN WITH SPOTIFY</PrimaryButton>
      </a>
    </div>
  );
}
