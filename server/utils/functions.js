// Utility function example

const fs = require("fs");



// read any file and returns it in js object
export const readJsonFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    throw error;
  }
};

export async function writeStringToFile(filePath, content) {
  console.log(filePath);
  try {
    // Write the string content to the specified file
    await fs.promises.writeFile(filePath, content, "utf8");
    console.log(`Content successfully written to ${filePath}`);
  } catch (error) {
    // Handle errors (e.g., file not found, permission issues)
    console.error(`Error writing to file: ${error.message}`);
  }
}

export function getNextid(database_obj) {
  let last_note_id = database_obj[database_obj.length - 1].id;
  return Number(last_note_id.substring(8)) + 1;
}
