import {createContext, useState,ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/levelUpModal';

interface ChallengesContextData
{
 level:number,
 currentExperience:number,
 challengesCompleted:number,
 levelUp:()=> void,
 startNewChallenge:()=> void,
 resetChallenge:()=> void,
 activeChallenge:challenge,
 experienceToNextLevel:number,
 completeteChallenge:()=> void
 closeLevelUpModal:()=>void;
}

interface challenge
{
    type: 'body'|'eye';
    description:string;
    amount:number;
}
interface ChallengesProviderProps
{
    children:ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);
export default function ChallengesProvider({children,...rest}: ChallengesProviderProps)
{
    const [level,setLevel] = useState(rest.level ?? 1);
    const [currentExperience,setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted,setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge,setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen,setIsLevelUpModalOpenn]=useState(false);

    const experienceToNextLevel = Math.pow((level+1)*4,2);

    useEffect(()=>{
     Notification.requestPermission();
    },[])

    useEffect(()=>{
     Cookies.set('level',String(level))
     Cookies.set('currentExperience',String(currentExperience))
     Cookies.set('challengesCompleted',String(challengesCompleted))
    },[level,currentExperience,challengesCompleted])
 
    function levelUp()
    {
      setLevel(level+1);
      setIsLevelUpModalOpenn(true)
    }
 
    function closeLevelUpModal()
    {
      setIsLevelUpModalOpenn(false)
    }

    function startNewChallenge()
    {
      const randomChallengeindex = Math.floor(Math.random() * challenges.length);
      const challenge = challenges[randomChallengeindex]
      setActiveChallenge(challenge)

      new Audio('/notification.mp3').play();
     if(Notification.permission === 'granted')
     {
       new Notification('novo Desafio',{
         body:`Valendo ${challenge.amount}xp !`
        })
      }

    }
 
    function resetChallenge()
    {
        setActiveChallenge(null)
    }

function completeteChallenge()
{
  if(!activeChallenge)
  {
    return;
  }
  const {amount} = activeChallenge;

  let finalExperience = currentExperience + amount;

  if(finalExperience >= experienceToNextLevel)
  {
    finalExperience= finalExperience - experienceToNextLevel;
    levelUp();
  }

  setCurrentExperience(finalExperience);
  setActiveChallenge(null);
  setChallengesCompleted(challengesCompleted + 1);
}

    return(
        <ChallengesContext.Provider 
        value={{
            startNewChallenge,
            level,
            currentExperience,
            challengesCompleted,
            levelUp,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeteChallenge,
            closeLevelUpModal
           }}>
            {children}
        { isLevelUpModalOpen &&<LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}