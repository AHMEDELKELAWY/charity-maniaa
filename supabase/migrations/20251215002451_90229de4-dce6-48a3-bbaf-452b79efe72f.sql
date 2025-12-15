-- Ensure RLS is enabled on both tables
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Anyone can create contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can create donations" ON public.donations;

-- Create INSERT-only policies for public submissions
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can submit donations"
ON public.donations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT, UPDATE, or DELETE policies are created
-- This means only service_role (backend) can read/modify these tables
-- Client-side access is blocked by RLS