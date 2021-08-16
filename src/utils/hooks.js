import { useStore } from "../reducers/store-provider"

// SCREENS
export const useDispatch = () => {
  const [, dispatch] = useStore();

  return dispatch;
};
export const useScreenManager = () => {
  const [store] = useStore();

  return store.screen;
};

// GAME
export const useGame = () => {
  const [store] = useStore();

  return store.game;
}