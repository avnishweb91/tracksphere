import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import type { AttendanceRecord } from '../types/auth'
const rows = (data: AttendanceRecord[]) => data.map(item => ({ Employee: item.employeeName, Email: item.email, 'Clock in': new Date(item.clockIn).toLocaleString(), 'Clock out': item.clockOut ? new Date(item.clockOut).toLocaleString() : 'Active', 'Duration (min)': item.durationMinutes ?? '—' }))
export function exportExcel(data: AttendanceRecord[]) { const sheet = XLSX.utils.json_to_sheet(rows(data)); const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, 'Attendance'); XLSX.writeFile(book, 'tracksphere-attendance.xlsx') }
export function exportPdf(data: AttendanceRecord[]) { const pdf = new jsPDF(); pdf.setFontSize(18); pdf.text('TrackSphere Attendance Report', 14, 18); pdf.setFontSize(10); let y = 32; rows(data).forEach((row, index) => { if (y > 275) { pdf.addPage(); y = 20 } pdf.text(`${index + 1}. ${row.Employee} — ${row['Clock in']} — ${row['Clock out']} (${row['Duration (min)']} min)`, 14, y, { maxWidth: 180 }); y += 12 }); pdf.save('tracksphere-attendance.pdf') }
