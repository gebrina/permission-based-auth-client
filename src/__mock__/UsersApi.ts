import { mock } from "../api";
import { USERS } from "../api/local-storage-keys";
import { users } from "../data/mock-users";
import { User } from "../types";
import { getDatas, storeData } from "../utils";

mock.onGet("users").reply(() => {
  const datas = getDatas<User>(USERS);
  console.log(datas);
  if (!datas) {
    storeData<User>(USERS, users);
    return [200, users];
  }
  return [200, datas];
});

mock.onPut("users").reply(({ data }) => {
  const datas = getDatas<User>(USERS);
  if (datas && data) {
    const parsedData = JSON.parse(data);
    const userIndex = datas.findIndex((u) => u.id === parsedData.id);
    datas[userIndex] = parsedData;
    storeData(USERS, datas);
  }
  return [200, data];
});
