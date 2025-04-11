
export interface AcademicEvent {
    description: string;
    semester1: string;
    semester2: string;
  }

  export interface Holiday {
    month: string;
    holidays: string;
    workingDays: number;
  }
  
  export interface MarksSubmission {
    year: string;
    semester: string;
    mid1: string;
    mid2: string;
    internal: string;
  }
  
  export const academicCalendar = {
    collegeName: "S.R.K.R. ENGINEERING COLLEGE(AUTONOMOUS): BHIMAVARAM",
    title: "B.TECH ACADEMIC CALENDAR FOR 2024-2025",
    
    fourthYear: [
      { description: "Class work / Instruction", semester1: "01-07-24 to 17-11-24", semester2: "02-12-24 to 19-04-25" },
      { description: "I Mid Examinations/Project Review", semester1: "19-08-24 to 24-08-24", semester2: "20-01-25 to 25-01-25" },
      { description: "II Mid Examinations/Project Review", semester1: "28-10-24 to 02-11-24", semester2: "24-02-25 to 01-03-25" },
      { description: "Preparation /Practical exams", semester1: "03-11-24 to 16-11-24", semester2: "07-04-25 to 12-04-25" },
      { description: "End Exams/Project work Viva-voce Commerce from", semester1: "18-11-24", semester2: "21-04-25" }
    ] as AcademicEvent[],
  
    thirdYear: [
      { description: "Class work / Instruction", semester1: "15-07-24 to 30-11-24", semester2: "16-12-24 to 02-05-25" },
      { description: "I Mid Examinations", semester1: "09-09-24 to 14-09-24", semester2: "10-02-25 to 15-02-25" },
      { description: "II Mid Examinations", semester1: "11-11-24 to 16-11-24", semester2: "15-04-25 to 21-04-25" },
      { description: "Preparation /Practical exams", semester1: "17-11-24 to 01-12-24", semester2: "22-04-25 to 03-05-25" },
      { description: "End Exams Commerce from", semester1: "02-12-24", semester2: "04-05-25" }
    ] as AcademicEvent[],
  
    secondYear: [
      { description: "Class work / Instruction", semester1: "29-07-24 to 14-12-24", semester2: "30-12-24 to 17-05-25" },
      { description: "I Mid Examinations", semester1: "23-09-24 to 28-09-24", semester2: "24-02-25 to 01-03-25" },
      { description: "II Mid Examinations", semester1: "25-11-24 to 30-11-24", semester2: "28-04-25 to 03-05-25" },
      { description: "Preparation / Practical exams", semester1: "01-12-24 to 15-12-24", semester2: "04-05-25 to 18-05-25" },
      { description: "End Exams Commerce from", semester1: "16-12-24", semester2: "19-05-25" }
    ] as AcademicEvent[],
  
    firstYear: {
      induction: "Induction Program: 0 Semester From 31-07-24 to 17-08-24",
      events: [
        { description: "Class work / Instruction", semester1: "19-08-24 to 31-12-24", semester2: "20-01-25 to 14-06-25" },
        { description: "I Mid Examinations", semester1: "15-10-24 to 19-10-24", semester2: "10-03-25 to 15-03-25" },
        { description: "II Mid Examinations", semester1: "12-12-24 to 17-12-24", semester2: "12-05-25 to 16-05-25" },
        { description: "Preparation / Practical exams", semester1: "18-12-24 to 01-01-25", semester2: "17-05-25 to 15-06-25" },
        { description: "End Exams Commerce from", semester1: "02-01-25", semester2: "16-06-25" }
      ] as AcademicEvent[]
    },
  
    holidays: [
      { month: "July, 24", holidays: "7, 14, 21 & 28 Sundays, 1st Moharam.", workingDays: 26 },
      { month: "August, 24", holidays: "4, 11, 18 & 25 Sundays, 15th Independence Day, 26th Jammastami.", workingDays: 25 },
      { month: "September, 24", holidays: "1, 8, 15, 22 & 29 Sundays, 7th Ganesh Chaturthi, 16th Mihad Nabi.", workingDays: 23 },
      { month: "October, 24", holidays: "6, 13, 20 & 27 Sundays, 2nd Gandhi Jayanthi, 11th Durgashitami, 11th Mahamavami, 12th Vijayadasami, 31st Diwali.", workingDays: 22 },
      { month: "November, 24", holidays: "3, 10, 17 & 24 Sundays.", workingDays: 26 },
      { month: "December, 24", holidays: "1, 8, 15, 22 & 29 Sundays, 25th Christmas.", workingDays: 25 },
      { month: "January, 25", holidays: "5, 12, 19 & 26 Sundays, 1st New Year Day, 13th Bhogi, 14th Makara Sankarathi, 16th Kanuma, 26th Republic Day.", workingDays: 23 },
      { month: "February, 25", holidays: "2, 9, 16 & 23 Sundays, 26th Shivaratri.", workingDays: 23 },
      { month: "March, 25", holidays: "2, 9, 16, 23 & 30 Sundays, 14th Holi, 30th Ugadi, 31st Ramzan.", workingDays: 24 },
      { month: "April, 25", holidays: "6, 13, 20 & 27 Sundays, 5th Jagdeevan Ram Jayanthi, 6th Sriramanavami, 11th Good Friday, 14th Dr. B.R. Ambedkar Jayanthi.", workingDays: 23 },
      { month: "May, 25", holidays: "4, 11, 18 & 25 Sundays.", workingDays: 27 },
      { month: "June, 25", holidays: "1, 8, 15, 22 & 29 Sundays, 7th Bakridi.", workingDays: 24 }
    ] as Holiday[],
  
    marksSubmission: [
      { year: "IV Year B.Tech", semester: "I", mid1: "28-08-24", mid2: "06-11-24", internal: "08-11-24" },
      { year: "IV Year B.Tech", semester: "II", mid1: "29-01-25", mid2: "05-03-25", internal: "07-03-25" },
      { year: "III Year B.Tech", semester: "I", mid1: "19-09-24", mid2: "20-11-24", internal: "22-11-24" },
      { year: "III Year B.Tech", semester: "II", mid1: "19-02-25", mid2: "24-04-25", internal: "26-04-25" },
      { year: "II Year B.Tech", semester: "I", mid1: "03-10-24", mid2: "04-12-24", internal: "06-12-24" },
      { year: "II Year B.Tech", semester: "II", mid1: "05-03-25", mid2: "07-05-25", internal: "09-05-25" },
      { year: "I Year B.Tech", semester: "I", mid1: "23-10-24", mid2: "20-12-24", internal: "23-12-24" },
      { year: "I Year B.Tech", semester: "II", mid1: "19-03-25", mid2: "20-05-25", internal: "32-05-25" }
    ] as MarksSubmission[]
  };