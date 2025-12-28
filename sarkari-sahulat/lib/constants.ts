export const APP_NAME = 'SarkariSahulat';
export const APP_NAME_URDU = 'سرکاری سہولت';
export const APP_DESCRIPTION = 'Your complete guide to Pakistani government services';
export const APP_DESCRIPTION_URDU = 'پاکستانی سرکاری خدمات کے لیے آپ کی مکمل رہنما';

export const SUPPORTED_LOCALES = ['en', 'ur'] as const;
export const DEFAULT_LOCALE = 'en';

export const OFFICE_TYPES = {
    nadra: { label: 'NADRA', label_urdu: 'نادرا', icon: 'IdCard' },
    passport: { label: 'Passport Office', label_urdu: 'پاسپورٹ آفس', icon: 'Plane' },
    court: { label: 'Court', label_urdu: 'عدالت', icon: 'Scale' },
    police: { label: 'Police Station', label_urdu: 'پولیس اسٹیشن', icon: 'Shield' },
    tax: { label: 'Tax Office', label_urdu: 'ٹیکس آفس', icon: 'Receipt' },
    land_registry: { label: 'Land Registry', label_urdu: 'زمین کی رجسٹری', icon: 'MapPin' },
    vehicle_registration: { label: 'Vehicle Registration', label_urdu: 'گاڑی کی رجسٹریشن', icon: 'Car' },
    education: { label: 'Education Office', label_urdu: 'تعلیمی دفتر', icon: 'GraduationCap' },
    health: { label: 'Health Office', label_urdu: 'صحت کا دفتر', icon: 'Heart' },
    other: { label: 'Other', label_urdu: 'دیگر', icon: 'Building' },
} as const;

export const PROVINCES = [
    { value: 'punjab', label: 'Punjab', label_urdu: 'پنجاب' },
    { value: 'sindh', label: 'Sindh', label_urdu: 'سندھ' },
    { value: 'kpk', label: 'Khyber Pakhtunkhwa', label_urdu: 'خیبر پختونخوا' },
    { value: 'balochistan', label: 'Balochistan', label_urdu: 'بلوچستان' },
    { value: 'islamabad', label: 'Islamabad Capital Territory', label_urdu: 'اسلام آباد' },
    { value: 'ajk', label: 'Azad Jammu & Kashmir', label_urdu: 'آزاد جموں و کشمیر' },
    { value: 'gilgit', label: 'Gilgit-Baltistan', label_urdu: 'گلگت بلتستان' },
] as const;

export const MAJOR_CITIES = [
    { value: 'karachi', label: 'Karachi', label_urdu: 'کراچی', province: 'sindh' },
    { value: 'lahore', label: 'Lahore', label_urdu: 'لاہور', province: 'punjab' },
    { value: 'islamabad', label: 'Islamabad', label_urdu: 'اسلام آباد', province: 'islamabad' },
    { value: 'rawalpindi', label: 'Rawalpindi', label_urdu: 'راولپنڈی', province: 'punjab' },
    { value: 'faisalabad', label: 'Faisalabad', label_urdu: 'فیصل آباد', province: 'punjab' },
    { value: 'multan', label: 'Multan', label_urdu: 'ملتان', province: 'punjab' },
    { value: 'peshawar', label: 'Peshawar', label_urdu: 'پشاور', province: 'kpk' },
    { value: 'quetta', label: 'Quetta', label_urdu: 'کوئٹہ', province: 'balochistan' },
    { value: 'hyderabad', label: 'Hyderabad', label_urdu: 'حیدرآباد', province: 'sindh' },
    { value: 'gujranwala', label: 'Gujranwala', label_urdu: 'گوجرانوالہ', province: 'punjab' },
] as const;

export const DEFAULT_MAP_CENTER = {
    lat: 30.3753,
    lng: 69.3451,
    zoom: 5,
} as const;

export const SEARCH_RADIUS_KM = 50;
export const MAX_SEARCH_RESULTS = 50;
