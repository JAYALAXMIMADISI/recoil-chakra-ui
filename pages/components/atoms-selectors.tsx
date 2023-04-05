import { atom, selector, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";


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
      const userList = users.map((item:any, index:any) => {
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
    default: 0,
  });


  export const userMessagesListByUserIdSelector = selectorFamily({
    key: 'userMessagesListByUserId',
    get:
      (userId) =>
      async ({ get }) => {
        const getUsers = get(usersListStateAtom);
        const users = await getUsers.filter((item:any) => item.id === userId);
        return users;
      },
  });


  export const userChatMessage = atom({
    key: 'userChatMessage',
    default: '',
  });