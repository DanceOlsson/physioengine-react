import { KoosQuestionnaire } from "../../lib/types/koos.types";

export const questions: KoosQuestionnaire[] = [
  {
    title: "KOOS",
    subtitle: "Frågeformulär för knäpatienter",
    instructions: "Detta formulär innehåller frågor om hur du ser på ditt knä. Informationen ska hjälpa till att följa hur du mår och fungerar i ditt dagliga liv. Besvara frågorna genom att kryssa för det alternativ du tycker stämmer bäst in på dig (ett alternativ för varje fråga). Om du är osäker, kryssa ändå för det alternativ som känns riktigast.",
    sections: [
      {
        title: "Symptom",
        instructions: "Tänk på de symptom Du haft från ditt knä under den senaste veckan när Du besvarar dessa frågor.",
        questions: [
          {
            id: "S1",
            text: "Har knät varit svullet?",
            options: [
              { value: 0, text: "Aldrig" },
              { value: 1, text: "Sällan" },
              { value: 2, text: "Ibland" },
              { value: 3, text: "Ofta" },
              { value: 4, text: "Alltid" }
            ]
          },
          {
            id: "S2",
            text: "Har Du känt att det maler i knät eller hör Du klickande eller andra ljud från knät?",
            options: [
              { value: 0, text: "Aldrig" },
              { value: 1, text: "Sällan" },
              { value: 2, text: "Ibland" },
              { value: 3, text: "Ofta" },
              { value: 4, text: "Alltid" }
            ]
          },
          {
            id: "S3",
            text: "Har knät hakat upp sig eller låst sig?",
            options: [
              { value: 0, text: "Aldrig" },
              { value: 1, text: "Sällan" },
              { value: 2, text: "Ibland" },
              { value: 3, text: "Ofta" },
              { value: 4, text: "Alltid" }
            ]
          },
          {
            id: "S4",
            text: "Har Du kunnat sträcka knät helt?",
            options: [
              { value: 0, text: "Alltid" },
              { value: 1, text: "Ofta" },
              { value: 2, text: "Ibland" },
              { value: 3, text: "Sällan" },
              { value: 4, text: "Aldrig" }
            ]
          },
          {
            id: "S5",
            text: "Har Du kunnat böja knät helt?",
            options: [
              { value: 0, text: "Alltid" },
              { value: 1, text: "Ofta" },
              { value: 2, text: "Ibland" },
              { value: 3, text: "Sällan" },
              { value: 4, text: "Aldrig" }
            ]
          }
        ]
      },
      {
        title: "Stelhet",
        instructions: "Följande frågor rör ledstelhet. Ledstelhet innebär svårighet att komma igång eller ökat motstånd då Du böjer eller sträcker i knät. Markera graden av ledstelhet Du har upplevt i ditt knä den senaste veckan.",
        questions: [
          {
            id: "S6",
            text: "Hur stelt har ditt knä varit när Du just har vaknat på morgonen?",
            options: [
              { value: 0, text: "Inte alls" },
              { value: 1, text: "Något" },
              { value: 2, text: "Måttligt" },
              { value: 3, text: "Mycket" },
              { value: 4, text: "Extremt" }
            ]
          },
          {
            id: "S7",
            text: "Hur stelt har ditt knä varit efter att Du har suttit eller legat och vilat senare under dagen?",
            options: [
              { value: 0, text: "Inte alls" },
              { value: 1, text: "Något" },
              { value: 2, text: "Måttligt" },
              { value: 3, text: "Mycket" },
              { value: 4, text: "Extremt" }
            ]
          }
        ]
      },
      {
        title: "Smärta",
        instructions: "Vilken grad av smärta har Du känt i ditt knä den senaste veckan under följande aktiviteter?",
        questions: [
          {
            id: "P1",
            text: "Hur ofta har Du ont i knät?",
            options: [
              { value: 0, text: "Aldrig" },
              { value: 1, text: "Varje månad" },
              { value: 2, text: "Varje vecka" },
              { value: 3, text: "Varje dag" },
              { value: 4, text: "Alltid" }
            ]
          },
          {
            id: "P2",
            text: "Snurra/vrida på belastat knä",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Svår" },
              { value: 4, text: "Mycket svår" }
            ]
          },
          {
            id: "P3",
            text: "Sträcka knät helt",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Svår" },
              { value: 4, text: "Mycket svår" }
            ]
          },
          {
            id: "P4",
            text: "Böja knät helt",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Svår" },
              { value: 4, text: "Mycket svår" }
            ]
          },
          {
            id: "P5",
            text: "Gå på jämnt underlag",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Svår" },
              { value: 4, text: "Mycket svår" }
            ]
          },
          {
            id: "P6",
            text: "Gå upp eller ner för trappor",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Svår" },
              { value: 4, text: "Mycket svår" }
            ]
          },
          {
            id: "P7",
            text: "Under natten i sängläge (smärta som stör sömnen)",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Svår" },
              { value: 4, text: "Mycket svår" }
            ]
          },
          {
            id: "P8",
            text: "Sittande eller liggande",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Svår" },
              { value: 4, text: "Mycket svår" }
            ]
          },
          {
            id: "P9",
            text: "Stående",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Svår" },
              { value: 4, text: "Mycket svår" }
            ]
          }
        ]
      },
      {
        title: "Funktion, dagliga livet",
        instructions: "Följande frågor rör din fysiska förmåga. Ange graden av svårighet du upplevt den senaste veckan vid följande aktiviteter på grund av dina knäbesvär.",
        questions: [
          {
            id: "A1",
            text: "Gå nerför trappor",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A2",
            text: "Gå uppför trappor",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A3",
            text: "Resa dig upp från sittande",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A4",
            text: "Stå stilla",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A5",
            text: "Böja Dig, t.ex. för att plocka upp ett föremål från golvet",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A6",
            text: "Gå på jämnt underlag",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A7",
            text: "Stiga i/ur bil",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A8",
            text: "Handla/göra inköp",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A9",
            text: "Ta på strumpor",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A10",
            text: "Stiga ur sängen",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A11",
            text: "Ta av strumpor",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A12",
            text: "Ligga i sängen (vända dig, hålla knät i samma läge under lång tid)",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A13",
            text: "Stiga i och ur badkar/dusch",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A14",
            text: "Sitta",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A15",
            text: "Sätta dig och resa dig från toalettstol",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A16",
            text: "Utföra tungt hushållsarbete (snöskottning, golvtvätt, dammsugning etc)",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "A17",
            text: "Utföra lätt hushållsarbete (matlagning, damning etc)",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          }
        ]
      },
      {
        title: "Funktion, fritid och idrott",
        instructions: "Följande frågor rör din fysiska förmåga. Ange graden av svårighet du upplevt den senaste veckan vid följande aktiviteter på grund av dina knäbesvär.",
        questions: [
          {
            id: "SP1",
            text: "Sitta på huk",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "SP2",
            text: "Springa",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "SP3",
            text: "Hoppa",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "SP4",
            text: "Vrida/snurra på belastat knä",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "SP5",
            text: "Ligga på knä",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          }
        ]
      },
      {
        title: "Livskvalité",
        instructions: "",
        questions: [
          {
            id: "Q1",
            text: "Hur ofta gör sig Ditt knä påmint?",
            options: [
              { value: 0, text: "Aldrig" },
              { value: 1, text: "Varje månad" },
              { value: 2, text: "Varje vecka" },
              { value: 3, text: "Varje dag" },
              { value: 4, text: "Alltid" }
            ]
          },
          {
            id: "Q2",
            text: "Har Du förändrat Ditt sätt att leva för att undvika att påfresta knät?",
            options: [
              { value: 0, text: "Inte alls" },
              { value: 1, text: "Något" },
              { value: 2, text: "Måttligt" },
              { value: 3, text: "I stor utsträckning" },
              { value: 4, text: "Totalt" }
            ]
          },
          {
            id: "Q3",
            text: "I hur stor utsträckning kan Du lita på Ditt knä?",
            options: [
              { value: 0, text: "Helt och hållet" },
              { value: 1, text: "I stor utsträckning" },
              { value: 2, text: "Måttligt" },
              { value: 3, text: "Till viss del" },
              { value: 4, text: "Inte alls" }
            ]
          },
          {
            id: "Q4",
            text: "Hur stora problem har Du med knät generellt sett?",
            options: [
              { value: 0, text: "Inga" },
              { value: 1, text: "Små" },
              { value: 2, text: "Måttliga" },
              { value: 3, text: "Stora" },
              { value: 4, text: "Mycket stora" }
            ]
          }
        ]
      }
    ]
  }
];

export default questions; 