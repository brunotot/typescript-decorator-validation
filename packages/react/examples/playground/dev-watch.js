import { exec } from "child_process";
import { watch } from "chokidar";

// Specify the directories you want to watch for changes
const directoriesToWatch = ["./../../../core/src", "./../../src"]; // Adjust as needed

// Define the command to restart your Vite development server
const restartCommand = "npm run dev";

// Create a chokidar watcher
const watcher = watch(directoriesToWatch, {
  ignoreInitial: true, // Ignore initial scan to avoid unnecessary restarts
});

// Start the Vite development server
exec(restartCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting the server: ${error}`);
    return;
  }
  console.log(`Server started successfully.`);
});

// When a change is detected, execute the restart command
watcher.on("change", (path) => {
  console.log(`Change detected in ${path}. Restarting server...`);
  exec(restartCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during server restart: ${error}`);
      return;
    }
    console.log(`Server restarted successfully.`);
  });
});

// Handle errors
watcher.on("error", (error) => {
  console.error(`Watcher error: ${error}`);
});
