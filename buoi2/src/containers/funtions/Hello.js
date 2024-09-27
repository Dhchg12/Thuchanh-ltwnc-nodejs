const Hello = () => {
    const hiAll = () => {
        alert("Chào mấy ní");
    };
    const hiYou = (name) => {
        alert("Dạo này ổn không " + name);
    };
    return (
        <span>
            <button onClick={hiAll}>what's up man</button>
            <button onClick={() => hiYou("Chương")}>Long time no see</button>
        </span>
    );
};
export default Hello

