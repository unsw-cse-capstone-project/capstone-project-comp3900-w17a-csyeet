import * as React from 'react';
import { Recommendations } from './Recommendations';
import { RecommendationsStore, RecommendationsPresenter } from './RecommendationsPresenter';
import { observer } from 'mobx-react';

export const createRecommendations = () => {
    const store = new RecommendationsStore();
    const presenter = new RecommendationsPresenter();
    presenter.loadRecommendations(store);
    // eslint-disable-next-line react/display-name
    return observer(() => <Recommendations store={store} />);
}