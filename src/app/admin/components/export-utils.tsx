"use client"

import { saveAs } from "file-saver"
import * as XLSX from "xlsx"

// Function to export data to CSV
export function exportToCSV(data: any[], fileName: string) {
  const csvData = convertToCSV(data)
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" })
  saveAs(blob, `${fileName}.csv`)
}

// Function to export data to Excel
export function exportToExcel(data: any[], fileName: string) {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}

// Function to convert data to CSV format
function convertToCSV(data: any[]) {
  if (data.length === 0) return ""

  const headers = Object.keys(data[0])
  const csvRows = []

  // Add headers
  csvRows.push(headers.join(","))

  // Add rows
  for (const row of data) {
    const values = headers.map((header) => {
      const value = row[header]
      // Handle values with commas by wrapping in quotes
      return typeof value === "string" && value.includes(",") ? `"${value}"` : value
    })
    csvRows.push(values.join(","))
  }

  return csvRows.join("\n")
}

// Function to prepare student data for export
export function prepareStudentDataForExport(students: any[]) {
  return students.map((student) => ({
    Name: student.name,
    "Matric Number": student.matricNumber,
    Email: student.email,
    Phone: student.phone,
    Faculty: student.faculty,
    Department: student.department,
    Level: student.level,
    "Hostel Block": student.hostelBlock,
    "Room Number": student.roomNumber,
    "Payment Status": student.paymentStatus,
  }))
}

// Function to prepare hostel data for export
export function prepareHostelDataForExport(hostels: any[]) {
  return hostels.map((hostel) => ({
    Name: hostel.name,
    Type: hostel.type,
    Price: hostel.price,
    Capacity: hostel.capacity,
    "Available Rooms": hostel.available,
    "Total Rooms": hostel.total,
    "Occupancy Rate": hostel.occupancyRate,
    Features: hostel.features.join(", "),
  }))
}
