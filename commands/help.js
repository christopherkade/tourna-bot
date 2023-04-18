import { InteractionResponseType } from "discord-interactions";

import { DETAILED_COMMANDS } from "../constants/availableCommands.js";

const help = (res) => {
  const commandKeys = Object.keys(DETAILED_COMMANDS);

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `:question: Available commands :question:\n\n${commandKeys
        .map(
          (key) =>
            `**${DETAILED_COMMANDS[key].label}** - ${DETAILED_COMMANDS[key].description}`
        )
        .join("\n")}`,
    },
  });
};

export default help;
