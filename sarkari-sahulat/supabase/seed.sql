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
-- Seed Services (Identity Documents Category)
INSERT INTO services (name, name_urdu, slug, description, description_urdu, category_id, department, requirements, fees, processing_time, urgency_options, how_to_apply, how_to_apply_urdu, online_portal_url, is_online_available, tracking_info) VALUES

-- CNIC Services
('CNIC New Registration', 'نیا شناختی کارڈ', 'cnic-new-registration', 'Apply for a new Computerized National Identity Card for Pakistani citizens aged 18 and above', 'اٹھارہ سال اور اس سے زیادہ عمر کے پاکستانی شہریوں کے لیے نیا کمپیوٹرائزڈ قومی شناختی کارڈ', (SELECT id FROM service_categories WHERE slug = 'identity-documents'), 'NADRA',
'[{"text": "Original B-Form or Family Registration Certificate", "text_urdu": "اصل بی فارم یا خاندانی رجسٹریشن سرٹیفکیٹ", "type": "document"}, {"text": "Two recent passport-size photographs", "text_urdu": "دو حالیہ پاسپورٹ سائز تصاویر", "type": "document"}, {"text": "Proof of address (utility bill, rent agreement)", "text_urdu": "پتے کا ثبوت (یوٹیلیٹی بل، کرایہ کا معاہدہ)", "type": "document"}]'::jsonb,
'{"normal": 250, "urgent": 1000, "executive": 2500, "currency": "PKR"}'::jsonb,
'7-10 days',
'[{"type": "normal", "days": 10, "fee": 250}, {"type": "urgent", "days": 3, "fee": 1000}, {"type": "executive", "days": 1, "fee": 2500}]'::jsonb,
'Visit nearest NADRA office with required documents. Fill application form, provide biometric data, and pay fee.',
'مطلوبہ دستاویزات کے ساتھ قریبی نادرا دفتر جائیں۔ درخواست فارم بھریں، بائیو میٹرک ڈیٹا فراہم کریں اور فیس ادا کریں۔',
'https://id.nadra.gov.pk',
true,
'{"url": "https://id.nadra.gov.pk/track-application", "required_fields": ["tracking_id", "cnic_number"]}'::jsonb),

('CNIC Renewal', 'شناختی کارڈ کی تجدید', 'cnic-renewal', 'Renew your expired or expiring Computerized National Identity Card', 'اپنے میعاد ختم یا ختم ہونے والے کمپیوٹرائزڈ قومی شناختی کارڈ کی تجدید کریں', (SELECT id FROM service_categories WHERE slug = 'identity-documents'), 'NADRA',
'[{"text": "Original expired CNIC", "text_urdu": "اصل میعاد ختم شدہ شناختی کارڈ", "type": "document"}, {"text": "Two recent passport-size photographs", "text_urdu": "دو حالیہ پاسپورٹ سائز تصاویر", "type": "document"}]'::jsonb,
'{"normal": 250, "urgent": 1000, "executive": 2500, "currency": "PKR"}'::jsonb,
'7-10 days',
'[{"type": "normal", "days": 10, "fee": 250}, {"type": "urgent", "days": 3, "fee": 1000}, {"type": "executive", "days": 1, "fee": 2500}]'::jsonb,
'Visit NADRA office with expired CNIC. Update biometric data if required and pay renewal fee.',
'میعاد ختم شدہ شناختی کارڈ کے ساتھ نادرا دفتر جائیں۔ اگر ضرورت ہو تو بائیو میٹرک ڈیٹا اپ ڈیٹ کریں اور تجدید کی فیس ادا کریں۔',
'https://id.nadra.gov.pk',
true,
'{"url": "https://id.nadra.gov.pk/track-application", "required_fields": ["tracking_id", "cnic_number"]}'::jsonb),

('CNIC Modification', 'شناختی کارڈ میں تبدیلی', 'cnic-modification', 'Modify information on your CNIC such as name, address, or date of birth', 'اپنے شناختی کارڈ پر معلومات میں تبدیلی جیسے نام، پتہ، یا تاریخ پیدائش', (SELECT id FROM service_categories WHERE slug = 'identity-documents'), 'NADRA',
'[{"text": "Original CNIC", "text_urdu": "اصل شناختی کارڈ", "type": "document"}, {"text": "Supporting documents for modification (birth certificate, marriage certificate, etc.)", "text_urdu": "تبدیلی کے لیے معاون دستاویزات (پیدائش کا سرٹیفکیٹ، شادی کا سرٹیفکیٹ وغیرہ)", "type": "document"}, {"text": "Affidavit if required", "text_urdu": "اگر ضرورت ہو تو حلف نامہ", "type": "document"}]'::jsonb,
'{"normal": 500, "urgent": 1500, "executive": 3000, "currency": "PKR"}'::jsonb,
'10-15 days',
'[{"type": "normal", "days": 15, "fee": 500}, {"type": "urgent", "days": 5, "fee": 1500}, {"type": "executive", "days": 2, "fee": 3000}]'::jsonb,
'Visit NADRA office with supporting documents. Submit modification request and pay fee.',
'معاون دستاویزات کے ساتھ نادرا دفتر جائیں۔ تبدیلی کی درخواست جمع کرائیں اور فیس ادا کریں۔',
'https://id.nadra.gov.pk',
true,
'{"url": "https://id.nadra.gov.pk/track-application", "required_fields": ["tracking_id", "cnic_number"]}'::jsonb),

-- Passport Services
('New Passport (36 Pages)', 'نیا پاسپورٹ (36 صفحات)', 'new-passport-36', 'Apply for a new Pakistani passport with 36 pages validity for 5 years', 'پانچ سال کی میعاد کے ساتھ 36 صفحات والا نیا پاکستانی پاسپورٹ', (SELECT id FROM service_categories WHERE slug = 'identity-documents'), 'Directorate General of Immigration & Passports',
'[{"text": "Original CNIC", "text_urdu": "اصل شناختی کارڈ", "type": "document"}, {"text": "CNIC photocopy", "text_urdu": "شناختی کارڈ کی فوٹو کاپی", "type": "document"}, {"text": "Four recent passport-size photographs", "text_urdu": "چار حالیہ پاسپورٹ سائز تصاویر", "type": "document"}, {"text": "Fee payment receipt", "text_urdu": "فیس ادائیگی کی رسید", "type": "document"}]'::jsonb,
'{"normal": 3000, "urgent": 5000, "fast_track": 9000, "currency": "PKR"}'::jsonb,
'10-12 working days',
'[{"type": "normal", "days": 12, "fee": 3000}, {"type": "urgent", "days": 5, "fee": 5000}, {"type": "fast_track", "days": 2, "fee": 9000}]'::jsonb,
'Apply online at passport.gov.pk, pay fee at designated bank, visit passport office for biometric verification.',
'passport.gov.pk پر آن لائن درخواست دیں، نامزد بینک میں فیس ادا کریں، بائیو میٹرک تصدیق کے لیے پاسپورٹ آفس جائیں۔',
'https://passport.gov.pk',
true,
'{"url": "https://passport.gov.pk/track", "required_fields": ["tracking_id", "cnic_number"]}'::jsonb),

('New Passport (72 Pages)', 'نیا پاسپورٹ (72 صفحات)', 'new-passport-72', 'Apply for a new Pakistani passport with 72 pages validity for 10 years', 'دس سال کی میعاد کے ساتھ 72 صفحات والا نیا پاکستانی پاسپورٹ', (SELECT id FROM service_categories WHERE slug = 'identity-documents'), 'Directorate General of Immigration & Passports',
'[{"text": "Original CNIC", "text_urdu": "اصل شناختی کارڈ", "type": "document"}, {"text": "CNIC photocopy", "text_urdu": "شناختی کارڈ کی فوٹو کاپی", "type": "document"}, {"text": "Four recent passport-size photographs", "text_urdu": "چار حالیہ پاسپورٹ سائز تصاویر", "type": "document"}, {"text": "Fee payment receipt", "text_urdu": "فیس ادائیگی کی رسید", "type": "document"}]'::jsonb,
'{"normal": 6700, "urgent": 11200, "fast_track": 18200, "currency": "PKR"}'::jsonb,
'10-12 working days',
'[{"type": "normal", "days": 12, "fee": 6700}, {"type": "urgent", "days": 5, "fee": 11200}, {"type": "fast_track", "days": 2, "fee": 18200}]'::jsonb,
'Apply online at passport.gov.pk, pay fee at designated bank, visit passport office for biometric verification.',
'passport.gov.pk پر آن لائن درخواست دیں، نامزد بینک میں فیس ادا کریں، بائیو میٹرک تصدیق کے لیے پاسپورٹ آفس جائیں۔',
'https://passport.gov.pk',
true,
'{"url": "https://passport.gov.pk/track", "required_fields": ["tracking_id", "cnic_number"]}'::jsonb),

