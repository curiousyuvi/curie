export default function Header() {
  return (
    <div className="w-full h-16 bg-indigo-700/50 text-gray-200 flex px-4 py-2 sm:rounded-tl-lg sm:rounded-tr-lg backdrop-blur-md border border-x-0 border-t-0 border-indigo-300/30 items-center rounded-none">
      <div className="flex sm:justify-start justify-center items-start w-full">
        <img
          src={require("../assets/logo.png")}
          alt="curie-logo"
          className="h-8"
        />
        <div className="w-2" />
        <img
          src={require("../assets/heading.png")}
          alt="CURIE"
          className="h-6"
        />
      </div>
    </div>
  );
}
