export interface DiscotecaListConfig {
    type: string;
  
    filters: {
      events?: string,
      name?: string,
      // favorited?: string,
      limit?: number,
      offset?: number
    };
  }