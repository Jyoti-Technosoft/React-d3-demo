import Chart from './components/Chart/Chart';
import StackedChartPage from './components/Chart/StackedChartPage';
import AboutUs from './components/AboutUs';

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Chart },
  { path: '/charts/stackedchart', name: 'Charts / Stacked Chart', element: StackedChartPage },
  { path: '/aboutus', name: 'About Us', element: AboutUs },
]

export default routes;  