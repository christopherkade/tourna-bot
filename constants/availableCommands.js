export const AVAILABLE_COMMANDS = {
  HELP: "help",
  TOURNAMENT: "tournament",
  CLOSE_TOURNAMENT: "close-tournament",
};

export const DETAILED_COMMANDS = {
  [AVAILABLE_COMMANDS.TOURNAMENT]: {
    label: "/tournament",
    description: "Create a custom bracket tournament",
    parameters: ["title"],
  },
  [AVAILABLE_COMMANDS.CLOSE_TOURNAMENT]: {
    label: "/close-tournament",
    description: "Close an active tournament",
  },
};
