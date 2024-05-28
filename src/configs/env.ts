class Environment {
    get API_URL(): string {
        const value = import.meta.env.VITE_API_URL;
        if (!value) throw new Error("API_URL is not defined");
        return value;
    }
    get GOOGLE_CLIENT_ID(): string {
        const value = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (!value) throw new Error("GOOGLE_CLIENT_ID is not defined");
        return value;
    }
}

export const ENV = new Environment();
