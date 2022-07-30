const userInitialState = {};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "SUCCESS": {
      return action.payload;
    }
    case "Fail": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const adminInitialState = {};

export const adminReducer = (state = adminInitialState, action) => {
  switch (action.type) {
    case "ADMIN_SUCCESS": {
      return action.payload;
    }
    case "ADMIN_FAIL": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const postInitialState = {};

export const postReducer = (state = postInitialState, action) => {
  switch (action.type) {
    case "POST_SUCCESS": {
      return action.payload;
    }
    case "POST_FAIL": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const commentsInitialState = {};

export const commentReducer = (state = commentsInitialState, action) => {
  switch (action.type) {
    case "COMMENT_SUCCESS": {
      return action.payload;
    }
    case "COMMENT_FAIL": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const likesInitialState = [];

export const likeReducer = (state = likesInitialState, action) => {
  switch (action.type) {
    case "LIKE_SUCCESS": {
      return action.payload;
    }
    case "LIKE_FAIL": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const menuInitialState = false;

export const menuReducer = (state = menuInitialState, action) => {
  switch (action.type) {
    case "MENU": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const drawerInitialState = false;

export const drawerReducer = (state = drawerInitialState, action) => {
  switch (action.type) {
    case "DRAWER": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
