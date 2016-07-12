import RouteRecognizer from 'route-recognizer'
import Vue from 'vue';
import history from './history'

function resolve (routes, context) {
	const recognizedRoutes = routes.recognize(context.pathname)

	if (!recognizedRoutes || recognizedRoutes.length == 0) return

	const { handler, params: props } = recognizedRoutes[0]

	return { Component: handler, props }
}

const createComponent = (routeOptions, params, h) => {
	let component;

	if (routeOptions.component) component = routeOptions.component
	else component = routeOptions

	return component
};

export function createRouter (routes) {
	const recognizer = new RouteRecognizer()

	for (let route in routes) {
		recognizer.add([{path: route, handler: createComponent(routes[route])}])
	}

	return location => resolve(recognizer, location)
}

export const Link = {
  name: 'link',
  props: ['to'],
  functional: true,
  render (h, {children, data, props}) {
    const to = history.createHref(props.to);

    const handleClick = (e) => {
      e.preventDefault();
      history.push({
        pathname: e.currentTarget.pathname,
        search: e.currentTarget.search
      })
    }

    data.attrs.href = to;

    return <a on-click={handleClick} {...data}>{children()}</a>
  }
};
