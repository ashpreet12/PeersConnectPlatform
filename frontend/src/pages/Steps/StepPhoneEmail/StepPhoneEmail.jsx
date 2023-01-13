import React , {useState} from 'react';
import Phone  from './Phone/Phone';
import Email from './Email/Email';
import styles from './StepPhoneEmail.module.css'

const PhoneEmailMap = {
    phone : Phone,
    email : Email
};

const StepPhoneEmail = ({ onNext }) => {
    const [type, setType] = useState('phone');
    const Component = PhoneEmailMap[type];
    

    return (
        <>  
            <div className={styles.cardWrapper}>
                <div>
                    <div className= {styles.buttonWrap}>
                        <button  
                            className = {`${styles.tabButton} ${
                                type === 'phone' ? styles.active : ''
                            }`}
                            onClick={ () => setType('phone')} 
                        >
                            <img  src='images/phoneLogo.png' alt='phone logo' width ='20px'/>
                        </button>
                        <button 
                            className = {`${styles.tabButton} ${
                                type === 'email' ? styles.active : ''
                            }`}
                            onClick={ () => setType('email')} 
                        >
                            <img  src='images/emailLogo.png' alt='email logo' width ='20px'/>
                        </button>
                    </div>  
                    <Component onNext={onNext} />
                </div>
            </div>   
        </>
    );
};

export default StepPhoneEmail;