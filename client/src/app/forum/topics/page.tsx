'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import TopicCard from '../../../components/forum/TopicCard/TopicCard';
import Section from '../../../components/ui/Section/Section';
import Button from '../../../components/ui/Button/Button';
import discordLogo from '../../../../public/images/discord-logo.png';

const Topics = () => {
  const onClick = () => {
    console.log('click');
  };

  return (
    <Container>
      <Section title={'Liste des sujets'} sectionWidth={'73%'}>
        <TopicsList>
          <TopicCard topicSolved={'true'} />
          <TopicCard />
          <TopicCard />
          <TopicCard />
          <TopicCard />
          <TopicCard />
        </TopicsList>
      </Section>
      <SidePanel>
        <Button
          text={'Créer un sujet'}
          onClick={onClick}
          buttonWidth={'100%'}
          margin={'0 0 1.5rem 0'}
        />
        <Section
          title={'Statistiques'}
          sectionWidth={'100%'}
          margin={'0 0 1.5rem 0'}
        >
          <StatContainer>
            <ProfileSVG>
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="#E4E4E4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 18.97H8C4 18.97 2 17.97 2 12.97V7.96997C2 3.96997 4 1.96997 8 1.96997H16C20 1.96997 22 3.96997 22 7.96997V12.97C22 16.97 20 18.97 16 18.97H15.5C15.19 18.97 14.89 19.12 14.7 19.37L13.2 21.37C12.54 22.25 11.46 22.25 10.8 21.37L9.29999 19.37C9.13999 19.15 8.78 18.97 8.5 18.97Z"
                  stroke="#E4E4E4"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8.69995L6 10.7L8 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 8.69995L18 10.7L16 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 8.37012L11 13.0302"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ProfileSVG>
            <Stats>
              <StatNumber>150</StatNumber>
              <StatLabel>Sujets</StatLabel>
            </Stats>
          </StatContainer>
          <StatContainer>
            <ProfileSVG>
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="#E4E4E4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 18.97H8C4 18.97 2 17.97 2 12.97V7.96997C2 3.96997 4 1.96997 8 1.96997H16C20 1.96997 22 3.96997 22 7.96997V12.97C22 16.97 20 18.97 16 18.97H15.5C15.19 18.97 14.89 19.12 14.7 19.37L13.2 21.37C12.54 22.25 11.46 22.25 10.8 21.37L9.29999 19.37C9.13999 19.15 8.78 18.97 8.5 18.97Z"
                  stroke="#E4E4E4"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8.69995L6 10.7L8 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 8.69995L18 10.7L16 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 8.37012L11 13.0302"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ProfileSVG>
            <Stats>
              <StatNumber>150</StatNumber>
              <StatLabel>Sujets résolus</StatLabel>
            </Stats>
          </StatContainer>
          <StatContainer>
            <ProfileSVG>
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="#E4E4E4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 18.97H8C4 18.97 2 17.97 2 12.97V7.96997C2 3.96997 4 1.96997 8 1.96997H16C20 1.96997 22 3.96997 22 7.96997V12.97C22 16.97 20 18.97 16 18.97H15.5C15.19 18.97 14.89 19.12 14.7 19.37L13.2 21.37C12.54 22.25 11.46 22.25 10.8 21.37L9.29999 19.37C9.13999 19.15 8.78 18.97 8.5 18.97Z"
                  stroke="#E4E4E4"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8.69995L6 10.7L8 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 8.69995L18 10.7L16 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 8.37012L11 13.0302"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ProfileSVG>
            <Stats>
              <StatNumber>20</StatNumber>
              <StatLabel>Utilisateurs actifs</StatLabel>
            </Stats>
          </StatContainer>
        </Section>
        <Section title={'Utilisateurs actifs'} sectionWidth={'100%'}>
          <StatContainer>
            <ActiveUserAvatar />
            <Stats>
              <StatNumber>
                John Doe (<UserMention>@johndoe</UserMention>)
              </StatNumber>
              <StatLabel>15 messages</StatLabel>
            </Stats>
          </StatContainer>
          <StatContainer>
            <ActiveUserAvatar />
            <Stats>
              <StatNumber>
                John Doe (<UserMention>@johndoe</UserMention>)
              </StatNumber>
              <StatLabel>15 messages</StatLabel>
            </Stats>
          </StatContainer>
          <StatContainer>
            <ActiveUserAvatar />
            <Stats>
              <StatNumber>
                John Doe (<UserMention>@johndoe</UserMention>)
              </StatNumber>
              <StatLabel>15 messages</StatLabel>
            </Stats>
          </StatContainer>
          <StatContainer>
            <ActiveUserAvatar />
            <Stats>
              <StatNumber>
                John Doe (<UserMention>@johndoe</UserMention>)
              </StatNumber>
              <StatLabel>15 messages</StatLabel>
            </Stats>
          </StatContainer>
        </Section>
        <DiscordSection>
          <CustomDiscordLogo src={discordLogo} alt={'Discord'} />
          <DiscordButton>Rejoindre le serveur</DiscordButton>
        </DiscordSection>
      </SidePanel>
    </Container>
  );
};

const Container = styled.div`
  padding: 3rem;
  display: flex;
  justify-content: space-between;
`;

const TopicsList = styled.div`
  margin-top: 1rem;
`;

const SidePanel = styled.div`
  width: 23%;
`;

const StatContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StatNumber = styled.p`
  color: #e4e4e4;
  font-weight: 600;
  font-size: 0.95rem;
`;

const StatLabel = styled.div`
  color: #bdbdbd;
  font-weight: 500;
  font-size: 0.8rem;
`;

const ProfileSVG = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2f314f;
  width: fit-content;
  height: fit-content;
  border-radius: 50%;
  padding: 0.5rem;
  margin-right: 1rem;
`;

const ActiveUserAvatar = styled.div`
  background-color: #2f314f;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 5px;
  margin-right: 1rem;
`;

const DiscordSection = styled.div`
  background-color: #5765f2;
  width: 100%;
  margin-top: 1.5rem;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  height: 20rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CustomDiscordLogo = styled(Image)`
  width: 11rem;
  height: 11rem;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DiscordButton = styled.button`
  background-color: #3c4694;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  max-width: calc(100% - 2rem);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    background-color: #4d58a4;
  }
`;

const UserMention = styled.span`
  color: #5765f2;
  cursor: pointer;
  &:hover {
    color: #4d58a4;
  }
`;

export default Topics;
