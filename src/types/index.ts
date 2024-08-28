export type UserId = number;



export type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};


