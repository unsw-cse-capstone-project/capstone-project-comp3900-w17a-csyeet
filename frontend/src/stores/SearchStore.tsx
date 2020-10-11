import { observable, action, makeObservable } from "mobx";

// To add more detail when implementing refine search
type QueryType = {
  input: string;
};

class SearchStore {
  @observable
  query: QueryType = {
    input: "",
  };

  @observable
  queryResult: Array<String> = [];

  constructor() {
    makeObservable(this);
  }
  @action
  getQueryResult = () => {
    console.log("Searching...");
  };
}

export default SearchStore;
