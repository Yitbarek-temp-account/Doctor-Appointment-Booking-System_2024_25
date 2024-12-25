# Doctor-Appointment-Booking-System

## Section 1

## Group Members

| Names                         |     ID      |
| ------------------------------|: ----------:|
| Anansi Sime                   | UGR/9691/15 |
| Kibruyisfa Lemma              | UGR/9408/15 |
| Sumeya Ibrahim                | UGR/6702/15 |
| Tsega Ephrem                  | UGR/7925/15 |
| Yitbarek Alemu                | UGR/7554/15 |

The Doctor Appointment Booking System is a web-based application designed to streamline the process of scheduling and managing appointments between patients and healthcare providers. This system allows patients to easily book, view, and manage their appointments with doctors, while enabling doctors to efficiently oversee their schedules. Key features include user authentication, appointment creation and cancellation, and a user-friendly interface that enhances the overall patient experience. The application aims to reduce administrative burdens for healthcare providers and improve accessibility for patients seeking medical care.

## Key Features

### For patients
- **Appointment Bookings:**
   • Patients can make new doctor appointment bookings.
   • Patients can edit their booking details, such as the date, time, and description of the visit.
   • Users can cancel their bookings.
   • Patients can view their upcoming and past appointments.

### For Doctors
- **Schedule management:**
  • Doctors can view their appointment schedules.
  • Doctors can manage their availability by setting working hours.
  • Doctors can confirm or reschedule appointments as needed.

### For Admins
- **User Management:**
  • Admins can manage patient and doctor accounts, including adding or removing users.
  • Admins can monitor appointment statistics and system usage.

  
## We choose MongoDB for our project over other relational databases because : 

  • Flexible Schema: MongoDB's document-oriented structure allows us to store data in a flexible format. This is particularly useful for handling diverse data types related to appointments,     patients, and doctors without the need for a fixed schema.
  • Scalability: As our application grows, MongoDB provides horizontal scaling capabilities, making it easier to handle increased data loads and user traffic.
  • Rich Querying: MongoDB supports powerful querying capabilities, allowing us to efficiently retrieve and manipulate data based on various criteria (e.g., finding available doctors, retrieving patient appointment history).
  • JSON-like Documents: The use of BSON (Binary JSON) format makes it easier to work with data structures that mirror the objects used in our application code.


▎Usage

▎For Patients
1. Access the application through a web browser.
2. Sign up or log in to book, edit, or cancel an appointment with a doctor.
3. View upcoming appointments and past visit history for reference.

▎For Doctors
1. Log in to access your dashboard.
2. View your schedule and manage your availability.
3. Confirm or reschedule patient appointments as necessary.

▎For Admins
1. Log in to manage user accounts and monitor system usage.
2. Access reports on appointment statistics and user activity.

With this structure, the Doctor Appointment Booking System aims to enhance the healthcare experience for both patients and providers by simplifying the appointment management process while leveraging the benefits of MongoDB for data storage and retrieval.
