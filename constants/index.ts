import _process from 'node:process'

const apiVersion = _process.env.API_VERSION
export const BASE_URL = _process.server
  ? _process.env.NODE_ENV !== 'production'
    ? `http://localhost:3002/api/${apiVersion}/`
    : `https://example.com/api/${apiVersion}/`
  : null

export const NFTS_LIST = [
  {
    id: 1,
    name: 'The Wife',
    description: 'The outspoken wife of Mr.Hamilton. Does the victim\'s life partner conceal his darkest secrets?',
    src: '/images/wife.png',
  },
  {
    id: 2,
    name: 'The Butler',
    description: 'A refined gentleman in whom Mr. Hamilton placed the highest trust. Was it misplaced?',
    src: '/images/butler.png',
  },
  {
    id: 3,
    name: 'The Maid',
    description: 'A shy and caring servant who might know more about her masters\' life than they know.',
    src: '/images/maid.png',
  },
  {
    id: 4,
    name: 'The Gardener',
    description: 'A simple working man that seems to only care about plants and flowers. Or does he?',
    src: '/images/gardener.png',
  },
  {
    id: 5,
    name: 'The Cook',
    description: 'An extravagant cooking master who\'s been in the family since she was a child? Is there a catch?',
    src: '/images/cook.png',
  },
  {
    id: 6,
    name: 'The Journalist',
    description: 'A rising reporting star investigating Mr.Hamilton\'s latest scandal. Is he involved?',
    src: '/images/journalist.png',
  },
  {
    id: 7,
    name: 'The Businessman',
    description: 'A rude influential businessman with life-long dealings with Mr.Hamilton. Have things gone wrong?',
    src: '/images/businessman.png',
  },

]
