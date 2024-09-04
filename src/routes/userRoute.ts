import { Elysia, t } from 'elysia';
import {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
} from '../controllers/userController';

const userRoutes = new Elysia();

userRoutes
  .get('/users', () => handleGetAllUsers())
  .get('/users/:id', ({ params: { id } }) => handleGetUserById(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post('/users',({ body }) => handleCreateUser(body), {
    body: t.Object({
      email: t.String({
        minLength: 0,
        maxLength: 99,
      }),
      firstName: t.String({
        minLength: 0,
        maxLength: 99,
      }),
      lastName: t.String({
        minLength: 0,
        maxLength: 99,
      })
    })
  })
  .put('/users/:id', ({ params: { id }, body }) => handleUpdateUser(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: t.Object({
      email: t.String({
        minLength: 0,
        maxLength: 99,
      }),
      firstName: t.String({
        minLength: 0,
        maxLength: 99,
      }),
      lastName: t.String({
        minLength: 0,
        maxLength: 99,
      })
    },{
      minProperties: 1,
    }),
  })
  .delete('/users/:id',  ({ params: { id } }) => handleDeleteUser(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default userRoutes;