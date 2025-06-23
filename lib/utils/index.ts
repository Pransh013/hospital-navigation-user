export const formatWaitingTime = (waitingTime: string | null): string => {
  if (!waitingTime) return "00:00:00";

  const timeParts = waitingTime.split(" ");
  let hours = 0;
  let minutes = 0;

  if (timeParts[1] === "hours" || timeParts[1] === "hour") {
    hours = parseInt(timeParts[0]);
  } else if (timeParts[1] === "minutes" || timeParts[1] === "minute") {
    minutes = parseInt(timeParts[0]);
  }

  const totalSeconds = hours * 3600 + minutes * 60;
  return new Date(totalSeconds * 1000).toISOString().slice(11, 19);
};
