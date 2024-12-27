CREATE TABLE app_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  goal text NOT NULL,
  challenges text NOT NULL,
  tone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE app_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own submissions"
  ON app_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own submissions"
  ON app_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
