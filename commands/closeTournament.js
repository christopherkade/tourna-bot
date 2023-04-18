import {
  InteractionResponseType,
  MessageComponentTypes,
  InteractionResponseFlags,
} from "discord-interactions";

import { activeTournaments } from "../app.js";
import { getActiveTournamentsArray, DiscordRequest } from "../utils.js";

const closeSelectedTournament = async (data, res, req) => {
  const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;

  const tournamentId = data.values[0];
  const tournamentTitle = activeTournaments[tournamentId]?.title;

  if (activeTournaments[tournamentId]) {
    delete activeTournaments[tournamentId];

    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `:wastebasket: Deleted tournament ${tournamentTitle} :wastebasket:`,
      },
    });

    // Delete the select message
    await DiscordRequest(endpoint, { method: "DELETE" });
  }
};

const closeTournament = (req, res, id) => {
  console.log("Active tournaments", activeTournaments);
  const tournamentArray = getActiveTournamentsArray();

  if (tournamentArray.length === 0) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content:
          "There are no active tournaments at the moment.\nUse the `/tournament` command to create one :sparkles:",
      },
    });
  }

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    flags: InteractionResponseFlags.EPHEMERAL,
    data: {
      content:
        ":warning: Deletion is permanent :warning:\n\nPlease select the tournament you wish to delete :point_down:\n",
      components: [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: MessageComponentTypes.STRING_SELECT,
              custom_id: `close_tournament_${id}`,
              options: tournamentArray,
              label: "Active tournaments",
            },
          ],
        },
      ],
    },
  });
};

export { closeTournament, closeSelectedTournament };
