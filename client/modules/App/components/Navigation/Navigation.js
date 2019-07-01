import React from 'react';
import { Link } from 'react-router';
import styles from './Navigation.css';

const Navigation = () => {
    return (
        <nav className={styles.container}>
            <ul className={styles.navigation}>
                <li className={styles.navigation_item}><Link className={styles.navigation_link} to="/">Posts</Link></li>
                <li className={styles.navigation_item}><Link className={styles.navigation_link} to="/home">Home</Link></li>
                <li className={styles.navigation_item}><Link className={styles.navigation_link} to="/about">About</Link></li>
            </ul>
        </nav>
    );
};


export default Navigation;
