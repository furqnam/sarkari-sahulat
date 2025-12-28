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
