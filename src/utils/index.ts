export const getHumidex = ({ temp, humidity }) => {
  const e = 6.112 * Math.pow(10, (7.5 * temp) / (237.7 + temp)) * (humidity / 100);
  return Math.round(temp + (5 / 9) * (e - 10));
};
