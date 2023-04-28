import logo from './logo.svg';
import './App.css';
import './static/css/bootstrap.css';
import './static/css/style.css';
import './static/css/swiper.min.css';
import GetList from './rest/GetListRestController';
import BillingForm from './rest/BillingForm';
import BillingUpdateForm from './rest/BillingUpdateForm';
import Billing from './models/Billing';
import BillingList from './rest/BillingList';
import Device from './models/Device';





function App() {
  return (
    <div className="App">
      <div className='container'>
        <BillingForm title = 'INSERT'/>
        <BillingList/>
     </div>
    </div>
  );
}

export default App;
