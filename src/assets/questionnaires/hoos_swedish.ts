import { HOOSQuestionnaire } from "../../lib/types/hoos.types.ts";

export const questions: HOOSQuestionnaire[] = [
  {
    title: "HOOS",
    subtitle: "Frågeformulär för höftpatienter",
    instructions: "Detta formulär innehåller frågor om hur du ser på din höftled. Informationen skall hjälpa till att följa hur du mår och fungerar i ditt dagliga liv. Besvara frågorna genom att kryssa för det alternativ du tycker stämmer bäst in på dig (ett alternativ för varje fråga). Om du är osäker, kryssa ändå för det alternativ som känns riktigast.",
    sections: [
      {
        title: "Symptom",
        instructions: "Tänk på de symptom och svårigheter du haft från din höft den senaste veckan när du besvarar dessa frågor.",
        questions: [
          {
            id: "S1",
            text: "Har du känt att det maler i höften eller hör du klickande eller andra ljud från höften?",
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
            text: "Svårighet att ta benen brett isär?",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Stor" },
              { value: 4, text: "Mycket stor" }
            ]
          },
          {
            id: "S3",
            text: "Svårighet att ta ut steget när du går?",
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
        title: "Stelhet",
        instructions: "Följande frågor rör ledstelhet. Stelhet innebär svårighet att komma igång eller ökat motstånd vid rörelser i höftleden. Ange graden av stelhet du har upplevt i din höft senaste veckan.",
        questions: [
          {
            id: "S4",
            text: "Hur stel har din höft varit när du just har vaknat på morgonen?",
            options: [
              { value: 0, text: "Inte alls" },
              { value: 1, text: "Något" },
              { value: 2, text: "Måttligt" },
              { value: 3, text: "Mycket" },
              { value: 4, text: "Extremt" }
            ]
          },
          {
            id: "S5",
            text: "Hur stel har din höft varit efter att du suttit eller legat och vilat senare under dagen?",
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
        instructions: "Följande frågor rör den höftsmärta du eventuellt upplevt den senaste veckan. Ange graden av smärta du har känt i följande situationer.",
        questions: [
          {
            id: "P1",
            text: "Hur ofta har du ont i höften?",
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
            text: "Sträcka höften helt",
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
            text: "Böja höften helt",
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
            id: "P5",
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
            id: "P6",
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
            id: "P7",
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
            id: "P8",
            text: "Stående",
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
            text: "Gå på hårt underlag ex asfalt, betong",
            options: [
              { value: 0, text: "Ingen" },
              { value: 1, text: "Lätt" },
              { value: 2, text: "Måttlig" },
              { value: 3, text: "Svår" },
              { value: 4, text: "Mycket svår" }
            ]
          },
          {
            id: "P10",
            text: "Gå på ojämnt underlag",
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
        title: "Fysisk funktion",
        instructions: "Följande frågor rör din fysiska funktion. Ange graden av svårighet du har upplevt den senaste veckan vid följande aktiviteter på grund av dina höftbesvär.",
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
            text: "Böja dig, t ex för att plocka upp ett föremål från golvet",
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
            text: "Stiga i och ur bil",
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
            text: "Ligga i sängen (vända dig, hålla höften i samma läge under lång tid)",
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
        instructions: "Följande frågor rör din fysiska förmåga. Ange graden av svårighet du upplevt den senaste veckan vid följande aktiviteter på grund av dina höftbesvär.",
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
            text: "Vrida/snurra på belastat ben",
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
            text: "Gå på ojämnt underlag",
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
            text: "Hur ofta gör sig din höft påmind?",
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
            text: "Har du förändrat ditt sätt att leva för att undvika att påfresta höften?",
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
            text: "I hur stor utsträckning kan du lita på din höft?",
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
            text: "Hur stora problem har du med höften generellt sett?",
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