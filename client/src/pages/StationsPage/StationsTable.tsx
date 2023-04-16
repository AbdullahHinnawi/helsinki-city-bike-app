import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { IStationDoc } from '../../types/stationTypes'
import { getStationStats } from '../../actions/stationActions'
import { useDispatch } from 'react-redux'
import { CircularProgress, Toolbar } from '@mui/material'

interface Data {
  id: string | number
  nimi: string
  osoite: string
  kapasiteet: number
}

function createData(
  id: string | number,
  nimi: string,
  osoite: string,
  kapasiteet: number
): Data {
  return { id, nimi, osoite, kapasiteet }
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0]).reverse()
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
  align: any
}

const headCells: readonly HeadCell[] = [
  {
    id: 'nimi',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    align: 'left',
  },
  {
    id: 'osoite',
    numeric: false,
    disablePadding: false,
    label: 'Address',
    align: 'left',
  },
  {
    id: 'kapasiteet',
    numeric: true,
    disablePadding: false,
    label: 'Capacity',
    align: 'left',
  },
]

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  order: Order
  orderBy: string
  rowCount: number
}

/**
 * @desc Renders table header
 * @props EnhancedTableProps
 */
function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={'normal'} // none
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ paddingLeft: '16px', fontWeight: 'bold' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              // sx={{ '& .MuiTableSortLabel-icon': { opacity: 1 } }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={{}}>
                  {order === 'desc'
                    ? ' (sorted descending)'
                    : ' (sorted ascending)'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

interface StationsTableProps {
  stations: IStationDoc[]
  stationsLoading: boolean
}

/**
 * @component
 * @desc Renders journeys table
 * @props journeys - array of journey objects
 */
const StationsTable = ({ stations, stationsLoading }: StationsTableProps) => {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('nimi')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)
  const rows: Data[] = stations?.map((s: IStationDoc) => {
    return createData(s.stationId, s.nimi, s.osoite, s.kapasiteet)
  })
  const dispatch: React.Dispatch<any> = useDispatch()

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleStationClick = (stationId: number) => {
    dispatch(getStationStats(Number(stationId)))
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%', minWidth: '1000px' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          <Box sx={{ flex: '1 1 100%' }}>
            {stationsLoading && (
              <CircularProgress style={{ width: '28px', height: '28px' }} />
            )}
          </Box>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Toolbar>

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'} // small
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => handleStationClick(Number(row.id))}
                    >
                      <TableCell
                        component="th"
                        align="left"
                        id={labelId}
                        scope="row"
                        //style={{ padding: '5px 0' }}
                        width={'40%'}
                      >
                        {row.nimi}
                      </TableCell>
                      <TableCell align="left" width={'40%'}>
                        {row.osoite}
                      </TableCell>
                      <TableCell align="left" width={'20%'}>
                        {row.kapasiteet}
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
export default StationsTable
