export interface Employee {
  name: string;
  id: string;
  shifts?: Shift[];
}

export interface Shift {
  date: string;
  startTime: string;
  endTime: string;
}
