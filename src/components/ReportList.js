import React from 'react';
const reportApi = require('./report'); 

const ReportList = () => {
  return (
    <div className="report-list">
      <h2>Patient Reports</h2>
      <div className="reports-container">
        {reportApi.map((report) => (
          <div className="report-card" key={report.reportId}>
            <h3>{report.reportType}</h3>
            <p><strong>Date:</strong> {report.date}</p>
            <p><strong>Patient ID:</strong> {report.patientId}</p>
            <p><strong>Doctor:</strong> {report.doctorName}</p>
            <p><strong>Details:</strong> {report.details}</p>
            {report.notes && (
              <p><strong>Notes:</strong> {report.notes}</p>
            )}
            <p><strong>Fee:</strong> ${report.fee.toFixed(2)}</p>
            {report.medicine.length > 0 && (
              <div>
                <strong>Medicine:</strong>
                <ul>
                  {report.medicine.map((med, index) => (
                    <li key={index}>{med}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportList;
