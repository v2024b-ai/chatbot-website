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

    fountains.forEach((fountain) => {
      //parse the string into float values
      fountain.lat = parseFloat(fountain.lat);
      fountain.lng = parseFloat(fountain.lng);
      fountain.base_area = parseFloat(fountain.base_area);
      fountain.base_perimeter = parseFloat(fountain.base_perimeter);
      fountain.depth = parseFloat(fountain.depth);
      fountain.faucet_height_cm = parseFloat(fountain.faucet_height_cm);
      fountain.faucet_length_cm = parseFloat(fountain.faucet_length_cm);
      fountain.flow_rate = parseFloat(fountain.flow_rate);
      fountain.height = parseFloat(fountain.height);
      fountain.height_cm = parseFloat(fountain.height_cm);
      fountain.original_paint_remaining_pct = parseFloat(fountain.original_paint_remaining_pct);
      fountain.risk_factor_algae_pct = parseFloat(fountain.risk_factor_algae_pct);
      fountain.risk_factor_graffiti_pct = parseFloat(fountain.risk_factor_graffiti_pct);
      fountain.risk_factor_overall_damage_pct = parseFloat(fountain.risk_factor_overall_damage_pct);
      fountain.risk_factor_rust_percent = parseFloat(fountain.risk_factor_rust_percent);
      fountain.risk_factor_surface_damage_percent = parseFloat(fountain.risk_factor_surface_damage_percent);
      fountain.surface_area_sq_cm = parseFloat(fountain.surface_area_sq_cm);
      fountain.totalDonated = parseFloat(fountain.totalDonated);
      fountain.width = parseFloat(fountain.width);
      fountain.width_cm = parseFloat(fountain.width_cm);
      
      //parse the string into Boolean values 
      fountain.bolted_to_ground = stringToBoolean(fountain.bolted_to_ground);
      fountain.high_traffic_area = stringToBoolean(fountain.high_traffic_area);
      fountain.raised_drain = stringToBoolean(fountain.raised_drain);
      fountain.running = stringToBoolean(fountain.running);
      fountain.service_panel = stringToBoolean(fountain.service_panel);

      //parse the string into Int values
      fountain.number_of_drains = parseInt(fountain.number_of_drains);
    })
    await prisma.fountainsCSV.createMany({
        data: fountains
    })
}

function stringToBoolean(str) {
  // Normalize the string to lowercase for case-insensitive matching

  if (str === null){
    return null;
  }

  const normalizedStr = str.toLowerCase();

  // Check for various truthy and falsy string values
  if (normalizedStr === "true" || normalizedStr === "1") {
    return true;
  } else if (normalizedStr === "false" || normalizedStr === "0") {
    return false;
  }

  // Return a default value (false) if the string doesn't match any of the expected values
  return false;
}

try {
  await main();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
