import { callWithNuxt } from 'nuxt/app';
import { useUserStore } from '~/store/user';

// TODO: change this to be a method to check if is authenticated
export const useAuth = (state: boolean = false) => {
  const store = useUserStore();
  return store.user ? true : false;
};
