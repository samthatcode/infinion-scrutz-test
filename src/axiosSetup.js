import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance);

// Mock sign-up endpoint
mock.onPost('/signup').reply(200, {
  user: { id: 1, name: 'User' }
});

// Mock sign-in endpoint
mock.onPost('/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (email === 'samthatcode@gmail.com' && password === 'sam@sam1') {
    const session = { token: 'mockToken' };
    const user = { id: 1, name: 'User', photo: 'sam.jpg' };
    
    return [200, { session, user }];
  } else {
    return [400, { message: 'Incorrect username or password' }];
  }
});
export default axiosInstance;

