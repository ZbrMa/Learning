export type ExpectedTimerFormat = 'HH:mm:ss' | 'mm:ss' | 'ss';

export  function secondsToTime(seconds:number,expectedFormat:ExpectedTimerFormat):string {

    if(expectedFormat === 'HH:mm:ss'){
        return new Date(seconds * 1000).toISOString().substring(11, 16)
    } else if (expectedFormat === 'mm:ss') {
        return new Date(seconds * 1000).toISOString().substring(14, 19)
    } else return new Date(seconds * 1000).toISOString().substring(14, 19)
};