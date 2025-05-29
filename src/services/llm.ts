
import { GEMINI_API_KEY } from '../config/firebase';

export const summarizeAnnouncement = async (announcementText: string): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Summarize the following university announcement concisely: ${announcementText}`
          }]
        }]
      })
    });

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'Unable to generate summary';
  } catch (error) {
    console.error('Error summarizing announcement:', error);
    throw new Error('Failed to summarize announcement');
  }
};

export const generateAssignmentIdeas = async (courseName: string, courseDescription: string): Promise<any[]> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate 3-5 creative and relevant assignment ideas (title and a brief description for each) for a university course titled '${courseName}' with the description: '${courseDescription}'. Format the output as a JSON array of objects, each with 'title' and 'description' keys.`
          }]
        }]
      })
    });

    const data = await response.json();
    const responseText = data.candidates[0]?.content?.parts[0]?.text || '[]';
    
    // Extract JSON from the response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return [];
  } catch (error) {
    console.error('Error generating assignment ideas:', error);
    throw new Error('Failed to generate assignment ideas');
  }
};
