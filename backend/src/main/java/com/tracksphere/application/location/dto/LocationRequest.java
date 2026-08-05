package com.tracksphere.application.location.dto; import jakarta.validation.constraints.*; import java.time.Instant;
public record LocationRequest(@NotBlank @Size(max=100) String vehicleId,@NotNull @DecimalMin("-90.0") @DecimalMax("90.0") Double latitude,@NotNull @DecimalMin("-180.0") @DecimalMax("180.0") Double longitude,@PositiveOrZero Double accuracyMeters,Instant recordedAt){}
