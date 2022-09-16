export const logDate = () => {
  const dayMonth = new Date().getDate();
  const month = new Date().getMonth();
  const hours = new Date().getHours();
  const min = new Date().getMinutes();
  const seg = new Date().getSeconds();
  return (
    dayMonth + '/' + (month + 1) + ': ' + hours + ':' + min + ':' + seg + ': '
  );
};
