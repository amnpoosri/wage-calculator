import {Shift} from '../types/employee';
import {getStartDateTime, getEndDateTime, minutesToHour} from './time_utils';

import moment from 'moment';

const HOURLY_WAGE = 4.25;

const EVENING_HOURLY_WAGE = 1.25;
const EVENING_SHIFT_START_HOUR = 19;
const EVENING_SHIFT_END_HOUR = 6;

const MULTIPLIER_1 = 1.25;
const MULTIPLIER_2 = 1.5;
const MULTIPLIER_3 = 2;

const REGULAR_HOUR = 8;
const OVERTIME_HOUR1 = 3;
const OVERTIME_HOUR2 = 4;

export function calculateMonthlyWage(shifts?: Shift[]): number {
  let monthlyWage = 0;
  if (shifts === undefined || shifts.length === 0) {
    return monthlyWage;
  }
  shifts.forEach(shift => {
    monthlyWage =
      monthlyWage +
      calculateDailyWage(shift.date, shift.startTime, shift.endTime);
  });

  return parseFloat(monthlyWage.toFixed(2));
}

export function calculateDailyWage(
  date: string,
  startTime: string,
  endTime: string,
): number {
  let workStartDate = moment(date, 'DD-MM-YYYY HH-mm');
  let startDateTime = getStartDateTime(workStartDate, startTime);
  let endDateTime = getEndDateTime(workStartDate, startDateTime, endTime);

  let regularWage = 0;
  let overtimeCompensation = 0;
  let eveningCompensaion = 0;

  let totalWorkHours = minutesToHour(
    endDateTime.diff(startDateTime, 'minutes'),
  );

  // Calculate evening compenstaion
  let eveningWorkHours = calculateEveningWorkHours(startDateTime, endDateTime);
  eveningCompensaion = calculateEveningCompensation(eveningWorkHours);

  // Calculate overtime compensation
  overtimeCompensation = calculateOvertimePay(totalWorkHours);

  // Calculate regular wage
  regularWage = calculateRegularPay(totalWorkHours);

  //Round to 2 decimals
  return parseFloat(
    (regularWage + eveningCompensaion + overtimeCompensation).toFixed(2),
  );
}

function calculateEveningWorkHours(
  start: moment.Moment,
  end: moment.Moment,
): number {
  let eveningWorkHours = 0;
  let eveningShiftStart = start
    .clone()
    .hour(EVENING_SHIFT_START_HOUR)
    .minute(0);
  let eveningShiftEnd = start
    .clone()
    .hour(EVENING_SHIFT_END_HOUR)
    .minute(0);

  if (end.isAfter(eveningShiftStart)) {
    if (start.isAfter(eveningShiftStart)) {
      eveningWorkHours =
        eveningWorkHours + minutesToHour(end.diff(start, 'minutes'));
    } else {
      eveningWorkHours =
        eveningWorkHours +
        minutesToHour(end.diff(eveningShiftStart, 'minutes'));
    }
  }

  if (start.isBefore(eveningShiftEnd)) {
    if (end.isBefore(eveningShiftEnd)) {
      eveningWorkHours =
        eveningWorkHours + minutesToHour(end.diff(start, 'minutes'));
    } else {
      eveningWorkHours =
        eveningWorkHours +
        minutesToHour(eveningShiftEnd.diff(start, 'minutes'));
    }
  }

  return eveningWorkHours;
}

function calculateOvertimePay(hours: number): number {
  let overtimePay = 0;
  if (hours <= 8) {
    return overtimePay;
  } else {
    if (hours > REGULAR_HOUR + OVERTIME_HOUR2) {
      overtimePay =
        overtimePay +
        calculateOverTimeCompensation3(
          hours - (REGULAR_HOUR + OVERTIME_HOUR1),
        ) +
        calculateOverTimeCompensation2(1) +
        calculateOverTimeCompensation1(3);
    } else if (hours > REGULAR_HOUR + OVERTIME_HOUR1) {
      overtimePay =
        overtimePay +
        calculateOverTimeCompensation2(
          hours - (REGULAR_HOUR + OVERTIME_HOUR1),
        ) +
        calculateOverTimeCompensation1(3);
    } else {
      overtimePay =
        overtimePay + calculateOverTimeCompensation1(hours - REGULAR_HOUR);
    }

    return overtimePay;
  }
}

const calculateRegularPay = (hours: number): number => {
  if (hours <= REGULAR_HOUR) {
    return hours * HOURLY_WAGE;
  } else {
    return REGULAR_HOUR * HOURLY_WAGE;
  }
};

const calculateEveningCompensation = (hours: number): number => {
  return hours * EVENING_HOURLY_WAGE;
};

const calculateOverTimeCompensation1 = (hours: number): number => {
  return hours * (HOURLY_WAGE * MULTIPLIER_1);
};

const calculateOverTimeCompensation2 = (hours: number): number => {
  return hours * (HOURLY_WAGE * MULTIPLIER_2);
};

const calculateOverTimeCompensation3 = (hours: number): number => {
  return hours * (HOURLY_WAGE * MULTIPLIER_3);
};

export default {
  calculateMonthlyWage,
  calculateDailyWage,
};
