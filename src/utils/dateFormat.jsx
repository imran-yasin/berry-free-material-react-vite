export function formatDate(apiDate) {
  const date = new Date(apiDate);
  //   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  //   const day = daysOfWeek[date.getUTCDay()];
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = months[date.getUTCMonth()]; // Get short month name
  const yyyy = date.getUTCFullYear();

  //   return `${day} ${dd} ${mm} ${yyyy}`;
  return `${dd} ${mm} , ${yyyy}`;
}

export function convertToAmPm(timeString) {
  if (!timeString) {
    return;
  }
  const [hours, minutes] = timeString.split(":");
  let amPm = "AM";
  let formattedHours = parseInt(hours, 10);

  if (formattedHours >= 12) {
    amPm = "PM";
    if (formattedHours > 12) {
      formattedHours -= 12;
    }
  }

  formattedHours = formattedHours.toString().padStart(2, "0");
  const formattedTime = `${formattedHours}:${minutes} ${amPm}`;

  return formattedTime;
}
