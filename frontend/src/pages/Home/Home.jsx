import React from 'react';
import styles from './Home.module.css';
import {useNavigate } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

const Home = () => {
    const navigate = useNavigate();
    function startRegister() {
        navigate("/authenticate");
    }
    return (
        <div className={styles.cardWrapper}>
            <Card title="PeersConnect" icon="logo">
                <p className={styles.text}>
                    Welcome to PeersConnect!
                    To get started, please sign-up.
                </p>
                <div>
                    <Button onClick={startRegister} text="Let's Go" />
                </div>
            </Card>
        </div>
    );
};

export default Home;
