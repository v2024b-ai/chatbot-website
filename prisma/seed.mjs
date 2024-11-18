import path from "path";
import { PrismaClient } from '@prisma/client';
import { readCSV } from "./csvReader.mjs";


const prisma = new PrismaClient();
const fountainsPath = path.join(path.resolve(), "prisma/fountains.csv");

const main = async () => {
    //read the csv data
    const fountains = await readCSV(fountainsPath);

    //delete the existing data before adding more 
    await prisma.fountainsCSV.deleteMany();

    await prisma.fountainsCSV.createMany({
        data: fountains
    })
}