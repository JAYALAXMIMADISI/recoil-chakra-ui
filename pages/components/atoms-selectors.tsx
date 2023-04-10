import { listItem } from "nxt/interfaces";
import { atom, selector, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";


enum usersIndex {first,second,third}

const { persistAtom } = recoilPersist();


export const persistAtomEffect = (param: any) => {
    param.getPromise(ssrCompletedState).then(() => persistAtom(param));
  };
  


export const getChatUsers = selector({
    key: 'users-selector',
    get: async ({ get }) => {
      const users = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      ).then((res) => res.json());
      const userList = users.map((item:listItem, index:number) => {
        return {
          id: index,
          name: item.name,
          messages: [],
        };
      });
      return userList;
    },
  });



export const ssrCompletedState = atom({
    key: 'SsrCompleted',
    default: getChatUsers,
  });

  export const usersListStateAtom = atom({
    key: 'usersListStateAtom',
    default: getChatUsers,
    effects_UNSTABLE: [persistAtom],
  });


  export const userMessagesListId = atom({
    key: 'userMessagesList',
    default: usersIndex.first,
  });


  export const userMessagesListByUserIdSelector = selectorFamily({
    key: 'userMessagesListByUserId',
    get:
      (userId) =>
      async ({ get }) => {
        const getUsers = get(usersListStateAtom);
        const users = await getUsers.filter((item:listItem) => item.id === userId);
        return users;
      },
  });


  export const userChatMessage = atom({
    key: 'userChatMessage',
    default: '',
  });