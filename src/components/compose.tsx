import { FC, PropsWithChildren } from "react";

type IProviderOrWithValue<T> = FC<PropsWithChildren> | [FC<T>, T];
interface IProps<T>
    extends PropsWithChildren<{
        providers: Array<IProviderOrWithValue<T>>;
    }> {}

export function Compose<T>({ providers, children }: IProps<T>) {
    return (
        <>
            {providers.reduceRight((acc, ProviderOrWithValue) => {
                if (Array.isArray(ProviderOrWithValue)) {
                    const [Provider, value] = ProviderOrWithValue;
                    return <Provider {...value}>{acc}</Provider>;
                } else {
                    return <ProviderOrWithValue>{acc}</ProviderOrWithValue>;
                }
            }, children)}
        </>
    );
}
