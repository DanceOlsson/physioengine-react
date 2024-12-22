import { NDIQuestionnaire } from "../../lib/types/ndi.types";

export const questions: NDIQuestionnaire[] = [
  {
    title: "NECK DISABILITY INDEX - NACKFUNKTIONSSKALA",
    subtitle: "",
    instructions: "Följande frågor är utformade för att ge oss information om hur Din nacksmärta påverkar det dagliga livet. Besvara varje avsnitt och markera bara den enda ruta som passar Dig. Vi är medvetna om att det kan vara svårt att välja mellan två närstående påståenden, men var vänlig kryssa bara i den rutan som mest motsvarar Er situation.",
    sections: [
      {
        title: "",
        instructions: "",
        questions: [
          {
            id: "1",
            text: "SMÄRTINTENSITET",
            options: [
              { value: 0, text: "Jag har ingen smärta för närvarande" },
              { value: 1, text: "Smärtan är mycket lätt" },
              { value: 2, text: "Smärtan är måttlig" },
              { value: 3, text: "Smärtan är svår" },
              { value: 4, text: "Smärtan är mycket svår" },
              { value: 5, text: "Smärtan är värsta tänkbara" }
            ]
          },
          {
            id: "2",
            text: "PERSONLIG OMVÅRDNAD (Hygien, påklädning etc)",
            options: [
              { value: 0, text: "Jag kan sköta mig själv som vanligt utan att få ökad smärta" },
              { value: 1, text: "Jag kan sköta mig själv som vanligt, men det orsakar ökad smärta" },
              { value: 2, text: "Det innebär smärta att sköta mig själv och jag är försiktig och långsam" },
              { value: 3, text: "Jag behöver en del hjälp, men klarar det mesta av min personliga omvårdnad" },
              { value: 4, text: "Jag behöver hjälp varje dag med det mesta i min personliga omvårdnad" },
              { value: 5, text: "Jag klär inte på mig, tvättar mig med svårigheter och ligger till sängs" }
            ]
          },
          {
            id: "3",
            text: "LYFTA",
            options: [
              { value: 0, text: "Jag kan lyfta tunga saker utan ökad smärta" },
              { value: 1, text: "Jag kan lyfta tunga saker, men det ger ökad smärta" },
              { value: 2, text: "Smärtan hindrar mig från att lyfta tunga föremål från golvet, men jag klarar det om det är lämpligt placerat, ex på ett bord" },
              { value: 3, text: "Smärtan hindrar mig från att lyfta tunga föremål, men jag klarar medeltunga föremål, om de är lämpligt placerade" },
              { value: 4, text: "Jag kan lyfta mycket lätta föremål" },
              { value: 5, text: "Jag kan inte lyfta eller bära något överhuvudtaget" }
            ]
          },
          {
            id: "4",
            text: "LÄSNING",
            options: [
              { value: 0, text: "Jag kan läsa så mycket som jag vill utan smärta från nacken" },
              { value: 1, text: "Jag kan läsa så mycket jag vill med lätt smärta i nacken" },
              { value: 2, text: "Jag kan läsa så mycket jag vill, men med måttlig smärta i nacken" },
              { value: 3, text: "Jag kan inte läsa så mycket jag vill p g a måttlig smärta från nacken" },
              { value: 4, text: "Jag kan knappast läsa alls p g a svår smärta från nacken" },
              { value: 5, text: "Jag kan inte läsa alls p g a smärtan" }
            ]
          },
          {
            id: "5", 
            text: "HUVUDVÄRK",
            options: [
              { value: 0, text: "Jag har ingen huvudvärk överhuvudtaget" },
              { value: 1, text: "Jag har lätt huvudvärk då och då" },
              { value: 2, text: "Jag har måttlig huvudvärk då och då" },
              { value: 3, text: "Jag har måttlig huvudvärk ofta" },
              { value: 4, text: "Jag har svår huvudvärk ofta" },
              { value: 5, text: "Jag har svår huvudvärk praktiskt taget hela tiden" }
            ]
          },
          {
            id: "6",
            text: "KONCENTRATION",
            options: [
              { value: 0, text: "Jag kan koncentrera mig helt och hållet när jag behöver, utan problem" },
              { value: 1, text: "Jag kan koncentrera mig helt och hållet när jag behöver, men får lindriga besvär" },
              { value: 2, text: "Jag har måttliga svårigheter att koncentrera mig när jag behöver" },
              { value: 3, text: "Jag har stora svårigheter att koncentrera mig när jag behöver" },
              { value: 4, text: "Jag har avsevärda problem att koncentrera mig när jag behöver" },
              { value: 5, text: "Jag kan inte koncentrera mig alls" }
            ]
          },
          {
            id: "7",
            text: "ARBETE",
            options: [
              { value: 0, text: "Jag kan utföra så mycket arbete som jag vill" },
              { value: 1, text: "Jag kan bara göra mitt vanliga arbete, men inte mer" },
              { value: 2, text: "Jag kan göra det mesta av mitt vanliga arbete, men inte mer" },
              { value: 3, text: "Jag kan inte utföra mitt vanliga arbete" },
              { value: 4, text: "Jag kan knappast utföra något arbete alls" },
              { value: 5, text: "Jag kan inte utföra något arbete alls" }
            ]
          },
          {
            id: "8",
            text: "BILKÖRNING",
            options: [
              { value: 0, text: "Jag kan köra bil utan någon nacksmärta" },
              { value: 1, text: "Jag kan köra bil så länge jag vill, med lätt smärta i nacken" },
              { value: 2, text: "Jag kan köra bil så länge jag vill, med måttlig smärta i nacken" },
              { value: 3, text: "Jag kan inte köra bil så länge jag vill p g a måttlig smärta från nacken" },
              { value: 4, text: "Jag kan knappast köra bil alls p g a svår smärta från nacken" },
              { value: 5, text: "Jag kan inte köra bil alls p g a nacksmärtan" }
            ]
          },
          {
            id: "9",
            text: "SÖMN",
            options: [
              { value: 0, text: "Jag har inga problem med sömnen" },
              { value: 1, text: "Min sömn är lätt störd (mindre än 1 tim sömnlöshet)" },
              { value: 2, text: "Min sömn är måttligt störd (1-2 tim sömnlöshet)" },
              { value: 3, text: "Min sömn är tämligen störd (2-3 tim sömnlöshet)" },
              { value: 4, text: "Min sömn är kraftigt störd (3-5 tim sömnlöshet)" },
              { value: 5, text: "Min sömn är helt och hållet störd (5-7 tim sömnlöshet p g a smärtan)" }
            ]
          },
          {
            id: "10",
            text: "FRITIDSAKTIVITETER",
            options: [
              { value: 0, text: "Jag klarar att utföra alla mina fritidsaktiviteter utan någon nacksmärta" },
              { value: 1, text: "Jag klarar att utföra alla mina fritidsaktiviteter, men med lätt smärta i nacken" },
              { value: 2, text: "Jag klarar att utföra de flesta, dock inte alla mina vanliga fritidsaktiviteter p g a smärta i nacken" },
              { value: 3, text: "Jag klarar bara att utföra ett fåtal av mina vanliga fritidsaktiviteter p g a smärta i nacken" },
              { value: 4, text: "Jag kan knappast utföra några fritidsaktiviteter p g a smärta i nacken" },
              { value: 5, text: "Jag kan inte utföra några fritidsaktiviteter alls" }
            ]
          }
        ]
      }
    ]
  }
];

export default questions;