const searchCriteria = [
  {
    label: "keywords",
    id: "keyword",
    name: "q",
    placeholder: "eg. election, bitcoin",
  },
  {
    label: "sources",
    id: "sources",
    name: "sources",
    placeholder: "eg. nytimes, rolling stone",
  },
  {
    label: "domains",
    id: "domains",
    name: "domains",
    placeholder: "eg. bbc.uk, politico.com",
  },
  {
    label: "from",
    id: "from",
    name: "from",
    type: "date",
    placeholder: "eg. 2022-10-01",
  },
  {
    label: "to",
    id: "to",
    name: "to",
    type: "date",
    placeholder: "eg. 2022-10-02",
  },
  {
    label: "language",
    id: "language",
    name: "language",
    placeholder: "eg. de, en, es",
  },
];
export default searchCriteria;
