import { google } from 'googleapis';

async function scheduleInterview(attendeesEmails:any, startTime:any, duration:any, timeZone:any) {
  const auth = new google.auth.GoogleAuth({
    // Provide authentication details here (e.g., keyFile, scopes)
  });

  const calendar = google.calendar({ version: 'v3', auth });
  const endTime = new Date(new Date(startTime).getTime() + duration * 60000); 

  const event = {
    summary: 'Interview',
    location: 'Virtual / Google Meet',
    description: 'Interview with candidates',
    start: {
      dateTime: startTime,
      timeZone: timeZone,
    },
    end: {
      dateTime: endTime.toISOString(), // Calculate end time based on duration,
      timeZone: timeZone,
    },
    attendees: attendeesEmails,
    // Add other event parameters as needed
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event, // Use requestBody instead of resource
  });

  return response.data;
}

export { scheduleInterview };
