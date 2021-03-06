import Head from 'next/head';

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import {CompletedChalenges} from "../components/CompletedChallenges";
import { ChallengeBox } from "../components/ChallengeBox";
import { Countdown } from "../components/Countdown";
import {GetServerSideProps} from 'next';
import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import ChallengesProvider from '../contexts/ChallengesContext';

interface HomeProps
{
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}


export default function Home(props:HomeProps) {
  return (
  <ChallengesProvider 
  level={props.level}
  currentExperience={props.currentExperience}
  challengesCompleted={props.challengesCompleted}

  >
    <div className={styles.container}>
     <Head>
       <title>inicio Move.it</title>
     </Head>
     <ExperienceBar/>
   
   <CountdownProvider>
    <section>
      <div>
        <Profile/>
        <CompletedChalenges/>
        <Countdown/>
      </div>
      <div>
        <ChallengeBox/>
     </div>
     </section>
    </CountdownProvider>
   </div>
   </ChallengesProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) =>{
  
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
     props:{
      level:Number(level),
      currentExperience:Number(currentExperience),
      challengesCompleted:Number(challengesCompleted),
     }
  }
}