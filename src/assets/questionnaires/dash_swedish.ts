import { DASHQuestionnaire } from "../../lib/types/dash.types.ts";

export const questions: DASHQuestionnaire[] = [
  {
    title: "Hälsoenkät (arm/axel/hand)",
    subtitle: "DASH (Disabilities of the Arm, Shoulder and Hand)", 
    instructions: "Denna enkät berör Dina symtom och Din förmåga att utföra vissa aktiviteter.\nSvara på varje fråga, baserat på hur Du har mått den senaste veckan, genom att kryssa för ett svarsalternativ för varje fråga.\nOm det är någon aktivitet Du inte har utfört den senaste veckan får Du kryssa för det svar som Du bedömer stämmer bäst om Du hade utfört aktiviteten.\nDet har ingen betydelse vilken arm eller hand Du använder för att utföra aktiviteten. Svara baserat på Din förmåga oavsett hur Du utför uppgiften.",
    sections: [
      {
        title: "Förmåga att utföra aktiviteter",
        instructions: "",
        questions: [
          {
            id: "Q1",
            text: "Öppna en ny burk, eller hårt sittande lock",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q2",
            text: "Skriva",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q3",
            text: "Vrida om en nyckel",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q4",
            text: "Förbereda en måltid",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q5",
            text: "Öppna en tung dörr",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q6",
            text: "Lägga upp något på en hylla över Ditt huvud",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q7",
            text: "Utföra tunga hushållssysslor (t ex tvätta golv och väggar, putsa fönster, hänga tvätt)",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q8",
            text: "Trädgårdsarbete",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q9",
            text: "Bädda sängen",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q10",
            text: "Bära matkassar eller portfölj",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q11",
            text: "Bära tunga saker (över fem kilo)",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q12",
            text: "Byta en glödlampa ovanför Ditt huvud",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q13",
            text: "Tvätta eller föna håret",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q14",
            text: "Tvätta Din rygg",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q15",
            text: "Ta på en tröja",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q16",
            text: "Använda en kniv för att skära upp maten",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q17",
            text: "Fritidsaktiviteter som kräver liten ansträngning (t ex spela kort, sticka, boule)",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q18",
            text: "Fritidsaktiviteter som tar upp viss kraft eller stöt genom arm, axel eller hand (t ex spela golf, använda hammare, spela tennis, skytte, bowling)",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q19",
            text: "Fritidsaktiviteter där Du rör på armen fritt (t ex spela badminton, simma, gympa)",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q20",
            text: "Färdas från en plats till en annan",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          },
          {
            id: "Q21",
            text: "Sexuella aktiviteter",
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt att göra"}
            ]
          }
        ]
      },
      {
        title: "Påverkan på socialt liv och dagliga aktiviteter",
        instructions: "",
        questions: [
          {
            id: "Q22",
            text: "Under de senaste sju dagarna, i vilken utsträckning har Dina arm-, axel- eller handproblem stört Ditt vanliga umgänge med anhöriga, vänner, grannar eller andra?",
            options: [
              {value: 1, text: "Inte alls"},
              {value: 2, text: "Lite"},
              {value: 3, text: "Måttligt"},
              {value: 4, text: "Mycket"},
              {value: 5, text: "Väldigt mycket"}
            ]
          },
          {
            id: "Q23",
            text: "Under de senaste sju dagarna, i vilken utsträckning har Dina arm-, axel- eller handproblem stört Ditt vanliga arbete eller andra dagliga aktiviteter?",
            options: [
              {value: 1, text: "Inte alls"},
              {value: 2, text: "Lite"},
              {value: 3, text: "Måttligt"},
              {value: 4, text: "Mycket"},
              {value: 5, text: "Väldigt mycket"}
            ]
          }
        ]
      },
      {
        title: "Symtom",
        instructions: "Ange svårighetsgraden på Dina symtom de senaste sju dagarna:",
        questions: [
          {
            id: "Q24",
            text: "Värk/smärta i arm, axel eller hand",
            options: [
              {value: 1, text: "Ingen"},
              {value: 2, text: "Lätt"},
              {value: 3, text: "Måttlig"},
              {value: 4, text: "Svår"},
              {value: 5, text: "Mycket svår"}
            ]
          },
          {
            id: "Q25",
            text: "Värk/smärta i arm, axel eller hand i samband med aktivitet",
            options: [
              {value: 1, text: "Ingen"},
              {value: 2, text: "Lätt"},
              {value: 3, text: "Måttlig"},
              {value: 4, text: "Svår"},
              {value: 5, text: "Mycket svår"}
            ]
          },
          {
            id: "Q26",
            text: "Stickningar (sockerdrickskänsla) i arm, axel eller hand",
            options: [
              {value: 1, text: "Ingen"},
              {value: 2, text: "Lätt"},
              {value: 3, text: "Måttlig"},
              {value: 4, text: "Svår"},
              {value: 5, text: "Mycket svår"}
            ]
          },
          {
            id: "Q27",
            text: "Svaghet i arm, axel eller hand",
            options: [
              {value: 1, text: "Ingen"},
              {value: 2, text: "Lätt"},
              {value: 3, text: "Måttlig"},
              {value: 4, text: "Svår"},
              {value: 5, text: "Mycket svår"}
            ]
          },
          {
            id: "Q28",
            text: "Stelhet i arm, axel eller hand",
            options: [
              {value: 1, text: "Ingen"},
              {value: 2, text: "Lätt"},
              {value: 3, text: "Måttlig"},
              {value: 4, text: "Svår"},
              {value: 5, text: "Mycket svår"}
            ]
          }
        ]
      },
      {
        title: "Sömn och självförtroende",
        instructions: "",
        questions: [
          {
            id: "Q29",
            text: "Har Du haft svårt att sova, under de senaste sju dagarna, på grund av värk/smärta i arm, axel eller hand?",
            options: [
              {value: 1, text: "Inte alls"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Mycket stor svårighet"}
            ]
          },
          {
            id: "Q30",
            text: "Jag känner mig mindre kapabel, har sämre självförtroende eller känner mig mindre behövd på grund av mina arm-, axel- eller handproblem.",
            options: [
              {value: 1, text: "Instämmer absolut inte"},
              {value: 2, text: "Instämmer inte"},
              {value: 3, text: "Vet inte"},
              {value: 4, text: "Instämmer"},
              {value: 5, text: "Instämmer absolut"}
            ]
          }
        ]
      },
      {
        title: "Arbetsförmåga",
        instructions: "Följande frågor rör hur mycket Dina arm-, axel- eller handproblem påverkat Din förmåga att arbeta (inklusive hushållsarbete om detta är Ditt huvudsakliga arbete).",
        questions: [
          {
            id: "Q31",
            text: "Arbetar Du?",
            options: [
              {value: "yes", text: "Ja"},
              {value: "no", text: "Nej"}
            ]
          },
          {
            id: "Q32",
            text: "Ange här Ditt arbete",
            type: "text",
            dependsOn: {
              questionId: "Q31",
              expectedValue: "yes"
            }
          },
          {
            id: "Q33",
            text: "Hade Du någon svårighet att använda Din vanliga teknik för att arbeta?",
            dependsOn: {
              questionId: "Q31",
              expectedValue: "yes"
            },
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt"}
            ]
          },
          {
            id: "Q34",
            text: "Hade Du svårigheter att utföra Ditt ordinarie arbete på grund av värk/smärta i arm, axel eller hand?",
            dependsOn: {
              questionId: "Q31",
              expectedValue: "yes"
            },
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt"}
            ]
          },
          {
            id: "Q35",
            text: "Hade Du svårigheter att utföra Ditt arbete så bra som Du skulle vilja?",
            dependsOn: {
              questionId: "Q31",
              expectedValue: "yes"
            },
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt"}
            ]
          },
          {
            id: "Q36",
            text: "Hade Du svårigheter att utföra Ditt arbete på den tid Du brukar använda?",
            dependsOn: {
              questionId: "Q31",
              expectedValue: "yes"
            },
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt"}
            ]
          }
        ]
      },
      {
        title: "Musik och idrott",
        instructions: "Följande frågor rör hur mycket Dina arm-, axel- eller handproblem påverkat Din förmåga att spela musikinstrument och/eller utöva idrott.",
        questions: [
          {
            id: "Q37",
            text: "Spelar Du något musikinstrument eller utövar någon idrott?",
            options: [
              {value: "yes", text: "Ja"},
              {value: "no", text: "Nej"}
            ]
          },
          {
            id: "Q38",
            text: "Ange här det musikinstrument eller den idrott som är viktigast för Dig",
            type: "text",
            dependsOn: {
              questionId: "Q37",
              expectedValue: "yes"
            }
          },
          {
            id: "Q39",
            text: "Hade Du någon svårighet att använda Din vanliga teknik för att spela instrument/idrotta?",
            dependsOn: {
              questionId: "Q37",
              expectedValue: "yes"
            },
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt"}
            ]
          },
          {
            id: "Q40",
            text: "Hade Du svårigheter att spela instrument/idrotta på grund av värk/smärta i arm, axel eller hand?",
            dependsOn: {
              questionId: "Q37",
              expectedValue: "yes"
            },
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt"}
            ]
          },
          {
            id: "Q41",
            text: "Hade Du svårigheter att spela instrument/idrotta så bra som Du skulle vilja?",
            dependsOn: {
              questionId: "Q37",
              expectedValue: "yes"
            },
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt"}
            ]
          },
          {
            id: "Q42",
            text: "Hade Du svårigheter att använda lika mycket tid som vanligt för att spela instrument/idrotta?",
            dependsOn: {
              questionId: "Q37",
              expectedValue: "yes"
            },
            options: [
              {value: 1, text: "Ingen svårighet"},
              {value: 2, text: "Viss svårighet"},
              {value: 3, text: "Måttlig svårighet"},
              {value: 4, text: "Stor svårighet"},
              {value: 5, text: "Omöjligt"}
            ]
          }
        ]
      }
    ]
  }
];

export default questions;