import { DynLink, useAppRouters } from "../../Routes"

function DynamicNavLinks() {

    const { routers } = useAppRouters();
    return (
        <div>
            <ul className="flx itemCenter">
                {
                    routers.map(router => <DynLink key={router.name} router={router} >{router.name}</DynLink>)
                }
            </ul>
        </div>
    )
}

export default DynamicNavLinks
