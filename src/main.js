import Vue from 'vue'
import { createRouter, Link } from './router';
import history from './history';
import User from './User.vue';

const routes = {
  '/' : { name: 'dashboard', render: h => <div>Dashboard <Link style={{color: 'red'}} to="/users/1">User 1</Link> </div> },
  '/users/:id': User
};

const location = history.getCurrentLocation();

const app = new Vue({
  el: '#app',
  data: {
    location: null
  },
  created () {
    this.router = createRouter(routes);
  },
  render (h) {
    debugger;
    if (!this.location) return null;

    const { Component, props } = this.router(this.location);

    const data = {props};

    return <Component {...data}></Component>
  }
});

const setLocation = location => {
  app.location = location
};

history.listen(setLocation);

setLocation(location);
