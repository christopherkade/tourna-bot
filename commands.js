import "dotenv/config";
import { InstallGlobalCommands } from "./utils.js";

const CREATE_TOURNAMENT = {
  name: "tournament",
  description: "Create a custom bracket tournament",
  options: [
    {
      type: 3,
      name: "title",
      description: "The title of the tournament",
      required: true,
    },
  ],
  type: 1,
};

const CLOSE_TOURNAMENT = {
  name: "close-tournament",
  description: "Close an active tournament",
  type: 1,
};

const HELP = {
  name: "help",
  description: "Get the list of available commands",
  type: 1,
};

const ALL_COMMANDS = [HELP, CREATE_TOURNAMENT, CLOSE_TOURNAMENT];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
