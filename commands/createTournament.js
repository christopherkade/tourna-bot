import { InteractionResponseType } from "discord-interactions";

import { activeTournaments } from "../app.js";

const createTournament = (req, res, id) => {
  const tournamentTitle = req.body.data.options[0].value;

  activeTournaments[id] = {
    title: tournamentTitle,
    players: [],
  };

  console.log("New active tournamed list", activeTournaments);

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `:trophy: ${tournamentTitle} created :trophy:\n\n`,
    },
  });
};

export default createTournament;
