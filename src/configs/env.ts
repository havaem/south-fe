class Environment {
    get API_URL(): string {
        const value = process.env.NEXT_PUBLIC_API_URL;
        if (!value) throw new Error("API_URL is not defined");
        return value;
    }
}

export const ENV = new Environment();
