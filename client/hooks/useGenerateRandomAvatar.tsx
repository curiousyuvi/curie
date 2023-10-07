import useGenerateRandomString from "./useGenerateRandomString";

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const componentToHex = (c: number) => {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

const rgbToHex = (r: number, g: number, b: number) => {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const generateRandomColorHex: () => string = () => {
  return rgbToHex(
    randomNumber(200, 120),
    randomNumber(200, 120),
    randomNumber(200, 120)
  );
};

const generateRandomAvatar: (sprites: string) => string = (sprites) => {
  const diceBearAvatarEndpoint = "https://api.dicebear.com/7.x";
  const generateRandomString = useGenerateRandomString;

  return `${diceBearAvatarEndpoint}/${sprites}/svg?backgroundColor=${generateRandomColorHex()}&seed=${generateRandomString(
    16
  )}`;
};

const useGenerateRandomAvatar = () => generateRandomAvatar;

export default useGenerateRandomAvatar;
