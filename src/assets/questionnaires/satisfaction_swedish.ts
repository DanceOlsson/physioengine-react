import { Questionnaire } from "../../lib/types/questionnaire.types";

export const questions: Questionnaire[] = [
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
              { value: 1, text: "Mycket missnöjd" },
              { value: 2, text: "Missnöjd" },
              { value: 3, text: "Neutral" },
              { value: 4, text: "Nöjd" },
              { value: 5, text: "Mycket nöjd" }
            ]
          }
        ]
      }
    ]
  }
];

export default questions; 