('Passport Renewal', 'پاسپورٹ کی تجدید', 'passport-renewal', 'Renew your expired or expiring Pakistani passport', 'اپنے میعاد ختم یا ختم ہونے والے پاکستانی پاسپورٹ کی تجدید کریں', (SELECT id FROM service_categories WHERE slug = 'identity-documents'), 'Directorate General of Immigration & Passports',
'[{"text": "Original expired passport", "text_urdu": "اصل میعاد ختم شدہ پاسپورٹ", "type": "document"}, {"text": "Original CNIC", "text_urdu": "اصل شناختی کارڈ", "type": "document"}, {"text": "Four recent passport-size photographs", "text_urdu": "چار حالیہ پاسپورٹ سائز تصاویر", "type": "document"}]'::jsonb,
'{"normal_36": 4500, "urgent_36": 7500, "normal_72": 8200, "urgent_72": 13700, "currency": "PKR"}'::jsonb,
'10-12 working days',
'[{"type": "normal", "days": 12, "fee": 4500}, {"type": "urgent", "days": 5, "fee": 7500}]'::jsonb,
'Apply online, pay fee, visit passport office with old passport and CNIC.',
'آن لائن درخواست دیں، فیس ادا کریں، پرانے پاسپورٹ اور شناختی کارڈ کے ساتھ پاسپورٹ آفس جائیں۔',
'https://passport.gov.pk',
true,
'{"url": "https://passport.gov.pk/track", "required_fields": ["tracking_id", "cnic_number"]}'::jsonb),

-- Birth Certificate
('Birth Certificate (NADRA)', 'پیدائش کا سرٹیفکیٹ', 'birth-certificate', 'Obtain computerized birth certificate from NADRA', 'نادرا سے کمپیوٹرائزڈ پیدائش کا سرٹیفکیٹ حاصل کریں', (SELECT id FROM service_categories WHERE slug = 'identity-documents'), 'NADRA',
'[{"text": "Hospital birth certificate or Union Council certificate", "text_urdu": "ہسپتال کا پیدائش کا سرٹیفکیٹ یا یونین کونسل کا سرٹیفکیٹ", "type": "document"}, {"text": "Parents CNICs", "text_urdu": "والدین کے شناختی کارڈ", "type": "document"}, {"text": "Child vaccination card (if available)", "text_urdu": "بچے کا ویکسینیشن کارڈ (اگر دستیاب ہو)", "type": "document"}]'::jsonb,
'{"normal": 200, "urgent": 700, "currency": "PKR"}'::jsonb,
'5-7 days',
'[{"type": "normal", "days": 7, "fee": 200}, {"type": "urgent", "days": 2, "fee": 700}]'::jsonb,
'Visit NADRA office with hospital certificate and parents CNICs. Fill form and pay fee.',
'ہسپتال کے سرٹیفکیٹ اور والدین کے شناختی کارڈوں کے ساتھ نادرا دفتر جائیں۔ فارم بھریں اور فیس ادا کریں۔',
'https://id.nadra.gov.pk',
true,
null),

('Death Certificate (NADRA)', 'موت کا سرٹیفکیٹ', 'death-certificate', 'Obtain computerized death certificate from NADRA', 'نادرا سے کمپیوٹرائزڈ موت کا سرٹیفکیٹ حاصل کریں', (SELECT id FROM service_categories WHERE slug = 'identity-documents'), 'NADRA',
'[{"text": "Hospital death certificate or Union Council certificate", "text_urdu": "ہسپتال کا موت کا سرٹیفکیٹ یا یونین کونسل کا سرٹیفکیٹ", "type": "document"}, {"text": "Deceased CNIC", "text_urdu": "مرحوم کا شناختی کارڈ", "type": "document"}, {"text": "Applicant CNIC (next of kin)", "text_urdu": "درخواست گزار کا شناختی کارڈ (قریبی رشتہ دار)", "type": "document"}]'::jsonb,
'{"normal": 200, "urgent": 700, "currency": "PKR"}'::jsonb,
'5-7 days',
'[{"type": "normal", "days": 7, "fee": 200}, {"type": "urgent", "days": 2, "fee": 700}]'::jsonb,
'Visit NADRA office with death certificate and required documents. Fill form and pay fee.',
'موت کے سرٹیفکیٹ اور مطلوبہ دستاویزات کے ساتھ نادرا دفتر جائیں۔ فارم بھریں اور فیس ادا کریں۔',
'https://id.nadra.gov.pk',
true,
null),

('Marriage Certificate (NADRA)', 'شادی کا سرٹیفکیٹ', 'marriage-certificate', 'Obtain computerized marriage certificate from NADRA', 'نادرا سے کمپیوٹرائزڈ شادی کا سرٹیفکیٹ حاصل کریں', (SELECT id FROM service_categories WHERE slug = 'identity-documents'), 'NADRA',
'[{"text": "Nikah Nama (marriage contract)", "text_urdu": "نکاح نامہ", "type": "document"}, {"text": "CNICs of both spouses", "text_urdu": "دونوں شریک حیات کے شناختی کارڈ", "type": "document"}, {"text": "Two witnesses CNICs", "text_urdu": "دو گواہوں کے شناختی کارڈ", "type": "document"}]'::jsonb,
'{"normal": 300, "urgent": 800, "currency": "PKR"}'::jsonb,
'5-7 days',
'[{"type": "normal", "days": 7, "fee": 300}, {"type": "urgent", "days": 2, "fee": 800}]'::jsonb,
'Visit NADRA office with Nikah Nama and CNICs. Fill application form and pay fee.',
'نکاح نامے اور شناختی کارڈوں کے ساتھ نادرا دفتر جائیں۔ درخواست فارم بھریں اور فیس ادا کریں۔',
'https://id.nadra.gov.pk',
true,
null);
-- Seed Services (Vehicle Services Category)
INSERT INTO services (name, name_urdu, slug, description, description_urdu, category_id, department, requirements, fees, processing_time, urgency_options, how_to_apply, how_to_apply_urdu, online_portal_url, is_online_available) VALUES

('Driving License (Learner)', 'ڈرائیونگ لائسنس (سیکھنے والا)', 'driving-license-learner', 'Apply for learner driving license to practice driving', 'ڈرائیونگ کی مشق کے لیے سیکھنے والے کا ڈرائیونگ لائسنس', (SELECT id FROM service_categories WHERE slug = 'vehicle-services'), 'Excise & Taxation Department',
'[{"text": "Original CNIC", "text_urdu": "اصل شناختی کارڈ", "type": "document"}, {"text": "CNIC photocopy", "text_urdu": "شناختی کارڈ کی فوٹو کاپی", "type": "document"}, {"text": "Four passport-size photographs", "text_urdu": "چار پاسپورٹ سائز تصاویر", "type": "document"}, {"text": "Medical fitness certificate", "text_urdu": "طبی تندرستی کا سرٹیفکیٹ", "type": "document"}]'::jsonb,
'{"application": 200, "test": 100, "license": 500, "total": 800, "currency": "PKR"}'::jsonb,
'Same day after test',
null,
'Visit Excise office, submit documents, pass written test, pay fee and get learner permit.',
'ایکسائز آفس جائیں، دستاویزات جمع کرائیں، تحریری ٹیسٹ پاس کریں، فیس ادا کریں اور سیکھنے والے کا پرمٹ حاصل کریں۔',
null,
false),

