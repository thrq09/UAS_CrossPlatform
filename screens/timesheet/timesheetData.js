import timesheetData from './data.json';

export const getDataByWeek = (date) => {
  const currentDate = new Date(date);
  const day = currentDate.getDay(); // 0 = Minggu, 1 = Senin, dst.

  // Geser ke Senin
  const monday = new Date(currentDate);
  const diff = (day === 0 ? -6 : 1 - day);
  monday.setDate(currentDate.getDate() + diff);

  // Format key-nya jadi YYYY-MM-DD tanpa toISOString
  const pad = (num) => String(num).padStart(2, "0");
  const key = `${monday.getFullYear()}-${pad(monday.getMonth() + 1)}-${pad(monday.getDate())}`;

  console.log("KEY:", key);
  console.log("DATA DITEMUKAN:", timesheetData[key]);

  return timesheetData[key] || [];
};
