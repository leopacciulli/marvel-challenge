export interface Resource<T = string> {
  name: T
  resourceURI: T
}

// Using the generic type for Comic and Series
export type Comic = Resource
export type Series = Resource