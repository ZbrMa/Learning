export function generateIntervals(startDate:string,endDate:string,interval:number):string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    let dates: string[] = [];
  
    start.setDate(start.getDate());
    end.setDate(end.getDate() + 1);
  
    while (start <= end) {
      dates.push(start.toISOString().split('T')[0]);
      start.setDate(start.getDate() + interval);
  }
    return dates
  };

export function convertToHourString(input:number){

  const totalMinutes = Math.floor(input * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  return formattedTime;
};