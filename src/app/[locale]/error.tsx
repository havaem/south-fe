"use client";

import { useEffect } from "react";

type Props = {
    error: Error;
    reset(): void;
};

export default function Error({ error, reset }: Props) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            {/* {t.rich("title", {
                p: (chunks) => <p className="mt-4">{chunks}</p>,
                retry: (chunks) => (
                    <button className="text-white underline underline-offset-2" type="button" onClick={reset}>
                        {chunks}
                    </button>
                ),
            })} */}
        </div>
    );
}