('Driving License (Permanent)', 'ڈرائیونگ لائسنس (مستقل)', 'driving-license-permanent', 'Apply for permanent driving license after completing learner period', 'سیکھنے کی مدت مکمل کرنے کے بعد مستقل ڈرائیونگ لائسنس کے لیے درخواست دیں', (SELECT id FROM service_categories WHERE slug = 'vehicle-services'), 'Excise & Taxation Department',
'[{"text": "Learner permit (minimum 42 days old)", "text_urdu": "سیکھنے والے کا پرمٹ (کم از کم 42 دن پرانا)", "type": "document"}, {"text": "Original CNIC", "text_urdu": "اصل شناختی کارڈ", "type": "document"}, {"text": "Medical fitness certificate", "text_urdu": "طبی تندرستی کا سرٹیفکیٹ", "type": "document"}, {"text": "Four passport-size photographs", "text_urdu": "چار پاسپورٹ سائز تصاویر", "type": "document"}]'::jsonb,
'{"test": 300, "license_5yr": 2000, "license_10yr": 3000, "currency": "PKR"}'::jsonb,
'7-10 days after test',
null,
'Pass practical driving test at Excise office, submit documents and fee, receive permanent license.',
'ایکسائز آفس میں عملی ڈرائیونگ ٹیسٹ پاس کریں، دستاویزات اور فیس جمع کرائیں، مستقل لائسنس حاصل کریں۔',
null,
false),

('Driving License Renewal', 'ڈرائیونگ لائسنس کی تجدید', 'driving-license-renewal', 'Renew your expired or expiring driving license', 'اپنے میعاد ختم یا ختم ہونے والے ڈرائیونگ لائسنس کی تجدید کریں', (SELECT id FROM service_categories WHERE slug = 'vehicle-services'), 'Excise & Taxation Department',
'[{"text": "Original expired license", "text_urdu": "اصل میعاد ختم شدہ لائسنس", "type": "document"}, {"text": "Original CNIC", "text_urdu": "اصل شناختی کارڈ", "type": "document"}, {"text": "Medical fitness certificate", "text_urdu": "طبی تندرستی کا سرٹیفکیٹ", "type": "document"}, {"text": "Two passport-size photographs", "text_urdu": "دو پاسپورٹ سائز تصاویر", "type": "document"}]'::jsonb,
'{"renewal_5yr": 2000, "renewal_10yr": 3000, "currency": "PKR"}'::jsonb,
'5-7 days',
null,
'Visit Excise office with old license and documents. Pay renewal fee and get new license.',
'پرانے لائسنس اور دستاویزات کے ساتھ ایکسائز آفس جائیں۔ تجدید کی فیس ادا کریں اور نیا لائسنس حاصل کریں۔',
null,
false),

('Vehicle Registration (New)', 'گاڑی کی رجسٹریشن (نئی)', 'vehicle-registration-new', 'Register a new vehicle and obtain registration number', 'نئی گاڑی کی رجسٹریشن کریں اور رجسٹریشن نمبر حاصل کریں', (SELECT id FROM service_categories WHERE slug = 'vehicle-services'), 'Excise & Taxation Department',
'[{"text": "Original invoice from dealer", "text_urdu": "ڈیلر سے اصل انوائس", "type": "document"}, {"text": "Original CNIC", "text_urdu": "اصل شناختی کارڈ", "type": "document"}, {"text": "Insurance certificate", "text_urdu": "انشورنس سرٹیفکیٹ", "type": "document"}, {"text": "Computerized registration form", "text_urdu": "کمپیوٹرائزڈ رجسٹریشن فارم", "type": "document"}]'::jsonb,
'{"registration": 5000, "number_plate": 1500, "token_tax": 0, "currency": "PKR", "note": "Token tax varies by engine capacity"}'::jsonb,
'3-5 days',
null,
'Submit documents at Excise office, pay registration fee and token tax, receive number plates.',
'ایکسائز آفس میں دستاویزات جمع کرائیں، رجسٹریشن فیس اور ٹوکن ٹیکس ادا کریں، نمبر پلیٹیں حاصل کریں۔',
null,
false),

('Vehicle Transfer of Ownership', 'گاڑی کی ملکیت کی منتقلی', 'vehicle-transfer-ownership', 'Transfer vehicle ownership from seller to buyer', 'بیچنے والے سے خریدار کو گاڑی کی ملکیت منتقل کریں', (SELECT id FROM service_categories WHERE slug = 'vehicle-services'), 'Excise & Taxation Department',
'[{"text": "Original registration book", "text_urdu": "اصل رجسٹریشن کتاب", "type": "document"}, {"text": "Seller and buyer CNICs", "text_urdu": "بیچنے والے اور خریدار کے شناختی کارڈ", "type": "document"}, {"text": "Sale letter on stamp paper", "text_urdu": "سٹامپ پیپر پر فروخت کا خط", "type": "document"}, {"text": "Token tax clearance", "text_urdu": "ٹوکن ٹیکس کی ادائیگی", "type": "document"}]'::jsonb,
'{"transfer_fee": 1000, "new_registration_book": 500, "currency": "PKR"}'::jsonb,
'3-5 days',
null,
'Both parties visit Excise office with documents. Complete transfer form, pay fee, receive updated registration.',
'دونوں فریق دستاویزات کے ساتھ ایکسائز آفس جائیں۔ منتقلی کا فارم مکمل کریں، فیس ادا کریں، اپ ڈیٹ شدہ رجسٹریشن حاصل کریں۔',
null,
false),

('Token Tax Payment', 'ٹوکن ٹیکس کی ادائیگی', 'token-tax-payment', 'Pay annual vehicle token tax', 'سالانہ گاڑی کا ٹوکن ٹیکس ادا کریں', (SELECT id FROM service_categories WHERE slug = 'vehicle-services'), 'Excise & Taxation Department',
'[{"text": "Original registration book", "text_urdu": "اصل رجسٹریشن کتاب", "type": "document"}, {"text": "CNIC photocopy", "text_urdu": "شناختی کارڈ کی فوٹو کاپی", "type": "document"}, {"text": "Previous token tax receipt", "text_urdu": "پچھلے ٹوکن ٹیکس کی رسید", "type": "document"}]'::jsonb,
'{"varies_by_engine": true, "800cc": 1200, "1000cc": 2000, "1300cc": 3500, "1600cc": 5000, "currency": "PKR"}'::jsonb,
'Same day',
null,
'Visit Excise office or authorized bank, pay token tax based on engine capacity, get receipt.',
'ایکسائز آفس یا مجاز بینک جائیں، انجن کی صلاحیت کی بنیاد پر ٹوکن ٹیکس ادا کریں، رسید حاصل کریں۔',
null,
false),

('Duplicate Registration Book', 'ڈپلیکیٹ رجسٹریشن کتاب', 'duplicate-registration-book', 'Get duplicate registration book if original is lost or damaged', 'اگر اصل گم یا خراب ہو تو ڈپلیکیٹ رجسٹریشن کتاب حاصل کریں', (SELECT id FROM service_categories WHERE slug = 'vehicle-services'), 'Excise & Taxation Department',
'[{"text": "FIR for lost registration book", "text_urdu": "گمشدہ رجسٹریشن کتاب کے لیے ایف آئی آر", "type": "document"}, {"text": "Original CNIC", "text_urdu": "اصل شناختی کارڈ", "type": "document"}, {"text": "Vehicle verification report", "text_urdu": "گاڑی کی تصدیق کی رپورٹ", "type": "document"}, {"text": "Affidavit on stamp paper", "text_urdu": "سٹامپ پیپر پر حلف نامہ", "type": "document"}]'::jsonb,
'{"duplicate_book": 1000, "verification": 500, "currency": "PKR"}'::jsonb,
'7-10 days',
null,
'File FIR, get vehicle verified, submit documents at Excise office with fee.',
'ایف آئی آر درج کرائیں، گاڑی کی تصدیق کرائیں، فیس کے ساتھ ایکسائز آفس میں دستاویزات جمع کرائیں۔',
null,
false),

