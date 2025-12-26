const MockData = [
  {
    id: 1,
    title: 'Frontend Development',
    snippet: 'Frontend Development using Vuejs has been trending.',
  },
  {
    id: 2,
    title: 'Backend Development',
    snippet: 'Learning backend Development using Nodejs is very important.',
  },
  {
    id: 3,
    title: 'Global Stock Market',
    snippet: 'Global Stock Market is very volatile as of now, and we have to keep an eye on it.',
  },
  {
    id: 4,
    title: 'Saras Finance Report',
    snippet: 'Saras Finance Report for this quarter shows 20% increase in profits.',
  },
  {
    id: 5,
    title: 'VueJs vs ReactJs',
    snippet: 'Developers have been discussing what is superior, Vuejs or Reactjs',
  },
  {
    id: 6,
    title: 'Freelancing for beginners',
    snippet: 'Learn the basics of freelancing and lead generation',
  },
  {
    id: 7,
    title: "Reliability in today's world",
    snippet: "Reliability in today's world has diminished to just a word.",
  },
]

export const fetchSearchResults = (query) => {
  return new Promise((resolve) => {
    // added promise because of hardcoded data
    const latency = 500 // to simulate latency
    setTimeout(() => {
      if (!query) {
        resolve(MockData)
      }

      const queryCase = query.toLowerCase()

      const filteredQuery = MockData.filter((item) => {
        return (
          item.title.toLowerCase().includes(queryCase) ||
          item.snippet.toLowerCase().includes(queryCase)
        )
      })

      resolve(filteredQuery)
    }, latency)
  })
}
