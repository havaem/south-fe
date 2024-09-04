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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.1,
                            delay: i / 50,
                        }}
                        key={el + i + Math.random()}
                    >
                        {el}
                    </motion.span>
                );
            })}
        </>
    );
};
export default TextTyping;
