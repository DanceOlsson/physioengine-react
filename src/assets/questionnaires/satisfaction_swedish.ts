import { KoosQuestionnaire } from "../../lib/types/koos.types";

export const questions: KoosQuestionnaire[] = [
  {
    title: "Patientnöjdhet",
    subtitle: "Kort enkät om din upplevelse",
    instructions: "Vänligen besvara följande frågor om din upplevelse av vården.",
    sections: [
      {
        title: "Generell nöjdhet",
        instructions: "Markera det alternativ som bäst beskriver din upplevelse.",
        questions: [
          {
            id: "S1",
            text: "Hur nöjd är du med din behandling?",
            options: [
              { value: 0, text: "Mycket missnöjd" },
              { value: 1, text: "Missnöjd" },
              { value: 2, text: "Neutral" },
              { value: 3, text: "Nöjd" },
              { value: 4, text: "Mycket nöjd" }
            ]
          }
        ]
      }
    ]
  }
];

export default questions; 