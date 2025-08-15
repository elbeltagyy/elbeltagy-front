import usePostData from "./usePostData";

const useMultiMutation = (mutationHook, setReset) => {
    const [sendMutation, status] = mutationHook();
    const [wrappedMutation] = usePostData(sendMutation);

    const handleSingle = async (items) => {
        await wrappedMutation(items);
        setReset(prev => !prev);
    };

    const handleMany = async (items) => {
        await wrappedMutation(items);
        setReset(prev => !prev);
    };

    return { status, handleSingle, handleMany };
};

export default useMultiMutation