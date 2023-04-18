import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
} from "discord-interactions";
import { VerifyDiscordRequest, DiscordRequest } from "./utils.js";

import createTournament from "./commands/createTournament.js";
import {
  closeTournament,
  closeSelectedTournament,
} from "./commands/closeTournament.js";
import help from "./commands/help.js";

import { AVAILABLE_COMMANDS } from "./constants/availableCommands.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// TODO: How should we store active tournaments?
export const activeTournaments = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  console.log("Interaction caught, type:", type);

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    console.log("name", name);

    if (name === AVAILABLE_COMMANDS.TOURNAMENT) {
      createTournament(req, res, id);
    }

    if (name === AVAILABLE_COMMANDS.CLOSE_TOURNAMENT) {
      console.log("Requested tournament deletion...");
      closeTournament(req, res, id);
    }

    if (name === AVAILABLE_COMMANDS.HELP) {
      help(res);
    }
  }

  if (type === InteractionType.MESSAGE_COMPONENT) {
    const componentId = data.custom_id;

    // After the user selects a tournament to close
    if (componentId.startsWith("close_tournament")) {
      closeSelectedTournament(data, res, req);
    }
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
