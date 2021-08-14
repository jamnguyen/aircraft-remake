import { useStore } from "./store-provider"

export const useDispatch = () => {
  const [, dispatch] = useStore();

  return dispatch;
};
export const useScreenManager = () => {
  const [store] = useStore();

  return store.screen;
};
