import classes from "./link.module.css"
import clsx from "clsx"

export const Link = ({children, title, isInactive=false, onClick, align}) => {

    return (
        <a href={'/'} onClick={onClick} className={clsx(
            'pt-4 pb-4 pl-5 pr-5',
            classes.wrapper,
            {
                "text_color_inactive":isInactive,
                [classes.left_align]:align==="left",
                [classes.right_align]:align!=="left"
        },
    )}>
        {children}
        <p className={clsx('text text_type_main-default pl-2', classes.navLink__caption, )}>{title}</p>
    </a>
    )
}


