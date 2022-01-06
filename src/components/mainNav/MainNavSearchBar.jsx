import usePostController from "../../controller/usePostController";
import SearchResultPopLayout, { searchResultContext } from "../../layouts/feeds/SearchResultPopLayout";
import SearchInput from "../elements/SearchInput"


function MainNavSearchBar() {
    const { SearchMain } = usePostController();

    const onSearchHandler = ({ target: { value } }) => SearchMain(value)
    function onBLurHandler() {
        const unsub = setTimeout(() => {
            searchResultContext.loc.set({ isActive: false })
        }, 500);
    }

    return (
        <div>
            <SearchInput onChange={onSearchHandler} onBlur={onBLurHandler} />
            <SearchResultPopLayout />
        </div>
    )
}

export default MainNavSearchBar
