-- Seed Service Categories
INSERT INTO service_categories (name, name_urdu, slug, icon, description, description_urdu, sort_order) VALUES
('Identity Documents', 'شناختی دستاویزات', 'identity-documents', 'IdCard', 'CNIC, Passport, Birth Certificate, and other identity documents', 'شناختی کارڈ، پاسپورٹ، پیدائش کا سرٹیفکیٹ اور دیگر شناختی دستاویزات', 1),
('Business Registration', 'کاروباری رجسٹریشن', 'business-registration', 'Briefcase', 'Company registration, trademark, tax registration', 'کمپنی کی رجسٹریشن، ٹریڈ مارک، ٹیکس رجسٹریشن', 2),
('Property & Land', 'جائیداد اور زمین', 'property-land', 'Home', 'Property registration, mutation, NOC, and land records', 'جائیداد کی رجسٹریشن، تبدیلی، این او سی اور زمین کے ریکارڈ', 3),
('Vehicle Services', 'گاڑی کی خدمات', 'vehicle-services', 'Car', 'Driving license, vehicle registration, token tax', 'ڈرائیونگ لائسنس، گاڑی کی رجسٹریشن، ٹوکن ٹیکس', 4),
('Education', 'تعلیم', 'education', 'GraduationCap', 'Degree attestation, HEC verification, scholarships', 'ڈگری کی تصدیق، ایچ ای سی کی تصدیق، وظائف', 5),
('Legal Services', 'قانونی خدمات', 'legal-services', 'Scale', 'Court fees, FIR, affidavit, legal documentation', 'عدالتی فیس، ایف آئی آر، حلف نامہ، قانونی دستاویزات', 6),
('Health Services', 'صحت کی خدمات', 'health-services', 'Heart', 'Sehat Card, vaccination certificates, medical certificates', 'صحت کارڈ، ویکسینیشن سرٹیفکیٹ، طبی سرٹیفکیٹ', 7),
('Employment', 'روزگار', 'employment', 'Users', 'EOBI, social security, labor registration', 'ای او بی آئی، سماجی تحفظ، مزدور رجسٹریشن', 8),
('Utilities', 'افادیت', 'utilities', 'Zap', 'Gas connection, electricity connection, water connection', 'گیس کنکشن، بجلی کنکشن، پانی کا کنکشن', 9),
('Miscellaneous', 'متفرق', 'miscellaneous', 'FileText', 'Other government services and documentation', 'دیگر سرکاری خدمات اور دستاویزات', 10);
