exports.handler = async function(event) {
  const {
    endpoint, org, repo, page, per_page,
    username, sort, direction
  } = event.queryStringParameters;

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://nedbailova.github.io',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: '',
    };
  }

  let url = '';
  let headers = {
    Authorization: `Bearer ${process.env.GITHUB_PAT}`,
    Accept: 'application/vnd.github+json',
  };

  switch (endpoint) {
    case 'repos':
      url = `https://api.github.com/orgs/${org}/repos?per_page=${per_page}&page=${page}`;
      break;
    case 'repo':
      url = `https://api.github.com/repos/${org}/${repo}`;
      break;
    case 'readme':
      url = `https://api.github.com/repos/${org}/${repo}/readme`;
      headers.Accept = 'application/vnd.github.html';
      break;
    case 'languages':
      url = `https://api.github.com/repos/${org}/${repo}/languages`;
      break;
    case 'contributors':
      url = `https://api.github.com/repos/${org}/${repo}/contributors`;
      break;
    case 'user':
      url = `https://api.github.com/users/${username}`;
      break;
    case 'user_repos':
      url = `https://api.github.com/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=${per_page}`;
      break;
    default:
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': 'https://nedbailova.github.io',
        },
        body: JSON.stringify({ error: 'Invalid endpoint' }),
      };
  }

  try {
    const response = await fetch(url, { headers });

    const contentType = headers.Accept;
    const body = contentType === 'application/vnd.github.html'
      ? await response.text()
      : await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': 'https://nedbailova.github.io',
        'Content-Type': contentType === 'application/vnd.github.html'
          ? 'text/html'
          : 'application/json',
      },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': 'https://nedbailova.github.io',
      },
      body: JSON.stringify({ error: 'Failed to fetch from GitHub API' }),
    };
  }
};