// var algoliasearch = require('algoliasearch');
// var algoliasearch = require('algoliasearch/reactnative');
// var algoliasearch = require('algoliasearch/lite');
// import { algoliasearch } from 'algoliasearch';

// or just use algoliasearch if you are using a <script> tag
// if you are using AMD module loader, algoliasearch will not be defined in window,
// but in the AMD modules of the page

var client = algoliasearch('VGXKB5XFTW', 'aaa793df40bb67158d9188458b585930');
var index = client.initIndex('your_index_name');

 index.setSettings({
    searchableAttributes: [
       'brand',
       'name',
       'categories',
       'unordered(description)',
     ],
     customRanking: ['desc(popularity)'],
   });

   // Search the "category" facet for values matching "phone" in records
// having "Apple" in their "brand" facet.
index.searchForFacetValues({
  facetName: 'category',
  facetQuery: 'phone',
  filters: 'brand:apple'
}, function(err, content) {
  if (err) throw err;

  console.log(content.facetHits);
});


  // var search = instantsearch({
  //   // Replace with your own values
  //   appId: 'VGXKB5XFTW',
  //   apiKey: 'aaa793df40bb67158d9188458b585930', // search only API key, no ADMIN key
  //   indexName: 'instant_search',
  //   urlSync: true,
  //   searchParameters: {
  //     hitsPerPage: 10
  //   }
  // });

  // var search = instantsearch({
  //   [...],
  //   searchParameters: {
  //     hierarchicalFacetsRefinements: { // menu is implemented as a hierarchicalFacetsRefinements
  //       categories: ['Cell Phones']
  //     },
  //     facetsRefinements: {
  //       in_stock: [true]
  //     },
  //     // Add to "facets" all attributes for which you
  //     // do NOT have a widget defined
  //     facets: ['in_stock']
  //   },
  // });
  // Below is just a common widget configuration, to show
  // how it interacts with the above searchParameters
  search.addWidget(
    instantsearch.widgets.menu({
      [...],
      attributeName: 'categories'
    })
  );

  
    // /* Filtering and Faceting */

    // index.search({
    //   query: 'query',
    //   filters: '(category:Book OR category:Ebook) AND _tags:published'
    // }).then(res => {
    //   // console.log(res);
    // });

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

// search.addWidget(
//   instantsearch.widgets.refinementList({
//     container: '#brand-refinement',
//     attributeName: 'brand',
//     templates: {
//       header: 'Brand'
//     },
//     searchForFacetValues: {
//       placeholder: 'Search for brands',
//       templates: {
//         noResults: '<div class="sffv_no-results">No matching brands.</div>'
//       }
//     }
//   })
// );

search.addWidget(
   instantsearch.widgets.sortBySelector({ 
  container: string|HTMLElement, 
  indices: Array<SortByIndexDefinition>, 
  autoHideContainer: [boolean], 
  cssClasses: [SortByWidgetCssClasses], 
  transformItems: [(Array<object>) => Array<object>], 
 SortByWidgetOptions})
);




//Add this after the other search.addWidget() calls
search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination'
    })
  );

//Add this after all the search.addWidget() calls
search.start();
