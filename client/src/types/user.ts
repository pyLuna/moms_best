type User = {
  id: string;
  email: string;
  name: string;
  age?: number;
};

type UserWithMetadata = User & {
  metadata: {
    role: string;
    key: string;
    last_logged_in?: Date;
    created_at: Date;
    user_id: string;
    online: boolean;
  };
};

export type { User, UserWithMetadata };
