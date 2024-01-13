"use client";
import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";

import { DossierData } from "@/repository/database";
import AmendementCard from "./AmendementCard";

export default function AmendementsList(
  props: Pick<DossierData, "amendements" | "acteurs"> & { numero: string }
) {
  const { amendements, acteurs, numero } = props;

  const filteredAmendements = amendements
    .filter((amendement) => {
      if (numero === "") {
        return true;
      }
      return amendement.numeroLong
        .toLowerCase()
        .startsWith(numero.toLowerCase());
    })
    .filter(
      ({ texteLegislatifRefUid }) =>
        texteLegislatifRefUid === "PIONANR5L16B0360"
    )
    .sort((a, b) =>
      Number.parseInt(a.numeroOrdreDepot) < Number.parseInt(b.numeroOrdreDepot)
        ? -1
        : 1
    );

  return (
    <Stack>
      {filteredAmendements.slice(0, 10).map((amendement) => (
        <React.Fragment key={amendement.uid}>
          <AmendementCard
            {...amendement}
            acteur={acteurs[amendement.acteurRefUid]}
          />
          <Divider />
        </React.Fragment>
      ))}
    </Stack>
  );
}