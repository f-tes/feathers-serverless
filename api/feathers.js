const { google } = require('googleapis');

async function getFeathers(studentId) {
  const upperCaseStudentId = studentId.toUpperCase();
  
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
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

    const rows = response.data.values || [];
    for (const row of rows) {
      if (row[0] === upperCaseStudentId) {
        return row[1];
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export default async function handler(req, res) {
  const studentId = req.query.studentId;
  try {
    const feathers = await getFeathers(studentId);
    res.status(200).json({ feathers: feathers || 'Not found' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
