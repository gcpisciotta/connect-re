import React from 'react'
import Page from '../../components/Page'
import { ContactCard } from '../../components/ContactCard'

import { PaperClipIcon } from '@heroicons/react/20/solid'

const contact = {
    "id": 1,
    "photo": "https://example.com/photo.jpg",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "123-456-7890",
    "company": "Example Company",
    "position": "Software Engineer",
    "social": {
      "linkedin": "https://www.linkedin.com/in/johndoe",
      "twitter": "https://twitter.com/johndoe"
    },
    "dob": "1990-01-01",
    "tags": [
      "friend",
      "colleague"
    ],
    "dateMet": "2022-05-10",
    "howMet": "Attended a conference together",
    "conversations": [
      {
        "id": 1,
        "date": "2022-06-01",
        "notes": "Discussed project collaboration"
      },
      {
        "id": 2,
        "date": "2022-06-15",
        "notes": "Follow-up on previous conversation"
      }
    ],
    "reminders": [
      {
        "id": 1,
        "date": "2022-07-01",
        "description": "Follow up with John regarding project"
      },
      {
        "id": 2,
        "date": "2022-08-15",
        "description": "Send birthday greetings"
      }
    ]
  }
  



const ContactPage: React.FC = () => {

    return (
        <Page>
        <div>
            <ContactCard contact={contact}/>
        </div>
        </Page>
    );
}

export default ContactPage;