CREATE TABLE attendance_records (id UUID PRIMARY KEY, user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, clock_in TIMESTAMPTZ NOT NULL, clock_out TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX idx_attendance_user_clock_in ON attendance_records(user_id, clock_in DESC);
