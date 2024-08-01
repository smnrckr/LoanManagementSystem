import { BASE_API_URL } from '../apiUrl/apiUrl';
import { useFetch } from 'use-http';

const useApi = (options, triggerDependency) =>
  useFetch(BASE_API_URL, options, triggerDependency);

export default useApi;
