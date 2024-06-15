import clsx from "clsx";

import styles from "./Rating.module.css";

export interface RatingProps {
    className?: string;
    children?: React.ReactNode;
}

const Rating = ({ className, children }: RatingProps) => {
    return <div className={clsx(styles.Rating, className)}>{children}</div>;
};

export interface StarProps {
    className?: string;
}

const Star = ({ className }: StarProps) => {
    return <div className={clsx(styles.Star, className)} />;
};

Rating.Star = Star;

export default Rating;
