/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type TExtractFnReturn<FnType extends (...args: unknown[]) => unknown> = Awaited<ReturnType<FnType>>;

export type TQueryConfig<QueryFnType extends (...args: any) => unknown> = Omit<
    UseQueryOptions<TExtractFnReturn<QueryFnType>>,
    "queryKey" | "queryFn"
>;

export type TMutationConfig<MutationFnType extends (...args: any) => unknown> = UseMutationOptions<
    TExtractFnReturn<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
>;
