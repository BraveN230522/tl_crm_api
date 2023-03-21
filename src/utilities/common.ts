export const getRandom4DigitsCode = () => Math.floor(1000 + Math.random() * 9000);

export const mbToByte = (mb: number) => mb * 1024 * 1024;
