/* =============================================
   TEHCS — Service catalogue
   One source of truth for the services page, the contact form's
   service dropdown and the "Book" links. Mirrors the TEHCS mobile app
   (lib/screens/services_screen.dart) — keep the two in sync.

   Each service: [name, emoji, duration, description]
============================================= */
window.TEHCS_CATALOG = [
  {
    key: 'cleaning', label: 'Cleaning', cls: 'cat-cl',
    sub: 'House · Office · Deep Clean · End of Tenancy',
    intro: {
      img: 'images/House.jpg', alt: 'Professional cleaner at work in a home',
      title: 'Spotless spaces,<br>home or business.',
      text: 'From a weekly domestic clean to end-of-tenancy, after-builders and hotel cleaning — our vetted cleaning teams work to a checklist so nothing gets missed.'
    },
    groups: [
      { name: 'Home Cleaning', emoji: '🏠', color: '#2980B9',
        desc: 'Everyday and one-off cleaning for homes and flats.',
        services: [
          ['Domestic Cleaning', '🧹', '2–4 hrs', 'Regular cleaning of houses, flats and apartments.'],
          ['Deep Cleaning', '✨', '4–8 hrs', 'Intensive cleaning of kitchens, bathrooms, bedrooms and living areas.'],
          ['End-of-Tenancy Cleaning', '🔑', '4–10 hrs', 'Detailed cleaning before a property is handed back to a landlord or letting agent.'],
          ['Move-In / Move-Out Cleaning', '📦', '3–6 hrs', 'Preparing a property for a new occupant or after someone moves out.'],
          ['Laundry & Ironing', '👕', '2–4 hrs', 'Washing, drying, folding and ironing clothes, towels and bedding.']
        ] },
      { name: 'Commercial & Hospitality', emoji: '🏢', color: '#16A085',
        desc: 'Offices, shops, hotels and shared spaces.',
        services: [
          ['Office Cleaning', '🏢', 'Flexible', 'Cleaning offices, meeting rooms, kitchens, toilets and shared areas.'],
          ['Commercial Cleaning', '🏪', 'Flexible', 'Cleaning shops, businesses and commercial premises.'],
          ['Hotel & Hospitality Cleaning', '🛎️', 'Flexible', 'Guest rooms, corridors, reception areas and other hotel spaces.'],
          ['Communal Area Cleaning', '🏗️', 'Flexible', 'Staircases, hallways, lifts, shared kitchens and other communal spaces.']
        ] },
      { name: 'Specialist & Contract', emoji: '✨', color: '#5B4FCF',
        desc: 'Post-build, event and scheduled contract cleaning.',
        services: [
          ['After-Builders Cleaning', '🔨', '4–8 hrs', 'Removing dust, dirt and construction residue after building or renovation work.'],
          ['Event Cleaning', '🎉', 'Flexible', 'Cleaning before, during or after events.'],
          ['Regular Contract Cleaning', '📋', 'Contract', 'Scheduled cleaning services for homes, offices, businesses and other premises.']
        ] }
    ]
  },
  {
    key: 'homecare', label: 'Home Care', cls: 'cat-h',
    sub: 'Personal Care · Senior Care · Live-in · Night Care',
    intro: {
      img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80&fit=crop', alt: 'Carer supporting a client at home',
      title: 'Compassionate care in<br>the comfort of home.',
      text: 'Hands-on personal care, companionship and round-the-clock support — built around a care plan we agree with you and your family.'
    },
    groups: [
      { name: 'Personal & Senior Care', emoji: '🫶', color: '#E63329',
        desc: 'Dignified, hands-on support for you or a loved one.',
        services: [
          ['Personal Care', '🫶', '1–4 hrs', 'Dignified assistance with bathing, dressing, grooming and daily hygiene.'],
          ['Senior Care', '👴', 'Flexible', 'Specialist support for elderly clients focused on comfort, safety and wellbeing.'],
          ['Respite Care', '💆', 'Flexible', 'Temporary relief care giving regular carers a well-deserved break.'],
          ['Occupational Therapy', '🦾', '1–2 hrs', 'Qualified therapists helping clients regain independence and daily living skills.']
        ] },
      { name: 'Round-the-Clock Care', emoji: '🌙', color: '#6B1E3C',
        desc: 'Live-in and overnight care for constant peace of mind.',
        services: [
          ['Live-in Care', '🏡', '24/7', 'Full-time live-in carer providing round-the-clock support and companionship.'],
          ['Night Care', '🌙', 'Overnight', 'Overnight care providing peace of mind and support during night-time hours.']
        ] },
      { name: 'Daily Living Support', emoji: '🤝', color: '#C2410C',
        desc: 'Company, meals, medication and shopping help at home.',
        services: [
          ['Companionship', '🤝', 'Flexible', 'Caring companions providing social engagement and emotional support at home.'],
          ['Medication Reminders', '💊', 'Daily', 'Scheduled reminders and guidance ensuring correct medication management.'],
          ['Meal Preparation', '🍳', '1–2 hrs', 'Nutritious home-cooked meals tailored to dietary needs and preferences.'],
          ['Shopping Assistance', '🛒', '1–2 hrs', 'We shop for your essentials so you never run out of what you need.']
        ] }
    ]
  },
  {
    key: 'medical', label: 'Medical', cls: 'cat-m',
    sub: 'Doctors · Nursing · Wound Care · Therapy',
    intro: {
      img: 'images/P Doctors.jpg', alt: 'Doctor on a home visit',
      title: 'Qualified clinical care,<br>wherever you need it.',
      text: 'Doctors, nurses, therapists and pharmacist support — at home, in care settings and in the community.'
    },
    groups: [
      { name: 'Medical & Clinical Care', emoji: '🩺', color: '#0B4F9C',
        desc: 'Doctors, nurses, therapists and pharmacist support.',
        services: [
          ['Doctors & Healthcare Professionals', '🩺', 'Flexible', 'Qualified doctors and healthcare professionals for consultations and clinical support.'],
          ['Nursing Care', '👩‍⚕️', 'Flexible', 'Skilled nurses providing professional care at home, in care settings and in the community.'],
          ['Health Assessments & Monitoring', '📋', 'Flexible', 'Routine health assessments and ongoing monitoring to keep track of your wellbeing.'],
          ['Wound Care & Dressing', '🩹', 'Flexible', 'Professional wound cleaning, dressing and follow-up care.'],
          ['Therapists & Psychologists', '🧠', 'Flexible', 'Therapy and psychological support from qualified professionals.'],
          ['Pharmacist Support & Medication Management', '💊', 'Flexible', 'Pharmacist guidance and safe, organised management of your medication.']
        ] }
    ]
  },
  {
    key: 'nonmedical', label: 'Non-Medical', cls: 'cat-n',
    sub: 'Childcare · Errands · Delivery · Events · Moving',
    intro: {
      img: 'images/Nanny.jpg', alt: 'Nanny caring for a child',
      title: 'Everyday help that keeps<br>life running smoothly.',
      text: 'Childcare, errands, deliveries, staffing for shops and events, house sitting and moving help — reliable people for the tasks that fill your week.'
    },
    groups: [
      { name: 'Childcare & Family Support', emoji: '👶', color: '#E91E8C',
        desc: 'Babysitting, nannies, school runs and holiday childcare.',
        services: [
          ['Babysitting Services', '🍼', 'Flexible', 'Short-term childcare while parents attend appointments or go out.'],
          ['Nanny Services', '👧', 'Daily', 'Regular childcare including supervision, activities and meal prep.'],
          ['After-School Support', '🎒', '2–5 hrs', 'Collecting children from school and supervising until parents return.'],
          ['School Run Services', '🚌', 'Daily', 'Transporting children between home, school and approved activities.'],
          ['Holiday Childcare', '🌞', 'Flexible', 'Childcare support during school holidays.']
        ] },
      { name: 'Shopping & Errands', emoji: '🛒', color: '#7B2FBE',
        desc: 'Grocery runs, personal shopping, prescriptions and parcels.',
        services: [
          ['Grocery Shopping', '🥦', '1–2 hrs', 'Purchasing groceries and household essentials to your list.'],
          ['Personal Shopping', '🛍️', 'Flexible', 'Helping clients purchase clothing, gifts and everyday products.'],
          ['Errand Services', '📬', 'Flexible', 'Collecting or delivering items and completing agreed tasks.'],
          ['Prescription Collection', '💊', 'Same day', 'Collecting prescriptions on your behalf where legally permitted.'],
          ['Parcel Collection & Drop-Off', '📦', 'Same day', 'Collecting or dropping off parcels and permitted items.']
        ] },
      { name: 'Delivery & Transport', emoji: '🚗', color: '#0077B6',
        desc: 'Local and business deliveries, driver assistance.',
        services: [
          ['Local Delivery', '🏘️', 'Same day', 'Delivering food, groceries, documents and packages locally.'],
          ['Business Delivery', '🏪', 'Scheduled', 'Scheduled deliveries for shops and small businesses.'],
          ['Collection & Delivery', '🔄', 'Flexible', 'Collecting items from one location and delivering to another.'],
          ['Driver/Delivery Assistant', '🧑‍✈️', 'Flexible', 'Personnel to assist businesses with deliveries.'],
          ['Personal Errand Driver', '🗺️', 'Flexible', 'Transportation for approved everyday errands.']
        ] },
      { name: 'Retail & Business Staffing', emoji: '🏪', color: '#D4541A',
        desc: 'Shop assistants, receptionists, admin and personal assistants.',
        services: [
          ['Shop Assistants', '🛒', 'Flexible', 'Helping customers, arranging merchandise and restocking shelves.'],
          ['Retail Assistants', '🏷️', 'Flexible', 'Customer service, stock support and general retail duties.'],
          ['Cashier/Till Assistants', '💳', 'Flexible', 'Operating tills and assisting customers with purchases.'],
          ['Stock Assistants', '📦', 'Flexible', 'Receiving, organising and checking stock.'],
          ['Receptionists', '📞', 'Flexible', 'Greeting visitors, answering calls and handling admin duties.'],
          ['Administrative Assistants', '📁', 'Flexible', 'Filing, scheduling, data entry and general administration.'],
          ['Personal Assistants', '🗂️', 'Flexible', 'Supporting individuals or businesses with organisational tasks.']
        ] },
      { name: 'Hospitality & Events', emoji: '🍽️', color: '#2E7D32',
        desc: 'Waitstaff, event crew, catering assistants and ushers.',
        services: [
          ['Waiters & Waitresses', '🍷', 'Flexible', 'Serving customers, taking orders and providing table service.'],
          ['Event Staff', '🎪', 'Flexible', 'Guest reception, registration and general event operations.'],
          ['Catering Assistants', '🥗', 'Flexible', 'Supporting catering teams with food-service operations.'],
          ['Front-of-House Staff', '🤵', 'Flexible', 'Welcoming guests and assisting customers at events and venues.'],
          ['Bar/Service Staff', '🍸', 'Flexible', 'Customer-service and hospitality support.'],
          ['Ushering Services', '🎟️', 'Flexible', 'Directing and assisting guests at events and venues.']
        ] },
      { name: 'Home & Lifestyle', emoji: '🏠', color: '#00838F',
        desc: 'Companionship, pet sitting, house sitting and lifestyle help.',
        services: [
          ['Stay-at-Home Support', '🛋️', 'Flexible', 'Present at home for agreed periods to provide non-medical assistance.'],
          ['Companionship Services', '💬', 'Flexible', 'Conversation, social interaction and recreational activities.'],
          ['Home Sitting', '🔒', 'Flexible', 'Remaining at a property while the owner is away.'],
          ['Pet Sitting', '🐾', 'Flexible', 'Caring for pets while their owners are away.'],
          ['House Sitting', '🏡', 'Flexible', 'Providing a presence at a property while the owner is travelling.'],
          ['Lifestyle Assistance', '🗓️', 'Flexible', 'Helping clients organise everyday non-medical activities.']
        ] },
      { name: 'Moving & Assistance', emoji: '📦', color: '#6D4C41',
        desc: 'Packing, unpacking, moving-day help and concierge services.',
        services: [
          ['Packing Assistance', '📦', '2–6 hrs', 'Helping clients pack belongings when moving or preparing for storage.'],
          ['Unpacking Assistance', '🗃️', '2–4 hrs', 'Helping organise belongings after moving.'],
          ['Moving-Day Assistance', '🚛', 'Full day', 'Practical assistance during a house or office move.'],
          ['Event Set-Up Assistance', '🎈', 'Flexible', 'Preparing venues, tables, chairs and guest areas.'],
          ['Personal Concierge', '🎩', 'Flexible', 'Arranging everyday tasks, bookings, shopping and agreed services.']
        ] }
    ]
  },
  {
    key: 'construction', label: 'Construction', cls: 'cat-c',
    sub: 'Plumbing · Electrical · Building · Renovation',
    intro: {
      img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80&fit=crop', alt: 'Construction workers on site',
      title: 'Building your space<br>with skill and precision.',
      text: 'Qualified trades for everything from plumbing and electrics to full building projects and interior finishes — with transparent pricing and reliable timelines.'
    },
    groups: [
      { name: 'Plumbing & Electrical', emoji: '🔧', color: '#1E8449',
        desc: 'Qualified trades for repairs, installs and upgrades.',
        services: [
          ['Plumbing', '🔧', 'Flexible', 'Licensed plumbers for repairs, installations, emergency leaks and upgrades.'],
          ['Electrical Work', '⚡', 'Flexible', 'Certified electricians for safe wiring, installations and compliance work.'],
          ['Handyman Services', '🔨', '1–4 hrs', 'Odd jobs, small repairs and home maintenance tasks handled quickly.']
        ] },
      { name: 'Building & Outdoor', emoji: '🏛️', color: '#B9770E',
        desc: 'Structural work, joinery, roofing and landscaping.',
        services: [
          ['General Building Work', '🏛️', 'Project-based', 'Full building and renovation construction managed end-to-end by our team.'],
          ['Carpentry', '🪚', 'Flexible', 'Custom carpentry for furniture, fittings and bespoke woodwork to your spec.'],
          ['Plastering', '🏠', '1–3 days', 'Skim, patch and full-room plastering for smooth and durable wall finishes.'],
          ['Roofing', '🏚️', 'Flexible', 'Roof repairs, replacement and inspection by experienced roofing specialists.'],
          ['Landscaping', '🌿', 'Flexible', 'Garden design, lawn care, pruning and full outdoor maintenance.']
        ] },
      { name: 'Interior & Finishes', emoji: '🖌️', color: '#8E44AD',
        desc: 'Painting, flooring, kitchens and bathrooms.',
        services: [
          ['Painting & Decorating', '🖌️', '1–5 days', 'Interior and exterior painting using premium finishes and thorough prep.'],
          ['Interior Decoration', '🛋️', 'Flexible', 'Expert styling, colour consultation and finishing touches for your space.'],
          ['Flooring', '⬛', '1–3 days', 'Supply and fitting of laminate, hardwood, vinyl and tile flooring.'],
          ['Kitchen Fitting', '🍽️', '3–7 days', 'Full kitchen installation including units, worktops, plumbing and electrics.'],
          ['Bathroom Installation', '🚿', '3–5 days', 'Complete bathroom fitting — tiling, plumbing, fixtures and finishes.']
        ] }
    ]
  }
];

/* contact-form link that pre-selects a service in the dropdown */
window.TEHCS_BOOK_HREF = function (name) {
  return 'contact.html?service=' + encodeURIComponent(name);
};
