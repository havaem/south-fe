export const useIsIframe = () => {
    function inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    return inIframe();
};