('International Driving Permit', 'بین الاقوامی ڈرائیونگ پرمٹ', 'international-driving-permit', 'Obtain international driving permit for driving abroad', 'بیرون ملک ڈرائیونگ کے لیے بین الاقوامی ڈرائیونگ پرمٹ حاصل کریں', (SELECT id FROM service_categories WHERE slug = 'vehicle-services'), 'Automobile Association of Pakistan',
'[{"text": "Valid Pakistani driving license", "text_urdu": "درست پاکستانی ڈرائیونگ لائسنس", "type": "document"}, {"text": "Original CNIC", "text_urdu": "اصل شناختی کارڈ", "type": "document"}, {"text": "Passport copy", "text_urdu": "پاسپورٹ کی کاپی", "type": "document"}, {"text": "Two passport-size photographs", "text_urdu": "دو پاسپورٹ سائز تصاویر", "type": "document"}]'::jsonb,
'{"permit_fee": 3000, "processing": 500, "currency": "PKR"}'::jsonb,
'3-5 days',
null,
'Visit AA Pakistan office with documents. Fill application form, pay fee, receive IDP.',
'دستاویزات کے ساتھ اے اے پاکستان آفس جائیں۔ درخواست فارم بھریں، فیس ادا کریں، آئی ڈی پی حاصل کریں۔',
'https://www.aapakistan.com',
false);
-- Seed Services (Business Registration & Education)
INSERT INTO services (name, name_urdu, slug, description, description_urdu, category_id, department, requirements, fees, processing_time, how_to_apply, how_to_apply_urdu, online_portal_url, is_online_available) VALUES

-- Business Services
('Company Registration (Pvt Ltd)', 'کمپنی کی رجسٹریشن (پرائیویٹ لمیٹڈ)', 'company-registration-pvt', 'Register a private limited company with SECP', 'ایس ای سی پی کے ساتھ پرائیویٹ لمیٹڈ کمپنی کی رجسٹریشن', (SELECT id FROM service_categories WHERE slug = 'business-registration'), 'Securities & Exchange Commission of Pakistan',
'[{"text": "Name availability certificate", "text_urdu": "نام کی دستیابی کا سرٹیفکیٹ", "type": "document"}, {"text": "Memorandum and Articles of Association", "text_urdu": "میمورنڈم اور آرٹیکلز آف ایسوسی ایشن", "type": "document"}, {"text": "Directors CNICs", "text_urdu": "ڈائریکٹرز کے شناختی کارڈ", "type": "document"}, {"text": "Registered office address proof", "text_urdu": "رجسٹرڈ دفتر کے پتے کا ثبوت", "type": "document"}]'::jsonb,
'{"name_reservation": 200, "registration_upto_500k": 5000, "registration_500k_1m": 10000, "stamp_duty": 0, "currency": "PKR"}'::jsonb,
'7-10 days',
'Apply online at SECP eServices portal, submit documents, pay fees, receive incorporation certificate.',
'ایس ای سی پی ای سروسز پورٹل پر آن لائن درخواست دیں، دستاویزات جمع کرائیں، فیس ادا کریں، انکارپوریشن سرٹیفکیٹ حاصل کریں۔',
'https://eservices.secp.gov.pk',
true),

('NTN Registration', 'این ٹی این رجسٹریشن', 'ntn-registration', 'Register for National Tax Number with FBR', 'ایف بی آر کے ساتھ نیشنل ٹیکس نمبر کے لیے رجسٹر کریں', (SELECT id FROM service_categories WHERE slug = 'business-registration'), 'Federal Board of Revenue',
'[{"text": "CNIC (for individual) or incorporation certificate (for company)", "text_urdu": "شناختی کارڈ (انفرادی کے لیے) یا انکارپوریشن سرٹیفکیٹ (کمپنی کے لیے)", "type": "document"}, {"text": "Business address proof", "text_urdu": "کاروبار کے پتے کا ثبوت", "type": "document"}, {"text": "Bank account details", "text_urdu": "بینک اکاؤنٹ کی تفصیلات", "type": "document"}]'::jsonb,
'{"registration": 0, "currency": "PKR"}'::jsonb,
'Same day (online)',
'Register online at FBR IRIS portal, fill registration form, upload documents, receive NTN.',
'ایف بی آر آئی آر آئی ایس پورٹل پر آن لائن رجسٹر کریں، رجسٹریشن فارم بھریں، دستاویزات اپ لوڈ کریں، این ٹی این حاصل کریں۔',
'https://iris.fbr.gov.pk',
true),

('Sales Tax Registration', 'سیلز ٹیکس رجسٹریشن', 'sales-tax-registration', 'Register for sales tax with FBR', 'ایف بی آر کے ساتھ سیلز ٹیکس کے لیے رجسٹر کریں', (SELECT id FROM service_categories WHERE slug = 'business-registration'), 'Federal Board of Revenue',
'[{"text": "NTN certificate", "text_urdu": "این ٹی این سرٹیفکیٹ", "type": "document"}, {"text": "Business registration documents", "text_urdu": "کاروبار کی رجسٹریشن دستاویزات", "type": "document"}, {"text": "Business premises proof", "text_urdu": "کاروباری احاطے کا ثبوت", "type": "document"}, {"text": "Bank account statement", "text_urdu": "بینک اکاؤنٹ کا بیان", "type": "document"}]'::jsonb,
'{"registration": 0, "currency": "PKR"}'::jsonb,
'3-5 days',
'Apply online at FBR portal with NTN, submit documents, receive STR certificate.',
'این ٹی این کے ساتھ ایف بی آر پورٹل پر آن لائن درخواست دیں، دستاویزات جمع کرائیں، ایس ٹی آر سرٹیفکیٹ حاصل کریں۔',
'https://iris.fbr.gov.pk',
true),

('Trademark Registration', 'ٹریڈ مارک رجسٹریشن', 'trademark-registration', 'Register trademark with Intellectual Property Organization', 'انٹلیکچوئل پراپرٹی آرگنائزیشن کے ساتھ ٹریڈ مارک رجسٹر کریں', (SELECT id FROM service_categories WHERE slug = 'business-registration'), 'Intellectual Property Organization',
'[{"text": "Trademark design/logo", "text_urdu": "ٹریڈ مارک ڈیزائن/لوگو", "type": "document"}, {"text": "Applicant CNIC or company documents", "text_urdu": "درخواست گزار کا شناختی کارڈ یا کمپنی کی دستاویزات", "type": "document"}, {"text": "Power of attorney (if using agent)", "text_urdu": "پاور آف اٹارنی (اگر ایجنٹ استعمال کر رہے ہیں)", "type": "document"}]'::jsonb,
'{"filing_fee": 5000, "examination": 2000, "registration": 3000, "currency": "PKR"}'::jsonb,
'6-12 months',
'File application at IPO, pay fees, respond to examination report, receive registration certificate.',
'آئی پی او میں درخواست دائر کریں، فیس ادا کریں، امتحانی رپورٹ کا جواب دیں، رجسٹریشن سرٹیفکیٹ حاصل کریں۔',
'https://www.ipo.gov.pk',
false),

-- Education Services
('Degree Attestation (HEC)', 'ڈگری کی تصدیق (ایچ ای سی)', 'degree-attestation-hec', 'Get your degree attested by Higher Education Commission', 'ہائر ایجوکیشن کمیشن سے اپنی ڈگری کی تصدیق کرائیں', (SELECT id FROM service_categories WHERE slug = 'education'), 'Higher Education Commission',
'[{"text": "Original degree", "text_urdu": "اصل ڈگری", "type": "document"}, {"text": "Original transcript", "text_urdu": "اصل ٹرانسکرپٹ", "type": "document"}, {"text": "CNIC copy", "text_urdu": "شناختی کارڈ کی کاپی", "type": "document"}, {"text": "Passport copy (for foreign use)", "text_urdu": "پاسپورٹ کی کاپی (غیر ملکی استعمال کے لیے)", "type": "document"}]'::jsonb,
'{"attestation_per_degree": 2000, "courier": 500, "currency": "PKR"}'::jsonb,
'10-15 days',
'Submit documents at HEC regional office or apply online, pay fee, receive attested documents.',
'ایچ ای سی علاقائی دفتر میں دستاویزات جمع کرائیں یا آن لائن درخواست دیں، فیس ادا کریں، تصدیق شدہ دستاویزات حاصل کریں۔',
'https://www.hec.gov.pk',
true),

