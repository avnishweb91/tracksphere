package com.tracksphere.application.attendance.dto; import java.time.*; import java.util.UUID;
public record AttendanceResponse(UUID id,UUID userId,String employeeName,String email,Instant clockIn,Instant clockOut,Long durationMinutes){}
