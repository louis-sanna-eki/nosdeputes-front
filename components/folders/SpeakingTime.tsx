import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type SpeakingTimeCardProps = {
  wordsPerGroup: Record<
    string,
    {
      count: number;
      color: string;
      libelleShort: string;
    }
  >;
};

// TODO: Define a more robust order of political parties.
const partyOrder = [
  "LFI - NUPES",
  "GDR - NUPES",
  "Ecolo - NUPES",
  "SOC",
  "LIOT",
  "RE",
  "Dem",
  "HOR",
  "LR",
  "RN",
  "HOR",
];

function sortParty(a: string, b: string) {
  return partyOrder.indexOf(a) - partyOrder.indexOf(b);
}

export const SpeakingTime = (props: SpeakingTimeCardProps) => {
  const { wordsPerGroup } = props;

  if (!wordsPerGroup) {
    return null;
  }

  const totalWords = Object.values(wordsPerGroup).reduce((acc, val) => {
    return val.count + acc;
  }, 0);

  const sortedKeys = Object.keys(wordsPerGroup).sort((a, b) =>
    sortParty(wordsPerGroup[a].libelleShort, wordsPerGroup[b].libelleShort)
  );

  return (
    <React.Fragment>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        {sortedKeys.map((groupUid) => {
          const { count, color } = wordsPerGroup[groupUid];
          return (
            <div
              key={groupUid}
              style={{
                height: 8,
                backgroundColor: color,
                borderRadius: 4,
                flex: count / totalWords,
              }}
            />
          );
        })}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        {sortedKeys.map((groupUid) => {
          const { count, libelleShort } = wordsPerGroup[groupUid];
          return (
            <Typography key={groupUid} fontWeight="bold" variant="caption">
              {libelleShort} :{" "}
              {((100 * count) / totalWords).toFixed(1).replace(".0", "")}%
            </Typography>
          );
        })}
      </Stack>
    </React.Fragment>
  );
};