('Degree Equivalence Certificate', 'ڈگری کی مساوات کا سرٹیفکیٹ', 'degree-equivalence', 'Get equivalence certificate for foreign degrees', 'غیر ملکی ڈگریوں کے لیے مساوات کا سرٹیفکیٹ حاصل کریں', (SELECT id FROM service_categories WHERE slug = 'education'), 'Higher Education Commission',
'[{"text": "Attested degree from issuing country", "text_urdu": "جاری کرنے والے ملک سے تصدیق شدہ ڈگری", "type": "document"}, {"text": "Attested transcripts", "text_urdu": "تصدیق شدہ ٹرانسکرپٹس", "type": "document"}, {"text": "CNIC copy", "text_urdu": "شناختی کارڈ کی کاپی", "type": "document"}, {"text": "Passport copy", "text_urdu": "پاسپورٹ کی کاپی", "type": "document"}]'::jsonb,
'{"equivalence_fee": 5000, "processing": 1000, "currency": "PKR"}'::jsonb,
'30-45 days',
'Submit attested foreign documents at HEC, pay fee, wait for verification, receive equivalence certificate.',
'ایچ ای سی میں تصدیق شدہ غیر ملکی دستاویزات جمع کرائیں، فیس ادا کریں، تصدیق کا انتظار کریں، مساوات کا سرٹیفکیٹ حاصل کریں۔',
'https://www.hec.gov.pk',
true),

('Matric/Inter Certificate Verification', 'میٹرک/انٹر سرٹیفکیٹ کی تصدیق', 'matric-inter-verification', 'Verify matric or intermediate certificates from education boards', 'تعلیمی بورڈز سے میٹرک یا انٹرمیڈیٹ سرٹیفکیٹ کی تصدیق کریں', (SELECT id FROM service_categories WHERE slug = 'education'), 'Board of Intermediate & Secondary Education',
'[{"text": "Original certificate", "text_urdu": "اصل سرٹیفکیٹ", "type": "document"}, {"text": "Original detailed marks certificate", "text_urdu": "اصل تفصیلی نمبروں کا سرٹیفکیٹ", "type": "document"}, {"text": "CNIC copy", "text_urdu": "شناختی کارڈ کی کاپی", "type": "document"}]'::jsonb,
'{"verification": 500, "attestation": 200, "currency": "PKR"}'::jsonb,
'3-5 days',
'Visit respective education board office, submit documents, pay fee, receive verified certificate.',
'متعلقہ تعلیمی بورڈ کے دفتر جائیں، دستاویزات جمع کرائیں، فیس ادا کریں، تصدیق شدہ سرٹیفکیٹ حاصل کریں۔',
null,
false),

('Character Certificate', 'کردار کا سرٹیفکیٹ', 'character-certificate', 'Obtain character certificate from educational institution', 'تعلیمی ادارے سے کردار کا سرٹیفکیٹ حاصل کریں', (SELECT id FROM service_categories WHERE slug = 'education'), 'Educational Institution',
'[{"text": "Application on institution letterhead", "text_urdu": "ادارے کے لیٹر ہیڈ پر درخواست", "type": "document"}, {"text": "CNIC copy", "text_urdu": "شناختی کارڈ کی کاپی", "type": "document"}, {"text": "Degree/certificate copy", "text_urdu": "ڈگری/سرٹیفکیٹ کی کاپی", "type": "document"}]'::jsonb,
'{"certificate": 500, "attestation": 200, "currency": "PKR"}'::jsonb,
'5-7 days',
'Apply to your educational institution, submit documents, pay fee, receive character certificate.',
'اپنے تعلیمی ادارے میں درخواست دیں، دستاویزات جمع کرائیں، فیس ادا کریں، کردار کا سرٹیفکیٹ حاصل کریں۔',
null,
false);
-- Seed Government Offices

-- NADRA Offices in Major Cities
INSERT INTO offices (name, type, department, address, city, province, latitude, longitude, phone, timings, services_offered) VALUES

