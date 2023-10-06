import dayjs from 'dayjs';

export const fromStringToDate = (dateStr) => {
  return dayjs(dateStr, 'MMMM, YYYY');
};

export const fromDateToString = (date) => {
  return dayjs(date).format('MMMM, YYYY');
};

export const defaultDate = () => {
  return dayjs();
};
