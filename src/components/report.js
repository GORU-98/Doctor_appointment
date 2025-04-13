const reportApi =[
    {
      "reportId": "1",
      "patientId": "P123",
      "reportType": "Lab Results",
      "date": "2024-07-28",
      "details": "Blood test shows elevated cholesterol levels.",
      "doctorName": "Dr. Smith",
      "notes": "Follow up in 3 months.",
      "fee": 50.00,
      "medicine": ["Atorvastatin 20mg"]
    },
    {
      "reportId": "2",
      "patientId": "P123",
      "reportType": "X-Ray",
      "date": "2024-07-25",
      "details": "Chest x-ray shows no abnormalities.",
      "doctorName": "Dr. Jones",
      "notes": "",
      "fee": 100.00,
      "medicine": []
    },
    {
      "reportId": "3",
      "patientId": "P123",
      "reportType": "Consultation Notes",
      "date": "2024-07-20",
      "details": "Patient complains of persistent cough and fatigue.",
      "doctorName": "Dr. Smith",
      "notes": "Prescribed antibiotics.",
      "fee": 75.00,
      "medicine": ["Amoxicillin 500mg", "Cough Syrup 10ml"]
    },
    {
      "reportId": "4",
      "patientId": "P456",
      "reportType": "MRI Scan",
      "date": "2024-07-15",
      "details": "MRI of the brain is normal.",
       "doctorName": "Dr. Brown",
      "notes": "No follow-up necessary.",
      "fee": 250.00,
      "medicine": []
    },
    {
      "reportId": "5",
      "patientId": "P456",
      "reportType": "Discharge Summary",
      "date": "2024-07-10",
      "details": "Patient discharged after appendectomy.  Condition: Stable.",
      "doctorName": "Dr. Wilson",
      "notes": "Follow up with surgeon in 2 weeks.",
      "fee": 150.00,
      "medicine": ["Painkiller 10mg", "Antibiotic 500mg"]
    },
     {
      "reportId": "6",
      "patientId": "P123",
      "reportType": "Pathology Report",
      "date": "2024-08-01",
      "details": "Biopsy results are benign.",
      "doctorName": "Dr. Smith",
      "notes": "Schedule routine checkup in 6 months.",
      "fee": 200.00,
      "medicine": []
    },
    {
      "reportId": "7",
      "patientId": "P789",
      "reportType": "ECG",
      "date": "2024-07-22",
      "details": "ECG shows normal sinus rhythm.",
      "doctorName": "Dr.  Anderson",
      "notes": "None",
      "fee": 60.00,
      "medicine": []
    },
    {
      "reportId": "8",
      "patientId": "P789",
      "reportType": "Progress Note",
      "date": "2024-07-18",
      "details": "Patient reports improvement in symptoms following medication.",
      "doctorName": "Dr. Anderson",
      "notes": "Continue current treatment plan.",
       "fee": 40.00,
      "medicine": ["Antibiotic 250mg", "Painkiller 5mg"]
    },
    {
      "reportId": "9",
      "patientId": "P123",
      "reportType": "Allergy Test",
      "date": "2024-08-05",
      "details": "Patient is allergic to penicillin.",
      "doctorName": "Dr. Smith",
      "notes": "Document allergy in patient chart.",
      "fee": 80.00,
      "medicine": []
    },
    {
      "reportId": "10",
      "patientId": "P901",
      "reportType": "Immunization Record",
      "date": "2024-07-01",
      "details": "Received influenza vaccine.",
      "doctorName": "Dr. Reed",
      "notes": "Record batch number: 12345.",
      "fee": 25.00,
      "medicine": []
    }
  ]

  module.exports=reportApi;
  