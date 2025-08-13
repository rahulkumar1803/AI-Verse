import { useEffect } from "react";

function useClickOutside(
    ref: React.RefObject<HTMLElement | null>,
    callback: () => void,
    isOpen: boolean
) {
    useEffect(() => {
        function handleClickOutside(event : MouseEvent){
            if(ref.current && !ref.current.contains(event.target as Node)){
                callback();
            }
        }

        if(isOpen) {

            const timeoutId = setTimeout(() => {
                document.addEventListener("mousedown" , handleClickOutside);
            }, 0);

            return () => {
                clearTimeout(timeoutId);
                document.removeEventListener("mousedown" , handleClickOutside);
            };
        } else {
            document.removeEventListener("mousedown" ,handleClickOutside);
        }
    }, [ref,callback , isOpen])
}

export default useClickOutside;