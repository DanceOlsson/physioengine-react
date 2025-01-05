import { Questionnaire } from "@/lib/types/questionnaire.types";

export const questions: Questionnaire[] = [
  {
    title: "EQ-5D-5L",
    subtitle: "Health-Related Quality of Life Questionnaire",
    instructions: "Under varje rubrik, kryssa i EN ruta som bäst beskriver din hälsa IDAG.",
    interpretations: {
      ranges: {
        "1": "Inga problem",
        "2": "Lätta problem",
        "3": "Måttliga problem",
        "4": "Svåra problem",
        "5": "Extrema problem"
      },
      labels: {
        healthState: "Hälsotillstånd",
        vasScore: "VAS-poäng",
        notAnswered: "Ej besvarat"
      }
    },
    sections: [
      {
        title: "RÖRLIGHET",
        instructions: "",
        questions: [
          {
            id: "mobility",
            text: "Rörlighet",
            type: "regular",
            options: [
              { value: 0, text: "Jag har inga svårigheter med att gå omkring" },
              { value: 1, text: "Jag har lite svårigheter med att gå omkring" },
              { value: 2, text: "Jag har måttliga svårigheter med att gå omkring" },
              { value: 3, text: "Jag har stora svårigheter med att gå omkring" },
              { value: 4, text: "Jag kan inte gå omkring" }
            ]
          }
        ]
      },
      {
        title: "PERSONLIG VÅRD",
        instructions: "",
        questions: [
          {
            id: "selfCare",
            text: "Personlig vård",
            type: "regular",
            options: [
              { value: 0, text: "Jag har inga svårigheter med att tvätta mig eller klä mig" },
              { value: 1, text: "Jag har lite svårigheter med att tvätta mig eller klä mig" },
              { value: 2, text: "Jag har måttliga svårigheter med att tvätta mig eller klä mig" },
              { value: 3, text: "Jag har stora svårigheter med att tvätta mig eller klä mig" },
              { value: 4, text: "Jag kan inte tvätta mig eller klä mig" }
            ]
          }
        ]
      },
      {
        title: "VANLIGA AKTIVITETER",
        instructions: "(t ex arbete, studier, hushållssysslor, familje- eller fritidsaktiviteter)",
        questions: [
          {
            id: "activities",
            text: "Vanliga aktiviteter",
            type: "regular",
            options: [
              { value: 0, text: "Jag har inga svårigheter med att utföra mina vanliga aktiviteter" },
              { value: 1, text: "Jag har lite svårigheter med att utföra mina vanliga aktiviteter" },
              { value: 2, text: "Jag har måttliga svårigheter med att utföra mina vanliga aktiviteter" },
              { value: 3, text: "Jag har stora svårigheter med att utföra mina vanliga aktiviteter" },
              { value: 4, text: "Jag kan inte utföra mina vanliga aktiviteter" }
            ]
          }
        ]
      },
      {
        title: "SMÄRTOR/BESVÄR",
        instructions: "",
        questions: [
          {
            id: "pain",
            text: "Smärtor/besvär",
            type: "regular",
            options: [
              { value: 0, text: "Jag har varken smärtor eller besvär" },
              { value: 1, text: "Jag har lätta smärtor eller besvär" },
              { value: 2, text: "Jag har måttliga smärtor eller besvär" },
              { value: 3, text: "Jag har svåra smärtor eller besvär" },
              { value: 4, text: "Jag har extrema smärtor eller besvär" }
            ]
          }
        ]
      },
      {
        title: "ORO/NEDSTÄMDHET",
        instructions: "",
        questions: [
          {
            id: "anxiety",
            text: "Oro/nedstämdhet",
            type: "regular",
            options: [
              { value: 0, text: "Jag är varken orolig eller nedstämd" },
              { value: 1, text: "Jag är lite orolig eller nedstämd" },
              { value: 2, text: "Jag är ganska orolig eller nedstämd" },
              { value: 3, text: "Jag är mycket orolig eller nedstämd" },
              { value: 4, text: "Jag är extremt orolig eller nedstämd" }
            ]
          }
        ]
      },
      {
        title: "DIN HÄLSA IDAG",
        instructions: "Vi vill veta hur bra eller dålig din hälsa är IDAG.",
        questions: [
          {
            id: "vas",
            text: "Din hälsa idag",
            type: "slider",
            min: 0,
            max: 100,
            minLabel: "Sämsta hälsa du kan tänka dig",
            maxLabel: "Bästa hälsa du kan tänka dig"
          }
        ]
      }
    ]
  }
];

export default questions;