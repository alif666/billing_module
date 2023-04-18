CREATE TABLE IF NOT EXISTS billing (
  billing_id INT AUTO_INCREMENT PRIMARY KEY,
  id VARCHAR(50) UNIQUE,
  billing_amount DECIMAL(15, 2),
  status VARCHAR(10) DEFAULT 'active',
  remark VARCHAR(255),
  created_at TIMESTAMP,
  created_by VARCHAR(50),
  updated_at TIMESTAMP,
  updated_by VARCHAR(50)
);