import RNFS from 'react-native-fs';
import {Platform} from 'react-native';

import {Employee} from '../types/employee';

export async function loadAndParseCSVFile(
  fileName: string,
): Promise<Employee[] | null> {
  if (Platform.OS === 'ios') {
    return RNFS.readFile(RNFS.MainBundlePath + '/' + fileName, 'utf8')
      .then((data: any) => {
        return parseCSVDataToShifts(data);
      })
      .catch((err: any) => {
        console.log(err);
        return null;
      });
  } else {
    return RNFS.readFileAssets(fileName, 'utf8')
      .then(data => {
        return parseCSVDataToShifts(data);
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }
}

export function parseCSVDataToShifts(data: any): Employee[] {
  // Splits row into arrays
  let splittedShiftStrings: string[] = data.split('\n');
  let employees: Employee[] = [];

  // Skip first row
  for (let i = 1; i < splittedShiftStrings.length; i++) {
    let shiftSplittedData: string[] = splittedShiftStrings[i].split(',');

    // Push only valid data
    if (shiftSplittedData.length === 5) {
      const employeeId: string = shiftSplittedData[1];
      if (!employees.some(employee => employee.id === employeeId)) {
        employees.push({
          id: employeeId,
          name: shiftSplittedData[0],
          shifts: [],
        });
      }

      let employeeData = employees.find(employee => employeeId === employee.id);
      if (employeeData) {
        employeeData!.shifts!.push({
          date: shiftSplittedData[2],
          startTime: shiftSplittedData[3],
          endTime: shiftSplittedData[4],
        });
      }
    }
  }
  return employees;
}
