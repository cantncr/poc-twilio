# poc-twilio

#### Instructions:
```

- Create a .env files for both folder (/api, /demo)

- Set below values for the /api .env file:
  - SERVICE_TWILIO_ACCOUNT_SID=
  - SERVICE_TWILIO_AUTH_TOKEN=
  - SERVICE_TWILIO_API_KEY=
  - SERVICE_TWILIO_API_KEY_SECRET=
- Set below values for the /demo .env file:
  - REACT_APP_ACCESS_TOKEN_SERVICE_URL=
  - PS: You can set it directly as: http://localhost:3000/participants/token


- Route to /api folder
- Run the start script (**npm run start**) in that folder
- Route to /demo folder
- Run the start script (**npm run start**) in that folder


- You should enter identity for username and chatServiceId for password field
- You can create a new conversation and add participants to that conversation via API.
- You can get the Postman API Collection to use API with ease: 
  - https://app.getpostman.com/join-team?invite_code=473936ac6b802d8126f6616f9c8fb3b4&target_code=d9826141068fa4540a9ec3305900f968```


#### Twilio SDK Usage:

-Login screen
  On login screen, token is generated with jwt from Twilio. Uses Twilio account SID, Twilio Api Key, Twilio Api Key Secret and participant identity.

-List conversations
  On conversation list , uses Twilio client's getSubscribedConversations method, client is generated with created token.

-Create Conversation
  On Create Conversation screen, uses Twilio client's createConversation method, it takes friendlyName: string as parameter, after success current participant joins the created conversation and participants list updated.

-Unread message and total message count
  Unread messages is get by Twilio conversation object's getUnreadMessagesCount method. Total message count is get by Twilio conversation object's getMessagesCount method.

-Get conversation participants
  Conversation participants is get by Twilio conversation object's getParticipants method.

-Add participant
  Participant is added by Twilio conversation object's addNonChatParticipant method.

-Remove participant
  Participant is removed by Twilio conversation object's removeParticipant method.

-Get conversation messages
  Conversation messages are get by Twilio conversation object's getMessages method.

-Send Message
  On message send, creates MessageBuilder object of Twilio conversation object's prepareMessage method, then prepares builder body with message with MessageBuilder's setBody method, attaches files then uses MessageBuilder's build and send methods.