CREATE TABLE audit_log (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    action VARCHAR(100) NOT NULL,
    actor_email VARCHAR(255) NOT NULL,
    target_resource VARCHAR(255),
    target_id VARCHAR(255),
    details TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);