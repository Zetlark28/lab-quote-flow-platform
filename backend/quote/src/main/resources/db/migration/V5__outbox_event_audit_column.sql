ALTER TABLE outbox_event ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT now();
ALTER TABLE outbox_event ADD COLUMN created_by VARCHAR(255) NOT NULL ;
ALTER TABLE outbox_event ADD COLUMN updated_by VARCHAR(255);
ALTER TABLE outbox_event ADD COLUMN updated_at TIMESTAMP ;