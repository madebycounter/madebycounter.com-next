import clsx from "clsx";

import VariableNav from "./Nav.Variable";
import styles from "./Nav.module.css";

export interface NavProps {
    children: React.ReactNode;
    className?: string;
}

function Nav({ children, className }: NavProps) {
    return <div className={clsx(className, styles.Nav)}>{children}</div>;
}

export interface NavLogoProps {
    children: React.ReactNode;
    className?: string;
}

function Logo({ children, className }: NavLogoProps) {
    return <div className={clsx(className, styles.Logo)}>{children}</div>;
}

export interface NavItemsProps {
    children: React.ReactNode;
    className?: string;
}

function Items({ children, className }: NavItemsProps) {
    return (
        <nav>
            <ul className={clsx(className, styles.Items)}>{children}</ul>
        </nav>
    );
}

export interface NavVariableProps {
    children: React.ReactNode;
    className?: string;
    classNameTop?: string;
    classNameScrolled?: string;
    threshold?: number;
}

Nav.Logo = Logo;
Nav.Items = Items;
Nav.Variable = VariableNav;

export default Nav;
