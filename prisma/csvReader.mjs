import fs from 'fs';


/**
 * 
 * @param {string} csvFilePath 
 * @returns 
 */
export async function readCSV(csvFilePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(csvFilePath, 'utf8', (err, data) => {
            if (err){
                reject(err);
                return;
            }

            const rows = data.split('\n');

            if (rows.length === 0) {
                reject('Bruh, it\'s empty ');
                return;
            }

            const headers = rows[0]?.split(',').map(header => header.trim());

            const jsonData = rows.slice(1).map(row=> {
                const values = row.split(',').map(value => value.trim());
                let obj = {};
                headers?.forEach((header, index) => {
                    //@ts-ignore
                    obj[header] = values[index] || null;
                });
                return obj;
            });
            resolve(jsonData);
        });
    });
}