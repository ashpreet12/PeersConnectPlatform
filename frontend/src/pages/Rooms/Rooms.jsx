import React from 'react';
import styles from './Rooms.module.css';

const Rooms = () => {
    return (<>
        <div className="container">
            <div className={styles.roomsHeader}>
                <div className={styles.left}>
                    <span className={styles.heading}>All voice rooms</span>
                    <div className={styles.searchBox}>
                        <img src="/images/search-icon.png" alt="search" />
                        <input type="text" className={styles.searchInput} />
                    </div>
                </div>
            </div>
        </div>
    </>
);
};

export default Rooms;