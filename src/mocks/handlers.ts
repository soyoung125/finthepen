// src/mocks/handlers.js
import { rest } from "msw";
import { LOCAL_STORAGE_KEY_USERS } from "../app/api/keys.ts";
import {
  getLocalStorage,
  getSessionStorage,
  setLocalStorage,
  setSessionStorage,
} from "../app/utils/storage.ts";
import { Todo } from "../temp/type.ts";
import { DOMAIN } from "@api/url.ts";
import { MockUser, SignUp, User } from "@type/auth.tsx";

export const handlers = [
  rest.get("/hello", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(true));
  }),

  rest.post(`${DOMAIN}/fin-the-pen-web/sign-up`, async (req, res, ctx) => {
    type MockUser = User & { password: string };

    const newUser: MockUser = await req.json();
    const prevUsers = getLocalStorage<MockUser[]>(LOCAL_STORAGE_KEY_USERS, []);

    if (prevUsers.find((user) => user.user_id === newUser.user_id)) {
      return res(ctx.delay(1000), ctx.status(200), ctx.json(false));
    }

    const newUsers: MockUser[] = [...prevUsers, newUser];

    setLocalStorage(LOCAL_STORAGE_KEY_USERS, newUsers);

    return res(ctx.delay(1000), ctx.status(200), ctx.json(true));
  }),

  rest.post("/fin-the-pen-web/sign-in", (req, res, ctx) => {
    const newUser = req.body as User;
    const prevUsers = getLocalStorage<User[]>(
      LOCAL_STORAGE_KEY_USERS,
      []
    ) as User[];
    const newUsers: User[] = [...prevUsers, newUser];
    setLocalStorage(LOCAL_STORAGE_KEY_USERS, newUsers);

    return res(ctx.delay(1000), ctx.status(200), ctx.json(true));
  }),

  rest.post("/mock/login", (req, res, ctx) => {
    const mockUser: User = {
      id: 0,
      user_id: "guest@finthepen.com",
      name: "guest by msw",
      bday: "2000-01-01",
      registerDate: "2023-01-25T14:57:08.023+00:00",
      phone_number: "010-4413-5698",
    };
    return res(ctx.delay(1000), ctx.status(200), ctx.json(mockUser));
  }),

  rest.get("/temp/todo", (req, res, ctx) => {
    const todoList = getSessionStorage<Todo[]>("todo", []);
    return res(ctx.delay(200), ctx.json(todoList));
  }),

  rest.post("/temp/todo/create", async (req, res, ctx) => {
    const body: {
      text: string;
    } = await req.json();

    const { text } = body;

    const prevTodoList = getSessionStorage<Todo[]>("todo", []);
    setSessionStorage<Todo[]>("todo", [
      ...prevTodoList,
      {
        id: prevTodoList.length,
        text: text,
      },
    ]);

    return res(ctx.delay(200), ctx.json(true));
  }),
];
