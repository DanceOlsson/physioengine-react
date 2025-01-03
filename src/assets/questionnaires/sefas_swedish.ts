import { Questionnaire } from "../../lib/types/questionnaire.types";

export const questions: Questionnaire[] = [
  {
    title: "SEFAS",
    subtitle: "Selfreported foot and ankle score",
    instructions: "",
    sections: [
      {
        title: "",
        questions: [
          {
            id: "Q1",
            text: "Hur skulle Du vilja beskriva den smärta som Du upplever här från den aktuella foten/fotleden?",
            type: "regular",
            options: [
              { value: 0, text: "Ingen smärta alls" },
              { value: 1, text: "Mycket obetydlig" },
              { value: 2, text: "Obetydlig" },
              { value: 3, text: "Måttlig" },
              { value: 4, text: "Svår" }
            ]
          },
          {
            id: "Q2", 
            text: "Under hur lång tid har Du kunnat promenera innan det uppstår svår smärta från den aktuella foten/fotleden?",
            type: "regular",
            options: [
              { value: 0, text: "Ingen smärta under de första 30 min" },
              { value: 1, text: "16-30 min" },
              { value: 2, text: "5-10 min" },
              { value: 3, text: "Jag kan bara gå runt huset eller motsvarande sträcka" },
              { value: 4, text: "Jag kan inte alls gå pga. svår smärta" }
            ]
          },
          {
            id: "Q3",
            text: "Har Du kunnat gå på ojämn mark?",
            type: "regular", 
            options: [
              { value: 0, text: "Ja, med lätthet" },
              { value: 1, text: "Med obetydlig svårighet" },
              { value: 2, text: "Med måttlig svårighet" },
              { value: 3, text: "Med mycket stor svårighet" },
              { value: 4, text: "Kan inte alls gå på ojämn mark" }
            ]
          },
          {
            id: "Q4",
            text: "Har Du tvingats använda inlägg i skon, hälförhöjning eller specialgjorda skor?",
            type: "regular",
            options: [
              { value: 0, text: "Aldrig" },
              { value: 1, text: "Bara tillfälligtvis" },
              { value: 2, text: "Ofta" },
              { value: 3, text: "Större delen av tiden" },
              { value: 4, text: "Alltid" }
            ]
          },
          {
            id: "Q5",
            text: "Hur mycket har smärtan från den aktuella foten/fotleden hindrat Dig i Ditt vanliga arbete (inkl hushållsarbete och hobbyverksamhet)?",
            type: "regular",
            options: [
              { value: 0, text: "Inte alls" },
              { value: 1, text: "Lite grand" },
              { value: 2, text: "I måttlig grad" },
              { value: 3, text: "I betydande utsträckning" },
              { value: 4, text: "Helt och hållet" }
            ]
          },
          {
            id: "Q6",
            text: "Orsakar den aktuella foten/fotleden att Du haltar?",
            type: "regular",
            options: [
              { value: 0, text: "Någon enstaka gång under 1-2 dagar" },
              { value: 1, text: "Av och till" },
              { value: 2, text: "De flesta dagar" },
              { value: 3, text: "Varje dag" }
            ]
          },
          {
            id: "Q7",
            text: "Har Du kunnat gå i trappa?",
            type: "regular",
            options: [
              { value: 0, text: "Ja, med lätthet" },
              { value: 1, text: "Utan större svårighet" },
              { value: 2, text: "Med måttlig svårighet" },
              { value: 3, text: "Med mycket stort besvär" },
              { value: 4, text: "Inte alls" }
            ]
          },
          {
            id: "Q8",
            text: "Har Du ont i den aktuella foten/fotleden nattetid?",
            type: "regular",
            options: [
              { value: 0, text: "Aldrig" },
              { value: 1, text: "Bara någon enstaka natt" },
              { value: 2, text: "Av och till" },
              { value: 3, text: "De flesta nätter" },
              { value: 4, text: "Varje natt" }
            ]
          },
          {
            id: "Q9",
            text: "Hur mycket har smärta från den aktuella foten/fotleden inverkat på Dina vanliga fritidsaktiviteter?",
            type: "regular",
            options: [
              { value: 0, text: "Inte alls" },
              { value: 1, text: "Något lite" },
              { value: 2, text: "I måttlig grad" },
              { value: 3, text: "I hög utsträckning" },
              { value: 4, text: "Hindrat mig helt och hållet" }
            ]
          },
          {
            id: "Q10",
            text: "Har foten/fotleden svullnat?",
            type: "regular",
            options: [
              { value: 0, text: "Inte alls" },
              { value: 1, text: "Tillfälligtvis" },
              { value: 2, text: "Ofta" },
              { value: 3, text: "Större delen av tiden" },
              { value: 4, text: "Alltid" }
            ]
          },
          {
            id: "Q11",
            text: "Hur smärtande har den aktuella foten/fotleden varit när Du rest Dig efter att ha suttit vid ett bord och ätit?",
            type: "regular",
            options: [
              { value: 0, text: "Inte alls smärtande" },
              { value: 1, text: "Bara lite smärtande" },
              { value: 2, text: "Måttligt smärtande" },
              { value: 3, text: "Mycket smärtande" },
              { value: 4, text: "Smärtan har varit outhärdlig" }
            ]
          },
          {
            id: "Q12",
            text: "Har Du upplevt en plötslig knivskarp, huggande smärta eller kramp från den aktuella foten/fotleden?",
            type: "regular",
            options: [
              { value: 0, text: "Aldrig" },
              { value: 1, text: "Någon enstaka dag" },
              { value: 2, text: "Av och till" },
              { value: 3, text: "De flesta dagar" },
              { value: 4, text: "Varje dag" }
            ]
          }
        ]
      }
    ]
  }
];

export default questions;