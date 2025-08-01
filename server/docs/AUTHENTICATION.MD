# AUTHENTICATION

Moms best authentication is cookie-based storing a JWT Token.

## JWT Token

It is uses the `bcrypt` and `crypto` for generating and hashing token data

Token includes:

```ts
{
    email: string,
    user_id: string,
    role: Role,
}
```

## Cookie

Cookies are saved on server side only and should not be sent to client
