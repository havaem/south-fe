import { motion } from "framer-motion";

interface Props {
    text: string;
}
const TextTyping: React.FC<Props> = ({ text }) => {
    const splitText = text.split("");
    return (
        <>
            {splitText.map((el, i) => {
                if (el === "\n") return <br key={el + i + Math.random()} />;
                return (
                    <motion.span
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        key={el + i + Math.random()}
                        transition={{
                            duration: 0.1,
                            delay: i / 50,
                        }}
                    >
                        {el}
                    </motion.span>
                );
            })}
        </>
    );
};
export default TextTyping;
