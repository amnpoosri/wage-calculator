import moment from 'moment';

export function getStartDateTime(date: moment.Moment, startTimeString: string) {
  let startTime = startTimeString.split(':'),
    startHour = parseInt(startTime[0], 10),
    startMinutes = parseInt(startTime[1], 10);

  return date
    .clone()
    .hour(startHour)
    .minute(startMinutes);
}

export function getEndDateTime(
  date: moment.Moment,
  startDateTime: moment.Moment,
  endTimeString: string,
) {
  let endTime = endTimeString.split(':'),
    endHour = parseInt(endTime[0], 10),
    endMinutes = parseInt(endTime[1], 10);

  if (endHour < startDateTime.hour()) {
    return date
      .clone()
      .add(1, 'day')
      .hour(endHour)
      .minute(endMinutes);
  } else {
    return date
      .clone()
      .hour(endHour)
      .minute(endMinutes);
  }
}

export function minutesToHour(minutes: number): number {
  return minutes / 60;
}
