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