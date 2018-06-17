//import { Record } from 'immutable';
import { CoreApiStateInterface, CoreApiStateKeys } from './api-state';

export interface NewsStateInterface extends CoreApiStateInterface {
}

// export const NewsInitialState = Record({
//   data: [],
//   loader: false,
//   error: null
// });

export class NewsStateKeys extends CoreApiStateKeys {
  static StateName = 'news';
}

export interface NewsDataInterface {
  source?: string;
  date?: string;
  title?: string;
  url?: string;
  image?: string;
}

export default NewsDataInterface;


// class NewsData implements NewsDataInterface {
//     source?: string;
//     date?: string;
//     title?: string;
//     url?: string;
//     image?: string;
  

//     constructor(
//     ){
//         this.source = ""
//         this.date = ""
//         this.title = ""
//         this.url = ""
//         this.image = ""
//     }
// }

// export default NewsData;



