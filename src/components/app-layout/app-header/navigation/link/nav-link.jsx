import classes from "./link.module.css"
import clsx from "clsx"
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";

export const NavLink = ({children, title, to,   align}) => {
    //state={{backgroundLocation:location}}
    let location = useLocation()
    return (
        <Link to={to} className={clsx(
            'pt-4 pb-4 pl-5 pr-5',
            classes.wrapper,
            {
                "text_color_inactive": location.pathname !== to,
                [classes.left_align]:align==="left",
                [classes.right_align]:align!=="left"
        },
    )} >
        {children}
        <p className={clsx('text text_type_main-default pl-2', classes.navLink__caption, )}>{title}</p>
    </Link>
    )
}
NavLink.propTypes = {
    title:PropTypes.string.isRequired,
    isInactive:PropTypes.bool,
    align:PropTypes.oneOf(["left", "center"]),
}


