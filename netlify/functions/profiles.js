const profiles = {
  x: {
    username: 'x',
    title: 'x\'s profile',
    description: 'click to view',
    telegramUrl: 'https://t.me/player519',
    views: 1436,
    location: 'japan'
  },
  zone: {
    username: 'zone',
    title: 'zone\'s profile',
    description: 'click to view',
    telegramUrl: 'https://t.me/swatzone',
    views: 1436,
    location: 'japan'
  }
};

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': 'https://worse.lol',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  // Get profile by username
  if (event.httpMethod === 'GET') {
    const username = event.path.split('/').pop();
    
    if (username && profiles[username]) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(profiles[username])
      };
    }

    // Return all profiles if no username specified
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(Object.values(profiles))
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
}; 