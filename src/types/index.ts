export * from "./apis";
export * from "./models";

export type TQueryConfig<QueryFnType extends (...args: any[]) => unknown> = Omit<
    UseQueryOptions<TExtractFnReturn<QueryFnType>>,
    "queryKey" | "queryFn"
>;

export type TMutationConfig<MutationFnType extends (...args: unknown[]) => unknown> = UseMutationOptions<
    TExtractFnReturn<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
>;
