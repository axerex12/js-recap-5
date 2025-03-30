import { fetchData } from '../lib/fetchData.js';
try {
  const user = {
    name: 'John Doe',
    job: 'Developer',
  };
  const url = 'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  const userData = await fetchData(url);
  console.log(userData);
} catch (error) {
  console.error('An error occurred:', error);
}
