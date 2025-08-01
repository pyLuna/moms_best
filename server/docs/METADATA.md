# METADATA

This will be the users metadata this contains the following type

```ts
interface Metadata {
  _id: ObjectId;
  role: Roles;
  key: string;
  last_logged_in?: Date;
  created_at: Date;
  user_id: string;
}
```

## API Key

API Key are not used for the authentication, it can only authorize the logged in user to do things that they are permitted to do.

## Permissions

There will be three (3) permission `AdminPermission` for the admins, like myself. `SellerPermission` the basic forum permissions with product managing and as for the `UserPermission` -- forum permissions

### Roles

Roles must be provided with an API Key, without it the user does not have a permission to do such things.

3 Roles that `moms_best` allows:

- `admin` - who has access on everything, basically a super admin
- `seller` - a normal `user` just with **Products** permission
- `user` - normal consumer/user of the app
- `guest` - can only read but can not interact

### Statuses

- `online` - if the user is logged in and active
- `last_logged_in` - when was the last time user logged in

## Implementation

Api key must be sent in headers as `x-api-key`. Middleware will automatically extract this and validated by the `validateApiKey` function.

To add a role-based API use the `authorize(role)` to add as a middleware for that API Route

Usage of `authorize()`

```ts
router.get(
  Route.user.get,
  authorize("read:users"), // Ensure the user has permission to read users
  async (req, res) => {
    const token = req.cookies.token;
    const userData = decodeToken(token)!;
    const user = await getUserByEmail(userData.email);
    res.send({ user });
    return;
  }
);
```

### Details

`rbac.ts` contains the permissions for each user, this must not be changed unless needed.