-- Karachi NADRA Offices
('NADRA Office Saddar', 'nadra', 'NADRA', 'Plot No. 1-C, Block-7, Kehkashan, Clifton, Karachi', 'Karachi', 'Sindh', 24.8138, 67.0299, '021-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('NADRA Office Gulshan-e-Iqbal', 'nadra', 'NADRA', 'Block 13-D, Gulshan-e-Iqbal, Karachi', 'Karachi', 'Sindh', 24.9207, 67.0820, '021-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('NADRA Office North Nazimabad', 'nadra', 'NADRA', 'Block L, North Nazimabad, Karachi', 'Karachi', 'Sindh', 24.9330, 67.0370, '021-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('NADRA Office Korangi', 'nadra', 'NADRA', 'Korangi Crossing, Karachi', 'Karachi', 'Sindh', 24.8260, 67.1090, '021-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('NADRA Mega Center Karachi', 'nadra', 'NADRA', 'Shahrah-e-Faisal, near Drigh Road, Karachi', 'Karachi', 'Sindh', 24.8897, 67.0631, '021-111-786-100', '{"monday": "8:00 AM - 8:00 PM", "tuesday": "8:00 AM - 8:00 PM", "wednesday": "8:00 AM - 8:00 PM", "thursday": "8:00 AM - 8:00 PM", "friday": "8:00 AM - 8:00 PM", "saturday": "8:00 AM - 4:00 PM", "sunday": "Closed"}'::jsonb, null),

-- Lahore NADRA Offices
('NADRA Office Allama Iqbal Town', 'nadra', 'NADRA', 'Main Boulevard, Allama Iqbal Town, Lahore', 'Lahore', 'Punjab', 31.5076, 74.3052, '042-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('NADRA Office Johar Town', 'nadra', 'NADRA', 'Block H-2, Johar Town, Lahore', 'Lahore', 'Punjab', 31.4697, 74.2728, '042-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('NADRA Office Model Town', 'nadra', 'NADRA', 'Block B, Model Town, Lahore', 'Lahore', 'Punjab', 31.4827, 74.3250, '042-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('NADRA Mega Center Lahore', 'nadra', 'NADRA', 'Ferozepur Road, near Kalma Chowk, Lahore', 'Lahore', 'Punjab', 31.5030, 74.3350, '042-111-786-100', '{"monday": "8:00 AM - 8:00 PM", "tuesday": "8:00 AM - 8:00 PM", "wednesday": "8:00 AM - 8:00 PM", "thursday": "8:00 AM - 8:00 PM", "friday": "8:00 AM - 8:00 PM", "saturday": "8:00 AM - 4:00 PM", "sunday": "Closed"}'::jsonb, null),

-- Islamabad NADRA Offices
('NADRA Headquarters Islamabad', 'nadra', 'NADRA', 'State Life Building, Blue Area, Islamabad', 'Islamabad', 'Islamabad', 33.7181, 73.0776, '051-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('NADRA Office G-10', 'nadra', 'NADRA', 'Markaz G-10, Islamabad', 'Islamabad', 'Islamabad', 33.6844, 73.0479, '051-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('NADRA Office F-8', 'nadra', 'NADRA', 'Markaz F-8, Islamabad', 'Islamabad', 'Islamabad', 33.7071, 73.0497, '051-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),

-- Rawalpindi NADRA Offices
('NADRA Office Saddar Rawalpindi', 'nadra', 'NADRA', 'Committee Chowk, Saddar, Rawalpindi', 'Rawalpindi', 'Punjab', 33.5979, 73.0478, '051-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('NADRA Office Satellite Town', 'nadra', 'NADRA', 'Satellite Town, Rawalpindi', 'Rawalpindi', 'Punjab', 33.6007, 73.0679, '051-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),

-- Faisalabad NADRA Offices
('NADRA Office Faisalabad', 'nadra', 'NADRA', 'Susan Road, Faisalabad', 'Faisalabad', 'Punjab', 31.4180, 73.0790, '041-111-786-100', '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 12:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),

-- Passport Offices
('Passport Office Karachi', 'passport', 'Directorate General of Immigration & Passports', 'Passport Office, Saddar, Karachi', 'Karachi', 'Sindh', 24.8607, 67.0011, '021-111-345-345', '{"monday": "8:00 AM - 2:00 PM", "tuesday": "8:00 AM - 2:00 PM", "wednesday": "8:00 AM - 2:00 PM", "thursday": "8:00 AM - 2:00 PM", "friday": "Closed", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('Passport Office Lahore', 'passport', 'Directorate General of Immigration & Passports', 'Passport Office, Lahore', 'Lahore', 'Punjab', 31.5497, 74.3436, '042-111-345-345', '{"monday": "8:00 AM - 2:00 PM", "tuesday": "8:00 AM - 2:00 PM", "wednesday": "8:00 AM - 2:00 PM", "thursday": "8:00 AM - 2:00 PM", "friday": "Closed", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('Passport Office Islamabad', 'passport', 'Directorate General of Immigration & Passports', 'G-8 Markaz, Islamabad', 'Islamabad', 'Islamabad', 33.6973, 73.0515, '051-111-345-345', '{"monday": "8:00 AM - 2:00 PM", "tuesday": "8:00 AM - 2:00 PM", "wednesday": "8:00 AM - 2:00 PM", "thursday": "8:00 AM - 2:00 PM", "friday": "Closed", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('Passport Office Rawalpindi', 'passport', 'Directorate General of Immigration & Passports', 'Saddar, Rawalpindi', 'Rawalpindi', 'Punjab', 33.5979, 73.0478, '051-111-345-345', '{"monday": "8:00 AM - 2:00 PM", "tuesday": "8:00 AM - 2:00 PM", "wednesday": "8:00 AM - 2:00 PM", "thursday": "8:00 AM - 2:00 PM", "friday": "Closed", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('Passport Office Multan', 'passport', 'Directorate General of Immigration & Passports', 'Nishtar Road, Multan', 'Multan', 'Punjab', 30.1978, 71.4711, '061-111-345-345', '{"monday": "8:00 AM - 2:00 PM", "tuesday": "8:00 AM - 2:00 PM", "wednesday": "8:00 AM - 2:00 PM", "thursday": "8:00 AM - 2:00 PM", "friday": "Closed", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('Passport Office Peshawar', 'passport', 'Directorate General of Immigration & Passports', 'Saddar Road, Peshawar', 'Peshawar', 'Khyber Pakhtunkhwa', 34.0151, 71.5249, '091-111-345-345', '{"monday": "8:00 AM - 2:00 PM", "tuesday": "8:00 AM - 2:00 PM", "wednesday": "8:00 AM - 2:00 PM", "thursday": "8:00 AM - 2:00 PM", "friday": "Closed", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null),
('Passport Office Quetta', 'passport', 'Directorate General of Immigration & Passports', 'Jinnah Road, Quetta', 'Quetta', 'Balochistan', 30.1830, 66.9987, '081-111-345-345', '{"monday": "8:00 AM - 2:00 PM", "tuesday": "8:00 AM - 2:00 PM", "wednesday": "8:00 AM - 2:00 PM", "thursday": "8:00 AM - 2:00 PM", "friday": "Closed", "saturday": "Closed", "sunday": "Closed"}'::jsonb, null);
-- Seed Government Schemes
INSERT INTO government_schemes (title, title_urdu, description, description_urdu, eligibility_criteria, benefits, benefits_urdu, how_to_apply, how_to_apply_urdu, deadline, category, department, is_active) VALUES

('Ehsaas Emergency Cash Program', 'احساس ایمرجنسی کیش پروگرام', 'Financial assistance program for low-income families affected by economic challenges', 'معاشی مشکلات سے متاثرہ کم آمدنی والے خاندانوں کے لیے مالی امداد کا پروگرام', 
'[{"text": "Monthly income less than Rs. 25,000", "text_urdu": "ماہانہ آمدنی 25,000 روپے سے کم"}, {"text": "CNIC holder", "text_urdu": "شناختی کارڈ رکھنے والا"}, {"text": "Not receiving other government assistance", "text_urdu": "دیگر سرکاری امداد حاصل نہیں کر رہے"}]'::jsonb,
'Rs. 12,000 quarterly cash assistance', '12,000 روپے سہ ماہی نقد امداد',
'Register through Ehsaas portal or visit nearest Ehsaas center with CNIC', 'احساس پورٹل کے ذریعے رجسٹر کریں یا شناختی کارڈ کے ساتھ قریبی احساس سینٹر جائیں',
null, 'Social Welfare', 'Ehsaas Program', true),

('Benazir Income Support Program (BISP)', 'بینظیر انکم سپورٹ پروگرام', 'Cash transfer program for women from poorest households', 'غریب ترین گھرانوں کی خواتین کے لیے نقد منتقلی کا پروگرام',
'[{"text": "Female head of household", "text_urdu": "خاندان کی خاتون سربراہ"}, {"text": "Poverty score below threshold", "text_urdu": "غربت کا سکور حد سے کم"}, {"text": "Valid CNIC", "text_urdu": "درست شناختی کارڈ"}]'::jsonb,
'Rs. 9,000 per quarter cash assistance', '9,000 روپے فی سہ ماہی نقد امداد',
'Visit BISP Tehsil office with CNIC for registration and survey', 'رجسٹریشن اور سروے کے لیے شناختی کارڈ کے ساتھ بی آئی ایس پی تحصیل دفتر جائیں',
null, 'Social Welfare', 'BISP', true),

('Prime Minister Laptop Scheme', 'وزیر اعظم لیپ ٹاپ سکیم', 'Free laptops for talented students in universities', 'یونیورسٹیوں میں ذہین طلباء کے لیے مفت لیپ ٹاپ',
'[{"text": "Enrolled in recognized university", "text_urdu": "تسلیم شدہ یونیورسٹی میں داخلہ"}, {"text": "Minimum CGPA 3.0", "text_urdu": "کم از کم سی جی پی اے 3.0"}, {"text": "Pakistani citizen", "text_urdu": "پاکستانی شہری"}]'::jsonb,
'Free laptop worth Rs. 60,000-80,000', '60,000-80,000 روپے مالیت کا مفت لیپ ٹاپ',
'Apply through HEC portal when applications open, submit academic records', 'جب درخواستیں کھلیں تو ایچ ای سی پورٹل کے ذریعے درخواست دیں، تعلیمی ریکارڈ جمع کرائیں',
null, 'Education', 'Higher Education Commission', false),

('Sehat Sahulat Program', 'صحت سہولت پروگرام', 'Free health insurance for low-income families', 'کم آمدنی والے خاندانوں کے لیے مفت صحت کی انشورنس',
'[{"text": "Family income less than Rs. 30,000/month", "text_urdu": "خاندانی آمدنی 30,000 روپے/ماہ سے کم"}, {"text": "Valid CNIC", "text_urdu": "درست شناختی کارڈ"}, {"text": "Resident of Pakistan", "text_urdu": "پاکستان کا رہائشی"}]'::jsonb,
'Free medical treatment up to Rs. 1,000,000 per family per year', 'فی خاندان فی سال 10 لاکھ روپے تک مفت طبی علاج',
'Visit nearest Sehat Sahulat center with CNIC and family registration', 'شناختی کارڈ اور خاندانی رجسٹریشن کے ساتھ قریبی صحت سہولت سینٹر جائیں',
null, 'Health', 'Ministry of Health', true),

('Kamyab Jawan Program', 'کامیاب جوان پروگرام', 'Youth entrepreneurship and skill development program', 'نوجوانوں کی کاروباری صلاحیت اور ہنر کی ترقی کا پروگرام',
'[{"text": "Age 21-45 years", "text_urdu": "عمر 21-45 سال"}, {"text": "Pakistani citizen with valid CNIC", "text_urdu": "درست شناختی کارڈ کے ساتھ پاکستانی شہری"}, {"text": "Business plan or skill training interest", "text_urdu": "کاروباری منصوبہ یا ہنر کی تربیت میں دلچسپی"}]'::jsonb,
'Interest-free loans up to Rs. 10 million, free skill training', '10 لاکھ روپے تک سود سے پاک قرضے، مفت ہنر کی تربیت',
'Apply online at kamyabjawan.gov.pk, submit business plan or enroll in training', 'kamyabjawan.gov.pk پر آن لائن درخواست دیں، کاروباری منصوبہ جمع کرائیں یا تربیت میں اندراج کریں',
null, 'Employment', 'Prime Minister Office', true),

('Naya Pakistan Housing Scheme', 'نیا پاکستان ہاؤسنگ سکیم', 'Affordable housing for low and middle-income families', 'کم اور متوسط آمدنی والے خاندانوں کے لیے سستی رہائش',
'[{"text": "Monthly income Rs. 20,000-150,000", "text_urdu": "ماہانہ آمدنی 20,000-150,000 روپے"}, {"text": "Pakistani citizen", "text_urdu": "پاکستانی شہری"}, {"text": "First-time home buyer", "text_urdu": "پہلی بار گھر خریدار"}]'::jsonb,
'Subsidized housing units, low-interest mortgages', 'سبسڈی والی رہائشی یونٹس، کم سود پر رہن',
'Register on Naya Pakistan Housing portal, submit income proof and CNIC', 'نیا پاکستان ہاؤسنگ پورٹل پر رجسٹر کریں، آمدنی کا ثبوت اور شناختی کارڈ جمع کرائیں',
null, 'Housing', 'Naya Pakistan Housing Authority', true),

('HEC Indigenous Scholarship', 'ایچ ای سی مقامی وظیفہ', 'Scholarships for talented students in Pakistani universities', 'پاکستانی یونیورسٹیوں میں ذہین طلباء کے لیے وظائف',
'[{"text": "Enrolled in HEC recognized university", "text_urdu": "ایچ ای سی تسلیم شدہ یونیورسٹی میں داخلہ"}, {"text": "Minimum CGPA 3.0", "text_urdu": "کم از کم سی جی پی اے 3.0"}, {"text": "Financial need", "text_urdu": "مالی ضرورت"}]'::jsonb,
'Full or partial tuition fee coverage, monthly stipend', 'مکمل یا جزوی ٹیوشن فیس، ماہانہ وظیفہ',
'Apply through university or HEC portal during application period', 'درخواست کی مدت کے دوران یونیورسٹی یا ایچ ای سی پورٹل کے ذریعے درخواست دیں',
'2025-06-30', 'Education', 'Higher Education Commission', true),

('Ehsaas Undergraduate Scholarship', 'احساس انڈر گریجویٹ وظیفہ', 'Need-based scholarships for undergraduate students', 'انڈر گریجویٹ طلباء کے لیے ضرورت پر مبنی وظائف',
'[{"text": "Enrolled in undergraduate program", "text_urdu": "انڈر گریجویٹ پروگرام میں داخلہ"}, {"text": "Family income less than Rs. 45,000/month", "text_urdu": "خاندانی آمدنی 45,000 روپے/ماہ سے کم"}, {"text": "Minimum 60% marks in previous degree", "text_urdu": "پچھلی ڈگری میں کم از کم 60% نمبر"}]'::jsonb,
'Rs. 60,000-100,000 per year depending on program', 'پروگرام کے لحاظ سے 60,000-100,000 روپے فی سال',
'Apply through Ehsaas scholarship portal with academic records and income proof', 'تعلیمی ریکارڈ اور آمدنی کے ثبوت کے ساتھ احساس اسکالرشپ پورٹل کے ذریعے درخواست دیں',
'2025-09-30', 'Education', 'Ehsaas Program', true),

('Youth Business Loan Scheme', 'نوجوانوں کے کاروبار کے لیے قرضہ', 'Low-interest loans for young entrepreneurs', 'نوجوان کاروباری افراد کے لیے کم سود پر قرضے',
'[{"text": "Age 21-40 years", "text_urdu": "عمر 21-40 سال"}, {"text": "Viable business plan", "text_urdu": "قابل عمل کاروباری منصوبہ"}, {"text": "No previous loan defaults", "text_urdu": "پچھلے قرضے کی خلاف ورزی نہیں"}]'::jsonb,
'Loans up to Rs. 5 million at 6% markup', '6% مارک اپ پر 5 لاکھ روپے تک قرضے',
'Apply through designated banks with business plan and CNIC', 'کاروباری منصوبے اور شناختی کارڈ کے ساتھ نامزد بینکوں کے ذریعے درخواست دیں',
null, 'Business', 'State Bank of Pakistan', true),

('Ehsaas Nashonuma Program', 'احساس ناشونما پروگرام', 'Nutrition program for pregnant women and children under 2 years', 'حاملہ خواتین اور 2 سال سے کم عمر بچوں کے لیے غذائیت کا پروگرام',
'[{"text": "Pregnant or lactating women", "text_urdu": "حاملہ یا دودھ پلانے والی خواتین"}, {"text": "Children under 2 years", "text_urdu": "2 سال سے کم عمر بچے"}, {"text": "Low-income families", "text_urdu": "کم آمدنی والے خاندان"}]'::jsonb,
'Specialized nutritious food, cash stipend, health monitoring', 'خصوصی غذائیت سے بھرپور خوراک، نقد وظیفہ، صحت کی نگرانی',
'Visit nearest Ehsaas Nashonuma center with CNIC and health card', 'شناختی کارڈ اور صحت کارڈ کے ساتھ قریبی احساس ناشونما سینٹر جائیں',
null, 'Health', 'Ehsaas Program', true);
-- Seed FAQs
INSERT INTO faqs (question, question_urdu, answer, answer_urdu, category, sort_order) VALUES

-- CNIC FAQs
('How long does it take to get a new CNIC?', 'نیا شناختی کارڈ حاصل کرنے میں کتنا وقت لگتا ہے؟', 
'Normal processing takes 7-10 days. Urgent service (1000 PKR) takes 3 days, and executive service (2500 PKR) takes 1 day.', 
'عام پروسیسنگ میں 7-10 دن لگتے ہیں۔ فوری سروس (1000 روپے) میں 3 دن لگتے ہیں، اور ایگزیکٹو سروس (2500 روپے) میں 1 دن لگتا ہے۔',
'Identity Documents', 1),

('What documents do I need for CNIC renewal?', 'شناختی کارڈ کی تجدید کے لیے مجھے کن دستاویزات کی ضرورت ہے؟',
'You need your original expired CNIC and two recent passport-size photographs. If your data needs updating, bring supporting documents.',
'آپ کو اپنے اصل میعاد ختم شدہ شناختی کارڈ اور دو حالیہ پاسپورٹ سائز تصاویر کی ضرورت ہے۔ اگر آپ کے ڈیٹا کو اپ ڈیٹ کرنے کی ضرورت ہے تو معاون دستاویزات لائیں۔',
'Identity Documents', 2),

('Can I track my CNIC application online?', 'کیا میں اپنی شناختی کارڈ کی درخواست آن لائن ٹریک کر سکتا ہوں؟',
'Yes, visit id.nadra.gov.pk/track-application and enter your tracking ID and CNIC number to check status.',
'جی ہاں، id.nadra.gov.pk/track-application پر جائیں اور حیثیت چیک کرنے کے لیے اپنی ٹریکنگ آئی ڈی اور شناختی کارڈ نمبر درج کریں۔',
'Identity Documents', 3),

-- Passport FAQs
('What is the difference between 36-page and 72-page passport?', '36 صفحات اور 72 صفحات کے پاسپورٹ میں کیا فرق ہے؟',
'36-page passport is valid for 5 years (fee: 3000 PKR normal). 72-page passport is valid for 10 years (fee: 6700 PKR normal). Choose based on your travel frequency.',
'36 صفحات کا پاسپورٹ 5 سال کے لیے درست ہے (فیس: 3000 روپے عام)۔ 72 صفحات کا پاسپورٹ 10 سال کے لیے درست ہے (فیس: 6700 روپے عام)۔ اپنی سفر کی تعداد کی بنیاد پر انتخاب کریں۔',
'Identity Documents', 4),

('How do I apply for a passport online?', 'میں آن لائن پاسپورٹ کے لیے کیسے درخواست دوں؟',
'Visit passport.gov.pk, create account, fill online form, pay fee at designated bank, then visit passport office for biometric verification with appointment.',
'passport.gov.pk پر جائیں، اکاؤنٹ بنائیں، آن لائن فارم بھریں، نامزد بینک میں فیس ادا کریں، پھر اپائنٹمنٹ کے ساتھ بائیو میٹرک تصدیق کے لیے پاسپورٹ آفس جائیں۔',
'Identity Documents', 5),

('Can I get urgent passport in 2 days?', 'کیا میں 2 دن میں فوری پاسپورٹ حاصل کر سکتا ہوں؟',
'Yes, fast-track service is available for 9000 PKR (36 pages) or 18200 PKR (72 pages). Processing takes 2 working days after biometric verification.',
'جی ہاں، فاسٹ ٹریک سروس 9000 روپے (36 صفحات) یا 18200 روپے (72 صفحات) میں دستیاب ہے۔ بائیو میٹرک تصدیق کے بعد پروسیسنگ میں 2 کاروباری دن لگتے ہیں۔',
'Identity Documents', 6),

-- Driving License FAQs
('What is the minimum age for driving license?', 'ڈرائیونگ لائسنس کے لیے کم سے کم عمر کیا ہے؟',
'Minimum age is 18 years for car/motorcycle license. For heavy vehicles, minimum age is 21 years.',
'کار/موٹر سائیکل لائسنس کے لیے کم سے کم عمر 18 سال ہے۔ بھاری گاڑیوں کے لیے کم سے کم عمر 21 سال ہے۔',
'Vehicle Services', 7),

('How long is learner permit valid?', 'سیکھنے والے کا پرمٹ کتنے عرصے تک درست ہے؟',
'Learner permit is valid for 6 months. You must wait minimum 42 days before applying for permanent license.',
'سیکھنے والے کا پرمٹ 6 ماہ کے لیے درست ہے۔ مستقل لائسنس کے لیے درخواست دینے سے پہلے آپ کو کم از کم 42 دن انتظار کرنا ہوگا۔',
'Vehicle Services', 8),

('What is the fee for driving license?', 'ڈرائیونگ لائسنس کی فیس کیا ہے؟',
'Learner permit: 800 PKR total. Permanent license: 2000 PKR for 5 years or 3000 PKR for 10 years, plus 300 PKR test fee.',
'سیکھنے والے کا پرمٹ: کل 800 روپے۔ مستقل لائسنس: 5 سال کے لیے 2000 روپے یا 10 سال کے لیے 3000 روپے، علاوہ 300 روپے ٹیسٹ فیس۔',
'Vehicle Services', 9),

-- Vehicle Registration FAQs
('How much is token tax for my car?', 'میری گاڑی کے لیے ٹوکن ٹیکس کتنا ہے؟',
'Token tax varies by engine capacity: 800cc (1200 PKR), 1000cc (2000 PKR), 1300cc (3500 PKR), 1600cc (5000 PKR). Rates may vary by province.',
'ٹوکن ٹیکس انجن کی صلاحیت کے لحاظ سے مختلف ہوتا ہے: 800cc (1200 روپے)، 1000cc (2000 روپے)، 1300cc (3500 روپے)، 1600cc (5000 روپے)۔ شرحیں صوبے کے لحاظ سے مختلف ہو سکتی ہیں۔',
'Vehicle Services', 10),

('What documents needed for vehicle transfer?', 'گاڑی کی منتقلی کے لیے کن دستاویزات کی ضرورت ہے؟',
'Original registration book, seller and buyer CNICs, sale letter on stamp paper (Rs. 50), and token tax clearance certificate.',
'اصل رجسٹریشن کتاب، بیچنے والے اور خریدار کے شناختی کارڈ، سٹامپ پیپر (50 روپے) پر فروخت کا خط، اور ٹوکن ٹیکس کلیئرنس سرٹیفکیٹ۔',
'Vehicle Services', 11),

-- Business FAQs
('How much does company registration cost?', 'کمپنی کی رجسٹریشن کی لاگت کتنی ہے؟',
'Name reservation: 200 PKR. Registration fee depends on capital: up to 500K (5000 PKR), 500K-1M (10000 PKR). Plus stamp duty based on capital.',
'نام کی بکنگ: 200 روپے۔ رجسٹریشن فیس سرمائے پر منحصر ہے: 500K تک (5000 روپے)، 500K-1M (10000 روپے)۔ علاوہ سرمائے کی بنیاد پر سٹامپ ڈیوٹی۔',
'Business Registration', 12),

('Is NTN registration free?', 'کیا این ٹی این رجسٹریشن مفت ہے؟',
'Yes, NTN registration with FBR is completely free. You can register online at IRIS portal without any fee.',
'جی ہاں، ایف بی آر کے ساتھ این ٹی این رجسٹریشن مکمل طور پر مفت ہے۔ آپ بغیر کسی فیس کے آئی آر آئی ایس پورٹل پر آن لائن رجسٹر کر سکتے ہیں۔',
'Business Registration', 13),

-- Education FAQs
('How long does HEC degree attestation take?', 'ایچ ای سی ڈگری کی تصدیق میں کتنا وقت لگتا ہے؟',
'Normal processing takes 10-15 working days. You can track your application online using tracking number.',
'عام پروسیسنگ میں 10-15 کاروباری دن لگتے ہیں۔ آپ ٹریکنگ نمبر استعمال کرتے ہوئے اپنی درخواست آن لائن ٹریک کر سکتے ہیں۔',
'Education', 14),

('Can I get degree attested for foreign use?', 'کیا میں غیر ملکی استعمال کے لیے ڈگری کی تصدیق کروا سکتا ہوں؟',
'Yes, HEC attestation is valid for foreign use. You may also need attestation from Ministry of Foreign Affairs and embassy of destination country.',
'جی ہاں، ایچ ای سی کی تصدیق غیر ملکی استعمال کے لیے درست ہے۔ آپ کو وزارت خارجہ اور منزل کے ملک کی سفارت خانے سے بھی تصدیق کی ضرورت ہو سکتی ہے۔',
'Education', 15),

-- General FAQs
('What is the difference between urgent and normal service?', 'فوری اور عام سروس میں کیا فرق ہے؟',
'Normal service is cheaper but takes longer (7-15 days). Urgent service costs more but delivers faster (1-5 days). Choose based on your timeline and budget.',
'عام سروس سستی ہے لیکن زیادہ وقت لیتی ہے (7-15 دن)۔ فوری سروس زیادہ مہنگی ہے لیکن تیزی سے فراہم کرتی ہے (1-5 دن)۔ اپنی ٹائم لائن اور بجٹ کی بنیاد پر انتخاب کریں۔',
'General', 16),

('Where can I pay government fees?', 'میں سرکاری فیس کہاں ادا کر سکتا ہوں؟',
'Most fees can be paid at designated banks (HBL, NBP, UBL, etc.), online through department portals, or at the government office directly.',
'زیادہ تر فیس نامزد بینکوں (ایچ بی ایل، این بی پی، یو بی ایل وغیرہ) میں، محکمے کے پورٹلز کے ذریعے آن لائن، یا براہ راست سرکاری دفتر میں ادا کی جا سکتی ہے۔',
'General', 17),

('Do I need to visit office for online applications?', 'کیا مجھے آن لائن درخواستوں کے لیے دفتر جانا ہوگا؟',
'For most online applications, you need to visit office at least once for biometric verification or document submission. Check specific service requirements.',
'زیادہ تر آن لائن درخواستوں کے لیے، آپ کو بائیو میٹرک تصدیق یا دستاویزات جمع کرانے کے لیے کم از کم ایک بار دفتر جانا ہوگا۔ مخصوص سروس کی ضروریات چیک کریں۔',
'General', 18);
