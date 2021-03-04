import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import Styles from '../styles/components/ChallengeBox.module.css'
import { Countdown } from './Countdown';


export function ChallengeBox()
{
    const {activeChallenge,resetChallenge,completeteChallenge } = useContext(ChallengesContext); 
    const {resetCountdown} = useContext(CountdownContext);

function handleChallengeSucceeded()
{
 completeteChallenge();
 resetCountdown();
}

function handleChallengeFailed()
{
 resetChallenge();
 resetCountdown();   
}

    return(
        <div className={Styles.ChallengeBoxContainer}>
         {activeChallenge?(
            <div className={Styles.challengeActive}>
                <header>
                    ganhe {activeChallenge.amount} xp
                </header>
                <main>
                    <img src={`icons/${activeChallenge.type}.svg`} />
                    <strong>novo desafio</strong>
                    <p>{activeChallenge.description}</p>
                </main>
                <footer>
                    <button
                     type="button"
                     className={Styles.challengeFailedButton}
                     onClick={handleChallengeFailed}
                     >Falhei</button>
                   
                    <button
                     type="button"
                     className={Styles.challengeSucceededButton}
                     onClick={handleChallengeSucceeded}
                     >Completei
                     </button>
                </footer>
            </div>
         ):
         (
            <div className={Styles.challengeBoxNoActive}>
            <strong>finaleze um ciclo para receber um dasafio</strong>
             <p>
                 <img src="icons/level-up.svg" alt=""/>
                 avance de level completando desafios
             </p>
        </div>
         )}
        </div>
    )
}