import { useParams } from "react-router-dom";
import PopBrowse from "../components/popups/popBrowse/PopBrowse";
import { cardList } from "../data";

const PageBrowse = () => {
    const { id } = useParams();
    const card = cardList.find((item) => String(item.id) === String(id));

    return <PopBrowse card={card} cardId={id} />;
};

export default PageBrowse;