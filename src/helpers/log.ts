export const log = (msg: string, type: string = "info"): void => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${type.toUpperCase()}] ${time} - ${msg}`);
};
