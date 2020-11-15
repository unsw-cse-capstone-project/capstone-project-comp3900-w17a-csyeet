import * as React from "react";
import { Recommendations as RecommendationsBase } from "./Recommendations";
import {
  RecommendationsStore,
  RecommendationsPresenter,
} from "./RecommendationsPresenter";

export const Recommendations = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [store] = React.useState(new RecommendationsStore());
  const [presenter] = React.useState(new RecommendationsPresenter());
  React.useEffect(() => {
    isLoggedIn && presenter.loadRecommendations(store);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  if (!isLoggedIn) {
    return null;
  }
  // eslint-disable-next-line react/display-name
  return <RecommendationsBase store={store} />;
};
