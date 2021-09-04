import { useStore } from "../context/store-provider"

// SCREENS
export const useDispatch = () => {
  const [, dispatch] = useStore();

  return dispatch;
};
export const useScreenManager = () => {
  const [store] = useStore();

  return store.screen;
};

// AUTH
export const useAuth = () => {
  const [store] = useStore();

  return store.auth;
}
