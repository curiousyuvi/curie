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
    randomNumber(256, 80),
    randomNumber(256, 80),
    randomNumber(256, 80)
  );
};

const generateRandomMarble: () => string = () => {
  const boringAvatarsEndpoint =
    "https://source.boringavatars.com/marble/120/Stefan";

  return `${boringAvatarsEndpoint}?colors=${generateRandomColorHex()},${generateRandomColorHex()},${generateRandomColorHex()}`;
};

const useGenerateRandomMarble = () => generateRandomMarble;

export default useGenerateRandomMarble;
