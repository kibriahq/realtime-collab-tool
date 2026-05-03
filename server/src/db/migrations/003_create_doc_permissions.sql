CREATE TABLE IF NOT EXISTS doc_permissions (
    id SERIAL PRIMARY KEY,
    doc_id UUID NOT NULL REFERENCES docs(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL DEFAULT 'edit' CHECK (role IN ('edit', 'view', 'comment')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add unique constraint to prevent duplicate permissions for the same user and doc
ALTER TABLE doc_permissions ADD CONSTRAINT unique_doc_user UNIQUE (doc_id, user_id);