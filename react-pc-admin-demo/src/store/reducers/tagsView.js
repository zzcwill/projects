import * as types from "../action-types";
const initState = {
  taglist: [],
};
export default function app(state = initState, action) {
  switch (action.type) {
    case types.TAGSVIEW_ADD_TAG:
      const tag = action.tag;
      let isHasMenu = false;
      
      for(let num = 0 ; num < state.taglist.length ; num++) {
        if(state.taglist[num].path === tag.path) {
          isHasMenu = true
        }
      }

      if (isHasMenu) {
        return state;
      } else {
        return {
          ...state,
          taglist: [...state.taglist, tag],
        };
      }
    case types.TAGSVIEW_DELETE_TAG:
      return {
        ...state,
        taglist: [...state.taglist.filter((item) => item !== action.tag)],
      };
    case types.TAGSVIEW_EMPTY_TAGLIST:
      return {
        ...state,
        taglist: [
          ...state.taglist.filter((item) => item.path === "/dashboard"),
        ],
      };
    case types.TAGSVIEW_CLOSE_OTHER_TAGS:
      return {
        ...state,
        taglist: [
          ...state.taglist.filter((item) => item.path === "/dashboard" || item === action.tag),
        ],
      };
    default:
      return state;
  }
}
