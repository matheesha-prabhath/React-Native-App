const fs = require('fs');

// Read the google-services.json file
const googleServicesFile = fs.readFileSync('google-services.json', 'utf8');
const googleServicesConfig = JSON.parse(googleServicesFile);

// Extract the necessary values
const apiKey = googleServicesConfig.client[0].api_key[0].current_key;
const authDomain = `${googleServicesConfig.project_info.project_id}.firebaseapp.com`;
const projectId = googleServicesConfig.project_info.project_id;
const storageBucket = googleServicesConfig.project_info.storage_bucket;
const messagingSenderId = googleServicesConfig.client[0].client_info.mobilesdk_app_id;
const appId = googleServicesConfig.client[0].client_info.mobilesdk_app_id;

// Generate the firebaseConfig object
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Create the firebaseConfig.js file
const firebaseConfigFileContent = `import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = ${JSON.stringify(firebaseConfig, null, 2)};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
`;

fs.writeFileSync('firebaseConfig.js', firebaseConfigFileContent, 'utf8');

console.log('firebaseConfig.js generated successfully.');
