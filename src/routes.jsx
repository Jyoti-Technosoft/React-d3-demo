import Chart from './components/Chart/Chart';
import StackedChartPage from './components/Chart/StackedChartPage';

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Chart },
  { path: '/charts/stackedchart', name: 'Charts / Stacked Chart', element: StackedChartPage },
]

export default routes;  