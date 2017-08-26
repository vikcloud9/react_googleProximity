
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

/**
 * Import all page components here
 */
import Welcome from './component/Welcome.jsx'; 
import App from './component/App.jsx';
import AttachmentOps from './component/AttachmentOps.jsx';

export default (
    <Router>
      <Route path = "/" component = {Welcome}>
        <IndexRoute component = {App} />
        <Route path = "app" component = {App} />
        <Route path = "attachments" component = {AttachmentOps} />
      </Route>
   </Router>
);