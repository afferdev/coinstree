# coinstree

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Design and Approach

This is a simple Vue Application, with three components. The App component calls the table component 
and the table component calls the pagination component.

The API calls are made on the mounting of the application, because, the data loading needed to be done only once.
The pagination is done on the frontend side only, as backend pagination is not given. For the better user experience,
the paginated data is computed synchronously on the data loaded on the start of the application.


## Improvements

If I had more time, I would have added:

- Different Pages for the Two Lists through Routing
- `Vuex` support in order to communicate the data among the components.
- A mock for the authentication (Login Page)
- Responsiveness