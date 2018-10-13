// var algoliasearch = require('algoliasearch');
// var algoliasearch = require('algoliasearch/reactnative');
// var algoliasearch = require('algoliasearch/lite');
// import algoliasearch from 'algoliasearch';
//
// or just use algoliasearch if you are using a <script> tag
// if you are using AMD module loader, algoliasearch will not be defined in window,
// but in the AMD modules of the page

//var client = algoliasearch('VGXKB5XFTW', '••••••••••••••••••••••••••••••••');
//var index = client.initIndex('your_index_name');

 index.setSettings({
    searchableAttributes: [
       'brand',
       'name',
       'categories',
       'unordered(description)',
     ],
     customRanking: ['desc(popularity)'],
   });

  var search = instantsearch({
    // Replace with your own values
    appId: 'latency',
    apiKey: '6be0576ff61c053d5f9a3225e2a90f76', // search only API key, no ADMIN key
    indexName: 'instant_search',
    urlSync: true,
    searchParameters: {
      hitsPerPage: 10
    }
  });

  // Add this after the previous JavaScript code
search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input'
    })
  );

  // Add this after the previous JavaScript code
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: document.getElementById('hit-template').innerHTML,
      empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
    }
  })
);

// Add this after the other search.addWidget() calls
search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination'
    })
  );

  // Add this after all the search.addWidget() calls
search.start();
