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
