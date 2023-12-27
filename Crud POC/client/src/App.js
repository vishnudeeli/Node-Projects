import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateBlogPost from './components/CreateBlogPost';
import UpdateBlogPost from './components/UpdateBlogPost';
import DisplayAllBlogPosts from './components/DisplayAllBlogPosts';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Blog</Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/create" className="nav-link">Create</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Switch>
          <Route exact path="/" component={DisplayAllBlogPosts} />
          <Route path="/create" component={CreateBlogPost} />
          <Route path="/update/:id" component={UpdateBlogPost} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
