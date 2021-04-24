import React, { useReducer, createContext, useContext }  from 'react';
import { columnList } from '../data/filters'

const initialState = {
  state: {
    isLoading: true,
    visibleColumns: columnList,
    data: {
      currentPage: 1,
      limit: 20,
    }
  },
  dispatch: () => {}
};
  
  const storeContext = createContext<GlobalContext>(initialState);
  const { Provider } = storeContext;

  const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer((state: any, action: any) => {
      switch(action.type) {
        case 'Set__Listings':
          return {
            ...state.state,
            data: {
              ...state.data,
              ...action.data
            },
            isLoading: false
          }
        case 'Set__Loading':
          return {
            ...state,
            isLoading: !state?.isLoading
          }
        case 'Set__Visible_Columns':
          return {
            ...state,
            visibleColumns: action.data,
            isLoading: false
          }
        default:
          throw new Error();
      };
    }, initialState);
  
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
  };

  export { storeContext, StateProvider }
  export const useGlobalContext = () => useContext<GlobalContext>(storeContext)

