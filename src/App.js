import AppRoutes from './utils/Routes'
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <AppRoutes /> 
   </HelmetProvider>
);}
