interface Responses<T = any> {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: T[];
}

export default Responses;
