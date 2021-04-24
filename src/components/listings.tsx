import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';

import { useGlobalContext } from '../providers/stateProvider' 
import { convertNumberToPrice } from '../helpers/converters'
import { urlGenerator } from '../helpers/urlGenerator'

export default function Listings(){
  const globalState = useGlobalContext()
  const { dispatch, state } = globalState;
  const listings = state.data?.listings as Array<any>
  const monetization = state.data?.monetization
  const priceRange = state.data?.priceRange
  const niches = state.data?.niches
  const currentPage = state.data?.currentPage
  const rowsPerPage = state.data?.limit
  const totalPages = state.data?.count
  const visibleColumns = state.visibleColumns

  function fetchFilteredData(url: string, pageData?: any){
    fetch(url)
      .then(response => response.json())
      .then(({data}) => {
        dispatch({
          type: 'Set__Listings',
          data: {
            ...pageData,
            listings: data?.listings,
          }
        })

      })
  }
  
  const handleChangePage = (event: any, page: number) => {
    dispatch({
      type: 'Set__Loading',
    })

    const url = urlGenerator({
      monetization,
      priceRange,
      niches,
      page: page + 1,
      limit: state.limit
    })

    fetchFilteredData(url, {
      limit: state.limit,
      currentPage: page + 1
    })
  };


  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'Set__Loading',
    })
    
    const newLimit = parseInt(event.target.value, 10)
    const url = urlGenerator({
      monetization,
      priceRange,
      niches,
      page: 1,
      limit: newLimit
    })

    fetchFilteredData(url, {
      limit: newLimit,
      currentPage: 1,
    })
  };

  const isVisible = (key: string) => {
    return visibleColumns && visibleColumns[key]
  }
  
  return (
    <Paper>
      <TableContainer>
        <Table aria-label="listings table" size="small">
          <TableHead>
            <TableRow>
              {isVisible('listing') && <TableCell>Listing</TableCell>}
              {isVisible('nicheStatus') && <TableCell align="center">Niche & Status</TableCell>}
              {isVisible('status') && <TableCell align="center">Status</TableCell>}
              {isVisible('price') && <TableCell align="center">Price</TableCell>}
              {isVisible('monthlyNetProfit') && <TableCell align="center">Monthly Net Profit</TableCell>}
              {isVisible('rfs') && <TableCell align="center" style={{maxWidth: 300}}>Reason For Sale</TableCell>}
              {isVisible('risk') && <TableCell align="center" style={{maxWidth: 300}}>Risk</TableCell>}
              {isVisible('countries') && <TableCell align="center">Countries</TableCell>}
              {isVisible('businessCreated') && <TableCell align="center">Business Created</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
          {listings ? (listings || []).map(listing => {
            const niches = listing.niches.map((v: any) => v.niche).join(', ')
            return (
              <TableRow key={listing.id}>
                {isVisible('listing') && <TableCell align="center">{`#${listing.listing_number}`}</TableCell>}
                {isVisible('nicheStatus') && <TableCell align="center">{listing.listing_status}</TableCell>}
                {isVisible('status') && <TableCell align="center">{niches}</TableCell>}
                {isVisible('price') && <TableCell align="center">{convertNumberToPrice(listing.listing_price)}</TableCell>}
                {isVisible('monthlyNetProfit') && <TableCell align="center">{convertNumberToPrice(listing.average_monthly_net_profit)}</TableCell>}
                {isVisible('rfs') && <TableCell align="center" style={{maxWidth: 300}}>{listing.reason_for_sale}</TableCell>}
                {isVisible('risk') && <TableCell align="center" style={{maxWidth: 300}}>{listing.risks.join(', ')}</TableCell>}
                {isVisible('countries') && <TableCell align="center">{listing.countries.join(', ')}</TableCell>}
                {isVisible('businessCreated') && <TableCell align="center">{moment(listing.business_created_at).format('MMM YYYY')}</TableCell>}
              </TableRow>
            )
          })
          :
          <CircularProgress
            variant="determinate"
            size={40}
            thickness={4}
            value={100}
          />
          }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          component="div"
        count={totalPages || 0}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[20,50,100]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
