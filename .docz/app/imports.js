export const imports = {
  'doc/SearchableTable/README.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "doc-searchable-table-readme" */ 'doc/SearchableTable/README.mdx'
    ),
}
