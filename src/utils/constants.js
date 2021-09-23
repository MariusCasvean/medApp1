const regions = [
  'Banat',
  'Bucovina',
  'Crisana',
  'Dobrogea',
  'Maramures',
  'Moldova',
  'Muntenia',
  'Oltenia',
  'Transilvania',
];

const regionsColor = [
  '#ffac20',
  '#00e0ff',
  '#909000',
  '#ffffac',
  '#ac80ff',
  '#ff8080',
  '#60ace0',
  '#ff4040',
  '#80c090',
];

const counties = [
  'Alba',
  'Arad',
  'Arges',
  'Bacau',
  'Bihor',
  'Bistrita-Nasaud',
  'Botosani',
  'Braila',
  'Brasov',
  'Bucuresti',
  'Buzau',
  'Calarasi',
  'Caras-Severin',
  'Cluj',
  'Constanta',
  'Covasna',
  'Dambovita',
  'Dolj',
  'Galati',
  'Giurgiu',
  'Gorj',
  'Harghita',
  'Hunedoara',
  'Ialomita',
  'Iasi',
  'Ilfov',
  'Maramures',
  'Mehedinti',
  'Mures',
  'Neamt',
  'Olt',
  'Prahova',
  'Salaj',
  'Satu Mare',
  'Sibiu',
  'Suceava',
  'Teleorman',
  'Timis',
  'Tulcea',
  'Valcea',
  'Vaslui',
  'Vrancea',
];

const countiesShort = [
  'AB',
  'AR',
  'AG',
  'BC',
  'BH',
  'BN',
  'BT',
  'BR',
  'BV',
  'B',
  'BZ',
  'CL',
  'CS',
  'CJ',
  'CT',
  'CV',
  'DB',
  'DJ',
  'GL',
  'GR',
  'GJ',
  'HR',
  'HD',
  'IL',
  'IS',
  'IF',
  'MM',
  'MH',
  'MS',
  'NT',
  'OT',
  'PH',
  'SJ',
  'SM',
  'SB',
  'SV',
  'TR',
  'TM',
  'TL',
  'VL',
  'VS',
  'VR',
];

const diseases = [
  'Asthma',
  'Blood Disorders',
  'Bronchitis',
  'Common Cold',
  'Conjunctivitis',
  'Diabetes',
  'Epilepsy',
  'Hypertension',
  'Meningitis',
  'Muscular Dystrophy',
  'Obesity and Overweight',
  'Pneumonia',
  'Sinusitis',
  'Sleep Disorder',
  'Other',
];

const diseasesColor = [
  '#F57C00',
  '#7ddff5',
  '#ed1515',
  '#6e3Ff0',
  '#ff49a8',
  '#99dede',
  '#ffac20',
  '#00e0ff',
  '#909000',
  '#ffffac',
  '#ac80ff',
  '#ff8080',
  '#60ace0',
  '#ff4040',
  '#80c090',
];

const genders = [
  'Male',
  'Female',
];

const gendersColor = [
  '#42A5F5',
  '#EF5350',
];

const pressureValues = [
  'Low',
  'Normal',
  'Elevated',
  'High',
  'Hypertensive',
];

const pressureColors = [
  '#42A5F5',
  '#66BB6A',
  '#FFEE58',
  '#F57C00',
  '#E53935',
];

const bloodPressure = {
  LOW_SYSTOLIC: 'Systolic < 80',
  LOW_DIASTOLIC: 'Diastolic < 40',
  NORMAL_SYSTOLIC: '80 < Systolic < 120',
  NORMAL_DIASTOLIC: '40 < Diastolic < 80',
  ELEVATED_SYSTOLIC: '120 < Systolic < 129',
  ELEVATED_DIASTOLIC: '40 < Diastolic < 80',
  HIGH_SYSTOLIC: '130 < Systolic < 180',
  HIGH_DIASTOLIC: '80 < Diastolic < 120',
  HYPERTENSIVE_SYSTOLIC: 'Systolic > 180',
  HYPERTENSIVE_DIASTOLIC: 'Diastolic > 120',
};

const covid = {
  BEFORE: 'Did patient had COVID-19 before and he is healed now?',
  NOW: 'Do patient has COVID-19 now?',
  VACCINE: 'Did patient get COVID-19 vaccine?'
};

const headersPatientsTable = [
  { text: "Firstname", value: "firstname" },
  { text: "Lastname", value: "lastname" },
  { text: "Region", value: "region" },
  { text: "County", value: "county" },
  { text: "City", value: "city" },
  { text: "Age", value: "age" },
  { text: "COVID before", value: "before" },
  { text: "COVID now", value: "now" },
  { text: "Vaccine", value: "vaccine" },
  { text: "Actions", value: "actions" },
];

const defaultPatientObject = {
  firstname: "",
  lastname: "",
  age: "",
  region: "",
  county: "",
  city: "",
  gender: "",
  bloodPressure: "",
  covidBefore: false,
  covidNow: false,
  covidVaccine: false,
  diseases: []
};

const buttonLabel = {
  ADD_PATIENT: 'Add patient',
  CANCEL: 'Cancel',
  CONFIRM: 'Confirm',
  CREATE_VACCINE_APPOINTMENT: 'Create appointment',
  EDIT_APPOINTMENT:'Edit appointment',
  SAVE_APPOINTMENT:'Save appointment',
  DELETE: 'Delete',
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  REGISTER: 'Register',
  SAVE: 'Save',
  SAVE_PATIENT: 'Save patient',
  SCHEDULE_VACCINE: 'Schedule patient for vaccine',
};

const notificationMessages = {
  PATIENT_CREATE_SUCCESS: 'Patient successfully added',
  PATIENT_EDIT_SUCCESS: 'Patient successfully updated',
  PATIENT_DELETE_SUCCESS: 'Patient successfully deleted',
  PATIENT_VACCINE_APPOINTMENT_SUCCESS: 'Patient successfully scheduled for vaccine',
  APPOINTMENT_CONFIRMED: 'Appointment successfully confirmed',
  APPOINTMENT_DELETED: 'Appointment successfully deleted',
  APPOINTMENT_UPDATED: 'Appointment successfully updated',
};

const text = {
  ADD_NEW_PATIENT: 'Add new patient',
  EDIT_PATIENT: 'Edit patient',
  SCHEDULE_VACCINE: 'Vaccine scheduler',
};

const sortOptions = [
  'Firstname A-Z',
  'Firstname Z-A',
  'Lastname A-Z',
  'Lastname Z-A',
  'Date Asc',
  'Date Desc',
];

export {
  bloodPressure,
  buttonLabel,
  counties,
  countiesShort,
  covid,
  defaultPatientObject,
  diseases,
  diseasesColor,
  genders,
  gendersColor,
  headersPatientsTable,
  notificationMessages,
  pressureColors,
  pressureValues,
  regions,
  regionsColor,
  sortOptions,
  text,
};
