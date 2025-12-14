-- Create donations table
CREATE TABLE public.donations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_name TEXT NOT NULL,
    donor_phone TEXT NOT NULL,
    donor_email TEXT,
    amount DECIMAL(10,2) NOT NULL,
    project_type TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table for gallery
CREATE TABLE public.projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can insert donations (for donation form)
CREATE POLICY "Anyone can create donations" 
ON public.donations 
FOR INSERT 
WITH CHECK (true);

-- Public can insert contact messages
CREATE POLICY "Anyone can create contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

-- Public can view active projects
CREATE POLICY "Anyone can view active projects" 
ON public.projects 
FOR SELECT 
USING (is_active = true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for donations
CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample projects
INSERT INTO public.projects (title, description, category, image_url) VALUES
('كفالة أيتام معنيا', 'مشروع كفالة الأيتام يشمل التعليم والرعاية الصحية والغذاء', 'كفالة أيتام', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800'),
('إطعام الفقراء', 'توزيع وجبات غذائية على الأسر المحتاجة', 'إطعام', 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800'),
('دار تحفيظ القرآن', 'تعليم القرآن الكريم للأطفال والشباب', 'تحفيظ قرآن', 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800'),
('علاج المرضى', 'توفير العلاج والأدوية للمرضى غير القادرين', 'علاج', 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800'),
('كسوة العيد', 'توزيع ملابس العيد على الأطفال الأيتام والفقراء', 'كسوة', 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800'),
('بناء المعهد الأزهري', 'المساهمة في بناء وتجهيز المعهد الأزهري', 'تعليم', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800');