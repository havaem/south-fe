import { ComponentPropsWithoutRef, forwardRef, memo } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends ComponentPropsWithoutRef<"canvas"> {}
const Canvas = forwardRef<HTMLCanvasElement, IProps>(function Canvas(_props, ref) {
    return <canvas ref={ref} className="size-full"></canvas>;
});
export default memo(Canvas);
