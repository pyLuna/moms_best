# ROLES

Implementing roles are quiet tricky, at least for me. Until now, I am not yet decided the structure of it. But let's work on this for now.

## Permissions

There will be three (3) permission `AdminPermission` for the admins, like myself. `SellerPermission` the basic forum permissions with product managing and as for the `UserPermission` -- forum permissions

### Roles

3 Roles that `moms_best` allows:

- `admin` - who has access on everything, basically a super admin
- `seller` - a normal `user` just with **Products** permission
- `user` - normal consumer/user of the app
- `guest` - can only read but can not interact

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
