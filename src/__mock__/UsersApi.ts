import { mock } from "../api";
import { USERS_KEY } from "../api/local-storage-keys";
import { users } from "../data/mock-users";
import { User } from "../types";
import { getDatas, storeData } from "../utils";

mock.onGet("users").reply(() => {
  const datas = getDatas<User>(USERS_KEY);
  if (!datas) {
    storeData<User>(USERS_KEY, users);
    return [200, users];
  }
  return [200, datas];
});

mock.onPut("users").reply(({ data }) => {
  const datas = getDatas<User>(USERS_KEY);
  if (datas && data) {
    const parsedData = JSON.parse(data);
    const userIndex = datas.findIndex((u) => u.id === parsedData.id);
    datas[userIndex] = parsedData;
    storeData(USERS_KEY, datas);
  }
  return [200, data];
});

mock.onPost("users").reply(({ data }) => {
  const datas = getDatas<User>(USERS_KEY);
  if (datas) {
    datas.push(data);
  }
  storeData(USERS_KEY, datas ?? [data]);
  return [200, data];
});
