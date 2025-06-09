# T-Mobile Carelink WebApp

This is a React-based web application designed for the T-Mobile Carelink platform. It features separate portals for patients and doctors to manage and track medication adherence securely.

---

Follow these steps to run the project locally.

### 1. Clone the repository
```bash

git clone git@github.com:urnotvicky-li/T-mobile-carelink-doctorportal.git
cd T-mobile-carelink-doctorportal

```


### 2. Install Dependencies

```bash
npm install
```


### 3. Set Up Firebase Environment Variables
```bash
Create a new file named .env in the root directory: touch .env
```

Then add the following lines to the .env file, replacing the values with your Firebase project credentials: 


REACT_APP_API_KEY=your-api-key

REACT_APP_AUTH_DOMAIN=your-app.firebaseapp.com

REACT_APP_PROJECT_ID=your-project-id

REACT_APP_STORAGE_BUCKET=your-app.appspot.com

REACT_APP_MESSAGING_SENDER_ID=your-sender-id

REACT_APP_APP_ID=your-app-id



You can find these values in your Firebase Console:

- Go to your project
 
- Click the gear icon > Project Settings
 
- Under General > Your apps, select the app you registered
 
- Copy the config values under Firebase SDK snippet


### 4. Run the Application
```bash
npm start
```
