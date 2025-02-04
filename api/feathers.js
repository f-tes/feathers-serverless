import { google } from 'googleapis';

async function getFeathers(studentId) {
  const upperCaseStudentId = studentId.toUpperCase();
  console.log('Fetching data for student ID:', upperCaseStudentId); // Debug log

  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '1oO7MC5eY0nOcoVflMip_mJURnOWMgELOOD8pc8R0x6Y';
  const range = 'database!A2:B2324'; // Adjust range if necessary

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    console.log('API Response:', response.data); // Debug log

    const rows = response.data.values || [];
    for (const row of rows) {
      if (row[0] === upperCaseStudentId) { // Compare with uppercase ID
        return row[1];
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching data:', error.message); // Log specific error
    throw error; // Re-throw the error to be caught in the handler
  }
}

export default async function handler(req, res) {
  const studentId = req.query.studentId;
  console.log('Received student ID:', studentId); // Debug log
  try {
    const feathers = await getFeathers(studentId);
    res.json({ feathers: feathers || 'Not found' });
  } catch (error) {
    console.error('Server Error:', error.message); // Log the server error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
