const devHost = 'http://localhost:8081';
const prodHost = '.';

// export const apiHost if webpack mode is development or production
export const apiHost = process.env.NODE_ENV === 'development' ? devHost : prodHost;