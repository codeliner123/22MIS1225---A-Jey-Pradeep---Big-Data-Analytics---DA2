import { Doctor, Organization, Patient, Post } from '@/types';

export const doctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Maya Iyer',
    specialty: 'Cardiothoracic Surgery',
    location: 'Chennai',
    credentials: 'MBBS, MS, MCh',
    skills: { 'CABG Surgery': 34, 'Minimally Invasive Procedures': 21, Leadership: 18 },
    profilePicture: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    about: 'Specializes in complex cardiac reconstruction and patient-centered recovery plans.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Anika Rao',
    specialty: 'Neurology',
    location: 'Bengaluru',
    credentials: 'MBBS, MD, DM',
    skills: { 'Stroke Care': 29, Epilepsy: 16, Telemedicine: 24 },
    profilePicture: 'https://images.unsplash.com/photo-1594824475555-9b3e5f04f84f?w=400',
    about: 'Combines evidence-based care with digital follow-up pathways for chronic neurological conditions.'
  },
  {
    id: 'doc-3',
    name: 'Dr. Karan Mehta',
    specialty: 'Orthopedics',
    location: 'Mumbai',
    credentials: 'MBBS, MS Ortho',
    skills: { Arthroscopy: 22, 'Sports Injury Rehab': 17, 'Patient Education': 31 },
    profilePicture: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    about: 'Focused on mobility restoration with multidisciplinary rehabilitation programs.'
  }
];

export const organizations: Organization[] = [
  {
    id: 'org-1',
    hospitalName: 'Apollo Specialty Hospital',
    location: 'Chennai',
    jobOpenings: ['Cardiologist', 'Nurse Manager', 'Clinical Data Analyst']
  },
  {
    id: 'org-2',
    hospitalName: 'Fortis Care Institute',
    location: 'Bengaluru',
    jobOpenings: ['Neurologist', 'Operations Lead', 'Physician Assistant']
  }
];

export const posts: Post[] = [
  {
    id: 'post-1',
    author: 'Dr. Maya Iyer',
    content:
      'Today our team completed a successful minimally invasive valve repair. Prioritizing early ambulation reduced average recovery time by 18%.',
    timestamp: '2h ago',
    likes: 54,
    comments: [
      { id: 'c1', author: 'Dr. Anika Rao', content: 'Great outcomes. Would love to compare pathways.' },
      { id: 'c2', author: 'Dr. Karan Mehta', content: 'Impressive recovery metrics.' }
    ]
  },
  {
    id: 'post-2',
    author: 'Dr. Anika Rao',
    content:
      'A reminder for caregivers: post-stroke recovery improves significantly with structured home exercises and weekly tele-check-ins.',
    timestamp: '5h ago',
    likes: 37,
    comments: [{ id: 'c3', author: 'Patient Advocate Group', content: 'Thanks for the practical guidance.' }]
  }
];

export const patients: Patient[] = [
  { id: 'pat-1', name: 'Sonia Verma', pastAppointments: ['Neurology follow-up - Jan 14', 'Cardiac screening - Dec 11'] },
  { id: 'pat-2', name: 'Rahul Menon', pastAppointments: ['Orthopedic consultation - Nov 29'] }
];
