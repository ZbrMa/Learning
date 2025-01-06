import bcrypt from 'bcrypt';

export async function hashPass(password:string,rounds:number):Promise<string | Error>{
    try {
        const salt = await bcrypt.genSalt(rounds);
        const hash = await bcrypt.hash(password,salt);
        return hash;
    } catch (err) {
        return err as Error;
    };
    
};

export async function verifyPass(stored:string,input:string):Promise<boolean>{
    try {
        const match = await bcrypt.compare(input,stored);
        return match;
    } catch(err) {
        return false;
    };
};

export function randomPass(length:number):string {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789@&#*';
    
    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }
    return result;
};