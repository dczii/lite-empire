import React, { useEffect }  from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './components/header'
import Filters from './components/filters'
import Listings from './components/listings'
import { useGlobalContext } from './providers/stateProvider' 
import { urlGenerator } from './helpers/urlGenerator'

function App() {
  const globalState = useGlobalContext()
  const {dispatch, state} = globalState;

  const isLoading = state?.isLoading
  
  useEffect(() => {
    async function fetchData() {
      const url = urlGenerator({
        page: 1,
        limit: 20
      })
      
      return await fetch(url)
      .then(response => response.json())
      .then(({data}) => {
        dispatch({
          type: 'Set__Listings',
          data: {
            listings: data?.listings,
            pages: data?.pages,
            currentPage: 1,
            count: data.count,
            limit: 20
          }
        })
      })
    }
    
    fetchData()
  }, [dispatch])

  return (
      <div className="App">
        <Header />
        <Filters />
        {isLoading ?
          <CircularProgress
            variant="determinate"
            size={40}
            thickness={4}
            value={100}
          />
        : <Listings />}
      </div>
  );
}

export default App;
