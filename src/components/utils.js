const timeDifference = (current, previous) => {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return "just now";
  }

  if (elapsed < milliSecondsPerMinute) {
    return "less than 1 min ago";
  }
  if (elapsed < milliSecondsPerHour) {
    return `${Math.round(elapsed / milliSecondsPerMinute)}m `;
  }
  return `${Math.round(elapsed / milliSecondsPerHour)}h `;
};

const timeDifferenceForDate = date => {
  const now = new Date().getTime();
  return timeDifference(now, date);
};

export default timeDifferenceForDate;
